window.addEventListener('DOMContentLoaded', () => {

    $('[data-img=open-modal-edit]').on('click', function () {
        $('.overlay_change, .overlay_change_info_modal').fadeIn();
    });

    $('#overlay_change_info_modal_delete_button').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeIn();
    });

    $('[data-img=open-modal-payment]').on('click', function () {
        $('.overlay_change, .overlay_change_payment_modal').fadeIn();
    });


    $('.overlay_submit_modal_delete_select_yes').on('click', function () {
        $('.overlay_submit_modal_delete_select_yes_submit').click()
    });


    $('.overlay_change_info_modal__close').on('click', function () {
        $('.overlay_change, .overlay_change_info_modal').fadeOut();
    });
    $('.overlay_change_payment_modal__close').on('click', function () {
        $('.overlay_change, .overlay_change_payment_modal').fadeOut();
    });

    $('.overlay_submit_modal_delete__close').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });


    $('.overlay_submit_modal_delete_select_no').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });


    const overlay_change = document.querySelector('.overlay_change'),
        overlay_payment = document.querySelector('.overlay_change_payment_modal'),
        overlay_info = document.querySelector('.overlay_change_info_modal'),
        overlay_submit = document.querySelector('.overlay_submit');


    overlay_change.addEventListener('click', (e) => {
        if (e.target === overlay_change) {
            overlay_change.style.display = 'none'
            overlay_info.style.display = 'none'
            overlay_payment.style.display = 'none'
        }
    })
    overlay_submit.addEventListener('click', (e) => {
        if (e.target === overlay_submit) {
            overlay_submit.style.display = 'none'
        }
    })
    const select_change_payment = document.querySelector('.overlay_change_payment_modal_select'),
        debt_form = document.querySelector('.debt-form');
    const select_change = document.querySelector('.overlay_change_info_modal_select'),
        password_form = document.querySelector('.password-form'),
        info_form = document.querySelector('.info_form');
    select_change.addEventListener('click', () => {
        if (select_change.value === 'Изменить инфо') {
            password_form.style.display = 'none'
            info_form.style.display = 'flex'
        } else if (select_change.value === 'Изменить пароль') {
            info_form.style.display = 'none'
            password_form.style.display = 'flex'
        }
    })

    if (select_change_payment) {
        select_change_payment.addEventListener('click', () => {
            if (select_change_payment.value === 'salary') {
                debt_form.style.display = 'none'
                salary_form.style.display = 'flex'
                console.log('hello')
            } else if (select_change_payment.value === 'debt') {
                salary_form.style.display = 'none'
                debt_form.style.display = 'flex'
            }
        })
    }
    const students_money = document.querySelectorAll('.Profile_box_info_additional_info_salary_list_item span'),
        all_money = document.querySelector('.Profile_box_info_additional_info')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
    })

    all_money.innerHTML = numberWithCommas(all_money.innerHTML)

})