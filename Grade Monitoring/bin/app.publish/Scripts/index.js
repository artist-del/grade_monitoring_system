
$('#viewBtn').click(() => {
    showLoadingScreen();
})

$('#closeModal').click(() => {
    hideLoadingScreen();
})

function showLoadingScreen() {
    $('#myModal').modal({ backdrop: 'static', keyboard: false });
    $('#myModal').modal('show');
}

function hideLoadingScreen() {
    $('#myModal').modal('hide');
}

$('#sampleView').click(() => {
    window.location.href = '/Student/Subject';
})
