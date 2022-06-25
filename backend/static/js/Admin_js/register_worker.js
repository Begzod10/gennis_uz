window.addEventListener('DOMContentLoaded', () => {
    //Username Checking
    const username_users = document.querySelectorAll('.username'),
        username_teachers = document.querySelectorAll('.username2'),
        username_input = document.querySelector('.username_input'),
        username_error = document.querySelector('.username_error'),
        submit = document.querySelector('.submit');
    username_error.style.display = "none";

    username_input.addEventListener('input', () => {
        fetch('/check_username/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username_input.value.toUpperCase()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                if (jsonResponse['found'] === false) {
                    username_error.style.display = "none";
                } else {
                    username_error.style.display = "block";
                }
            })
    })

    function DisabledSubmit() {
        submit.disabled = true;
        submit.style.cursor = "not-allowed";
    }

    function NotDisabledSubmit() {
        submit.disabled = false;
        submit.style.cursor = "pointer";
    }


    //Button remove form active
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault()
        })
    })
    // Birth Year Checking
    const birth_year = document.querySelector('.birth_year'),
        birth_month = document.querySelector('.birth_month'),
        birth_day = document.querySelector('.birth_day'),
        birth_date_error = document.querySelector('#birth_date_error');
    birth_date_error.style.display = "none";

    function BirthYearChecking() {
        birth_year.addEventListener('click', () => {
            if (birth_year.value > 2015) {
                setTimeout(extra, 500)

                function extra() {
                    birth_date_error.style.display = "";
                    DisabledSubmit()
                }
            } else {
                setTimeout(extra2, 500)

                function extra2() {
                    birth_date_error.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }

    function birthDataRequired() {
        if (birth_day.value === "Р”РµРЅСЊ" || birth_month.value === "РњРµСЃСЏС†" || birth_year.value === "Р“РѕРґ") {
            DisabledSubmit()
        } else {
            NotDisabledSubmit()
        }

    }

    BirthYearChecking()

    // Password length, Password Check, Show Password

    //Password Length
    const password1 = document.querySelector('#password1'),
        password2 = document.querySelector('#password2'),
        password_check = document.querySelector('#password_check'),
        password_length = document.querySelector('#password_length'),
        passwords = document.querySelectorAll('.password');
    checkbox = document.querySelector('.checkbox');
    password_length.style.display = "none";

    function PasswordLength() {
        password1.addEventListener('keyup', () => {
            if (password1.value.length < 7) {
                setTimeout(extra, 500)

                function extra() {
                    password_length.style.display = "";
                    DisabledSubmit()
                }
            } else {
                setTimeout(extra2, 500)

                function extra2() {
                    password_length.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }

    PasswordLength()

    //Password check
    password_check.style.display = "none";

    function PasswordCheck() {
        password2.addEventListener('keyup', () => {
            if (password1.value !== password2.value) {
                setTimeout(extra, 500)

                function extra() {
                    password_check.style.display = "";
                    DisabledSubmit()
                }
            } else {
                setTimeout(extra2, 500)

                function extra2() {
                    password_check.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }

    PasswordCheck()

    // Show Password
    function ShowPassword() {
        checkbox.addEventListener('click', () => {
            passwords.forEach(password => {
                if (password.type === 'text') {
                    password.type = 'password';
                } else {
                    password.type = 'text'
                }
            })
        })
    }

    ShowPassword()













    //Location Choose
    const location_input = document.querySelector('.location_input'),
        xojakent = document.querySelector('#xojakent'),
        gazalkent = document.querySelector('#gazalkent'),
        chirchiq = document.querySelector('#chirchiq');

    xojakent.addEventListener('click', () => {
        location_input.value = 1;
    })
    gazalkent.addEventListener('click', () => {
        location_input.value = 2;
    })
    chirchiq.addEventListener('click', () => {
        location_input.value = 3;
    })
    birthDataRequired()


    let new_job = document.querySelector('.new_job'),
        job = document.querySelector('.job');

    new_job.addEventListener('input',()=>{
        if (new_job.value != null || new_job.value !== ""){
            job.value = "Выберите профессию";
        }
    })


})