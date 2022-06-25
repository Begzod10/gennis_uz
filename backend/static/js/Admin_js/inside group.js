window.addEventListener('DOMContentLoaded', () => {
    const students_money = document.querySelectorAll('.list_students_item_box_info_item_number'),
        cost_group = document.querySelector('.group_info_cost_number')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
        cost_group.innerHTML = numberWithCommas(cost_group.innerHTML)
    })


    const change_info = document.querySelector('.group_tools_change_info_btn'),
        close_info = document.querySelector('.group_tools_change_info_close'),
        move_group = document.querySelector('.group_tools_move_st_btn'),
        close_move = document.querySelector('.group_tools_move_st_close'),
        submit_move = document.querySelector('.group_submit_move_btn'),
        span_items = document.querySelectorAll('.group_info_span'),
        group_name_form = document.querySelector('.group_info_name_form'),
        group_teacher_form = document.querySelector('.group_info_teacher_form'),
        group_lang_form = document.querySelector('.group_info_lang_form'),
        student_checkbox = document.querySelectorAll('.list_students_item_box_move_input'),
        delete_group = document.querySelector('.group_submit_delete_btn'),
        student_deletes = document.querySelectorAll('.list_students_item_box_delete'),
        cost_group_form = document.querySelectorAll('.group_info_cost_form'),
        make_group = document.querySelector('.group_submit_make_btn');


    change_info.addEventListener('click', () => {
        change_info.style.display = 'none'
        close_info.style.display = 'block'
        group_name_form.style.display = 'flex'
        cost_group_form.forEach(item => {
            item.style.display = 'flex'
        })
        group_teacher_form.style.display = 'flex'
        group_lang_form.style.display = 'flex'
        delete_group.style.display = 'block'
        make_group.style.display = 'block'
        student_deletes.forEach(student => {
            student.style.display = 'flex'
        })
        span_items.forEach(item => {
            item.style.display = 'none'
        })
    })

    close_info.addEventListener('click', () => {
        change_info.style.display = 'block'
        close_info.style.display = 'none'
        group_name_form.style.display = 'none'
        cost_group_form.forEach(item => {
            item.style.display = 'none'
        })
        group_teacher_form.style.display = 'none'
        group_lang_form.style.display = 'none'
        delete_group.style.display = 'none'
        make_group.style.display = 'none'
        student_deletes.forEach(student => {
            student.style.display = 'none'
        })
        span_items.forEach(item => {
            item.style.display = 'block'
        })
    })

    move_group.addEventListener('click', () => {
        move_group.style.display = 'none'
        close_move.style.display = 'flex'
        submit_move.style.display = 'flex'

        student_checkbox.forEach(student => {
            student.style.display = 'flex'
        })
    })

    close_move.addEventListener('click', () => {
        move_group.style.display = 'flex'
        close_move.style.display = 'none'
        submit_move.style.display = 'none'

        student_checkbox.forEach(student => {
            student.style.display = 'none'
        })
    })

    $('.group_submit_delete_btn').on('click', function () {
        $('#for_gr').fadeIn();
    });

    $('#close_gr').on('click', function () {
        $('#for_gr').fadeOut();
    });

    $('.overlay_submit_modal_delete_select_no').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });


    const overlay_submit = document.querySelector('.overlay_submit')

    overlay_submit.addEventListener('click', (e) => {
        if (e.target === overlay_submit) {
            overlay_submit.style.display = 'none'
        }
    })
    const checkbox = document.querySelectorAll('.checkbox');
    for (let d = 0; d < checkbox.length; d++) {
        const checked = checkbox[d]
        checked.onchange = function (event) {
            const check_id = event.target.dataset['id']
            const checking = event.target.checked
            console.log(check_id, checking)
            fetch('/check_moved/' + check_id, {
                method: "POST",
                body: JSON.stringify({
                    'completed': checking
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
        }
    }

    function checkTextLength(text) {
        const textTag = document.querySelectorAll(text)
        textTag.forEach(item => {
            if (item.innerText.length >= 10) {
                item.innerText += '...'
            }
        })
    }


    checkTextLength('.list_students_item_box_info_fio_username');
    const
        select_delete = document.querySelector('.select_delete'),
        input_delete = document.querySelector('.input_delete'),
        delete_student2 = document.querySelector('.delete_student2');


    input_delete.style.visibility = 'hidden';


    select_delete.addEventListener('change', () => {
        if (select_delete.value === 'boshqa sabab') {
            input_delete.style.visibility = 'visible'
            input_delete.required = true;

        } else {
            input_delete.style.visibility = 'hidden'
            input_delete.required = false;

        }

    })


    let delete_student = document.querySelectorAll('.list_students_item_box_delete'),
        data_id = document.querySelectorAll('[data-id]'),
        data_gr = document.querySelector('[data-group]'),
        close_student = document.getElementById('close_student'),
        for_student = document.getElementById('for_student');


    let student_id,
        group_id;
    delete_student.forEach((item, id) => {
        item.addEventListener("click", () => {
            for_student.style.display = "flex";
            student_id = data_id[id].dataset.id;
            group_id = data_gr.dataset.group;
        })
    })
    close_student.addEventListener("click", () => {
        for_student.style.display = "none";
    })

    delete_student2.addEventListener('click', () => {
        fetch('/deleted_students/' + student_id + "/" + group_id, {
            method: 'DELETE',
            body: JSON.stringify({
                'reason': select_delete.value,
                'reason2': input_delete.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            window.location.reload();
        })
        .catch(function () {
            console.log('error')
            window.location.reload();
        })
    })

})