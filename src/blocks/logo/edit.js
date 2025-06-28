import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Logo from './logo';

export default function ( { attributes, setAttributes } ) {
	const { isLink } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ isLink }
						label={ __( 'Link to homepage', 'scg' ) }
						onChange={ ( val ) => setAttributes( { isLink: val } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<Logo />
			</div>
		</>
	);
}
