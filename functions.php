<?php
/**
 * Theme functions and definitions
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/includes/assets.php';
require_once __DIR__ . '/includes/blocks.php';
require_once __DIR__ . '/includes/helpers.php';

define( 'SCG_THEME_VERSION', '1.0.0' );

/**
 * Styles and scripts.
 */
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_theme_assets' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_editor_content_assets' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Blocks.
 */
add_filter( 'block_categories_all', __NAMESPACE__ . '\add_block_category', 10, 2 );
add_action( 'init', __NAMESPACE__ . '\init_blocks' );
add_filter( 'block_type_metadata', __NAMESPACE__ . '\modify_navigation_allowed_blocks' );

/**
 * Patterns.
 */
add_filter( 'should_load_remote_block_patterns', '__return_false' );
