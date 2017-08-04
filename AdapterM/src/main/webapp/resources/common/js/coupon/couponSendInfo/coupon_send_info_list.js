/**
업 무 명 : 쿠폰발행내역조회 리스트화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/09/14
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/09/14
내 용 : 쿠폰관리에 대한 javascript 코드이다.
*참고사항 : 
 */

//쿠폰발행내역조회 - 조회 버튼 기능
function cupnSendInfo_list_sch(pageNum) {
	var start_date = $("#created_start_dt").val();
	var st_year = $("#created_start_dt").val().substr(0,4);
	var st_month = $("#created_start_dt").val().substr(5,2);	
    var st_day = $("#created_start_dt").val().substr(8,2);
    var st_date = new Date(st_year, st_month, st_day);
    var temp_end = new Date(Date.parse(st_date) + 180 * 1000 * 60 * 60 * 24);
	var end_date = $("#created_end_dt").val();
	var ed_year = $("#created_end_dt").val().substr(0,4);
    var ed_month = $("#created_end_dt").val().substr(5,2);
    var ed_day = $("#created_end_dt").val().substr(8,2);
    var ed_date = new Date(ed_year, ed_month, ed_day);
    var temp_start = new Date(Date.parse(ed_date) - 180 * 1000 * 60 * 60 * 24);

	var cnt = 0;
	//Validation 체크
	if(start_date != '' && end_date != ''){
		if(end_date < start_date){
			alert("조회기간은 종료일이 시작일 이후여야 합니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
		var ctx = $("#ctx").val();
		var sch_flg = $("#sch_flg").val('1');
		var page_num_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		$("#cupnSendInfoForm").append(page_num_input).append(sch_flg);
		viewLoadingShow();
		$("#cupnSendInfoForm").submit();
	}
}
	
//페이징 함수
function cupnSendInfoPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var page_num_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		$("#cupnSendInfoPagingForm").append(page_num_input);
		viewLoadingShow();
		$("#cupnSendInfoPagingForm").submit();
	});
}

