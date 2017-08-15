/**
* 함수 목록
* searchKeyword()                       : 고객 조회
* cust_add() 							: 고객 단건 추가
* custDetail(a)							: 고객 상세정보
* cust_add_save()						: 고객 저장
* cust_modify_save()					: 고객 수정 
* cust_cancel()							: 고객 취소버튼(리스트로 이동)
* cust_phone_add(cust_no)				: 테이블 행 추가
* cust_remove() 						: 테이블 행 삭제
* 
*/
var ctx = $("#ctx").val();

// 고객 조회
function searchKeyword(){
	
	var cust_no = $("#cust_no").val();
	var cust_name = $("#cust_name").val();
	var chart_no = $("#chart_no").val();
	var visit_cd = $("#visit_cd").val();
	var rec_per = $("#rec_per").val();
	var phone_no = $("#phone_no").val();
	
	
	var custData = { "cust_no": cust_no, 
					 "cust_name": cust_name,
					 "chart_no": chart_no, 
					 "visit_cd":visit_cd, 
					 "rec_per":rec_per,
					 "phone_no" : phone_no      };
		
 
			var tbody = $('#cust_list_tbody');
			var tbodyContent = "";
			
			$.ajax({
				url:'/custAjax',
				type: 'POST',
				data: custData,
				dataType:'json',
				success: function(data){
					tbody.children().remove(); 
 					for(var i=0; i<data.custList.length; i++){
						var vititCdList_contents = '';
					    for(var j=0;j < vititCdList.length; j++){
					    	if(vititCdList[j] == data.custList[i].visit_cd){
					    		vititCdList_contents = vititCdList[++j];
					    	}
						}
					    var vititDtlCdList_contents = '';
					    for(var i=0;i < vititDtlCdList.length; i++){
					    	for(var j=0;j < vititDtlCdList.length; j++){
						    	if(vititDtlCdList[j] == data.custList[i].visit_dtl_cd){
						    		vititDtlCdList_contents = vititDtlCdList[++j];
						    	}
							}
						}
 					tbodyContent += "<tr>" +
	 	 			"<td style='text-align: left;' >" +data.custList[i].cust_no +"</td>" +
	 	 			"<td style='text-align: left;'>" +
	 	 				"<a href='#' onclick=leadDetail('"+data.custList[i].cust_no+"'); id='"+data.custList[i].cust_no+"'>" + data.custList[i].cust_name+"</a></td>" +
	 	 			"<td style='text-align: left;'>" + data.custList[i].chart_no +"</td>" +
	 	 			"<td style='text-align: left;' > " + vititCdList_contents +
	 	 			"</td>" +
	 	 			"<td style='text-align: left;' > " + vititDtlCdList_contents +
	 	 			"</td>" +
	 	 			"<td style='text-align: left;'>" + data.custList[i].rec_per + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.custList[i].phone_no + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.custList[i].main_address + "</td>" +
	 	 			"<td style='text-align: left;'>" + data.custList[i].create_date + "</td>" +
	 	 			"</tr>";
 					tbody.append(tbodyContent);
					}
				},
				error: function(){
					alert("error");
				}
			});
}


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
//	var phoneTypeCdList = "<c:out value='${phoneTypeCdList}'/>";
//	var phone_type_cd = '<c:out value="${custPList.phone_type_cd}"/>';
//	var phone_type_cd = document.getElementById("phone_type_cd").value;
	
//	alert(phone_type_cd);
	
    var tbody = $('#table_tbody');
    var phoneTypeCdList_contents = '';
    for(var i=0;i < phoneTypeCdList.length; i++){
    	phoneTypeCdList_contents += "<option value='"+phoneTypeCdList[i]+"'>"+phoneTypeCdList[++i]+"</option>";
	}
    var phoneCountryCdList_contents = '';
    for(var i=0;i < phoneCountryCdList.length; i++){
    	phoneCountryCdList_contents += "<option value='"+phoneCountryCdList[i]+"'>"+phoneCountryCdList[++i]+"</option>";
	}
	var tbodyContent = "<tr>"+
							"<td>" +
								"<select id='phone_type_cd' name='phone_type_cd'" +
									"style='margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
									"<option value=''>선택</option>"+ 
									phoneTypeCdList_contents + 
								"</select>"+
							"</td>"+
							"<td>"+
								"<select id='phone_country_cd' name='phone_country_cd' " + 
										"style='margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
									"<option value=''>선택</option>" +
									phoneCountryCdList_contents +
								"</select>" +
							"</td>"+
							
							"<td>"+
								"<input type='text' id='phone_area_no' name='phone_area_no'> " +
							"</td>" +
							"<td>"+
								"<input type='text' id='phone_no' name='phone_no'> " + 
							"</td>" +
						"</tr>";
	
	// 새로 그려준다.
	tbody.append(tbodyContent);
    
}


// 테이블 행 삭제
function cust_remove() {
	
	var table_tbody = document.getElementById('table_tbody');
    if (table_tbody.rows.length < 1) return;
    // my_tbody.deleteRow(0); // 상단부터 삭제
    table_tbody.deleteRow( table_tbody.rows.length-1 ); // 하단부터 삭제
	
}

