window.addEventListener('DOMContentLoaded',()=> {

    $(document).ready(function() {
      $('.Profile_agreement_image').magnificPopup({type:'image'});
    });

    $('.Profile_agreement_image').magnificPopup({
      type: 'image'
    });

    $('.Profile_info_img').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeIn();
        $('.modal_change_img_form_file').click()
    });

    $('.modal_change_img_select_yes').on('click', function () {
        $('.modal_change_img_select_yes_submit').click()
    });

    $('.modal_change_img_select_no').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeOut();
    });

    $('.modal_change_img_close').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeOut();
    });



    $('.Profile_info_settings').on('click', function () {
        $('.overlay, [data-modal=user-password]').fadeIn();
    });

    $('.modal-password__close_2').on('click', function () {
        $('.overlay, [data-modal=user-password]').fadeOut();
    });



    const overlay_password = document.querySelector('.overlay-password');

    if (overlay_password) {
        overlay_password.addEventListener('click', (e) => {
            if (overlay_password) {
                if (e.target === overlay_password) {
                    overlay_password.style.display = 'none'
                }
            }
        })
    }

    const teacher_salary_all = document.querySelectorAll('.Profile_info_account_number_span'),
        teacher_salary_loc = document.querySelectorAll('.Profile_account_item_number_span')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    teacher_salary_all.forEach(teacher_salary_all => {
        teacher_salary_all.innerHTML = numberWithCommas(teacher_salary_all.innerHTML)
    })

    teacher_salary_loc.forEach(teacher_salary_loc => {
        teacher_salary_loc.innerHTML = numberWithCommas(teacher_salary_loc.innerHTML)
    })



})