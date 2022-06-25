window.addEventListener('DOMContentLoaded',()=> {
    const students_money = document.querySelectorAll('.list_students_item_account_number')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(each_money => {
        each_money.innerHTML = numberWithCommas(each_money.innerHTML)
    })


})