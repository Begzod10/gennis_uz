
window.addEventListener('DOMContentLoaded', () => {
    const tables = document.querySelectorAll('.list_att_tables_item'),
        date_selector = document.querySelector('#dates_selector')


    function removeActive(array,className) {
        array.forEach(item => {
            if (item.classList.contains(className)) {
                item.classList.remove(className)
            }
        })
    }
    removeActive(tables,'list_att_tables_item_active')

    tables.forEach(item => {
        if (item.getAttribute('data-time') === date_selector.value ) {
            item.classList.add('list_att_tables_item_active')
        }
    })
    date_selector.addEventListener('change',()=> {
        removeActive(tables,'list_att_tables_item_active')

        tables.forEach(item => {
            if (item.getAttribute('data-time') === date_selector.value ) {
                item.classList.add('list_att_tables_item_active')
            }
        })
    })
})