<?php
/**
 * Title: Fleet Info
 * Slug: scg/fleet-info
 * Categories: text
 *
 * @package WordPress
 * @subpackage SCG
 */

?>
<!-- wp:group {"metadata":{"name":"Fleet Info"},"align":"full","style":{"spacing":{"blockGap":"var:preset|spacing|64"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:media-text {"align":"full","mediaPosition":"right","mediaType":"image","mediaWidth":48,"verticalAlignment":"top","imageFill":true,"metadata":{"categories":["text"],"patternName":"scg/image-text-left","name":"Image \u0026 Text Left"}} -->
	<div class="wp-block-media-text alignfull has-media-on-the-right is-stacked-on-mobile is-vertically-aligned-top is-image-fill-element" style="grid-template-columns:auto 48%">
	<div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Vans</h3>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"fontSize":"32"} -->
		<p class="has-32-font-size">SCG provides a diverse fleet of vans. They are ideal for fast, efficient shipments with reduced payloads.</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph -->
		<p>Our refrigerated vans are especially suited for pharmaceutical deliveries, ensuring strict temperature control and product safety. The compact size of our light-duty vehicles makes them ideal for deliveries in urban areas where larger vehicles would struggle to manoeuvre. With GPS tracking and optimised routing, these vehicles are perfect for handling multiple delivery stops per route, which is often required for e-commerce, retail and pharmaceutical distribution.</p>
		<!-- /wp:paragraph -->
	</div>
	<figure class="wp-block-media-text__media"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/sample-image.webp" alt="" style="object-position:50% 50%" /></figure>
	</div>
	<!-- /wp:media-text -->

	<!-- wp:group {"metadata":{"name":"Cars","categories":["text"],"patternName":"scg/fleet-info"},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group"><!-- wp:spacer {"height":"1px"} -->
	<div style="height:1px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:group {"metadata":{"name":"Model"},"className":"scg-fleet-model","layout":{"type":"grid","columnCount":4,"minimumColumnWidth":null}} -->
	<div class="wp-block-group scg-fleet-model"><!-- wp:image {"linkDestination":"none","style":{"layout":{"columnSpan":2}}} -->
		<figure class="wp-block-image"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/sample-car-icon.svg" alt="" /></figure>
		<!-- /wp:image -->

		<!-- wp:paragraph {"metadata":{"name":"Name"},"style":{"typography":{"fontWeight":"700","fontStyle":"normal"}},"fontSize":"24"} -->
		<p class="has-24-font-size" style="font-style:normal;font-weight:700">CURTAIN-SIDED VANS (8,9,10 EPAL)</p>
		<!-- /wp:paragraph -->

		<!-- wp:list {"metadata":{"name":"Details"}} -->
		<ul class="wp-block-list"><!-- wp:list-item -->
		<li>Payload: ~1,000 kg</li>
		<!-- /wp:list-item -->

		<!-- wp:list-item -->
		<li>8 EPAL / 9 EPAL / 10 EPAL</li>
		<!-- /wp:list-item -->

		<!-- wp:list-item -->
		<li>Emission Standard: Euro VI</li>
		<!-- /wp:list-item -->
		</ul>
		<!-- /wp:list -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"1px"} -->
	<div style="height:1px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	<!-- wp:paragraph {"fontSize":"24"} -->
	<p class="has-24-font-size"><strong>Optional equipment:</strong> ADR, Tail-lift, Opening roof, TAPA TSR1, GDP, Dual Temp</p>
	<!-- /wp:paragraph -->

	<!-- wp:spacer {"height":"1px"} -->
	<div style="height:1px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->