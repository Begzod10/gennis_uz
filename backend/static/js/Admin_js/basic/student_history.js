function removeActive(array,className) {
        array.forEach(item => {
            item.classList.remove(className)
        })
    }

    const check_btns = document.querySelectorAll('.list_tools_btn'),
        to_check = document.querySelector('.list_students_to_check'),
        checked = document.querySelector('.list_students_checked'),
        overlay_to_check = document.querySelector('.list_students_to_check_overlay'),
        overlay_checked = document.querySelector('.list_students_checked_overlay')

    check_btns.forEach(item => {
        item.addEventListener('click', ()=> {
            removeActive(check_btns,'list_tools_btn_active')
            if (item.classList.contains('list_tools_to_check')) {
                checked.classList.remove('list_students_checked_active')
                to_check.classList.add('list_students_to_check_active')
                item.classList.add('list_tools_btn_active')
                overlay_checked.style.display = 'none'
                overlay_to_check.style.display = 'block'
            }
            if (item.classList.contains('list_tools_checked')) {
                checked.classList.add('list_students_checked_active')
                to_check.classList.remove('list_students_to_check_active')
                item.classList.add('list_tools_btn_active')
                overlay_checked.style.display = 'block'
                overlay_to_check.style.display = 'none'

            }
        })
    })