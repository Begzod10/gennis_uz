window.addEventListener('DOMContentLoaded',()=> {
    // user
    const location_buttons = document.querySelectorAll('.button_subjects button');
    location_buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            removeActiveClasses();
            button.classList.add('active');
        });
    });

    function removeActiveClasses() {
        location_buttons.forEach(button => {
            button.classList.remove('active');
        });
    }

    //payment_select
    const xojakent_select = document.querySelector('#xojakent_select'),
        gazalkent_select = document.querySelector('#gazalkent_select'),
        chirchiq_select = document.querySelector('#chirchiq_select'),
        xojakent_payment = document.querySelector('#xojakent_payment'),
        gazalkent_payment = document.querySelector('#gazalkent_payment'),
        chirchiq_payment = document.querySelector('#chirchiq_payment');


    //Xojakent
    const xojakent_payment_student = document.querySelector('#xojakent_payment_student'),
     xojakent_salary = document.querySelector('#xojakent_salary'),
     capital_xojakent = document.querySelector('#capital_xojakent'),
     overhead_xojakent = document.querySelector('#overhead_xojakent'),
     withdrawal_xojakent = document.querySelector('#withdrawal_xojakent'),
     xojakent_debt = document.querySelector('#xojakent_debt'),
     xojakent_profit = document.querySelector('#xojakent_profit');


    //Gazalkent
    const gazalkent_payment_student = document.querySelector('#gazalkent_payment_student'),
     gazalkent_salary = document.querySelector('#gazalkent_salary'),
     capital_gazalkent = document.querySelector('#capital_gazalkent'),
     overhead_gazalkent = document.querySelector('#overhead_gazalkent'),
     withdrawal_gazalkent = document.querySelector('#withdrawal_gazalkent'),
     gazalkent_debt = document.querySelector('#gazalkent_debt'),
     gazalkent_profit = document.querySelector('#gazalkent_profit');


    //chirchiq
    const chirchiq_payment_student = document.querySelector('#chirchiq_payment_student'),
     chirchiq_salary = document.querySelector('#chirchiq_salary'),
     capital_chirchiq = document.querySelector('#capital_chirchiq'),
     overhead_chirchiq = document.querySelector('#overhead_chirchiq'),
     withdrawal_chirchiq = document.querySelector('#withdrawal_chirchiq'),
     chirchiq_debt = document.querySelector('#chirchiq_debt'),
     chirchiq_profit = document.querySelector('#chirchiq_profit');
    if (xojakent_payment) {
        xojakent_payment.addEventListener('click', () => {
            xojakent_select.style.display = "block";
            gazalkent_select.style.display = "none";
            gazalkent_payment_student.style.display = "none";
            gazalkent_salary.style.display = "none";
            capital_gazalkent.style.display = "none";
            overhead_gazalkent.style.display = "none";
            withdrawal_gazalkent.style.display = "none";
            gazalkent_debt.style.display = "none";
            gazalkent_profit.style.display = "none";
            chirchiq_select.style.display = "none";
            chirchiq_payment_student.style.display = "none";
            chirchiq_salary.style.display = "none";
            capital_chirchiq.style.display = "none";
            overhead_chirchiq.style.display = "none";
            withdrawal_chirchiq.style.display = "none";
            chirchiq_debt.style.display = "none";
            chirchiq_profit.style.display = "none";
        });
    }
    if (gazalkent_payment) {
        gazalkent_payment.addEventListener('click', () => {
            xojakent_select.style.display = "none";
            xojakent_payment_student.style.display = "none";
            xojakent_salary.style.display = "none";
            capital_xojakent.style.display = "none";
            overhead_xojakent.style.display = "none";
            withdrawal_xojakent.style.display = "none";
            xojakent_debt.style.display = "none";
            xojakent_profit.style.display = "none";
            gazalkent_select.style.display = "block";
            chirchiq_select.style.display = "none";
            chirchiq_payment_student.style.display = "none";
            chirchiq_salary.style.display = "none";
            capital_chirchiq.style.display = "none";
            overhead_chirchiq.style.display = "none";
            withdrawal_chirchiq.style.display = "none";
            chirchiq_debt.style.display = "none";
            chirchiq_profit.style.display = "none";
        });
    }
    if (chirchiq_payment) {
        chirchiq_payment.addEventListener('click', () => {
            xojakent_select.style.display = "none";
            xojakent_payment_student.style.display = "none";
            xojakent_salary.style.display = "none";
            capital_xojakent.style.display = "none";
            overhead_xojakent.style.display = "none";
            withdrawal_xojakent.style.display = "none";
            xojakent_debt.style.display = "none";
            xojakent_profit.style.display = "none";
            gazalkent_select.style.display = "none";
            gazalkent_payment_student.style.display = "none";
            gazalkent_salary.style.display = "none";
            capital_gazalkent.style.display = "none";
            overhead_gazalkent.style.display = "none";
            withdrawal_gazalkent.style.display = "none";
            gazalkent_debt.style.display = "none";
            gazalkent_profit.style.display = "none";
            chirchiq_select.style.display = "block";
        })
    }
    showAll(xojakent_select,xojakent_payment_student,xojakent_salary,capital_xojakent,overhead_xojakent,withdrawal_xojakent,xojakent_debt,xojakent_profit)
    showAll(gazalkent_select,gazalkent_payment_student,gazalkent_salary,capital_gazalkent,overhead_gazalkent,withdrawal_gazalkent,gazalkent_debt,gazalkent_profit)
    showAll(chirchiq_select,chirchiq_payment_student,chirchiq_salary,capital_chirchiq,overhead_chirchiq,withdrawal_chirchiq,chirchiq_debt,chirchiq_profit)

    function showAll(item1,item2,item3,item4,item5,item6,item7,item8){
     item1.addEventListener('click',()=>{
     if (item1.value === "Оплата студентов"){
         item2.style.display = "block";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "none"
     }else if(item1.value === "Зарплата учителей"){
         item2.style.display = "none";
         item3.style.display = "block";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "none"
     }else if (item1.value === "Капитальные затраты"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "block";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "none"
     }else if (item1.value === "Накладные расходы"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "block";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "none"
     }else if (item1.value === "Вывод"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "block";
         item7.style.display = "none";
         item8.style.display = "none"
     }else if (item1.value === "Студенты с долгами"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "block";
         item8.style.display = "none"
     }else if (item1.value === "Финансовый отчет"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "block"
     }else if (item1.value === "Бухгалтерский учет"){
         item2.style.display = "none";
         item3.style.display = "none";
         item4.style.display = "none";
         item5.style.display = "none";
         item6.style.display = "none";
         item7.style.display = "none";
         item8.style.display = "none"
        }
    })
    }
    // Flash
    const close_flash = document.querySelector('.close_flash'),
        for_flash = document.querySelector('.for_flash');
    if(close_flash) {
        close_flash.addEventListener('click', () => {
            for_flash.style.display = "none";
        })
    }

})