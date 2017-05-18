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
    this.bind();
  },

  bind: function() {
    var _this = this;

    // bind slide toggles
    $('.title-trigger').on({
      click: function(e) {
        var data = $(this).data();

        e.preventDefault();

        if (data.project) {
          _this.toggleProject(data.target);
        } else {
          _this.togglePage(data.target);
        }
      }
    });

    // bind project toggles
    $('#projects-trigger').on({
      click: function() {
        _this.toggleProjects();
      }
    });
  },

  toggleProjects: function() {
    $('#projects').slideToggle();
  },

  toggleProject: function(project) {
    var $project = $('#project-' + project);

    $project.find('.post-content').slideToggle();
  },

  togglePage: function(page) {
    var $page = $('#' + page);

    $page.find('.page-content').slideToggle();
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
      Site.Menu.toggleProjects();
      Site.Menu.toggleProject(params[1].toLowerCase());
    } else if (params[0] === 'page') {
      Site.Menu.togglePage(params[1].toLowerCase());
    }

    _this.clearUrl();
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