import { getElement, store } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { REDUCED_MOTION_QUERY } from '../../scripts/constants.ts';

store( 'scg/scroll-badge', {
	callbacks: {
		initScrollBadge: () => {
			const element = getElement().ref;
			const animation = gsap.matchMedia();

			gsap.registerPlugin( ScrollTrigger );

			animation.add( REDUCED_MOTION_QUERY, () => {
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
			} );
		},
	},
} );
