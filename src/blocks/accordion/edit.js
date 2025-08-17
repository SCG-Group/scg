import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const spacer = [ 'core/spacer', { height: '1px' } ];
const template = [ spacer, [ 'scg/details' ], spacer ];

export default () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template,
	} );

	return <div { ...innerBlocksProps } />;
};
