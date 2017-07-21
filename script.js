/**
 * chapo-royal - 
 * @version v1.0.0
 * @author 
 * @link https://github.com/chapo-royal/chapo-royal.github.io
 * @license ISC
 */
"use strict";$(document).ready(function(){var e=function(){var e=window.location.hash,a=$(e);a.length&&($("#menu").removeClass("open"),$(".page").removeClass("active"),a.addClass("active"))};e(),$(window).on("hashchange",e),$(".wrapper-menu").click(function(){$("#menu").addClass("open")}),$(".wrapper-close").click(function(){$("#menu").removeClass("open")});var a=0;window.setInterval(function(){var e=$(".letter");a++,a%=e.length,e.removeClass("active"),e.eq(a).addClass("active")},5e3);var t=$("#partenaires .popup");$(".wrapper-map svg .land").mousemove(function(e){$(".wrapper-map svg .land").css("fill",""),$(this).css("fill","#D0021B");var a=$(this).attr("title"),s=$(this).attr("id");$("#partenaires .description").text("Description of "+a+" ("+s+")");var n=e.clientX,i=e.clientY;t.css({top:i-t.outerHeight(),left:n}),$("#label-city").text(a),t.addClass("active")}),$(".wrapper-map svg .land").mouseout(function(e){$(".wrapper-map svg .land").css("fill",""),$("#partenaires .description").text(""),t.removeClass("active")})});