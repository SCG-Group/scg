<?php
/**
 * SCG Logo block
 *
 * @package WordPress
 * @subpackage SCG
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use function SCG\sanitize_svg;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'style' => $attributes['width'] ?? "width: {$attributes['width']}",
	)
);

$logo_file = file_get_contents( get_theme_file_path( '/src/blocks/scg-logo/logo.svg') ); // @codingStandardsIgnoreLine.
?>

<?php if ( $attributes['isLink'] ) : ?>
	<a href="<?php echo esc_url( get_home_url() ); ?>" <?php echo wp_kses_data( $wrapper_attributes ); ?> aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		<?php echo wp_kses( $logo_file, sanitize_svg() ); ?>
	</a>
<?php else : ?>
	<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
		<?php echo wp_kses( $logo_file, sanitize_svg() ); ?>
	</div>
<?php endif; ?>