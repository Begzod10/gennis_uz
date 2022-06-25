window.addEventListener('DOMContentLoaded',()=> {
    /// Xojakent
    const location_buttons = document.querySelectorAll('.button_subjects button'),
        xojakent_students = document.getElementById('xojakent_students'),
        xojakent_subjects = document.getElementById('xojakent_subjects'),
        all_student_xojakent = document.querySelector('.all_student_xojakent'),
        xojakent_english = document.querySelector('.xojakent_english'),
        xojakent_russian = document.querySelector('.xojakent_russian'),
        xojakent_math = document.querySelector('.xojakent_math'),
        xojakent_history = document.querySelector('.xojakent_history'),
        xojakent_ona_adabiyot = document.querySelector('.xojakent_ona_adabiyot'),
        xojakent_chemistry = document.querySelector('.xojakent_chemistry'),
        xojakent_physics = document.querySelector('.xojakent_physics'),
        xojakent_biology = document.querySelector('.xojakent_biology'),
        xojakent_nurse = document.querySelector('.xojakent_nurse'),
        xojakent_car = document.querySelector('.xojakent_car'),
        xojakent_web = document.querySelector('.xojakent_web'),
        Ingliz_tili_mental_arifmetika = document.querySelector('.Ingliz_tili_mental_arifmetika'),
        Rus_tili_mental_arifmetika = document.querySelector('.Rus_tili_mental_arifmetika'),
        mental_arifmetika = document.querySelector('.mental_arifmetika');

    // Gazalkent
    const gazalkent_students = document.getElementById('gazalkent_students'),
        gazalkent_subjects = document.getElementById('gazalkent_subjects'),
        all_student_gazalkent = document.querySelector('.all_student_gazalkent'),
        gazalkent_english = document.querySelector('.gazalkent_english'),
        gazalkent_russian = document.querySelector('.gazalkent_russian'),
        gazalkent_math = document.querySelector('.gazalkent_math'),
        gazalkent_history = document.querySelector('.gazalkent_history'),
        gazalkent_ona_adabiyot = document.querySelector('.gazalkent_ona_adabiyot'),
        gazalkent_chemistry = document.querySelector('.gazalkent_chemistry'),
        gazalkent_physics = document.querySelector('.gazalkent_physics'),
        gazalkent_biology = document.querySelector('.gazalkent_biology'),
        gazalkent_nurse = document.querySelector('.gazalkent_nurse'),
        gazalkent_car = document.querySelector('.gazalkent_car'),
        gazalkent_web = document.querySelector('.gazalkent_web'),
        Ingliz_tili_mental_arifmetika2 = document.querySelector('.Ingliz_tili_mental_arifmetika2'),
        Rus_tili_mental_arifmetika2 = document.querySelector('.Rus_tili_mental_arifmetika2'),
        mental_arifmetika2 = document.querySelector('.mental_arifmetika2');

    //Chirchiq
    const chirchiq_students = document.getElementById('chirchiq_students'),
        chirchiq_subjects = document.getElementById('chirchiq_subjects'),
        all_student_chirchiq = document.querySelector('.all_student_chirchiq'),
        chirchiq_english = document.querySelector('.chirchiq_english'),
        chirchiq_russian = document.querySelector('.chirchiq_russian'),
        chirchiq_math = document.querySelector('.chirchiq_math'),
        chirchiq_history = document.querySelector('.chirchiq_history'),
        chirchiq_ona_adabiyot = document.querySelector('.chirchiq_ona_adabiyot'),
        chirchiq_chemistry = document.querySelector('.chirchiq_chemistry'),
        chirchiq_physics = document.querySelector('.chirchiq_physics'),
        chirchiq_biology = document.querySelector('.chirchiq_biology'),
        chirchiq_nurse = document.querySelector('.chirchiq_nurse'),
        chirchiq_car = document.querySelector('.chirchiq_car'),
        chirchiq_web = document.querySelector('.chirchiq_web'),
        Ingliz_tili_mental_arifmetika3 = document.querySelector('.Ingliz_tili_mental_arifmetika3'),
        Rus_tili_mental_arifmetika3 = document.querySelector('.Rus_tili_mental_arifmetika3'),
        mental_arifmetika3 = document.querySelector('.mental_arifmetika3');

    const for_footer = document.querySelector('.for_footer');

    location_buttons.forEach(button=>{
        button.addEventListener('click',(event)=>{
            event.preventDefault();
            removeActiveClasses();
            button.classList.add('active');
            if (for_footer) {
                for_footer.style.marginTop = "-40px"
            }
        });
    });
    function removeActiveClasses() {
        location_buttons.forEach(button =>{
            button.classList.remove('active');
        });
    }
    function forXojakentStudents(){
        xojakent_subjects.style.display = "inline";
        all_student_xojakent.style.display = "inline";
        xojakent_english.style.display = "none";
        xojakent_russian.style.display = "none";
        xojakent_math.style.display = "none";
        xojakent_history.style.display = "none";
        xojakent_ona_adabiyot.style.display = "none";
        xojakent_chemistry.style.display = "none";
        xojakent_physics.style.display = "none";
        xojakent_biology.style.display = "none";
        xojakent_nurse.style.display = "none";
        xojakent_car.style.display = "none";
        xojakent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika.style.display = "none";
        Rus_tili_mental_arifmetika.style.display = "none";
        mental_arifmetika.style.display = "none";
        gazalkent_subjects.style.display = "none";
        all_student_gazalkent.style.display = "none";
        gazalkent_english.style.display = "none";
        gazalkent_russian.style.display = "none";
        gazalkent_math.style.display = "none";
        gazalkent_history.style.display = "none";
        gazalkent_ona_adabiyot.style.display = "none";
        gazalkent_chemistry.style.display = "none";
        gazalkent_physics.style.display = "none";
        gazalkent_biology.style.display = "none";
        gazalkent_nurse.style.display = "none";
        gazalkent_car.style.display = "none";
        gazalkent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika2.style.display = "none";
        Rus_tili_mental_arifmetika2.style.display = "none";
        mental_arifmetika2.style.display = "none";
        chirchiq_subjects.style.display = "none";
        all_student_chirchiq.style.display = "none";
        chirchiq_english.style.display = "none";
        chirchiq_russian.style.display = "none";
        chirchiq_math.style.display = "none";
        chirchiq_history.style.display = "none";
        chirchiq_ona_adabiyot.style.display = "none";
        chirchiq_chemistry.style.display = "none";
        chirchiq_physics.style.display = "none";
        chirchiq_biology.style.display = "none";
        chirchiq_nurse.style.display = "none";
        chirchiq_car.style.display = "none";
        chirchiq_web.style.display = "none";
        Ingliz_tili_mental_arifmetika3.style.display = "none";
        Rus_tili_mental_arifmetika3.style.display = "none";
        mental_arifmetika3.style.display = "none";
    }
    function forXojakentSubjects(){
        xojakent_subjects.addEventListener('click',()=>{
            if (xojakent_subjects.value === "Ingliz tili"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "inline";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if(xojakent_subjects.value === "Rus tili"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "inline";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if(xojakent_subjects.value === "Matematika"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "inline";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if(xojakent_subjects.value === "Tarix"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "inline";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if(xojakent_subjects.value === "Ona tili va Adabiyot"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "inline";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Kimyo"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "inline";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Fizika"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "inline";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Biologiya"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "inline";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Uy xamshiraligi"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "inline";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Avto Maktab"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "inline";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Web Dasturchilik"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "inline";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if(xojakent_subjects.value === "Все студенты"){
                all_student_xojakent.style.display = "inline";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Ingliz tili+mental arifmetika"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "inline";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Rus tili+mental arifmetika"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "inline";
                mental_arifmetika.style.display = "none";
            }else if (xojakent_subjects.value === "Mental arifmetika"){
                all_student_xojakent.style.display = "none";
                xojakent_english.style.display = "none";
                xojakent_russian.style.display = "none";
                xojakent_math.style.display = "none";
                xojakent_history.style.display = "none";
                xojakent_ona_adabiyot.style.display = "none";
                xojakent_chemistry.style.display = "none";
                xojakent_physics.style.display = "none";
                xojakent_biology.style.display = "none";
                xojakent_nurse.style.display = "none";
                xojakent_car.style.display = "none";
                xojakent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika.style.display = "none";
                Rus_tili_mental_arifmetika.style.display = "none";
                mental_arifmetika.style.display = "inline";
            }
        })
    }
    if (xojakent_students){
        xojakent_students.addEventListener('click',forXojakentStudents)
    }
    forXojakentSubjects()


    function forGazalkentStudents(){
        gazalkent_subjects.style.display = "inline";
        all_student_gazalkent.style.display = "inline";
        gazalkent_english.style.display = "none";
        gazalkent_russian.style.display = "none";
        gazalkent_math.style.display = "none";
        gazalkent_history.style.display = "none";
        gazalkent_ona_adabiyot.style.display = "none";
        gazalkent_chemistry.style.display = "none";
        gazalkent_physics.style.display = "none";
        gazalkent_biology.style.display = "none";
        gazalkent_nurse.style.display = "none";
        gazalkent_car.style.display = "none";
        gazalkent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika2.style.display = "none";
        Rus_tili_mental_arifmetika2.style.display = "none";
        mental_arifmetika2.style.display = "none";
        xojakent_subjects.style.display = "none";
        all_student_xojakent.style.display = "none";
        xojakent_english.style.display = "none";
        xojakent_russian.style.display = "none";
        xojakent_math.style.display = "none";
        xojakent_history.style.display = "none";
        xojakent_ona_adabiyot.style.display = "none";
        xojakent_chemistry.style.display = "none";
        xojakent_physics.style.display = "none";
        xojakent_biology.style.display = "none";
        xojakent_nurse.style.display = "none";
        xojakent_car.style.display = "none";
        xojakent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika.style.display = "none";
        Rus_tili_mental_arifmetika.style.display = "none";
        mental_arifmetika.style.display = "none";
        chirchiq_subjects.style.display = "none";
        all_student_chirchiq.style.display = "none";
        chirchiq_english.style.display = "none";
        chirchiq_russian.style.display = "none";
        chirchiq_math.style.display = "none";
        chirchiq_history.style.display = "none";
        chirchiq_ona_adabiyot.style.display = "none";
        chirchiq_chemistry.style.display = "none";
        chirchiq_physics.style.display = "none";
        chirchiq_biology.style.display = "none";
        chirchiq_nurse.style.display = "none";
        chirchiq_car.style.display = "none";
        chirchiq_web.style.display = "none";
        Ingliz_tili_mental_arifmetika3.style.display = "none";
        Rus_tili_mental_arifmetika3.style.display = "none";
        mental_arifmetika3.style.display = "none";
    }
    function forGazalkentSubjects(){
        gazalkent_subjects.addEventListener('click',()=>{
            if (gazalkent_subjects.value === "Ingliz tili"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "inline";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if(gazalkent_subjects.value === "Rus tili"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "inline";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if(gazalkent_subjects.value === "Matematika"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "inline";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if(gazalkent_subjects.value === "Tarix"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "inline";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if(gazalkent_subjects.value === "Ona tili va Adabiyot"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "inline";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Kimyo"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "inline";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Fizika"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "inline";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Biologiya"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "inline";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Uy xamshiraligi"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "inline";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Avto Maktab"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "inline";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Web Dasturchilik"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "inline";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if(gazalkent_subjects.value === "Все студенты"){
                all_student_gazalkent.style.display = "inline";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Ingliz tili+mental arifmetika"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "inline";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Rus tili+mental arifmetika"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "inline";
                mental_arifmetika2.style.display = "none";
            }else if (gazalkent_subjects.value === "Mental arifmetika"){
                all_student_gazalkent.style.display = "none";
                gazalkent_english.style.display = "none";
                gazalkent_russian.style.display = "none";
                gazalkent_math.style.display = "none";
                gazalkent_history.style.display = "none";
                gazalkent_ona_adabiyot.style.display = "none";
                gazalkent_chemistry.style.display = "none";
                gazalkent_physics.style.display = "none";
                gazalkent_biology.style.display = "none";
                gazalkent_nurse.style.display = "none";
                gazalkent_car.style.display = "none";
                gazalkent_web.style.display = "none";
                Ingliz_tili_mental_arifmetika2.style.display = "none";
                Rus_tili_mental_arifmetika2.style.display = "none";
                mental_arifmetika2.style.display = "inline";
            }
        })
    }
    if (gazalkent_students){
        gazalkent_students.addEventListener('click',forGazalkentStudents)
    }
    forGazalkentSubjects()

    //Chirchiq
    function forChirchiqStudents(){
        chirchiq_subjects.style.display = "inline";
        all_student_chirchiq.style.display = "inline";
        chirchiq_english.style.display = "none";
        chirchiq_russian.style.display = "none";
        chirchiq_math.style.display = "none";
        chirchiq_history.style.display = "none";
        chirchiq_ona_adabiyot.style.display = "none";
        chirchiq_chemistry.style.display = "none";
        chirchiq_physics.style.display = "none";
        chirchiq_biology.style.display = "none";
        chirchiq_nurse.style.display = "none";
        chirchiq_car.style.display = "none";
        chirchiq_web.style.display = "none";
        Ingliz_tili_mental_arifmetika3.style.display = "none";
        Rus_tili_mental_arifmetika3.style.display = "none";
        mental_arifmetika3.style.display = "none";
        xojakent_subjects.style.display = "none";
        all_student_xojakent.style.display = "none";
        xojakent_english.style.display = "none";
        xojakent_russian.style.display = "none";
        xojakent_math.style.display = "none";
        xojakent_history.style.display = "none";
        xojakent_ona_adabiyot.style.display = "none";
        xojakent_chemistry.style.display = "none";
        xojakent_physics.style.display = "none";
        xojakent_biology.style.display = "none";
        xojakent_nurse.style.display = "none";
        xojakent_car.style.display = "none";
        xojakent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika.style.display = "none";
        Rus_tili_mental_arifmetika.style.display = "none";
        mental_arifmetika.style.display = "none";
        gazalkent_subjects.style.display = "none";
        all_student_gazalkent.style.display = "none";
        gazalkent_english.style.display = "none";
        gazalkent_russian.style.display = "none";
        gazalkent_math.style.display = "none";
        gazalkent_history.style.display = "none";
        gazalkent_ona_adabiyot.style.display = "none";
        gazalkent_chemistry.style.display = "none";
        gazalkent_physics.style.display = "none";
        gazalkent_biology.style.display = "none";
        gazalkent_nurse.style.display = "none";
        gazalkent_car.style.display = "none";
        gazalkent_web.style.display = "none";
        Ingliz_tili_mental_arifmetika2.style.display = "none";
        Rus_tili_mental_arifmetika2.style.display = "none";
        mental_arifmetika2.style.display = "none";
    }
    function forChirchiqSubjects(){
        chirchiq_subjects.addEventListener('click',()=>{
            if (chirchiq_subjects.value === "Ingliz tili"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "inline";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if(chirchiq_subjects.value === "Rus tili"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "inline";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if(chirchiq_subjects.value === "Matematika"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "inline";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if(chirchiq_subjects.value === "Tarix"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "inline";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if(chirchiq_subjects.value === "Ona tili va Adabiyot"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "inline";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Kimyo"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "inline";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Fizika"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "inline";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Biologiya"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "inline";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Uy xamshiraligi"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "inline";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Avto Maktab"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "inline";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Web Dasturchilik"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "inline";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if(chirchiq_subjects.value === "Все студенты"){
                all_student_chirchiq.style.display = "inline";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Ingliz tili+mental arifmetika"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "inline";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Rus tili+mental arifmetika"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "inline";
                mental_arifmetika3.style.display = "none";
            }else if (chirchiq_subjects.value === "Mental arifmetika"){
                all_student_chirchiq.style.display = "none";
                chirchiq_english.style.display = "none";
                chirchiq_russian.style.display = "none";
                chirchiq_math.style.display = "none";
                chirchiq_history.style.display = "none";
                chirchiq_ona_adabiyot.style.display = "none";
                chirchiq_chemistry.style.display = "none";
                chirchiq_physics.style.display = "none";
                chirchiq_biology.style.display = "none";
                chirchiq_nurse.style.display = "none";
                chirchiq_car.style.display = "none";
                chirchiq_web.style.display = "none";
                Ingliz_tili_mental_arifmetika3.style.display = "none";
                Rus_tili_mental_arifmetika3.style.display = "none";
                mental_arifmetika3.style.display = "inline";
            }
        })
    }
    if (chirchiq_students){
        chirchiq_students.addEventListener('click',forChirchiqStudents)
    }
    forChirchiqSubjects()

    const create_group = document.querySelector('.create_group'),
        add_group = document.querySelector('.add_group'),
        create_group_modal = document.querySelector('.create_group_modal'),
        create_group_form = document.querySelector('#create_group_form'),
        add_group_form = document.querySelector('#add_group_form'),
        close_create_form = document.querySelector('.close_create_form'),
        tables = document.querySelector('.tables'),
        close_add_form = document.querySelector('.close_add_form');

    //Create Group Form

    function removeCreateGroupForm(){
        create_group_modal.style.display = "none";
        add_group.style.display = "inline";
        create_group_form.style.display = "none";
    }
    if (create_group) {
        create_group.addEventListener('click', () => {
            if (create_group_modal.style.display === "block") {
                removeCreateGroupForm()
            } else {
                create_group_modal.style.display = "block";
                create_group_form.style.display = "flex";
                add_group.style.display = "none";
            }

        })
    }
    if (close_create_form) {
        close_create_form.addEventListener('click', (event) => {
            event.preventDefault();
            removeCreateGroupForm();
        })
    }
    if (create_group_modal) {
        create_group_modal.addEventListener('click', (event) => {
            if (event.target === create_group_modal) {
                removeCreateGroupForm();
            }
        })
    }
    tables.addEventListener('click',(event)=>{
        if (event.target === tables){
            removeCreateGroupForm();
        }
    })

    //Add Group Form
    function removeAddGroupForm(){
        create_group_modal.style.display = "none";
        create_group.style.display = "inline";
        add_group_form.style.display = "none";
    }
    if (add_group_form) {
        add_group.addEventListener('click', () => {
            if (create_group_modal.style.display === "block") {
                removeAddGroupForm()
            } else {
                create_group_modal.style.display = "block";
                add_group_form.style.height = '300px'
                add_group_form.style.display = "flex";
                create_group.style.display = "none";
            }
        })
    }
    if(close_add_form) {
        close_add_form.addEventListener('click', (event) => {
            event.preventDefault()
            removeAddGroupForm()
        })
    }
    if (create_group_modal) {
        create_group_modal.addEventListener('click', (event) => {
            if (event.target === create_group_modal) {
                removeAddGroupForm();
            }
        })
    }
    tables.addEventListener('click',(event)=>{
        if (event.target === tables){
            removeAddGroupForm();
        }
    })
    //Inside  create group form
    const type_course = document.querySelector('#type_course'),
        price = document.querySelector('#price');

    if (type_course) {
        if (type_course.value === "Standard") {
            price.value = "200000";
        }

        type_course.addEventListener('click', () => {
            if (type_course.value === "Standard") {
                price.value = "200000";
            } else if (type_course.value === "Intensive") {
                price.value = "450000"
            } else if (type_course.value === "Super-Intensive") {
                price.value = "600000"
            } else if (type_course.value === "Rocket") {
                price.value = "800000"
            } else if (type_course.value === "Abiturient") {
                price.value = "350000"
            }
        })
    }
    //Check group_name
    const group_name = document.querySelector('.group_name'),
        name = document.querySelectorAll('.name');
    function checkGroupName(){
        setTimeout(extraForGroupName,2000)
        function extraForGroupName() {
            name.forEach(gr_name =>{
                if (group_name.value.toUpperCase()===gr_name.innerHTML){
                    alert('Это имя уже занято')
                    group_name.value = ""
                }
            })

        }

    }
    if (group_name) {
        group_name.addEventListener('keyup', checkGroupName)
    }
    //Add group select
    const add_group_select = document.querySelector('#add_group_select'),
        teacher_id = document.querySelector('#teacher_id');
    if (add_group_select) {
        add_group_select.addEventListener('click', () => {
            teacher_id.value = add_group_select.value;
            console.log(add_group_select.value)
            console.log(`teacher ${teacher_id.value}`)
        })
    }
})