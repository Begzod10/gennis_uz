let a = document.querySelectorAll('.a'),
    b = document.querySelectorAll('.b'),
    c = document.querySelectorAll('.c'),
    d = document.querySelectorAll('.d'),
    e = document.querySelectorAll('.e'),
    text = document.querySelectorAll('.for_textarea textarea'),
    answer = document.querySelectorAll('.for_textarea'),
    a2 = document.querySelectorAll('.a2'),
    b2 = document.querySelectorAll('.b2'),
    c2 = document.querySelectorAll('.c2'),
    d2 = document.querySelectorAll('.d2'),
    e2 = document.querySelectorAll('.e2'),
    answer2 = document.querySelectorAll('.for_textarea2'),
    text2 = document.querySelectorAll('.for_textarea2 textarea');




a.forEach((btn, index) => {
    btn.addEventListener('change', () => {

        answer[index].style.display = "none"
        text[index].innerHTML = "a"

    })
})
b.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text[index].innerHTML = "b"
        answer[index].style.display = "none"
    })
})
c.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text[index].innerHTML = "c"
        answer[index].style.display = "none"

    })
})
d.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text[index].innerHTML = "d"
        answer[index].style.display = "none"

    })
})
e.forEach((btn, index) => {
    console.log(index)
    btn.addEventListener('change', () => {
        text[index].innerHTML = "";
        answer[index].style.display = "initial"


    })
})


a2.forEach((btn, index) => {
    btn.addEventListener('change', () => {

        answer2[index].style.display = "none"
        text2[index].innerHTML = "a"

    })
})
b2.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text2[index].innerHTML = "b"
        answer2[index].style.display = "none"
    })
})
c2.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text2[index].innerHTML = "c"
        answer2[index].style.display = "none"

    })
})
d2.forEach((btn, index) => {
    btn.addEventListener('change', () => {
        text2[index].innerHTML = "d"
        answer2[index].style.display = "none"

    })
})
e2.forEach((btn, index) => {
    console.log(index)
    btn.addEventListener('change', () => {
        text2[index].innerHTML = "";
        answer2[index].style.display = "initial"


    })
})


let left = document.querySelector('.left'),
    right = document.querySelector('.right'),
    survey__basic_box = document.querySelectorAll('.survey__basic_box');
survey__basic_box[0].classList.add('survey__basic_box_active')
right.addEventListener('click', () => {
    let survey__basic_box_active = document.querySelector('.survey__basic_box_active');
    survey__basic_box_active.classList.remove('survey__basic_box_active')
    if (survey__basic_box_active.nextElementSibling) {
        survey__basic_box_active.nextElementSibling.classList.add('survey__basic_box_active');
    } else {
        survey__basic_box[0].classList.add('survey__basic_box_active')
    }
})
left.addEventListener('click', () => {
    let survey__basic_box_active = document.querySelector('.survey__basic_box_active');
    survey__basic_box_active.classList.remove('survey__basic_box_active')
    if (survey__basic_box_active.previousElementSibling && survey__basic_box_active.previousElementSibling !== left &&
        survey__basic_box_active.previousElementSibling !== right) {
        survey__basic_box_active.previousElementSibling.classList.add('survey__basic_box_active');
    } else {
        survey__basic_box[survey__basic_box.length - 1].classList.add('survey__basic_box_active')
    }
})