function doPopupOpenCust() {
	//id 초기화
	$("#id").val('');
	//고객명 초기화
	$("#cust_name").val('');
	//핸드폰 번호 초기화
	$('#hp1').val('');
	$('#hp2').val('');
	$('#hp3').val('');
	
	// 팝업창 표시
	$.blockUI({ message: $('#custModalDiv'),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '800px',
    	'height': '500px',
    	'cursor': 'default'
    	}
	});
	
	$("#pageNum").val("1");
	
	// 가맹점목록 표시
	viewCustList(1);
}

/**
 * 팝업창 고객목록 표시
 */
function viewCustList(custPageNum) {
	var ctx = $("#ctx").val();
	var hp1 = $("#hp1").val();
	var hp2 = $("#hp2").val();
	var hp3 = $("#hp3").val();
	
	$("#hp_no").val("" + hp1 + hp2 + hp3);
	// 비동기로 form 데이타 전송
	var sendData = "id="+$("#id").val()+"&cust_name="+$("#cust_name").val()
	+"&hp_no="+$("#hp_no").val()
	+"&custPageNum="+custPageNum;
	$.ajax({
		url: ctx + "/ListAjaxCust", 
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",
		success: function(data) {//리턴된값 
			// div 내용삭제
			$("#divDetailTableCust").empty();
			// 테이블 내용 추가
			$.each(data.custList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#custListTableHeader").clone().removeClass().empty();
				var pr_key_wid = this.pr_key_wid;
				var cust_wid = this.cust_wid;
				var id = this.id;
				var cust_name = this.cust_name;
				var hp_no = this.hp_no;
				if(hp_no == null){
					hp_no ="";
				}
				if(cust_name == null){
					cust_name ="";
				}
				// TR에 클릭이벤트 추가
				trElement.bind("click", function(e) {
					// 팝업창 닫기
					custPopupClose();
					setKeyWid(pr_key_wid);
					$("#cust_wid").val(cust_wid);
					$("#cust_name").val(cust_name);
					$("#id").val(id);
				});
				
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				// TR 작성
				$("#divDetailTableCust").append(trElement);
				$("#divDetailTableCust tr:last").append("<td class='list1_b' align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.custPageNum) - 1) * 10)) + "</td>"
						+ "<td class='list1_b' width='20%' style='text-align:left;'>&nbsp;&nbsp;" + this.id + "</td>"
						+ "<td class='list1_b' width='20%' style='text-align:left;'>&nbsp;&nbsp;" + cust_name + "</td>"
						+ "<td class='list1_b' width='25%' style='text-align:right;'>" + hp_no + "&nbsp;&nbsp;</td>"
						+ "<td class='list1_b' width='25%' style='text-align:right;'>" + pr_key_wid + "&nbsp;&nbsp;</td>");
				var pageContent = "";
				// 페이징 다시그리기
				$("#custPagingDiv").children().remove();
				
				if(data.custPage.startPageNum == 1 && data.custPage.endPageNum == 1 || data.custPage.endPageNum == 0){
					pageContent = "<input type='hidden' id='custPageNum' name='custPageNum' value='"+data.custPageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.custPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='custPageInput' readonly='readonly' value='"+data.custPage.startPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a> / "+data.custPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.custPageNum == data.custPage.startPageNum){
					pageContent = "<input type='hidden' id='custPageNum' name='custPageNum' value='"+data.custPageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.custPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='custPageInput' value='"+data.custPage.startPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a style='cursor: pointer;' onclick=viewCustList("+data.custPage.endPageNum+") id='pNum'> / "+data.custPage.endPageNum+"</a>"
					+"<a style='cursor: pointer;' onclick=viewCustList("+(data.custPageNum+1)+") id='pNum'> ▶ </a>";
				} else if(data.custPageNum == data.custPage.endPageNum){
					pageContent = "<input type='hidden' id='custPageNum' name='custPageNum' value='"+data.custPageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.custPage.endPageNum+"'/>"
					+"<a style='cursor: pointer;' onclick=viewCustList("+(data.custPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='custPageInput' value='"+data.custPage.endPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a> / "+data.custPage.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='custPageNum' name='custPageNum' value='"+data.custPageNum+"'/><input type='hidden' id='custEndPageNum' value='"+data.custPage.endPageNum+"'/>"
					+"<a style='cursor: pointer;' onclick=viewCustList("+(data.custPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='custPageInput' value='"+data.custPageNum+"' onkeypress=\"custPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a style='cursor: pointer;' onclick=viewCustList("+data.custPage.endPageNum+") id='pNum'> / "+data.custPage.endPageNum+"</a>"
					+"<a style='cursor: pointer;' onclick=viewCustList("+(data.custPageNum+1)+") id='pNum'> ▶ </a>";
				}
				$("#custPagingDiv").append(pageContent);
			});
			
			if (data.custList.length < 10) {
				for (var int = 0; int < 10-data.custList.length; int++) {
					$("#divDetailTableCust").append("<tr style='background-color: white; cursor: default;'><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>");
				}
			}
			
			// 검색된 가맹점목록이 없을경우 표시
			if (data.custList.length == 0) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#custListTableHeader").clone().removeClass().empty();
				$("#divDetailTableCust").append(trElement);
				$("#divDetailTableCust tr:last").append("<td class='list1_b' colspan='5' " +
						"align='center'>검색 결과가 없습니다</td>");
			}
		},

		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("고객목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

// 고객 리스트 엔터키 기능
function custPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var custPageNum = parseInt($("#custPageInput").val());
			if (custPageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#custPageInput").focus();
			} else if(custPageNum > parseInt($("#custEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#custPageInput").val($("#custPageNum").val());
				$("#custPageInput").focus();
			} else {
				viewCustList(custPageNum);
			}
		}
		event.stopPropagation();
	});
}

// PopUp Box 비표시
function custPopupClose() {
	setTimeout($.unblockUI, 0);
}

/**
* 팝업창 가맹점목록 표시
*/
function setKeyWid(keyWid){
	$("#key_wid").val(keyWid);

}

// reset 버튼
function resetCust() {
	$("#key_wid").val("");
}

function setDelPointInput(){
	if($("#trns_div").val()=="1200")
		$("#th_del_point").html("차감포인트").attr('style', 'color:black;');
	else{
		$("#th_del_point").html("*차감포인트").attr('style', 'color:red;');
	}
}

//숫자 체크 함수
function isNumber(str, length, inx){
	var chars = "0123456789"; 

    if (chars.indexOf(str.charAt(inx)) != -1){
        return true;
    }else{
    	return false;	
    }
}

function numCheck(obj){

	var str = $(obj).val();

	var vlength = str.length;
	
	for(var i=0; i<vlength; i++){
		var rtn = isNumber(str, vlength, i);

		if(vlength > 0 && rtn == false){
			alert("숫자만 입력해 주세요.");
			$(obj).attr("value",getRemovedStrNum(obj));
			$(obj).focus();
			return;
		}
	}
}

//가맹점 구분 Text 설정
function setStoreUpId(){
	var sVal = "";
	
	$("#brand_wid option:selected").each(function(){
		sVal = $(this).val();
	});
	
	$("#up_id").attr("value",sVal);
	
	// 가맹점 정보 초기화
	resetStore();
}

//가맹점 검색조건 초기화
function resetStore() {
	$('#store_name').val('');
	$('#store_wid').val('');
}

//유효기간 Vallidation 체크
function validateDate(obj,str) {
	var val = obj.value.split("-");
	var res = val[0];
	if(val[1] != null && val[1].length == 1) {
		val[1] = "-0" + val[1];
	} else if(val[1] != null && val[1].length > 1) {
		val[1] = "-" + val[1];
	}
	
	if(val[2] != null && val[2].length == 1) {
		val[2] = "-0" + val[2];
	} else if(val[2] != null && val[2].length > 1) {
		val[2] = "-" + val[2];
	}

	if(val[1] != null) {
		res += val[1];
	}
	if(val[2] != null) {
		res += val[2];
	}

	$(obj).val(res);
}

//시간 check
function validateHour(obj,str) {
	var val = obj.value;

	if (val == null) {
		return;
	}

	val = val.replace(" ", "");

	if (val == "") {
		$(obj).val("");
		return;
	}

	val = 1 * val;

	if (val < 0 || val > 23) {
		alert("시를 정확히 입력해 주세요. ");
		$(obj).val("");
		return;
	}

	if (val * 1 < 10) {
		val = "0" + val;
	}
	
	$(obj).val(val);
}

function validateMin(obj,str) {
	var val = obj.value;

	if (val == null) {
		return;
	}

	val = val.replace(" ", "");

	if (val == "") {
		$(obj).val("");
		return;
	}

	val = 1 * val;

	if (val < 0 || val > 59) {
		alert("분을 정확히 입력해 주세요. ");
		$(obj).val("");
		return;
	}

	if (val * 1 < 10) {
		val = "0" + val;
	}
	
	$(obj).val(val);
}

function validateSec(obj,str) {
	var val = obj.value;

	if (val == null) {
		return;
	}

	val = val.replace(" ", "");

	if (val == "") {
		$(obj).val("");
		return;
	}

	val = 1 * val;

	if (val < 0 || val > 59) {
		alert("초를 정확히 입력해 주세요. ");
		$(obj).val("");
		return;
	}

	if (val * 1 < 10) {
		val = "0" + val;
	}
	
	$(obj).val(val);	
}

/**
 * 거래처리
 */
function trnsProcAjax() {
	var ctx = $("#ctx").val();
	var trns_wid = $("#trns_wid").val();
	
	if (trns_wid != null && trns_wid != "") {
		alert("Reset 후 전송해 주세요.");
		//return;
	}
	
	var key_wid = $("#key_wid").val();

	if (key_wid == null || key_wid == "") {
		alert("번호(카드) 입력 후 전송해 주세요.");
		return;
	}
	
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var trns_pos_div = $("#trns_pos_div").val();

	if (brand_wid == null || brand_wid == "") {
		alert("브랜드명 선택 후 전송해 주세요.");
		return;
	}
	
	if (store_wid == null || store_wid == "") {
		alert("가맹점 선택 후 전송해 주세요.");
		return;
	}

	if (trns_pos_div == null || trns_pos_div == "") {
		alert("전송기관코드 선택 후 전송해 주세요.");
		return;
	}
	
	var trns_amt = $("#trns_amt").val();
	
	if (trns_amt == null ||  trns_amt == "") {
		alert("거래금액 입력 후 전송해 주세요.");
		return;
	}
	
	if($("#trns_div").val()=="1400"){
		if($("#del_point").val()== "" || $("#del_point").val()== null){
			alert("차감포인트를 입력 후 전송해 주세요.");
			return;
		}
	}
		
	var sales_div = $("#sales_div").val();
	
	if (sales_div == null ||  sales_div == "") {
		alert("판매구분 선택 후 전송해 주세요.");
		return;
	}
	
	if (!confirm("저장하시겠습니까?")) {
		return;
	}
	var use_day = $("#use_day_formatted").val();
	var use_day_arr = use_day.split("-");
	var use_day = use_day_arr.join("");
	
	var use_time_hour = $("#use_time_hour").val();
	var use_time_min = $("#use_time_min").val();
	var use_time_sec = $("#use_time_sec").val();

	$("#use_day").val(use_day);
	$("#use_time").val(use_time_hour + use_time_min + use_time_sec);

	// 비동기로 form 데이타 전송
	var data = $("form[name=trnsProcForm]").serialize();
	$.ajax({
		type: "POST",  
		url: ctx + "/TrnsProcAjax",   
		data: data,
		success: function(data) { 
			var rtn_resp_message_cd = data.rtn_vo.resp_message_cd;

			if (rtn_resp_message_cd == "00") {
				alert("정상 처리되었습니다.");
				var trns_day = data.rtn_vo.trns_day;
				trns_day = trns_day.substr(0, 4) + "-" + trns_day.substr(4, 2) + "-" + trns_day.substr(6, 2);
 				
				var trns_time = data.rtn_vo.trns_time;
				var trns_time_hour = trns_time.substr(0, 2);
				var trns_time_min = trns_time.substr(2, 2);
				var trns_time_sec = trns_time.substr(4, 2);

				$("#trns_wid").val(data.rtn_vo.trns_wid);
				$("#resp_wid").val(data.rtn_vo.resp_wid);
				$("#tot_point").val(data.rtn_vo.tot_point);
				$("#trns_day").val(trns_day);
				$("#trns_time_hour").val(trns_time_hour);
				$("#trns_time_min").val(trns_time_min);
				$("#trns_time_sec").val(trns_time_sec);
			}
			else {
				alert("error code : " + data.rtn_vo.resp_message_cd + "\n" + data.rtn_vo.resp_message_nm);
			}
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("거래를 처리하지 못했습니다.");
			return false;
		}
	});
}

function uploadExcel() {
	var tbody = $('#workTableTbody');
	var tbodyContent = "";
	if($("#file").val() == null || $("#file").val() == '') {
		alert("파일을 선택해 주세요.");
	} else {
		//$("#uploadForm").submit();
		var options = {
				success: function(data) {
					alert("엑셀 업로드가 성공했습니다.");
					clearFileField();
					tbody.children().remove();
					for (var i = 0; i < data.work_log_list.length; i++) {
						tbodyContent = "<tr onclick=workDetail('"+data.work_log_list[i].work_log_key+"',1);>" +
						"<td><input type='hidden' id='work_log_key' name='work_log_key' value='"+data.work_log_list[i].work_log_key+"'>"+(i+1)+"</td>" +
						"<td>"+data.work_log_list[i].work_file_nm+"</td>" +
						"<td>"+data.work_log_list[i].work_start_dt+"</td>" +
						"<td>"+data.work_log_list[i].work_end_dt+"</td>" +
						"<td>"+data.work_log_list[i].work_stat_cd+"</td>" +
						"<td style='text-align: right;'>"+data.work_log_list[i].work_tgt_cnt+"</td>" +
						"<td style='text-align: right;'>"+data.work_log_list[i].work_scs_cnt+"</td>" +
						"<td style='text-align: right;'>"+data.work_log_list[i].work_fail_cnt+"</td>" +
						"</tr>";
						tbody.append(tbodyContent);
					}
					var pageContent = "";
					// 페이징 다시그리기
					$(".pagingDiv").empty();
					
					if(data.workPage.startPageNum == 1 && data.workPage.endPageNum == 0 || data.workPage.endPageNum == 1){
						pageContent = "<input type='hidden' id='trnsPageNum' value='1' readonly='readonly'/>"
						+"◀ <input type='text' id='pageInput' readonly='readonly' value='1'/> / 1 ▶";
				    } else if(data.pageNum == data.workPage.startPageNum){
						pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
						+"◀ <input type='text' id='pageInput' value='"+data.workPage.startPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>" 
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.workPage.endPageNum+");\" id='pNum'> / "+data.workPage.endPageNum+"</a>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum+1)+");\" id='pNum'> ▶ </a>";
					} else if(data.pageNum == data.workPage.endPageNum){
						pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum-1)+");\" id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' value='"+data.workPage.endPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.page.endPageNum+");\" id='pNum'> / "+data.workPage.endPageNum+"</a> ▶";
					} else {
						pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum-1)+");\" id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.page.endPageNum+");\" id='pNum'>/ " +data.workPage.endPageNum+"</a>"
						+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum+1)+");\" id='pNum'> ▶ </a>";
					}
					$(".pagingDiv").append(pageContent);
			    },
			    error: function(data){
			        alert("업로드중 에러가 발생하였습니다.");
			        clearFileField();
			    }
		};
		$("#uploadForm").ajaxSubmit(options);
	}
}

