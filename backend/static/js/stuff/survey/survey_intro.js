let list_subject = [],
    change_1 = '',
    change_2 = '',
    change_3 = '',
    change_4 = '',
    fan1 = document.querySelector('.fan1'),
    fan2 = document.querySelector('.fan2'),
    fan3 = document.querySelector('.fan3'),
    list_numbers = ["1234567890"],
    intro_input = document.querySelector('.intro_input');

function collectSubject(subject_1) {
    if (change_1 === "") {
        change_1 = subject_1
        // console.log(change_1, change_2)
    } else {
        change_2 = change_1
        change_1 = subject_1
        // console.log(change_1, change_2)
    }
    if (change_1 !== "" && change_2 !== "") {
        for (let value of fan2) {
            if (value.value !== change_2) {
                fan2.innerHTML += `<option value="${change_2}">${change_2}</option>`
                break
            }
        }
        for (let value of fan3) {
            if (value.value !== change_2) {
                fan3.innerHTML += `<option value="${change_2}">${change_2}</option>`
                break
            }
        }
        for (let value of fan2) {
            // console.log(`Ikkinchi fan ${value.value}`)
        }
        for (let value of fan3) {
            // console.log(`Uchinchi fan ${value.value}`)
        }
    }
}

function collectSubject2(subject_1) {
    if (change_3 === "") {
        change_3 = subject_1
        // console.log(change_3, change_4)
    } else {
        change_4 = change_3
        change_3 = subject_1
        // console.log(change_3, change_3)
    }
    if (change_3 !== "" && change_4 !== "") {
        for (let value of fan3) {
            if (value.value !== change_4) {
                fan3.innerHTML += `<option value="${change_4}">${change_4}</option>`
                break
            }
        }
        for (let value of fan3) {
            // console.log(value.value)
        }
    }
}

function removeSub(sub) {
    if (fan2) {
        for (let i = 0; i < fan2.options.length; i++) {
            if (fan2.options[i].value === sub) {
                let val;

                function compareSubjects() {
                    for (let value of list_subject) {
                        val = value
                    }
                    if (val !== sub) {
                        list_subject.push(fan2.options[i].value);
                    }
                }

                compareSubjects()
                collectSubject(sub)
                fan2.remove(i)

            }
        }
    }
    if (fan3) {
        for (let i = 0; i < fan3.options.length; i++) {
            if (fan3.options[i].value === sub) {
                fan3.remove(i)
            }
        }
    }
}

function removeSub2(sub) {
    if (fan3) {
        for (let i = 0; i < fan3.options.length; i++) {
            if (fan3.options[i].value === sub) {
                let val;

                function compareSubjects() {
                    for (let value of list_subject) {
                        val = value
                    }
                    if (val !== sub) {
                        list_subject.push(fan2.options[i].value);
                    }
                }

                compareSubjects()
                collectSubject2(sub)
                fan3.remove(i)
            }
        }
    }
}

fan1.addEventListener('change', () => {
    if (fan1.value !== "O'z faningizni tanlang") {
        removeSub(fan1.value)
    }
})
fan2.addEventListener('touchend', () => {
    if (fan1.value !== "Ikkinchi fan") {
        removeSub2(fan2.value)
    }
})

function allnumeric(inputtxt) {
    let numbers = /^[0-9]+$/;
    if (inputtxt.value.match(numbers)) {
        return true;
    } else {
        inputtxt.value = "";
        return false;
    }
}

intro_input.addEventListener('input', function () {

    allnumeric(intro_input)
})
