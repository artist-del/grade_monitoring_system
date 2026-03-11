let showGrade = () => {

    let table = $('#studentGradeDataTable').DataTable({
        searching: false,
        lengthChange: false
    });
    table.draw().clear();

    $.ajax({
        url: '/Grade/StudentGrade',
        type: 'post',
        dataType: 'json',
        success: (e) => {
            if (e.result == false) {
                window.location.href = "/Student/Login";
            } else {
                e.query.map((item) => {
                    table.row.add([
                        item.subjectCode,
                        item.subjectName,
                        item.firstSem,
                        item.secondSem,
                        item.finalResult!=null?item.finalResult: 0,
                        item.status
                    ]).draw();
                })
            }
        }
    })
}

showGrade();

//formatDate
function formatDateToDDMMYYYY(date) {

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

//function for date
function showDate() {
    const currentDate = new Date();
    const formattedDate = formatDateToDDMMYYYY(currentDate);
    const date = formattedDate;

    $('#showDate').html(`Date: ${date}`);
}

showDate();

//show student subject enrolled
let showStudentSubject = () => {

    let table = $('#studentSubjectDataTable').DataTable({
        searching: false,
        lengthChange: false
    });

    table.draw().clear();

    $.ajax({
        url: '/Grade/StudentSubject',
        type: 'post',
        dataType: 'json',
        success: (e) => {
            if (e.result == false) {
                window.location.href = "/Student/Login";
            } else {
                e.list.map((item) => {
                    table.row.add([
                        item.subjectCode,
                        item.subjectName,
                        item.subjectUnit,
                        item.subjectYear,
                        item.subjectSem
                    ]).draw();
                })
            }
        }
    })
}
showStudentSubject();

$('#gradePrint').click(() => {
    const printWindow = window.open('', '', 'width=600');
    const tableToPrint = $('#studentGradeDataTable').clone();

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

$('#subjectPrint').click(() => {
    const printWindow = window.open('', '', 'width=600');
    const tableToPrint = $('#studentSubjectDataTable').clone();

    tableToPrint.find('th, td').css('text-align', 'center');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head<body>');
    printWindow.document.write('<h5 style="background-color: #090b68; padding: 5px; color: white; text-align: center;"><b>Student Subject Information</b></h5>');
    printWindow.document.write(tableToPrint.prop('outerHTML'));
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();
    printWindow.close();
})