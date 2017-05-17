<?php
function my_scripts_method() {
  $templateuri = get_template_directory_uri();
  $jslib = $templateuri . '/dist/static/lib.js';
  $myscripts = $templateuri . '/dist/js/main.min.js';

  wp_enqueue_script( 'jslib', $jslib, '', '', true);
  wp_enqueue_script( 'myscripts', $myscripts ,'' ,'' , true);

  wp_enqueue_style( 'site', get_stylesheet_directory_uri() . '/dist/css/site.min.css' );
}
add_action('wp_enqueue_scripts', 'my_scripts_method');

if ( function_exists( 'add_theme_support' ) ) {
  add_theme_support( 'post-thumbnails' );
}
if ( function_exists( 'add_image_size' ) ) {
  add_image_size( 'admin-thumb', 150, 150, false );
  add_image_size( 'opengraph', 400, 300, true );
  add_image_size( 'gallery', 1000, 900, false );
}

get_template_part( 'lib/gallery' );
get_template_part( 'lib/post-types' );
get_template_part( 'lib/meta-boxes' );

add_action( 'init', 'cmb_initialize_cmb_meta_boxes', 9999 );
function cmb_initialize_cmb_meta_boxes() {
  if ( ! class_exists( 'cmb_Meta_Box' ) )
    require_once 'lib/metabox/init.php';
}

/* disable that freaking admin bar */
add_filter('show_admin_bar', '__return_false');

/* turn off version in meta */
function no_generator() { return ''; }
add_filter( 'the_generator', 'no_generator' );

/* show thumbnails in admin lists */
add_filter('manage_posts_columns', 'new_add_post_thumbnail_column');
function new_add_post_thumbnail_column($cols){
  $cols['new_post_thumb'] = __('Thumbnail');
  return $cols;
}
add_action('manage_posts_custom_column', 'new_display_post_thumbnail_column', 5, 2);
function new_display_post_thumbnail_column($col, $id){
  switch($col){
    case 'new_post_thumb':
    if( function_exists('the_post_thumbnail') ) {
      echo the_post_thumbnail( 'admin-thumb' );
      }
    else
    echo 'Not supported in theme';
    break;
  }
}
// Remove WP Emoji
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// remove automatic <a> links from images in blog
function wpb_imagelink_setup() {
  $image_set = get_option( 'image_default_link_type' );
  if($image_set !== 'none') {
    update_option('image_default_link_type', 'none');
  }
}
add_action('admin_init', 'wpb_imagelink_setup', 10);

// CUSTOM FUNCTIONS FOR ROTATE

function pageContent($page) {
  $page = get_page_by_path($page);
  echo wpautop($page->post_content);
}
function cc_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

// LAZY LOADED GALLERIES
// Custom img attributes to be compatible with lazysize
function add_lazy_on_srcset($attr) {

  if (!is_admin()) {

    // if image has data-no-lazysizes attribute dont add lazysizes classes
    if (!isset($attr['data-lazy'])) {
      return $attr;
    }

    // Add lazysize class
    $attr['class'] .= ' swiper-lazy';

    if (isset($attr['srcset'])) {
      // Add lazysize data-srcset
      $attr['data-srcset'] = $attr['srcset'];
      // Remove default srcset
      unset($attr['srcset']);
    } else {
      // Add lazysize data-src
      $attr['data-src'] = $attr['src'];
    }

    unset($attr['src']);
    // Set default to white blank
/*     $attr['src'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAQAAABTNcdGAAAAC0lEQVR42mNkgAIAABIAAmXG3J8AAAAASUVORK5CYII='; */

  }

  return $attr;

}
add_filter('wp_get_attachment_image_attributes', 'add_lazy_on_srcset');
?>