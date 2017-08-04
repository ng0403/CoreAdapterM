/**
업 무 명 : 쿠폰발송 화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 쿠폰발송에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	var pageNum = $("#hPageNum").val();

//	setUpType();
	setSendType();
	getCouponList(pageNum);
});

//회원/비회원발송 중 업로드타입
function setUpType(){
	if($("#cb_UpType").val()=="excel"){//엑셀업로드 선택시
		$("#cb_last_use_dt").attr("disabled",true);
		$("#cb_six_month_avg_cnt").attr("disabled",true);
		$("#cb_six_month_avg_amt").attr("disabled",true);
		$("#sendable_cnt_btn").attr("disabled",true);
		$("#today_sum").attr("value",""); //고객추출결과 초기화
		$("#target_sum").attr("value","");
		$("#sendable_cnt").attr("value","");

	}else{								  //고객추출 선택시
		$("#cb_last_use_dt").attr("disabled",false);
		$("#cb_six_month_avg_cnt").attr("disabled",false);
		$("#cb_six_month_avg_amt").attr("disabled",false);
		$("#sendable_cnt_btn").attr("disabled",false);
	}
}

//파일 클리어 후 다시 생성
function ListclearFileInputField(){
	$("#file").remove();	//파일 엘리멘트 삭제
	$("#span_file").append("<input name='file' id='file' type='file' onchange='getExcelCustCount()'; style='padding: 0.5%;'>");	//div에 파일엘리멘트 새로 생성
}

function setSendType(){
	if($("#cb_sendType").val()=="member"){	//회원선택시
		ListclearFileInputField();
		$("#file").attr("disabled",false);
		$("#cb_last_use_dt").attr("disabled",true);
		$("#cb_six_month_avg_cnt").attr("disabled",true);
		$("#cb_six_month_avg_amt").attr("disabled",true);
		$("#sendable_cnt_btn").attr("disabled",true);
		$("#cb_UpType").attr("disabled",false);
		$("#excel_member_cnt").attr("value","");
		$("#memberList").attr("style","");
		$("#excel_type").val("reg");
	}else{	//비회원 선택시
		ListclearFileInputField();
		$("#file").attr("disabled",false);
		$("#cb_last_use_dt").attr("value","");
		$("#cb_six_month_avg_cnt").attr("value","");
		$("#cb_six_month_avg_amt").attr("value","");
		$("#cb_last_use_dt").attr("disabled",true);
		$("#cb_six_month_avg_cnt").attr("disabled",true);
		$("#cb_six_month_avg_amt").attr("disabled",true);			
		$("#sendable_cnt_btn").attr("disabled",true);
		$("#cb_UpType").attr("disabled",true);
		$("#today_sum").attr("value","");
		$("#target_sum").attr("value","");
		$("#sendable_cnt").attr("value","");
		$("#excel_sendable_cnt").attr("value","");
		$("#last_use_dt").attr("value","");				//최근사용일자 hidden값을 초기화
		$("#six_month_avg_cnt").attr("value","");	//6개월 평균이용횟수 hidden값을 초기화
		$("#six_month_avg_amt").attr("value",""); //6개월 평균이용금액 hidden값을 초기화
		$("#excel_type").val("guest");
	}
}

//고객추출클릭시 건수조회
function getSendableCount() {
	var ctx = $("#ctx").val();
	var today_sum=0;
	var target_sum=0;
	var send_max=0;
	
	var data = "cb_last_use_dt="+$("#cb_last_use_dt").val()
	+"&cb_six_month_avg_cnt="+$("#cb_six_month_avg_cnt").val()
	+"&cb_six_month_avg_amt="+$("#cb_six_month_avg_amt").val();

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getSendableCountAjax",   
		data: data,
		dataType: "json",
		success: function(data) {

			$.each(data.sendableList, function(i) {
				switch(this.f_name){
					case "TODAY_SUM":	//당일발송건수
						today_sum = this.f_value;
						$("#today_sum").attr("value",this.f_value);		
						break;
					case "TARGET_SUM":	//추출대상건수
						target_sum = this.f_value;
						$("#target_sum").attr("value",this.f_value);	
						break;
					case "SEND_MAX":	//당일발송가능수
						send_max = this.f_value;
						$("#send_max").attr("value",this.f_value);	
						break;
				}
			});	
			
			if(target_sum > send_max-today_sum){
				alert("발송가능 건수가 일일최대 발송량 "+send_max+"건을 초과합니다");
				$("#sendable_cnt").attr("value",0);
			}else{
				alert("대상건수가 조회되었습니다.");
				$("#sendable_cnt").attr("value",target_sum);
			}
			$("#last_use_dt").attr("value",$("#cb_last_use_dt").val());				//최근사용일자 hidden값으로 설정
			$("#six_month_avg_cnt").attr("value",$("#cb_six_month_avg_cnt").val());	//6개월 평균이용횟수 hidden값으로 설정
			$("#six_month_avg_amt").attr("value",$("#cb_six_month_avg_amt").val()); //6개월 평균이용금액 hidden값으로 설정
			checkSendable();
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
		alert("대상건수를 취득하지 못했습니다.");
		return false;
		}
	});
}

//쿠폰선택, 추출완료시 발송신청 버튼활성  
function checkSendable(){
	if($('#cb_UpType').val()=="list"){	//발송구분이 회원이면서 고객추출일때
		if($("#excel_sendable_cnt").val()>0 && ($("#cupn_wid_excel").val().length > 0 ))	//발송가능건수가 1건 이상이며 선택된 쿠폰이 있을때
			$("#coupon_form_tbl :input[type='button'][id!='btn_new']").attr('disabled',false);	
		else
			$("#coupon_form_tbl :input[type='button'][id!='btn_new']").attr('disabled',false);
	}else{																	//발송구분이 비회원이면서 회원의 엑셀업로드일때
		if($("#excel_sendable_cnt").val()>0 && ($("#cupn_wid_excel").val().length > 0 ))	//발송가능건수가 1건 이상이며 선택된 쿠폰이 있을때
			$("#coupon_form_tbl :input[type='button'][id!='btn_new']").attr('disabled',false);	
		else
			$("#coupon_form_tbl :input[type='button'][id!='btn_new']").attr('disabled',true);
	}
}

/**
* 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
* ex) if (isEmpty(input)) {
*         alert("검색조건을 입력하세요.");
*     }
*/
function isEmpty(input) {
    if (input == null || input.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}

//날짜 체크
function checkDate(startDateId, endDateId, requiredFlag ){
	//유효기간체크 start	
	var input1 = $("#"+startDateId).val();	
	var input2 = $("#"+endDateId).val();
	if(!requiredFlag && ( isEmpty(input1) && isEmpty(input2) ) ){
		return true;		
	}
	if(isEmpty(input1)){
		alert("유효기간 시작일을 입력해주세요.");
		return false;		
	}
	if(isEmpty(input2)){
		alert("유효기간 종료일을 입력해주세요.");
		return false;		
	}
	var date1 = new Date(input1.substr(0,4),input1.substr(5,2),input1.substr(8,2));
	var date2 = new Date(input2.substr(0,4),input2.substr(5,2),input2.substr(8,2));
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var o = d.getFullYear() + '-' +(month<10 ? '0' : '') + month + '-' +(day<10 ? '0' : '') + day;
	var today = new Date(o.substr(0,4),o.substr(5,2),o.substr(8,2));
	if(requiredFlag && date2-today < 0){
		alert("유효기간 종료일은 현재날짜보다 커야 합니다.");
		return false;
	}
	if(date2-date1 < 0){
		alert("유효기간 종료일은 시작일자보다 커야 합니다.");
		return false;
	}
	return true;
}

/**
 * comma 변환 
 */
function convertComma (val, mark){
	if(!val)
		return val;
	
	if(!mark)
		mark = ',';
	var num = val.toString();
	var len = num.length;
	var cnt = parseInt((len + 2)/3);
	var result = '';
	for(var i = 0; i < cnt; i++){
		var start = parseInt(len) - (i + 1) * 3; 
		var end = len - i * 3;
		var str = num.substring(start, end);
		result = str + result;
		if(i != (cnt - 1))
			result = mark + result;
	}
	return result;
}

//YYYY-MM-DD포맷 체크
function isDateExp(chkDate){
	var retn=true;
	if(chkDate.search(/^\d{4}-\d{2}-\d{2}$/)==-1)
		retn = false;
	return retn;
}

function addMouseEvent(trElement) {
	trElement.bind("mouseover", function(e) {
		this.className = 'on';
	});
	trElement.bind("mouseout", function(e) {
		this.className = '';
	});
}

// 쿠폰 리스트 취득 함수 호출
function doGetCouponList() {
	$("#h_cupn_name_srch").val($("#cupn_name_srch").val());
	$("#h_exp_start_dt_srch").val($("#exp_start_dt_srch").val());
	$("#h_exp_end_dt_srch").val($("#exp_end_dt_srch").val());
	$("#h_cb_disc_type").val($("#cb_disc_type").val());
	getCouponList(1, 1);
}

//쿠폰리스트 취득
function getCouponList(pageNum, schDiv){
	
	var ctx = $("#ctx").val();
	var chkDate = $("#exp_start_dt_srch").val();		//유효기간 시작일
	if(!isEmpty(chkDate)&& !isDateExp(chkDate)){		//입력된값이 날짜형식이 아닐때
		alert("유효기간 시작일을 YYYY-MM-DD 형식으로 입력해주세요");
		return;
	}
	chkDate = $("#exp_end_dt_srch").val();				//유효기간 종료일
	if(!isEmpty(chkDate)&& !isDateExp(chkDate)){		//입력된값이 날짜형식이 아닐때
		alert("유효기간 종료일을 YYYY-MM-DD 형식으로 입력해주세요");
		return;
	}
	
	if(!checkDate("exp_start_dt_srch","exp_end_dt_srch",false))
		return;
	
	var data = "";
	if(schDiv == 1){
		$("#h_cupn_name_srch").val($("#cupn_name_srch").val());
		$("#h_exp_start_dt_srch").val($("#exp_start_dt_srch").val());
		$("#h_exp_end_dt_srch").val($("#exp_end_dt_srch").val());
		$("#h_cb_disc_type").val($("#cb_disc_type").val());
		$("#h_brand_wid").val($("#brand_wid").val());
		
		data =  "cupn_name_srch="+$("#cupn_name_srch").val()
		+"&exp_start_dt_srch="+$("#exp_start_dt_srch").val()
		+"&exp_end_dt_srch="+$("#exp_end_dt_srch").val()
		+"&cb_disc_type="+$("#cb_disc_type").val()
		+"&brand_wid="+$("#brand_wid").val()
		+"&pageNum="+pageNum;
	} else if(schDiv == 2){
		$("#cupn_name_srch").val($("#h_cupn_name_srch").val());
		$("#exp_start_dt_srch").val($("#h_exp_start_dt_srch").val());
		$("#exp_end_dt_srch").val($("#h_exp_end_dt_srch").val());
		if($("#h_cb_disc_type").val() != '') $("#cb_disc_type option[value="+$("#h_cb_disc_type").val()+"]").prop("selected", true);
		if($("#h_brand_wid").val() != '') $("#brand_wid option[value="+$("#h_brand_wid").val()+"]").prop("selected", true);
		
		data =  "cupn_name_srch="+$("#h_cupn_name_srch").val()
		+"&exp_start_dt_srch="+$("#h_exp_start_dt_srch").val()
		+"&exp_end_dt_srch="+$("#h_exp_end_dt_srch").val()
		+"&cb_disc_type="+$("#h_cb_disc_type").val()
		+"&brand_wid="+$("#h_brand_wid").val()
		+"&pageNum="+pageNum;
	}
	
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getCouponList",   
		data: data,
		dataType: "json",
		success: function(data) {
			eval(data);
			$("#cupnSendTb").empty();
			
			if(data.couponList.length == 0){
				var trElement = $("#cupnSendSeMainHeader").clone().removeClass().empty();
				$("#cupnSendTb").append(trElement);
				$("#cupnSendTb tr:last").append("<td style='background-color: white; cursor: default;' colspan='7' align='center' height='194'>검색 결과가 없습니다</td>");
			}
			
			$.each(data.couponList, function(i) {
				
				// 헤더에서 TR 요소 취득
				var trElement = $("#cupnSendSeMainHeader").clone().removeClass().empty();
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				
				// TR 작성
				$("#cupnSendTb").append(trElement);
				$("#cupnSendTb tr:last")
				$("#cupnSendTb tr:last").append("<td onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + this.cupn_wid + "</td>");
				$("#cupnSendTb tr:last").append("<td style='text-align:left;' onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + this.cupn_name + "</td>");
				$("#cupnSendTb tr:last").append("<td onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + this.brand_name + "</td>");
				$("#cupnSendTb tr:last").append("<td onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + this.exp_start_dt + "~"+this.exp_end_dt+"</td>");
				if(this.disc_type==1)
					$("#cupnSendTb tr:last").append("<td style='text-align:right;' onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + this.disc_rate + "%</td>");
				else
					$("#cupnSendTb tr:last").append("<td style='text-align:right;' onclick=\"getCouponDetail(\'"+this.cupn_wid+"\')\">" + convertComma(this.disc_amt,',') + "원</td>");	
			
				var pageContent = "";
				
				// 페이징 다시그리기
				$("#cupnSendMain_pagingDiv").empty();
				
				if(data.page.startPageNum == 1 && data.page.endPageNum == 1){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='cupnEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnSendPageInput' readonly='readonly' value='"+data.page.startPageNum+"' onkeypress=\"cupnSendPageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a> / "+data.page.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.pageNum == data.page.startPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='cupnEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnSendPageInput' value='"+data.page.startPageNum+"' onkeypress=\"cupnSendPageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a href='#' onclick='getCouponList("+data.page.endPageNum+", 2);' id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick='getCouponList("+(data.pageNum+1)+", 2);' id='pNum'> ▶ </a>";
				} else if(data.pageNum == data.page.endPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='cupnEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick='getCouponList("+(data.pageNum-1)+", 2);' id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnSendPageInput' value='"+data.page.endPageNum+"' onkeypress=\"cupnSendPageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a> / "+data.page.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='cupnEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick='getCouponList("+(data.pageNum-1)+", 2);' id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnSendPageInput' value='"+data.pageNum+"' onkeypress=\"cupnSendPageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a href='#' onclick='getCouponList("+data.page.endPageNum+", 2);' id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick='getCouponList("+(data.pageNum+1)+", 2);' id='pNum'> ▶ </a>";
				}
				$("#cupnSendMain_pagingDiv").append(pageContent);
			});	
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(request, status, error) { 
//			alert("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			alert("쿠폰목록을 취득하지 못했습니다.");
		return false;
		}
	});
}

//쿠폰 리스트 엔터키 기능
function cupnSendPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#cupnSendPageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#cupnSendPageInput").val($("#pageNum").val());
				$("#cupnSendPageInput").focus();
			} else if(pageNum > parseInt($("#cupnEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#cupnSendPageInput").val($("#pageNum").val());
				$("#cupnSendPageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#cupnSendPageInput").val($("#pageNum").val());
				$("#cupnSendPageInput").focus();
			} else {
				getCouponList(pageNum, 2);
			}
		}
		event.stopPropagation();
	});
}

//쿠폰 상세정보 조회
function getCouponDetail(cupn_wid){
	var ctx = $("#ctx").val();
	if($('#cb_UpType').val()=="list"){	//발송구분이 회원일때
		if( $("#sendable_cnt").val() == 0 || $("#sendable_cnt").val() == ''){		//고객추출이 되지 않았을때
			alert("발송가능건수가 없습니다.\n고객추출을 실행하여 주시기바랍니다.");
			return;
		}
	}else{	//발송구분이 비회원일때
		if( $('#excel_sendable_cnt').val() == 0 || $('#excel_sendable_cnt').val() == ''){
			alert("발송가능건수가 없습니다.\n엑셀파일을 업로드 하여 주시기 바랍니다.");
			return;
		}
	}
	if( $("#ticket_wid").val() != '' && $("#ticket_wid").val()!= undefined){	//쿠폰선택이 되지 않았을때
		alert("쿠폰을 선택하실수 없습니다.\n새로 발송을 하시려면 신규 버튼을 클릭하세요.");
		return;
	}
	var data = "cupn_wid="+cupn_wid;
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/cupnSendDetailAjax",   
		data: data,
		dataType : "json",
		success: function(data) {
			
			$('#previewId').html("<img src='data:image/jpeg;base64,"+data.img_src+"' id='preview' style='width:100%; height:100%;'>");	//div에 파일엘리멘트 새로 생성
			
			$('#cupn_name').val(data.cupn_name);
			$("#brand_wid option[value='"+data.brand_wid+"'").prop("selected", true);
			if(data.disc_type==1){
				$(".discount_cost").text("*할인율");
				$("#td_disc_type").html("<input name='disc_rate' id='disc_rate' type='text' readonly='readonly' maxlength='3' max='99' style='text-align: right;'>%");
				$("#disc_rate").attr("value",data.disc_rate);
			}else{
				$(".discount_cost").text("*할인금액");
				$("#td_disc_type").html("<input name='disc_amt' id='disc_amt' type='text' readonly='readonly' maxlength='2' max='99' style='text-align: right;'>원");
				$("#disc_amt").attr("value",convertComma(data.disc_amt,','));	
			}	
			$('#exp_start_dt').val(data.exp_start_dt);
			$('#exp_end_dt').val(data.exp_end_dt);
			$('#callback_no').val(data.callback_no);
			$('#description').val(data.description);
			$('#cupn_wid').val(data.cupn_wid);
			$('#cupn_wid_excel').val(data.cupn_wid);
			checkSendable();
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("쿠폰 정보를 취득하지 못했습니다.");
			return false;
		}	
	});
}

