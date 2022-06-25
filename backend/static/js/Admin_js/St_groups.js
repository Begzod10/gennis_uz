window.addEventListener('DOMContentLoaded', () => {


    const students_money = document.querySelectorAll('.list_groups_item_di_cost_number')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }

    students_money.forEach(student_money => {
        student_money.innerHTML = numberWithCommas(student_money.innerHTML)
    })
    // Inputs
    const passport_id = document.querySelector('.passport_id'),
        passport_number = document.querySelector('.passport_number');

    function allLetter(inputtxt) {
        let letters = /^[A-Za-z]+$/;
        if (inputtxt.value.match(letters)) {
            return true;
        } else {
            inputtxt.value = "";
        }
    }
    if (passport_id) {
        passport_id.addEventListener('keyup', () => {
            allLetter(passport_id)
        })
    }
    function allnumeric(inputtxt) {
        let numbers = /^[0-9]+$/;
        if (inputtxt.value.match(numbers)) {
            return true;
        } else {
            inputtxt.value = "";
            return false;
        }
    }
    if (passport_number) {
        passport_number.addEventListener('keyup', () => {
            allnumeric(passport_number)
        })
    }
})