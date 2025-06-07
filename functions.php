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

define( 'SCG_THEME_VERSION', '1.0.0' );

/**
 * Enqueue theme styles and scripts.
 */
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_theme_assets' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_editor_content_assets' );
