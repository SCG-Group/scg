<?php
/**
 * Title: 404
 * Slug: scg/404
 * Inserter: no
 *
 * @package WordPress
 * @subpackage SCG
 */

?>

<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
	<div class="wp-block-group">
		<!-- wp:paragraph {"className":"scg-404-heading","style":{"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"layout":{"selfStretch":"fill","flexSize":null}},"textColor":"accent","fontSize":"160","fontFamily":"headings"} -->
		<p class="scg-404-heading has-accent-color has-text-color has-link-color has-headings-font-family has-160-font-size">
			<span class="scg-text-shadow">Error 404</span>
		</p>
		<!-- /wp:paragraph -->

		<!-- wp:image {"width":"128px","height":"128px","scale":"contain"} -->
		<figure class="wp-block-image is-resized">
			<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/404-icon.svg" alt="404" style="object-fit: contain; width: 128px; height: 128px" />
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"1px"} -->
	<div style="height: 1px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis: 50%">
			<!-- wp:heading {"level":1,"className":"is-style-inside","style":{"typography":{"fontWeight":"700","fontStyle":"normal"}},"fontSize":"32","fontFamily":"body"} -->
				<h1 class="wp-block-heading is-style-inside has-body-font-family has-32-font-size" style="font-style:normal;font-weight:700">Page Not Found</h1>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis: 50%">
			<!-- wp:paragraph -->
			<p>We’re sorry, but the page you requested could not be found. Please check the URL or return to the [<a href="/">homepage</a>].</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->