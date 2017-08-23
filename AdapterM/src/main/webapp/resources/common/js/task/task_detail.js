/**
* wordch(thisword)						: 특수문자 입력방지 함수
* task_add_save()						: 상담 저장
* task_modify_btn() 					: 상담 편집버튼 클릭 시 disabled  해제
* task_modify_save()					: 상담 수정 
* task_del_save()						: 상담 삭제
* task_cancel()							: 상담 취소버튼(리스트로 이동)
*/

var ctx = $("#ctx").val();

// 특수문자 입력방지
function wordch(thisword)
{
	var flag = true;
	var specialChars="~`!@#$%^&*-=+\|[](){};:'<.,>/?_";

	wordadded = thisword;

	for(i=0; i<wordadded.length; i++) 
	{
		for (j = 0; j < specialChars.length; j++) 
		{         
			if (wordadded.charAt(i) == specialChars.charAt(j))
			{
				flag = false;
				break;
	         }
	     }
	  }
	return flag;
}

//상담 저장
function task_add_save() {
	
	$(document).ready(function() {
		
	 	var task_no   = $("#task_no").val();
	 	var subject   = $("#subject").val();
	 	var emp_no    = $("#emp_no").val();
	 	var cust_no   = $("#cust_no").val();
	 	var next_day  = $("#next_day").val();
	 	var dtype_cd  = $("#dtype_cd").val();
	 	var lead_no   = $("#lead_no").val();
	 	var score_cd  = $("#score_cd").val();
	 	var oppty_no  = $("#oppty_no").val();
	 	var location  = $("#location").val();
	 	var remark_cn = $("#remark_cn").val();
	 	
	 	if($("#subject").val() == 0 || $("#subject").val() == null || $("#subject").val() == "") {
			alert("제목을 입력하세요.");
			$("#subject").focus();
			return false;
		} else if ($("#cust_no").val() == 0 || $("#cust_no").val() == null || $("#cust_no").val() == "") {
			alert("고객을 입력하세요.");
			$("#cust_no").focus();
			return false;
		} else if ($("#emp_no").val() == 0 || $("#emp_no").val() == null || $("#emp_no").val() == "") {
			alert("담당자를 입력하세요.");
			$("#emp_no").focus();
			return false;
		} else if ($("#next_day").val() == 0 || $("#next_day").val() == null || $("#next_day").val() == "") {
			alert("다음일자를 입력하세요.");
			$("#next_day").focus();
			return false;
		} else if ($("#dtype_cd").val() == 0 || $("#dtype_cd").val() == null || $("#dtype_cd").val() == "") {
			alert("분류를 입력하세요.");
			$("#dtype_cd").focus();
			return false;
		} else if ($("#score_cd").val() == 0 || $("#score_cd").val() == null || $("#score_cd").val() == "") {
			alert("상대가치점수를 입력하세요.");
			$("#score_cd").focus();
			return false;
		} else if ($("#location").val() == 0 || $("#location").val() == null || $("#location").val() == "") {
			alert("진행장소를 입력하세요.");
			$("#location").focus();
			return false;
		} else if (wordch($("#location").val()) == false) {
			alert("진행장소에 특수문자는 입력 불가능합니다.");
			return false;
		} else if ($("#remark_cn").val() == 0 || $("#remark_cn").val() == null || $("#remark_cn").val() == "") {
			alert("특이사항을 입력하세요.");
			$("#remark_cn").focus();
			return false;
		} else if (wordch($("#remark_cn").val()) == false) {
			alert("특이사항에 특수문자는 입력 불가능합니다.");
			return false;
		}
	 	
		var ynChk = confirm("해당 상담을 저장하시겠습니까?");
		if(ynChk){
			$.ajax({
				type : 'POST',
				url : ctx + '/task_single_add',
				data : {
					task_no 	: task_no,
					subject 	: subject,
					cust_no		: cust_no,
					emp_no		: emp_no,
					next_day	: next_day,
					dtype_cd	: dtype_cd,
					lead_no 	: lead_no,
					oppty_no	: oppty_no,
					score_cd	: score_cd,
					location	: location,
					remark_cn	: remark_cn
				},
				dataType : "json",
				success : function(data) {
					
					alert("상담이 저장되었습니다.");
					alert("상담 리스트로 이동합니다.");
					//location.href= ctx + '/task';
					task_cancel();
					
				}, error : function(request,status,error) {
				        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	});
}

//상담 편집버튼 클릭 시 disabled  해제
function task_modify_btn() {
	
	if($("#task_single_modify").val() == "편집") {
		$("#task_single_modify").val("저장");
		$("#task_single_modify").removeClass("func_btn");
		$("#task_single_modify").addClass("tr_btn");
		
		$('#subject').removeAttr("disabled");
		$('#emp_no').removeAttr("disabled");
		$('#cust_no').removeAttr("disabled");
		$('#next_day').removeAttr("disabled");
		$('#dtype_cd').removeAttr("disabled");
		$('#lead_no').removeAttr("disabled");
		$('#score_cd').removeAttr("disabled");
		$('#oppty_no').removeAttr("disabled");
		$('#location').removeAttr("disabled");
		$('#remark_cn').removeAttr("disabled");
			
		return false;
		
	} if($("#task_single_modify").val() == "저장") {
		task_modify_save();
	}
}

//상담 수정 
function task_modify_save() {
	
	 $(document).ready(function() {
		 
	 	var task_no   = $("#task_no").val();
	 	var subject   = $("#subject").val();
	 	var emp_no    = $("#emp_no").val();
	 	var cust_no   = $("#cust_no").val();
	 	var next_day  = $("#next_day").val();
	 	var dtype_cd  = $("#dtype_cd").val();
	 	var lead_no   = $("#lead_no").val();
	 	var score_cd  = $("#score_cd").val();
	 	var oppty_no  = $("#oppty_no").val();
	 	var location  = $("#location").val();
	 	var remark_cn = $("#remark_cn").val();
	 	
	 	if($("#subject").val() == 0 || $("#subject").val() == null || $("#subject").val() == "") {
			alert("제목을 입력하세요.");
			$("#subject").focus();
			return false;
		} else if ($("#cust_no").val() == 0 || $("#cust_no").val() == null || $("#cust_no").val() == "") {
			alert("고객을 입력하세요.");
			$("#cust_no").focus();
			return false;
		} else if ($("#emp_no").val() == 0 || $("#emp_no").val() == null || $("#emp_no").val() == "") {
			alert("담당자를 입력하세요.");
			$("#emp_no").focus();
			return false;
		} else if ($("#next_day").val() == 0 || $("#next_day").val() == null || $("#next_day").val() == "") {
			alert("다음일자를 입력하세요.");
			$("#next_day").focus();
			return false;
		} else if ($("#dtype_cd").val() == 0 || $("#dtype_cd").val() == null || $("#dtype_cd").val() == "") {
			alert("분류를 입력하세요.");
			$("#dtype_cd").focus();
			return false;
		} else if ($("#score_cd").val() == 0 || $("#score_cd").val() == null || $("#score_cd").val() == "") {
			alert("상대가치점수를 입력하세요.");
			$("#score_cd").focus();
			return false;
		} else if ($("#location").val() == 0 || $("#location").val() == null || $("#location").val() == "") {
			alert("진행장소를 입력하세요.");
			$("#location").focus();
			return false;
		} else if (wordch($("#location").val()) == false) {
			alert("진행장소에 특수문자는 입력 불가능합니다.");
			return false;
		} else if ($("#remark_cn").val() == 0 || $("#remark_cn").val() == null || $("#remark_cn").val() == "") {
			alert("특이사항을 입력하세요.");
			$("#remark_cn").focus();
			return false;
		} else if (wordch($("#remark_cn").val()) == false) {
			alert("특이사항에 특수문자는 입력 불가능합니다.");
			return false;
		}
	 
		var ynChk = confirm("해당 상담을 수정하시겠습니까?");
		if(ynChk){
			$.ajax({
				type : 'POST',
				url : ctx + '/task_edit',
				data : {
					
					task_no 	: task_no,
					subject 	: subject,
					cust_no		: cust_no,
					emp_no		: emp_no,
					next_day	: next_day,
					dtype_cd	: dtype_cd,
					lead_no 	: lead_no,
					oppty_no	: oppty_no,
					score_cd	: score_cd,
					location	: location,
					remark_cn	: remark_cn
					
				},
				dataType : "json",
				success : function(data) {
					
					alert("상담이 수정되었습니다.");
					alert("상담 리스트로 이동합니다.");
					//location.href= ctx + '/task';
					task_cancel();
					
				}, error : function(request,status,error) {
				        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	});
}

//상담 삭제
function task_del_save() {
	$(document).ready(function() {
		var ynChk = confirm("해당 상담을 삭제하시겠습니까?");
		if(ynChk)
		{
			$.ajax({
				type : 'POST',
				url : ctx + '/task_delete',
				data : {
					task_no 	: $("#task_no").val()
				},
				dataType : "json",
				success : function(data) {
					
					alert("상담이 삭제되었습니다.");
					alert("상담 리스트로 이동합니다.");
					
					task_cancel();
					
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

// 취소버튼
function task_cancel() {
	location.href="/task";
}

//리스트 이동 클릭함수
function taskList() {
	location.href="/task";
}