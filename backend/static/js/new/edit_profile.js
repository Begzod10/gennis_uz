const checkbox = document.querySelector('.checkbox'),
            passwords = document.querySelectorAll('input[type=password]'),
            submit = document.querySelector('input[type=submit]'),
            error_password = document.querySelector('.error_password'),
            button = document.querySelector('button'),
            password1 = document.querySelector('#password1'),
            password2 = document.querySelector('#password2'),
            username_typing = document.getElementById('username_typing'),
            username1 = document.querySelectorAll('.username1'),
            username2 = document.querySelectorAll('.username2'),
            flash1 = document.querySelector('#flash1'),
            error_button1 = document.querySelector('#error_button1');

checkbox.addEventListener('click',()=>{
    passwords.forEach(password_type=>{
        if (password_type.type ==="password"){
            password_type.type="text";
        }else {
            password_type.type="password";
        }

    })
})
password2.addEventListener('keyup',comparePasswords)
function comparePasswords() {
    if (password1.value !== password2.value){
        error_password.style.display = "inline";
        submit.disabled = true;
        submit.style.cursor = "not-allowed";
    }else {
        error_password.style.display = "none";
        submit.disabled = false;
        submit.style.cursor = "pointer";
    }
}
function userError(){
    flash1.style.display = "flex";
    submit.disabled = true;
    submit.style.cursor = "not-allowed";
    error_button1.addEventListener('click',()=>{
        window.location.reload()
    })
}
function compareUsernames(){
    setTimeout(extra,4000)
    function extra() {
        username1.forEach(username => {
            if (username_typing.value.toUpperCase() === username.innerHTML) {
                userError()
            }
        })
        username2.forEach(username => {
            if (username_typing.value.toUpperCase() === username.innerHTML) {
                userError()
            }
        })
    }
}
username_typing.addEventListener('keyup',compareUsernames)


