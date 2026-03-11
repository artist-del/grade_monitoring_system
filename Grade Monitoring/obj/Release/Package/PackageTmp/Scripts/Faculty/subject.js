//function for subject list
let subjectList = (item) => {

    let url = '/Subject/SubjectList';
    let table = $('#dataTableSubject').DataTable();

    table.clear().draw();

    $.ajax({
        url: url,
        type: 'get',
        contentType: 'json',
        data: {perSem: item},
        success: (e) => {

            e.list.map((item) => {
                table.row.add([item.subject_code,
                               item.subject_name,
                               item.year_level,
                               item.subject_unit,
                               `<button class="btn btn-primary btn-sm" onclick="showModalForUpdate(${item.id}, '${item.subject_code}', '${item.subject_name}', '${item.year_level}', '${item.subject_unit}', '${item.per_sem}')">Edit</button> <button class="btn btn-danger btn-sm" onclick="modalForDelete(${item.id})">Delete</button>`
                ]).draw();
            });
        }
    })
}

subjectList('First Semister');

//showing add subject modal
$('#showModalForAddSubject').click(() => {

    $('#addSubject').modal({ backdrop: 'static', keyboard: false });
    formClear();
    document.getElementById('loadingSaveForSubject').style.display = 'none';
    document.getElementById('saveAlertForSubject').style.display = 'none';
    document.getElementById('errorAlertForSubject').style.display = 'none';
    $('#modalHeadingSubject').html(`<h4 class="text-center">Add New Subject</h4>`);

    $('#addSubject').modal('show');
})

//addSubject
$('#btnSubjectSave').click(() => {

    document.getElementById('errorAlertForSubject').style.display = 'none';
    document.getElementById('saveAlertForSubject').style.display = 'none';
    document.getElementById('loadingSaveForSubject').style.display = 'block';

    let data = $('#formForSubject').serialize();
    let url = '/Subject/InsertUpdateSubject';

    $.ajax({
        url,
        type: 'post',
        data,
        success: (e) => {
            if (e.result) {
                document.getElementById('loadingSaveForSubject').style.display = 'none';
                document.getElementById('saveAlertForSubject').style.display = 'block';
                
                subjectList($('#perSem').val());
                formClear();
            }
            else {
                document.getElementById('loadingSaveForSubject').style.display = 'none';
                document.getElementById('errorAlertForSubject').style.display = 'block';
            }
        }
    })
})

//show modal for update
let showModalForUpdate = (id, subjectCode, subjectName, yr_lvl, subjectUnit, perSem) => {
    
    document.getElementById('errorAlertForSubject').style.display = 'none';
    document.getElementById('saveAlertForSubject').style.display = 'none';
    $('#addSubject').modal({ backdrop: 'static', keyboard: false });
    $('#modalHeadingSubject').html(`<h4 class="text-center">Update Subject</h4>`);
    $('#subjectId').val(id);
    $('#subjectCode').val(subjectCode);
    $('#subjectName').val(subjectName);
    $('#year_level').val(yr_lvl);
    $('#subjectUnit').val(subjectUnit);
    $('#subjectSem').val(perSem);

    $('#addSubject').modal('show');
}

//dropdown for semister
$('#perSem').change(() => {
    let sem = $('#perSem').val();
    subjectList(sem);
    studentSubjectList(sem);
})

//show modal confirmation delete
let modalForDelete = (id) => {

    $('#confirmedModalSubject').modal({ backdrop: 'static', keyboard: false });

    document.getElementById('removeCheck').style.display = 'none';//success msg hide

    document.getElementById('removeMsg').style.display = "block";//title msg show
    document.getElementById('btnRemoveSubject').style.display = 'block';//show button yes

    document.getElementById('removeLoadingScreen').style.display = 'none';
    document.getElementById('removeCheckLogo').style.display = 'none';

    $('#removeSubjectId').val(id);
    $('#confirmedModalSubject').modal('show');
}

//button click form remove the subject
$('#btnRemoveSubject').click(() => {

    document.getElementById('removeMsg').style.display = "none";
    document.getElementById('removeLoadingScreen').style.display = 'block';
    let id = $('#removeSubjectId').val();
    let url = '/Subject/RemoveSubject';

    $.ajax({
        url,
        type: 'post',
        data: { id },
        success: (e) => {
            if (e.result) {
                document.getElementById('removeLoadingScreen').style.display = 'none';
                document.getElementById('removeCheckLogo').style.display = 'block';
                document.getElementById('btnRemoveSubject').style.display = 'none';
                document.getElementById('removeCheck').style.display = 'block';

                subjectList($('#perSem').val());
            }
        }
    })
})

//function for clear the form
let formClear = () => {
    $('#subjectId').val('');
    $('#subjectCode').val('');
    $('#subjectName').val('');
    $('#year_level').val('First Year');
    $('#subjectUnit').val('');
    $('#subjectSem').val('');
}

