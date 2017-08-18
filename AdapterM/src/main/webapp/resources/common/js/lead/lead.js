 
$(function(){
 	  var flg = $("#flg").val();
 
	  // 상세보기일 때 text readonly
	  if(flg == '0'){
		  	$("#lead_no").attr("readonly", true);
		  	$("#lead_name").attr("readonly", true);
		  	$("#cust_no").attr("readonly", true);
		    $("#emp_name").attr("readonly", true);
			$("#contact_day").attr("readonly", true);
			$("#rank_cd").attr("readonly", true); 
			$("#reason_cd").attr("readonly", true);
			$("#remark_cn").attr("readonly", true);  
	  }
 
	  // lead update button div hide
	  $("#lead_update_div").css("display", "none");
	  
	  //lead update title div hide
	  $("#lead_update_title").css("display", "none");
});


//페이징 함수
function leadPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var leadListForm = $("#leadListPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    leadListForm.append(pageNumInput);
	    viewLoadingShow();
	    leadListForm.submit();
	});
}






//검색 엔터키 기능
function leadSearchEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	
 	if (keycode == '13') {
		if ($("#lead_no_srch").val() == '' && $("#lead_name_srch").val() == '' && $("#cust_no").val() == '' && $("#emp_no").val() == ''  && $("#rank_cd").val() == '' ) {
			alert("검색어를 입력하세요.")
			$("#lead_no_srch").focus();
		} else {
			searchKeyword();
		}
	}
	event.stopPropagation();
}

 
// 리드 상세정보
 function leadDetail(a) {
	  
   var no = a; 
   location.href="/lead_detail?lead_no=" + no; 
	 
 }
 
  
 //고객 서치 팝업 오픈
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
 	viewCustList();
 }
 
 //담당자 서치 팝
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
 
 
 
//고객 Popup
 function viewCustList() {
 	var ctx = $("#ctx").val();
 	
 	var s_cust_name = $("#s_cust_name").val();
 	
 	console.log(s_cust_name);
 	
 	$.ajax({
 		url: ctx + "/custPopListAjax", 
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
 			alert("담당자목록을 취득하지 못했습니다.");
 			return false;
 		}
 	});
 }
 
 