function clearFileField(){
	$("#file").remove();
	$("#excelUpload").remove();
	$("#fileDiv").append("<input name='file' id='file' type='file' size='65' onchange='file_check(this);'>")
	.append("<input type='button' id='excelUpload' value='엑셀업로드' style='margin: 1% 0 1% 1%;' onclick=uploadExcel();>")
}

// 작업로그 조회
function workReset() {
	var ctx = $("#ctx").val();
	var tbody = $('#workTableTbody');
	var tbodyContent = "";
	$.ajax({
		type: "POST",  
		url: ctx + "/WorkReset",   
		success: function(data) { 
			alert("조회되었습니다.");
			tbody.children().remove();
			for (var i = 0; i < data.work_log_list.length; i++) {
				tbodyContent = "<tr onclick=workDetail('"+data.work_log_list[i].work_log_key+"',1);>" +
				"<td><input type='hidden' id='work_log_key' name='work_log_key' value='"+data.work_log_list[i].work_log_key+"'>"+(i+1)+"</td>" +
				"<td>"+data.work_log_list[i].work_file_nm+"</td>" +
				"<td>"+data.work_log_list[i].work_start_dt+"</td>" +
				"<td>"+data.work_log_list[i].work_end_dt+"</td>" +
				"<td>"+data.work_log_list[i].work_stat_cd+"</td>" +
				"<td style='text-align: right;'>"+data.work_log_list[i].work_tgt_cnt+"</td>" +
				"<td style='text-align: right;'>"+data.work_log_list[i].work_scs_cnt+"</td>" +
				"<td style='text-align: right;'>"+data.work_log_list[i].work_fail_cnt+"</td>" +
				"</tr>";
				tbody.append(tbodyContent);
			}
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("조회를 처리하지 못했습니다.");
			return false;
		}
	});
}

