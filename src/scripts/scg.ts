import { store } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const ANCHOR_LINKS = 'a[href*="#"]';
const AT_MASK = '$$$@@@';
const MAILTO_MASK = 'mailto:%%%';
const TEL_MASK = 'tel:&&&';
const CONTACT_LINKS = `a[href*="${ AT_MASK }"], a[href^="${ MAILTO_MASK }"], a[href^="${ TEL_MASK }"]`;
const getSamePageHash = ( url: string ) => {
	const parsed = new URL( url, String( window.location ) );
	return parsed.origin === window.location.origin &&
		parsed.pathname === window.location.pathname
		? parsed.hash
		: '';
};
const getContactLink = ( href: string ) => {
	return href
		.replace( AT_MASK, '@' )
		.replace( MAILTO_MASK, 'mailto:' )
		.replace( TEL_MASK, 'tel:' );
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
			callbacks.handleInternalLinks();

			// Handle contact links.
			callbacks.handleContactLinks();

			// Handle mail mask in content.
			callbacks.handleAtMask();
		},
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
		handleContactLinks: () => {
			const contactLinks =
				document.querySelectorAll< HTMLAnchorElement >( CONTACT_LINKS );

			for ( const link of Array.from( contactLinks ) ) {
				link.href = getContactLink( link.href );
				link.innerText = getContactLink( link.innerText );
			}
		},
		handleAtMask: () => {
			const blocks = document.querySelector( '.wp-site-blocks' );

			if ( blocks ) {
				blocks.innerHTML = blocks.innerHTML.replaceAll( AT_MASK, '@' );
			}
		},
	},
} );

document.addEventListener( 'DOMContentLoaded', callbacks.onInit );
