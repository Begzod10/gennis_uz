document.addEventListener('DOMContentLoaded',()=> {
    const uzb =document.querySelector('.uz'),
        a1 = document.getElementById('a1'),
        a2 = document.getElementById('a2'),
        a3 = document.getElementById('a3'),
        a4 = document.getElementById('a4'),
        a5 = document.getElementById('a5'),
        a6 = document.getElementById('a6'),
        a7 = document.getElementById('a7');

    const basic_title = document.querySelector('.promo_desc')

    uzb.addEventListener('click', ()=> {
        changeLanguage('uz')
    })
    const rus =document.querySelector('.rus')
    rus.addEventListener('click', ()=> {
        changeLanguage('rus')
    })

    function changeLanguage(lang) {
      location.hash = lang;
      location.reload();
    }
    function uzb_menu() {
        a1.innerHTML = ""
        a1.innerHTML = language.uz.menu.home
        a2.innerHTML = ""
        a2.innerHTML = language.uz.menu.gallery
        a3.innerHTML = ""
        a3.innerHTML = language.uz.menu.events
        a4.innerHTML = ""
        a4.innerHTML = language.uz.menu.comments
        a5.innerHTML = ""
        a5.innerHTML = language.uz.menu.price
        a6.innerHTML = ""
        a6.innerHTML = language.uz.menu.locations
        a7.innerHTML = ""
        a7.innerHTML = language.uz.menu.about


    }
    function rus_menu() {
        a1.innerHTML = ""
        a1.innerHTML = language.rus.menu.home
        a2.innerHTML = ""
        a2.innerHTML = language.rus.menu.gallery
        a3.innerHTML = ""
        a3.innerHTML = language.rus.menu.events
        a4.innerHTML = ""
        a4.innerHTML = language.rus.menu.comments
        a5.innerHTML = ""
        a5.innerHTML = language.rus.menu.price
        a6.innerHTML = ""
        a6.innerHTML = language.rus.menu.locations
        a7.innerHTML = ""
        a7.innerHTML = language.rus.menu.about
    }
    function eng_menu() {
        a1.innerHTML = ""
        a1.innerHTML = language.eng.menu.home
        a2.innerHTML = ""
        a2.innerHTML = language.eng.menu.gallery
        a3.innerHTML = ""
        a3.innerHTML = language.eng.menu.events
        a4.innerHTML = ""
        a4.innerHTML = language.eng.menu.comments
        a5.innerHTML = ""
        a5.innerHTML = language.eng.menu.price
        a6.innerHTML = ""
        a6.innerHTML = language.eng.menu.locations
        a7.innerHTML = ""
        a7.innerHTML = language.eng.menu.about

    }



    let language = {
        uz: {
            welcome:"Biz bilan birgalikda ta’lim oling va o’zingiz istagan yutuqlarga erishing\n" +
                "Biz bilan birgalikda ta’lim oling va o’zingiz istagan yutuqlarga erishing\n" +
                "Biz bilan birgalikda ta’lim oling va o’zingiz istagan yutuqlarga erishing\n" +
                "Biz bilan birgalikda ta’lim oling va o’zingiz istagan yutuqlarga erishing",
            menu: {
                home:'Bosh sahifa',
                gallery:'Galereya',
                events:'Yangiliklar',
                comments:'Izohlar',
                price:'Narxlar',
                locations:'Manzil',
                about:'Biz haqimizda'
            },

        },
        rus: {
            welcome: "¡Bienvenido al portal GeeksforGeeks! " +
            "¡Puedes elegir cualquier idioma usando " +
            "los botones de arriba!",

            menu: {
                home:'Главный',
                gallery:'Галерея',
                events:'Новости',
                comments:'Комментарии',
                price:'Цена',
                locations: 'Место расположения',
                about:'О нас'
            },

        },
        eng: {
            welcome: "GeeksforGeeks पोर्टल पर आपका स्वागत है! " +
            "आप ऊपर दिए गए बटन का उपयोग करके किसी भी " +
            "भाषा को चुन सकते हैं!",
            menu: {
                home:'Home',
                gallery:'Gallery',
                events:'Events',
                comments:'Comments',
                price:'Price',
                locations: 'Location',
                about:'About us'
            },
        }

    };

    if (window.location.hash) {

        if (window.location.hash === "#uz") {
            basic_title.textContent = language.uz.welcome;
            uzb_menu()
        }
        else if (window.location.hash === "#rus") {
            basic_title.textContent = language.rus.welcome;
            rus_menu()
        }
        else {
          basic_title.textContent = language.eng.welcome;
          eng_menu()
        }

    }

})