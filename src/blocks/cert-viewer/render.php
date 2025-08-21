<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package SCG
 */

use function SCG\wp_kses_svg;

// Initial block context.
$context = array(
	'pdf'           => null,
	'page'          => null,
	'canvas'        => null,
	'canvasContext' => null,
);
?>
<div
	role="dialog"
	aria-modal="true"
	aria-label="<?php esc_html_e( 'Certificate viewer', 'scg' ); ?>"
	<?php echo get_block_wrapper_attributes(); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/cert-viewer"
	data-wp-watch--url="callbacks.handleUrlChange"
	data-wp-watch--open="callbacks.handleModalOpen"
	data-wp-bind--hidden="!state.isModalOpen"
	data-wp-on-async-document--keydown="callbacks.escClose"
	data-wp-init="callbacks.setupAnimation"
	hidden>
	<div class="wp-block-scg-cert-viewer__modal" data-wp-bind--hidden="state.documentLoading">
		<div class="wp-block-scg-cert-viewer__canvas" tabindex="0">
			<div class="wp-block-scg-cert-viewer__error" data-wp-bind--hidden="!state.error" role="alert"><?php esc_html_e( 'A problem occured while loading this document. Please try again later.', 'scg' ); ?></div>
			<canvas data-wp-bind--hidden="state.error" aria-label="Certificate document"></canvas>
		</div>
		<footer>
			<div data-wp-bind--hidden="!state.hasPages">
				<button type="button" data-wp-on-async--click="actions.prevPage" data-wp-bind--disabled="!state.hasPrevPage" ><?php esc_html_e( 'Previous page', 'scg' ); ?></button>
				<button type="button" data-wp-on-async--click="actions.nextPage" data-wp-bind--disabled="!state.hasNextPage" ><?php esc_html_e( 'Next page', 'scg' ); ?></button>
			</div>
			<div data-wp-bind--hidden="state.error">
				<button type="button" data-wp-on-async--click="actions.zoomIn" data-wp-bind--disabled="!state.canZoomIn" ><?php esc_html_e( 'Zoom In', 'scg' ); ?></button>
				<button type="button" data-wp-on-async--click="actions.zoomOut" data-wp-bind--disabled="!state.canZoomOut" ><?php esc_html_e( 'Zoom Out', 'scg' ); ?></button>
			</div>
			<div class="wp-block-scg-cert-viewer__modal-close">
				<button type="button" data-wp-on-async--click="actions.closeModal"><?php esc_html_e( 'Close', 'scg' ); ?></button>
			</div>
		</footer>
	</div>
	<div class="wp-block-scg-cert-viewer__loading" data-wp-bind--hidden="!state.isLoading" role="status">
		<img src="<?php echo esc_attr( get_theme_file_uri( '/assets/images/spinner.svg' ) ); ?>" alt="Loading" aria-hidden="true" />
		<span class="sr-only"><?php esc_html_e( 'Loading', 'scg' ); ?></span>
	</div>
	<div class="wp-block-scg-cert-viewer__backdrop" data-wp-on-async--click="actions.closeModal"></div>
</div>