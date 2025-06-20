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
	register_block_type( get_theme_file_path( '/build/blocks/logo' ) );

	// Fullscreen Image.
	register_block_type( get_theme_file_path( '/build/blocks/fullscreen-image' ) );
}

/**
 * Allow additional blocks inside core/navigation.
 *
 * @param array $metadata Metadata for registering a block type.
 * @return array
 */
function modify_navigation_allowed_blocks( $metadata ) {

	// Only apply the filter to Heading blocks.
	if ( ! isset( $metadata['name'] ) || 'core/navigation' !== $metadata['name'] ) {
		return $metadata;
	}

	$metadata['allowedBlocks'] = array_merge( $metadata['allowedBlocks'], array( 'scg/logo', 'core/template-part' ) );

	return $metadata;
}

/**
 * Modify core/cover block to include adminbar.
 *
 * @param string $block_content The block content.
 * @return string
 */
function modify_cover_block_render( $block_content ) {
	$tags = new \WP_HTML_Tag_Processor( $block_content );

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-cover' ) ) ) {
		$style         = $tags->get_attribute( 'style' );
		$updated_style = str_replace( '100vh', 'calc(100vh - var(--wp-admin--admin-bar--height, 0px))', $style );
		$tags->set_attribute( 'style', $updated_style );
	}

	return $tags->get_updated_html();
}

/**
 * Modify available levels in core/heading block - remove h1 and h6.
 *
 * @param array  $args Array of arguments for registering a block type.
 * @param string $block_type Block type name including namespace.
 * @return array
 */
function modify_heading_block_levels( $args, $block_type ) {
	if ( 'core/heading' !== $block_type ) {
		return $args;
	}

	$args['attributes']['levelOptions']['default'] = array( 2, 3, 4, 5 );

	return $args;
}
