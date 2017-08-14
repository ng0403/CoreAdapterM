 
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
	 if(confirm("페이지로 이동하시겠습니까?")){
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
function searchKeyword(){
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
		        "rank_cd" : rank_cd      };
		
 
			var tbody = $('#lead_list_tbody');
			var tbodyContent = "";
	  
			$.ajax({
				url:'/searchKeyword',
				type: 'POST',
				data: leadData,
				dataType:'json',
				success: function(data){
					tbody.children().remove(); 
			  
 					for(var i=0; i<data.leadList.length; i++){ 
 					tbodyContent = "<tr>" +
	 	 			"<td style='text-align: left;' >" +data.leadList[i].lead_no +"</td>" +
	 	 			"<td style='text-align: left;'>" +
	 	 			"<a href='#' onclick=leadDetail('"+data.leadList[i].lead_no+"'); id='"+data.leadList[i].lead_no+"'>" + data.leadList[i].lead_name+"</a></td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].cust_no +"</td>" +
	 	 			"<td style='text-align: left;'>" +data.leadList[i].cust_name +"</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].phone_no + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].emp_no + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].contact_day + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].rank_cd + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.leadList[i].create_date + "</td>" +
	 	 			"</tr>";
 					tbody.append(tbodyContent);
					}
					 
					
				},
				error: function(){
					alert("error");
				}
			});
	 
}



 