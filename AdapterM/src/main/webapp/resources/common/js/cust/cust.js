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
* cust_delete()							: 고객 삭제
* 
*/

var ctx = $("#ctx").val();

$(document).ready(function(){
	$(document).on( 'click','.phone_primary_yn', function(event) {
		$(".phone_primary_yn").prop("checked", false);
		$(this).prop("checked", true);
		
	});
	
	$(document).on( 'click','.addr_primary_yn',function(event) {
		$(".addr_primary_yn").prop("checked", false);
		$(this).prop("checked", true);
	});	
	
//	$(document).on( 'click','.postcodify_search', function(event) {
//		// 팝업창 표시
//		console.log("TEMP");
//		$(this).postcodifyPopUp();
//	});
	
});

function wordch(thisword)
{
	console.log(thisword);
	
	var flag = true;
	var specialChars="~`!@#$%^&*-=+\|[](){};:'<.,>/?_";

	wordadded = thisword;

	for(i=0; i<wordadded.length; i++) 
	{
		for (j = 0; j < specialChars.length; j++) 
		{         
			if (wordadded.charAt(i) == specialChars.charAt(j))
			{
				flag = false;
				break;
	         }
	     }
	  }
	return flag;
}

function custSchReset()
{
	$("#cust_no").val("");
	$("#cust_name").val("");
	$("#chart_no").val("");
	$("#visit_cd option:eq(0)").prop("selected", "selected");
	$("#rec_per").val("");
	$("#phone_no").val("");
}

function custList()
{
	location.href = ctx + '/cust';
}

