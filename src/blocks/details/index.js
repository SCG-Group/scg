import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { details as icon } from '@wordpress/icons';

import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	edit,
	save,
	icon,
	__experimentalLabel: ( attributes, { context } ) => {
		const { summary } = attributes;

		const customName = attributes?.metadata?.name;
		const hasSummary = summary?.trim().length > 0;

		// In the list view, use the block's summary as the label.
		// If the summary is empty, fall back to the default label.
		if ( context === 'list-view' && ( customName || hasSummary ) ) {
			return customName || summary;
		}
	},
} );
