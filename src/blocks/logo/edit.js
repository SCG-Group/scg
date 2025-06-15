/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Logo from './logo';

export default function ( { attributes, setAttributes } ) {
	const { width, isLink } = attributes;

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
					<UnitControl
						__next40pxDefaultSize
						label={ __( 'Width', 'scg' ) }
						isDragEnabled="false"
						onChange={ ( val ) => setAttributes( { width: val } ) }
						min={ 10 }
						value={ width }
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					style: {
						width,
					},
				} ) }
			>
				<Logo />
			</div>
		</>
	);
}
