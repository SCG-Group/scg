import { store } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const ANCHOR_LINKS = 'a[href*="#"]';
const getSamePageHash = ( url: string ) => {
	const parsed = new URL( url, String( window.location ) );
	return parsed.origin === window.location.origin &&
		parsed.pathname === window.location.pathname
		? parsed.hash
		: '';
};

const { actions, callbacks } = store( 'scg', {
	actions: {
		// Scroll window to hash or position.
		scrollTo: ( hash: string | number ) => {
			gsap.to( window, {
				duration: 1.8,
				ease: 'power3.inOut',
				scrollTo: {
					y: hash,
				},
			} );
		},
	},
	callbacks: {
		onInit: () => {
			// Handle url hash on page load.
			if ( window.location.hash ) {
				actions.scrollTo( window.location.hash );
				history.replaceState( {}, document.title, '.' );
			}

			// Handle internal links.
			callbacks.handleInternalLinks();

			// Handle dynamic viewport height (mobile browsers).
			callbacks.setScreenHeight();
			window.addEventListener(
				'orientationchange',
				callbacks.setScreenHeight
			);
		},
		// Handle smooth page scrolling to anchors.
		handleInternalLinks: () => {
			gsap.registerPlugin( ScrollToPlugin );

			const internalLinks = document.querySelectorAll( ANCHOR_LINKS );

			for ( const link of Array.from( internalLinks ) ) {
				const hrefHash = link.getAttribute( 'href' ) || '';
				const hash = getSamePageHash( hrefHash );

				if ( hash.length ) {
					link.addEventListener( 'click', ( event ) => {
						event.preventDefault();
						actions.scrollTo( hash );
					} );
				}
			}
		},
		setScreenHeight: () => {
			const isMobile = /iPhone|iPad|Android/i.test( navigator.userAgent );

			if ( ! isMobile ) {
				return;
			}

			window.requestAnimationFrame( () => {
				document.documentElement.style.setProperty(
					'--screen-height',
					`${ window.innerHeight }px`
				);
			} );
		},
	},
} );

document.addEventListener( 'DOMContentLoaded', callbacks.onInit );
