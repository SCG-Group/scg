import { store } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ANCHOR_LINKS = 'a[href*="#"]';
const ADMIN_BAR_HEIGHT = '--wp-admin--admin-bar--height';
const SCREEN_HEIGHT = '--screen-height';
const PAGE_ELEMENTS = '.entry-content > *:not(.wp-block-cover)';

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
			const adminBarHeight = parseInt(
				window
					.getComputedStyle( document.documentElement )
					.getPropertyValue( ADMIN_BAR_HEIGHT )
					.trim()
			);
			const offsetY = isNaN( adminBarHeight ) ? 0 : adminBarHeight;

			gsap.to( window, {
				duration: 1.8,
				ease: 'power3.inOut',
				scrollTo: {
					y: hash,
					offsetY,
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
			window.screen.orientation.addEventListener(
				'change',
				callbacks.setScreenHeight
			);

			// Animate elements on page load.
			callbacks.showElements();

			// Disable [inert] in langauge switcher [translatePress].
			// Needed for mobile view when all items are visible.
			window.setTimeout( () => {
				document
					.querySelector( '.trp-switcher-dropdown-list[inert]' )
					?.removeAttribute( 'inert' );
			}, 500 );
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
		// Set fixed screen height on mobile to avoid layout shift in browsers with dynamic toolbars.
		setScreenHeight: () => {
			const isMobile = /iPhone|iPad|Android/i.test( navigator.userAgent );

			if ( ! isMobile ) {
				return;
			}

			window.requestAnimationFrame( () => {
				document.documentElement.style.setProperty(
					SCREEN_HEIGHT,
					`${ window.innerHeight }px`
				);
			} );
		},
		// Animate elements on page init.
		showElements: () => {
			gsap.registerPlugin( ScrollTrigger );

			ScrollTrigger.batch( PAGE_ELEMENTS, {
				batchMax: 3,
				interval: 0.1,
				once: true,
				start: 'top bottom',
				onEnter: ( batch ) =>
					gsap.to( batch, {
						startAt: {
							opacity: 0,
							y: 50,
						},
						opacity: 1,
						y: 0,
						stagger: 0.1,
						duration: 0.35,
					} ),
			} );

			// Watch container size changes.
			const resizeObserver = new ResizeObserver( () => {
				ScrollTrigger.refresh();
			} );

			const container = document.querySelector( '.wp-site-blocks' );
			if ( container ) {
				resizeObserver.observe( container );
			}
		},
	},
} );

document.addEventListener( 'DOMContentLoaded', callbacks.onInit );
