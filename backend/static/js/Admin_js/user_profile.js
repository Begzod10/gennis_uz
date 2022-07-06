window.addEventListener('DOMContentLoaded', () => {

    // Type Payment

    const cash = document.getElementById('Cash'),
        bank = document.getElementById('Bank'),
        click = document.getElementById('Click'),
        type_payment = document.querySelector('.type_payment');

    cash.addEventListener('click', () => {
        type_payment.value = "cash";
    })
    bank.addEventListener('click', () => {
        type_payment.value = "click";
    })
    click.addEventListener('click', () => {
        type_payment.value = "bank";
    })


    /////// edit-info /////////////////////////////////////////////////


    $('[data-img=open-modal-edit]').on('click', function () {
        $('.overlay_change, .overlay_change_info_modal').fadeIn();
    });


    const select_change = document.querySelector('.overlay_change_info_modal_select'),
        password_form = document.querySelector('.password-form'),
        contract = document.querySelector('.overlay_change_info_modal_contract'),
        info_form = document.querySelector('.info_form');

    select_change.addEventListener('click', () => {
        if (select_change.value === 'Изменить инфо') {
            info_form.style.display = 'flex'
            password_form.style.display = 'none'
            contract.style.display = 'none'
        } else if (select_change.value === 'Изменить пароль') {
            info_form.style.display = 'none'
            password_form.style.display = 'flex'
            contract.style.display = 'none'
        } else if (select_change.value === 'Контракт') {
            info_form.style.display = 'none'
            password_form.style.display = 'none'
            contract.style.display = 'flex'
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////// give admin /////////////////////////////////////////////////////////

    $('#overlay_change_info_modal_delete_button_admin').on('click', function () {
        $('.overlay_admin, .overlay_admin_modal').fadeIn();
    });

    $('.overlay_admin_modal__close').on('click', function () {
        $('.overlay_admin, .overlay_admin_modal').fadeOut();
    });

    const overlay_admin = document.querySelector(".overlay_admin")
    overlay_admin.addEventListener('click', (e) => {
        if (e.target === overlay_admin) {
            overlay_admin.style.display = 'none'
        }
    })


    /////////////////////////////////////////////////////////////////////////////////////////////


    $('.overlay_submit_modal_delete_select_yes').on('click', function () {
        console.log('udalit')
        $('.overlay_submit_modal_delete_select_yes_submit').click()
    });


    $('.overlay_change_info_modal__close').on('click', function () {
        $('.overlay_change, .overlay_change_info_modal').fadeOut();
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
        salary_form = document.querySelector('.salary-form'),
        discount_form = document.querySelector('.discount_form'),
        debt_form = document.querySelector('.debt-form');
    discount_form.style.display = "none";
    if (select_change_payment) {
        select_change_payment.addEventListener('click', () => {
            if (select_change_payment.value === 'salary') {
                debt_form.style.display = 'none'
                salary_form.style.display = 'flex'
                discount_form.style.display = 'none';
            } else if (select_change_payment.value === 'debt') {
                salary_form.style.display = 'none'
                debt_form.style.display = 'flex'
                discount_form.style.display = 'none';
            } else if (select_change_payment.value === "discount") {
                discount_form.style.display = 'flex';
                debt_form.style.display = 'none'
                salary_form.style.display = 'none'
            }
        })
    }
    $('#overlay_change_info_modal_delete_button').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeIn();
    });

    const rating_all_line = document.querySelector('.Profile_box_others_rating_all_bar_line'),
        rating_subjects_line = document.querySelectorAll('.Profile_box_others_rating_subject_bar_line'),
        rating_subjects = document.querySelectorAll('.Profile_box_others_rating_subject_span'),
        rating_all = document.querySelector('.Profile_box_others_rating_all_span');


    function rating() {
        rating_subjects.forEach(subject => {
            let ratings = subject.innerHTML;
            if (ratings >= 5) {
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.width = '100%'
                        line.style.backgroundColor = '#38fa38'
                    }
                })
            } else if (ratings >= 4) {
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.width = '75%'
                        line.style.backgroundColor = '#efff00'
                    }

                })
            } else if (ratings >= 3) {
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.width = '50%'
                        line.style.backgroundColor = '#ff6600'
                    }
                })
            } else if (ratings >= 2) {
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.width = '25%'
                        line.style.backgroundColor = '#ff0000'
                    }
                })
            } else if (ratings >= 1) {
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.width = '5%'
                        line.style.backgroundColor = '#000000'
                    }
                })
            }
        })
        if (rating_all) {
            let all_rat = rating_all.innerHTML;

            if (all_rat >= 5) {
                rating_all_line.style.width = '100%'
                rating_all_line.style.backgroundColor = '#38fa38'
            } else if (all_rat >= 4) {
                rating_all_line.style.width = '75%'
                rating_all_line.style.backgroundColor = '#efff00'
            } else if (all_rat >= 3) {
                rating_all_line.style.width = '50%'
                rating_all_line.style.backgroundColor = '#ff6600'
            } else if (all_rat >= 2) {
                rating_all_line.style.width = '25%'
                rating_all_line.style.backgroundColor = '#ff0000'
            } else if (all_rat >= 1) {
                rating_all_line.style.width = '5%'
                rating_all_line.style.backgroundColor = '#000000'
            }
        }
    }

    rating()
    const select_delete = document.querySelector('.select_delete'),
        input_delete = document.querySelector('.input_delete')
    if (select_delete) {
        select_delete.addEventListener('change', () => {
            if (select_delete.value === 'other_version') {
                input_delete.style.visibility = 'visible'
                input_delete.required = true;
            } else {
                input_delete.style.visibility = 'hidden'
                input_delete.required = false;
            }
        })
    }

    let error_attendance = document.querySelector('.error_attendance'),
        attendance_modal = document.querySelector('.attendance-modal'),
        attendance_close = document.querySelector('.attendance-modal__close');

    // if (error_attendance.innerHTML === "True") {
    //     overlay_change.style.display = "flex";
    //     attendance_modal.style.display = "flex";
    //     attendance_modal.style.flexDirection = "column";
    //
    // }
    attendance_close.addEventListener('click', () => {
        overlay_change.style.display = "none";
        attendance_modal.style.display = "none";
        attendance_modal.style.flexDirection = "column";
    })


