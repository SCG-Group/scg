<?php
/**
 * Theme setup
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

/**
 * Add feature support
 */
function setup_theme() {
	// Use exceprt in pages.
	add_post_type_support( 'page', 'excerpt' );
}
