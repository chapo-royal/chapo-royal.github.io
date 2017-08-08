$(document).ready(() => {
  $(document).on('click', 'a', function (e) {
    const href = $(this).attr('href');
    if (href === '#') e.preventDefault();
  });

  const handleHashChange = () => {
    const { hash } = window.location;
    if (hash === '' || hash === '#') return;
    const [hash_page, has_overlay] = hash.split('-');
    const $page = $(hash_page);
    if (!$page.length) return;
    $('.wrapper-menu, #menu').removeClass('open');
    $('.page').removeClass('active');
    $page.addClass('active');
    $('.overlay').removeClass('active');
    if (has_overlay) {
      $(hash).addClass('active');
    }
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
  const $imageCity = $('#image-city');
  const setImageCity = (id) => $imageCity.css('background-image', `url(/img/partenaires/photos/${id}.jpg)`);
  $partenaires.find('.nation').click(function () {
    if ($(this).hasClass('china')) setImageCity('CN-11');
    if ($(this).hasClass('japan')) setImageCity('JP-13');
    if ($(this).hasClass('korea')) setImageCity('KR-11');
  });
  const $popup = $partenaires.find('.popup');
  const $land = $partenaires.find('.land');
  $land.mousemove(function (e) {
    $land.css('fill', '');
    $(this).css('fill', '#D0021B');

    const title = $(this).attr('title');
    const id = $(this).attr('id');

    const { clientX, clientY } = e;
    $popup.css({ top: clientY - $popup.outerHeight(), left: clientX });
    setImageCity(id);
    $('#label-city').text(title);
    $popup.addClass('active');
  });
  $land.mouseout(() => {
    $land.css('fill', '');
    $popup.removeClass('active');
  });

  const $form = $('#form-contact');
  const $submit = $form.find('[type=submit]');
  $form.submit(function (e) {
    e.preventDefault();
    $submit.prop('disabled', true);
    const type = $form.attr('method');
    const url = $form.attr('action');
    const data = $form.serialize();
    $.ajax({ type, url, data }).done(() => {
      $form[0].reset();
      $form.find('input, textarea').removeClass('error');
      $submit.prop('disabled', false);
      window.location.hash = '#contact-done';
    }).fail((data) => {
      $submit.prop('disabled', false);
      if (data.status === 500 && data.responseJSON) {
        const { error } = data.responseJSON;
        if (error.code === 32002) {
          $form.find('input, textarea').removeClass('error');
          error.fields.forEach((field) => {
            $form.find(`[name=${field}]`).addClass('error');
          });
        } else {
          console.error(error);
          alert(error.msg);
        }
      } else {
        console.error(data);
        alert(data.statusText);
      }
    });
  });
});