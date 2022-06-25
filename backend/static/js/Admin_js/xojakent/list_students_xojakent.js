const search_form = document.querySelector('.search_form'),
    search_img = document.querySelector('.list_tools_search_settings_img'),
    search_select_box = document.querySelector('.list_tools_search_settings'),
    search_input = document.querySelector('.list_tools_search_input'),
    search_age = document.querySelector('.list_tools_search_age'),
    search_clear = document.querySelector('.list_tools_search_clear'),
    radio_name = document.getElementById('list_tools_search_checkbox_name'),
    radio_teacher = document.getElementById('list_tools_search_checkbox_teacher'),
    radio_username = document.getElementById('list_tools_search_checkbox_username'),
    radio_age = document.getElementById('list_tools_search_checkbox_age'),
    basic = document.querySelector('.basic'),
    list_groups = document.querySelector('.list_groups'),
    form_button = document.querySelector('.form_button'),
    input_age = document.querySelectorAll('.list_tools_search_age_input'),
    subject = document.querySelector('.subject'),
    subjects = document.querySelector('#subjects'),
    list_tools_language = document.querySelector('.list_tools_language'),
    education_language = document.querySelector('.student_education_language'),
    list_students = document.querySelector('.list_students'),
    list_students_item_comment = document.querySelectorAll('.list_students_item_comment'),
    student_education_language = document.querySelectorAll('.student_education_language'),
    search_info = document.querySelector('.search_info'),
    all_students_xojakent = document.querySelector(".all_students_xojakent");
let search_type = 'name';
subjects.addEventListener('change', () => {
    form_button.click()
})
list_tools_language.addEventListener('change', () => {
    education_language.value = list_tools_language.value;
    form_button.click()
})
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
input_age.forEach(age => {
    age.addEventListener('click', (event) => {
        if (age === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
})
search_input.addEventListener('click', () => {
    search_select_box.style.visibility = 'hidden';
})
search_input.addEventListener('keyup', () => {
    if (search_input.value.length >= 1) {
        search_clear.style.display = 'block'
    } else {
        search_clear.style.display = 'none'
    }
})
search_clear.addEventListener('click', () => {
    search_input.value = ""
    search_clear.style.display = 'none'
})
radio_name.addEventListener('click', () => {
    search_input.placeholder = "Введите имя";
    search_form.action = "/search_name_new"
    input_age.forEach(search => {
        search.removeAttribute('required')
    })
    search_age.classList.remove('list_tools_search_age_active')
    search_input.style.display = 'block'
    search_type = "name"
})
radio_teacher.addEventListener('change', () => {
    search_clear.style.display = 'none'
    search_input.placeholder = "Введите фамилия";
    search_form.action = "/search_surname_new";
    input_age.forEach(search => {
        search.removeAttribute('required')
        console.log('hello')
    })
    search_age.classList.remove('list_tools_search_age_active')
    search_input.style.display = 'block'
    search_type = "surname"
})
radio_username.addEventListener('change', () => {
    search_clear.style.display = 'none'
    search_input.placeholder = "Введите username";
    search_form.action = "/search_username_new";
    input_age.forEach(search => {
        search.removeAttribute('required')
    })
    search_age.classList.remove('list_tools_search_age_active')
    search_input.style.display = 'block'
    search_type = "username"
})
radio_age.addEventListener('click', () => {
    search_clear.style.display = 'none'
    search_input.style.display = 'none'
    search_age.classList.add('list_tools_search_age_active')
    search_input.classList.remove('list_tools_search_input_active')
    search_input.removeAttribute('required')
    search_form.action = "/search_age_new"
    input_age.forEach(search => {
        search.setAttribute('required', "")
    })
    search_type = "age"
})


$('.list_tools_search_submit_img').click(function () {
    $('.list_tools_search_submit').click()
})


const form = document.querySelector('.form');
subjects.addEventListener('click', () => {
    form.click()
})

list_tools_language.addEventListener('change', () => {
    if (list_tools_language.value === "Узбекский") {
        student_education_language.forEach(subject => {
            subject.value = "Узбекский"
            console.log(subject.value)
        })
    } else if (list_tools_language.value === "Русский") {
        student_education_language.forEach(subject => {
            subject.value = "Русский"
            console.log(subject.value)
        })

    }
})


const group_names = document.querySelectorAll('.group_names'),
    modal_create_gr_info_input = document.querySelector('.modal_create_gr_info_input'),
    submit = document.querySelector('.modal_create_gr_info_submit'),
    error_name = document.querySelector('.error_name');
error_name.style.display = "none";
error_name.style.color = "red";

group_names.forEach(name => {
    name.style.display = "none";
})

function disabledSubmit() {
    error_name.style.display = "block";
    submit.disabled = true;
}

function NotDisabledSubmit() {
    error_name.style.display = "none";
    submit.disabled = false;
}

function groupNameCheck() {
    let input_name = modal_create_gr_info_input.value.toUpperCase()
    console.log(input_name)
    group_names.forEach(name => {
        if (input_name === name.innerHTML) {
            console.log(name.innerHTML)
            setTimeout(extra, 500)

            function extra() {
                disabledSubmit()
            }
        } else {
            console.log(name.innerHTML)
            NotDisabledSubmit()
        }
    })
}

modal_create_gr_info_input.addEventListener('keyup', () => {
    groupNameCheck()
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
        }
    })
}

checkText('.list_students_item_tooltiptext_comment');
checkTextLength('.list_students_item_subjects_subject');
$(".list_tools_search_input").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".list_students_item").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


