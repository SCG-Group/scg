import { registerBlockType } from '@wordpress/blocks';
import { siteLogo as icon } from '@wordpress/icons';
import edit from './edit';
import metadata from './block.json';
import './style.scss';

registerBlockType( metadata.name, {
	edit,
	icon,
} );
