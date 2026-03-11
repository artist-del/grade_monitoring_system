$('#btnLogin').click((e) => {
    e.preventDefault();
    
    let user = $('#fUser').val();
    let pass = $('#fPass').val();

    if (user === '') {
        $('#fUser').focus();;
    }
    else if (pass === '') {
        $('#fPass').focus();
    }
    else {
        document.getElementById('errorLabel').style.display = "none";
        document.getElementById('loginLoading').style.display = 'block';

        if ($('#adminLoginCheckbox').is(':checked')) {
            
            $.ajax({
                url: '/Admin/Login',
                type: 'post',
                data: {admin_username: user, admin_password: pass},
                success: (e) => {
                    if (e.result) {
                        window.location.href = '/Faculty/Index';
                    }
                    else {
                        console.log('Something Wrong');
                        document.getElementById('loginLoading').style.display = 'none';
                        document.getElementById('errorLabel').style.display = "block";
                    }
                }
            })
        }
        else {
            let data = $('#formLogin').serialize();
            let url = '/Faculty/Login';

            $.ajax({
                type: 'post',
                url: url,
                data: data,
                success: (e) => {
                    if (e.result) {
                        window.location.href = '/Faculty/Index';
                    }
                    else {
                        console.log('Something Wrong');
                        document.getElementById('loginLoading').style.display = 'none';
                        document.getElementById('errorLabel').style.display = "block";
                    }
                }
            })
        }
    }
})