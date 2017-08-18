/**
* 함수 목록
* taskSchList(taskPageNum)              : 상담 조회
* task_add_save() 						: 상담 단건 추가
* taskDetail(a)							: 상담 상세정보
* enterSearch(event) 					: 엔터키 기능
* taskPageNumInputEnter(event)			: 페이징 엔터키 기능
* taskPaging(pageNum)					: 페이징 함수
* 
*/

var ctx = $("#ctx").val();
var flg = $("#flg").val();

//상담조회
function taskSchList(taskPageNum) {
	
	var task_no_srch 	= $("#task_no_srch").val();
	var subject_srch 	= $("#subject_srch").val();
	var cust_name_srch  = $("#cust_name_srch").val();
	var emp_name_srch   = $("#emp_name_srch").val();
	var next_day_srch   = $("#next_day_srch").val();
	var dtype_cd_srch	= $("#dtype_cd_srch").val();
	

	var tbody = $('#task_list_tbody');
	var tbodyContent = "";
	
	$.ajax({
		url:ctx + '/task_sch',
		type: 'POST',
		data: {
			taskPageNum		 : taskPageNum,
			task_no_srch 	 : task_no_srch,
			subject_srch  	 : subject_srch,
			cust_name_srch	 : cust_name_srch,
			emp_name_srch	 : emp_name_srch,
			next_day_srch 	 : next_day_srch,
			dtype_cd_srch    : dtype_cd_srch
			
		},
		dataType:'json',
		success: function(data){
			tbody.children().remove();
			
			var size = data.srcList.length;
			for(var i=0; i<size; i++)
			{
				tbodyContent = "<tr>" +
	 			"<td style='text-align: left;' >" +data.srcList[i].task_no +"</td>" +
	 			"<td style='text-align: left;'>" +
	 				"<a onclick=taskDetail('"+data.srcList[i].task_no+"'); id='"+data.srcList[i].task_no+"'>" + data.srcList[i].subject+"</a></td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_no +"</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_name +"</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].phone_no + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].emp_no + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].next_day + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].dtype_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].create_date + "</td>" +
	 			"</tr>"

				tbody.append(tbodyContent);
			}
			
			// 페이징
			$(".pagingDiv").empty();
			var pageContent = "";

			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='pageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.opptyPageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='taskPageNum' value='"+data.taskPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"taskSchList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"taskSchList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.taskPageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='taskPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"taskSchList("+(data.taskPageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='taskPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"taskSchList("+(data.taskPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.taskPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"taskSchList("+data.page.taskPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"taskSchList("+(data.taskPageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$(".pagingDiv").append(pageContent);
		},
		error: function(){
			alert("error");
		}
	});
}

//상담 단건 추가
function task_add(){
	 location.href="/task_detail?task_no="
}

//상담 상세정보
function taskDetail(a) {
  var no = a; 
  location.href="/task_detail?task_no=" + no; 
}

//엔터키 기능
function taskenterSearch(event) 
{
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		searchKeyword()(1, 1);
	}
	event.stopPropagation();
}

//페이징 엔터키
function taskPageNumInputEnter(event) {
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
			taskPaging(pageNum);
		}
	}
	event.stopPropagation();
}

//페이징 함수
function taskPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var taskListForm = $("#taskListPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    taskListForm.append(pageNumInput);
	    viewLoadingShow();
	    taskListForm.submit();
	});
}


//엑셀 출력 적용 함수
function download_list_Excel(formID) {
	
	var flg = $("#flg").val();
	var ctx = $("#ctx").val();
	var form = $("#"+formID);
	var excel = $('<input type="hidden" value="true" name="excel">');
	
	if(confirm("리스트를 출력하시겠습니까? 대량의 경우 대기시간이 필요합니다.")) 
	{
		
		form.append(excel);
		
		if(flg == 0) 
		{
			
			form.attr("action", "/task");
			form.submit();
			
		} 
		else(flg != 0) 
		{

			var $form = $("<form>");
			$form.attr({
				"action":"/task_sch",
				"method":"post",
				"id":"taskExcelForm"
			})

			var $task_no_srch = $("<input>");
			$task_no_srch.attr({
				"type":"hidden",
				"name":"task_no_srch",
				"value":task_no_srch
			})
		
			var $subject_srch = $("<input>");
			$subject_srch.attr({
				"type":"hidden",
				"name":"subject_srch",
				"value":subject_srch
			})
			
			var $cust_name_srch = $("<input>");
			$cust_name_srch.attr({
				"type":"hidden",
				"name":"cust_name_srch",
				"value":cust_name_srch
			})
			
			var $emp_name_srch = $("<input>");
			$emp_name_srch.attr({
				"type":"hidden",
				"name":"emp_name_srch",
				"value":emp_name_srch
			})
			
			var $next_day_srch = $("<input>");
			$next_day_srch.attr({
				"type":"hidden",
				"name":"next_day_srch",
				"value":next_day_srch
			})
			
			var $dtype_cd_srch = $("<input>");
			$dtype_cd_srch.attr({
				"type":"hidden",
				"name":"dtype_cd_srch",
				"value":dtype_cd_srch
			})
			
			var $taskPageNum = $("<input>");
			$taskPageNum.attr({
				"type":"hidden",
				"name":"taskPageNum",
				"value":taskPageNum
			})
			
			$form.append($task_no_srch).append($subject_srch).append($cust_name_srch);
			$form.append($emp_name_srch).append($next_day_srch).append($dtype_cd_srch);
			$form.append($taskPageNum);
			form.submit();
		
		}
	} 
	$("input[name=excel]").val("");
}






