window.addEventListener('DOMContentLoaded',()=> {
    const button_down = document.querySelectorAll('[data-modal]'),
        button_down2 = document.querySelectorAll('[data-modal2]'),
        user_location = document.querySelector('.user_location'),
        profile_modal = user_location.querySelector('.profile_modal'),
        nav = document.querySelector('nav'),
        main_profile = document.querySelector('.main_profile'),
        close_button = main_profile.querySelector('button'),
        for_img2 = document.querySelector('.for_img2'),
        image_upload = document.querySelector('.image_upload'),
        ready_photo = document.querySelector('.ready_photo input'),
        edit_button = document.querySelector('.edit_button'),
        cancel_edit = document.querySelector('.cancel_edit'),
        go_to_change = document.querySelector('.go_to_change'),
        upload_img = document.querySelector('.upload_img');

    //SHow User_Location
    function showUserLocation(){
        if (user_location.classList.contains('show')){
            user_location.classList.remove('show');
            user_location.classList.add('hide');
        }else {
            user_location.classList.add('show');
            user_location.classList.remove('hide');
        }
    }
    function closeUserLocation(){
        user_location.classList.remove('show');
        user_location.classList.add('hide');
    }

    button_down.forEach(button=>{
        button.addEventListener('click',showUserLocation);
    });

    nav.addEventListener('click',(event)=>{
        if (event.target === nav && event.target !== user_location){
           closeUserLocation();
        }
    });
    // Show Profile Modal
    function showProfileModal(){
        main_profile.classList.add('main_profile_show');
        main_profile.classList.remove('main_profile_hide');
        document.body.style.overflow = 'hidden';
    }
    function closeProfileModal(){
        main_profile.classList.remove('main_profile_show');
        main_profile.classList.add('main_profile_hide');
    }
    profile_modal.addEventListener('click',showProfileModal);
    close_button.addEventListener('click',closeProfileModal);
    main_profile.addEventListener('click',(event)=>{
        if (event.target === main_profile){
            closeProfileModal();
        }
    });
    //For mobile
     button_down2.forEach(button=>{
        button.addEventListener('click',showProfileModal);
    });
    //Show camera
    function showCamera(){
        image_upload.style.display = "flex";
    }
    function closeCamera(){
        image_upload.style.display = "none";
        if (upload_img.value !==""){
            ready_photo.style.display = "flex";
            console.log(upload_img.value)
        }else {
            ready_photo.style.display = "none";
            console.log(upload_img.value)
        }
    }
    for_img2.addEventListener('mousemove',showCamera);
    for_img2.addEventListener('mouseleave',closeCamera);

    //Edit Form
    edit_button.addEventListener('click',()=>{
        go_to_change.style.display = "flex";
        edit_button.style.display = "none";
        cancel_edit.style.display = "flex";
    })
    cancel_edit.addEventListener('click',()=>{
        go_to_change.style.display = "none";
        edit_button.style.display = "flex";
        cancel_edit.style.display = "none";
    })
    // Flash
    const close_flash = document.querySelector('.close_flash'),
        for_flash = document.querySelector('.for_flash');
    if(close_flash) {
        close_flash.addEventListener('click', () => {
            for_flash.style.display = "none";
        })
    }

    const menu = document.querySelector('nav'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})