window.addEventListener('DOMContentLoaded', () => {

    const changeButtons = document.querySelectorAll('.button-edit')

    changeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentElement = button.parentElement.parentElement

            const deleteBtn = parentElement.querySelector('.delete')

            const sumbitBtn = parentElement.querySelector('.form_submit')

            const imgContent = parentElement.querySelector('.img-content'),
                imgEdit = parentElement.querySelector('.img-edit')

            const title_text = parentElement.querySelector('.title_text'),
                title_change = parentElement.querySelector('.title_change')

            const desc_text = parentElement.querySelector('.desc_text'),
                desc_change = parentElement.querySelector('.desc_change')

            const editOpen = parentElement.querySelector(".edit-open"),
                editClose = parentElement.querySelector(".edit-close")

            if (button.classList.contains('edit-open')) {
                deleteBtn.style.display = 'block'
                sumbitBtn.style.display = 'block'

                imgContent.style.display = 'none'
                imgEdit.style.display = 'block'

                editOpen.style.display = 'none'
                editClose.style.display = 'block'

                title_text.style.display = 'none'
                title_change.style.display = 'block'

                desc_text.style.display = 'none'
                desc_change.style.display = "block"

            }

            if (button.classList.contains('edit-close')) {
                deleteBtn.style.display = 'none'
                sumbitBtn.style.display = 'none'

                imgContent.style.display = 'block'
                imgEdit.style.display = 'none'

                editOpen.style.display = 'block'
                editClose.style.display = 'none'

                title_text.style.display = 'block'
                title_change.style.display = 'none'

                desc_text.style.display = 'block'
                desc_change.style.display = "none"
            }
        })
    })


    const create_box__img = document.querySelector('.create-box__img'),
        create_box__file_input = document.querySelector('.create-box__file-input')



    $(".create-box__img").click(function () {
        $(".create-box__file-input").click()
    })


    $('.create-box__file-input').change(function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
           $('.create-box__img').css('background-image', 'url("' + reader.result + '")',);
           create_box__img.innerHTML = ''

        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
        }
    });

    $(".img-edit-button").click(function (e) {
        const parentElem = e.target.parentElement
        const input = parentElem.querySelector('.img-edit-input')
        $(input).click()
        changeBack(input,this)
    })

    function changeBack(input,elem){
        $(input).change(function () {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
               $(elem).css('background-image', 'url("' + reader.result + '")',);
               // create_box__img.innerHTML = ''

            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
        }
    });
    }









    // create_box__file_input.addEventListener('change',()=> {
    //     console.log(create_box__file_input.value)
    // })





})