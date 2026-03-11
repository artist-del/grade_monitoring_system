let studentList = (yr_lvl, block) => {
    let url = '/Student/showStudentList';
    let table = $('#dataTable').DataTable();

    table.clear().draw();

    $.ajax({
        url: url,
        type: 'get',
        data: { yr_lvl, block },
        contentType: 'application/json',
        success: (e) => {

            e.list.map((item) => {

                table.row.add([item.last_name,
                               item.first_name,
                               item.middle_name,
                               item.year_lvl,
                               item.student_block,
                               `<button class="btn btn-primary btn-sm" onclick="getStudentId(${item.id},'${item.first_name}', '${item.middle_name}', '${item.last_name}', '${item.location}', '${item.email_address}', '${item.phone_number}', '${item.student_block}', '${item.stud_username}', '${item.year_lvl}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Student Info"><i class="fas fa-pen fa-sm"></i> Edit</button> <button class="btn btn-info btn-sm" onclick="informationForm(${item.id}, '${item.first_name}', '${item.middle_name}', '${item.last_name}', '${item.year_lvl}', '${item.student_block}')"><i class="fas fa-folder-open" data-bs-toggle="tooltip" data-bs-placement="top" title="View Student Info"></i> View Info</button> <button class="btn btn-danger btn-sm" onclick="removeStudent(${item.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove Student"><i class="fas fa-trash"></i> Remove</button> <button class="btn btn-warning btn-sm"  onclick="viewStudentGradeInfo(${item.id}, '${item.first_name}', '${item.middle_name}', '${item.last_name}', '${item.year_lvl}', '${item.student_block}')"><i class="fas fa-file"></i> Generate</button>`
                ]).draw();
            })
        }
    })
}

studentList("", "");

