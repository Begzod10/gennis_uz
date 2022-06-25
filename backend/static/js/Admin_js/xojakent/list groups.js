window.addEventListener('DOMContentLoaded', () => {
    const search_form = document.querySelector('.search_form'),
        search_img = document.querySelector('.list_tools_search_settings_img'),
        search_select_box = document.querySelector('.list_tools_search_settings'),
        search_input = document.querySelector('.list_tools_search_input'),
        search_select = document.querySelector('.list_tools_search_select'),
        search_clear = document.querySelector('.list_tools_search_clear'),
        radio_name = document.getElementById('list_tools_search_checkbox_name'),
        radio_teacher = document.getElementById('list_tools_search_checkbox_teacher'),
        radio_subject = document.getElementById('list_tools_search_checkbox_subject'),
        basic = document.querySelector('.basic'),

        groups_cost = document.querySelectorAll('.list_groups_item_cost_number'),
        list_groups = document.querySelector('.list_groups');
    let search_type = "name";
    let status = false;
    let input_value = document.querySelector('.input_value'),
        subject_select = document.querySelector('.subject_select');
    console.log(list_groups.dataset.status)
    if (list_groups.dataset.status === "True") {
        status = true
    } else {
        status = false
    }

    input_value.addEventListener('input', () => {
        if (input_value.value) {
            list_groups.innerHTML = ""
            fetch('/search_groups/' + input_value.dataset.location, {
                method: "POST",
                body: JSON.stringify({
                    input_value: input_value.value,
                    search_type: search_type,
                    status: status
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (JsonResponse) {
                    if (JsonResponse) {
                        for (let i of JsonResponse) {
                            list_groups.innerHTML += `
                        <a href="">
                            <div class="list_groups_item">
                                <div class="list_groups_item_name">${i['name']}
                                    <span class="list_groups_item_tooltiptext">
                                        Имя
                                    </span>
                                </div>
                                <div class="list_groups_item_teacher_fio">
                                    <div class="list_groups_item_teacher_fio_name">
                                        ${i['teacher_name']}
                                        <span class="list_groups_item_tooltiptext">
                                            Имя учителя
                                        </span>
                                    </div>
                                    <div class="list_groups_item_teacher_fio_surname">
                                        ${i['teacher_surname']}
                                        <span class="list_groups_item_tooltiptext">
                                            Фамилия учителя
                                        </span>
                                    </div>
                                </div>
                                <div class="list_groups_item_subject">${i['subject']}
                                    <span class="list_groups_item_tooltiptext">
                                        Предмет
                                    </span>
                                </div>
                                <div class="list_groups_item_tarif">${i['course_type']}
                                    <span class="list_groups_item_tooltiptext">
                                        Тариф
                                    </span>
                                </div>
                                <div class="list_groups_item_cost"><span
                                        class="list_groups_item_cost_number">${i['cost']}</span>
                                    <span class="list_groups_item_tooltiptext">
                                        Стоимость
                                    </span>
                                </div>
                            </div>
                        </a>
                    `
                        }
                    }
                })

        } else {
            window.location.reload()
        }

    })
    subject_select.addEventListener('change', () => {
        if (subject_select.value) {
            list_groups.innerHTML = ""
            fetch('/subject_groups/' + input_value.dataset.location, {
                method: "POST",
                body: JSON.stringify({
                    subject_select: subject_select.value,
                    status: status
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (JsonResponse) {
                    if (JsonResponse) {
                        for (let i of JsonResponse) {
                            list_groups.innerHTML += `
                        <a href="">
                            <div class="list_groups_item">
                                <div class="list_groups_item_name">${i['name']}
                                    <span class="list_groups_item_tooltiptext">
                                        Имя
                                    </span>
                                </div>
                                <div class="list_groups_item_teacher_fio">
                                    <div class="list_groups_item_teacher_fio_name">
                                        ${i['teacher_name']}
                                        <span class="list_groups_item_tooltiptext">
                                            Имя учителя
                                        </span>
                                    </div>
                                    <div class="list_groups_item_teacher_fio_surname">
                                        ${i['teacher_surname']}
                                        <span class="list_groups_item_tooltiptext">
                                            Фамилия учителя
                                        </span>
                                    </div>
                                </div>
                                <div class="list_groups_item_subject">${i['subject']}
                                    <span class="list_groups_item_tooltiptext">
                                        Предмет
                                    </span>
                                </div>
                                <div class="list_groups_item_tarif">${i['course_type']}
                                    <span class="list_groups_item_tooltiptext">
                                        Тариф
                                    </span>
                                </div>
                                <div class="list_groups_item_cost"><span
                                        class="list_groups_item_cost_number">${i['cost']}</span>
                                    <span class="list_groups_item_tooltiptext">
                                        Стоимость
                                    </span>
                                </div>
                            </div>
                        </a>
                    `
                        }
                    }
                })
        } else {
            window.location.reload()
        }
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
    list_groups.addEventListener('click', (event) => {
        if (list_groups === event.target) {
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
        search_input.placeholder = "Введите имя группы";
        search_form.action = "/group_search_name"
        search_input.name = 'group_name'
        search_select.classList.remove('list_tools_search_select_active')
        search_input.style.display = 'block'
        search_type = "name"
    })
    radio_teacher.addEventListener('change', () => {
        search_input.placeholder = "Введите имя учителя";
        search_form.action = "/group_search_teacher";
        search_input.name = 'group_teacher'
        search_select.classList.remove('list_tools_search_select_active')
        search_input.style.display = 'block'
        search_type = "teacher"
    })
    radio_subject.addEventListener('click', () => {
        search_input.style.display = 'none'
        search_select.classList.add('list_tools_search_select_active')
        search_input.classList.remove('list_tools_search_input_active')
        search_form.action = "/group_search_subject"
        search_input.removeAttribute('required')
    })

    document.querySelector('.education_language').addEventListener('change', function () {
        document.querySelector('.form_button').click()
    })

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    groups_cost.forEach(each_cost => {
        each_cost.innerHTML = numberWithCommas(each_cost.innerHTML)
    })

    // $('.list_groups_item').each('click', function () {
    //     $('.overlay_submit, .overlay_submit_modal_delete').fadeIn();
    // })

    $('.overlay_submit_modal_delete__close').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });

    $('.overlay_submit_modal_delete_select_no').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });


    const overlay_submit = document.querySelector('.overlay_submit')
    if (overlay_submit) {
        overlay_submit.addEventListener('click', (e) => {
            if (e.target === overlay_submit) {
                overlay_submit.style.display = 'none'
            }
        })
    }


})