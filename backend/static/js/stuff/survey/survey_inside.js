let answer_info = document.querySelectorAll('.answer_info'),
    survey__list_desc = document.querySelectorAll('.survey__list_desc'),
    survey__overlay = document.querySelector('.survey__overlay'),
    delete_survey = document.querySelector('.delete_survey'),
    survey__list_info = document.querySelectorAll('.survey__list_info'),
    survey__overlay_block = document.querySelector('.survey__overlay_block'),
    survey__overlay_desc = document.querySelector('.survey__overlay_desc');

answer_info.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        survey__overlay.classList.add('survey__overlay_active');
        survey__overlay_block.style.display = "flex";
        survey__overlay_desc.innerHTML = survey__list_desc[index].innerHTML;
        let survey_id = survey__list_info[index].dataset.id;
        let type = survey__list_info[index].dataset.type;
        console.log(survey_id, type)
        delete_survey.addEventListener('click', () => {
            delete_a.href = `/delete_answer_survey/${survey_id}/${type}`;
            delete_a.click()
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
// document.querySelector('.type_survey').addEventListener('change', () => {
//
//     document.querySelector('.survey_form').click()
// })

function allnumeric(inputtxt) {
    let numbers = /^[0-9]+$/;
    if (inputtxt.value.match(numbers)) {
        return true;
    } else {
        inputtxt.value = "";
        return false;
    }
}

document.querySelector('.age_from').addEventListener('input', function () {
    allnumeric(document.querySelector('.age_from'))
})
document.querySelector('.age_to').addEventListener('input', function () {
    allnumeric(document.querySelector('.age_to'))
})
//
// $('.type_survey').click(function () {
//     alert('yes')
//     $('.type_survey').click(function () {
//         alert('yes')
//         $('.survey_form').click()
//     })
// })