//check if valid email
function isValidEmail(email) {
    // Regular expression for a basic email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//showModal with add
$('#showModalForAddInfo').click(() => {

    $('#modalHeadingContent').html(`<h4 class="text-center">Add New Student</h4>`);

    $('#addStudent').modal('show');

    document.getElementById('saveAlertForStudent').style.display = 'none';
    document.getElementById('formPassword').style.display = 'block';
    document.getElementById('labelForPassword').style.display = 'block';

    document.getElementById('btnUpdateStudent').style.display = 'none';
    document.getElementById('btnSaveStudent').style.display = 'block';

    $('#firstName').val('');
    $('#middleName').val('');
    $('#lastName').val('');
    $('#formLocation').val('');
    $('#formEmailAdd').val('');
    $('#formNumber').val('');
    $('#formBlock').val('');
    $('#formUsername').val('');
    $('#yearLvl').val('');
    $('#formPassword').val('');
})

function btnSaveNewStudent() {

    let fName = $('#firstName').val();
    let mName = $('#middleName').val();
    let lName = $('#lastName').val();
    let location = $('#formLocation').val();
    let email = $('#formEmailAdd').val();
    let number = $('#formNumber').val();
    let block = $('#formBlock').val();
    let user = $('#formUsername').val();
    let pass = $('#formPassword').val();

    if (fName === '') {
        $('#firstName').focus();
    }
    else if (mName === '') {
        $('#middleName').focus();
    }
    else if (lName === '') {
        $('#lastName').focus();
    }
    else if (location === '') {
        $('#formLocation').focus();
    }
    else if (!isValidEmail(email)) {
        $('#formEmailAdd').focus();
    }
    else if (email === '') {
        $('#formEmailAdd').focus();
    }
    else if (number === '') {
        $('#formNumber').focus();
    }
    else if (block === '') {
        $('#formBlock').focus();
    }
    else if (user === '') {
        $('#formUsername').focus();
    }
    else if (pass === '') {
        $('#formPassword').focus();
    }
    else {
        document.getElementById('saveAlertForStudent').style.display = 'none';
        document.getElementById('loadingSaveForStudent').style.display = 'block';

        let data = $('#formForAddStudent').serialize();
        $.ajax({
            url: '/Student/InsertStudentInfo',
            type: 'post',
            data: data,
            success: (e) => {
                if (e.result) {
                    document.getElementById('loadingSaveForStudent').style.display = 'none';
                    document.getElementById('saveAlertForStudent').style.display = 'block';
                    studentList("", "");
                    $('#firstName').val('');
                    $('#middleName').val('');
                    $('#lastName').val('');
                    $('#formLocation').val('');
                    $('#formEmailAdd').val('');
                    $('#formNumber').val('');
                    $('#formBlock').val('');
                    $('#formUsername').val('');
                    $('#yearLvl').val('');
                    $('#formPassword').val('');
                }
                else {
                    document.getElementById('loadingSaveForStudent').style.display = 'none';
                    document.getElementById('errorAlertForStudent').style.display = 'block';
                    console.log('Username already exist');
                }
            }
        })
    }
}

//getStudentIdForUpdate
function getStudentId(id, firstName, middleName, lastName, location, emailAdd, phoneNum, studBlock, studUser, yrLvl) {

    $('#modalHeadingContent').html(`<h4 class="text-center">Update Student</h4>`);

    $('#addStudent').modal('show');

    document.getElementById('saveAlertForStudent').style.display = 'none';
    document.getElementById('formPassword').style.display = 'none';
    document.getElementById('labelForPassword').style.display = 'none';
    document.getElementById('btnUpdateStudent').style.display = 'block';
    document.getElementById('btnSaveStudent').style.display = 'none';

    $('#studId').val(id);
    $('#firstName').val(firstName);
    $('#middleName').val(middleName);
    $('#lastName').val(lastName);
    $('#formLocation').val(location);
    $('#formEmailAdd').val(emailAdd);
    $('#formNumber').val(phoneNum);
    $('#formBlock').val(studBlock);
    $('#formUsername').val(studUser);
    $('#yearLvl').val(yrLvl);
}

function btnUpdateNewStudent() {

    document.getElementById('loadingSaveForStudent').style.display = 'block';
    document.getElementById('saveAlertForStudent').style.display = 'none';

    let url = '/Student/UpdateStudentInfo';
    let data = $('#formForAddStudent').serialize();

    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: (e) => {
            if (e.result) {
                document.getElementById('loadingSaveForStudent').style.display = 'none';
                document.getElementById('saveAlertForStudent').style.display = 'block';
                studentList("", "");
                $('#firstName').val('');
                $('#middleName').val('');
                $('#lastName').val('');
                $('#formLocation').val('');
                $('#formEmailAdd').val('');
                $('#formNumber').val('');
                $('#formBlock').val('');
                $('#formUsername').val('');
                $('#yearLvl').val('');
            }
        }
    })
}



//remove Student
let removeStudent = (id) => {
    $('#confirmedModal').modal('show');
    $('#removeId').val(id);

    document.getElementById('removeMsg').style.display = 'block';
    document.getElementById('removeLoadingScreen').style.display = 'none';
    document.getElementById('removeCheck').style.display = 'none';
    document.getElementById('removeCheckLogo').style.display = 'none';
    document.getElementById('btnRemoveStudent').style.display = 'block';
}

//for student removal function
$('#btnRemoveStudent').click(() => {
    let id = $('#removeId').val();
    let url = '/Faculty/RemoveStudent';

    document.getElementById('removeMsg').style.display = 'none';
    document.getElementById('removeLoadingScreen').style.display = 'block';

    $.ajax({
        url: url,
        type: 'post',
        data: { id: id },
        success: (e) => {
            if (e.result) {
                document.getElementById('removeLoadingScreen').style.display = 'none';
                document.getElementById('removeCheck').style.display = 'block';
                document.getElementById('removeCheckLogo').style.display = 'block';
                document.getElementById('btnRemoveStudent').style.display = 'none';
                studentList("", "");
            }
        }
    })
})

var studentSubjectIdForSubject;
var studentFullName;
var studentSection;
var studentYearLevel;
//this function is for showing student information with there subject
function informationForm(id, fName, mName, lName, yr_lvl, block) {
    studentSubjectIdForSubject = id;
    studentFullName = `${fName} ${mName} ${lName}`;
    studentSection = `${block}`;
    studentYearLevel = `${yr_lvl}`;
    console.log(`Id: ${id} Full Name: ${fName} ${mName} ${lName} Year: ${yr_lvl} Block: ${block}`);

    $('#studentInformationForm').modal('show');
    $('#fullName').html(`Full Name: ${fName} ${mName} ${lName}`);
    $('#yrLvl').html(`Year: ${yr_lvl}`);
    $('#block').html(`${block}`);

    showStudentSubjectList(id);
}

