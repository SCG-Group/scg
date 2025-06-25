<?php
/**
 * Title: Site Footer
 * Slug: scg/footer
 * Categories: footer
 *
 * @package WordPress
 * @subpackage SCG
 */

?>
<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"var:preset|spacing|128","bottom":"var:preset|spacing|128"}}},"backgroundColor":"base","textColor":"white"} -->
<div class="wp-block-group is-layout-constrained has-base-background-color has-background has-white-color has-text-color" style="padding-top:var(--wp--preset--spacing--128);padding-bottom:var(--wp--preset--spacing--128);">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:paragraph {"style":{"layout":{"selfStretch":"fill","flexSize":null}}} -->
			<p>Transport<br />excellence</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:paragraph {"style":{"layout":{"selfStretch":"fill","flexSize":null}}} -->
			<p>For all inquires please contact us at contact@scgtransport.com or 0048 539 926 274</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
	<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"},"className":"scg-footer__bottom","fontSize":"14"} -->
	<div class="wp-block-group scg-site-footer__bottom has-14-font-size">
		<!-- wp:scg/logo {"isLink":false, "className": "is-style-secondary"} /-->
		<!-- wp:paragraph -->
		<p>&copy; <?php echo esc_html( sprintf( '%1$s %2$s %3$s', __( 'Copyright', 'scg' ), gmdate( 'Y' ), get_bloginfo( 'name' ) ) ); ?></p>
		<!-- /wp:paragraph -->
		<!-- wp:navigation {"overlayMenu":"never"} -->
			<!-- wp:navigation-link {"label":"Privacy Policy","type":"page","url":"#","kind":"post-type"} /-->
			<!-- wp:navigation-link {"label":"Terms and conditions","type":"page","url":"#","kind":"post-type"} /-->
		<!-- /wp:navigation -->
		<!-- wp:template-part {"slug":"social-media-links","theme":"scg"} /-->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->