//    User password check
    let user_check = document.getElementById('user_check'),
        interval,
        interval2,
        checked_status;
    let user_check2 = document.querySelector('.user_check_password');

    document.querySelector('.overlay_change_payment_modal__close').addEventListener('click', () => {
        checked_status = false;
        $('.overlay_change, .overlay_change_payment_modal').fadeOut();
        window.location.reload()
    })
    $('[data-img=open-modal-payment]').on('click', function () {
        user_check2.style.display = "none"
        user_check.style.display = "initial"
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




    let form_excuse = document.querySelector('.form_excuse'),
        excuses_close = document.querySelector('.excuses_close'),
        excuses = document.querySelector('.excuses');

    form_excuse.addEventListener('click', () => {
        user_check.style.display = "none"
        user_check2.style.display = ""
        document.querySelector('#user').classList.add('user_active');
    })
    user_check2.addEventListener('input', ()=>{
        interval2 = setInterval(checkUser2,2000)
    })


    function checkUser2() {
        fetch('/check_password/' + user_check.dataset.user_id, {
            method: 'POST',
            body: JSON.stringify({
                'password': user_check2.value
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
                    console.log('hello')
                    excuses.classList.add('excuses_active')
                    document.querySelector('.user').classList.remove('user_active');
                } else {
                    excuses.classList.remove('excuses_active')
                    clearInterval(interval2)
                }
            })
    }
    if (excuses_close) {
        excuses_close.addEventListener('click', () => {
            excuses.classList.remove('excuses_active');
            window.location.reload()
        })
    }
})