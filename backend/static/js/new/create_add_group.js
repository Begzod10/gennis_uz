const checkbox = document.querySelectorAll('.checkbox');

for (let d = 0; d < checkbox.length; d++) {
    const checked = checkbox[d]
    checked.onchange = function (event) {
        const check_id = event.target.dataset['id']
        const checking = event.target.checked
        console.log(check_id)
        fetch('/chosen_student/' + check_id, {
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
    if ( item.innerText.length >= 10 ) {
        item.innerText += '...'
    }
})

}
function checkText(text) {
let textTag_2 = document.querySelectorAll(text)
textTag_2.forEach(item_2 => {
    if ( item_2.innerHTML.length > 11 ) {
        const itemParent = item_2.parentElement
        itemParent.style.width = '400px'
        itemParent.style.padding = '10px'
    } else {
        console.log('error')
    }
})
}
checkText('.list_students_item_tooltiptext_comment');
checkTextLength('.list_students_item_fio_username');
checkTextLength('.list_students_item_subjects_subject');