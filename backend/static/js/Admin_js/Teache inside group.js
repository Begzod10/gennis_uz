window.addEventListener('DOMContentLoaded',()=> {

    const students_money = document.querySelectorAll('.list_students_item_box_info_item_number')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
    })


})