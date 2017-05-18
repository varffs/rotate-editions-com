Site = {
  init: function() {
    this.Swiper.init();
    this.Menu.init();
    this.Router.init();
    this.Layout.init();
  },
};

Site.Menu = {
  init: function() {

    // bind slide toggles
    $('.title-trigger').on({
      click: function(e) {
        e.preventDefault();
        $(this).parent().parent('div').find('.content-triggered').slideToggle();
      }
    });

    // bind project toggles
    $('#projects-trigger').on({
      click: function() {
        $('#projects').slideToggle();
      }
    });

  },
};

Site.Router = {
  init: function() {
    var _this = this;
    var hash = window.location.hash;

    if (hash) {
      _this.onLoad(hash);
    }
  },

  onLoad: function(rawHash) {
    var _this = this;
    var hash = rawHash.substr(3);
    var params = hash.split('/');

    if (params[0] === 'project') {
      var $project = $('#project-' + params[1]);

      $('#projects').slideDown();
      $project.find('.post-content').slideDown();

      _this.clearUrl();
    } else if (params[0] === 'page') {
      var $page = $('#' + params[1].toLowerCase());

      $page.find('.page-content').slideDown();

      _this.clearUrl();
    }
  },

  clearUrl: function() {
    window.location.hash = '';
    history.pushState({}, '', './');
  }
};

Site.Layout = {
  init: function() {
    var _this = this;

    _this.setSvgColors();

    _this.customAlignment();

    // custom alignments when fonts are ready
    document.onreadystatechange = function() {
      if (document.readyState === 'complete') {
        _this.customAlignment();
      }
    };
  },

  setSvgColors: function() {
    $('div.project').each(function() {
      var color = $(this).css('color');

      $(this).find('svg').css('fill', color);
    });
  },

  customAlignment: function() {
    var width = $('#main-content').innerWidth();

    $('div.page').each(function() {
      var titlewidth = $(this).find('.page-title').innerWidth();
      return $(this).find('.page-content').css('margin-left', (width / 2) - (titlewidth / 2) + 'px');
    });
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