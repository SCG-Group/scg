import { store, getElement } from '@wordpress/interactivity';

const ANIMATION_TIME_PER_CHILD = 10;

store( 'scg/carousel', {
	callbacks: {
		initCarousel: () => {
			const el = getElement().ref as HTMLElement;
			const wrapper = el.querySelector(
				'.wp-block-scg-carousel__wrapper'
			) as HTMLElement;
			const animationDuration = `${
				wrapper.children.length * ANIMATION_TIME_PER_CHILD
			}s`;

			Array.from( wrapper.children ).forEach( ( child ) =>
				wrapper.append( child.cloneNode( true ) )
			);

			wrapper.style.animationPlayState = 'running';
			wrapper.style.animationDuration = animationDuration;
		},
	},
} );
