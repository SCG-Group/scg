// Editor scripts.
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

// Add style for core blocks.
registerBlockStyle( 'core/navigation-link', {
	name: 'main',
	label: __( 'Main Navigation', 'scg' ),
} );

registerBlockStyle( 'core/list', {
	name: 'spaced',
	label: __( 'Spaced', 'scg' ),
} );

// Register text-shadow format
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
