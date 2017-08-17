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
	viewCustList(1);
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
	
	$("#pageNum").val("1");
	
	// list 불러오는 함수.
	viewEmpList(1);
}

/* 팝업창 고객목록 표시 */
//function viewCustList(prodMenuPageNum) {
function viewCustList(custPopupPageNum) 
{
	var ctx = $("#ctx").val();
	
	var s_cust_name = $("#s_cust_name").val();
	var custPopupPageNum = $("#custPopupPageNum").val();
	
	console.log(s_cust_name);
	
	$.ajax({
		url: ctx + "/custListAjax", 
		type: "POST",  
		data: { 
			custPopupPageNum : custPopupPageNum,
			s_cust_name : s_cust_name 
		},
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
			
			// 페이징 그리기
			$("#custPopupPagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='custPopupInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='custPopupInput' value='"+data.page.startPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewCustList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewCustList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewCustList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='custPopupInput' value='"+data.page.endPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewCustList("+(data.pageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='custPopupInput' value='"+data.pageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewCustList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewCustList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#custPopupPagingDiv").append(pageContent);
			
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("고객목록을 불러오지 못했습니다.");
			return false;
		}
	});
}

//가맹점 리스트 페이징 엔터 기능
function custPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var prodMenuPageNum = parseInt($("#custPopupInput").val());
			if ($("#custPopupInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#custPopupInput").val($("#custPageNum").val());
				$("#custPopupInput").focus();
			} else if(prodMenuPageNum > parseInt($("#custEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#custPopupInput").val($("#custPageNum").val());
				$("#custPopupInput").focus();
			} else if (1 > prodMenuPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#custPopupInput").val($("#custPageNum").val());
				$("#custPopupInput").focus();
			} else {
				viewCustList(custPopupPageNum);
			}
		}
		event.stopPropagation();
	});
}


// 담당자 Popup
function viewEmpList(empPopupPageNum) {
	var ctx = $("#ctx").val();
	
	var s_emp_name = $("#s_emp_name").val();
	
	console.log(s_emp_name);
	
	$.ajax({
		url: ctx + "/empListAjax", 
		type: "POST",  
		data: { 
			empPopupPageNum : empPopupPageNum,
			s_emp_name : s_emp_name 
		},
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
			console.log(data);
			
			// 페이징 그리기
			$("#empPopupPagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='empPopupInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='empPageNum' value='"+data.pageNum+"'/><input type='hidden' id='empEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='empPopupInput' value='"+data.page.startPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewEmpList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewEmpList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='empPageNum' value='"+data.pageNum+"'/><input type='hidden' id='empEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewEmpList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='empPopupInput' value='"+data.page.endPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='empPageNum' value='"+data.pageNum+"'/><input type='hidden' id='empEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewCustList("+(data.pageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='empPopupInput' value='"+data.pageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewEmpList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewEmpList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#empPopupPagingDiv").append(pageContent);
			
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

// 편집 버튼 제어
function opptyMody()
{
	if($("#oppty_detail_mdfy").val() == "편집")
	{
		$("#oppty_detail_mdfy").val("저장");
		$("#oppty_detail_mdfy").removeClass("func_btn");
		$("#oppty_detail_mdfy").addClass("tr_btn");
		
		return false;
	}
	if($("#oppty_detail_mdfy").val() == "저장")
	{
		opptyEdit();
	}
	
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



























