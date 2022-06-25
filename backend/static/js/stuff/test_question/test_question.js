let checkbox = document.querySelectorAll('.checkbox');
if (checkbox) {
    checkbox.forEach((item, index) => {
        item.addEventListener('change', function () {

            let value;
            value = !!item.checked;
            fetch('/change_status_job/', {
                method: "POST",
                body: JSON.stringify({
                    status: value,
                    job_id: item.dataset.id
                }),
                headers: {
                    "Content-type": "application/json"
                }

            })
        })
    })
}

let yes = document.querySelectorAll('.yes'),
    no = document.querySelectorAll('.no'),
    rarely = document.querySelectorAll('.rarely'),
    desc = document.querySelectorAll('.desc');
if (yes) {
    sendAnswer(yes, "1")
}
if (rarely) {
    sendAnswer(rarely, "0.5")
}
if (no) {
    sendAnswer(no, "0")
}

function sendAnswer(type, ball) {
    type.forEach((item, index) => {
        item.addEventListener('click', function () {
            fetch('/fill_test_question/', {
                method: "POST",
                body: JSON.stringify({
                    student_id: desc[index].dataset.student_id,
                    question_id: desc[index].dataset.id,
                    question: desc[index].innerHTML,
                    ball: ball
                }),
                headers: {
                    "Content-type": "application/json"
                }

            })
        })
    })
}

// if (checkbox) {
//     checkbox.forEach(item => {
//         if (item.dataset.id === item.dataset.id) {
//             let interval = setInterval(reloadPage, 5000)
//
//             function reloadPage() {
//                 window.location.reload()
//                 clearInterval(interval)
//             }
//         }
//     })
// }

let select_class = document.querySelector('.select_class'),
    select_school = document.querySelector('.select_school'),
    class_number = document.querySelector('.class_number'),
    form = document.querySelector('.submit_form'),
    school_number = document.querySelector('.school_number');
if (select_class) {
    select_class.addEventListener('change', () => {
        class_number.value = select_class.value;
        form.click()
    })
}
if (select_school) {
    select_school.addEventListener('change', () => {
        school_number.value = select_school.value;
        form.click()
    })
}

let btnEdit = document.querySelectorAll('.delete');
if (btnEdit) {
    btnEdit.forEach(button => {
        button.addEventListener('click', (event) => {

            let ans = confirm('Вы действительно хотите удалить?');
            if (!ans) {
                event.preventDefault()
                window.location.reload()
            }
        })
    })
}
