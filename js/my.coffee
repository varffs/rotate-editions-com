l = (data) ->
	console.log data

jQuery(document).ready ($) ->

# 	hide safari menu in iOS
	if /mobile/i.test(navigator.userAgent) and !window.location.hash
		setTimeout (-> window.scrollTo(0, 1)), 0

# 	/mobile/i.test(navigator.userAgent) && !window.location.hash && setTimeout(function() {
# 		window.scrollTo 0, 1
# 	}, 0);

	if !Modernizr.svg
		$('img[src*="svg"]').attr 'src', ->
			$(@).attr 'src' .replace '.svg', '.png'

	$('a.title-trigger').on click: (e) ->
		e.preventDefault()
		$(this).parent().parent('div').find('.content-triggered').slideToggle()
		return

	$('#projects-trigger').on click: () ->
		$('#projects').slideToggle()
		return

	$('div.project').each ->
		color = $(this).css('color');
		$(this).find('svg').css('fill', color)

	width = $('#main-content').innerWidth()

	$('div.page').each ->
		titlewidth = $(this).find('.page-title').innerWidth()
		$(this).find('.page-content').css('margin-left', (width/2)-(titlewidth/2) + 'px')

	hash = window.location.hash.substr 3
	params = hash.split '/'
	if params[0] == 'project'
		$('#project-'+params[1]).find('a.title-trigger').trigger 'click'
		window.location.hash = ''
	else if params[0] == 'page'
		$('#'+params[1]).find('a.title-trigger').trigger 'click'
		window.location.hash = ''