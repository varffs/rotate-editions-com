var customAlignments = function() {
  width = $('#main-content').innerWidth();

  $('div.page').each(function() {
    var titlewidth;
    titlewidth = $(this).find('.page-title').innerWidth();
    return $(this).find('.page-content').css('margin-left', (width / 2) - (titlewidth / 2) + 'px');
  });
};

jQuery(document).ready(function($) {

  var hash, params, width;

  // scrolltop if is mobile and no hash set?
  if (/mobile/i.test(navigator.userAgent) && !window.location.hash) {
    setTimeout((function() {
      return window.scrollTo(0, 1);
    }), 0);
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

// Site object

Site = {
  init: function() {
    this.Swiper.init();
  },
};

Site.Swiper = {
  $galleries: $('.swiper-container'),
  galleryInstances: [],

  init: function() {
    var _this = this;

    if (_this.$galleries.length) {
      $(document).ready(function() {
        _this.$galleries.each(function(index, item) {
          _this.createGallery(item, index);
        });
      });
    }
  },

  createGallery: function(container, index) {
    var _this = this;

    _this.galleryInstances.push(new Swiper(container, {
      loop: true,
      preloadImages: false,
      lazyLoading: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      observer: true,
      observeParents: true,
      paginationFractionRender: function(swiper, currentClassName, totalClassName) {
        return '<span class="' + currentClassName + '"></span>' + '/' + '<span class="' + totalClassName + '"></span>:';
      },
      onSlideChangeEnd: function(swiper) {
        var $activeSlide = $(swiper.slides[swiper.activeIndex]);
        var $captionTarget = swiper.container.find('.swiper-caption');
        var caption = $activeSlide.data('caption');

        $captionTarget.text(caption);
      },
    }));
  }
};

Site.init();