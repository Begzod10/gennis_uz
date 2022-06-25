$('.container').append('<div class="warning">\n' +
    '            <div class="warning_desc">Пожалуйста, ждите</div>\n' +
    '        </div>');


$(window).on('load', function () {
    setTimeout(removeLoader, 0); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $(".warning").fadeOut(0, function () {
        // fadeOut complete. Remove the loading div
        $(".warning").remove(); //makes page more lightweight

    });
}


window.addEventListener('DOMContentLoaded', () => {


    const menu = document.querySelector('.nav_menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        basic = document.querySelector('.basic'),
        hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('nav_menu_active');
            basic.classList.toggle('basic_active');
        });
    }

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('nav_menu_active');
        })
    })
    const change_photo = document.querySelector('.image_upload'),
        upload = document.querySelector('.upload_img'),
        ready_photo = document.querySelector('.ready_photo');
    if (change_photo) {
        change_photo.addEventListener('mouseleave', () => {
            if (upload.value !== "") {
                ready_photo.style.display = "flex";
            } else {
                ready_photo.style.display = "none";
            }
        });
    }


    $('[data-user=user-profile]').on('click', function () {
        $('.overlay, [data-modal=user-profile]').fadeIn();
    });

    $('#change_profile').on('click', function () {
        $('.overlay-password, [data-modal=user-password]').fadeIn();
    });

    $('.modal__close').on('click', function () {
        $('.overlay, [data-modal=user-profile]').fadeOut();
    });

    $('.modal-password__close_2').on('click', function () {
        $('.overlay-password, [data-modal=user-password]').fadeOut();
    });


    const overlay = document.querySelector('.overlay'),
        overlay_password = document.querySelector('.overlay-password');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none'
            }
        })
    }
    if (overlay_password) {
        overlay_password.addEventListener('click', (e) => {
            if (e.target === overlay_password) {
                overlay_password.style.display = 'none'
            }
        })
    }

    $(
        function () {
            let location = false
            $("#new_student_location_list").hide();
            $("#location_list").click(function () {
                if (location === false) {
                    $("#new_student_location_list").slideDown(50)
                    location = !location
                    $("#new_student_location_list_down").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list").slideUp(50)
                    location = !location
                    $("#new_student_location_list_down").toggleClass('menu_item_li_down_array_active')
                }
            })
        }
    )
    $(
        function () {
            location2 = false
            $("#new_student_location_list_2").hide();
            $("#location_list_2").click(function () {
                if (location2 === false) {
                    $("#new_student_location_list_2").slideDown(50)
                    location2 = !location2
                    $("#new_student_location_list_down_2").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_2").slideUp(50)
                    location2 = !location2
                    $("#new_student_location_list_down_2").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )
    $(
        function () {
            let location3 = false
            $("#new_student_location_list_3").hide();
            $("#location_list_3").click(function () {
                if (location3 === false) {
                    $("#new_student_location_list_3").slideDown(50)
                    location3 = !location3
                    $("#new_student_location_list_down_3").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_3").slideUp(50)
                    location3 = !location3
                    $("#new_student_location_list_down_3").toggleClass('menu_item_li_down_array_active')
                }
            })
        }
    )
    $(
        function () {
            let location4 = false
            $("#new_student_location_list_4").hide();
            $("#location_list_4").click(function () {
                if (location4 === false) {
                    $("#new_student_location_list_4").slideDown(50)
                    location4 = !location4
                    $("#new_student_location_list_down_4").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_4").slideUp(50)
                    location4 = !location4
                    $("#new_student_location_list_down_4").toggleClass('menu_item_li_down_array_active')
                }
            })
        }
    )
    $(
        function () {
            let location5 = false
            $("#new_student_location_list_5").hide();
            $("#location_list_5").click(function () {
                if (location5 === false) {
                    $("#new_student_location_list_5").slideDown(50)
                    location5 = !location5
                    $("#new_student_location_list_down_5").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_5").slideUp(50)
                    location5 = !location5
                    $("#new_student_location_list_down_5").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )
    $(
        function () {
            let location6 = false
            $("#new_student_location_list_6").hide();
            $("#location_list_6").click(function () {
                if (location6 === false) {
                    $("#new_student_location_list_6").slideDown(50)
                    location6 = !location6
                    $("#new_student_location_list_down_6").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_6").slideUp(50)
                    location6 = !location6
                    $("#new_student_location_list_down_6").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )
    $(
        function () {
            let location7 = false
            $("#new_student_location_list_7").hide();
            $("#location_list_7").click(function () {
                if (location7 === false) {
                    $("#new_student_location_list_7").slideDown(50)
                    location7 = !location7
                    $("#new_student_location_list_down_7").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_7").slideUp(50)
                    location7 = !location7
                    $("#new_student_location_list_down_7").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )
    $(
        function () {
            let location8 = false
            $("#new_student_location_list_8").hide();
            $("#location_list_8").click(function () {
                if (location8 === false) {
                    $("#new_student_location_list_8").slideDown(50)
                    location8 = !location8
                    $("#new_student_location_list_down_8").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_8").slideUp(50)
                    location8 = !location8
                    $("#new_student_location_list_down_8").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )
    $(
        function () {
            let location9 = false
            $("#new_student_location_list_9").hide();
            $("#location_list_9").click(function () {
                if (location9 === false) {
                    $("#new_student_location_list_9").slideDown(50)
                    location9 = !location9
                    $("#new_student_location_list_down_9").toggleClass('menu_item_li_down_array_active')
                } else {
                    $("#new_student_location_list_9").slideUp(50)
                    location9 = !location9
                    $("#new_student_location_list_down_9").toggleClass('menu_item_li_down_array_active')
                }
            })

        }
    )

    const flash_load_1 = document.querySelector('.flash_timer_load_line'),
        flash_modal = document.querySelector('.flash'),
        flash_close = document.querySelector('.flash_info_close');


    function removeLoader() {
        if (flash_close) {
            flash_close.addEventListener('click', () => {
                flash_modal.style.display = "none";
            })
            flash_load_1.style.animationDuration = '5s'
            flash_load_1.style.animationPlayState = 'running'
            setTimeout(extra, 5000)

            function extra() {
                flash_modal.style.display = 'none'
                flash_load_1.style.display = 'none'
            }
        }

    }

    removeLoader()

    $(".education_language").click(function () {
        $(".education_language").click(function () {
            $('.form_button').click()
        });
    })
    $(".education_subject").click(function () {
        $(".education_subject").click(function () {
            $('.form_button2').click()
        });
    })
    let sum = document.querySelectorAll('.sums');
    if (sum) {
        sum.forEach(item => {
            item.addEventListener('input', () => {
                if (item.value < 0) {
                    console.log(item.value);
                    item.value = null;
                }

            })
        })


    }
})