search_info.addEventListener('input', () => {
    if (search_info.value) {
        list_students.innerHTML = ''
        fetch('/search_info/' + search_info.dataset.location, {
            method: 'POST',
            body: JSON.stringify({
                info: search_info.value,
                search_type: search_type
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (jsonResponse) {
                for (let i of jsonResponse) {
                    list_students.innerHTML += `<a href="${i['id']}">
                <div class="list_students_item">
                    <div class="list_students_item_img">
                            <img src="${i['photo_profile']}" alt="">
                    </div>
                    <div class="list_students_item_fio">
                        <div class="list_students_item_fio_name">${i['name']}
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
                    <div class="list_students_item_age">${i['age']}
                        <span class="list_students_item_tooltiptext">
                            Возраст
                        </span>
                    </div>
                    <div class="list_students_item_date_reg">${i['data_joined']}
                        <span class="list_students_item_tooltiptext">
                            Дата регистрации
                        </span>
                    </div>
                    
                    <div class="list_students_item_comment" id="comment_english">
                       ${i['comment']}
                        <span class="list_students_item_tooltiptext">
                            <span class="list_students_item_tooltiptext_comment">
                            ${i['comment']}
                                </span>
                        </span>
                    </div>
                    <div class="list_students_item_subjects">
                        <span class="list_students_item_subjects_subject">${i['subjects']}</span>
                    </div>
                </div>
            </a>`
                }

                let list_students_item_img = document.querySelectorAll('.list_students_item_img img');
                list_students_item_img.forEach(img => {
                    console.log(img.src.indexOf("null"))
                    if (img.src.indexOf("null")) {
                        img.src = '../../static/img/user_image.png'
                    }

                })
            })


    } else {
        window.location.reload()
    }
})


let age_ot = document.querySelector('.age_ot'),
    teachers = document.querySelector('.teachers'),
    submit_search = document.querySelector('.list_tools_search_submit_img'),
    subteach = document.querySelector('.subteach'),
    age_do = document.querySelector('.age_do');

submit_search.addEventListener('click', () => {

    fetch('/search_age/' + search_info.dataset.location, {
        method: 'POST',
        body: JSON.stringify({
            age_ot: age_ot.value,
            age_do: age_do.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonResponse) {
            list_students.innerHTML = ''
            for (let i of jsonResponse) {
                list_students.innerHTML += `<a href="${i['id']}">
                <div class="list_students_item">
                    <div class="list_students_item_img">
                            <img src="${i['photo_profile']}" alt="">
                    </div>
                    <div class="list_students_item_fio">
                        <div class="list_students_item_fio_name">${i['name']}
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
                    <div class="list_students_item_age">${i['age']}
                        <span class="list_students_item_tooltiptext">
                            Возраст
                        </span>
                    </div>
                    <div class="list_students_item_date_reg">${i['data_joined']}
                        <span class="list_students_item_tooltiptext">
                            Дата регистрации
                        </span>
                    </div>
                    
                    <div class="list_students_item_comment" id="comment_english">
                       ${i['comment']}
                        <span class="list_students_item_tooltiptext">
                            <span class="list_students_item_tooltiptext_comment">
                            ${i['comment']}
                                </span>
                        </span>
                    </div>
                    <div class="list_students_item_subjects">
                        <span class="list_students_item_subjects_subject">${i['subjects']}</span>
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


})
subteach.addEventListener('change', () => {
    teachers.innerHTML = ''
    if (subteach.value) {
        fetch('/get_teachers/', {
            method: "POST",
            body: JSON.stringify({
                subject: subteach.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (JsonResponse) {
                teachers.hidden = false

                for (let response of JsonResponse) {
                    teachers.innerHTML += `<option value="${response['id']}">${response['name']} ${response['surname']} ${response['location']}</option>    `
                }

            })
    } else {
        teachers.hidden = true
    }
})

let type_course = document.querySelector('#type_course'),
    course_costs = document.querySelectorAll('.course_costs'),
    price = document.querySelector('#price');
price.value = course_costs[0].dataset.cost;
type_course.addEventListener('change', () => {
    fetch('/get_price_course/', {
        method: "POST",
        body: JSON.stringify({
            "course_type": type_course.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (JsonResponse) {
            price.value = JsonResponse['price']
        })
})
