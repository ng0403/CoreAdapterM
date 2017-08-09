/**
* 함수 목록
* cust_add() 							: 고객 단건 추가
*
*
*/

$(document).ready(function() {
	 

	
});


 // 고객 단건 추가
 function cust_add(){

	 location.href="/custForm?cust_no="
	 
 }
 
// 고객 상세정보
 function custDetail(a) {
	
   console.log(a); 
   var no = a; 
   location.href="/custForm?cust_no=" + no; 
	 
 }
 
// 고객 수정
 function cust_modify(no){
	 
 	var cust_no = no;
 	// 	location.href="/custSave?cust_no=" + cust_no;
 	
 }
 
// 고객 수정 저장
 function cust_modify_save(cust_no) {
	 
	
 	
 }
 
 
 // 취소버튼 
 function cust_cancel(){
 
	 location.href="/cust"
	 
 } 