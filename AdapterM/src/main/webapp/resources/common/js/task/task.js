/**
* 함수 목록
* searchKeyword()                       : 상담 조회
* task_add_save() 						: 상담 단건 추가
* taskDetail(a)							: 상담 상세정보
* task_add_save()						: 상담 저장
* task_modify_save()					: 상담 수정 
* task_del_save()						: 상담 삭제
* task_cancel()							: 상담 조회버튼(리스트로 이동)
* enterSearch(event) 					: 엔터키 기능
* 
*/

var ctx = $("#ctx").val();

//상담조회
function searchKeyword() {
	
	var task_no_srch   = $("#task_no_srch").val();
	var subject_srch   = $("#subject_srch").val();
	var cust_name_srch = $("#cust_name_srch").val();
	var emp_no_srch    = $("#emp_no_srch").val();
	var next_day_srch  = $("#next_day_srch").val();
	var dtype_cd_srch  = $("#dtype_cd_srch").val();
	
	var taskData = { "task_no_srch"  : task_no_srch, 
					 "subject_srch"  : subject_srch,
					 "cust_name_srch": cust_name_srch, 
					 "emp_no_srch"   : emp_no_srch, 
					 "next_day_srch" : next_day_srch,
					 "dtype_cd_srch" : dtype_cd_srch      
					};
 
			var tbody = $('#task_list_tbody');
			var tbodyContent = "";
			
			$.ajax({
				url:'/task_sch',
				type: 'POST',
				data: taskData,
				dataType:'json',
				success: function(data){
					tbody.children().remove(); 
 					for(var i=0; i<data.srcList.length; i++){
 					tbodyContent += "<tr>" +
		 	 				"<td style='text-align: left;' >" +data.srcList[i].task_no +"</td>" +
		 	 				"<td style='text-align: left;'>" +
		 	 				"<a href='#' onclick=taskDetail('"+data.srcList[i].task_no+"'); id='"+data.srcList[i].task_no+"'>" + data.srcList[i].subject+"</a></td>" +
		 	 				"<td style='text-align: left;'>" + data.srcList[i].cust_no +"</td>" +
		 		 			"<td style='text-align: left;'>" + data.srcList[i].cust_name +"</td>" +
		 		 			"<td style='text-align: left;'>" + data.srcList[i].phone_no + "</td>" +
		 		 			"<td style='text-align: left;'>" + data.srcList[i].emp_no + "</td>" +
		 		 			"<td style='text-align: left;'>" + data.srcList[i].next_day + "</td>" +
		 		 			"<td style='text-align: left;'>" + data.srcList[i].dtype_cd + "</td>" +
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

//상담 단건 추가
function task_add(){
	 location.href="/task_detail?task_no="
}

//상담 상세정보
function taskDetail(a) {
  var no = a; 
  location.href="/task_detail?task_no=" + no; 
}

//상담 저장
function task_add_save() {
	
	 $(document).ready(function() {
		 	var task_no = $("#task_no").val();
			var ynChk = confirm("해당 상담을 저장하시겠습니까?");
			if(ynChk){
				$.ajax({
					type : 'POST',
					url : ctx + '/task_single_add',
					data : {
						task_no 		: task_no,
						subject 		: $("#subject").val(),
						cust_no			: $("#cust_no").val(),
						emp_no			: $("#emp_no").val(),
						next_day		: $("#next_day").val(),
						dtype_cd		: $("#dtype_cd").val(),
						lead_no 		: $("#lead_no ").val(),
						oppty_no		: $("#oppty_no").val(),
						location		: $("#location").val(),
						score_cd		: $("#score_cd").val(),
						remark_cn		: $("#remark_cn").val()
					},
					dataType : "json",
					success : function(data) {
						alert("상담이 저장되었습니다.");
						alert("상담 리스트로 이동합니다.");
						location.href="/task";
					}, error : function(request,status,error) {
					        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				});
			} else {
				alert("취소되었습니다.");
			}
		});
}

//상담 수정
function task_modify_save() {
	
	 $(document).ready(function() {
			var ynChk = confirm("해당 상담을 수정하시겠습니까?");
			if(ynChk){
				$.ajax({
					type : 'POST',
					url : ctx + '/task_edit',
					data : {
						task_no 		: $("#task_no").val(),
						subject 		: $("#subject").val(),
						cust_no			: $("#cust_no").val(),
						emp_no			: $("#emp_no").val(),
						next_day		: $("#next_day").val(),
						dtype_cd		: $("#dtype_cd").val(),
						lead_no 		: $("#lead_no ").val(),
						oppty_no		: $("#oppty_no").val(),
						location		: $("#location").val(),
						score_cd		: $("#score_cd").val(),
						remark_cn		: $("#remark_cn").val()
					},
					dataType : "json",
					success : function(data) {
						alert("상담이 수정되었습니다.");
						alert("상담 리스트로 이동합니다.");
						location.href="/task";
					}, error : function(request,status,error) {
					        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				});
			} else {
				alert("취소되었습니다.");
			}
		});
}

//삭제
function task_del_save() {
	$(document).ready(function() {
		var ynChk = confirm("해당 상담을 삭제하시겠습니까?");
		if(ynChk)
		{
			$.ajax({
				type : 'POST',
				url : ctx + '/task_delete',
				data : {
					task_no 		: $("#task_no").val()
				},
				dataType : "json",
				success : function(data) {
					alert("상담이 삭제되었습니다.");
					alert("상담 리스트로 이동합니다.");
					
					location.href = ctx + '/task';
				},
				error : function(request,status,error) {
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		}
		else
		{
			alert("취소되었습니다.");
		}
	});
}


//조회
function task_cancel() {
	location.href="/task";
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


function taskSchList(taskPageNum)
{
	var task_no_srch 	= $("#task_no_srch").val();
	var subject_srch 	= $("#subject_srch").val();
	var cust_name_srch  = $("#cust_name_srch").val();
	var emp_name_srch   = $("#emp_name_srch").val();
	var next_day_srch   = $("#next_day_srch").val();
	var dtype_cd_srch	= $("#dtype_cd_srch").val();
	
	var tbody = $('#task_list_tbody');
	var tbodyContent = "";
	
	console.log(taskPageNum);
	
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
	 			"<td style='text-align: left;'>" + data.srcList[i].cust_phone + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].emp_name + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].next_day + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].dtype_cd + "</td>" +
	 			"<td style='text-align: left;'>" + data.srcList[i].create_date + "</td>" +
	 			"</tr>"

				tbody.append(tbodyContent);
			}
			
			// 페이징
			$(".pagingDiv").empty();
			var pageContent = "";

			console.log(data);
			
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