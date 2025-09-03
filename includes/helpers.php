<?php
/**
 * Helper functions
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

/**
 * Sanitizes SVG element.
 *
 * @return array
 */
function sanitize_svg() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$svg_args = array(
		'svg'  => array(
			'xmlns'   => true,
			'width'   => true,
			'height'  => true,
			'viewbox' => true,
			'role'    => true,
			'class'   => true,
		),
		'path' => array(
			'd'                 => true,
			'fill'              => true,
			'class'             => true,
			'stroke'            => true,
			'stroke-width'      => true,
			'stroke-miterlimit' => true,
			'stroke-linecap'    => true,
		),
		'g'    => array(
			'clip-path' => true,
		),
		'defs' => true,
		'rect' => array(
			'width'     => true,
			'height'    => true,
			'fill'      => true,
			'transform' => true,
		),
	);
	return array_merge( $kses_defaults, $svg_args );
}

/**
 * Sanitizes SVG element - wp_kses helper.
 *
 * @param string $content HTML content to sanitize.
 * @return string Sanitized HTML.
 */
function wp_kses_svg( $content ) {
	return wp_kses( $content, sanitize_svg() );
}
