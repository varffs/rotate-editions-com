<?php
  get_header();

  $shop_link = IGV_get_option('_cmb_site_options', '_cmb_shop_url');
?>

	<!-- main content -->

	<section id="main-content">

		<div><h1 id="projects-trigger" class="pointer">Rotate Editions;</h1></div>

		<section id="projects">

		<?php
			global $query_string;
			parse_str($query_string, $get_array);
			$alter_query = array(
				'post_type' => 'project'
			);
			$args = array_merge($get_array, $alter_query);
			query_posts($args);

			if ( have_posts() ) : while ( have_posts() ) : the_post();
				$meta = get_post_meta($post->ID);
		?>
			<div <?php post_class(); ?> id="project-<?php echo $post->post_name; ?>" style="margin-left: <?php if (!empty($meta['_cmb_indent'][0])) { echo $meta['_cmb_indent'][0];} ?>px; <?php if (!empty($meta['_cmb_color'][0])) { echo 'color: ' . $meta['_cmb_color'][0];} ?>;">

				<h1><a class="post-title title-trigger" data-project=true data-target="<?php echo $post->post_name; ?>">
					<?php
						if ($meta['_cmb_logo_svg'][0]) {
							echo file_get_contents($meta['_cmb_logo_svg'][0]);
						}  else {
							the_title();
						}
						if (!empty($meta['_cmb_editions'][0])) { echo '<span class="editions">' . $meta['_cmb_editions'][0] . '</span>';} ?>
				</a></h1>

				<div class="post-content content-triggered">
	 	 	 		<?php the_content(); ?>
				</div>

			</div>
		<?php endwhile; else: ?>
			<p><?php _e('Sorry, no posts matched your criteria :{'); ?></p>
		<?php endif; ?>

		</section>

		<div class="page" id="about">
			<h1><a class="page-title title-trigger" data-target="about">About;</a></h1>

			<div class="page-content content-triggered">
				<?php pageContent('about'); ?>

				<!-- Begin MailChimp Signup Form -->
        <div id="mc_embed_signup">
          <form action="//rotate-editions.us13.list-manage.com/subscribe/post?u=ae07f925ac9375ac81960fdd5&amp;id=20de9646be" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
              <h3>Subscribe to our mailing list</h3>
              <div class="mc-field-group">
              	<label for="mce-EMAIL">Email Address*</label>
              	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
              </div>
              <div class="mc-field-group">
              	<label for="mce-FNAME">First Name </label>
              	<input type="text" value="" name="FNAME" class="" id="mce-FNAME">
              </div>
              <div class="mc-field-group">
              	<label for="mce-LNAME">Last Name </label>
              	<input type="text" value="" name="LNAME" class="" id="mce-LNAME">
              </div>
            	<div id="mce-responses" class="clear">
            		<div class="response" id="mce-error-response" style="display:none"></div>
            		<div class="response" id="mce-success-response" style="display:none"></div>
            	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_ae07f925ac9375ac81960fdd5_20de9646be" tabindex="-1" value=""></div>
              <div class="mc-field-group cf">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
              </div>
            </div>
          </form>
        </div>
        <!--End mc_embed_signup-->
			</div>
		</div>

		<div class="page" id="links">
			<h1><a class="page-title title-trigger" data-target="links">Links;</a></h1>

			<div class="page-content content-triggered">
				<?php pageContent('links'); ?>
			</div>
		</div>

		<div class="page" id="contact">
			<h1><a class="page-title title-trigger" data-target="contact">Contact<?php if ($shop_link) {echo ';';} ?></a></h1>

			<div class="page-content content-triggered">
				<?php pageContent('contact'); ?>
			</div>
		</div>

		<?php
  	  if ($shop_link) {
    ?>
		<div class="page" id="shop">
			<h1><a class="page-title" href="<?php echo $shop_link; ?>">Shop</a></h1>
		</div>
    <?php
  	  }
  ?>

	<!-- end main-content -->

	</section>

<?php get_footer(); ?>