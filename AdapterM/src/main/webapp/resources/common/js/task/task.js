/**
* 함수 목록
* searchKeyword()                       : 상담 조회
* task_add_save() 						: 상담 단건 추가
* taskDetail(a)							: 상담 상세정보
* task_modify_save()					: 상담 수정 
* task_add_save()						: 상담 저장
* task_cancel()							: 상담 취소버튼(리스트로 이동)
* task_row_add(cust_no)					: 테이블 행 추가
* task_remove() 						: 테이블 행 삭제
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
					 "dtype_cd_srch" : dtype_cd_srch      };
 
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
		 	 				"<a href='#' onclick=leadDetail('"+data.srcList[i].task_no+"'); id='"+data.srcList[i].task_no+"'>" + data.srcList[i].subject+"</a></td>" +
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

//상담 추가
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

//취소
function task_cancel() {
	location.href="/task";
}
