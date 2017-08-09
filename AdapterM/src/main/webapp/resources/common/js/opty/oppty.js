/**
 * 
 * opptyDetail(oppty_no)			:: Detail 화면으로 이동.
 * opptySingleAddForm()				:: 단건등록 페이지 이동.
 * opptySchList()					:: 검색조건
 * 
 */

var ctx = $("#ctx").val();

function opptyDetail(oppty_no)
{
	location.href = ctx + "/oppty_detail?oppty_no=" + oppty_no;
}

// 단건 등록
function opptySingleAddForm()
{
	location.href = ctx + "/oppty_detail";
}

function opptySchList()
{
	var oppty_no_srch 	= $("#oppty_no_srch").val();
	var oppty_name_srch = $("#oppty_name_srch").val();
	var cust_name_srch  = $("#cust_name_srch").val();
	var emp_name_srch   = $("#emp_name_srch").val();
	var oppty_status_cd_srch = $("#oppty_status_cd_srch").val();
	var oppty_stage_cd_srch	 = $("#oppty_stage_cd_srch").val();
	var exp_close_dt_srch    = $("#exp_close_dt_srch").val();
	var dtype_cd_srch		 = $("#dtype_cd_srch").val();
	var purchase_type_srch   = $("#purchase_type_srch").val();
	
	var tbody = $('#oppty_list_tbody');
	var tbodyContent = "";
	
	$.ajax({
		url:ctx + '/oppty_sch',
		type: 'POST',
		data: {
			oppty_no_srch 		 : oppty_no_srch,
			oppty_name_srch  	 : oppty_name_srch,
			cust_name_srch		 : cust_name_srch,
			emp_name_srch		 : emp_name_srch,
			oppty_status_cd_srch : oppty_status_cd_srch,
			oppty_stage_cd_srch  : oppty_stage_cd_srch,
			exp_close_dt_srch 	 : exp_close_dt_srch,
			dtype_cd_srch		 : dtype_cd_srch,
			purchase_type_srch	 : purchase_type_srch,
		},
		dataType:'json',
		success: function(data){
			tbody.children().remove();
			
			var size = data.srcList.length;
			for(var i=0; i<size; i++)
			{
				tbodyContent = "<tr>" +
	 			"<td style='text-align: left;' >" +data.srcList[i].oppty_no +"</td>" +
	 			"<td style='text-align: left;'>" +
	 				"<a onclick=opptyDetail('"+data.srcList[i].oppty_no+"'); id='"+data.srcList[i].oppty_no+"'>" + data.srcList[i].oppty_name+"</a></td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_no +"</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_name +"</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].phone_no + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].emp_name + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].oppty_status_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].oppty_stage_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].exp_close_day + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].dtype_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].purchase_type + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].rec_per_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].create_date + "</td>" +
	 			"</tr>";

				tbody.append(tbodyContent);
			}
			 
			
		},
		error: function(){
			alert("error");
		}
	});
}