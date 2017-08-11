/**
 * 
 * opptyList()				:: 리스트로 이동.
 * opptySingleAdd()			:: 단건등록.
 * opptyEdit()				:: 매출기회수정
 * opptyDel()				:: 매출기회삭제
 * 
 * custSchPopupOpen()
 * empSchPopupOpen()
 * viewCustList()
 * enterSearch(event)
 * popupClose()
 * 
 */
var ctx = $("#ctx").val();


function opptyList()
{
	location.href = ctx + "/oppty";
}

// popup
function custSchPopupOpen()
{
	// 팝업창 표시
	$.blockUI({ message: $('#custListModalDiv'),
    	css: { 
    	'left': '65%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '400px',
    	'height': '500px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});
	
	// list 불러오는 함수.
//	viewCustList(1);
	viewCustList();
}

function empSchPopupOpen()
{
	// 팝업창 표시
	$.blockUI({ message: $('#empListModalDiv'),
    	css: { 
    	'left': '65%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '400px',
    	'height': '500px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});
	
	// list 불러오는 함수.
	viewEmpList();
}

/* 팝업창 고객목록 표시 */
//function viewCustList(prodMenuPageNum) {
function viewCustList() 
{
	var ctx = $("#ctx").val();
	
	var s_cust_name = $("#s_cust_name").val();
	
	console.log(s_cust_name);
	
	$.ajax({
		url: ctx + "/custListAjax", 
		type: "POST",  
		data: { s_cust_name : s_cust_name },
		dataType: "json",
		success: function(data) { 
			
			$("#custListTbody").empty();
			$("#s_cust_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.custPopupList.length == 0) {
				var trElement = $("#custListTableHeader").clone().removeClass().empty();
				$("#custListTbody").append(trElement);
				$("#custListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.custPopupList, function(i) {
					var trElement = $("#custListTableHeader").clone().removeClass().empty();
					var cust_no = this.cust_no;
					var cust_name = this.cust_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						$("#cust_no").val(cust_no);
						$("#cust_name").val(cust_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#custListTbody").append(trElement);
					$("#custListTbody tr:last").append("<td width='60%'>" + cust_no + "</td>"
							+ "<td width='30%'>" + cust_name + "</td>");
				});
			}
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("가맹점목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

// 담당자 Popup
function viewEmpList() {
	var ctx = $("#ctx").val();
	
	var s_emp_name = $("#s_emp_name").val();
	
	console.log(s_emp_name);
	
	$.ajax({
		url: ctx + "/empListAjax", 
		type: "POST",  
		data: { s_emp_name : s_emp_name },
		dataType: "json",
		success: function(data) { 
			
			$("#empListTbody").empty();
			$("#s_emp_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.empPopupList.length == 0) {
				var trElement = $("#empListTableHeader").clone().removeClass().empty();
				$("#empListTbody").append(trElement);
				$("#empListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.empPopupList, function(i) {
					var trElement = $("#empListTableHeader").clone().removeClass().empty();
					var emp_no = this.emp_no;
					var emp_name = this.emp_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						$("#emp_no").val(emp_no);
						$("#emp_name").val(emp_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#empListTbody").append(trElement);
					$("#empListTbody tr:last").append("<td width='60%'>" + emp_no + "</td>"
							+ "<td width='30%'>" + emp_name + "</td>");
				});
			}
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("담당자목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

// 엔터키 기능
function enterSearch(event) 
{
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewProdMenuList(1, 1);
	}
	event.stopPropagation();
}

// Popup 닫기
function popupClose()
{
	$.unblockUI();
}

// 단건 등록
function opptySingleAdd()
{
	$(document).ready(function() {
		
		console.log($("#sorce").val());
		
		if($("#score").val() == 0 || $("#score").val() == null || $("#score").val() == "")
		{
			$("#score").val(0);
		}
		
		var ynChk = confirm("해당 기회를 추가하시겠습니까?");
		if(ynChk)
		{
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
					alert("매출기회가 추가되었습니다.");
//					alert("매출기회 리스트로 이동합니다.");
//					location.href = ctx + '/oppty';
				
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


// edit 수정
function opptyEdit()
{
	$(document).ready(function() {

		var ynChk = confirm("해당 기회를 수정하시겠습니까?");
		if(ynChk)
		{
			$.ajax({
				type : 'POST',
				url	 : ctx + '/oppty_edit',
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
					alert("매출기회가 수정되었습니다.");
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

function opptyDel()
{
	$(document).ready(function() {
		var ynChk = confirm("해당 기회를 삭제하시겠습니까?");
		if(ynChk)
		{
			$.ajax({
				type : 'POST',
				url : ctx + '/oppty_delete',
				data : {
					oppty_no 		: $("#oppty_no").val()
				},
				dataType : "json",
				success : function(data) {
					alert("매출기회가 삭제되었습니다.");
					alert("매출기회 리스트로 이동합니다.");
					
					location.href = ctx + '/oppty';
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





























