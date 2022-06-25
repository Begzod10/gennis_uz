

window.addEventListener('DOMContentLoaded', () => {

    $('[data-btn=create-gr]').on('click', function () {
        $('.overlay_create_gr, [data-modal=create-gr]').fadeIn();
    });
    $('[data-btn=add-gr]').on('click', function () {
        $('.overlay_add_gr, [data-modal=add-gr]').fadeIn();
    });

    $('.modal_create_gr_close').on('click', function () {
        $('.overlay_create_gr, [data-modal=create-gr]').fadeOut();
    });
    $('.modal_add_gr_close').on('click', function () {
        $('.overlay_add_gr, [data-modal=add-gr]').fadeOut();
    });





    const overlay_create_gr = document.querySelector('.overlay_create_gr'),
        overlay_add_gr = document.querySelector('.overlay_add_gr');




    overlay_create_gr.addEventListener('click', (e) => {
        if (e.target === overlay_create_gr) {
            overlay_create_gr.style.display = 'none'
        }
    })
    overlay_add_gr.addEventListener('click', (e) => {
        if (e.target === overlay_add_gr) {
            overlay_add_gr.style.display = 'none'
        }
    })

})