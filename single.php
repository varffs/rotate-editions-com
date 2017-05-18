<?php
	$redirect = home_url('#!/project/' . $post->post_name);
	header('HTTP/1.1 301 Moved Permanently');
	header ('Location: ' . $redirect);
	exit;
?>