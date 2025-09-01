import { useBlockProps } from '@wordpress/block-editor';
import formatNumber from './format.ts';

export default ( { attributes } ) => {
	const { value, prefix, suffix } = attributes;
	const displayedValue = formatNumber( value );
	const blockProps = useBlockProps.save();

	return (
		<p { ...blockProps }>{ `${ prefix }${ displayedValue }${ suffix }` }</p>
	);
};
