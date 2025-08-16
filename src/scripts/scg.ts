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
		// Handle smooth page scrolling to anchors.
		onInit: () => {
			// Handle url hash on page load.
			if ( window.location.hash ) {
				actions.scrollTo( window.location.hash );
				history.replaceState( {}, document.title, '.' );
			}

			// Handle internal links.
			gsap.registerPlugin( ScrollToPlugin );

			const links = document.querySelectorAll( ANCHOR_LINKS );

			for ( const link of Array.from( links ) ) {
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
	},
} );

document.addEventListener( 'DOMContentLoaded', callbacks.onInit );