//조회 엔터키
function cupnSeInEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var cupn_name = $("#cupn_name_srch").val();
			if(cupn_name == ''){
				alert("쿠폰명을 입력해주세요.");
				return false;
			} else {
				cupnSendInfo_list_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//쿠폰명 클릭 모달창 처리
function doPopupCouponDetail(cupn_wid,active_flg) {
	$("#preview").remove();
	$("#coupon_send_de_tbl :input").attr("value","");	
		// 팝업창 표시
		$.blockUI({ message: $("#cupn_send_mo_detail"),
	    	css: { 
	    		width: "700"
			  , height: "350"
			  , top: "25%"
			  , left: "30%"
	    } 
		,onOverlayClick : $.unblockUI
		});
	getCupnSendDetail(cupn_wid,active_flg)
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

//쿠폰명 클릭시 상세정보 Ajax
function getCupnSendDetail(cupn_wid,active_flg){
	var ctx = $("#ctx").val();
	var data = {
			"cupn_wid": cupn_wid,
			"active_flg":active_flg
	};
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/cupnSendDetailAjax",   
		data: data,
		dataType : "json",
		success: function(data) {
			
			$("#previewId").html("<img src='data:image/jpeg;base64,"+data.img_src+"' id='preview' style='width:100%; height:100%;'>");	//div에 파일엘리멘트 새로 생성
			$("#cupn_name").val(data.cupn_name);
			$("#brand_wid option[value='"+data.brand_wid+"'").prop("selected", true);
			if(data.disc_type==1){
				$(".discount_cost").text("*할인율");
				$("#td_disc_type").html("<input name='disc_rate' id='disc_rate' type='text' readonly='readonly' maxlength='3' max='99' style='text-align:right;'>%");
				$("#disc_rate").attr("value",data.disc_rate);
			}else{
				$(".discount_cost").text("*할인금액");
				$("#td_disc_type").html("<input name='disc_amt' id='disc_amt' type='text' readonly='readonly' maxlength='2' max='99' style='text-align:right;'>원");
				$("#disc_amt").attr("value",convertComma(data.disc_amt,','));	
			}	
		
			$("#exp_start_dt").val(data.exp_start_dt);
			$("#exp_end_dt").val(data.exp_end_dt);
			$("#callback_no").val(data.callback_no);
			$("#description").val(data.description);
	
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

//발행내역조회 레이어 팝업창 처리
function doPopupTicketCust(ticket_wid,cupnPageNum) {
	
	$("#cust_name").val('');	//검색 값 초기화
	$("#cust_hp").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $("#divTicketCust"),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '770px',
    	'height': '390px',
    	'cursor': 'default'
    	}
	 	,onOverlayClick : $.unblockUI
	});

	// 고객목록 표시
	getTicketCust(ticket_wid,cupnPageNum);
	
}

//고객목록 표시
function getTicketCust(ticket_wid, cupnPageNum){
	var ctx = $("#ctx").val();
														//ticket_wid있을때
	var data = "cust_name="+$("#cust_name").val()
				+"&cust_hp="+$("#cust_hp").val()
				+"&cupnPageNum="+cupnPageNum+"&ticket_wid="+ticket_wid;

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getTicketCustAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			
			$("#cupnCustDetail").empty();
			
			if(data.getTicketCustList.length == 0){
				var trElement = $("#cupnCustListTableHeader").clone().removeClass().empty();
				$("#cupnCustDetail").append(trElement);
				$("#cupnCustDetail tr:last").append("<td style='background-color: white; cursor: default;' colspan='6' align='center' height='194'>검색 결과가 없습니다</td>");
			}
			
			// 테이블 내용 추가
			$.each(data.getTicketCustList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#cupnCustListTableHeader").clone().removeClass().empty();
				// 마우스 오버시 화면 표시 이벤트 추가
				//addMouseEvent(trElement);
				// TR 작성
				$("#cupnCustDetail").append(trElement);
				$("#cupnCustDetail tr:last")
				$("#cupnCustDetail tr:last").append("<td style='text-align:left;'>" + this.id + "</td>");
				$("#cupnCustDetail tr:last").append("<td style='text-align:left;'>" + this.cust_name + "</td>");
				$("#cupnCustDetail tr:last").append("<td>" + this.cust_hp + "</td>");
				$("#cupnCustDetail tr:last").append("<td>"+this.cust_cupn_no+"</td>");
				if(this.job_status_code == "E5" || this.job_status_code == "E3")
					$("#cupnCustDetail tr:last").append("<td><a onclick='cupnSrchErrorInfo("+this.msg_rslt_cd+");'>" + this.job_status+"</a></td>");
				else
					$("#cupnCustDetail tr:last").append("<td>" + this.job_status+"</td>");
				
				if(this.use_yn == 'N' && this.job_status_code != 'T6')	//사용여부 N일때
					$("#cupnCustDetail tr:last").append("<td><input type='button' value='신청' onclick='retrySendCoupon("+this.tc_trans_wid+")'></td>");
				else		//사용여부 N일때
					$("#cupnCustDetail tr:last").append("<td height='30px'></td>"); //<input type='button'>
				if(this.use_yn == 'N'){
					$("#cupnCustDetail tr:last").append("<td><input type='button' value='연장' onclick='coupon_exp_extension_no("+this.cust_cupn_no+")'></td>");
				}else{
					$("#cupnCustDetail tr:last").append("<td></td>"); //<input type='button'>
				}
				var pageContent = "";
				
				// 페이징 다시그리기
				$("#cupnCustPagingDiv").children().remove();
				
				if(data.cupnPage.startPageNum == 1 && data.cupnPage.endPageNum == 1){
					pageContent = "<input type='hidden' id='cupnSePageNum' value='"+data.cupnPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.cupnPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnSePageInput' readonly='readonly' value='"+data.cupnPage.startPageNum+"' onkeypress=\"cupnSePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a> / "+data.cupnPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.cupnPageNum == data.cupnPage.startPageNum){
					pageContent = "<input type='hidden' id='cupnSePageNum' value='"+data.cupnPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.cupnPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnSePageInput' value='"+data.cupnPage.startPageNum+"' onkeypress=\"cupnSePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+data.cupnPage.endPageNum+") id='pNum'> / "+data.cupnPage.endPageNum+"</a>"
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+(data.cupnPageNum+1)+") id='pNum'> ▶ </a>";
				} else if(data.cupnPageNum == data.cupnPage.endPageNum){
					pageContent = "<input type='hidden' id='cupnSePageNum' value='"+data.cupnPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.cupnPage.endPageNum+"'/>"
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+(data.cupnPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnSePageInput' value='"+data.cupnPage.endPageNum+"' onkeypress=\"cupnSePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a> / "+data.cupnPage.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='cupnSePageNum' value='"+data.cupnPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.cupnPage.endPageNum+"'/>"
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+(data.cupnPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnSePageInput' value='"+data.cupnPageNum+"' onkeypress=\"cupnSePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+data.cupnPage.endPageNum+") id='pNum'> / "+data.cupnPage.endPageNum+"</a>"
					+"<a style='cursor:pointer;' onclick=getTicketCust('"+this.ticket_wid+"',"+(data.cupnPageNum+1)+") id='pNum'> ▶ </a>";
				}
				$("#cupnCustPagingDiv").append(pageContent);
				
			});
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("고객발행내역조회를 취득하지 못했습니다.");
			return false;
		}
	});
	$("#ticket_wid").attr("value",ticket_wid);
}


