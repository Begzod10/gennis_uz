const edit_button = document.querySelector('.edit_button'),
        cancel_edit = document.querySelector('.cancel_edit'),
        go_to_change = document.querySelector('.go_to_change'),
        image_upload = document.querySelector('.image_upload'),
        ready_photo = document.querySelector('.ready_photo input'),
        upload_img = document.querySelector('.upload_img');

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
image_upload.addEventListener('click',()=> {
   setTimeout(extra,3000);
   function extra() {
       ready_photo.style.display = "flex";
   }

})