// 작업로그상세
function workDetail(work_log_key, pageNum) {
	var ctx = $("#ctx").val();
	var tbody = $('#workDetailTableTbody');
	var tbodyContent = "";
	var sendData = "work_log_key="+work_log_key+"&pageNum="+pageNum
	
	$("#work_log_key").val(work_log_key);
	
	//$("#workTableTbody > tr").css("background-color", "white");
	
	$.ajax({
		type: "POST",
		data : sendData,
		dataType : "json",
		url: ctx + "/WorkDetailList",   
		success: function(data) {
			tbody.children().remove();
			if(data.work_detail_list.length == 0){
				tbodyContent = "<tr><td colspan='10' style='height: 283px; cursor: default;' onmouseover=this.style.background='white'><b>검색 결과가 없습니다.</b></td></tr>";
				tbody.append(tbodyContent);
			}else{
				for (var i = 0; i < data.work_detail_list.length; i++) {
					tbodyContent = "<tr style='cursor: default;' onmouseover=this.style.background='white'>" +
					"<td><input type='hidden' id='work_log_key' name='work_log_key' value='"+data.work_detail_list[i].work_log_key+"'>"+(data.pageNum*10-9+i)+"</td>" +
					"<td>"+data.work_detail_list[i].trns_div_cd+"</td>" +
					"<td style='text-align: left;'>"+data.work_detail_list[i].key_wid+"</td>" +
					"<td>"+data.work_detail_list[i].brand_wid+"</td>" +
					"<td>"+data.work_detail_list[i].store_wid+"</td>" +
					"<td>"+data.work_detail_list[i].trns_pos_div+"</td>" +
					"<td style='text-align: right;'>"+data.work_detail_list[i].trns_amt+"</td>" +
					"<td style='text-align: right;'>"+data.work_detail_list[i].del_point+"</td>" +
					"<td>"+data.work_detail_list[i].sales_div_cd+"</td>" +
					"<td>"+data.work_detail_list[i].err_msg+"</td>" +
					"</tr>";
					tbody.append(tbodyContent);
				}
				if(data.work_detail_list.length < 10){
					for(var j = 0; j < 10-data.work_detail_list.length; j++){
						tbodyContent = "<tr style='height: 30px; cursor: default;' onmouseover=this.style.background='white'><td></td><td></td>" +
						"<td></td><td></td><td></td>" +
						"<td></td><td></td><td></td><td></td><td></td></tr>";
						tbody.append(tbodyContent);
					}
				}
			}
			var pageContent = "";
			// 페이징 다시그리기
			$("#pagingDiv").empty();
			
			if(data.page.startPageNum == 1 && data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "<input type='hidden' id='trnsPageNum' value='1' readonly='readonly'/>"
				+"◀ <input type='text' id='pageInput' readonly='readonly' value='1'/> / 1 ▶";
		    } else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
				+"◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>" 
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+ parseInt(data.page.endPageNum)+");\" id='pNum'> / "+data.page.endPageNum+"</a>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+(parseInt(data.pageNum)+1)+");\" id='pNum'> ▶ </a>";
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+(parseInt(data.pageNum)-1)+");\" id='pNum'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+ parseInt(data.page.endPageNum)+");\" id='pNum'> / "+data.page.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+(parseInt(data.pageNum)-1)+");\" id='pNum'> ◀ </a>"
				+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+parseInt(data.page.endPageNum)+");\" id='pNum'> / "+data.page.endPageNum+"</a>"
				+"<a style='cursor: pointer;'  onclick=\"workDetail('"+data.work_log_key+"',"+(parseInt(data.pageNum)+1)+");\" id='pNum'> ▶ </a>";
			}
			$("#pagingDiv").append(pageContent);
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("조회를 처리하지 못했습니다.");
			return false;
		}
	});
}

