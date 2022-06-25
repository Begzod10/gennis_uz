window.addEventListener('DOMContentLoaded', () => {
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
    let search_type = "name";

    search_img.addEventListener('click', () => {
        if (search_select_box.style.visibility === "visible") {
            search_select_box.style.visibility = 'hidden';
        } else {
            search_select_box.style.visibility = "visible";
        }
    })
    basic.addEventListener('click', (event) => {
        if (basic === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    list_students.addEventListener('click', (event) => {
        if (list_students === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    search_input.addEventListener('click', () => {
        search_select_box.style.visibility = 'hidden';
        console.log(search_input.value.length);
    })
    search_input.addEventListener('keyup', () => {
        if (search_input.value.length >= 1) {
            console.log('hello');
            search_clear.style.display = 'block'
        } else {
            console.log('hello');
            search_clear.style.display = 'none'
        }
    })
    search_clear.addEventListener('click', () => {
        search_input.value = ""
        search_clear.style.display = 'none'
    })
    radio_name.addEventListener('click', () => {
        search_input.placeholder = "Введите имя";
        search_form.action = "/search_name"
        search_type = "name"
    })
    radio_surname.addEventListener('change', () => {
        search_input.placeholder = "Введите фамилию";
        search_form.action = "/search_surname";
        search_type = "surname"
    })
    radio_username.addEventListener('click', () => {
        search_input.placeholder = "Введите имя пользователя";
        search_form.action = "/search_username"
        search_type = "username"
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

    function checkTextLength(text) {
        const textTag = document.querySelectorAll(text)
        textTag.forEach(item => {
            if (item.innerText.length >= 10) {
                item.innerText += '...'
            }
        })
    }

    function checkText(text) {
        let textTag_2 = document.querySelectorAll(text)
        textTag_2.forEach(item_2 => {
            if (item_2.innerHTML.length > 11) {
                const itemParent = item_2.parentElement
                itemParent.style.width = '400px'
                itemParent.style.padding = '10px'
            } else {
                console.log('error')
            }
        })
    }


    checkText('.list_students_item_tooltiptext_comment')
    checkTextLength('.list_students_item_fio_username')
    $(".list_tools_search_input").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".list_students_item").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    let education_language = document.querySelector('.education_language'),
        form_button = document.querySelector('.form_button');

    education_language.addEventListener('change', () => {
        form_button.click()
    })
    let input_student = document.querySelector('.input_student');

    input_student.addEventListener('input', function () {
        if (input_student.value) {
            list_students.innerHTML = "";
            fetch('/search_student_info/' + input_student.dataset.location, {
                method: "POST",
                body: JSON.stringify({
                    value: input_student.value,
                    search_type: search_type
                }),
                headers: {
                    "Content-type": "application/json"
                }

            })
                .then(function (response) {
                    return response.json()
                })

                .then(function (JsonResponse) {
                    for (let i of JsonResponse) {
                        list_students.innerHTML += `<a href="">
                <div class="list_students_item">
                    <div class="list_students_item_img">
                        
                        <img src="${i['photo_profile']}" alt="">
                        
                    </div>
                    <div class="list_students_item_fio">
                        <div class="list_students_item_fio_name"><em></em> | ${i['name']}
                            <span class="list_students_item_tooltiptext">
                                Имя
                            </span>
                        </div>
                        <div class="list_students_item_fio_surname">${i['surname']}
                            <span class="list_students_item_tooltiptext">
                                Фамилия
                            </span>
                        </div>
                        <div class="list_students_item_fio_username">${i['username']}
                            <span class="list_students_item_tooltiptext">
                                Пользователь
                            </span>
                        </div>
                    </div>
                    <div class="list_students_item_account">
                        <span class="list_students_item_account_number ">${i['balance']}</span>som
                        <span class="list_students_item_tooltiptext">
                            Счет
                        </span>
                    </div>
                </div>
            </a>`
                    }
                    let list_students_item_img = document.querySelectorAll('.list_students_item_img img');
                    list_students_item_img.forEach(img => {
                        if (img.src.indexOf("null")) {
                            img.src = '../../static/img/user_image.png'
                        }

                    })
                })
        } else {
            window.location.reload()
        }
    })
})