/* eslint-disable react/jsx-no-target-blank */

import { useBlockProps } from '@wordpress/block-editor';
import Marker from '../cert/marker';

export default ( { attributes } ) => {
	const blockProps = useBlockProps.save();
	const { url, position } = attributes;
	return (
		<a
			href={ url }
			target="_blank"
			{ ...blockProps }
			onClick={ ( e ) => e.preventDefault() }
		>
			<span>{ position }</span>
			<Marker />
		</a>
	);
};
