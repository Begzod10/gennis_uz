// register and login functions
window.addEventListener('DOMContentLoaded',()=> {
    const checkbox = document.querySelector('.checkbox'),
        password = document.querySelectorAll('input[type="password"]'),
        subject1 = document.getElementById('fan1'),
        subject2 = document.getElementById('fan2'),
        subject3 = document.getElementById('fan3'),
        buttons = document.querySelectorAll('button'),
        button1 = document.querySelector('.button1'),
        button2 = document.querySelector('.button2'),
        button3 = document.querySelector('.button3'),
        button4 = document.querySelector('.button4'),
        submit = document.querySelector('#submit'),
        radios = document.querySelectorAll('.radios'),
        username = document.querySelectorAll('.username'),
        username2 = document.querySelectorAll('.username2'),
        input_username = document.querySelector('.user_name'),
        flash1 = document.querySelector('#flash1'),
        error_button1 = document.querySelector('#error_button1'),
        flash2 = document.querySelector('#flash2'),
        error_button2 = document.querySelector('#error_button2'),
        password1 = document.querySelector('#password1'),
        password2 = document.querySelector('#password2'),
        xojakent = document.getElementById('xojakent'),
        gazalkent = document.getElementById('gazalkent'),
        chirchiq = document.getElementById('chirchiq');
    let location_input = document.querySelector('.location_input');
    xojakent.addEventListener('touchstart',()=>{
        location_input.value = "xojakent"
        console.log(location_input.value)
    })
    gazalkent.addEventListener('touchstart',()=>{
        location_input.value = "gazalkent"
        console.log(location_input.value)
    })
    chirchiq.addEventListener('touchstart',()=>{
        location_input.value = "chirchiq"
        console.log(location_input.value)
    })

    function usernameError() {
         flash1.style.display = "flex"
        document.documentElement.scrollTop = 0;
        disabled_submit()
        error_button1.addEventListener('touchstart',()=>{
            flash1.style.display = 'none'
            input_username.value = ""
            not_disabled()
        })
    }

    function check_user_valid(){
        setTimeout(extra,4000)
        function extra() {
            username.forEach(all_username => {
                if (input_username.value.toUpperCase() === all_username.innerHTML) {
                    console.log(input_username.value.toUpperCase()===all_username.innerHTML)
                    usernameError()
                }
            })
            username2.forEach(all_username => {
                if (input_username.value.toUpperCase() === all_username.innerHTML) {
                    console.log(input_username.value.toUpperCase()===all_username.innerHTML)
                    usernameError()
                }
            })
        }
    }
    input_username.addEventListener('keyup',check_user_valid)
    // input_username.addEventListener('keydown',(event)=>{
    //     username.forEach(all_username=>{
    //         if (event.code === "Tab" && input_username.value.toUpperCase()===all_username.innerHTML){
    //             console.log(input_username.value.toUpperCase()===all_username.innerHTML)
    //            usernameError()
    //         }
    //
    //     })
    //     username2.forEach(all_username=>{
    //         if(input_username.value.toUpperCase()===all_username.innerHTML){
    //             console.log(input_username.value.toUpperCase()===all_username.innerHTML)
    //             usernameError()
    //         }
    //     })
    // })

    function checkPassword() {
        if (password1.value !== password2.value){
            flash2.style.display = "flex"
            disabled_submit()
            document.documentElement.scrollTop = 0;
            error_button2.addEventListener('touchstart',()=>{
                password1.value = ""
                password2.value = ""
                flash2.style.display = "none"
                not_disabled()
            })
        }
    }

    function disabled_submit() {
        submit.disabled = true;
        submit.style.cursor = "not-allowed"
    }
    function not_disabled() {
        submit.disabled = false
        submit.style.cursor = "pointer"
    }
    function showPassword() {
        checkbox.addEventListener('touchstart', (event) => {
            password.forEach(pass => {
                if (pass.type === "password") {
                    pass.type = "text";
                } else {
                    pass.type = "password";
                }
            })
        })
    }
    let list_subject = []
    function removeSub(sub) {
        if (subject2) {
            for (let i = 0; i < subject2.options.length; i++) {
                if (subject2.options[i].value === sub) {
                    list_subject.push(subject2.options[i].value)
                    subject2.remove(i)
                }
            }
        }
        if (subject3) {
            for (let i = 0; i < subject3.options.length; i++) {
                if (subject3.options[i].value === sub) {
                    subject3.remove(i)
                }
            }
        }
    }
    function removeSub2(sub) {
        if (subject3) {
            for (let i = 0; i < subject3.options.length; i++) {
                if (subject3.options[i].value === sub) {
                    subject3.remove(i)
                }
            }
        }
    }
    function showSubjects() {
        buttons.forEach(button => {
            button.addEventListener('touchstart', (event) => {
                event.preventDefault()
            })
        })
        radios.forEach(radio => {
            radio.addEventListener('touchstart', () => {
                checkPassword()
                subject1.style.display = "inline";
                if (subject1.value === "Birinchi fan") {
                    disabled_submit()
                }
                subject1.addEventListener('touchstart', () => {
                    if (subject1.value !== "Birinchi fan") {
                        removeSub(subject1.value)
                        if (subject2) {
                            if (subject2.options.length === 6) {
                                document.location.reload()
                            }
                        }
                        if (button1) {
                            button1.style.display = "inline";
                        }
                        not_disabled()
                    } else {
                        disabled_submit()
                    }
                })
                if (button1) {
                button1.addEventListener('touchstart', () => {
                    subject2.style.display = "inline";
                    if (subject2.value === "Ikkinchi Fan(Ixtiyoriy)") {
                        disabled_submit()
                    }
                    subject2.addEventListener('touchstart', () => {
                        if (subject2.value !== "Ikkinchi Fan(Ixtiyoriy)") {
                            removeSub2(subject2.value)
                            if (subject3.options.length === 5) {
                                document.location.reload()
                            }
                            button2.style.display = "inline";
                            button3.style.display = "inline";
                            not_disabled()
                        } else {
                            disabled_submit()
                        }
                    })
                    button2.addEventListener('touchstart', () => {
                        if (subject3.value === "Uchinchi Fan(Ixtiyoriy)") {
                            disabled_submit()
                        }
                        subject3.style.display = "inline";
                        button4.style.display = "inline";
                        subject3.addEventListener('touchstart', () => {

                            if (subject3.value !== "Uchinchi Fan(Ixtiyoriy)") {
                                not_disabled()
                            } else {
                                disabled_submit()
                            }
                        })
                        button4.addEventListener('touchstart', () => {
                            subject3.style.display = "none";
                            button4.style.display = "none";
                        });
                    });
                    button3.addEventListener('touchstart', () => {
                        subject2.style.display = "none";
                        subject3.style.display = "none";
                        button2.style.display = "none";
                        button3.style.display = "none";
                        button4.style.display = "none";
                    })
                });
            }
            });
        });
    }

    submit.addEventListener('touchstart',()=>{
        if (subject2.value === "Ikkinchi Fan(Ixtiyoriy)"){
            subject2.value = ""
            subject3.value = ""
        }else if (subject3.value === "Uchinchi Fan(Ixtiyoriy)"){
            subject3.value = ""
        }
    })
    showPassword()
    showSubjects()
    // Title
    const title = document.querySelector('.title'),
        for_date = document.querySelector('.for_date'),
        show_password = document.querySelector('.show_password');
    if (title.innerHTML.length === 20 || title.innerHTML.length === 19){
        for_date.style.marginLeft = "40px";
        show_password.style.marginLeft = "44px";
    }

})

