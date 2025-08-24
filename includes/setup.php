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

	// Support block spacing control.
	add_theme_support( 'custom-spacing' );

	// Suppoet wide layout.
	add_theme_support( 'align-wide' );
}

/**
 * Add keys for Google Maps API
 */
function add_google_maps_settings() {
	add_settings_section( 'google_maps_section', 'Google Maps Javascript API', null, 'general' );
	add_settings_field( 'google_maps_api_key', 'Google Maps API Key', __NAMESPACE__ . '\google_maps_api_key_field', 'general', 'google_maps_section' );
	add_settings_field( 'google_maps_map_id', 'Google Maps Map ID', __NAMESPACE__ . '\google_maps_map_id_field', 'general', 'google_maps_section' );
	register_setting( 'general', 'google_maps_api_key' );
	register_setting( 'general', 'google_maps_map_id' );
}

/**
 * Display Maps API Key input field in settings.
 */
function google_maps_api_key_field() {
	echo '<input type="text" name="google_maps_api_key" value="' . esc_attr( get_option( 'google_maps_api_key' ) ) . '" class="regular-text" />';
}

/**
 * Display Map ID input field in settings.
 */
function google_maps_map_id_field() {
	echo '<input type="text" name="google_maps_map_id" value="' . esc_attr( get_option( 'google_maps_map_id' ) ) . '" class="regular-text" />';
}
