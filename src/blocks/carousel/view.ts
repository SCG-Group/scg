import { store, getElement } from '@wordpress/interactivity';

const ANIMATION_TIME_PER_CHILD = 10;

store( 'scg/carousel', {
	callbacks: {
		initCarousel( element?: HTMLElement ) {
			const el = element || ( getElement().ref as HTMLElement );
			const wrapper = el.querySelector(
				'.wp-block-scg-carousel__wrapper'
			) as HTMLElement;

			if ( el.clientWidth < wrapper.offsetWidth ) {
				wrapper.style.animationPlayState = 'running';
				wrapper.style.animationDuration = `${
					wrapper.children.length * ANIMATION_TIME_PER_CHILD
				}s`;
			}
		},
	},
} );
