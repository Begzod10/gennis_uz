let checked = true
$('.checkbox').click(function () {
    if (checked) {
        $('#password').attr('type', 'text')
        checked = !checked
        console.log(checked)
    }else {
        $('#password').attr('type', 'password')
        checked = !checked
        console.log(checked)
    }
})

