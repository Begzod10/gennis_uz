window.addEventListener('DOMContentLoaded', () => {

    // $('[data-img=open-modal-payment]').on('click', function () {
    //     $('.overlay_change, .overlay_change_payment_modal').fadeIn();
    // });

    $('.overlay_change_payment_modal__close').on('click', function () {
        $('.overlay_change, .overlay_change_payment_modal').fadeOut();
    });

    const overlay_change = document.querySelector('.overlay_change'),
        overlay_payment = document.querySelector('.overlay_change_payment_modal');

    if (overlay_change) {
        overlay_change.addEventListener('click', (e) => {
            if (e.target === overlay_change) {
                overlay_change.style.display = 'none'
                overlay_payment.style.display = 'none'
            }
        })
    }


    const select_change_payment = document.querySelector('.overlay_change_payment_modal_select'),
        salary_form = document.querySelector('.salary-form'),
        debt_form = document.querySelector('.debt-form');
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
    ///////////////////////////

    const edit_close = document.querySelector('.edit_close'),
        edit_open = document.querySelector('.edit_open'),
        salary = document.querySelector('.list_salary_form_number'),
        input_salary = document.querySelector('.number_salary_input'),
        submit = document.querySelector('.submit_salary')


    if (edit_close && edit_open) {
        edit_close.addEventListener('click', () => {
            edit_close.style.display = 'none'
            edit_open.style.display = "block"
            salary.style.display = 'block'
            input_salary.style.display = 'none'
            submit.style.display = 'none'
        })
        edit_open.addEventListener('click', () => {
            edit_close.style.display = 'block'
            edit_open.style.display = "none"
            salary.style.display = 'none'
            input_salary.style.display = 'block'
            submit.style.display = 'block'
        })

    }
    document.querySelector('.cash').addEventListener('click', () => {
        document.querySelector('.payment_type').value = "cash";
    })
    document.querySelector('.bank').addEventListener('click', () => {
        document.querySelector('.payment_type').value = "click";
    })
    document.querySelector('.click').addEventListener('click', () => {
        document.querySelector('.payment_type').value = "bank";
    })


    let salary_delete = document.querySelectorAll('.salary_delete');
    salary_delete.forEach((delete_btn, index) => {
        delete_btn.addEventListener('click', (event), () => {
            event.preventDefault()
        })
    })

    //    User password check
    let user_check = document.getElementById('user_check'),
        interval,
        checked_status;
    document.querySelector('.overlay_change_payment_modal__close').addEventListener('click', () => {
        checked_status = false;
        $('.overlay_change, .overlay_change_payment_modal').fadeOut();
        window.location.reload()
    })
    $('[data-img=open-modal-payment]').on('click', function () {
        document.querySelector('.user').classList.add('user_active');
        $('.controller_password').click()
    });
    user_check.addEventListener('input', () => {
        interval = setInterval(checkUser, 2000)
    })

    function checkUser() {
        fetch('/check_password/' + user_check.dataset.user_id, {
            method: 'POST',
            body: JSON.stringify({
                'password': user_check.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                checked_status = jsonResponse['checked']
                if (checked_status) {
                    $('.overlay_change, .overlay_change_payment_modal').fadeIn();
                    document.querySelector('.user').classList.remove('user_active');
                } else {
                    $('.overlay_change, .overlay_change_payment_modal').fadeOut();
                    clearInterval(interval)
                }
            })
    }

    $('.user_check button').on('click', function () {
        document.querySelector('.user').classList.remove('user_active');
    });

})