window.addEventListener('DOMContentLoaded',()=> {
    //Edit name
    const edit = document.querySelector('.edit'),
        rename_name = document.querySelector('.rename_name');

    edit.addEventListener('click',()=>{
        if (rename_name.style.display === "block"){
            rename_name.style.display = "none";
        }else {
            rename_name.style.display = "block";
        }

    })
    //delete_teacher
    const to_delete = document.querySelector('.to_delete'),
        message_teacher = document.querySelector('.message_teacher'),
        to_cancel = document.querySelector('.to_cancel');
    function deleteTeacherAndGroup(item1,item2,item3) {
        item1.addEventListener('click',()=>{
            item2.style.display = "block";
            item1.style.display = "none";
            if (item3){
                item3.addEventListener('click',()=>{
                    item2.style.display = "none";
                    item1.style.display = "block";
                })
            }
        })
    }
    //delete group
    const to_delete_group = document.querySelector('.to_delete_group'),
        message_group = document.querySelector('.message_group'),
        to_cancel_group = document.querySelector('.to_cancel_group');

    deleteTeacherAndGroup(to_delete_group,message_group,to_cancel_group)
    if (to_delete) {
        deleteTeacherAndGroup(to_delete, message_teacher, to_cancel)
    }
    //check names
    const names = document.querySelectorAll('.names'),
        name_input = document.querySelector('.name_input');
    let text = name_input.value
    name_input.addEventListener('keyup',checkGroupName)
    function checkGroupName() {
        setTimeout(extra,3000)
        function extra(){
            names.forEach(name=>{
            if (name_input.value.toUpperCase() === name.innerHTML){
                alert('Это имя уже занято')
                name_input.value = text
            }
        })
        }

    }

    //transfer student
    const transfer_button = document.querySelector('.transfer_button'),
        th_transfer = document.querySelector('.th_transfer'),
        td_input = document.querySelectorAll('.td_input'),
        checkboxes = document.querySelectorAll('.checkbox'),
        move_button = document.querySelector('.move_button button');

    transfer_button.addEventListener('click',()=> {
        if(th_transfer.style.display === "table-cell") {
            th_transfer.style.display = "none";
            td_input.forEach(input => {
                input.style.display = "none";
            })
            delete_students.style.display = "inline";
            move_button.style.display = "none";
            transfer_button.style.backgroundColor = "limegreen"
        }else {
            th_transfer.style.display = "table-cell";
            td_input.forEach(input => {
                input.style.display = "table-cell";
            })
            delete_students.style.display = "none";
            th_delete.style.display = "none";
            td_delete.forEach(delete_st =>{
                delete_st.style.display = "none";
            })
            move_button.style.display = "block";
            move_button.style.cursor = "not-allowed";
            move_button.disabled = true;
            checkboxes.forEach(input=>{
                input.addEventListener('click',(event)=>{
                    if (input.checked){
                        move_button.style.cursor = "pointer";
                        move_button.disabled = false;
                    }else {
                        move_button.style.cursor = "not-allowed";
                        move_button.disabled = true;
                    }
                })
            })
            transfer_button.style.backgroundColor = "red";
        }
    })
    //delete students
    const delete_students = document.querySelector('.delete_students'),
        th_delete = document.querySelector('.th_delete'),
        td_delete = document.querySelectorAll('.td_delete');

    delete_students.addEventListener('click',()=>{
        if (th_delete.style.display === "table-cell"){
            th_delete.style.display = "none";
            td_delete.forEach(delete_st =>{
                delete_st.style.display = "none";
            })
            transfer_button.style.display = "inline";
        }else {
            th_delete.style.display = "table-cell";
            td_delete.forEach(delete_st =>{
                delete_st.style.display = "table-cell";
            })
            transfer_button.style.display = "none";
        }

    })
    //flash
     const close_flash = document.querySelector('.close_flash'),
        for_flash = document.querySelector('.for_flash');

    if(close_flash) {
        close_flash.addEventListener('click', () => {
            for_flash.style.display = "none";
        })
    }


})