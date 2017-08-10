/**
* 함수 목록
* cust_add() 							: 고객 단건 추가
* custDetail(a)							: 고객 상세정보
* cust_add_save()						: 고객 저장
* cust_modify_save()					: 고객 수정 
* cust_cancel()							: 고객 취소버튼(리스트로 이동)
* 
*/
var ctx = $("#ctx").val();

 // 고객 단건 추가
 function cust_add(){
	 location.href="/custForm?cust_no="
 }
 
// 고객 상세정보
 function custDetail(a) {
   var no = a; 
   location.href="/custForm?cust_no=" + no; 
 }
 
 // 고객 저장
 function cust_add_save() {
	 $(document).ready(function() {
		var cust_no = $("#cust_no").val();
		var ynChk = confirm("해당 고객을 저장하시겠습니까?");
		if(ynChk){
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
					alert("고객이 저장되었습니다.");
				}, error : function(request,status,error) {
				        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	});
 }
// 고객 수정
 function cust_modify_save() {
	$(document).ready(function() {
		var cust_no = $("#cust_no").val();
		var ynChk = confirm("해당 고객을 수정하시겠습니까?");
		if(ynChk){
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
					alert("고객이 수정되었습니다.");
				}, error : function(request,status,error) {
				        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	});
 }
 
 
 // 취소버튼 
 function cust_cancel(){
	 location.href="/cust"
 } 
 

 // 테이블 행 추가
function cust_phone_add(cust_no) {
	var cust_no = cust_no;
	var phoneTypeCdList = "<c:out value='${phoneTypeCdList}'/>";
	var phone_type_cd = '<c:out value="${custPList.phone_type_cd}"/>';
	
	console.log(phoneTypeCdList);
	console.log(phone_type_cd);
	
    var tbody = $('#table_tbody');
	var tbodyContent = "";
	
	// 새로 그려준다.
	tbody.append(
		"<tr>"+
			"<td>" +
				"<select id='phone_type_cd' name='phone_type_cd'" +
					"style='margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
				"<option value=''>선택</option>"+
				"<c:forEach var='phoneTypeCdList' items='"+ phoneTypeCdList +"'>" +
					"<c:if test= '${ phoneTypeCdList.code eq "+phone_type_cd+" }'>" +
						"<option value='${ phoneTypeCdList.code }' selected='selected'>${ phoneTypeCdList.code_name}</option>" +
						"</c:if>" +
						"<c:if test= '${ phoneTypeCdList.code ne custPList.phone_type_cd }'>"+
							"<option value='${ phoneTypeCdList.code }'>${ phoneTypeCdList.code_name }</option>"+
						"</c:if>"+
					"</c:forEach>"+
				"</select>"+
			"</td>"+
			"<td>"+
				"<select id='phone_country_cd' name='phone_country_cd' " + 
						"style='margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
				"<option value=''>선택</option>" +
				"<c:forEach var='phoneCountryCdList' items='${ phoneCountryCdList }'> " +
						"<c:if test= '${ phoneCountryCdList.code eq custPList.phone_country_cd }'>" +
							"<option value='${ phoneCountryCdList.code }' selected='selected'>${ phoneCountryCdList.code_name }</option>" +
						"</c:if>" +
						"<c:if test= '${ phoneCountryCdList.code ne custPList.phone_country_cd }'> " +
							"<option value='${ phoneCountryCdList.code }'>${ phoneCountryCdList.code_name }</option>" +
						"</c:if>" +
					"</c:forEach>"+
				"</select> " +
			"</td>"+
			
			"<td>"+
				"<input type='text' id='phone_area_no' name='phone_area_no'> " +
			"</td>" +
			"<td>"+
				"<input type='text' id='phone_no' name='phone_no'> " + 
			"</td>" +
		"</tr>"
	);
    
}


// 테이블 행 삭제
function cust_remove() {
	
	var table_tbody = document.getElementById('table_tbody');
    if (table_tbody.rows.length < 1) return;
    // my_tbody.deleteRow(0); // 상단부터 삭제
    table_tbody.deleteRow( table_tbody.rows.length-1 ); // 하단부터 삭제
	
}