function coupon_exp_extension_no(key_wid){
	
	var ctx = $("#ctx").val();
	var param = {
			key_wid : key_wid
	}
	
	$.ajax({
		type: "POST",  
		url: ctx+"/cupnNoExpCountCheck",
		data: param,
		dataType : "text",
		success: function(data) {
			
			if(data <= 19){
				alert(data + "회 연장하였습니다.");
				if(confirm("기간연장 하시겠습니까?")){
					$.ajax({
						type: "POST",  
						url: ctx+"/cupnNoExpDtExtension",
						data: param,
						dataType : "text",
						success: function(data) {
							
							if(data=="error"){
								alert("기간연장에 실패했습니다.");
							}else{
								alert("기간연장 되었습니다.");
							}
						},
						beforeSend: function(){
					    	viewLoadingShow();			
					    },
					    complete:function(){
					    	viewLoadingHide();
					    },
						error: function(data) { 
							alert("기간연장에 실패했습니다.");
							return false;
						}
					});
					
				};
			}else{
				alert("5년 연장 초과");
				return ;
			}
		},
		beforeSend: function(){
	    	viewLoadingShow();			
	    },
	    complete:function(){
	    	viewLoadingHide();
	    },
		error: function(data) { 
			alert("정보 수정에 실패했습니다.");
			return false;
		}	
	});
	
	
	
}

function cupnSrchErrorInfo(rslt_cd){
	
	var ctx = $("#ctx").val();
	if(rslt_cd == null || rslt_cd == '' ){
		alert("에러코드값이 없습니다.");
		return;
	}
	var name = rslt_cd;
	var type = "TCS_RESULT";
	
	var data = "name="+name+"&type="+type

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/TCSResultErrorView",   
		data: data,
		dataType: "json",
		success: function(data) {
				$("#mmsFailModalContent").remove();
				$("#divTicketCust").append('<div id="mmsFailModalContent" style="position:absolute; top: 130px; left: 180px; background-color: white; border: 2px solid #7A7A7A; width: 400px; height: 150px;" align="left">'
						+"<div style='width:100%; height:25px; background-color: #ececec; margin-bottom: 1%;' align='right'>"
						+"<input type='button' value='X' id='mmsFailModalContentClose' style='cursor:pointer;'></div>" 
						+'<div id="mmsFailList" style="margin-top: 1.5%; padding: 1%; text-align: left;">'
						+'<b>■ MMS발송실패 내역</b>'
						+'<br><span style="color: red; padding: 2%;margin-top: 1%;">*코드</span> : '+data.name
						+'<br><span style="color: red; padding: 2%;margin-top: 1%;">*의미</span> : '+data.type_name
						+'<br><span style="color: red; padding: 2%;margin-top: 1%;">*내용</span><br>'
						+'<span style="padding: 2%;">'+data.val+'</span>'
						+'</div></div>'
						);
				$("#mmsFailModalContentClose").bind("click", function() {
					$("#mmsFailModalContent").remove();
				});
	
	},
	beforeSend: function(){
    	viewLoadingShow();			
    },
    complete:function(){
    	viewLoadingHide();	
    },
	error: function(data) { 
			alert("오류정보를 취득하지 못했습니다.");
			return false;
		}
	});
	
}

