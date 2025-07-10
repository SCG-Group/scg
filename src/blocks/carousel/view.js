import { store, getElement } from '@wordpress/interactivity';

const { state, callbacks } = store( 'scg/carousel', {
	callbacks: {
		initCarousel( element ) {
			if ( ! element ) {
				( { ref: element } = getElement() );
			}

			const wrapper = element.querySelector(
				'.wp-block-scg-carousel__wrapper'
			);

			if ( ! wrapper ) {
				return;
			}

			if ( element.clientWidth < wrapper.offsetWidth ) {
				wrapper.style.animationPlayState = 'running';
			}
		},
	},
} );
