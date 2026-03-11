const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


$('#openModal').click(() => {
    showRegisterModal();
})

$('#btnLogin').click((e) => {
    e.preventDefault();

    const data = $('#formLogin').serialize();
    const url = '/Student/Login';
    const username = $('#studUser').val();
    const password = $('#studPas').val();
    

    if (username === "") {
        console.log("username should not be empty");
        $('#studUser').focus();
    }
    else if (password === "") {
        console.log("password should not be empty");
        $('#studPas').focus();
    }
    else {
        showLoadingScreen();
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: (e) => {
                hideLoadingScreen();
                if (e.result) {
                    window.location.href = '/Student/Index';
                }
                else {
                    
                    $('#studUser').addClass('errorBorder');
                    $('#studUser').focus();
                    $('#studPas').val('');

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'Wrong Username or Password'
                    })

                }

                
            }
        })
    }
});

$('#btnRegister').click((e) => {
    e.preventDefault();
    hideRegisterModal();
    showLoadingScreen();

    let data = $('#formRegister').serialize();
    let url = '/Student/InsertStudentInfo';

    //console.log(data);
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: (e) => {
            hideLoadingScreen();
            if (e.result) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Successfully Registered!'
                })
                
            } else {
                hideLoadingScreen();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'error',
                    title: 'Username already exist!'
                })
            }
            
        }
    })
});

//show register modal
function showRegisterModal() {
    $('#showModal').modal('show');
}
//hide register modal
function hideRegisterModal() {
    $('#showModal').modal('hide');
}

//show loading
function showLoadingScreen() {
    $('#loadingScreen').modal({ backdrop: 'static', keyboard: false });
    $('#loadingScreen').modal('show');
}

//hideloading
function hideLoadingScreen() {
    $('#loadingScreen').modal('hide');
}