//show student subject list
let showStudentSubjectList = (id) => {
    let dTable = $('#dataTableForStudentSubjectList').DataTable();
    dTable.clear().draw();

    $.ajax({
        url: '/Student/ShowStudentSubjectList',
        type: 'get',
        data: { studId: id },
        contentType: 'application/json',
        success: (response) => {

            console.log(response.list);
            response.list.map((item) => {
                dTable.row.add([item.subject_code,
                               item.subject_name,
                               item.year_level,
                               item.subject_unit,
                               `<button class="btn btn-info btn-sm" onclick="addGradeModal(${studentSubjectIdForSubject}, ${item.id}, '${item.subject_name}')">Add Grade</button> <button class="btn btn-danger btn-sm" onclick="RemoveEnrollSubject(${id},${item.id})">Remove</button>`
                ]).draw();
            })
        }
    });
}



//list of subject for modal student form
function studentSubjectList(item) {
    let url = '/Subject/SubjectList';
    let table = $('#dataTableStudentSubject').DataTable();

    table.clear().draw();

    $.ajax({
        url: url,
        type: 'get',
        contentType: 'json',
        data: { perSem: item },
        success: (e) => {

            e.list.map((item) => {
                table.row.add([item.subject_code,
                               item.subject_name,
                               item.year_level,
                               item.subject_unit,
                               `<button class="btn btn-info btn-sm" onclick="addSubjectToStudent(${item.id})">Enroll</button>`
                ]).draw();
            });
        }
    })
}

studentSubjectList("First Semister");

//enroll subject to student
function addSubjectToStudent(id) {
    //alert(`StudentId: ${studentSubjectIdForSubject} SubjectId: ${id}`);

    $.ajax({
        url: '/Student/AddSubjectToStudent',
        type: 'post',
        data: { student_id: studentSubjectIdForSubject, subject_id: id },
        success: (e) => {
            if (e.result) {
                alert("Enrolled Subject!");
                showStudentSubjectList(studentSubjectIdForSubject);
            }
            else {
                alert("Subject Already Enrolled!");
            }
        }
    })
}

let RemoveEnrollSubject = (studId, id) => {

    let url = '/Student/RemoveEnrollSubject';

    let _confirm = confirm("Do you want to remove this subject?");

    if (_confirm) {

        $.ajax({
            url,
            type: 'post',
            data: { studId: studId, subjId: id },
            success: (e) => {
                alert('Successfully Deleted!');
                showStudentSubjectList(studentSubjectIdForSubject);
            }
        })
    }


}

let addGradeModal = (studentId, subjectId, subjectName) => {

    $('#addGradeModal').modal({ backdrop: 'static', keyboard: false });
    $('#studentInformationForm').modal('hide');
    $('#addGradeModal').modal('show');

    $('#studentId').val(studentId);
    $('#subjectId').val(subjectId);
    $('#studentFullName').val(studentFullName);
    $('#subjectName').val(subjectName);

    getSubjectIdForUpdate(subjectId);

}

//btn click for back
$('#btnBack').click(() => {

    $('#addGradeModal').modal('hide');
    $('#studentInformationForm').modal('show');
})

//input for every change go to final result
$('#firstSem').change(function () {
    if ($('#firstSem').val() == '') {
        alert("Input Cannot be null put zero if grade not compute.");
        $('#firstSem').focus();
    } else {
        const mid = parseInt($('#firstSem').val());
        const final = parseInt($('#secondSem').val());

        const result = mid + final;
        const divideBy = result / 2;
        console.log(divideBy);
        $('#finalResult').val(divideBy);
    }
})

