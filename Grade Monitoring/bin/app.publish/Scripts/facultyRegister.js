$('#btnRegister').click((e) => {
    e.preventDefault();
    
    let fName = $('#fName').val();
    let mName = $('#mName').val();
    let lName = $('#lName').val();
    let fUser = $('#fUser').val();
    let fPass = $('#fPass').val();

    if (fName === '') {
        $('#fName').focus();
    }
    else if (mName === '') {
        $('#mName').focus();
    }
    else if (lName === '') {
        $('#lName').focus();
    }
    else if (fUser === '') {
        $('#fUser').focus();
    }
    else if (fPass === '') {
        $('#fPass').focus();
    }
    else {
        showLoadingScreen();

        let data = $('#facultyRegisterForm').serialize();
        let url = '/Faculty/Register';

        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success: (e) => {
                if (e.result) {
                    console.log('success');
                    hideLoadingScreen();
                    document.getElementById('alertSuccess').style.display = 'block';
                }
                else {
                    console.log('something wrong!');
                    hideLoadingScreen();
                    document.getElementById('alertError').style.display = 'block';
                }
            }
        })
    }
})

//showLoading Screen
function showLoadingScreen() {
    $('#loadingScreen').modal({ backdrop: 'static', keyboard: false });
    $('#loadingScreen').modal('show');
}

//hideLoading Screen
function hideLoadingScreen() {
    $('#loadingScreen').modal('hide');
}