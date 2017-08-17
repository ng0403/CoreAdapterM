/**
* custSchPopupOpen()							: 고객 팝업 오픈
* empSchPopupOpen()								: 담당자 팝업 오픈
* leadSchPopupOpen()							: 가망고객 팝업 오픈
* opptySchPopupOpen()							: 영업기회 팝업 오픈
* viewCustList(custPopupPageNum) 				: 고객 리스트
* viewEmpList(empPopupPageNum)					: 담당자 리스트
* viewLeadList(leadPopupPageNum) 				: 가망고객 리스트
* viewOpptyList(opptyPopupPageNum) 				: 영업기회 리스트
* popupClose()
*/


//popup
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

function leadSchPopupOpen()
{
	// 팝업창 표시
	$.blockUI({ message: $('#leadListModalDiv'),
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
	viewLeadList(1);
}

function opptySchPopupOpen()
{
	// 팝업창 표시
	$.blockUI({ message: $('#opptyListModalDiv'),
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
	viewOpptyList(1);
}


/* 팝업창 고객목록 표시 */
//function viewCustList(prodMenuPageNum) {
function viewCustList(custPopupPageNum) 
{
	var ctx = $("#ctx").val();
	
	var s_cust_name = $("#s_cust_name").val();
	var custPopupPageNum = $("#custPopupPageNum").val();
	
	$.ajax({
		url: ctx + "/taskCustListAjax", 
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

//담당자 Popup
function viewEmpList(empPopupPageNum) {
	var ctx = $("#ctx").val();
	
	var s_emp_name = $("#s_emp_name").val();
	
	$.ajax({
		url: ctx + "/taskEmpListAjax", 
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

// 가망고객
function viewLeadList(leadPopupPageNum) 
{
	
	var ctx = $("#ctx").val();
	
	var s_lead_name = $("#s_lead_name").val();
	var leadPopupPageNum = $("#leadPopupPageNum").val();
	
	$.ajax({
		url: ctx + "/taskLeadListAjax", 
		type: "POST",  
		data: { 
			leadPopupPageNum : leadPopupPageNum,
			s_lead_name : s_lead_name 
		},
		dataType: "json",
		success: function(data) { 
			
			$("#leadListTbody").empty();
			$("#s_lead_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.leadPopupList.length == 0) {
				var trElement = $("#leadListTableHeader").clone().removeClass().empty();
				$("#leadListTbody").append(trElement);
				$("#leadListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.leadPopupList, function(i) {
					var trElement = $("#leadListTableHeader").clone().removeClass().empty();
					var lead_no = this.lead_no;
					var lead_name = this.lead_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						$("#lead_no").val(lead_no);
						$("#lead_name").val(lead_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#leadListTbody").append(trElement);
					$("#leadListTbody tr:last").append("<td width='60%'>" + lead_no + "</td>"
							+ "<td width='30%'>" + lead_name + "</td>");
				});
			}
			
			// 페이징 그리기
			$("#leadPopupPagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='leadPopupInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='leadPageNum' value='"+data.pageNum+"'/><input type='hidden' id='leadEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='leadPopupInput' value='"+data.page.startPageNum+"' onkeypress=\"leadPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewLeadList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewLeadList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='leadPageNum' value='"+data.pageNum+"'/><input type='hidden' id='leadEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewLeadList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='leadPopupInput' value='"+data.page.endPageNum+"' onkeypress=\"leadPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='leadPageNum' value='"+data.pageNum+"'/><input type='hidden' id='leadEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewLeadList("+(data.pageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='leadPopupInput' value='"+data.pageNum+"' onkeypress=\"leadPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewLeadList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewLeadList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#leadPopupPagingDiv").append(pageContent);
			
			
		},
		beforeSend: function(){
      	viewLoadingShow();			
      },
      complete:function(){
      	viewLoadingHide();	
      },
		error: function(data) { 
			alert("가망고객을 불러오지 못했습니다.");
			return false;
		}
	});
	
}

// 영업기회
function viewOpptyList(opptyPopupPageNum) 
{
	var ctx = $("#ctx").val();
	var s_oppty_name = $("#s_oppty_name").val();
	
	$.ajax({
		url: ctx + "/taskOpptyListAjax", 
		type: "POST",  
		data: { 
			opptyPopupPageNum : opptyPopupPageNum,
			s_oppty_name : s_oppty_name 
		},
		dataType: "json",
		success: function(data) { 
			
			$("#opptyListTbody").empty();
			$("#s_oppty_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.opptyPopupList.length == 0) {
				var trElement = $("#opptyListTableHeader").clone().removeClass().empty();
				$("#opptyListTbody").append(trElement);
				$("#opptyListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				$.each(data.opptyPopupList, function(i) {
					var trElement = $("#opptyListTableHeader").clone().removeClass().empty();
					var oppty_no = this.oppty_no;
					var oppty_name = this.oppty_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						$("#oppty_no").val(oppty_no);
						$("#oppty_name").val(oppty_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#opptyListTbody").append(trElement);
					$("#opptyListTbody tr:last").append("<td width='60%'>" + oppty_no + "</td>"
							+ "<td width='30%'>" + oppty_name + "</td>");
				});
			}
			console.log(data);
			
			// 페이징 그리기
			$("#opptyPopupPagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='opptyPopupInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.pageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='opptyPopupInput' value='"+data.page.startPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewOpptyList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewOpptyList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.pageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewOpptyList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='opptyPopupInput' value='"+data.page.endPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.pageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewOpptyList("+(data.pageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='opptyPopupInput' value='"+data.pageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewOpptyList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewOpptyList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
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
			alert("영업기회 목록을 취득하지 못했습니다.");
			return false;
		}
	});
	
}

//Popup 닫기
function popupClose()
{
	$.unblockUI();
}