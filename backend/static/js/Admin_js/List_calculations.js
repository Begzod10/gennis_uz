window.addEventListener('DOMContentLoaded', () => {

    const lists = document.querySelectorAll('.lists__box')

    lists.forEach(item => {
        item.addEventListener("click", () => {
            cleanActive(lists)
            item.classList.add('active_box')
            item.style.width = "180%"
        })
    })


    function cleanActive(arr) {
        arr.forEach(item => {
            item.classList.remove('active_box')
            item.style.width = "10%"
        })
    }


    function onClick(eventElement, item, work, active, activeElem) {
        const elem = document.querySelector(eventElement),
            parentElem = document.querySelector(item),
            btn = document.querySelector(activeElem)

        elem.addEventListener('click', () => {
            parentElem.style.display = work
            if (active) {
                if (activeElem) {
                    btn.classList.toggle(active)
                } else {
                    elem.classList.toggle(active)
                }
            }
        })
        if (elem.classList.contains('list_tools_filters_active')) {
            elem.removeEventListener('click', () => {
                parentElem.style.display = work
                if (active) {
                    if (activeElem) {
                        btn.classList.toggle(active)
                    } else {
                        elem.classList.toggle(active)
                    }
                }
            })
        }

    }
    document.querySelector('.cash').addEventListener('click',()=>{
        document.querySelector('.payment_type').value = "cash";
    })
    document.querySelector('.bank').addEventListener('click',()=>{
        document.querySelector('.payment_type').value = "real_bank";
    })
    document.querySelector('.click').addEventListener('click',()=>{
        document.querySelector('.payment_type').value = "bank";
    })
    $('.cash').click(function () {
        $('.collection_button').click()
    })
    $('.bank').click(function () {
        $('.collection_button').click()
    })
    $('.click').click(function () {
        $('.collection_button').click()
    })


})