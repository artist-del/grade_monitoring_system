//faculty list
let showFacultyList = () => {

    let table = $('#facultyTable').DataTable();
    table.draw().clear();

    $.ajax({
        url: '/Admin/ShowFacultyList',
        type: 'post',
        success: (e) => {

            e.list.map((item) => {
                table.row.add([
                    item.first_name,
                    item.middle_name,
                    item.last_name,
                    item.faculty_username,
                    `<button class="btn btn-primary btn-sm" onclick="btnEditFaculty(${item.id}, '${item.first_name}', '${item.middle_name}', '${item.last_name}', '${item.faculty_username}')">Edit</button> <button class="btn btn-danger btn-sm" onclick="btnRemoveFaculty(${item.id})">Remove</button>`
                ]).draw();
            })
        }
    })
}

showFacultyList();

//showing modal
$('#showModalForAddFaculty').click(() => {
    
    hideAll();
    hideAllInput();
    document.getElementById('facultyPassword').style.display = "block";
    document.getElementById('labelForPassword').style.display = "block";
    document.getElementById('btnSaveFaculty').style.display = "block";
    document.getElementById('btnUpdateFaculty').style.display = "none";
    $('#modalHeadingContentFaculty').html(`<h4 class="text-center">Add New Faculty</h4>`);
    $('#addFaculty').modal('show');
})

//button Save
$('#btnSaveFaculty').click(() => {

    loadingAdd();
    let data = $('#formForAddFaculty').serialize();
    
    $.ajax({
        url: '/Admin/AddNewFaculty',
        type: 'post',
        data: data,
        success: (e) => {
            if (e.result) {
                success();
                hideAllInput();
                showFacultyList();
            } else {
                error();
            }
        }
    })
})

//getting data for update to form
let btnEditFaculty = (facultyId, facultyFName, facultyMName, facultyLName, facultyUsername) => {

    console.log(`FacultyId: ${facultyId} \nFaculty Fname: ${facultyFName} \nFaculty Mname: ${facultyMName} \nFaculty Lname: ${facultyLName} \nFaculty Username: ${facultyUsername}`);

    $('#facultyId').val(facultyId);
    $('#facultyFName').val(facultyFName);
    $('#facultyMName').val(facultyMName);
    $('#facultyLName').val(facultyLName);
    $('#facultyUsername').val(facultyUsername);

    hideAll();
    
    document.getElementById('btnUpdateFaculty').style.display = "block";
    $('#modalHeadingContentFaculty').html(`<h4 class="text-center">Update Faculty</h4>`);
    $('#addFaculty').modal('show');
}

//button update
$('#btnUpdateFaculty').click(() => {
    
    loadingAdd();
    let data = $('#formForAddFaculty').serialize();

    $.ajax({
        url: '/Admin/UpdateFacultyInfo',
        type: 'post',
        data: data,
        success: (e) => {
            if (e.result) {
                success();
                hideAllInput();
                showFacultyList();
            }
            else {
                error();
            }
        }
    })
})

//show remove modal
let btnRemoveFaculty = (id) => {
    $('#confirmedModalFaculty').modal('show');
    $('#removeFacultyId').val(id);

    document.getElementById('removeMsgFaculty').style.display = 'block';
    document.getElementById('removeLoadingScreenFaculty').style.display = 'none';
    document.getElementById('removeCheckFaculty').style.display = 'none';
    document.getElementById('removeCheckLogoFaculty').style.display = 'none';
    document.getElementById('btnRemoveFaculty').style.display = 'block';
}

//remove faculty
$('#btnRemoveFaculty').click(() => {
    let id = $('#removeFacultyId').val();
    let url = '/Admin/RemoveFacultyItem';

    document.getElementById('removeMsgFaculty').style.display = 'none';
    document.getElementById('removeLoadingScreenFaculty').style.display = 'block';

    $.ajax({
        url: url,
        type: 'post',
        data: { facultyId: id },
        success: (e) => {
            if (e.result) {
                document.getElementById('removeLoadingScreenFaculty').style.display = 'none';
                document.getElementById('removeCheckFaculty').style.display = 'block';
                document.getElementById('removeCheckLogoFaculty').style.display = 'block';
                document.getElementById('btnRemoveFaculty').style.display = 'none';
                showFacultyList();
            }
        }
    })
})


//show
let loadingAdd = () => {

    document.getElementById('saveAlertForFaculty').style.display = "none";
    document.getElementById('errorAlertForFaculty').style.display = "none";
    document.getElementById('loadingSaveForFaculty').style.display = "block";
}

let success = () => {

    document.getElementById('errorAlertForFaculty').style.display = "none";
    document.getElementById('loadingSaveForFaculty').style.display = "none";
    document.getElementById('saveAlertForFaculty').style.display = "block";
}

let error = () => {

    document.getElementById('saveAlertForFaculty').style.display = "none";
    document.getElementById('loadingSaveForFaculty').style.display = "none";
    document.getElementById('errorAlertForFaculty').style.display = "block";
}

let hideAll = () => {

    document.getElementById('saveAlertForFaculty').style.display = "none";
    document.getElementById('loadingSaveForFaculty').style.display = "none";
    document.getElementById('errorAlertForFaculty').style.display = "none";
    document.getElementById('facultyPassword').style.display = "none";
    document.getElementById('btnSaveFaculty').style.display = "none";
    document.getElementById('labelForPassword').style.display = "none";
}

let hideAllInput = () => {

    $('#facultyId').val('');
    $('#facultyFName').val('');
    $('#facultyMName').val('');
    $('#facultyLName').val('');
    $('#facultyUsername').val('');
}

