const checkbox = document.querySelectorAll('.checkbox'),
    reason_form = document.querySelector('.reason_form'),
    question_mark = document.querySelector('.question_mark'),
    ready_button = document.querySelector('.ready_button button'),
    send = document.querySelector('.send'),
    checks = document.querySelectorAll('.checks');

for (let d = 0; d < checkbox.length; d++) {
    const checked = checkbox[d]
    checked.onchange = function (event) {
        const check_id = event.target.dataset['id']
        const checking = event.target.checked
        fetch('/reason_day/' + check_id, {
            method: "POST",
            body: JSON.stringify({
                'completed': checking
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
}
question_mark.addEventListener('click',()=>{
    checks.forEach(check=>{
        if (check.style.display === "table-cell"){
            check.style.display = "none";
        }else {
            check.style.display = "table-cell";
        }
    })
})
checkbox.forEach(check=>{
    check.addEventListener('click',(event)=>{
        if (check.value ==="off"){
            check.value = "on"
            send.disabled = false
        }else {
            send.disabled = true
            check.value = "off"
            reason_form.style.display = "none";
        }
        console.log(check.value)
        ready_button.style.display = "block";
        window.scrollTo(0,document.body.scrollHeight);
        ready_button.addEventListener('click',()=>{
           if (check.value === "off"){
               reason_form.style.display = "none";
           }else if (check.value === "on"){
                reason_form.style.display = "flex";
           }
        })
    })
})