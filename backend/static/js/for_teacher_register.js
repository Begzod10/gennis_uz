window.addEventListener('DOMContentLoaded',()=> {
    //Username Checking
    const username_users = document.querySelectorAll('.username'),
        username_teachers = document.querySelectorAll('.username2'),
        username_input = document.querySelector('.username_input'),
        username_error = document.querySelector('.username_error'),
        submit = document.querySelector('.submit');
    username_error.style.display = "none";
    function DisabledSubmit(){
        submit.disabled = true;
        submit.style.cursor = "not-allowed";
    }
    function NotDisabledSubmit(){
        submit.disabled = false;
        submit.style.cursor = "pointer";
    }
    function ForEachUserNames(username_list){
        username_list.forEach(username=>{
            if (username_input.value.toUpperCase()===username.innerHTML){
                let input = username_input.value.toUpperCase()
                console.log(input===username.innerHTML)
                setTimeout(extra,500)
                function extra() {
                    username_error.style.display = "block";
                    DisabledSubmit();
                }
            }else{
                username_error.style.display = "none";
                setTimeout(extra2,500)
                function extra2() {
                    NotDisabledSubmit();
                }
            }
        })
    }
    function InputTyping() {
        username_input.addEventListener('keyup', () => {
            ForEachUserNames(username_users)
            ForEachUserNames(username_teachers)
        })
    }

    InputTyping()
    //Button remove form active
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button=>{
        button.addEventListener('click',(event)=>{
            event.preventDefault()
        })
    })
    // Birth Year Checking
    const birth_year = document.querySelector('.birth_year'),
        birth_month = document.querySelector('.birth_month'),
        birth_day = document.querySelector('.birth_day'),
        birth_date_error = document.querySelector('#birth_date_error');
    birth_date_error.style.display = "none";
    function BirthYearCheckin() {
        birth_year.addEventListener('change',()=>{
            if (birth_year.value > 2015){
                setTimeout(extra,500)
                function extra() {
                    birth_date_error.style.display = "";
                    DisabledSubmit()
                }
            }else {
                setTimeout(extra2,500)
                function extra2() {
                    birth_date_error.style.display = "none";
                    NotDisabledSubmit()
                }
            }
        })
    }
    function birthDataRequired(){
        if(birth_day.value === "День" || birth_month.value === "Месяц" || birth_year.value === "Год"){
            DisabledSubmit()
        }else {
            NotDisabledSubmit()
        }

    }

    BirthYearCheckin()

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
        checkbox.addEventListener('click',()=>{
            passwords.forEach(password=>{
                if (password.type === 'text'){
                    password.type = 'password';
                }else {
                    password.type = 'text'
                }
            })
        })
    }
    ShowPassword()

    // Locations
    const radios = document.querySelectorAll('.radios'),
        fan1 = document.querySelector('#fan1'),
        fan2 = document.querySelector('#fan2'),
        fan3 = document.querySelector('#fan3'),
        button1 = document.querySelector('.button1'),
        button1_minus = document.querySelector('.button1_minus'),
        button2 = document.querySelector('.button2'),
        button3 = document.querySelector('.button3'),
        button4 = document.querySelector('.button4'),
        comment_edu = document.querySelector('.comment_edu');
    fan1.style.display = "none";
    fan2.style.display = "none";
    fan3.style.display = "none";
    button1.style.display = "none";
    button1_minus.style.display = "none"
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    comment_edu.style.display = "none";
        let list_subject = []
    function removeSub(sub) {
        if (fan2) {
            for (let i = 0; i < fan2.options.length; i++) {
                if (fan2.options[i].value === sub) {
                    list_subject.push(fan2.options[i].value)
                    fan2.remove(i)
                }
            }
        }
        if (fan3) {
            for (let i = 0; i < fan3.options.length; i++) {
                if (fan3.options[i].value === sub) {
                    fan3.remove(i)
                }
            }
        }
    }
    function removeSub2(sub) {
        if (fan3) {
            for (let i = 0; i < fan3.options.length; i++) {
                if (fan3.options[i].value === sub) {
                    fan3.remove(i)
                }
            }
        }
    }
    function showSubject() {
        radios.forEach(radio => {
            radio.addEventListener('click', () => {
                setTimeout(extra, 1000)
                function extra() {
                    document.querySelector('.register_block').scrollBy(0,80)
                    fan1.style.display = "";
                }
            })
        })
    }
    showSubject()

    fan1.addEventListener('click',()=>{
        if (fan1.value !== "Первый предмет"){
            setTimeout(extra,500)
            function extra() {
                button1.style.display = "";
                comment_edu.style.display = "";
                NotDisabledSubmit()
                removeSub(fan1.value)
            }
        }else {
            setTimeout(extra2,500)
            function extra2() {
                button1.style.display = "none";
                comment_edu.style.display = "none";
                DisabledSubmit()
            }
        }
    })
    button1.addEventListener('click',()=>{
        setTimeout(extra,500)
        function extra() {
            fan2.style.display = "";
            button1_minus.style.display = "";
            button1.style.display = "none";
            if (fan2.value === "Второй предмет"){
                DisabledSubmit()
            }
        }
    })
    button1_minus.addEventListener('click',()=>{
        fan2.style.display = 'none';
        button1.style.display = "";
        button1_minus.style.display = "none";
        fan2.value = "Второй предмет";
        button2.style.display = "none";
        button3.style.display = "none";
        button4.style.display = "none";
        fan3.style.display = "none";
        fan3.value = "Третий предмет";
    })
    fan2.addEventListener('click',()=>{
        if (fan2.value!== "Второй предмет"){
            setTimeout(extra,500)
            function extra() {
                button2.style.display = "";
                NotDisabledSubmit();
                removeSub2(fan2.value)
            }
        }else {
            setTimeout(extra2,500)
            function extra2() {
                button2.style.display = "none";
                DisabledSubmit()
            }

        }
    })
    button2.addEventListener('click',()=>{
        setTimeout(extra,500)
        function extra() {
            fan3.style.display = "";
            button3.style.display = "";
            button2.style.display = "none";
            if(fan3.value === "Третий предмет"){
                DisabledSubmit()
            }
        }
    })
    button3.addEventListener('click',()=>{
        button2.style.display = "none";
        button3.style.display = "none";
        button4.style.display = "none";
        fan3.style.display = "none";
        fan3.value = "Третий предмет";
        button3.style.display = "none";
    })
    fan3.addEventListener('click',()=>{
        if(fan3.value !== "Третий предмет"){
            setTimeout(extra,500)
            function extra() {
                NotDisabledSubmit()
            }
        }else {
            setTimeout(extra2,500)
            function extra2() {
                DisabledSubmit()
            }
        }
    })

    submit.addEventListener('click',()=>{
        if (fan2.value === "Второй предмет"){
            fan2.value = ""
            fan3.value = ""
        }else if (fan3.value === "Третий предмет"){
            fan3.value = ""
        }
    })

    //Location Choose
    const location_input = document.querySelector('.location_input'),
        xojakent = document.querySelector('#xojakent'),
        gazalkent = document.querySelector('#gazalkent'),
        chirchiq = document.querySelector('#chirchiq');

    xojakent.addEventListener('click',()=>{
        location_input.value = 1;
    })
    gazalkent.addEventListener('click',()=>{
        location_input.value = 2;
    })
    chirchiq.addEventListener('click',()=>{
        location_input.value = 3;
    })
    birthDataRequired()
})