import { store, getElement } from '@wordpress/interactivity';

store( 'scg/carousel', {
	callbacks: {
		initCarousel( element?: HTMLElement ) {
			const el = element || ( getElement().ref as HTMLElement );
			const wrapper = el.querySelector(
				'.wp-block-scg-carousel__wrapper'
			) as HTMLElement;

			if ( el.clientWidth < wrapper.offsetWidth ) {
				wrapper.style.animationPlayState = 'running';
			}
		},
	},
} );
