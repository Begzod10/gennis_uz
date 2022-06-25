window.addEventListener('DOMContentLoaded',()=> {
    const header = document.querySelector('header'),
        name_surname = header.querySelector('.name_surname'),
        icon_button_down = header.querySelector('.button_down'),
        navigation_location = document.querySelector('.navigation'),
        all_a = navigation_location.querySelectorAll('a'),
        user_location = document.querySelector('.user_location'),
        profil_a = user_location.querySelector('a'),
        hour = new Date().getHours();

    function changeBackground() {
        if (hour > 22 && hour < 24) {
            console.log('hello')
            header.style.cssText = "background-color: black";
            name_surname.style.cssText = "color: white"
            icon_button_down.style.cssText = "color: white";
            navigation_location.style.cssText = "background-color: black";
            all_a.forEach(a=>{
                a.style.cssText = "color: white";
            })
            user_location.style.cssText = "background-color: black";
            profil_a.style.cssText = "color: white";

        }
    }
    // changeBackground()

})