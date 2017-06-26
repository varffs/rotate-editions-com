<?php
  $redirect = home_url('#!/page/' . $post->post_title);
  header('HTTP/1.1 301 Moved Permanently');
  header ('Location: ' . $redirect);
  exit;
?>