const search_form = document.querySelector('.search_form'),
        search_img = document.querySelector('.list_tools_search_settings_img'),
        search_select_box = document.querySelector('.list_tools_search_settings'),
        search_input = document.querySelector('.list_tools_search_input'),
        search_age = document.querySelector('.list_tools_search_age'),
        search_clear = document.querySelector('.list_tools_search_clear'),
        radio_name = document.getElementById('list_tools_search_checkbox_name'),
        radio_teacher = document.getElementById('list_tools_search_checkbox_teacher'),
        radio_username = document.getElementById('list_tools_search_checkbox_username'),
        radio_age = document.getElementById('list_tools_search_checkbox_age'),
        basic = document.querySelector('.basic'),
        list_groups = document.querySelector('.list_groups'),
        input_age = document.querySelectorAll('.list_tools_search_age_input'),
        subject = document.querySelector('.subject'),
        subjects = document.querySelector('#subjects'),
        list_tools_language = document.querySelector('.list_tools_language'),
        education_language = document.querySelector('.education_language');

    subjects.addEventListener('click',()=>{
        if (subjects.value === "Ingliz tili"){
            subject.value = "Ingliz tili";
        }else if (subjects.value === "Rus tili") {
            subject.value = "Rus tili";
        }else if (subjects.value === "Matematika"){
            subject.value = "Matematika";
        }else if (subjects.value === "Tarix"){
            subject.value = "Tarix";
        }else if (subjects.value === "Ona tili va Adabiyot"){
            subject.value = "Ona tili va Adabiyot";
        }else if (subjects.value === "Kimyo"){
            subject.value = "Kimyo";
        }else if (subjects.value === "Fizika"){
            subject.value = "Fizika";
        }else if (subjects.value === "Biologiya"){
            subject.value = "Biologiya";
        }else if (subjects.value === "Uy xamshiraligi"){
            subject.value = "Uy xamshiraligi";
        }else if (subjects.value === "Avto Maktab"){
            subject.value = "Avto Maktab";
        }else if (subjects.value === "Web Dasturchilik"){
            subject.value = "Web Dasturchilik";
        }else if (subjects.value === "Ingliz tili+mental arifmetika"){
            subject.value = "Ingliz tili+mental arifmetika";
        }else if (subjects.value === "Rus tili+mental arifmetika"){
            subject.value = "Rus tili+mental arifmetika";
        }else if (subjects.value === "Mental arifmetika"){
            subject.value = "Mental arifmetika";
        }
    })
    list_tools_language.addEventListener('click',()=>{
        if (list_tools_language.value === "Узбекский"){
            education_language.value = "Узбекский";
        }else if (list_tools_language.value === "Русский"){
            education_language.value = "Русский";
        }
    })
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
    input_age.forEach(age=>{
        age.addEventListener('click',(event)=>{
            if (age === event.target){
                search_select_box.style.visibility = 'hidden';
            }
        })
    })
    search_input.addEventListener('click', ()=> {
        search_select_box.style.visibility = 'hidden';
        console.log(search_input.value.length);
    })
    search_input.addEventListener('keyup', ()=> {
        if (search_input.value.length >= 1) {
            search_clear.style.display = 'block'
        }
        else {
            search_clear.style.display = 'none'
        }
    })
    search_clear.addEventListener('click', ()=> {
        search_input.value = ""
        search_clear.style.display = 'none'
    })
    radio_name.addEventListener('click',()=>{
        search_input.placeholder = "Введите имя";
        search_form.action = "/search_name_new2"
        input_age.forEach(search=>{
            search.removeAttribute('required')
        })
        search_age.classList.remove('list_tools_search_age_active')
        search_input.style.display = 'block'
    })
    radio_teacher.addEventListener('change',()=>{
        search_clear.style.display = 'none'
        search_input.placeholder = "Введите фамилия";
        search_form.action = "/search_surname_new2";
        input_age.forEach(search=>{
            search.removeAttribute('required')
            console.log('hello')
        })
        search_age.classList.remove('list_tools_search_age_active')
        search_input.style.display = 'block'
    })
    radio_username.addEventListener('change',()=>{
        search_clear.style.display = 'none'
        search_input.placeholder = "Введите username";
        search_form.action = "/search_username_new2";
        input_age.forEach(search=>{
            search.removeAttribute('required')
        })
        search_age.classList.remove('list_tools_search_age_active')
        search_input.style.display = 'block'
    })
    radio_age.addEventListener('click',()=>{
        search_clear.style.display = 'none'
        search_input.style.display = 'none'
        search_age.classList.add('list_tools_search_age_active')
        search_input.classList.remove('list_tools_search_input_active')
        search_input.removeAttribute('required')
        search_form.action = "/search_age_new2"
        input_age.forEach(search=>{
            search.setAttribute('required', "")
        })
    })



    $('.list_tools_search_submit_img').click(function () {
        $('.list_tools_search_submit').click()
    })

    let teacher_ing = document.querySelector('.teacher_ing'),
        teacher_rus = document.querySelector('.teacher_rus'),
        teacher_math = document.querySelector('.teacher_math'),
        teacher_his = document.querySelector('.teacher_his'),
        teacher_mot = document.querySelector('.teacher_mot'),
        teacher_chem = document.querySelector('.teacher_chem'),
        teacher_phy = document.querySelector('.teacher_phy'),
        teacher_web = document.querySelector('.teacher_web'),
        teacher_ing_men = document.querySelector('.teacher_ing_men'),
        teacher_nur = document.querySelector('.teacher_nur'),
        teacher_rus_men = document.querySelector('.teacher_rus_men'),
        teacher_avt = document.querySelector('.teacher_avt'),
        teacher_bio = document.querySelector('.teacher_bio'),
        teacher_men = document.querySelector('.teacher_men'),
        teacher_id = document.querySelector('.teacher_id'),
        subteach = document.querySelector('.subteach');
    subteach.addEventListener('click',()=>{
        if (subteach.value === "Ingliz tili"){
            teacher_ing.hidden = false;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Rus tili"){
            teacher_rus.hidden = false;
            teacher_ing.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Matematika"){
            teacher_math.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Tarix"){
            teacher_his.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Ona tili va Adabiyot"){
            teacher_mot.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Kimyo"){
            teacher_chem.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Fizika"){
            teacher_phy.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Biologiya"){
            teacher_bio.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Uy xamshiraligi"){
            teacher_nur.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Avto Maktab"){
            teacher_avt.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Web Dasturchilik"){
            teacher_web.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Ingliz tili+mental arifmetika"){
            teacher_ing_men.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_rus_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Rus tili+mental arifmetika"){
            teacher_rus_men.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_men.hidden = true;
        }else if(subteach.value === "Mental arifmetika"){
            teacher_men.hidden = false;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
        }else if (subteach.value === "Выберите учителя"){
            teacher_id.value = "";
            teacher_men.hidden = true;
            teacher_ing.hidden = true;
            teacher_rus.hidden = true;
            teacher_math.hidden = true;
            teacher_his.hidden = true;
            teacher_mot.hidden = true;
            teacher_chem.hidden = true;
            teacher_phy.hidden = true;
            teacher_bio.hidden = true;
            teacher_nur.hidden = true;
            teacher_avt.hidden = true;
            teacher_web.hidden = true;
            teacher_ing_men.hidden = true;
            teacher_rus_men.hidden = true;
        }
    })
function getID(item) {
    item.addEventListener('click',()=>{
        teacher_id.value = item.value;
        console.log(teacher_id.value)
    })
}
getID(teacher_ing);
getID(teacher_rus);
getID(teacher_math);
getID(teacher_his);
getID(teacher_mot);
getID(teacher_chem);
getID(teacher_phy);
getID(teacher_bio);
getID(teacher_nur);
getID(teacher_avt);
getID(teacher_web);
getID(teacher_ing_men);
getID(teacher_rus_men);
getID(teacher_men);

$("#subjects").click(function () {
    $("#subjects").click(function () {
        $('.form_button').click()
    });
})