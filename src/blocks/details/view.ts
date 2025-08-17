import { store, getElement, getContext } from '@wordpress/interactivity';
import gsap from 'gsap';

const CONTENT = ':scope > .wp-block-scg-details__content';
const CONTENT_ELEMENTS =
	':scope > .wp-block-scg-details__content .wp-block-column > *';
const ANIMATION_QUERY = '(prefers-reduced-motion: no-preference)';

interface Details {
	/* is open */
	isOpen: boolean;
	/* animation object */
	animation: gsap.core.Timeline;
	/* id of accordion */
	accordion?: string;
	/* key in array of accordion children */
	key?: number;
}

/* { [accordionId]: activeElement } */
type State = Record< string, number[] >;

const { state, actions } = store( 'scg/details', {
	state: {} as State,
	actions: {
		toggle: () => {
			const ctx = getContext< Details >();

			if ( ! ctx.isOpen ) {
				actions.open();
			} else {
				actions.close();
			}
		},
		open: () => {
			const ctx = getContext< Details >();

			ctx.isOpen = true;
			ctx.animation.play( 0 );
		},
		close: () => {
			const ctx = getContext< Details >();

			ctx.isOpen = false;
			ctx.animation.timeScale( 1.5 );
			ctx.animation.reverse();
		},
		emitToggle: () => {
			const { accordion, key } = getContext< Details >();

			if ( ! accordion || ! key ) {
				return;
			}

			if ( state[ accordion ].includes( key ) ) {
				const kIndex = state[ accordion ].indexOf( key );

				state[ accordion ] = [
					...state[ accordion ].slice( 0, kIndex ),
					...state[ accordion ].slice( kIndex + 1 ),
				];
			} else {
				state[ accordion ] = [ key ];
			}
		},
		spaceToggle: ( event: KeyboardEvent ) => {
			if ( 'Space' === event.code ) {
				event.preventDefault();
				actions.toggle();
			}
		},
		emitSpaceToggle: ( event: KeyboardEvent ) => {
			if ( 'Space' === event.code ) {
				event.preventDefault();
				actions.emitToggle();
			}
		},
	},
	callbacks: {
		onStateChange: () => {
			const { accordion, key, isOpen } = getContext< Details >();

			if ( ! accordion || ! key ) {
				return;
			}

			if ( state[ accordion ].includes( key ) ) {
				if ( ! isOpen ) {
					actions.open();
				}
			} else if ( isOpen ) {
				actions.close();
			}
		},
		setupAnimation: () => {
			const element = getElement().ref as HTMLDetailsElement;
			const ctx = getContext< Details >();

			ctx.animation = gsap.timeline();

			gsap.matchMedia().add(
				ANIMATION_QUERY,
				() => {
					ctx.animation.pause();
					ctx.animation
						.set( CONTENT, {
							height: 0,
							display: 'flex',
						} )
						.set( CONTENT_ELEMENTS, {
							opacity: 0,
						} )
						.to( CONTENT, {
							duration: 0.35,
							height: 'auto',
							ease: 'power2.in',
						} )
						.to(
							CONTENT_ELEMENTS,
							{
								duration: 0.5,
								stagger: 0.075,
								opacity: 1,
								ease: 'back.in',
							},
							'-=0.2'
						)
						.eventCallback( 'onReverseComplete', () => {
							ctx.animation.revert();
							ctx.animation.invalidate();
						} );

					if ( ctx.isOpen ) {
						ctx.animation.invalidate();
						ctx.animation.progress( 1 );
					}

					return () => {
						ctx.animation.clear();
					};
				},
				element
			);
		},
	},
} );
