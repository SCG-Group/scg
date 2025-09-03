import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import metadata from './block.json';

import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	edit,
	__experimentalLabel: ( attributes, { context } ) => {
		const { name } = attributes;

		const customName = attributes?.metadata?.name;
		const hasName = name?.trim().length > 0;

		if ( context === 'list-view' && ( customName || hasName ) ) {
			return customName || name;
		}
	},
} );
