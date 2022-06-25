var splide = new Splide('.splide', {
    direction: 'ttb',
    height: '10rem',
    wheel: true,
});


splide.mount();
var splide2 = new Splide('.splide2', {
    direction: 'ttb',
    height: '10rem',
    wheel: true,
});

splide2.mount();

let create_survey = document.getElementById('create_survey'),
    created_surveys = document.getElementById('created_surveys'),
    survey__form = document.querySelector('.survey__form_block'),
    survey__created = document.querySelector('.survey__created'),
    survey_info = document.querySelectorAll('.survey__created_info'),
    add_name = document.getElementById('add_name'),
    survey__form_name = document.querySelector('.survey__form_name'),
    survey__overlay = document.querySelector('.survey__overlay');

if (add_name) {
    add_name.addEventListener('click', () => {
        survey__form.classList.remove('survey_active');
        survey__created.classList.remove('survey_active');
        survey__created.classList.remove('animate__backInLeft');
        survey__form.classList.remove('animate__backInRight');
        survey__form_name.classList.add('survey_active');
        survey__form_name.classList.add('animate__fadeIn')
    })
}
// overlay
let survey__created_num = document.querySelectorAll('.survey__created_num'),
    survey__overlay_block = document.querySelector('.survey__overlay_block'),
    survey__created_description = document.querySelectorAll('.survey__created_description'),
    survey__overlay_textarea = document.querySelector('.survey__overlay textarea'),
    survey__overlay_form = document.querySelector('.survey__overlay form'),
    change_survey = document.querySelector('.change_survey'),
    delete_survey = document.querySelector('.delete_survey'),
    delete_a = document.getElementById('delete'),
    splide_form = document.querySelector('.splide'),
    survey__variant = document.querySelector('.splide2'),
    overflow_checkbox = document.getElementById('checkbox2'),
    a = document.querySelector('.a'),
    b = document.querySelector('.b'),
    c = document.querySelector('.c'),
    d = document.querySelector('.d'),
    survey__overlay_input = document.querySelector('.survey__overlay .survey_number');


survey_info.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        survey__overlay_textarea.innerHTML = survey__created_description[index].innerHTML;
        survey__overlay_input.value = survey__created_num[index].innerHTML;
        let survey_id = survey__created_num[index].dataset.id;
        if (survey__created_num[index].dataset.type === "Variants") {
            survey__variant.classList.add('splide_active');
            survey__overlay_block.classList.add('survey__overlay_block_active');
            fetch('/get_data_survey/' + survey_id, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonResponse) {
                    a.innerHTML = jsonResponse['a']
                    b.innerHTML = jsonResponse['b']
                    c.innerHTML = jsonResponse['c']
                    d.innerHTML = jsonResponse['d']
                    if (jsonResponse['user_own_answer'] === true) {
                        overflow_checkbox.checked = true
                    }else {
                        overflow_checkbox.checked = false
                    }
                    c.required = true
                    d.required = true
                })

        }
        survey__overlay.classList.add('survey__overlay_active');
        survey__overlay_block.style.display = "flex";

        change_survey.addEventListener('click', () => {
            survey__overlay_form.action = `/change_survey_info/${survey_id}`
            survey__overlay_form.submit()
        })
        delete_survey.addEventListener('click', () => {
            delete_a.href = `/delete_survey/${survey_id}`;
            delete_a.click()
            console.log(delete_a.baseURI)
        })
    })
})
survey__overlay.addEventListener('click', (event) => {
    if (event.target === survey__overlay) {
        survey__overlay.classList.remove('survey__overlay_active');
        survey__overlay_block.style.display = "none";
        if (survey__overlay_main) {
            survey__overlay_main.style.display = "none"
        }
    }
})

let change__survey_info = document.querySelector('.change__survey_info'),
    survey__overlay_main = document.querySelector('.survey__overlay_main');
if (change__survey_info) {
    change__survey_info.addEventListener('click', () => {
        survey__overlay.classList.add('survey__overlay_active');
        survey__overlay_main.style.display = "flex"

    })
}


let answer_info = document.querySelectorAll('.answer_info'),
    survey__list_desc = document.querySelectorAll('.survey__list_desc'),
    survey__overlay_desc = document.querySelector('.survey__overlay_desc');

answer_info.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        survey__overlay.classList.add('survey__overlay_active');
        survey__overlay_block.style.display = "flex";
        survey__overlay_desc.innerHTML = survey__list_desc[index].innerHTML;
        let survey_id = survey__list_desc[index].dataset.id;
        let type = survey__list_desc[index].dataset.type;
        console.log(survey_id, type)
        delete_survey.addEventListener('click', () => {
            delete_a.href = `/delete_answer_survey/${survey_id}/${type}`;
            delete_a.click()
        })

    })
})

let question_type = document.querySelector('.question_type'),
    survey__form_block = document.querySelector('.survey__form_block'),
    splide__list_textarea = document.querySelectorAll('.splide__list textarea');

question_type.addEventListener('click', () => {
    if (question_type.value === "Default") {
        splide_form.classList.remove('splide_active')
        survey__form_block.classList.remove('survey__form_block_active')
        splide__list_textarea.forEach(text => {
            text.required = false;
        })
    } else {
        splide_form.classList.add('splide_active')
        survey__form_block.classList.add('survey__form_block_active')
        splide__list_textarea[0].required = true;
        splide__list_textarea[1].required = true;
    }
})
let type_survey = document.querySelector('#type_survey'),
    survey__form_extra = document.querySelector('.survey__form_extra');


type_survey.addEventListener('change', () => {
    console.log(type_survey.value)
    if (type_survey.value === "open") {
        survey__form_name.classList.add('survey__form_name_active')
        survey__form_extra.style.display = "flex";
    } else {
        survey__form_name.classList.remove('survey__form_name_active')
        survey__form_extra.style.display = "none";
    }
})
if (document.querySelector('.type_survey')) {
    document.querySelector('.type_survey').addEventListener('change', () => {
        document.querySelector('.survey_form').click()
    })
}
// $('.type_survey').click(function () {
//     alert('yes')
//     $('.type_survey').click(function () {
//         alert('yes')
//         $('.survey_form').click()
//     })
// })



