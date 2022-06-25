const location_buttons = document.querySelectorAll('.button_subjects button');

location_buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            removeActiveClasses();
            button.classList.add('active');
        });
    });

    function removeActiveClasses() {
        location_buttons.forEach(button => {
            button.classList.remove('active');
        });
    }

// Student by locations
const xojakent_reason = document.querySelector('#xojakent_reason'),
    gazalkent_reason = document.querySelector('#gazalkent_reason'),
    chirchiq_reason = document.querySelector('#chirchiq_reason'),
    xojakent = document.querySelector('#xojakent'),
    gazalkent = document.querySelector('#gazalkent'),
    chirchiq = document.querySelector('#chirchiq');

    function show(item1,item2,item3,item4) {
        item1.addEventListener('click',()=>{
            item2.style.display = "block";
            item3.style.display = "none";
            item4.style.display = "none";
        })
    }
    show(xojakent_reason,xojakent,gazalkent,chirchiq);
    show(gazalkent_reason,gazalkent,xojakent,chirchiq);
    show(chirchiq_reason,chirchiq,xojakent,gazalkent);