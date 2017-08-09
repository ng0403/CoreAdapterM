/**
 * 
 * opptyList()				:: 리스트로 이동.
 * opptySingleAdd()			:: 단건등록.
 * opptyEdit()				:: 매출기회수정
 * opptyDel()				:: 매출기회삭제
 * 
 */
var ctx = $("#ctx").val();

function opptyList()
{
	location.href = ctx + "/oppty";
}

// 단건 등록
function opptySingleAdd()
{
	$(document).ready(function() {
		
		// popup 만들면 없앨 부분
		$("#cust_no").val("201708081100001");
		$("#emp_no").val("201708081300001");
		
		
		$.ajax({
			type : 'POST',
			url : ctx + '/oppty_single_add',
			data : {
				oppty_no 		: $("#oppty_no").val(),
				oppty_name 		: $("#oppty_name").val(),
				cust_no			: $("#cust_no").val(),
				emp_no			: $("#emp_no").val(),
				oppty_status_cd : $("#oppty_status_cd_sel").val(),
				oppty_stage_cd 	: $("#oppty_stage_cd_sel").val(),
				score			: $("#score").val(),
				exp_close_day 	: $("#exp_close_day").val(),
				dtype_cd		: $("#dtype_cd_sel").val(),
				sur_plan_cn		: $("#sur_plan_cn").val(),
				purchase_type	: $("#purchase_type_sel").val(),
				payment_cd		: $("#payment_cd_sel").val(),
				rec_per_cd		: $("#rec_per_cd_sel").val(),
				remark_cn		: $("#remark_cn").val()
			},
			dataType : "json",
			success : function(data) {
				
				var ynChk = confirm("해당 기회를 추가하시겠습니까?");
				if(ynChk)
				{
					alert("매출기회가 추가되었습니다.");
//					alert("매출기회 리스트로 이동합니다.");
//					location.href = ctx + '/oppty';
				}
				else
				{
					alert("취소되었습니다.");
				}
				
			},
			error : function(request,status,error) {
		          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    }
		});

	});
}


// edit 수정
function opptyEdit()
{
	$(document).ready(function() {

		$.ajax({
			type : 'POST',
			url : ctx + '/oppty_edit',
			data : {
				oppty_no 		: $("#oppty_no").val(),
				oppty_name 		: $("#oppty_name").val(),
				cust_no			: $("#cust_no").val(),
				emp_no			: $("#emp_no").val(),
				oppty_status_cd : $("#oppty_status_cd_sel").val(),
				oppty_stage_cd 	: $("#oppty_stage_cd_sel").val(),
				score			: $("#score").val(),
				exp_close_day 	: $("#exp_close_day").val(),
				dtype_cd		: $("#dtype_cd_sel").val(),
				sur_plan_cn		: $("#sur_plan_cn").val(),
				purchase_type	: $("#purchase_type_sel").val(),
				payment_cd		: $("#payment_cd_sel").val(),
				rec_per_cd		: $("#rec_per_cd_sel").val(),
				remark_cn		: $("#remark_cn").val()
			},
			dataType : "json",
			success : function(data) {
				
				var ynChk = confirm("해당 기회를 수정하시겠습니까?");
				if(ynChk)
				{
					alert("매출기회가 수정되었습니다.");
					
//					alert("매출기회 리스트로 이동합니다.");
//					location.href = ctx + '/oppty';
				}
				else
				{
					alert("취소되었습니다.");
				}
				
			},
			error : function(request,status,error) {
		          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    }
		});

	});
}

function opptyDel()
{
	$(document).ready(function() {
		$.ajax({
			type : 'POST',
			url : ctx + '/oppty_delete',
			data : {
				oppty_no 		: $("#oppty_no").val()
			},
			dataType : "json",
			success : function(data) {
				
				var ynChk = confirm("해당 기회를 삭제하시겠습니까?");
				if(ynChk)
				{
					alert("매출기회가 삭제되었습니다.");
					alert("매출기회 리스트로 이동합니다.");
					
					location.href = ctx + '/oppty';
				}
				else
				{
					alert("취소되었습니다.");
				}
				
			},
			error : function(request,status,error) {
		          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    }
		});

	});
}





























