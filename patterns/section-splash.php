<?php
/**
 * Title: Section Splash
 * Slug: scg/section-splash
 * Categories: featured
 * Block Types: core/cover
 *
 * @package WordPress
 * @subpackage SCG
 */

?>
<!-- wp:cover {"hasParallax":true,"dimRatio":20,"overlayColor":"#000000","customOverlayColor":"#000000","isUserOverlayColor":true,"minHeight":100,"minHeightUnit":"vh","tagName":"section","sizeSlug":"fullscreen","metadata":{"categories":["featured"],"patternName":"scg/section-splash","name":"Section Splash"},"align":"full","className":"scg-featured","layout":{"type":"constrained"}} -->
<section class="wp-block-cover alignfull has-parallax is-style-section-splash" style="min-height:100vh">
	<span aria-hidden="true" class="wp-block-cover__background has-000000-background-color has-background-dim-20 has-background-dim"></span>
	<div class="wp-block-cover__inner-container">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"fontSize":"96"} -->
			<h2 class="wp-block-heading has-96-font-size">Section title</h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:paragraph {"fontSize":"32","fontFamily":"lead"} -->
			<p class="has-lead-font-family has-32-font-size">Section description</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
	</div>
</section>
<!-- /wp:cover -->