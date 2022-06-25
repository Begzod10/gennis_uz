new WOW().init()

$('body').append('<div class="load" id="loading">\n' +
    '        <div class="container">\n' +
    '            <div class="load__box">\n' +
    '                <div class="load__box_logo">\n' +
    '                    <div class="load__box_logo_box">\n' +
    '                        <img class="load__box_logo_box_shapka" src="/static/img/for_home_icons/shapka.png" alt="Logo_shapka">\n' +
    '                        <img class="load__box_logo_box_moylov" src="/static/img/for_home_icons/moylov.png" alt="Logo_moylov">\n' +
    '                    </div>\n' +
    '                    <div class="load__box_title">\n' +
    '                        Gennis\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '       </div>\n' +
    '</div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( "#loading" ).fadeOut(500, function() {
      // fadeOut complete. Remove the loading div
      $( "#loading" ).remove(); //makes page more lightweight
  });
}




const display = document.querySelector('nav')

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ) {
    display.classList.add('second-navbar');
  }
  else {
    display.classList.remove('second-navbar');
  }
}

window.onscroll = function() {scrollFunction()};

$(document).ready(function(){
  $('.comment__overflow').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 10000,
      prevArrow: '<button type="button" class="slick-prev"><img src="/static/img/for_home_icons/previous.png" alt=""></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/static/img/for_home_icons/next.png" alt=""></button>',
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,

          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }

    ],
  });
});



$(document).ready(function() {
  $('.gallery-item_image_link').magnificPopup({type:'image'});
});

$('.gallery-item_image_link').magnificPopup({
  type: 'image'
});










window.addEventListener('DOMContentLoaded', () => {


    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })




    const menu_subject = document.querySelector('.subject__list_menu'),
    menuItem_subject = document.querySelectorAll('.subject__list_menu_item'),
    subjectlist = document.querySelector('.subject__list'),
    hamburger_subject = document.querySelector('.subject__hamburger');

    hamburger_subject.addEventListener('click', () => {
        hamburger_subject.classList.toggle('subject__hamburger_active');
        console.log('hello')
        subjectlist.classList.toggle('subject__list_active');
        menu_subject.classList.toggle('subject__list_menu_active');
    });

    menuItem_subject.forEach(item => {
        item.addEventListener('click', () => {
            hamburger_subject.classList.toggle('subject__hamburger_active');
            subjectlist.classList.toggle('subject__list_active');
            menu_subject.classList.toggle('subject__list_menu_active');
        })
    })

    const filials_link = document.querySelectorAll('.map_locations_list_item'),
    filials = document.querySelectorAll('.map_iframe')
    filials_link.forEach(item => {
        item.addEventListener('click', () => {
            console.log('hello')
            if (item.getAttribute('data-map') === 'Xojakent') {
                console.log('hi')
                filials.forEach(filial => {
                    console.log('salom')
                    if (filial.classList.contains('Xojakent')) {
                        filial.classList.remove('display_none')

                    }
                    else {
                        filial.classList.add('display_none')

                    }
                })
            }
            else if (item.getAttribute('data-map') === 'Gazalkent') {
                filials.forEach(filial => {
                    if (filial.classList.contains('Gazalkent')) {
                        filial.classList.remove('display_none')

                    }
                    else {
                        filial.classList.add('display_none')

                    }
                })
            }
        })
    })


    const subject = document.querySelectorAll('.subject__box_item'),
    list = document.querySelectorAll('.subject__list_menu_item')


    function removeActive(){
        list.forEach(item=>{
            item.classList.remove('active_subject_item')
        })
    }
    list.forEach(item => {
        item.addEventListener('click', () => {
            removeActive()
            item.classList.add('active_subject_item')
            if (item.getAttribute("data-subject") === 'Matematika') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Math_box')) {
                        sub_item.classList.remove('display_none')

                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Ingliz tili') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('English_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Fizika') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Physic_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Rus tili') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Russia_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Ona tili va Adabiyot') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Mother_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Tarix') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('History_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Kimyo') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Chemistry_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
            if (item.getAttribute("data-subject") === 'Biologiya') {
                subject.forEach(sub_item => {
                    if (sub_item.classList.contains('Biology_box')) {
                        sub_item.classList.remove('display_none')
                        item.classList.add('active_subject_item')
                    }
                    else {
                        sub_item.classList.add('display_none')

                    }
                })
            }
        })
    })



    $(window).scroll(function() {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });


    $("a[href='#up']").click(function() {
      $("html, body").animate({ scrollTop: 0 });
      return false;
    });

    $('[data-modal=event_1]').on('click', function () {
        $('.overlay, #event_1').fadeIn('slow');
    });
    $('[data-modal=event_2]').on('click', function () {
        $('.overlay, #event_2').fadeIn('slow');
    });
    $('[data-modal=event_3]').on('click', function () {
        $('.overlay, #event_3').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #event_3, #event_1, #event_2').fadeOut('slow');
    });

    const Event_1 = document.querySelector('.Event_1'),
        Event_2 = document.querySelector('.Event_2')
        Event_3 = document.querySelector('.Event_3')
        event_1 = document.querySelector('.event_1')
        event_2 = document.querySelector('.event_2')
        event_3 = document.querySelector('.event_3')

    desc_1 = Event_1.innerHTML.slice(0, 160)
    event_1.innerHTML =''
    event_1.append(desc_1+'...')
    desc_2 = Event_2.innerHTML.slice(0, 160)
    if (event_2) {
        event_2.innerHTML = ''
        event_2.append(desc_2 + '...')
    }
    desc_3 = Event_3.innerHTML.slice(0, 160)
    event_3.innerHTML =''
    event_3.append(desc_3+'...')


});