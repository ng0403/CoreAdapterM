
// 리드 상세정보
 function leadDetail(a) {
	  
   var no = a; 
   location.href="/lead_detail?lead_no=" + no; 
	 
 }
 
 //가망고객 리스트 이동.
 function leadlist(){
	 
	 location.href="/lead";
 }
 
 function lead_cancel(){
	 if(confirm("페이지로 이동하시겠습니까?")){
	 location.href="/lead";
	 }
	 else{
		 return false;
	 }
 }
 
 
 // 가망고객 단건 등록
 function lead_single_add(){
 
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
 