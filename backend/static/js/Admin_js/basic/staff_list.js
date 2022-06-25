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
        type_search = document.querySelector('.type_search'),
        teacher_salary = document.querySelectorAll('.list_teachers_item_account_salary_number'),
        list_students = document.querySelector('.list_teachers');


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
            search_clear.style.display = 'block'
        }
        else {
            search_clear.style.display = 'none'
        }
    })
    search_clear.addEventListener('click', ()=> {
        search_input.value = ""
        search_clear.style.display = 'none'
    })
    radio_name.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя";
        type_search.value = "name"


    })
    radio_surname.addEventListener('change',()=>{
        search_input.placeholder = "Введите фамилию";
        type_search.value = "surname"


    })
    radio_username.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя пользователя";
        type_search.value = "username"

    })



    $('.list_tools_search_submit_img').click(function () {
        $('.list_tools_search_submit').click()
    })


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    teacher_salary.forEach(each_salary => {
        each_salary.innerHTML = numberWithCommas(each_salary.innerHTML)
    })
    $(".list_tools_search_input").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $(".list_teachers_item").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

})