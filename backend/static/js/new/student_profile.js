"use strict"
window.addEventListener('DOMContentLoaded',()=> {
    //Student change forms
    const change_info_button = document.querySelector('.change_info_button'),
        setting_select = document.querySelector('.setting_select select'),
        info_form = document.querySelector('#info_form'),
        password_form = document.querySelector('#password_form');

    change_info_button.addEventListener('click',()=>{
        if(setting_select.style.display === "block"){
            setting_select.style.display = "none";
        }else {
            setting_select.style.display = "block";
            if (charity) {
                charity.style.display = "none";
            }
            if (payment) {
                payment.style.display = "none";
            }
            if (contract) {
                contract.style.display = "none";
            }
            if (setting_location && setting_location_select) {
                setting_location.style.display = "none";
                setting_location_select.style.display = "none";
            }
            delete_form.style.display = "none";
            setting_select.addEventListener('click', () => {
                if (setting_select.value === "Изменить инфо") {
                    info_form.style.display = "block";
                    password_form.style.display = "none";
                } else if (setting_select.value === "Изменить пароль") {
                    password_form.style.display = "block";
                    info_form.style.display = "none";
                }else if (setting_select.value === "Выберите тип изменения"){
                    password_form.style.display = "none";
                    info_form.style.display = "none";
                }
            });
        }
    });
    //Contract
    const contract_button = document.querySelector('.contract_button'),
        contract = document.querySelector('.contract');

    if (contract_button) {
        contract_button.addEventListener('click', () => {
            if (contract.style.display === "flex") {
                contract.style.display = "none";
            } else {
                setting_select.style.display = "none";
                info_form.style.display = "none";
                password_form.style.display = "none";
                contract.style.display = "flex";
                delete_form.style.display = "none";
                payment.style.display = "none";
                charity.style.display = "none";
            }
        })
    }
    //Delete Student
    const delete_student_button = document.querySelector('.delete_student_button'),
        delete_form = document.querySelector('.delete_form');

    if (delete_student_button) {
        delete_student_button.addEventListener('click', () => {
            if (delete_form.style.display === "flex"){
                delete_form.style.display ="none"
            }else {
                setting_select.style.display = "none";
                if (payment) {
                    payment.style.display = "none";
                }
                info_form.style.display = "none";
                password_form.style.display = "none";
                if (contract) {
                    contract.style.display = "none";
                }
                if (charity) {
                    charity.style.display = "none";
                }
                delete_form.style.display = "flex";
                if (setting_location_select && setting_location) {
                    setting_location.style.display = "none";
                    setting_location_select.style.display = "none";
                }
            }
        })
    }

    //Password
    const password = document.querySelector('#password'),
        password2 = document.querySelector('#password2');

    password2.addEventListener('keyup',()=>{
        if (password.value !== password2.value){
            passwordCheck()
        }
    })
    function passwordCheck() {
        setTimeout(extra,2000)
        function extra() {
            alert('Пароли не совпадают')
            password.value = "";
            password2.value = "";
        }
    }
    //payment
    const payment = document.querySelector('#payment'),
        payment_button = document.querySelector('.payment_button');
    if (payment_button) {
        payment_button.addEventListener('click', () => {
            if (payment.style.display === "block") {
                payment.style.display = "none";
            } else {
                payment.style.display = "block";
                setting_select.style.display = "none";
                contract.style.display = "none";
                delete_form.style.display = "none";
                charity.style.display = "none";
            }
        })
    }
    //Charity
    const charity = document.querySelector('#charity'),
        give_charity_button = document.querySelector('.give_charity_button');
    if (give_charity_button) {
        give_charity_button.addEventListener('click', () => {
            if (charity.style.display === "block") {
                charity.style.display = "none";
            } else {
                charity.style.display = "block";
                payment.style.display = "none";
                setting_select.style.display = "none";
                contract.style.display = "none";
                delete_form.style.display = "none";
                info_form.style.display = "none";
                password_form.style.display = "none"

            }
        })
    }
    //make admin
    const setting_location = document.querySelector('.setting_location'),
        setting_location_select = document.querySelector('.setting_location select'),
        make_admin_button = document.querySelector('.make_admin_button');
    if (make_admin_button) {
        make_admin_button.addEventListener('click', () => {
            if (setting_location.style.display === "block") {
                setting_location.style.display = "none";
                setting_location_select.style.display = "none";
            } else {
                setting_location.style.display = "block";
                setting_location_select.style.display = "block";
                setting_select.style.display = "none";
                delete_form.style.display = "none";
            }
        })
    }

})