import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import MarkerIcon from './marker';

export default ( { attributes } ) => {
	const { icon, hasIcon } = attributes;
	const title = attributes.summary ?? __( 'SCG Details', 'scg' );

	return (
		<div { ...useBlockProps.save() }>
			<div className="wp-block-scg-details__summary">
				{ hasIcon && icon && <img src={ icon } alt="icon" /> }
				<RichText.Content value={ title } tagName="p" />
				<MarkerIcon />
			</div>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'wp-block-scg-details__content',
				} ) }
			/>
		</div>
	);
};
