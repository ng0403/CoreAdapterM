/**
 * 
 * opptyDetail(oppty_no)			:: Detail 화면으로 이동.
 * opptySingleAddForm()				:: 단건등록 페이지 이동.
 * opptySchList()					:: 검색조건
 * 
 */

var ctx = $("#ctx").val();

// 검색 조건 초기화
function opptySchReset()
{
	$("#oppty_no_srch").val("");
	$("#oppty_name_srch").val("");
	$("#cust_name_srch").val("");
	$("#emp_name_srch").val("");
	$("#oppty_status_cd_srch option:eq(0)").prop("selected", "selected");
	$("#oppty_stage_cd_srch option:eq(0)").prop("selected", "selected");
	$("#exp_close_dt_srch").val("");
	$("#dtype_cd_srch option:eq(0)").prop("selected", "selected");
	$("#purchase_type_srch option:eq(0)").prop("selected", "selected");
}

function opptyDetail(oppty_no)
{
	location.href = ctx + "/oppty_detail?oppty_no=" + oppty_no;
}

// 단건 등록
function opptySingleAddForm()
{
	location.href = ctx + "/oppty_detail";
}

function opptySchList(opptyPageNum)
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
	
	console.log(opptyPageNum);
	console.log(exp_close_dt_srch);
	
	$.ajax({
		url:ctx + '/oppty_sch',
		type: 'POST',
		data: {
			opptyPageNum		 : opptyPageNum,
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
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_phone + "</td>" +
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
			
			// 페이징
			$(".pagingDiv").empty();
			var pageContent = "";

			console.log(data);
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='pageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.opptyPageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"opptySchList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"opptySchList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.opptyPageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"opptySchList("+(data.opptyPageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"opptySchList("+(data.opptyPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.opptyPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"opptySchList("+data.page.opptyPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"opptySchList("+(data.opptyPageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$(".pagingDiv").append(pageContent);
			
		},
		error: function(){
			alert("error");
		}
	});
}

//페이징 엔터키
function opptyPageNumInputEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		var pageNum = parseInt($("#pageInput").val());
		if ($("#pageInput").val() == '') {
			alert("페이지 번호를 입력하세요.")
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else if(pageNum > parseInt($("#endPageNum").val())) {
			alert("페이지 번호가 너무 큽니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else if (1 > pageNum) {
			alert("페이지 번호가 너무 작습니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else {
			cupnPaging(pageNum);
		}
	}
	event.stopPropagation();
}

//엑셀 Import 팝업	
function opptyExcelImportOpen() 
{
	var popWidth  = '520'; // 파업사이즈 너비
	var popHeight = '160'; // 팝업사이즈 높이
	var winHeight = document.body.clientHeight;	// 현재창의 높이
	var winWidth = document.body.clientWidth;	// 현재창의 너비
	var winX = window.screenLeft;	// 현재창의 x좌표
	var winY = window.screenTop;	// 현재창의 y좌표

	var popX = winX + (winWidth - popWidth)/2;
	var popY = winY + (winHeight - popHeight)/2;
	var popUrl = "opptyExcelImportTab";
	var popOption = "width=520, height=160, resize=no, scrollbars=no, status=no, location=no, directories=no; ,top=pop,left=popX";
	window.open(popUrl, "_blank","width="+popWidth+"px,height="+popHeight+"px,top="+popY+",left="+popX);
}

//엑셀파일 insert
function opptyExcelCheck()
{
    var excelFile = $("#excelFile").val();
    
    if (excelFile == "" || excelFile == null) 
    {
        alert("파일을 선택해주세요.");
        
        return false;
    } 
    else if (!opptyCheckFileType(excelFile)) 
    {
        alert("엑셀 파일만 업로드 가능합니다.");
        
        return false;
    }
    if (confirm("업로드 하시겠습니까?")) 
    {
    	$("#excelUploadForm").append(excelFile);
    	$("#excelUploadForm").submit();
	}
	
//	opener.parent.location.reload();
}

//엑셀 파일 추가 fucntion
function opptyCheckFileType(filePath) 
{
	var fileFormat = filePath.split(".");
	
	if (fileFormat.indexOf("xlsx") > -1) {
		return true;
	} 
	else {
		return false;
	}

}

//엑셀 출력 적용 함수
function download_list_Excel(formID, flg) {
	
	var t = flg;
	var ctx = $("#ctx").val();
	var form = $("#"+formID);
	var excel = $('<input type="hidden" value="true" name="excel">');
	var flg = $("<input type='hidden' value='"+ flg +"' name='flg'>");
	
	if(confirm("엑셀로 출력하시겠습니까? 대량의 경우 대기시간이 필요합니다.")) 
	{
		form.append(excel);
		form.append(flg);
		
		if(flg == 0) 
		{
			form.attr("action", "/toOpptyExcel");
			form.submit();
			
		} 
		else(flg == 1) 
		{
			form.attr("action", "/toOpptyExcel");
			form.submit();
//			form.attr("action", "/task_sch");
//			form.submit();
		}
	} 
	$("input[name=excel]").val("");
}


