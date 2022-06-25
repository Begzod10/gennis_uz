const close_flash = document.querySelector('.flash_close'),
        for_flash = document.querySelector('.flash');
if(close_flash) {
    close_flash.addEventListener('click', () => {
        for_flash.style.display = "none";
    });
}




// const close = document.querySelector('#close'),
//         flash = document.querySelector('.flash');
// if(close) {
//     close.addEventListener('click', () => {
//         flash.style.display = "none";
//     });
// }
