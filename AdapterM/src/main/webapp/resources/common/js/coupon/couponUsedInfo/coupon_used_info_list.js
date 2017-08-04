/**
업 무 명 : 쿠폰회수 리스트화면
작 성 자 : 김기현 (rlarlgus39@coreplus.co.kr)
작 성 일 : 2015/09/17
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/09/17
내 용 : 쿠폰회수에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
		
});

//쿠폰회수 내역조회 - 조회 버튼 기능
function cupnUsedInfo_list_sch(pageNum) {
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
		}
		var ctx = $("#ctx").val();
		var sch_flg = $("#sch_flg").val('1');
		var page_num_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		$("#cupnUsedInfoForm").append(page_num_input).append(sch_flg);
		viewLoadingShow();
		$("#cupnUsedInfoForm").submit();
}

//조회 엔터키
function cupnUsedEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var cupn_name = $("#cupn_name_srch").val();
			if(cupn_name == ''){
				alert("쿠폰명을 입력해주세요.");
				return false;
			} else {
				cupnUsedInfo_list_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//고객회수내역조회 페이징 함수
function cupnUsedInfoPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var cupnUsedInfoForm = $("#cupnUsedInfoPagingForm");
		
		var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		
		cupnUsedInfoForm.append(pageNumInput);
		viewLoadingShow();
		cupnUsedInfoForm.submit();
	});
}

//페이징 엔터키
function cupnUsedListInputEnter(event) {
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
			cupnUsedInfoPaging(pageNum);
		}
	}
	event.stopPropagation();
}

//사용건수 선택 고객발행내역조회 모달창 처리
function doPopupUsedTicketCust(ticket_wid,cupnUsedPageNum) {
	
	$("#cust_name").val('');	//검색 값 초기화
	$("#cust_hp").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $('#divUsedTicketCust'),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '770px',
    	'height': '400px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});

	// 고객목록 표시
	getUsedTicketCust(ticket_wid,cupnUsedPageNum);
}

//고객목록 표시
function getUsedTicketCust(ticket_wid, cupnUsedPageNum){
	var ctx = $("#ctx").val();
	
	var data = "cust_name="+$("#cust_name").val()
				+"&cust_hp="+$("#cust_hp").val()
				+"&cupnUsedPageNum="+cupnUsedPageNum+"&ticket_wid="+ticket_wid;

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getUsedCouponCustListAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			
			$("#divUsedTicketCustList").empty();
			
			if(data.getUsedCustList.length == 0){
				var trElement = $("#usedCustListTableHeader").clone().removeClass().empty();
				$("#divUsedTicketCustList").append(trElement);
				$("#divUsedTicketCustList").append("<tr style='background-color: white; cursor: default;'></tr>");
				$("#divUsedTicketCustList tr:last").append("<td style='background-color: white; cursor: default;' colspan='6' align='center' height='205'>검색 결과가 없습니다</td>");
			}
			
			// 테이블 내용 추가
			$.each(data.getUsedCustList, function(i) {
				
				// 헤더에서 TR 요소 취득
				var trElement = $("#usedCustListTableHeader").clone().removeClass().empty();
				// 마우스 오버시 화면 표시 이벤트 추가
				//addMouseEvent(trElement);
				// TR 작성
				$("#usedTicketCustListTable").append(trElement);
				$("#usedTicketCustListTable tr:last")
				$("#usedTicketCustListTable tr:last").append("<td style='width:10%; text-align:left;'>" + this.id + "</td>");
				$("#usedTicketCustListTable tr:last").append("<td style='width:15%; text-align:left;'>" + this.cust_name + "</td>");
				$("#usedTicketCustListTable tr:last").append("<td width='15%'>" + this.cust_hp + "</td>");
				$("#usedTicketCustListTable tr:last").append("<td width='20%'>"+this.key_wid+"</td>");
				$("#usedTicketCustListTable tr:last").append("<td width='15%'>" + this.msg_status+"</td>");
				$("#usedTicketCustListTable tr:last").append("<td style='width:25%; text-align:left;'>" + this.store_name+"</td>");
				
				var pageContent = "";
				
				// 페이징 다시그리기
				$("#cupnUsedCustPagingDiv").children().remove();
				
				if(data.cupnUsedPage.startPageNum == 1 &&  data.cupnUsedPage.endPageNum == 1){
					pageContent = "<input type='hidden' id='cupnUsedPageNum' value='"+data.cupnUsedPageNum+"'/><input type='hidden' id='cupnUseEndPageNum' value='"+data.cupnUsedPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnUsePageInput' readonly='readonly' value='"+data.cupnUsedPage.startPageNum+"' onkeypress=\"cupnUsePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a> / "+data.cupnUsedPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.cupnUsedPageNum == data.cupnUsedPage.startPageNum){
					pageContent = "<input type='hidden' id='cupnUsedPageNum' value='"+data.cupnUsedPageNum+"'/><input type='hidden' id='cupnUseEndPageNum' value='"+data.cupnUsedPage.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='cupnUsePageInput' value='"+data.cupnUsedPage.startPageNum+"' onkeypress=\"cupnUsePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+data.cupnUsedPage.endPageNum+") id='pNum'> / "+data.cupnUsedPage.endPageNum+"</a>"
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+(data.cupnUsedPageNum+1)+") id='pNum'> ▶ </a>";
				} else if(data.cupnUsedPageNum == data.cupnUsedPage.endPageNum){
					pageContent = "<input type='hidden' id='cupnUsedPageNum' value='"+data.cupnUsedPageNum+"'/><input type='hidden' id='cupnUseEndPageNum' value='"+data.cupnUsedPage.endPageNum+"'/>"
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+(data.cupnUsedPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnUsePageInput' value='"+data.cupnUsedPage.endPageNum+"' onkeypress=\"cupnUsePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a> / "+data.cupnUsedPage.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='cupnUsedPageNum' value='"+data.cupnUsedPageNum+"'/><input type='hidden' id='cupnUseEndPageNum' value='"+data.cupnUsedPage.endPageNum+"'/>"
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+(data.cupnUsedPageNum-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='cupnUsePageInput' value='"+data.cupnUsedPageNum+"' onkeypress=\"cupnUsePageNumInputEnter(event);\" style='width: 30px; text-align: center;'/>"
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+data.cupnUsedPage.endPageNum+") id='pNum'> / "+data.cupnUsedPage.endPageNum+"</a>"
					+"<a style='cursor:pointer;' onclick=getUsedTicketCust('"+this.ticket_wid+"',"+(data.cupnUsedPageNum+1)+") id='pNum'> ▶ </a>";
				}
				$("#cupnUsedCustPagingDiv").append(pageContent);
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

//고객발행내역조회 리스트 엔터키 기능
function cupnUsePageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var cupnUsedPageNum = parseInt($("#cupnUsePageInput").val());
			var ticket_wid = $("#ticket_wid").val();
			if ($("#cupnUsePageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#cupnUsePageInput").val($("#cupnUsedPageNum").val());
				$("#cupnUsePageInput").focus();
			} else if(cupnUsedPageNum > parseInt($("#cupnUseEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#cupnUsePageInput").val($("#cupnUsedPageNum").val());
				$("#cupnUsePageInput").focus();
			} else if (1 > cupnUsedPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#cupnUsePageInput").val($("#cupnUsedPageNum").val());
				$("#cupnUsePageInput").focus();
			} else {
				getUsedTicketCust(ticket_wid,cupnUsedPageNum);
			}
		}
		event.stopPropagation();
	});
}

//팝업창 고객발행내역 조건값 조회
function usedTicketCustSearch(ticket_wid,cupnUsedPageNum){	
	var ticket_wid = $("#ticket_wid").val();
	getUsedTicketCust(ticket_wid,1);
}

//검색 엔터키 기능
function cupnUsedCustSearchEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		if ($("#cust_name").val() == '' && $("#cust_hp").val() == '') {
			alert("검색어를 입력하세요.")
			$("#cust_name").focus();
		} else {
			var ticket_wid = $("#ticket_wid").val();
			getUsedTicketCust(ticket_wid,1);
		}
	}
	event.stopPropagation();
}

