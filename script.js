/**
 * chapo-royal - the official website of CHAPOROYAL
 * @version v1.0.0
 * @link https://github.com/chapo-royal/chapo-royal.github.io
 * @license ISC
 */
"use strict";$(document).ready(function(){var e=function(){var e=window.location.hash,t=$(e);t.length&&($("#menu").removeClass("open"),$(".page").removeClass("active"),t.addClass("active"))};e(),$(window).on("hashchange",e);var t=function(){var e=document.body.clientWidth>960,t=!e;$("body").toggleClass("desktop",e),$("body").toggleClass("mobile",t)};t(),window.onresize=t,$(".wrapper-menu").click(function(){$(".wrapper-menu, #menu").toggleClass("open")});var a=0;window.setInterval(function(){var e=$(".letter");a++,a%=e.length,e.removeClass("active"),e.eq(a).addClass("active")},5e3);var s=$("#partenaires .popup");$(".wrapper-map svg .land").mousemove(function(e){$(".wrapper-map svg .land").css("fill",""),$(this).css("fill","#D0021B");var t=$(this).attr("title"),a=$(this).attr("id");$("#partenaires .description").text("Description of "+t+" ("+a+")");var n=e.clientX,i=e.clientY;s.css({top:i-s.outerHeight(),left:n}),$("#label-city").text(t),s.addClass("active")}),$(".wrapper-map svg .land").mouseout(function(e){$(".wrapper-map svg .land").css("fill",""),$("#partenaires .description").text(""),s.removeClass("active")})});