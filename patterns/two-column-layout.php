<?php
/**
 * Title: Two column layout
 * Slug: scg/two-column-layout
 * Categories: columns
 * Block Types: core/columns
 *
 * @package WordPress
 * @subpackage SCG
 */

?>
<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"50%"} -->
	<div class="wp-block-column" style="flex-basis:50%"><!-- wp:list {"ordered":true,"start":3,"fontSize":"32"} -->
	<ol start="3" class="wp-block-list has-32-font-size"><!-- wp:list-item {"style":{"typography":{"fontWeight":"700","fontStyle":"normal"}}} -->
		<li style="font-style:normal;font-weight:700">Lorem ipsum dolor</li>
		<!-- /wp:list-item -->
	</ol>
	<!-- /wp:list -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"50%"} -->
	<div class="wp-block-column" style="flex-basis:50%"><!-- wp:paragraph -->
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus eu sapien lacinia ultrices. Mauris feugiat, tortor ut laoreet rhoncus, magna justo porta nibh, et tincidunt metus erat ut nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
	<!-- /wp:paragraph -->

	<!-- wp:list {"ordered":true,"className":"is-style-spaced"} -->
	<ol class="wp-block-list is-style-spaced"><!-- wp:list-item -->
		<li>Nullam ac <strong>sapien at erat tempor</strong> condimentum.</li>
		<!-- /wp:list-item -->

		<!-- wp:list-item -->
		<li>Phasellus gravida elit a lectus sodales dignissim.<!-- wp:list -->
		<ul class="wp-block-list"><!-- wp:list-item -->
			<li>Curabitur venenatis felis sit amet lorem tempor, nec ullamcorper lorem malesuada.</li>
			<!-- /wp:list-item -->

			<!-- wp:list-item -->
			<li>Aliquam erat volutpat.</li>
			<!-- /wp:list-item -->
		</ul>
		<!-- /wp:list -->
		</li>
		<!-- /wp:list-item -->

		<!-- wp:list-item -->
		<li>Morbi nec felis vel ex commodo convallis.</li>
		<!-- /wp:list-item -->
	</ol>
	<!-- /wp:list -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->