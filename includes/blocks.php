<?php
/**
 * Theme blocks
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add custom block category
 *
 * @param array[] $categories Array of categories for block types.
 * @return array[]
 */
function add_block_category( $categories ) {
	$custom_category = array(
		array(
			'slug'  => 'scg',
			'title' => 'SCG',
			'icon'  => null,
		),
	);

	return array_merge( $custom_category, $categories );
}

/**
 * Register theme blocks
 */
function init_blocks() {
	// Logo.
	register_block_type(
		get_theme_file_path( '/build/blocks/scg-logo' )
	);
}
