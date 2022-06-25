window.addEventListener('DOMContentLoaded',()=> {
    const search_form = document.querySelector('.search_form'),
        search_img = document.querySelector('.list_tools_search_settings_img'),
        search_select_box = document.querySelector('.list_tools_search_settings'),
        search_input = document.querySelector('.list_tools_search_input'),
        search_clear = document.querySelector('.list_tools_search_clear'),
        radio_name = document.getElementById('list_tools_search_checkbox_name'),
        radio_surname = document.getElementById('list_tools_search_checkbox_surname'),
        radio_username = document.getElementById('list_tools_search_checkbox_username'),
        basic = document.querySelector('.basic'),
        students_money = document.querySelectorAll('.list_students_item_account_number'),
        list_students = document.querySelector('.list_students');


    search_img.addEventListener('click', ()=> {
        if(search_select_box.style.visibility==="visible") {
            search_select_box.style.visibility = 'hidden';
        }else {
           search_select_box.style.visibility="visible" ;
        }
    })
    basic.addEventListener('click',(event)=>{
        if (basic === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    list_students.addEventListener('click',(event)=>{
        if (list_students === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    search_input.addEventListener('click', ()=> {
        search_select_box.style.visibility = 'hidden';
        console.log(search_input.value.length);
    })
    search_input.addEventListener('keyup', ()=> {
        if (search_input.value.length >= 1) {
            console.log('hello');
            search_clear.style.display = 'block'
        }
        else {
            console.log('hello');
            search_clear.style.display = 'none'
        }
    })
    search_clear.addEventListener('click', ()=> {
        search_input.value = ""
        search_clear.style.display = 'none'
    })
    radio_name.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя";
        search_form.action = "/search_name3"
    })
    radio_surname.addEventListener('change',()=>{
        search_input.placeholder = "Введите фамилию";
        search_form.action = "/search_surname3";
    })
    radio_username.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя пользователя";
        search_form.action = "/search_username3"
    })



    $('.list_tools_search_submit_img').click(function () {
        $('.list_tools_search_submit').click()
    })

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
    })

})