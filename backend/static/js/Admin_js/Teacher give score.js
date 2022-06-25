$(document).ready(function () {
    $('.list_students_overflow').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="../../static/img/for_home_icons/previous.png" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../../static/img/for_home_icons/next.png" alt=""></button>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
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
window.addEventListener('DOMContentLoaded', () => {
    //check Attendance
    const present = document.querySelectorAll('.present'),
        absent = document.querySelectorAll('.absent'),
        cancel = document.querySelectorAll('.list_students_item_cancel'),
        actual_att = document.querySelector('.actual_att'),
        type_attendance = document.querySelectorAll('.type_attendance');
    present.forEach(item => {
        item.addEventListener('click', () => {
            type_attendance.forEach(att => {
                att.value = "present";
            })
        })
    })
    absent.forEach(item => {
        item.addEventListener('click', () => {
            type_attendance.forEach(att => {
                att.value = "absent";
            })
        })
    })
    cancel.forEach(item => {
        item.addEventListener('click', () => {
            type_attendance.forEach(att => {
                att.value = "cancel";
            })
        })
    })

    function showItems(items) {
        items.forEach(item => {
            item.style.display = "flex";
        })
    }

    function hideItems(items) {
        items.forEach(item => {
            item.style.display = "none";
        })
    }

    // if (actual_att.innerHTML === "present") {
    //     showItems(document.querySelectorAll('.list_students_item_balls'));
    //     hideItems(document.querySelectorAll('.present'))
    //     hideItems(document.querySelectorAll('.absent'))
    //     showItems(document.querySelectorAll('.list_students_item_cancel'))
    //     showItems(document.querySelectorAll('.list_students_item_form'))
    //     hideItems(document.querySelectorAll('.list_students_item_attendance'))
    // }
    // if (actual_att.innerHTML === "absent") {
    //     showItems(document.querySelectorAll('.list_students_item_absent'))
    //     hideItems(document.querySelectorAll('.present'))
    //     hideItems(document.querySelectorAll('.absent'))
    //     showItems(document.querySelectorAll('.list_students_item_cancel'))
    //     hideItems(document.querySelectorAll('.list_students_item_attendance'))
    // }
    // if (actual_att.innerHTML === "cancel") {
    //
    //     hideItems(document.querySelectorAll('.list_students_item_form'))
    //     showItems(document.querySelectorAll('.present'))
    //     showItems(document.querySelectorAll('.absent'))
    //     hideItems(document.querySelectorAll('.list_students_item_cancel'))
    //     hideItems(document.querySelectorAll('.list_students_item_balls'))
    //     showItems(document.querySelectorAll('.list_students_item_attendance'))
    //     hideItems(document.querySelectorAll('.list_students_item_absent'))
    // }

    // for (let i = 0; i < present.length; i++) {
    //     present[i].addEventListener('click', () => {
    //         console.log(i)
    //         document.getElementsByClassName('list_students_item_balls')[`${i}`].style.display = "flex";
    //         document.getElementsByClassName('present')[`${i}`].style.display = "none";
    //         document.getElementsByClassName('absent')[`${i}`].style.display = "none";
    //         document.getElementsByClassName('list_students_item_cancel')[`${i}`].style.display = "flex";
    //         document.getElementsByClassName('list_students_item_form')[`${i}`].style.display = "flex";
    //         document.getElementsByClassName('list_students_item_attendance')[`${i}`].style.display = 'none';
    //     })
    // }
    console.log(document.querySelectorAll('.list_students_item').length)
    console.log(present.length)
    console.log(document.getElementsByClassName('list_students_item_balls').length)
    present.forEach((item, index) => {
        item.addEventListener('click', () => {
            document.getElementsByClassName('list_students_item_balls')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('present')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('absent')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('list_students_item_cancel')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('list_students_item_form')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('list_students_item_attendance')[`${index + 1}`].style.display = 'none';
        })
    })
    absent.forEach((item, index) => {
        item.addEventListener('click', () => {
            document.getElementsByClassName('list_students_item_absent')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('present')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('absent')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('list_students_item_cancel')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('list_students_item_attendance')[`${index + 1}`].style.display = 'none';
        })
    })
    cancel.forEach((item, index) => {
        item.addEventListener('click', () => {
            document.getElementsByClassName('list_students_item_form')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('present')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('absent')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('list_students_item_cancel')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('list_students_item_balls')[`${index + 1}`].style.display = "none";
            document.getElementsByClassName('list_students_item_attendance')[`${index + 1}`].style.display = "flex";
            document.getElementsByClassName('list_students_item_absent')[`${index + 1}`].style.display = "none";
        })
    })


    //Score
    const homework1 = document.querySelectorAll('.homework1'),
        homework2 = document.querySelectorAll('.homework2'),
        homework3 = document.querySelectorAll('.homework3'),
        homework4 = document.querySelectorAll('.homework4'),
        homework5 = document.querySelectorAll('.homework5'),
        homework = document.querySelectorAll('.homework');

    for (let i = 0; i < homework1.length; i++) {
        homework1[i].addEventListener('click', () => {
            document.getElementsByClassName('homework1')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('homework2')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework3')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework')[`${i+1}`].value = 1;
        })
    }
    for (let i = 0; i < homework2.length; i++) {
        homework2[i].addEventListener('click', () => {
            document.getElementsByClassName('homework1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework2')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('homework3')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework')[`${i+1}`].value = 2;
        })
    }
    for (let i = 0; i < homework3.length; i++) {
        homework3[i].addEventListener('click', () => {
            document.getElementsByClassName('homework1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework3')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('homework4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework')[`${i+1}`].value = 3;
        })
    }
    for (let i = 0; i < homework4.length; i++) {
        homework4[i].addEventListener('click', () => {
            document.getElementsByClassName('homework1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework3')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework4')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('homework5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('homework')[`${i+1}`].value = 4;
        })
    }
    for (let i = 0; i < homework5.length; i++) {
        homework5[i].addEventListener('click', () => {
            document.getElementsByClassName('homework1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework3')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework4')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('homework5')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('homework')[`${i+1}`].value = 5;
        })
    }
    const active1 = document.querySelectorAll('.active1'),
        active2 = document.querySelectorAll('.active2'),
        active3 = document.querySelectorAll('.active3'),
        active4 = document.querySelectorAll('.active4'),
        active5 = document.querySelectorAll('.active5'),
        active = document.querySelectorAll('.active');
    console.log(active1)
    for (let i = 0; i < active1.length; i++) {
        active1[i].addEventListener('click', () => {
            document.getElementsByClassName('active1')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('active2')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active3')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active')[`${i+1}`].value = 1;
        })
    }
    for (let i = 0; i < active2.length; i++) {
        active2[i].addEventListener('click', () => {
            document.getElementsByClassName('active1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active2')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('active3')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active')[`${i+1}`].value = 2;
        })
    }
    for (let i = 0; i < active3.length; i++) {
        active3[i].addEventListener('click', () => {
            document.getElementsByClassName('active1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active3')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('active4')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active')[`${i+1}`].value = 3;
        })
    }
    for (let i = 0; i < active4.length; i++) {
        active4[i].addEventListener('click', () => {
            document.getElementsByClassName('active1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active3')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active4')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('active5')[`${i+1}`].classList.remove('checked');
            document.getElementsByClassName('active')[`${i+1}`].value = 4;
        })
    }
    for (let i = 0; i < active5.length; i++) {
        active5[i].addEventListener('click', () => {
            document.getElementsByClassName('active1')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active2')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active3')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active4')[`${i+1}`].classList.add('checked');
            document.getElementsByClassName('active5')[`${i+1}`].classList.toggle('checked');
            document.getElementsByClassName('active')[`${i+1}`].value = 5;
        })
    }

    // Flash
    const close_flash = document.querySelector('.close_flash'),
        for_flash = document.querySelector('.for_flash');
    if (close_flash) {
        close_flash.addEventListener('click', () => {
            for_flash.style.display = "none";
        })
    }
    const kun = document.querySelector('.kun');
    if (kun) {
        kun.addEventListener('click', () => {
            console.log(kun.value)
        })
    }
    const dictionary1 = document.querySelectorAll('.dictionary1'),
        dictionary2 = document.querySelectorAll('.dictionary2'),
        dictionary3 = document.querySelectorAll('.dictionary3'),
        dictionary4 = document.querySelectorAll('.dictionary4'),
        dictionary5 = document.querySelectorAll('.dictionary5');
    for (let i = 0; i < dictionary1.length; i++) {
        dictionary1[i].addEventListener('click', () => {
            document.getElementsByClassName('dictionary1')[`${i}`].classList.toggle('checked');
            document.getElementsByClassName('dictionary2')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary3')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary4')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary5')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary')[`${i}`].value = 1;
        })
    }
    for (let i = 0; i < dictionary2.length; i++) {
        dictionary2[i].addEventListener('click', () => {
            document.getElementsByClassName('dictionary1')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary2')[`${i}`].classList.toggle('checked');
            document.getElementsByClassName('dictionary3')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary4')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary5')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary')[`${i}`].value = 2;
        })
    }
    for (let i = 0; i < dictionary3.length; i++) {
        dictionary3[i].addEventListener('click', () => {
            document.getElementsByClassName('dictionary1')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary2')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary3')[`${i}`].classList.toggle('checked');
            document.getElementsByClassName('dictionary4')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary5')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary')[`${i}`].value = 3;
        })
    }
    for (let i = 0; i < dictionary4.length; i++) {
        dictionary4[i].addEventListener('click', () => {
            document.getElementsByClassName('dictionary1')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary2')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary3')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary4')[`${i}`].classList.toggle('checked');
            document.getElementsByClassName('dictionary5')[`${i}`].classList.remove('checked');
            document.getElementsByClassName('dictionary')[`${i}`].value = 4;
        })
    }
    for (let i = 0; i < dictionary5.length; i++) {
        dictionary5[i].addEventListener('click', () => {
            document.getElementsByClassName('dictionary1')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary2')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary3')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary4')[`${i}`].classList.add('checked');
            document.getElementsByClassName('dictionary5')[`${i}`].classList.toggle('checked');
            document.getElementsByClassName('dictionary')[`${i}`].value = 5;
        })
    }


})