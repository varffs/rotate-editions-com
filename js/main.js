var customAlignments = function() {
  width = $('#main-content').innerWidth();

  $('div.page').each(function() {
    var titlewidth;
    titlewidth = $(this).find('.page-title').innerWidth();
    return $(this).find('.page-content').css('margin-left', (width / 2) - (titlewidth / 2) + 'px');
  });
}

jQuery(document).ready(function($) {

  var hash, params, width;

  // scrolltop if is mobile and no hash set?
  if (/mobile/i.test(navigator.userAgent) && !window.location.hash) {
    setTimeout((function() {
      return window.scrollTo(0, 1);
    }), 0);
  }

  // check SVG support and replace .png (perhaps now outdated)
  if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src'.replace('.svg', '.png'));
    });
  }

  // bind slide toggles
  $('a.title-trigger').on({
    click: function(e) {
      e.preventDefault();
      $(this).parent().parent('div').find('.content-triggered').slideToggle();
    }
  });

  $('#projects-trigger').on({
    click: function() {
      $('#projects').slideToggle();
    }
  });

  // set SVG fills
  $('div.project').each(function() {
    var color;
    color = $(this).css('color');
    return $(this).find('svg').css('fill', color);
  });

  // hash param routing
  hash = window.location.hash.substr(3);
  params = hash.split('/');

  if (params[0] === 'project') {
    $('#project-' + params[1]).find('a.title-trigger').trigger('click');
    return window.location.hash = '';
  } else if (params[0] === 'page') {
    $('#' + params[1]).find('a.title-trigger').trigger('click');
    return window.location.hash = '';
  }

  // custom alignment before fontface
  customAlignments();

});

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // custom alignments when fonts are ready
    customAlignments();
  }
};