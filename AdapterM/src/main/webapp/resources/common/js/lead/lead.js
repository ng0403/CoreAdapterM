 
 
// 리드 상세정보
 function leadDetail(a) {
	  
   var no = a; 
   location.href="/lead_detail?lead_no=" + no; 
	 
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
 	 formObj.attr("action", "/lead_single_add");
	 formObj.attr("method", "post");
	 formObj.submit();  
    }else{
   	 return false;
    }
}

//가망 고객 수정
function lead_modify(no){
	var lead_no = no;
	
	location.href="/lead_update?lead_no=" + lead_no;
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



//초성 검색 페이징
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
 					tbodyContent += "<tr>" +
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
					 
					
				},
				error: function(){
					alert("error");
				}
			});
	 
}



 