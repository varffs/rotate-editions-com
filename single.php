<?php
	$redirect = home_url('#!/project/' . $post->ID);
	header('HTTP/1.1 301 Moved Permanently');
	header ('Location: ' . $redirect);
	exit;
?>