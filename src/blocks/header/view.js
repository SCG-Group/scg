import { store, getElement, getContext } from '@wordpress/interactivity';
import { gsap } from 'gsap';

const MOBILE_BREAKPOINT = 782;
const MODAL_OPEN = 'has-modal-open';
const MENU_LINKS = 'a:not([target="_blank"])';
const ANIMATION_MEDIA_QUERY = `(max-width: ${ MOBILE_BREAKPOINT }px) and (prefers-reduced-motion: no-preference)`;
const MENU_ITEMS =
	'.wp-block-scg-header :where(.wp-block-navigation-item, .wp-block-template-part)';
const MOBILE_MENU = '.wp-block-scg-header__menu';
const MOBILE_NAVIGATION = '.wp-block-scg-header__bg';
const LOGO_PATH = '.wp-block-scg-logo .scg-logo--main';

store( 'scg/header', {
	actions: {
		toggleOpen: () => {
			const ctx = getContext();
			ctx.isOpen = ! ctx.isOpen;
		},
	},
	callbacks: {
		onScroll: () => {
			const ctx = getContext();
			ctx.isScrolled = window.scrollY > 0;
		},
		onResize: () => {
			const ctx = getContext();

			if ( window.innerWidth >= MOBILE_BREAKPOINT ) {
				ctx.isOpen = false;
			}
		},
		// Set initial context.
		onInit: () => {
			const ctx = getContext();

			ctx.isScrolled = window.scrollY > 0;
			ctx.animationTimeline = gsap.timeline();
		},
		// Handle context changes.
		onChange: () => {
			const ctx = getContext();

			if ( ctx.isOpen ) {
				document.documentElement.classList.add( MODAL_OPEN );

				if ( ctx.animationTimeline ) {
					ctx.animationTimeline.play( 0 );
				}
			} else {
				document.documentElement.classList.remove( MODAL_OPEN );

				if ( ctx.animationTimeline ) {
					ctx.animationTimeline.reverse();
				}
			}
		},
		// Close mobile menu when user clicks on link inside block content.
		handleLinkClick: () => {
			const ctx = getContext();
			const elements = getElement().ref.querySelectorAll( MENU_LINKS );

			for ( const element of Array.from( elements ) ) {
				element.addEventListener( 'click', () => {
					ctx.isOpen = false;
				} );
			}
		},
		// Mobile menu animation.
		initAnimation: () => {
			const ctx = getContext();
			const element = getElement().ref;
			const animation = gsap.matchMedia();
			const startCallback = () => {
				window.requestAnimationFrame( () => {
					element.querySelector(
						MOBILE_NAVIGATION
					).style.transition = 'none';
				} );
			};
			const reverseCompleteCallback = () => {
				ctx.animationTimeline.revert();
				window.requestAnimationFrame( () => {
					element.querySelector(
						MOBILE_NAVIGATION
					).style.transition = '';
				} );
			};

			animation.add(
				ANIMATION_MEDIA_QUERY,
				() => {
					ctx.animationTimeline.pause();

					ctx.animationTimeline
						.set( MENU_ITEMS, {
							opacity: 0,
							y: 10,
						} )
						.to( MOBILE_NAVIGATION, {
							height: '100vh',
							scaleY: 1,
							duration: 0.5,
							ease: 'back.out',
						} )
						.to( LOGO_PATH, {
							fill: 'var(--wp--preset--color--base)',
							duration: 0.01,
						} )
						.to(
							MOBILE_MENU,
							{
								duration: 0.01,
								display: 'block',
							},
							'-=0.5'
						)
						.to(
							MENU_ITEMS,
							{
								duration: 0.35,
								opacity: 1,
								y: 0,
								stagger: 0.05,
								ease: 'back.out',
							},
							'-=0.5'
						)
						.to(
							MOBILE_NAVIGATION,
							{
								border: 'var(--navigation--border)',
								ease: 'back.out',
								duration: 0.35,
							},
							'-=0.35'
						)
						.eventCallback( 'onStart', startCallback )
						.eventCallback(
							'onReverseComplete',
							reverseCompleteCallback
						);

					return reverseCompleteCallback;
				},
				element
			);
		},
	},
} );
