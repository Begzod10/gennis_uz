window.addEventListener('DOMContentLoaded',()=> {

    //check Attendance
    const present = document.querySelector('.present'),
        score__box_balls = document.querySelector('.score__box_balls'),
        absent = document.querySelector('.absent'),
        score__box_absent = document.querySelector('.score__box_absent'),
        cancel = document.querySelector('.cancel');

    function Show(){
        score__box_absent.style.display = "none";
        score__box_balls.style.display = "none";
        present.style.display = "block";
        absent.style.display = "block";
        cancel.style.display = "none";
    }

    present.addEventListener('click',()=>{
        score__box_balls.style.display = "flex";
        present.style.display = "none";
        absent.style.display = "none";
        cancel.style.display = "block";
        cancel.addEventListener('click',Show);

    })
    absent.addEventListener('click',()=>{
        score__box_absent.style.display = "flex";
        present.style.display = "none";
        absent.style.display = "none";
        cancel.style.display = "block";
        cancel.addEventListener('click',Show);
    })



    //Score
    const homework1 = document.getElementById('homework1'),
        homework2 = document.getElementById('homework2'),
        homework3 = document.getElementById('homework3'),
        homework4 = document.getElementById('homework4'),
        homework5 = document.getElementById('homework5'),
        homework = document.querySelector('.homework');


    homework1.addEventListener('click', () => {
        homework1.classList.toggle('checked')
        homework2.classList.remove('checked')
        homework3.classList.remove('checked')
        homework4.classList.remove('checked')
        homework5.classList.remove('checked')
        homework.value = 1
        if (!(homework1.classList.contains("checked"))) {
            homework.value = 0
        }
    })
    homework2.addEventListener('click', () => {
        homework1.classList.add('checked')
        homework2.classList.toggle('checked')
        homework3.classList.remove('checked')
        homework4.classList.remove('checked')
        homework5.classList.remove('checked')
        homework.value = 2
    })
    homework3.addEventListener('click', () => {
        homework1.classList.add('checked')
        homework2.classList.add('checked')
        homework3.classList.toggle('checked')
        homework4.classList.remove('checked')
        homework5.classList.remove('checked')
        homework.value = 3
    })
    homework4.addEventListener('click', () => {
        homework1.classList.add('checked')
        homework2.classList.add('checked')
        homework3.classList.add('checked')
        homework4.classList.toggle('checked')
        homework5.classList.remove('checked')
        homework.value = 4
    })
    homework5.addEventListener('click', () => {
        homework1.classList.add('checked')
        homework2.classList.add('checked')
        homework3.classList.add('checked')
        homework4.classList.add('checked')
        homework5.classList.toggle('checked')
        homework.value = 5
    })

    const dictionary1 = document.getElementById('dictionary1'),
        dictionary2 = document.getElementById('dictionary2'),
        dictionary3 = document.getElementById('dictionary3'),
        dictionary4 = document.getElementById('dictionary4'),
        dictionary5 = document.getElementById('dictionary5'),
        dictionary = document.querySelector('.dictionary');

    if (dictionary1 || dictionary2 || dictionary3 || dictionary4 || dictionary5) {
        dictionary1.addEventListener('click', () => {
            dictionary1.classList.toggle('checked')
            dictionary2.classList.remove('checked')
            dictionary3.classList.remove('checked')
            dictionary4.classList.remove('checked')
            dictionary5.classList.remove('checked')
            dictionary.value = 1
            if (!(dictionary1.classList.contains("checked"))) {
                dictionary.value = 0
            }
        })
        dictionary2.addEventListener('click', () => {
            dictionary1.classList.add('checked')
            dictionary2.classList.toggle('checked')
            dictionary3.classList.remove('checked')
            dictionary4.classList.remove('checked')
            dictionary5.classList.remove('checked')
            dictionary.value = 2
        })
        dictionary3.addEventListener('click', () => {
            dictionary1.classList.add('checked')
            dictionary2.classList.add('checked')
            dictionary3.classList.toggle('checked')
            dictionary4.classList.remove('checked')
            dictionary5.classList.remove('checked')
            dictionary.value = 3
        })
        dictionary4.addEventListener('click', () => {
            dictionary1.classList.add('checked')
            dictionary2.classList.add('checked')
            dictionary3.classList.add('checked')
            dictionary4.classList.toggle('checked')
            dictionary5.classList.remove('checked')
            dictionary.value = 4
        })
        dictionary5.addEventListener('click', () => {
            dictionary1.classList.add('checked')
            dictionary2.classList.add('checked')
            dictionary3.classList.add('checked')
            dictionary4.classList.add('checked')
            dictionary5.classList.toggle('checked')
            dictionary.value = 5
        })
    }
    const active1 = document.getElementById('active1'),
        active2 = document.getElementById('active2'),
        active3 = document.getElementById('active3'),
        active4 = document.getElementById('active4'),
        active5 = document.getElementById('active5'),
        active = document.querySelector('.active');


    active1.addEventListener('click', () => {
        active1.classList.toggle('checked')
        active2.classList.remove('checked')
        active3.classList.remove('checked')
        active4.classList.remove('checked')
        active5.classList.remove('checked')
        active.value = 1
        if (!(active1.classList.contains("checked"))) {
            active.value = 0
        }
    })
    active2.addEventListener('click', () => {
        active1.classList.add('checked')
        active2.classList.toggle('checked')
        active3.classList.remove('checked')
        active4.classList.remove('checked')
        active5.classList.remove('checked')
        active.value = 2
    })
    active3.addEventListener('click', () => {
        active1.classList.add('checked')
        active2.classList.add('checked')
        active3.classList.toggle('checked')
        active4.classList.remove('checked')
        active5.classList.remove('checked')
        active.value = 3
    })
    active4.addEventListener('click', () => {
        active1.classList.add('checked')
        active2.classList.add('checked')
        active3.classList.add('checked')
        active4.classList.toggle('checked')
        active5.classList.remove('checked')
        active.value = 4
    })
    active5.addEventListener('click', () => {
        active1.classList.add('checked')
        active2.classList.add('checked')
        active3.classList.add('checked')
        active4.classList.add('checked')
        active5.classList.toggle('checked')
        active.value = 5
    })

    // Flash
    const close_flash = document.querySelector('.close_flash'),
        for_flash = document.querySelector('.for_flash');
    if(close_flash) {
        close_flash.addEventListener('click', () => {
            for_flash.style.display = "none";
        })
    }
})