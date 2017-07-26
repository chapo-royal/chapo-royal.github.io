$(document).ready(() => {
  const handleHashChange = () => {
    const { hash } = window.location;
    const $page = $(hash);
    if (!$page.length) return;
    $('.wrapper-menu, #menu').removeClass('open');
    $('.page').removeClass('active');
    $page.addClass('active');
  };
  handleHashChange();
  $(window).on('hashchange', handleHashChange);

  const onResize = () => {
    const { clientWidth } = document.body;
    const desktop = clientWidth > 768;
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

  const $presentation = $('#presentation');
  const $indicator = $presentation.find('.indicator');
  const $slide = $presentation.find('.slide');
  $indicator.click(function () {
    const index = $indicator.index($(this));
    $indicator.removeClass('active');
    $(this).addClass('active');
    $slide.removeClass('active');
    $slide.eq(index).addClass('active');
  });


  const $partenaires = $('#partenaires');
  const $popup = $partenaires.find('.popup');
  const $land = $partenaires.find('.land');
  $land.mousemove(function (e) {
    $land.css('fill', '');
    $(this).css('fill', '#D0021B');

    const title = $(this).attr('title');
    const id = $(this).attr('id');
    $partenaires.find('.description').text(`Description of ${title} (${id})`);

    const { clientX, clientY } = e;
    $popup.css({ top: clientY - $popup.outerHeight(), left: clientX });
    $('#label-city').text(title);
    $popup.addClass('active');
  });
  $land.mouseout(() => {
    $land.css('fill', '');
    $partenaires.find('.description').text('');
    $popup.removeClass('active');
  });
});