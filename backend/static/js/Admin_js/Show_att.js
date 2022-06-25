window.addEventListener('DOMContentLoaded',()=> {

    const arrival_btn = document.querySelector('.arrival_btn'),
        arrival_table = document.querySelector('.arrival'),
        absence_btn = document.querySelector('.absence_btn'),
        absence_table = document.querySelector('.absence')


    arrival_btn.addEventListener('click', ()=> {
        if (absence_btn.classList.contains('list_tools_btns_item_active')){
            absence_btn.classList.remove('list_tools_btns_item_active')
            arrival_btn.classList.add('list_tools_btns_item_active')
        }
        if (absence_table.classList.contains('list_att_tables_item_active')) {
            absence_table.classList.remove('list_att_tables_item_active')
            arrival_table.classList.add('list_att_tables_item_active')

        }
    })

    absence_btn.addEventListener('click', ()=> {
        if (arrival_btn.classList.contains('list_tools_btns_item_active')){
            arrival_btn.classList.remove('list_tools_btns_item_active')
            absence_btn.classList.add('list_tools_btns_item_active')
        }
        if (arrival_table.classList.contains('list_att_tables_item_active')) {
            arrival_table.classList.remove('list_att_tables_item_active')
            absence_table.classList.add('list_att_tables_item_active')

        }
    })
     const overlay_att = document.querySelector('.overlay_att'),
         absence_submit_del = document.querySelector('.absence_submit_del'),
         modal_att__close_2 = document.querySelector('.modal_att__close_2');

    absence_submit_del.addEventListener('click',()=>{
        overlay_att.style.display = "block";
    })
    modal_att__close_2.addEventListener('click',()=>{
        overlay_att.style.display = "none";
    })

    const checkbox = document.querySelectorAll('.checkbox');

    for (let d = 0; d < checkbox.length; d++) {
        const checked = checkbox[d]
        checked.onchange = function (event) {
            const check_id = event.target.dataset['id']
            const checking = event.target.checked
            console.log(check_id)
            fetch('/reason_day/' + check_id, {
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