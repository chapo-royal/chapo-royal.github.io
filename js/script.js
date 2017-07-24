$(document).ready(() => {
  const handleHashChange = () => {
    const { hash } = window.location;
    const $page = $(hash);
    if (!$page.length) return;
    $('#menu').removeClass('open');
    $('.page').removeClass('active');
    $page.addClass('active');
  };
  handleHashChange();
  $(window).on('hashchange', handleHashChange);

  const onResize = () => {
    const { clientWidth } = document.body;
    const desktop = clientWidth > 960;
    const mobile = !desktop;
    $('body').toggleClass('desktop', desktop);
    $('body').toggleClass('mobile', mobile);
  };
  onResize();
  window.onresize = onResize;


  $('.wrapper-menu').click(() => {
    $('.wrapper-menu, #menu').toggleClass('open');
  });


  let letter_index = 0;
  window.setInterval(() => {
    const $letter = $('.letter');
    letter_index++;
    letter_index %= $letter.length;
    $letter.removeClass('active');
    $letter.eq(letter_index).addClass('active');
  }, 5000);


  const $popup = $('#partenaires .popup');
  $('.wrapper-map svg .land').mousemove(function (e) {
    $('.wrapper-map svg .land').css('fill', '');
    $(this).css('fill', '#D0021B');

    const title = $(this).attr('title');
    const id = $(this).attr('id');
    $('#partenaires .description').text(`Description of ${title} (${id})`);

    const { clientX, clientY } = e;
    $popup.css({ top: clientY - $popup.outerHeight(), left: clientX });
    $('#label-city').text(title);
    $popup.addClass('active');
  });
  $('.wrapper-map svg .land').mouseout(function (e) {
    $('.wrapper-map svg .land').css('fill', '');
    $('#partenaires .description').text('');
    $popup.removeClass('active');
  });
});