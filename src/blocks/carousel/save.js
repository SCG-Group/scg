import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function () {
	return (
		<section { ...useBlockProps.save() }>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'wp-block-scg-carousel__wrapper',
				} ) }
			/>
		</section>
	);
}
