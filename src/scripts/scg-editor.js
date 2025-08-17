// Editor scripts.
import { __ } from '@wordpress/i18n';
import {
	registerBlockStyle,
	registerBlockVariation,
	unregisterBlockType,
} from '@wordpress/blocks';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import domReady from '@wordpress/dom-ready';

domReady( function () {
	unregisterBlockType( 'core/details' );
} );

// Add block styles to core blocks.
registerBlockStyle( 'core/list', {
	name: 'spaced',
	label: __( 'Spaced', 'scg' ),
} );

registerBlockStyle( 'core/navigation', {
	name: 'main',
	label: __( 'Main Navigation', 'scg' ),
} );

registerBlockStyle( 'core/cover', {
	name: 'page-splash',
	label: __( 'Page Splash', 'scg' ),
} );

registerBlockStyle( 'core/cover', {
	name: 'section-splash',
	label: __( 'Section Splash', 'scg' ),
} );

// Register block variations.
registerBlockVariation( 'core/spacer', {
	name: 'scg/spacer',
	title: __( 'SCG Spacer', 'scg' ),
	isDefault: true,
	category: 'scg',
	attributes: {
		height: '1px',
	},
} );

// Register rich-text formats.
registerFormatType( 'scg/text-shadow', {
	title: __( 'Text Shadow', 'scg' ),
	tagName: 'span',
	className: 'scg-text-shadow',
	edit( { isActive, onChange, value } ) {
		const setTextShadow = () => {
			onChange(
				toggleFormat( value, {
					type: 'scg/text-shadow',
				} )
			);
		};

		return (
			<RichTextToolbarButton
				isActive={ isActive }
				icon="edit"
				title={ __( 'Text Shadow', 'scg' ) }
				onClick={ setTextShadow }
			/>
		);
	},
} );
