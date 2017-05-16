<?php
add_filter( 'cmb_meta_boxes', 'cmb_sample_metaboxes' );

function cmb_sample_metaboxes( array $meta_boxes ) {

	$prefix = '_cmb_';

	$meta_boxes[] = array(
		'id' => 'about_metabox',
		'title' => 'About meta',
		'pages' => array('page'),
		'show_on' => array( 'key' => 'id', 'value' => array( 50 ) ),
		'context' => 'normal',
		'priority' => 'high',
		'show_names' => true,
		'fields' => array(
			array(
				'name' => 'Short about',
				'desc' => 'Viewable on the frontpage',
				'id'   => $prefix . 'short_about',
				'type' => 'wysiwyg',
			)
		),
	);

	$meta_boxes[] = array(
		'id'         => 'postype_metabox',
		'title'      => 'Project Settings',
		'pages'      => array( 'project', ),
		'context'    => 'normal',
		'priority'   => 'high',
		'show_names' => true,
		'fields'     => array(
			array(
				'name' => 'Editioning number',
				'desc' => '...',
				'id'   => $prefix . 'editions',
				'type' => 'text',
			),
			array(
				'name' => 'Indent',
				'desc' => 'a number up to 530',
				'id'   => $prefix . 'indent',
				'type' => 'text',
			),
			array(
				'name' => 'Color',
				'desc' => 'text color as css code',
				'id'   => $prefix . 'color',
				'type' => 'text',
			),
			array(
				'name' => 'Logo SVG',
				'desc' => '...',
				'id'   => $prefix . 'logo_svg',
				'type' => 'file',
			),
			array(
				'name' => 'Fallback logo PNG',
				'desc' => 'for older browsers that do not support',
				'id'   => $prefix . 'logo_png',
				'type' => 'file',
			)
		),
	);

	return $meta_boxes;
}
?>