function custDelete()
{
	 console.log($("#cust_no").val());
	 
	$(document).ready(function() {
		var ynChk = confirm("해당 기회를 삭제하시겠습니까?");
		if(ynChk)
		{
			$.ajax({
				type : 'POST',
				url : ctx + '/cust_delete',
				data : {
					cust_no 		: $("#cust_no").val()
				},
				dataType : "json",
				success : function(data) {
					alert("고객이 삭제되었습니다.");
					alert("고객 리스트로 이동합니다.");
						
					location.href = ctx + '/cust';
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

// 고객 조회
function searchKeyword(pageNum)
{
	var cust_no = $("#cust_no").val();
	var cust_name = $("#cust_name").val();
 	var chart_no = $("#chart_no").val();
	var visit_cd = $("#visit_cd").val();
	var rec_per = $("#rec_per").val();
	var phone_no = $("#phone_no").val();
	
	console.log(visit_cd);
	
	var custData = { 
			 		 "custPageNum" : pageNum,
					 "cust_no": cust_no, 
					 "cust_name": cust_name,
					 "chart_no": chart_no, 
					 "visit_cd":visit_cd, 
					 "rec_per":rec_per,
					 "phone_no" : phone_no      };
 
			var tbody = $('#cust_list_tbody');
			var tbodyContent = "";
			
			$.ajax({
				url: ctx + '/custAjax',
				type: 'POST',
				data: custData,
				dataType:'json',
				success: function(data){
					tbody.children().remove(); 
					
 					for(var i=0; i<data.custList.length; i++)
 					{
 						var cust_no   = data.custList[i].cust_no;
 						var cust_name = data.custList[i].cust_name;
 						var chart_no  = data.custList[i].chart_no;
 						var rec_per   = data.custList[i].rec_per;
 						var phone_no  = data.custList[i].phone_no;
 						var main_address = data.custList[i].main_address;
 						var visit_dtl_cd = data.custList[i].visit_dtl_cd;
 						var create_date  = data.custList[i].create_date;
 						
 						var vititCdList_contents = '';
					    
 						for(var j=0;j < vititCdList.length; j++)
					    {
					    	if(vititCdList[j] == data.custList[i].visit_cd){
					    		vititCdList_contents = vititCdList[++j];
					    	}
						}
					    
					    var vititDtlCdList_contents = '';
					    for(var j=0;j < vititDtlCdList.length; j++)
					    {
						    if(vititDtlCdList[j] == data.custList[i].visit_dtl_cd){
						    	vititDtlCdList_contents = vititDtlCdList[++j];
						    }
						}
					    
					    tbodyContent = "<tr>" +
					    "<td style='text-align: left;' >" + data.custList[i].cust_no +"</td>" +
					    "<td style='text-align: left;'>" +
	 	 					"<a href='#' onclick=custDetail('"+data.custList[i].cust_no+"'); id='"+data.custList[i].cust_no+"'>" + data.custList[i].cust_name+"</a></td>" +
	 	 				"<td style='text-align: left;'>" + data.custList[i].chart_no +"</td>" +
	 	 				"<td style='text-align: left;' > " + vititCdList_contents +
	 	 				"</td>" +
	 	 				"<td style='text-align: left;' > " + vititDtlCdList_contents +
	 	 				"</td>" +
	 	 				"<td style='text-align: left;'>" + data.custList[i].rec_per + "</td>" +
	 	 				"<td style='text-align: left;'>" + data.custList[i].phone_area_no + data.custList[i].phone_no + "</td>" +
	 	 				"<td style='text-align: left;'>" + data.custList[i].main_address + "</td>" +
	 	 				"<td style='text-align: left;'>" + data.custList[i].create_date + "</td>" +
	 	 				"</tr>";
					    
					    tbody.append(tbodyContent);
					}
 					
 					// 페이징
 					$(".pagingDiv").empty();
 					var pageContent = "";

 					console.log(data);
 					
 					if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
 						pageContent = "◀ <input type='text' id='pageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
 					} else if(data.pageNum == data.page.startPageNum){
 						pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
 						+"◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
 						+"<a onclick=\"searchKeyword("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
 						+"<a onclick=\"searchKeyword("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
 					} else if(data.pageNum == data.page.endPageNum){
 						pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
 						+"<a onclick=\"searchKeyword("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
 						+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
 						+"<a> / "+data.page.endPageNum+"</a> ▶";
 					} else {
 						pageContent = "<input type='hidden' id='custPageNum' value='"+data.pageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.page.endPageNum+"'/>"
 						+"<a onclick=\"searchKeyword("+(data.pageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
 						+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
 						+"<a onclick=\"searchKeyword("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
 						+"<a onclick=\"searchKeyword("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
 					}
 					$(".pagingDiv").append(pageContent);
				},
				error: function(){
					alert("error");
				}
			});
}

//페이징 엔터키
function custPageNumInputEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		var pageNum = parseInt($("#pageInput").val());
		if ($("#pageInput").val() == '') {
			alert("페이지 번호를 입력하세요.")
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else if(pageNum > parseInt($("#endPageNum").val())) {
			alert("페이지 번호가 너무 큽니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else if (1 > pageNum) {
			alert("페이지 번호가 너무 작습니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else {
			cupnPaging(pageNum);
		}
	}
	event.stopPropagation();
}

 // 고객 단건 추가
function cust_add(){
	location.href="/custForm?cust_no=";
}
 
// 고객 상세정보
 function custDetail(a) {
   var no = a; 
   location.href=ctx + "/custForm?cust_no=" + no;
   
   $("#cust_phone").css("display", "block");
 }
 
// 고객 저장
function cust_add_save() 
{
	if($("#cust_name").val() == null || $("#cust_name").val() == "")
	{
		alert("고객명을 입력하세요.");
		return false;
	}
	if($("#visit_cd").val() == null || $("#visit_cd").val() == "")
	{
		alert("내원경로를 선택해주세요.");
		return false;
	}
	if($("#visit_dtl_cd").val() == null || $("#visit_dtl_cd").val() == "")
	{
		alert("내원경로상세를 선택해주세요.");
		return false;
	}
	if(wordch($("#visit_cn").val()) == false)
	{
		alert("내원경로세부는 특수문자 입력불가능합니다.");
		return false;
	}
	if(wordch($("#remark_cn").val()) == false)
	{
		alert("특이사항에는 특수문자 입력불가능합니다.");
		return false;
	}
	 
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
					console.log(data);
					$("#cust_no").val(data.cust_no);
					console.log($("#cust_no").val());
					alert("고객이 저장되었습니다.");
					console.log($("#cust_no").val());
				}, error : function(request,status,error) {
				        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	});
 }
 
 function cust_modify()
 {
	 if($("#cust_single_modify").val() == "편집")
	{
		$("#cust_single_modify").val("저장");
		$("#cust_single_modify").removeClass("func_btn");
		$("#cust_single_modify").addClass("tr_btn");

		$("#cust_name").prop("readonly", false);
		$("#resident_no").prop("readonly", false);
		$("#chart_no").prop("readonly", false);
		$("#cust_id").prop("readonly", false);
		$("#reason_cd").prop("readonly", false);
		$("#remark_cn").prop("readonly", false);

		$("#visit_cd").prop("disabled", false);
		$("#visit_dtl_cd").prop("disabled", false);
		
		return false;
	}
	if($("#cust_single_modify").val() == "저장")
	{
		cust_modify_save();
	}
	 
 }
 
// 고객 수정
function cust_modify_save() 
{
	if($("#cust_name").val() == null || $("#cust_name").val() == "")
	{
		alert("고객명을 입력하세요.");
		return false;
	}
	if($("#visit_cd").val() == null || $("#visit_cd").val() == "")
	{
		alert("내원경로를 선택해주세요.");
		return false;
	}
	if($("#visit_dtl_cd").val() == null || $("#visit_dtl_cd").val() == "")
	{
		alert("내원경로상세를 선택해주세요.");
		return false;
	}
	if(wordch($("#visit_cn").val()) == false)
	{
		alert("내원경로세부는 특수문자 입력불가능합니다.");
		return false;
	}
	if(wordch($("#remark_cn").val()) == false)
	{
		alert("특이사항에는 특수문자 입력불가능합니다.");
		return false;
	}
	
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
function cust_phone_add() {
	var cust_no = $("#cust_no").val();
	
	console.log(cust_no);
	
    var tbody = $('#table_tbody');
    var phoneTypeCdList_contents = '';
    var phoneCountryCdList_contents = '';

    for(var i=0;i < phoneTypeCdList.length; i++){
    	phoneTypeCdList_contents += "<option value='"+phoneTypeCdList[i]+"'>"+phoneTypeCdList[++i]+"</option>";
	}
    
    for(var i=0;i < phoneCountryCdList.length; i++){
    	phoneCountryCdList_contents += "<option value='"+phoneCountryCdList[i]+"'>"+phoneCountryCdList[++i]+"</option>";
	}
	var tbodyContent = "<tr>"+
							"<td style='width: 2%; text-align: center;'><input type='checkbox' class='del_chk' name='del_chk'></td>" +
							"<td>" +
								"<select id='phone_type_cd' name='phone_type_cd'" +
									"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
									"<option value=''>선택</option>"+ 
									phoneTypeCdList_contents + 
								"</select>"+
							"</td>"+
							"<td>"+
								"<select id='phone_country_cd' name='phone_country_cd' " + 
										"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
									"<option value=''>선택</option>" +
									phoneCountryCdList_contents +
								"</select>" +
							"</td>"+
							
							"<td>"+
								"<input type='text' id='phone_area_no' name='phone_area_no' style='width: 90%;'> " +
							"</td>" +
							"<td>"+
								"<input type='text' id='phone_no' name='phone_no' style='width: 90%;'>" + 
							"</td>" +
							"<td style='width: 2%; text-align: center;'>" +
								"<input id='custPhoneChk' class='phone_primary_yn' type='checkbox' />" +
							"</td>" +

						"</tr>";
	
	// 새로 그려준다.
	tbody.append(tbodyContent);
    
}

// 테이블 행 삭제
function cust_remove()
{
	var checkbox=$('#custP_form_tbl tbody').find('input[type=checkbox]:checked');	// 체크된 체크박스를 담는다.
	var delTr = checkbox.parent().parent();											// 체크된 체크박스의 tr을 담는다.
	
	console.log(delTr);
	
	delTr.remove();
	
	var table_tbody = document.getElementById('table_tbody');
//    if (table_tbody.rows.length < 1) return;
//     my_tbody.deleteRow(0); // 상단부터 삭제
//    table_tbody.deleteRow( table_tbody.rows.length-1 ); // 하단부터 삭제
	
}

// 전화번호 등록
//function cust_phone_save(cust_no)
function cust_phone_save()
{
	var cust_no = $("#cust_no").val();
	var phone_type_cd = [];
	var country_cd	  = [];
	var phone_area_no = [];
	var phone_no      = [];
	var primary_yn;
	var custPlist     = [];
	
	var tbody = $("#table_tbody");
	var tbodyContent = "";
	
	$("#table_tbody tr").each(function() {
		console.log($(this).children().eq(5).children().eq(0).prop('checked'));
		var tmp = $(this).children().eq(5).children().eq(0).prop('checked');
		
		if(tmp == true)
			primary_yn ="Y";
		else
			primary_yn= "N";
			
		
		console.log($(this).children().eq(1).children().eq(0).val());
		phone_type_cd.push($(this).children().eq(1).children().eq(0).val());
		country_cd.push($(this).children().eq(2).children().eq(0).val());
		phone_area_no.push($(this).children().eq(3).children().eq(0).val());
		phone_no.push($(this).children().eq(4).children().eq(0).val());
		
		custPlist.push(phone_type_cd.pop());
		custPlist.push(country_cd.pop());
		custPlist.push(phone_area_no.pop());
		custPlist.push(phone_no.pop());
		custPlist.push(primary_yn);
		
	});
	console.log(custPlist);
	$.ajax({
		url : ctx + '/custPhoneSave',
		type : 'POST',
		dataType : 'json',
		data : {
			cust_no : cust_no,
			custPlist : custPlist
		},
		success:function(data){
			console.log(data);
			tbody.children().remove();
			alert("전화번호가 등록되었습니다.");
			
			var size = data.length;
			
			for(var i=0; i<size; i++)
			{
				var phoneTypeCdList_contents = '';
			    var phoneCountryCdList_contents = '';
			    
				for(var j=0;j < phoneTypeCdList.length; j++)
				{
					if(phoneTypeCdList[j] == data[i].phone_type_cd)
						phoneTypeCdList_contents += "<option value='"+phoneTypeCdList[j]+"' selected='selected'>"+phoneTypeCdList[++j]+"</option>";
					else
						phoneTypeCdList_contents += "<option value='"+phoneTypeCdList[j]+"'>"+phoneTypeCdList[++j]+"</option>";
				}
			    
			    for(var k=0;k < phoneCountryCdList.length; k++)
			    {
			    	if(phoneCountryCdList[k] == data[i].phone_country_cd)
			    		phoneCountryCdList_contents += "<option value='"+phoneCountryCdList[k]+"' selected='selected'>"+phoneCountryCdList[++k]+"</option>";
			    	else
			    		phoneCountryCdList_contents += "<option value='"+phoneCountryCdList[k]+"'>"+phoneCountryCdList[++k]+"</option>";
				}
			    
				tbodyContent = "<tr>"+
					"<td style='width: 2%; text-align: center;'><input type='checkbox' class='del_chk' name='del_chk'></td>" +
					"<td>" +
						"<select id='phone_type_cd' name='phone_type_cd'" +
							"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
							"<option value=''>선택</option>"+ 
							phoneTypeCdList_contents + 
							"</select>"+
					"</td>"+
					"<td>"+
						"<select id='phone_country_cd' name='phone_country_cd' " + 
							"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
							"<option value=''>선택</option>" +
							phoneCountryCdList_contents +
							"</select>" +
					"</td>"+
					"<td>"+
						"<input type='text' id='phone_area_no' name='phone_area_no' style='width: 90%;' value='"+data[i].phone_area_no+"'> " +
					"</td>" +
					"<td>"+
						"<input type='text' id='phone_no' name='phone_no' style='width: 90%;' value='"+data[i].phone_no+"'> " + 
					"</td>";
				
					if(data[i].primary_yn == "Y")
					{
						tbodyContent += "<td style='width: 2%; text-align: center;'>" +
						"<input id='custPhoneChk' class='phone_primary_yn' type='checkbox' checked='checked'/>" +
						"</td>" +
						"</tr>";
					}
					else
					{
						tbodyContent += "<td style='width: 2%; text-align: center;'>" +
						"<input id='custPhoneChk' class='phone_primary_yn' type='checkbox'" +
						"</td>" +
						"</tr>";
					}
					
				tbody.append(tbodyContent);
			}
		},
		error:function(request){
			alert("error : " + request.status)
		}
	});
}

// 우편 테이블 행 추가
function cust_address_add()
{
	var cust_no = $("#cust_no").val();
	console.log(cust_no);

	var tbody = $('#tableAddr_tbody');
	var addrTypeCdList_contents = '';

	for(var i=0;i < addrTypeCdList.length; i++)
	{
		addrTypeCdList_contents += "<option value='"+addrTypeCdList[i]+"'>"+phoneTypeCdList[++i]+"</option>";
	}

	var tbodyContent = "<tr>"+
							"<td style='width: 2%; text-align: center;'><input type='checkbox' class='del_chk' name='del_chk'></td>" +
							"<td>" +
								"<select id='addr_type_cd' name='addr_type_cd'" +
									"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
									"<option value=''>선택</option>"+ 
									addrTypeCdList_contents + 
								"</select>"+
							"</td>"+
							"<td>"+
								"<input type='text' id='postcodify_search' class='postcodify postcodify_postcode5 postcodify_search_button' onclick='postPop();' name='zip_no' style='width: 90%;'> " +
							"</td>" +
							"<td>"+
								"<input type='text' id='main_address' class='postcodify postcodify_address' name='main_address' style='width: 90%;'> " + 
							"</td>" +
							"<td>"+
							"<input type='text' id='detail_address' class='postcodify postcodify_details' name='detail_address' style='width: 90%;'> " + 
							"</td>" +
							"<td style='width: 2%; text-align: center;'>" +
								"<input id='custAddrChk' class='addr_primary_yn' type='checkbox' />" +
							"</td>" +
						"</tr>";

	// 새로 그려준다.
	tbody.append(tbodyContent);
	
	$(".postcodify_search_button").postcodifyPopUp();
}

//테이블 행 삭제
function custAddr_remove() {
	
	var checkbox=$('#custA_form_tbl tbody').find('input[type=checkbox]:checked');	// 체크된 체크박스를 담는다.
	var delTr = checkbox.parent().parent();											// 체크된 체크박스의 tr을 담는다.
//	var delQty = checkbox.parent().parent().children().eq(4).children().val();		// 체크된 체크박스의 item의 수량을 담는다.
	
	console.log(delTr);
	
	delTr.remove();
	
	var table_tbody = document.getElementById('tableAddr_tbody');
//    if (table_tbody.rows.length < 1) return;
//     my_tbody.deleteRow(0); // 상단부터 삭제
//    table_tbody.deleteRow( table_tbody.rows.length-1 ); // 하단부터 삭제
	
}

//function cust_addr_save(cust_no)
function cust_addr_save()
{
	var cust_no = $("#cust_no").val();
	var addr_type_cd   = [];
	var zip_no	  	   = [];
	var main_address   = [];
	var detail_address = [];
	var primary_yn;
	var custAlist      = [];
	
	var checkbox=$('#custP_form_tbl tbody').find('input[type=checkbox]:checked');	// 체크된 체크박스를 담는다.
	var delTr = checkbox.parent().parent();
	
	var tbody = $("#tableAddr_tbody");
	var tbodyContent = "";
	
	$("#tableAddr_tbody tr").each(function() {
		var tmp = $(this).children().eq(5).children().eq(0).prop('checked');
		
		if(tmp == true)
			primary_yn ="Y";
		else
			primary_yn= "N";
		
		addr_type_cd.push($(this).children().eq(1).children().eq(0).val());
		zip_no.push($(this).children().eq(2).children().eq(0).val());
		main_address.push($(this).children().eq(3).children().eq(0).val());
		detail_address.push($(this).children().eq(4).children().eq(0).val());
		
		custAlist.push(addr_type_cd.pop());
		custAlist.push(zip_no.pop());
		custAlist.push(main_address.pop());
		custAlist.push(detail_address.pop());
		custAlist.push(primary_yn);
	});
	
	console.log(cust_no);
	console.log(custAlist);
	
	$.ajax({
		url : ctx + '/custAddrSave',
		type : 'POST',
		dataType : 'json',
		data : {
			cust_no : cust_no,
			custAlist : custAlist
		},
		success:function(data){
			console.log(data);
			tbody.children().remove();
			
			alert("우편번호가 입력되었습니다.");
			
			var size = data.length;
			
			for(var i=0; i<size; i++)
			{
				var addrTypeCdList_contents = '';

				for(var j=0; j < addrTypeCdList.length; j++)
				{
					if(addrTypeCdList[j] == data[i].addr_type_cd)
						addrTypeCdList_contents += "<option value='"+addrTypeCdList[j]+"' selected='selected'>"+phoneTypeCdList[++j]+"</option>";
					else
						addrTypeCdList_contents += "<option value='"+addrTypeCdList[j]+"'>"+phoneTypeCdList[++j]+"</option>";
					
				}
			    
				tbodyContent = "<tr>"+
					"<td style='width: 2%; text-align: center;'><input type='checkbox' class='del_chk' name='del_chk'></td>" +
					"<td>" +
						"<select id='addr_type_cd' name='addr_type_cd'" +
							"style='margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;'>" +
							"<option value=''>선택</option>"+ 
							addrTypeCdList_contents + 
							"</select>"+
					"</td>"+
					"<td>"+
						"<input type='text' id='zip_no' name='zip_no' style='width: 90%;' value='"+data[i].zip_no+"'> " +
					"</td>" +
					"<td>"+
						"<input type='text' id='main_address' name='main_address' style='width: 90%;' value='"+data[i].main_address+"'> " + 
					"</td>" +
					"<td>"+
						"<input type='text' id='detail_address' name='detail_address' style='width: 90%;' value='"+data[i].detail_address+"'> " + 
					"</td>";
				
					if(data[i].primary_yn == "Y")
					{
						tbodyContent += "<td style='width: 2%; text-align: center;'>" +
						"<input id='custAddrChk' class='addr_primary_yn' type='checkbox' checked='checked'/>" +
						"</td>" +
						"</tr>";
					}
					else
					{
						tbodyContent += "<td style='width: 2%; text-align: center;'>" +
						"<input id='custAddrChk' class='addr_primary_yn' type='checkbox'" +
						"</td>" +
						"</tr>";
					}
				tbody.append(tbodyContent);
			}
		},
		error:function(request){
			alert("error : " + request.status)
		}
		
	});
}

/*  Excel  */
//엑셀 Import 팝업	
function excelImportOpen() 
{
	var popWidth  = '520'; // 파업사이즈 너비
	var popHeight = '160'; // 팝업사이즈 높이
	var winHeight = document.body.clientHeight;	// 현재창의 높이
	var winWidth = document.body.clientWidth;	// 현재창의 너비
	var winX = window.screenLeft;	// 현재창의 x좌표
	var winY = window.screenTop;	// 현재창의 y좌표

	var popX = winX + (winWidth - popWidth)/2;
	var popY = winY + (winHeight - popHeight)/2;
	var popUrl = "excelImportTab";
	var popOption = "width=520, height=160, resize=no, scrollbars=no, status=no, location=no, directories=no; ,top=pop,left=popX";
	window.open(popUrl, "_blank","width="+popWidth+"px,height="+popHeight+"px,top="+popY+",left="+popX);
}

//엑셀파일 insert
function check()
{
    var excelFile = $("#excelFile").val();
    
    if (excelFile == "" || excelFile == null) 
    {
        alert("파일을 선택해주세요.");
        
        return false;
    } 
    else if (!checkFileType(excelFile)) 
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
function checkFileType(filePath) 
{
	var fileFormat = filePath.split(".");
	
	if (fileFormat.indexOf("xlsx") > -1) {
		return true;
	} 
	else {
		return false;
	}

}


//엑셀 출력 적용 함수
function download_list_Excel(formID, flg) {
	
	var t = flg;
	var ctx = $("#ctx").val();
	var form = $("#"+formID);
	var excel = $('<input type="hidden" value="true" name="excel">');
	var flg = $("<input type='hidden' value='"+ flg +"' name='flg'>");
	
	if(confirm("엑셀로 출력하시겠습니까? 대량의 경우 대기시간이 필요합니다.")) 
	{
		
		form.append(excel);
		form.append(flg);
		
		if(flg == 0) 
		{
			form.attr("action", "/toCustExcel");
			form.submit();
			
		} 
		else(flg == 1) 
		{
			form.attr("action", "/toCustExcel");
			form.submit();
//			form.attr("action", "/task_sch");
//			form.submit();
		}
	} 
	$("input[name=excel]").val("");
}













