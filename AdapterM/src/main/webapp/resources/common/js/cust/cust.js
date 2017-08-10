/**
* 함수 목록
* cust_add() 							: 고객 단건 추가
*
*
*/
var ctx = $("#ctx").val();

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
 function cust_modify_save() {
	 
	 alert($("#cust_no").val());
	 alert($("#visit_cd").find(":selected").val());
	 alert($("#visit_dtl_cd ").val());
	 
	 $(document).ready(function() {

		 var cust_no = $("#cust_no").val();
			 
			$.ajax({
				type : 'POST',
				url : ctx + '/custSave',
				data : {
					
					cust_no 		: cust_no,
					cust_name 		: $("#cust_name").val(),
					resident_no		: $("#resident_no").val(),
					chart_no		: $("#chart_no").val(),
					cust_id			: $("#cust_id").val(),
					visit_cd		: $("#visit_cd").val(),
					visit_dtl_cd 	: $("#visit_dtl_cd ").val(),
					visit_cn		: $("#visit_cn").val(),
					remark_cn		: $("#remark_cn").val()
				},
				dataType : "json",
				success : function(data) {
					
//					if (cust_no == null || cust_no == "") {
//						
//						
//					} else {
//						
//					}
					
					
					var ynChk = confirm("해당 고객을 수정하시겠습니까?");
					if(ynChk){
						alert("고객이 수정되었습니다.");
						
//						alert("고객 리스트로 이동합니다.");
//						location.href = ctx + '/cust';
					} else {
						alert("취소되었습니다.");
					}
				}, error : function(request,status,error) {
			          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			    }
			});

		});
 	
 }
 
 
 // 취소버튼 
 function cust_cancel(){
 
	 location.href="/cust"
	 
 } 