//페이지 엔터키 기능
function TrnsInputEnter(event) {
	$(document).ready(function() {
		var work_log_key = $("#work_log_key").val();
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else {
				workDetail(work_log_key, pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 작업로그 페이징
function workPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tbody = $('#workTableTbody');
		var tbodyContent = "";
		// 동적 폼생성 POST 전송
		/*var $form = $('<form></form>');
		$form.attr('action', ctx+'/trnsProcInitInfo');
		$form.attr('method', 'post');
		$form.appendTo('body');
		var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    $form.append(pageNum_input)
	    $form.submit();*/
		$.ajax({
			type: "POST",  
			data: "pageNum="+pageNum,
			dataType: "json",
			url: ctx + "/WorkReset",   
			success: function(data) {
		tbody.children().remove();
		for (var i = 0; i < data.work_log_list.length; i++) {
			tbodyContent = "<tr onclick=workDetail('"+data.work_log_list[i].work_log_key+"',1);>" +
			"<td><input type='hidden' id='work_log_key' name='work_log_key' value='"+data.work_log_list[i].work_log_key+"'>"+(data.pageNum*5-4+i)+"</td>" +
			"<td>"+data.work_log_list[i].work_file_nm+"</td>" +
			"<td>"+data.work_log_list[i].work_start_dt+"</td>" +
			"<td>"+data.work_log_list[i].work_end_dt+"</td>" +
			"<td>"+data.work_log_list[i].work_stat_cd+"</td>" +
			"<td style='text-align: right;'>"+data.work_log_list[i].work_tgt_cnt+"</td>" +
			"<td style='text-align: right;'>"+data.work_log_list[i].work_scs_cnt+"</td>" +
			"<td style='text-align: right;'>"+data.work_log_list[i].work_fail_cnt+"</td>" +
			"</tr>";
			tbody.append(tbodyContent);
		}
		var pageContent = "";
		// 페이징 다시그리기
		$(".pagingDiv").empty();
		
		if(data.workPage.startPageNum == 1 && data.workPage.endPageNum == 0 || data.workPage.endPageNum == 1){
			pageContent = "<input type='hidden' id='trnsPageNum' value='1' readonly='readonly'/>"
			+"◀ <input type='text' id='pageInput' readonly='readonly' value='1'/> / 1 ▶";
	    } else if(data.pageNum == data.workPage.startPageNum){
			pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
			+"◀ <input type='text' id='pageInput' value='"+data.workPage.startPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>" 
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.workPage.endPageNum+");\" id='pNum'> / "+data.workPage.endPageNum+"</a>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum+1)+");\" id='pNum'> ▶ </a>";
		} else if(data.pageNum == data.workPage.endPageNum){
			pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum-1)+");\" id='pNum'> ◀ </a>"
			+"<input type='text' id='pageInput' value='"+data.workPage.endPageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.workPage.endPageNum+");\" id='pNum'> / "+data.workPage.endPageNum+"</a> ▶";
		} else {
			pageContent = "<input type='hidden' id='endPageNum' value='"+data.workPage.endPageNum+"'/><input type='hidden' id='trnsPageNum' value='"+data.pageNum+"'/>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum-1)+");\" id='pNum'> ◀ </a>"
			+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"TrnsInputEnter(event);\"/>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+data.workPage.endPageNum+");\" id='pNum'>/ " +data.workPage.endPageNum+"</a>"
			+"<a style='cursor: pointer;'  onclick=\"workPaging("+(data.pageNum+1)+");\" id='pNum'> ▶ </a>";
		}
		$(".pagingDiv").append(pageContent);
    },
	beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
    error: function(data){
        alert("업로드중 에러가 발생하였습니다.");
        clearFileField();
    }
	});
	});
}