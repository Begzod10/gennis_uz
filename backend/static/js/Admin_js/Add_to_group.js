window.addEventListener('DOMContentLoaded', () => {

    $(".list_tools_search_input").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $(".list_students_item").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

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


    checkText('.list_students_item_tooltiptext_comment')


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


    /// Checked

    // const students = document.querySelectorAll('.list_students_item'),
    //     checkbox = document.querySelectorAll('.checkbox');
    // checkbox.forEach(check=>{
    //     check.addEventListener('click',()=>{
    //         students.forEach(item  => {
    //             const checkbox = item.querySelector('.list_students_item_move_input_checkbox')
    //             if (checkbox.checked) {
    //                 item.style.display = 'flex'
    //             }
    //         })
    //     })
    // })
    const checked_list = document.querySelector('.list_students_checked'),
        check_to_list = document.querySelector('.list_students_to_check'),
        checkbox = document.querySelectorAll('.checkbox');


    checkbox.forEach(check=> {
         check.addEventListener('click', (e) => {
             if (check.checked){
                 setTimeout(function () {
                    checked_list.append(check.parentElement.parentElement.parentElement);
                 },300)
             } else {
                 setTimeout(function () {
                    check_to_list.append(check.parentElement.parentElement.parentElement);
                 },300)
             }
        })
    })

    checkbox.forEach(check=> {
         if (check.checked){
             checked_list.append(check.parentElement.parentElement.parentElement);
         } else {
             check_to_list.append(check.parentElement.parentElement.parentElement);
         }
    })

    const btn = document.querySelectorAll('.list_students_item_move_btn');

    for (let d = 0; d < btn.length; d++) {
        const checked = btn[d]
        checked.click = function (event) {
            const check_id = event.target.dataset['id']
            const checking = false
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
    // Back

    function goBack() {
        window.history.back();
    }

    document.querySelector('.back').addEventListener('click', ()=> {
        goBack()
    })
})