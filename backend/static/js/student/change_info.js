window.addEventListener('DOMContentLoaded', () => {

    const username = document.querySelector('.username'),
        username_error = document.querySelector('#Change_info_username_error'),
        password1 = document.querySelector('#password1'),
        password_error = document.querySelector('.password_error'),
        password2 = document.querySelector('#password2'),
        password_error2 = document.querySelector('#password_error2'),
        checkbox = document.querySelector('.checkbox'),
        username1 = document.querySelectorAll('.username1'),
        username2 = document.querySelectorAll('.username2'),
        data_id = document.querySelector('[data-id]'),
        submit = document.querySelector('.Change_info_submit_btn'),
        passwords = document.querySelectorAll('.password');

    function hideErrors() {
        username_error.style.display = "none";
        password_error.style.display = "none";
        password_error.style.color = "red"
        password_error2.style.display = "none";
        username1.forEach(username => {
            username.style.display = "none";
        })
        username2.forEach(username => {
            username.style.display = "none";
        })
    }

    hideErrors()

    function DisabledSubmit() {
        submit.disabled = true;
        submit.style.cursor = "not-allowed";
    }

    function NotDisabledSubmit() {
        submit.disabled = false;
        submit.style.cursor = "pointer";
    }
    let user_id = data_id.dataset.id
    username.addEventListener('input', () => {
        fetch('/check_executive_username/'+user_id, {
            method: 'POST',
            body: JSON.stringify({
                'username': username.value.toUpperCase()
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

    function PasswordLength() {
        password1.addEventListener('keyup', () => {
            if (password1.value.length < 7) {
                setTimeout(extra, 500)

                function extra() {
                    password_error.style.display = "";
                    DisabledSubmit()
                }
            } else {
                setTimeout(extra2, 500)

                function extra2() {
                    password_error.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }

    PasswordLength()

    function PasswordCheck() {
        password2.addEventListener('keyup', () => {
            if (password1.value !== password2.value) {
                setTimeout(extra, 500)

                function extra() {
                    password_error2.style.display = "";
                    DisabledSubmit()
                }
            } else {
                setTimeout(extra2, 500)

                function extra2() {
                    password_error2.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }

    PasswordCheck()

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
})