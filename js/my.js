// Generated by CoffeeScript 1.6.3
(function(){var e;e=function(e){return console.log(e)};jQuery(document).ready(function(e){var t,n,r;/mobile/i.test(navigator.userAgent)&&!window.location.hash&&setTimeout(function(){return window.scrollTo(0,1)},0);Modernizr.svg||e('img[src*="svg"]').attr("src",function(){return e(this).attr("src".replace(".svg",".png"))});e("a.title-trigger").on({click:function(t){t.preventDefault();e(this).parent().parent("div").find(".content-triggered").slideToggle()}});e("#projects-trigger").on({click:function(){e("#projects").slideToggle()}});e("div.project").each(function(){var t;t=e(this).css("color");return e(this).find("svg").css("fill",t)});r=e("#main-content").innerWidth();e("div.page").each(function(){var t;t=e(this).find(".page-title").innerWidth();return e(this).find(".page-content").css("margin-left",r/2-t/2+"px")});t=window.location.hash.substr(3);n=t.split("/");if(n[0]==="project"){e("#project-"+n[1]).find("a.title-trigger").trigger("click");return window.location.hash=""}if(n[0]==="page"){e("#"+n[1]).find("a.title-trigger").trigger("click");return window.location.hash=""}})}).call(this);