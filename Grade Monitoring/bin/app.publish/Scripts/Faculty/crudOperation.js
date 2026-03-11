$('#yearBlockSave').click(() => {
    document.getElementById('loadingSave').style.display = 'block';

    let block = $('#studBlock').val();
    let year = $('#year_lvl').val();
    let url = '/Faculty/InsertYearBlock';

    $.ajax({
        url: url,
        type: 'post',
        data: { stud_block_name: block, year_lvl: year },
        success: (e) => {
            if (e.result) {
                clickBlock();
                document.getElementById('loadingSave').style.display = 'none';
                document.getElementById('saveSuccess').style.display = 'block';
            }
            else {
                alert('Error');
            }
        }
    })
})

function clickBlock() {
    let url = '/Faculty/ListOfBlocks';

    $.ajax({
        url: url,
        type: 'get',
        success: (e) => {
            $('#blockList').empty();
            $('#blockList').append(`<h6 class="collapse-header">Block/Section</h6>`);
            $('#blockList1').empty();
            $('#blockList1').append(`<h6 class="collapse-header">Block/Section</h6>`);
            $('#blockList2').empty();
            $('#blockList2').append(`<h6 class="collapse-header">Block/Section</h6>`);
            $('#blockList3').empty();
            $('#blockList3').append(`<h6 class="collapse-header">Block/Section</h6>`);
            e.list.map((item) => {
                if (item.year_lvl === 'First Year') {
                    $('#blockList').append(`<a class="collapse-item" href="#" onclick="yrBlock('First Year', '${item.stud_block_name}')">${item.stud_block_name}</a>`);
                }
                if (item.year_lvl === 'Second Year') {
                    $('#blockList1').append(`<a class="collapse-item" href="#" onclick="yrBlock('Second Year', '${item.stud_block_name}')">${item.stud_block_name}</a>`);
                }
                if (item.year_lvl === 'Third Year') {
                    $('#blockList2').append(`<a class="collapse-item" href="#" onclick="yrBlock('Third Year', '${item.stud_block_name}')">${item.stud_block_name}</a>`);
                }
                if (item.year_lvl === 'Fourth Year') {
                    $('#blockList3').append(`<a class="collapse-item" href="#" onclick="yrBlock('Fourth Year', '${item.stud_block_name}')">${item.stud_block_name}</a>`);
                }
            })
            //if (data === 'First Year') {
            //    $('#blockList').html(`<h6 class="collapse-header">Block/Section</h6>`);
            //    e.list.map((item)=>($('#blockList').html(`<a class="collapse-item" href="#">Block-A</a> <a class="collapse-item" href="#">Block-B</a> <a class="collapse-item" href="#">Block-C</a> <a class="collapse-item" href="#">Block-D</a>`)))
            //}
            //if (data === 'secondYear') {
            //    $('#blockList1').html(`<h6 class="collapse-header">Block/Section</h6> <a class="collapse-item" href="#">Block-A</a> <a class="collapse-item" href="#">Block-B</a> <a class="collapse-item" href="#">Block-C</a>`);
            //}
            //if (data === '') {
            //    $('#blockList').html(`<h6 class="collapse-header">Block/Section</h6> <a class="collapse-item" href="#" style="color:red;">No Section/Block Yet!</a>`)
            //}
        }
    })
}

clickBlock();

let yrBlock = (yr_lvl, block)=>{
    studentList(yr_lvl, block);
}