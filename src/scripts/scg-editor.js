// Editor scripts.
import { __ } from '@wordpress/i18n';

// Main navigation link.
wp.blocks.registerBlockStyle( 'core/navigation-link', {
	name: 'main',
	label: __( 'Main Navigation', 'scg' ),
} );

// Fullscreen cover image.
wp.blocks.registerBlockVariation( 'core/cover', {
	name: 'scg/cover',
	title: __( 'SCG Cover', 'scg' ),
	category: 'scg',
	attributes: {
		providerNameSlug: 'scg/cover',
		useFeaturedImage: true,
		hasParallax: true,
		dimRatio: 20,
		minHeight: 100,
		minHeightUnit: 'vh',
		contentPosition: 'bottom left',
		overlayColor: '#000000',
		customOverlayColor: '#000000',
		isUserOverlayColor: true,
		isDark: true,
		sizeSlug: 'large',
		templateLock: 'contentOnly',
	},
	innerBlocks: [ [ 'core/post-title' ], [ 'core/post-excerpt' ] ],
	isActive: [ 'providerNameSlug' ],
} );

// wp.blocks.registerBlockVariation( 'core/cover', {
// 	name: 'scg/cover',
// 	title: __( 'SCG Cover', 'scg' ),
// 	category: 'scg',
// 	attributes: {
// 		providerNameSlug: 'scg/cover',
// 		useFeaturedImage: false,
// 		hasParallax: true,
// 		dimRatio: 0,
// 		minHeight: 100,
// 		minHeightUnit: 'vh',
// 		isUserOverlayColor: false,
// 		sizeSlug: 'large',
// 		templateLock: 'contentOnly',
// 		allowedBlocks: [],
// 	},
// 	innerBlocks: [],
// 	isActive: [ 'providerNameSlug' ],
// } );
