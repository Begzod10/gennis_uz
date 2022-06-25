window.addEventListener('DOMContentLoaded',()=> {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    const groups_cost = document.querySelectorAll('.list_groups_item_cost_number')

    groups_cost.forEach(each_cost => {
        each_cost.innerHTML = numberWithCommas(each_cost.innerHTML)
    })




    const overlay_submit = document.querySelector('.overlay_submit'),
        groups = document.querySelectorAll('.list_students_link'),
        close_modal = document.querySelector('.overlay_submit_modal_delete__close');

    groups.forEach(group => {
        group.addEventListener('click', ()=> {
            console.log('hello')
        })
    })

    $('.overlay_submit_modal_delete__close').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });

    $('.overlay_submit_modal_delete_select_no').on('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeOut();
    });

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
            console.log(check_id)
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

})