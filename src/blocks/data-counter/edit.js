import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line
	__experimentalInputControl as InputControl, // eslint-disable-line
} from '@wordpress/components';
import formatNumber from './format.ts';

export default ( { attributes, setAttributes } ) => {
	const { value, step, prefix, suffix } = attributes;
	const displayedValue = formatNumber( value, document.documentElement.lang );
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Data point', 'scg' ) }>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Numerical value', 'scg' ) }
						value={ value }
						onChange={ ( val ) =>
							setAttributes( { value: Number( val ) } )
						}
					/>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Increment by', 'scg' ) }
						value={ step }
						onChange={ ( val ) =>
							setAttributes( { step: Number( val ) } )
						}
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Prefix', 'scg' ) }
						value={ prefix }
						onChange={ ( val ) => setAttributes( { prefix: val } ) }
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Suffix', 'scg' ) }
						value={ suffix }
						onChange={ ( val ) => setAttributes( { suffix: val } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<p
				{ ...blockProps }
			>{ `${ prefix }${ displayedValue }${ suffix }` }</p>
		</>
	);
};
