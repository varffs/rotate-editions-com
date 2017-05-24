<?php
/**
 * Hook in and add metaboxes. Can only happen on the 'cmb2_init' hook.
 */
add_action( 'cmb2_init', 'igv_cmb_metaboxes' );
function igv_cmb_metaboxes() {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_cmb_';

	/**
	 * Metaboxes declarations here
   * Reference: https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php
	 */

  $about_meta = new_cmb2_box( array(
		'id'            => $prefix . 'about',
		'title'         => esc_html__( 'About Metabox', 'cmb2' ),
		'object_types'  => array( 'page', ), // Post type
		'show_on'       => array( 'key' => 'id', 'value' => array( 50 ) ),
	) );

	$about_meta->add_field( array(
		'name'       => esc_html__( 'Short about', 'cmb2' ),
		'desc'       => esc_html__( 'viewable on the frontpage', 'cmb2' ),
		'id'         => $prefix . 'short_about',
		'type'       => 'wysiwyg',
	) );

  // PROJECT META

  $project_meta = new_cmb2_box( array(
		'id'            => $prefix . 'project',
		'title'         => esc_html__( 'Project Metabox', 'cmb2' ),
		'object_types'  => array( 'project', ), // Post type
	) );

	$project_meta->add_field( array(
		'name'       => esc_html__( 'Editioning number', 'cmb2' ),
		'id'         => $prefix . 'editions',
		'type'       => 'text',
	) );

	$project_meta->add_field( array(
		'name'       => esc_html__( 'Indent', 'cmb2' ),
		'desc'       => esc_html__( 'a number up to 530', 'cmb2' ),
		'id'         => $prefix . 'indent',
		'type'       => 'text',
	) );

	$project_meta->add_field( array(
		'name'       => esc_html__( 'Color', 'cmb2' ),
		'desc'       => esc_html__( 'text color as css code', 'cmb2' ),
		'id'         => $prefix . 'color',
		'type'       => 'text',
	) );

	$project_meta->add_field( array(
		'name'       => esc_html__( 'Logo SVG', 'cmb2' ),
		'id'         => $prefix . 'logo_svg',
		'type'       => 'file',
	) );

	$project_meta->add_field( array(
		'name'       => esc_html__( 'Fallback logo PNG', 'cmb2' ),
		'id'         => $prefix . 'logo_png',
		'type'       => 'file',
	) );

}
?>