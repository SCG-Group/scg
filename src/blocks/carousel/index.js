import { registerBlockType } from '@wordpress/blocks';
import { gallery as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';

registerBlockType( metadata.name, {
	edit,
	save,
	icon,
} );