//담당자 Popup
 function viewEmpList() {
 	var ctx = $("#ctx").val();
 	
 	var s_emp_name = $("#s_emp_name").val();
 	
 	console.log(s_emp_name);
 	
 	$.ajax({
 		url: ctx + "/empPopListAjax", 
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
 
  
 
 //가망고객 리스트 이동.
 function leadlist(){
	 
	 location.href="/lead";
 }
 
 //가망 고객 취소 페이지 이동
 function lead_cancel(){
	 if(confirm("리스트 페이지로 이동하시겠습니까?")){
	 location.href="/lead";
	 }
	 else{
		 return false;
	 }
 }
 
 
 // 가망고객 단건 추가
 function lead_add(){
 
	 location.href="/lead_single_add"
	 
 }
 
 
 //가망고객 단건 추가 저장
function lead_single_save(){
	var formObj = $("form[role='form']");
	
	
    if(confirm("저장 하시겠습니까?")){ 
    
    if($("#lead_name").val() == null || $("#lead_name").val()==""){
        	alert("리드명을 입력해 주세요.");
        	return false;
    } 
    
    if($("#cust_no").val() == null || $("#cust_no").val()==""){
    	alert("고객명을 입력해 주세요.");
    	return false;
} 
    	
    	
    if($("#contact_day").val() == null || $("#contact_day").val()==""){
    	alert("접촉할 일자를 입력해 주세요.");
    	return false;
    } 
  
    	
 	 formObj.attr("action", "/lead_single_add");
	 formObj.attr("method", "post");
	 formObj.submit();  
    }else{
   	 return false;
    }
}
 
//가망 고객 수정
function lead_modify(){ 
	
	
	$("#emp_name").attr("readonly", false);
	$("#contact_day").attr("readonly", false);
	$("#rank_cd").attr("readonly", false); 
	$("#reason_cd").attr("readonly", false);
	$("#remark_cn").attr("readonly", false); 
	
	
	$("#lead_detail_div").css("display", "none");
	$("#lead_update_div").css("display", "block");
	
	
	$("#lead_detail_title").css("display", "none");
	$("#lead_update_title").css("display", "block");
 
}


//가망 고객 수정 저장
function lead_modify_save() {
	
	var formObj = $("form[role='form']");
    if(confirm("수정 하시겠습니까?")){
 	 formObj.attr("action", "/lead_update");
	 formObj.attr("method", "post");
	 formObj.submit();  
    }else{
   	 return false;
    }
	
}

//가망 고객 삭제
function lead_remove() {
	
	var formObj = $("form[role='form']");
    if(confirm("삭제 하시겠습니까?")){
 	 formObj.attr("action", "/lead_delete");
	 formObj.attr("method", "post");
	 formObj.submit();  
    }else{
   	 return false;
    }
   
}



//조회
function searchKeyword(a){
	
 	var lead_no_srch = $("#lead_no_srch").val();
	var lead_name_srch = $("#lead_name_srch").val();
	var cust_no = $("#cust_no").val();
	var emp_no = $("#emp_no").val();
	var contact_day_srch = $("#contact_day_srch").val();
	var rank_cd = $("#rank_cd").val();
	
	
	var leadData = { "lead_no_srch": lead_no_srch, 
				"lead_name_srch": lead_name_srch,
		        "cust_no": cust_no, 
		        "emp_no":emp_no, 
		        "contact_day_srch":contact_day_srch,
		        "rank_cd" : rank_cd , "pageNum" : a};
		
 
			var tbody = $('#lead_list_tbody');
			var tbodyContent = "";
	  
			$.ajax({
				url:'/searchKeyword',
				type: 'POST',
				data: leadData,
				dataType:'json',
				success: function(data){
					console.log(data);
					
					tbody.children().remove(); 
			  
 					for(var i=0; i<data.leadList.length; i++){ 
 					tbodyContent = "<tr>" +
	 	 			"<td style='text-align: left;' >" +data.leadList[i].lead_no +"</td>" +
	 	 			"<td style='text-align: left;'>" +
	 	 			"<a href='#' onclick=leadDetail('"+data.leadList[i].lead_no+"'); id='"+data.leadList[i].lead_no+"'>" + data.leadList[i].lead_name+"</a></td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].cust_no +"</td>" +
	 	 			"<td style='text-align: left;'>" +data.leadList[i].cust_name +"</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].phone_no + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].emp_name + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].contact_day + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].rank_cd + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].create_date + "</td>" +
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
 						+"<a onclick=\"searchKeyword("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
 						+"<a onclick=\"searchKeyword("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
 					} else if(data.opptyPageNum == data.page.endPageNum){
 						pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
 						+"<a onclick=\"searchKeyword("+(data.opptyPageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
 						+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
 						+"<a> / "+data.page.endPageNum+"</a> ▶";
 					} else {
 						pageContent = "<input type='hidden' id='opptyPageNum' value='"+data.opptyPageNum+"'/><input type='hidden' id='opptyEndPageNum' value='"+data.page.endPageNum+"'/>"
 						+"<a onclick=\"searchKeyword("+(data.opptyPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
 						+"<input type='text' id='pageInput' value='"+data.opptyPageNum+"' onkeypress=\"opptyPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
 						+"<a onclick=\"searchKeyword("+data.page.opptyPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
 						+"<a onclick=\"searchKeyword("+(data.opptyPageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
 					}
 					$(".pagingDiv").append(pageContent);
 					
 					
					
				},
				error: function(){
					alert("error");
				}
			});
	 
}


//엑셀 출력 
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
			form.attr("action", "/toLeadExcel");
			form.submit();
			
		} 
		else(flg == 1) 
		{
//			form.attr("action", "/task_sch");
//			form.submit();
		}
	} 
	$("input[name=excel]").val("");
}

//엑셀 Import 팝업	
function leadExcelImportOpen() 
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
function leadExcelCheck()
{
    var excelFile = $("#excelFile").val();
    
    if (excelFile == "" || excelFile == null) 
    {
        alert("파일을 선택해주세요.");
        
        return false;
    } 
    else if (!leadCheckFileType(excelFile)) 
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
function leadCheckFileType(filePath) 
{
	var fileFormat = filePath.split(".");
	
	if (fileFormat.indexOf("xlsx") > -1) {
		return true;
	} 
	else {
		return false;
	}

}


