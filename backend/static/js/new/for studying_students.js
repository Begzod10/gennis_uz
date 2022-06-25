window.addEventListener('DOMContentLoaded',()=> {
    const location_buttons = document.querySelectorAll('.button_subjects button'),
        list_of_xojakent_students = document.querySelector('#list_of_xojakent_students'),
        list_of_gazalkent_students = document.querySelector('#list_of_gazalkent_students'),
        list_of_chirchiq_students = document.querySelector('#list_of_chirchiq_students'),
        xojakent_studying_students = document.querySelector('#xojakent_studying_students'),
        gazalkent_studying_students = document.querySelector('#gazalkent_studying_students'),
        chirchiq_studying_students = document.querySelector('#chirchiq_studying_students'),
        search_for_xojakent = document.querySelector('#search_for_xojakent'),
        search_for_gazalkent = document.querySelector('#search_for_gazalkent'),
        search_for_chirchiq = document.querySelector('#search_for_chirchiq'),
        name_xojakent = document.querySelector('#name_xojakent'),
        surname_xojakent = document.querySelector('#surname_xojakent'),
        username_xojakent = document.querySelector('#username_xojakent'),
        name_gazalkent = document.querySelector('#name_gazalkent'),
        surname_gazalkent = document.querySelector('#surname_gazalkent'),
        username_gazalkent = document.querySelector('#username_gazalkent'),
        name_chirchiq = document.querySelector('#name_chirchiq'),
        surname_chirchiq = document.querySelector('#surname_chirchiq'),
        username_chirchiq = document.querySelector('#username_chirchiq'),
        select_xojakent = document.querySelector('#select_xojakent'),
        select_gazalkent = document.querySelector('#select_gazalkent'),
        select_chirchiq = document.querySelector('#select_chirchiq');

    location_buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            removeActiveClasses();
            button.classList.add('active');
        });
    });

    function removeActiveClasses() {
        location_buttons.forEach(button => {
            button.classList.remove('active');
        });
    }
    if (xojakent_studying_students) {
        xojakent_studying_students.addEventListener('click', () => {
            list_of_xojakent_students.style.display = "flex";
            list_of_gazalkent_students.style.display = "none";
            list_of_chirchiq_students.style.display = "none";
            search_for_xojakent.style.display = "inline";
            search_for_gazalkent.style.display = "none";
            search_for_chirchiq.style.display = "none";
            name_gazalkent.style.display = "none";
            surname_gazalkent.style.display = "none";
            username_gazalkent.style.display = "none";
            name_chirchiq.style.display = "none";
            surname_chirchiq.style.display = "none";
            username_chirchiq.style.display = "none";
        })
    }
    if (gazalkent_studying_students) {
        gazalkent_studying_students.addEventListener('click', () => {
            list_of_xojakent_students.style.display = "none";
            list_of_gazalkent_students.style.display = "flex";
            list_of_chirchiq_students.style.display = "none";
            search_for_xojakent.style.display = "none";
            search_for_gazalkent.style.display = "inline";
            search_for_chirchiq.style.display = "none";
            name_xojakent.style.display = "none";
            surname_xojakent.style.display = "none";
            username_xojakent.style.display = "none";
            name_chirchiq.style.display = "none";
            surname_chirchiq.style.display = "none";
            username_chirchiq.style.display = "none";
        })
    }
    if (chirchiq_studying_students) {
        chirchiq_studying_students.addEventListener('click', () => {
            list_of_xojakent_students.style.display = "none";
            list_of_gazalkent_students.style.display = "none";
            list_of_chirchiq_students.style.display = "flex";
            search_for_xojakent.style.display = "none";
            search_for_gazalkent.style.display = "none";
            search_for_chirchiq.style.display = "inline";
            name_gazalkent.style.display = "none";
            surname_gazalkent.style.display = "none";
            username_gazalkent.style.display = "none";
            name_xojakent.style.display = "none";
            surname_xojakent.style.display = "none";
            username_xojakent.style.display = "none";
        })
    }
    function forSelect(select,form1,form2,form3) {
        select.addEventListener('click',()=>{
            if (select.value ==="Выберите тип поиска"){
                form1.style.display = "none";
                form2.style.display = "none";
                form3.style.display = "none";
            }else if(select.value === "Поиск по имени"){
                form1.style.display = "inline";
                form2.style.display = "none";
                form3.style.display = "none";
            }else if(select.value === "Поиск по фамилии"){
                form1.style.display = "none";
                form2.style.display = "inline";
                form3.style.display = "none";
            }else if(select.value === "Поиск по имени пользователя"){
                form1.style.display = "none";
                form2.style.display = "none";
                form3.style.display = "inline";
            }
        })
    }
    if (select_xojakent) {
        forSelect(select_xojakent, name_xojakent, surname_xojakent, username_xojakent)
    }
    if(select_gazalkent){
        forSelect(select_gazalkent, name_gazalkent, surname_gazalkent, username_gazalkent)
    }
    if(select_chirchiq){
        forSelect(select_chirchiq, name_chirchiq, surname_chirchiq, username_chirchiq)
    }
})