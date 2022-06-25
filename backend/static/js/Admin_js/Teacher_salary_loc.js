window.addEventListener('DOMContentLoaded', () => {

    $('[data-img=open-modal-payment]').on('click', function () {
        $('.overlay_change, .overlay_change_payment_modal').fadeIn();
    });

    $('.overlay_change_payment_modal__close').on('click', function () {
        $('.overlay_change, .overlay_change_payment_modal').fadeOut();
    });

    const overlay_change = document.querySelector('.overlay_change'),
        overlay_payment = document.querySelector('.overlay_change_payment_modal');

    if (overlay_change) {
        overlay_change.addEventListener('click', (e) => {
            if (e.target === overlay_change) {
                overlay_change.style.display = 'none'
                overlay_payment.style.display = 'none'
            }
        })
    }


    const select_change_payment = document.querySelector('.overlay_change_payment_modal_select'),
        salary_form = document.querySelector('.salary-form'),
        debt_form = document.querySelector('.debt-form');


    // Type Payment

    const cash = document.getElementById('Cash'),
        bank = document.getElementById('Bank'),
        type_payment = document.querySelector('.type_payment');
    if (cash && bank) {
        cash.addEventListener('click', () => {
            type_payment.value = "cash";
            console.log(type_payment.value)
        })
        bank.addEventListener('click', () => {
            type_payment.value = "bank";
            console.log(type_payment.value)
        })
        console.log(type_payment.value)
    }
    if (document.querySelector('.cash')) {
        document.querySelector('.cash').addEventListener('click', () => {

            document.querySelector('.payment_type').value = "cash";
        })
    }
    if (document.querySelector('.bank')) {
        document.querySelector('.bank').addEventListener('click', () => {
            document.querySelector('.payment_type').value = "bank";
        })
    }
    let btnEdit = document.querySelectorAll('.delete_payment');
    if (btnEdit) {
        btnEdit.forEach(button => {
            button.addEventListener('click', (event) => {

                let ans = confirm('Вы действительно хотите удалить?');
                if (!ans) {
                    event.preventDefault()
                    window.location.reload()
                }
            })
        })
    }
})