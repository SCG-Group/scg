import { store, getContext, getElement } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import formatNumber from './format.ts';
import { REDUCED_MOTION_QUERY } from '../../scripts/constants.ts';

interface DataCounter {
	value: number;
	step: number;
}

store( 'scg/data-counter', {
	callbacks: {
		init: () => {
			const { value, step } = getContext< DataCounter >();
			const element = getElement().ref as HTMLElement;
			const timeline = gsap.timeline();
			const animation = gsap.matchMedia();

			gsap.registerPlugin( ScrollTrigger );

			animation.add(
				{
					reducedMotion: '(prefers-reduced-motion: reduce)',
					withMotion: REDUCED_MOTION_QUERY,
				},
				( context ) => {
					const { withMotion } = context.conditions as {
						withMotion: boolean;
					};

					timeline.progress( 0 ).pause();
					timeline.to( element, {
						scrollTrigger: {
							trigger: element,
							onEnter: () => {
								if ( withMotion ) {
									timeline.play();
								} else {
									timeline.progress( 1 );
								}
							},
							onEnterBack: () => {
								if ( withMotion ) {
									timeline.play();
								}
							},
							onLeave: () => {
								if ( withMotion ) {
									timeline.pause();
								}
							},
							onLeaveBack: () => {
								if ( withMotion ) {
									timeline.pause();
								}
							},
						},
						textContent: value,
						startAt: {
							textContent: 0,
						},
						snap: {
							textContent: step,
						},
						duration: 3,
						onUpdate: () => {
							element.textContent = formatNumber(
								Number( element.textContent ),
								document.documentElement.lang
							);
						},
					} );
				}
			);

			ScrollTrigger.create( {
				trigger: element,
				onEnter: () => {
					timeline.play();
				},
				onEnterBack: () => {
					timeline.play();
				},
				onLeave: () => {
					timeline.pause();
				},
				onLeaveBack: () => {
					timeline.pause();
				},
			} );
		},
	},
} );