//신규버튼 클릭시 입력폼 초기화
function cupnDetailClear(){	
	$('#preview').remove();
	$("#cupn_name").val("");
	$("#disc_type").val("");
	$("#disc_amt").val("");
	$("#disc_rate").val("");
	$("#callback_no").val("");
	$("#exp_start_dt").val("");
	$("#exp_end_dt").val("");
	$("#description").val("");
	$("#cupn_send_main").attr('disabled',true);	//발송신청,미리보기 버튼 disable
	$("#cupnSendSearchTable :input[type!='button']").attr('value','');	//발송상태 초기화
	$('#cb_last_use_dt').val("");
	$('#cb_six_month_avg_cnt').val("");
	$('#cb_six_month_avg_amt').val("");
	$("#sendableCountTable :input").attr('value',"");
	$("#aform2 :input").attr("value","");				//회원 발송정보 초기화
	$("#aform3 :input[type!='file']").attr("value","");	//엑셀파일 정보 초기화
	$('#cb_sendType').attr('value',"member");	//발송구분 회원으로 변경
	$('#cb_sendType').attr('disabled',false);
	$('#excel_sendable_cnt').attr('value','');
	/* setSendType();	//발송구분에 따른 항목제어 */
}

//발송상태조회
function getTicketInfo(){	
	var ctx = $("#ctx").val();
	var data = "ticket_wid="+$("#ticket_wid").val();	//입력파라미터로 티켓번호 설정
	$.ajax({
		cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx + "/getTicket",   
		data: data,
		success: function(data) {
			eval(data);
			$.each(data.ticketList, function(i) {
				$("#sent_cupn_name").attr("value",this.cupn_name);	//쿠폰명
				$("#send_cnt").attr("value",this.send_cnt);			//대상건수
				$("#succ_cnt").attr("value",this.succ_cnt);			//성공건수
				$("#job_status").attr("value",this.job_status);		//발송상태
			});
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
        error: function(request, status, error) { 
			alert("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			alert("발송상태조회를 취득하지 못했습니다.");
		return false;
        }
	});
}

//발송신청(티켓생성)
function regTicket(){
	var ctx = $("#ctx").val();
	var url;
	var data;
	if($('#cb_sendType').val()=="member" && $('#cb_UpType').val()=="list"){	//추출발송	
		url = ctx + "/regTicket";
		
		data = {
				cupn_wid:$("#cupn_wid").val(),
				last_use_dt:$("#last_use_dt").val(),
				six_month_avg_cnt:$("#six_month_avg_cnt").val(),
				six_month_avg_amt:$("#six_month_avg_amt").val(),
				ticket_wid:$("#ticket_wid").val()
		} 
		
		$("#cupn_send_main").attr('disabled',true);
		$.ajax({
		 	 type:"POST",
		 	 //cache: false,
			 url:url,
		     data: data,
			 dataType: "json",
	         success: function(data, status, xhr) {
	        	 if(status == 'success'){
	            	$("#ticket_wid").val(data.ticket_wid);							//티켓번호 hidden으로설정
	            	$("#conditionTable :input[type!=hidden]").attr('disabled','disabled');		//추출조건 비활성
	            	$("#sendableCountTable :input").attr('disabled','disabled');	//추출결과 비활성
	            	$("#coupon_form_tbl :input[id!=cupn_send_main_add]").attr('disabled','disabled');	//쿠폰정보 미리보기, 발송신청 버튼 비활성
	            	$("#btn_srchTicket").attr('disabled',false);					//발송상태 조회
	            	alert("발송신청 되었습니다.\n아래 조회 버튼으로 발송상태 조회가 가능합니다.");
	            }else{
	            	alert("발송이 실패하였습니다.");
	            	$("#cupn_send_main").attr('disabled',false);	//발송 실패시 발송신청 버튼 활성
	            }
	        },
	    	beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
	        error: function(request, status, error) { 
				alert("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			return false;
	        }
	 });
		
	}else{								//엑셀발송
		url = ctx + "/regExcelTicket";
				
		$("#cupn_send_main").attr('disabled',true);
		var options = {
			 	 type:"POST",
			 	 //cache: false,
				 url:url,
		         success: function(data, status, xhr) {
		        	 if(status == 'success'){
		            	
		        		$("#ticket_wid").val(data.ticket_wid);							//티켓번호 hidden으로설정
		            	$("#conditionTable :input[type!=hidden]").attr('disabled','disabled');		//추출조건 비활성
		            	$("#sendableCountTable :input").attr('disabled','disabled');	//추출결과 비활성
		            	$("#coupon_form_tbl :input[id!=cupn_send_main_add]").attr('disabled','disabled');	//쿠폰정보 미리보기, 발송신청 버튼 비활성
		            	$("#btn_srchTicket").attr('disabled',false);					//발송상태 조회
		            	alert("발송신청 되었습니다.\n아래 조회 버튼으로 발송상태 조회가 가능합니다.");
		            }else{
		            	alert("발송이 실패하였습니다.");
		            	$("#cupn_send_main").attr('disabled',false);	//발송 실패시 발송신청 버튼 활성
		            }
		        },
		        error: function(request, status, error) { 
					alert("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
				return false;
		        }
		 };
		    //업로드발송
			$("#aform3").ajaxSubmit(options);
	}
}
