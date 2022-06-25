window.addEventListener('DOMContentLoaded',()=> {

    $(document).ready(function() {
      $('.Profile_agreement_image').magnificPopup({type:'image'});
    });

    $('.Profile_agreement_image').magnificPopup({
      type: 'image'
    });




    $('.Profile_info_settings').on('click', function () {
        $('.overlay, [data-modal=user-password]').fadeIn();
    });

    $('.modal-password__close_2').on('click', function () {
        $('.overlay, [data-modal=user-password]').fadeOut();
    });

    $('.Profile_info_img').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeIn();
        $('.modal_change_img_form_file').click()
    });

    $('.modal_change_img_select_yes').on('click', function () {
        $('.modal_change_img_select_yes_submit').click()
    });

    $('.modal_change_img_select_no').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeOut();
    });

    $('.modal_change_img_close').on('click', function () {
        $('.overlay, [data-modal=user_change_img]').fadeOut();
    });


    const overlay = document.querySelector('.overlay'),
        modal_password = document.querySelector('.modal-password'),
        modal_change_img = document.querySelector('.modal_change_img');

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (overlay) {
                if (e.target === overlay) {
                    overlay.style.display = 'none'
                    modal_password.style.display = 'none'
                    modal_change_img.style.display = 'none'
                }
            }
        })
    }

    const students_money = document.querySelectorAll('.Profile_info_account_number_span')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
    })

    const rating_all_line = document.querySelector('.Profile_raiting_all_circle_line'),
        rating_subjects_line = document.querySelectorAll('.Profile_raiting_subject_circle_line'),
        rating_subjects = document.querySelectorAll('.Profile_raiting_subject_circle_percent_number'),
        rating_all = document.querySelector('.Profile_raiting_all_circle_percent_number');


    function rating(){
        rating_subjects.forEach(subject => {
            let ratings = subject.innerHTML;
            if (ratings >= 90){
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.strokeDashoffset = 315-(315*ratings)/100
                        line.style.stroke = '#38fa38'
                    }
                })
            }
            else if (ratings >= 80){
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.strokeDashoffset = 315-(315*ratings)/100
                        line.style.stroke = '#efff00'
                    }

                })
            }
            else if (ratings >= 70){
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.strokeDashoffset = 315-(315*ratings)/100
                        line.style.stroke = '#ff6600'
                    }
                })
            }
            else if (ratings >= 60){
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.strokeDashoffset = 315-(315*ratings)/100
                        line.style.stroke = '#ff0000'
                    }
                })
            }
            else if (ratings <= 50 || ratings >= 50){
                rating_subjects_line.forEach(line => {
                    if (line.dataset['subject'] === subject.dataset['subject']) {
                        line.style.strokeDashoffset = 315-(315*ratings)/100
                        line.style.stroke = '#000000'
                    }
                })
            }
        })

        let all_rat = rating_all.innerHTML;

        if (all_rat >= 90){
            rating_all_line.style.strokeDashoffset = 315-(315*all_rat)/100
            rating_all_line.style.stroke = '#38fa38'
        }

        else if (all_rat >= 80){
            rating_all_line.style.strokeDashoffset = 315-(315*all_rat)/100
            rating_all_line.style.stroke = '#efff00'
        }

        else if (all_rat >= 70){
            rating_all_line.style.strokeDashoffset = 315-(315*all_rat)/100
            rating_all_line.style.stroke = '#ff6600'
        }

        else if (all_rat >= 60){
            rating_all_line.style.strokeDashoffset = 315-(315*all_rat)/100
            rating_all_line.style.stroke = '#ff0000'
        }

        else if (all_rat <= 50 || all_rat >= 50){
            rating_all_line.style.strokeDashoffset = 315-(315*all_rat)/100
            rating_all_line.style.stroke = '#000000'
        }
    }

    rating()

})