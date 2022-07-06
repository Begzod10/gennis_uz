window.addEventListener('DOMContentLoaded', () => {
    let input_teacher = document.querySelector('#input-teacher'),
        input_staff = document.querySelector('#input-staff'),
        type_salary = document.querySelectorAll('.type_salary');


    $('.debt-yellow').click(function () {
        document.querySelectorAll('.debt_status').forEach(item => {
            item.value = "yellow";
        })
        type_salary.forEach(item => {
            item.value = "staff"
        })
        $('.form_button').click()
    })
    $('.debt-red').click(function () {
        document.querySelectorAll('.debt_status').forEach(item => {
            item.value = "red";
        })
        type_salary.forEach(item => {
            item.value = "teacher"
        })
        $('.form_button').click()
    })
    $('.debt-black').click(function () {
        document.querySelectorAll('.debt_status').forEach(item => {
            item.value = "black";
        })
        $('.form_button').click()
    })
    // debt-black
    let mousePosition;
    let offset = [0, 0];
    let grabbing = false
    let isDown = false

    const div = document.querySelector('.list_tools_filters-box');

    if (div) {
        div.addEventListener('mousedown', function (e) {
            isDown = true;
            grabbing = true
            offset = [
                div.offsetLeft - e.clientX,
                div.offsetTop - e.clientY
            ];
        }, true);
    }
    document.addEventListener('mouseup', function () {
        isDown = false;
        grabbing = false
    }, true);

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top = (mousePosition.y + offset[1]) + 'px';

        }
        if (grabbing) {
            div.style.cursor = 'grabbing'
        } else {
            div.style.cursor = 'grab'
        }
    }, true)


    function onClick(eventElement, item, work, active, activeElem) {
        const elem = document.querySelector(eventElement),
            parentElem = document.querySelector(item),
            btn = document.querySelector(activeElem)
        if (elem) {
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

    }

    onClick('.close_filters', '.list_tools_filters-box', 'none', 'list_tools_filters_active', '.list_tools_filters')
    onClick('.list_tools_filters', '.list_tools_filters-box', 'flex', 'list_tools_filters_active')
    onClick('.send-yes-no', '.confirm-overlay', 'block')
    onClick('.confirm-yes_no-noItem', '.confirm-overlay', 'none')


    const for_overhead = document.querySelector('.for_overhead'),
        for_capital = document.querySelector('.for_capital'),
        capital_ex = document.querySelector(".capital_ex"),
        overhead_ex = document.querySelector(".overhead_ex"),
        modal_form_close = document.querySelectorAll('.modal_form_close'),
        radio_cash = document.querySelectorAll('.radio_cash'),
        radio_bank = document.querySelectorAll('.radio_bank'),
        radio_click = document.querySelectorAll('.radio_click'),
        type_of_data = document.querySelectorAll('.type_of_data'),
        overlay_forms = document.querySelector('.overlay_forms'),
        overhead_button_cash = document.querySelector('.overhead_button_cash'),
        overhead_button_bank = document.querySelector('.overhead_button_bank'),
        capital_button_cash = document.querySelector('.capital_button_cash'),
        capital_button_bank = document.querySelector('.capital_button_bank');

    const payment_type = document.querySelectorAll('.payment_type'),
        button_cash = document.querySelectorAll('.button_cash'),

        month_list = document.querySelector('.month_list'),
        debt_month = document.querySelector('.debt_month');

    button_cash.forEach(button => {
        button.addEventListener('click', () => {
            payment_type.forEach(item => {

                item.value = button.dataset.name;
            })
        })
    })
    if (month_list && debt_month) {
        month_list.addEventListener('click', () => {
            debt_month.value = month_list.value;
        })
    }

    function removeAddClass(item, item2) {
        item.classList.add('list_tools_money_btn_active');
        item2.classList.remove('list_tools_money_btn_active')
    }

    if (overhead_button_bank && overhead_button_cash && capital_button_bank && capital_button_cash) {
        overhead_button_bank.addEventListener('click', () => {
            removeAddClass(overhead_button_bank, overhead_button_cash)
        })
        overhead_button_cash.addEventListener('click', () => {
            removeAddClass(overhead_button_cash, overhead_button_bank)
        })
        capital_button_bank.addEventListener('click', () => {
            removeAddClass(capital_button_bank, capital_button_cash)
        })
        capital_button_cash.addEventListener('click', () => {
            removeAddClass(capital_button_cash, capital_button_bank)
        })
    }

    if (for_capital) {
        for_capital.addEventListener('click', () => {
            capital_ex.style.display = "block";
            overhead_ex.style.display = "none";
            overlay_forms.style.display = "block";
        })
    }
    modal_form_close.forEach(item => {
        item.addEventListener('click', () => {
            capital_ex.style.display = "none";
            overhead_ex.style.display = "none";
            overlay_forms.style.display = "none";
        })
    })
    if (for_overhead) {
        for_overhead.addEventListener('click', () => {
            capital_ex.style.display = "none";
            overhead_ex.style.display = "block";
            overlay_forms.style.display = "block";
        })
    }
    let value = ""
    radio_cash.forEach(item => {
        item.addEventListener('click', () => {
            type_of_data.forEach(data => {
                data.value = "cash";
                value = data.value;
                console.log(data.value)
            })
        })
    })
    radio_bank.forEach(item => {
        item.addEventListener('click', () => {
            type_of_data.forEach(data => {
                data.value = "click";
                value = data.value;
                console.log(data.value)
            })
        })
    })
    radio_click.forEach(item => {
        item.addEventListener('click', () => {
            type_of_data.forEach(data => {
                data.value = "bank";
                value = data.value;
                console.log(data.value)
            })
        })
    })


    // Cash && Bank
    let overhead_table_bank = document.querySelector('.overhead_table_bank'),
        overhead_table_cash = document.querySelector('.overhead_table_cash'),
        capital_table_cash = document.querySelector('.capital_table_cash'),
        capital_table_bank = document.querySelector('.capital_table_bank');
    if (overhead_table_bank && overhead_table_cash && capital_table_cash && capital_table_bank && overhead_button_cash
        && overhead_button_bank && capital_button_cash && capital_button_bank) {
        overhead_table_cash.hidden = false;
        overhead_button_cash.addEventListener('click', () => {
            overhead_table_cash.hidden = false;
            overhead_table_bank.hidden = true;
        })
        overhead_button_bank.addEventListener('click', () => {
            overhead_table_bank.hidden = false;
            overhead_table_cash.hidden = true;
        })
        capital_table_cash.hidden = false;
        capital_button_cash.addEventListener('click', () => {
            capital_table_cash.hidden = false;
            capital_table_bank.hidden = true;
        })
        capital_button_bank.addEventListener('click', () => {
            capital_table_cash.hidden = true;
            capital_table_bank.hidden = false;
        })
    }

    // Overhead-Form
    function createElements(jsonResponse, table) {
        const tr = document.createElement('tr'),
            type_of_item_td = document.createElement('td'),
            sum_td = document.createElement('td'),
            date_td = document.createElement('td');
        type_of_item_td.innerHTML = jsonResponse['type_of_item'];
        sum_td.innerHTML = jsonResponse['sum'];
        date_td.innerHTML = jsonResponse['date'];
        tr.append(type_of_item_td);
        tr.append(sum_td);
        tr.append(date_td);
        table.append(tr)
        type_of_item.value = "";
        sum.value = "";
        radio_bank.forEach(item => {
            item.checked = false;
        })
        radio_cash.forEach(item => {
            item.checked = false;
        })
    }

    const overhead_month = document.querySelector('.overhead_month'),
        day = document.querySelector('.day'),
        type_of_item = document.querySelector('.Type_of_item'),
        sum = document.querySelector('.sum'),
        year = new Date().getFullYear(),
        location = document.querySelector('#location');
    document.querySelector('.overhead_form').onsubmit = function (e) {
        console.log(location.dataset.location)
        e.preventDefault();

        fetch('/add_overhead/' + location.dataset.location, {
            method: 'POST',
            body: JSON.stringify({
                'name_item': type_of_item.value,
                'sum': sum.value,
                'month': overhead_month.value,
                'type_of_data': value,
                'day': day.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                // if (overhead_table_bank.hidden === false) {
                //     createElements(jsonResponse, overhead_table_bank)
                // }else if (overhead_table_cash.hidden === false){
                //     createElements(jsonResponse, overhead_table_cash)
                // }
                window.location.reload(true);
            })
            .catch(function () {
                console.log('error')
            })
    }
    // Capital Form
    const capital_month = document.querySelector('.capital_month'),
        capital_day = document.querySelector('.capital_day'),
        type_capital = document.querySelector('.type_capital'),
        sum_capital = document.querySelector('.sum_capital');
    document.querySelector('.capital_form').onsubmit = function (e) {
        e.preventDefault();
        console.log(value)
        fetch('/capital/' + location.value, {
            method: 'POST',
            body: JSON.stringify({
                'type_of_item': type_capital.value,
                'sum': sum_capital.value,
                'date': `${year}-${capital_month.value}-${capital_day.value}`,
                'type_of_data': value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                //  if (capital_table_bank.hidden === false) {
                //     createElements(jsonResponse, capital_table_bank)
                // }else if (capital_button_cash.hidden === false){
                //     createElements(jsonResponse, capital_table_cash)
                // }
                window.location.reload(true);
            })
            .catch(function () {
                console.log('error')
            })
    }

    $('.button_cash').click(function () {
        $('.form_button').click()
    })
    $('.button_bank').click(function () {
        $('.form_button').click()
    })
    $('.button_real_bank').click(function () {
        $('.form_button').click()
    })
    $('.job_form').click(function () {
        $('.job_form').click(function () {
            $('.job_button').click()
        })
    })

    $('.teacher_form').click(function () {
        $('.teacher_form').click(function () {
            $('.teach_button').click()
        })
    })
    $(".month_form").click(function () {
        $(".month_form").click(function () {
            $('.month_button').click()
        });
    })
    $(".payment_data_form").click(function () {
        $(".payment_data_form").click(function () {
            $('.payment_data_button').click()
        });
    })


    let close_filters = document.querySelector('.close_filters'),
        closes = document.querySelectorAll('.closes'),
        list_tools_filters = document.querySelector('.list_tools_filters');

    close_filters.addEventListener('click', () => {
        closes.forEach(item => {
            item.value = "closed"
        })
    })
    list_tools_filters.addEventListener('click', () => {
        closes.forEach(item => {
            item.value = "opened"
        })
    })
    closes.forEach(item => {
        if (item.value === "closed") {
            document.querySelector('.list_tools_filters-box').style.display = "none";
        }
    })


    //    User password check
    let user_check = document.getElementById('user_check'),
        interval,
        checked_status;
    if (document.querySelector('.overlay_change_payment_modal__close')) {
        document.querySelector('.overlay_change_payment_modal__close').addEventListener('click', () => {
            checked_status = false;
            $('.overlay_change, .overlay_change_payment_modal').fadeOut();
            window.location.reload()
        })
    }
    $('[data-img=open-modal-payment]').on('click', function () {
        document.querySelector('.user').classList.add('user_active');
        $('.controller_password').click()
    });
    user_check.addEventListener('input', () => {
        interval = setInterval(checkUser, 2000)
    })

    function checkUser() {
        fetch('/check_password/' + user_check.dataset.user_id, {
            method: 'POST',
            body: JSON.stringify({
                'password': user_check.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                checked_status = jsonResponse['checked']
                if (checked_status) {
                    $('.overlay_change, .overlay_change_payment_modal').fadeIn();
                    document.querySelector('.user').classList.remove('user_active');
                } else {
                    $('.overlay_change, .overlay_change_payment_modal').fadeOut();
                    clearInterval(interval)
                    user_check.value = "";
                }
            })
    }

    $('.user_check button').on('click', function () {
        document.querySelector('.user').classList.remove('user_active');
    });

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

