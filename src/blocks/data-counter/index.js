import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import metadata from './block.json';
import { pin as icon } from '@wordpress/icons';

import './style.scss';

registerBlockType( metadata.name, {
	edit,
	icon,
} );
