window.addEventListener('DOMContentLoaded',()=> {
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


    search_img.addEventListener('click', ()=> {
        if(search_select_box.style.visibility==="visible") {
            search_select_box.style.visibility = 'hidden';
        }else {
           search_select_box.style.visibility="visible" ;
        }
    })
    basic.addEventListener('click',(event)=>{
        if (basic === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    list_groups.addEventListener('click',(event)=>{
        if (list_groups === event.target) {
            search_select_box.style.visibility = 'hidden';
        }
    })
    search_input.addEventListener('click', ()=> {
        search_select_box.style.visibility = 'hidden';
        console.log(search_input.value.length);
    })
    search_input.addEventListener('keyup', ()=> {
        if (search_input.value.length >= 1) {
            console.log('hello');
            search_clear.style.display = 'block'
        }
        else {
            console.log('hello');
            search_clear.style.display = 'none'
        }
    })
    search_clear.addEventListener('click', ()=> {
        search_input.value = ""
        search_clear.style.display = 'none'
    })
    radio_name.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя группы";
        search_form.action = "/group_name2"
        search_input.name = 'group_name'
        search_select.classList.remove('list_tools_search_select_active')
        search_input.style.display = 'block'
    })
    radio_teacher.addEventListener('change',()=>{
        search_input.placeholder = "Введите имя учителя";
        search_form.action = "/group_search_teacher2";
        search_input.name = 'group_teacher'
        search_select.classList.remove('list_tools_search_select_active')
        search_input.style.display = 'block'
    })
    radio_subject.addEventListener('click',()=>{
        search_input.style.display = 'none'
        search_select.classList.add('list_tools_search_select_active')
        search_input.classList.remove('list_tools_search_input_active')
        search_form.action = "/group_search_by_subject2"
        search_input.removeAttribute('required')
    })



    $('.list_tools_search_submit_img').click(function () {
        $('.list_tools_search_submit').click()
    })


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    groups_cost.forEach(each_cost => {
        each_cost.innerHTML = numberWithCommas(each_cost.innerHTML)
    })
    $('.list_groups_item').each('click', function () {
        $('.overlay_submit, .overlay_submit_modal_delete').fadeIn();
    })

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