//고객발행내역조회 리스트 엔터키 기능
function cupnSePageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var cupnPageNum = parseInt($("#cupnSePageInput").val());
			var ticket_wid = $("#ticket_wid").val();
			if ($("#cupnSePageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#cupnSePageInput").val($("#cupnSePageNum").val());
				$("#cupnSePageInput").focus();
			} else if(cupnPageNum > parseInt($("#cupnSeEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#cupnSePageInput").val($("#cupnSePageNum").val());
				$("#cupnSePageInput").focus();
			} else if (1 > cupnPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#cupnSePageInput").val($("#cupnSePageNum").val());
				$("#cupnSePageInput").focus();
			} else {
				getTicketCust(ticket_wid,cupnPageNum);
			}
		}
		event.stopPropagation();
	});
}

//페이징 엔터키
function cupnSendInfoInputEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		var pageNum = parseInt($("#pageInput").val());
		if ($("#pageInput").val() == '') {
			alert("페이지 번호를 입력하세요.")
			$("#pageInput").val($("#cupnSePageNum").val());
			$("#pageInput").focus();
		} else if(pageNum > parseInt($("#cupnSeEndPageNum").val())) {
			alert("페이지 번호가 너무 큽니다.");
			$("#pageInput").val($("#cupnSePageNum").val());
			$("#pageInput").focus();
		} else if (1 > pageNum) {
			alert("페이지 번호가 너무 작습니다.");
			$("#pageInput").val($("#cupnSePageNum").val());
			$("#pageInput").focus();
		} else {
			var ctx = $("#ctx").val();
			var $form = $('#cupnSendInfoPagingForm');
			var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
			$form.append(pageNumInput);
			viewLoadingShow();
			$form.submit();
		}
	}
	event.stopPropagation();
}
//팝업창 고객발행내역 조건값 조회
function ticketCustSearch(ticket_wid,cupnPageNum){	
	var ticket_wid = $("#ticket_wid").val();
	getTicketCust(ticket_wid,1);
}

//검색 엔터키 기능
function cupnSendCustSearchEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		if ($("#cust_name").val() == '' && $("#cust_hp").val() == '') {
			alert("검색어를 입력하세요.")
			$("#cust_name").focus();
		} else {
			var ticket_wid = $("#ticket_wid").val();
			getTicketCust(ticket_wid,1);
		}
	}
	event.stopPropagation();
}

//재발송 신청 버튼 클릭시
function retrySendCoupon(tc_trans_wid){
	var ctx = $("#ctx").val();
	if(!confirm("재발송을 신청하시겠습니까?"))
		return;
	var data = "tc_trans_wid="+tc_trans_wid;
	$.ajax({
		//cache: true,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/retrySendCouponAction",
		async : false,
		data: data,
		success: function(data) {
			if(data == "error"){
				alert("재발송 신청중 에러가 발생하였습니다.");
				return;
			}
			alert("재발송 신청이 되었습니다.");
			var ticket_wid = $("#ticket_wid").val();
			getTicketCust(ticket_wid,'1');	//고객별발행내역 리스트 재조회
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("재발송 신청중 에러가 발생하였습니다.");
			return false;
		}
	});
}

function syncSendInfo(ticket_wid,job_status_cd){
	var ctx = $("#ctx").val();
	if(job_status_cd != "S3"){
		alert("발송완료후에 정보갱신이 가능합니다.");
		return;
	}
	if(!confirm("MMS발송 정보를 갱신하시겠습니까?\n발송건수가 많으면 갱신시간이 다소 소요될수 있습니다."))
		return;
	var data = "ticket_wid="+ticket_wid;
	$.ajax({
		cache: true,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/syncSendInfo",
		data: data,
		success: function(data) {
			if(data == "error"){
				alert("에러가 발생하였습니다.");
			}
			alert("발송 정보가 갱신되었습니다.");
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("에러가 발생하였습니다.");
		}
	});	
}

$(document).ready(function() {
	 //모달창 닫기
	  $("#cupn_send_btn_div > #cupn_send_exit").click(function(){
		$.unblockUI();
	  });
});