$('#secondSem').change(function () {
    if ($('#secondSem').val() == '') {
        alert("Input Cannot be null put zero if grade not compute.");
        $('#secondSem').focus();
    }
    else {
        const mid = parseInt($('#firstSem').val());
        const final = parseInt($('#secondSem').val());

        const result = mid + final;
        const divideBy = result / 2;
        console.log(divideBy);
        $('#finalResult').val(divideBy);
    }
})

$('#btnSaveGrade').click(() => {
    let fullName = $('#studentFullName').val();
    let subjectName = $('#subjectName').val();
    let studentId = $('#studentId').val();
    let subjectId = $('#subjectId').val();
    let firstSem = $('#firstSem').val();
    let secondSem = $('#secondSem').val();
    let finalResult = $('#finalResult').val();

    let convertedFirstSem = parseFloat(firstSem).toFixed(2);
    let convertedSecondSem = parseFloat(secondSem).toFixed(2);
    let convertedFinalResult = parseFloat(finalResult).toFixed(2);

    let msg = `Hello Message from RSU Cajidiocan\n Name: ${fullName} \n Subject: ${subjectName} \n First Semister Grade: ${firstSem} \n Second Semister Grade: ${secondSem}\n Final Result Grade: ${finalResult}`;

    console.log(msg);

    $.ajax({
        type: 'post',
        url: '/Subject/SendSms',
        data: { message: msg, studentId, subjectId, firstSem, secondSem, finalResult },
        success: (e) => {
            if (e.result) {
                alert("Successfully Save!");
                $('#firstSem').val('');
                $('#secondSem').val('');
                $('#finalResult').val('');
            }
            else {
                alert("Something Wrong");
            }
        }
    })
})

//get subject id for update
let getSubjectIdForUpdate = (id) => {

    //let studentId = studentSubjectIdForSubject;
    let url = '/Subject/SelectGradeById';

    $.ajax({
        url,
        type: 'get',
        data: { subjId: id },
        success: (e) => {
            $('#firstSem').val(e.result.first_sem);
            $('#secondSem').val(e.result.second_sem);
            $('#finalResult').val(e.result.final_result);
        }
    })
}

let viewStudentGradeInfo = (studentId, firstName, middleName, lastName, yr_lvl, studBlock) => {

    $('#viewStudentGradeInfo').modal({ backdrop: 'static', keyboard: false });
    $('#viewStudentGradeInfo').modal('show');

    let fullName = `${firstName} ${middleName} ${lastName}`;
    const currentDate = new Date();
    const formattedDate = formatDateToDDMMYYYY(currentDate);
    const date = formattedDate;

    $('#viewStudentFullName').html(`${fullName}`);
    $('#viewStudentYearLvl').html(`${yr_lvl}`);
    $('#viewStudentBlock').html(`${studBlock}`);
    $('#viewDate').html(`${date}`);
    console.log(`StudentId: ${studentId} FullName: ${fullName} Section: ${yr_lvl} Year Level: ${studBlock}`);

    showStudentSubjectWithGrade(studentId);
}

//date
function formatDateToDDMMYYYY(date) {

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

$('#viewBtnBack').click(() => {
    $('#viewStudentGradeInfo').modal('hide');
})

let dTable = $('#viewStudentGradeReport').DataTable({
    searching: false,
    lengthChange: false
});
let showStudentSubjectWithGrade = (studId) => {

    let url = '/Subject/ShowStudentGrade';
    
    dTable.clear().draw();

    $.ajax({
        type: 'get',
        url,
        data: {studId},
        success: (e) => {
            console.log(e.list);

            e.list.map((item) => {
                dTable.row.add([
                    item.subjectCode,
                    item.subjectName,
                    item.firstSem,
                    item.secondSem,
                    item.finalResult,
                    item.status
                ]).draw();
            })
        }
    })
}

//print table
$('#viewPrintButton').click(() => {
    const printWindow = window.open('', '', 'width=600');
    const tableToPrint = $('#viewStudentGradeReport').clone();

    tableToPrint.find('th, td').css('text-align', 'center');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head<body>');
    printWindow.document.write('<h5 style="background-color: #090b68; padding: 5px; color: white; text-align: center;"><b>Student Grade Information</b></h5>');
    printWindow.document.write(tableToPrint.prop('outerHTML'));
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();
    printWindow.close();
})