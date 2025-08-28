import { getElement, store } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

store( 'scg/scroll-badge', {
	callbacks: {
		initScrollBadge: () => {
			const element = getElement().ref;

			gsap.registerPlugin( ScrollTrigger );

			gsap.to( '#scg-scroll-badge-frame', {
				scrollTrigger: {
					trigger: element,
					scrub: true,
					start: 'bottom bottom',
					end: 'bottom top',
				},
				rotation: 720,
				transformOrigin: 'center',
				ease: 'power3.in',
			} );
		},
	},
} );
