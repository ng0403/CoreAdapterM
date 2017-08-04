/**
업 무 명 : 공통 기능
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/08/07
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/08/07
내 용 : 공통 기능에 대한 javascript 코드이다.
*참고사항 : 
 */
// 메뉴 권한에 따른 버튼 감추기
$(document).ready(function() {
	
	viewLoadingHide();
	
	var ma_crt_yn = $("#ma_crt_yn").val();
	var ma_mdfy_yn = $("#ma_mdfy_yn").val();
	var ma_del_yn = $("#ma_del_yn").val();
	var ma_rtrv_yn = $("#ma_rtrv_yn").val();
	
	if(ma_crt_yn =='N'){
		$('#content input[id$="add"]').each(function() {
			$(this).hide();
		});
		$('#content input[id$="save"]').each(function() {
			$(this).hide();
		});
	}
	if(ma_mdfy_yn == 'N'){
		$('#content input[id$="mdfy"]').each(function() {
			$(this).hide();
		});
	}
	if(ma_del_yn == 'N'){
		$('#content input[id$="del"]').each(function() {
			$(this).hide();
		});
	}
	
	$.datepicker.regional['ko'] = {
		   		currentText: '오늘',
		   		monthNames: ['1월','2월','3월','4월','5월','6월',
		   					'7월','8월','9월','10월','11월','12월'],
		   		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		   						'7월','8월','9월','10월','11월','12월'],
		   		dayNames: ['일','월','화','수','목','금','토'],
		   		dayNamesShort: ['일','월','화','수','목','금','토'],
		   		dayNamesMin: ['일','월','화','수','목','금','토'],
		   		dateFormat: 'yy-mm-dd',
		   		firstDay: 0,
		   		showMonthAfterYear: true,
		   		yearSuffix: '년',
		   		prevText: '지난달',
		   		nextText: '다음달',
		   		changeMonth: true,
		   		changeYear: true
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	// 숫자만 입력
	$("input[id=pageInput]").keyup(function() {
		$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
	});
});

function viewLoadingShow(){
	 $('#viewLoadingImg').css('position', 'absolute');
 	 $('#viewLoadingImg').css('left', '45%');
 	 $('#viewLoadingImg').css('top', '45%');
 	 $('#viewLoadingImg').css('z-index', '1200');
     $('#viewLoadingImg').show().fadeIn(500);
}

function viewLoadingHide(){
	$('#viewLoadingImg').fadeOut();	
}


//AS-ID 엑셀 다운로드 적용 함수
function downloadExcel(formID){
	var ctx = $("#ctx").val();
	var form = $("#"+formID);
	var excel = $('<input type="hidden" value="true" name="excel">');
	form.append(excel);
	viewLoadingShow();
	form.submit();
	$("input[name=excel]").val("");
	viewLoadingHide();
}

//전문선택 레이어 팝업창 처리
function doPopupOpen() {
	
	$("#searchNm").val('');	//검색 값 초기화
	
	var brand = $("#brand_wid").val();
	if(brand == null || brand == ''){
		alert("브랜드를 선택해 주세요.");
		return;
	}
	
	// 팝업창 표시
	$.blockUI({ message: $('#franchiseeModalDiv'),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '800px',
    	'height': '500px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});
	
	//조회후 가맹점 조회시 기존 브랜드값 설정
	var up_id = $("#brand_wid").val();
	$("#up_id").attr("value",up_id);
	$("#pageNum").val("1");
	
	// 가맹점목록 표시
	viewFranchiseList(1, 1);
}

//가맹점 팝업 폐점 포함 체크 여부
/*function checkEndYN(){
	if(document.getElementsByName("endYN")[0].checked){		
		$("#end_yn").val("Y");
	}else{
		$("#end_yn").val("");
	}
}*/

//마우스 오버시 화면 표시 이벤트 추가
function addMouseEvent(trElement) {
	trElement.bind("mouseover", function(e) {
		this.className = 'on';
	});
	trElement.bind("mouseout", function(e) {
		this.className = '';
	});
}

/* 팝업창 가맹점목록 표시 */
function viewFranchiseList(franPageNum, schDiv) {
	var ctx = $("#ctx").val();
	// 비동기로 form 데이타 전송
	var sendData = "";
	
	if(schDiv == 1){
		
		if($("#dateSch_flg").val()!=undefined){
			sendData = "schGubun="+$("#schGubun").val()
			+"&searchNm="+$("#searchNm").val()+"&up_id="+$("#up_id").val()
			+"&franPageNum="+franPageNum+"&end_yn="+$("#end_yn").val()+"&dateSch_flg="+$("#dateSch_flg").val();
		}else{
			sendData = "schGubun="+$("#schGubun").val()
			+"&searchNm="+$("#searchNm").val()+"&up_id="+$("#up_id").val()
			+"&franPageNum="+franPageNum+"&end_yn="+$("#end_yn").val();
		}
	} else if(schDiv == 2){
		sendData = "schGubun="+$("#h_schGubun").val()
		+"&searchNm="+$("#h_searchNm").val()+"&up_id="+$("#up_id").val()
		+"&franPageNum="+franPageNum+"&end_yn="+$("#end_yn").val()+"&dateSch_flg="+$("#dateSch_flg").val();
	}
	$.ajax({
		url: ctx + "/FranchiseListAjax", 
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",
		success: function(data) {//리턴된값 
			// div 내용삭제
			$("#contractDetail").empty();
			
			$("#searchNm").unbind();
			$("#searchNm").bind("keypress", function(event) {
				franEnterSearch(event);
			});
			
			$("#h_schGubun").val(data.schGubun);
			$("#h_searchNm").val(data.searchNm);
			
			// 테이블 내용 추가
			$.each(data.franchiseList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#franchiseListTableHeader").clone().removeClass().empty();
				var store_wid = this.store_wid;
				var store_name = this.store_name;
				var pos_no = this.trns_pos_div;
				
				// TR에 클릭이벤트 추가
				trElement.bind("click", function(e) {
					doPopupClose(); // 팝업창 닫기
					setStoreID(store_wid, store_name, pos_no);
				});
				
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				// TR 작성
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td class='list1_b' align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.franPageNum) - 1) * 10)) + "</td>"
						+ "<td  width='60%' style='text-align:left;'>&nbsp;&nbsp;&nbsp;" + this.store_name + "</td>"
						+ "<td  width='30%' style='text-align:right;'>" + this.store_wid + "&nbsp;&nbsp;&nbsp;</td>");
			});
			
			// 페이징 다시그리기
			$("#franPagingDiv").empty();
			var pageContent = "";
			if(data.franPage.endPageNum == 0 || data.franPage.endPageNum == 1){
				pageContent = "◀ <input type='text' id='franPageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.franPageNum == data.franPage.startPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"◀ <input type='text' id='franPageInput' value='"+data.franPage.startPageNum+"' onkeypress=\"franPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.franPageNum == data.franPage.endPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPage.endPageNum+"' onkeypress=\"franPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.franPage.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPageNum+"' onkeypress=\"franPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#franPagingDiv").append(pageContent);
			
			// 검색된 가맹점목록이 없을경우 표시
			if (data.franchiseList.length == 0) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#franchiseListTableHeader").clone().removeClass().empty();
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;'" +
						"align='center'>검색 결과가 없습니다</td>");
			}
		},
		    beforeSend: function(){
				 viewLoadingShow();	
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(jqXHR, textStatus, errorThrown ) {
			alert( jqXHR.statusText );
			alert( jqXHR.responseText );
			alert("가맹점목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

//가맹점 리스트 엔터키 기능
function franEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewFranchiseList(1, 1);
	}
	event.stopPropagation();
}

// 가맹점 리스트 페이징 엔터 기능
function franPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var franPageNum = parseInt($("#franPageInput").val());
			if ($("#franPageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#franPageInput").val($("#franPageNum").val());
				$("#franPageInput").focus();
			} else if(franPageNum > parseInt($("#franEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#franPageInput").val($("#franPageNum").val());
				$("#franPageInput").focus();
			} else if (1 > franPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#franPageInput").val($("#franPageNum").val());
				$("#franPageInput").focus();
			} else {
				viewFranchiseList(franPageNum, 2);
			}
		}
		event.stopPropagation();
	});
}

//PopUp Box 비표시
function doPopupClose() {
	setTimeout($.unblockUI, 0);
}

/**
 * 팝업창 가맹점목록 표시
 */
function setStoreID(store_wid, store_name, pos_no){
	$(document).ready(function() {
		$("#store_name").val(store_name);
		$("#store_wid").val(store_wid);
		$("#trns_pos_div").val(pos_no);
	});
}

//가맹점 구분 Text 설정
function setText(){
	var sVal = "";
	$("#brand_wid option:selected").each(function(){
		sTxt = $(this).text();
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

// 팝업창 가맹점 조건값 조회
function franchiseSearch(){	
	$("#h_schGubun").val($("#schGubun").val());
	$("#h_searchNm").val($("#searchNm").val());
	viewFranchiseList(1, 1);
}

//가맹점 초기화
function franchiseClear(){
	$("#franchiseNM").attr("value","");
	$("#store_wid").attr("value","");
}

//페이징 함수
function paging(pageNum, url) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx + url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	     $form.append(pageNumInput);
	     $('#menuViewLoading').css('position', 'absolute');
     	 $('#menuViewLoading').css('left', '45%');
     	 $('#menuViewLoading').css('top', '45%');
	     $('#menuViewLoading').show().fadeIn(500);
	     $form.submit();
	});
}

// 페이지 엔터키 기능
function pageNumInputEnter(event, url) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(parseInt($("#pageInput").val()) > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				// 컨트롤러로 전송
				var ctx = $("#ctx").val();
				// 동적 폼생성 POST 전송
				var $form = $('<form></form>');
				$form.attr('action', ctx + url);
				$form.attr('method', 'post');
				$form.appendTo('body');
				
				var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
				
				$form.append(pageNumInput);
				viewLoadingShow();
				$form.submit();
			}
		}
		event.stopPropagation();
	});
}

function numChk(me) {
	$(document).ready(function() {
		$("input").each(function(item, index) {
			if(me == this){
				var numnum = $(this).val();
				if(isValidNumber(numnum) == false)
				{
					alert("숫자만 입력 가능합니다.");
					$(this).val("");
					$(this).focus();
				}
			}
		});
	});
}

function numDotChk(me) {
	$(document).ready(function() {
		$("input").each(function(item, index) {
			if(me == this){
				var numnum = $(this).val();
				if(isValidNumberDot(numnum) == false)
				{
					alert("숫자와 '.'만 입력 가능합니다.");
					$(this).val("");
					$(this).focus();
				}
			}
		});
	});
}

function koreanChk(me) {
	$(document).ready(function() {
		$("input").each(function(item, index) {
			if(me == this){
				var data = $(this).val();
				if(isValidKorean(data) == false)
				{
					alert("알파벳과 숫자만 입력 가능합니다.");
					$(this).val("");
					$(this).focus();
				}
			}
		});
	});
}

function menuMoveFunc(url, main_menu_id) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="main_menu_id">');
	     var menu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
	 
	     $form.append(Mainmenu_idInput);
	     $form.append(menu_idInput);
	     
	     viewLoadingShow();
	     $form.submit();
	});
}

// 엑셀 출력 공통 기능 함수 
// title = 출력될 파일의 이름
// tblNM = 출력할 테이블의 id명
function CommonExcelDownLoad(title, tblNm) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tblID = $("#"+tblNm+"");
		
		var thTxt = [];
		tblID.find('th').each(function(index, item) {
			thTxt[index] = $(this).text();
		});
		
		var trLength = tblID.find('tbody tr').length;
		var content = [];
		tblID.find('tbody tr').each(function(index, item) {
			var tdTxt = '';
			var tdLength = $(this).find('td').length;
			$(this).find('td').each(function(index, item) {
				if(index != tdLength-1) {
					tdTxt += $(this).text().replace(/,/gi, "").trim() + "@@";
				} else {
					if($(this).text().trim() == ''){
						tdTxt += $(this).text().replace(/,/gi, "").trim() + " @@";
					} else {
						tdTxt += $(this).text().replace(/,/gi, "").trim();
					}
				}
			});
			content[index] = tdTxt;
		});
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/ExcelDownLoad");
		$form.attr('method', 'post');
		$form.appendTo('body');
		var title_input = $('<input type="hidden" value="'+title+'" name="title">');
		var thTxt_input = $('<input type="hidden" value="'+thTxt+'" name="header">');
		var trLength_input = $('<input type="hidden" value="'+trLength+'" name="lRowlength">');
		var d_trLength_input = $('<input type="hidden" value="0" name="dRowlength">');
		var content_input = $('<input type="hidden" value="'+content+'" name="listContent">');
		var flag_input = $('<input type="hidden" value="list" name="flag">');
		
		$form.append(title_input);
		$form.append(thTxt_input);
		$form.append(trLength_input);
		$form.append(d_trLength_input);
		$form.append(content_input);
		$form.append(flag_input);
		viewLoadingShow();
		$form.submit();
	});
}

// 엑셀 출력 공통 기능 함수 (디테일)
// title = 출력될 파일의 이름
// tblNM = 출력할 테이블의 id명
function CommonExcelDownLoadDetail(title, tblNm) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tblID = $("#"+tblNm+"");
		
		var trLength = tblID.find('tbody tr').length;
		var content = [];
		tblID.find('tbody tr').each(function(index, item) {
			var childTxt = '';
			var childLength = $(this).children().length;
			$(this).children().each(function(index, item) {
				if(index != childLength-1) {
					childTxt += $(this).text().replace(/,/gi, "").trim() + "@@";
				} else {
					if($(this).text().trim() == ''){
						childTxt += $(this).text().replace(/,/gi, "").trim() + " @@";
					} else {
						childTxt += $(this).text().replace(/,/gi, "").trim();
					}
				}
			});
			content[index] = childTxt;
		});

		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/ExcelDownLoad");
		$form.attr('method', 'post');
		$form.appendTo('body');
		var title_input = $('<input type="hidden" value="'+title+'" name="title">');
		var trLength_input = $('<input type="hidden" value="'+trLength+'" name="dRowlength">');
		var l_trLength_input = $('<input type="hidden" value="0" name="lRowlength">');
		var content_input = $('<input type="hidden" value="'+content+'" name="detailContent">');
		var flag_input = $('<input type="hidden" value="detail" name="flag">');
		
		$form.append(title_input);
		$form.append(trLength_input);
		$form.append(l_trLength_input);
		$form.append(content_input);
		$form.append(flag_input);
		viewLoadingShow();
		$form.submit();
	});
}

// 엑셀 출력 공통 기능 함수 (테이블 헤더와 바디가 나뉜경우)
// title = 출력될 파일의 이름
// tblHeaderNm = 출력할 헤더 테이블의 id명
// tblBodyNm = 출력할 바디 테이블의 id명
function CommonExcelDownLoadTwoTbl(title, tblHeaderNm, tblBodyNm) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tblHeaderID = $("#"+tblHeaderNm+"");
		var tblBodyID = $("#"+tblBodyNm+"");
		
		var thTxt = [];
		tblHeaderID.find('th').each(function(index, item) {
			thTxt[index] = $(this).text();
		});
		
		var trLength = tblBodyID.find('tbody tr').length;
		var content = [];
		tblBodyID.find('tbody tr').each(function(index, item) {
			var tdTxt = '';
			var tdLength = $(this).find('td').length;
			$(this).find('td').each(function(index, item) {
				if(index != tdLength-1) {
					tdTxt += $(this).text().replace(/,/gi, "").trim() + "@@";
				} else {
					if($(this).text().trim() == ''){
						tdTxt += $(this).text().replace(/,/gi, "").trim() + " @@";
					} else {
						tdTxt += $(this).text().replace(/,/gi, "").trim();
					}
				}
			});
			content[index] = tdTxt;
		});
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/ExcelDownLoad");
		$form.attr('method', 'post');
		$form.appendTo('body');
		var title_input = $('<input type="hidden" value="'+title+'" name="title">');
		var thTxt_input = $('<input type="hidden" value="'+thTxt+'" name="header">');
		var trLength_input = $('<input type="hidden" value="'+trLength+'" name="lRowlength">');
		var d_trLength_input = $('<input type="hidden" value="0" name="dRowlength">');
		var content_input = $('<input type="hidden" value="'+content+'" name="listContent">');
		var flag_input = $('<input type="hidden" value="list" name="flag">');
		
		$form.append(title_input);
		$form.append(thTxt_input);
		$form.append(trLength_input);
		$form.append(d_trLength_input);
		$form.append(content_input);
		$form.append(flag_input);
		viewLoadingShow();
		$form.submit();
	});
}


//상위분류 선택시 실행 함수
function setUpgroup(obj){
	var s = obj.value;
	
	switch(s) {
	case "0001":
		brandRead();
		break;
	case "0002":
		stroeRead();
		break;
	case "0003":
		moreStoreRead();
		break;
	case "0004":
		moreBrandRead();
		break;
	case "0005":
		fqtRead();
		break;
	default:
		basicSelect();
		break;
	}
}
//브랜드 선택 화면 설정 및 호출
function brandRead(){
	RCCreset();
	$("#searchSub2").hide();
	$(".searchSub1").show();
	$("#store_s").hide();
	$("#sbTxt").hide();
	$("#moreStore").prop("disabled", true);
	$("#moreBrand").prop("disabled", true);
	$("#fqtRead").prop("disabled", true);
}
//가맹점 선택 화면 설정 및 호출
function stroeRead(){
	RCCreset();
	$("#searchSub2").hide();
	$(".searchSub1").show();
	$("#store_s").show();
	$("#sbTxt").show();
	$("#moreStore").prop("disabled", true);
	$("#moreBrand").prop("disabled", true);
	$("#fqtRead").prop("disabled", true);
}
//다점포이용고객 선택 화면 설정 및 호출
function moreStoreRead(){
	RCCreset();
	$("#searchSub2").show();
	$(".searchSub1").hide();
	$("#basicSel").hide();
	$("#moreStore").show();
	$("#moreBrand").hide();
	$("#fqtRead").hide();
	$("#moreStore").prop("disabled", false);
	$("#moreBrand").prop("disabled", true);
	$("#fqtRead").prop("disabled", true);
}
//다브랜드이용고객 화면 설정 및 호출
function moreBrandRead(){
	RCCreset();
	$("#basicSel").hide();
	$("#moreStore").hide();
	$("#moreBrand").show();
	$("#fqtRead").hide();
	$("#searchSub2").show();
	$(".searchSub1").hide();
	$("#moreStore").prop("disabled", true);
	$("#moreBrand").prop("disabled", false);
	$("#fqtRead").prop("disabled", true);
}
//단골고객 선택 화면 설정 및 호출
function fqtRead(){
	RCCreset();
	$("#basicSel").hide();
	$("#moreStore").hide();
	$("#moreBrand").hide();
	$("#fqtRead").show();
	$("#searchSub2").show();
	$(".searchSub1").hide();
	$("#moreStore").prop("disabled", true);
	$("#moreBrand").prop("disabled", true);
	$("#fqtRead").prop("disabled", false);
}
// 기본 셋팅
function basicSelect(){
	RCCreset();
	$("#searchSub2").show();
	$(".searchSub1").hide();	
	$("#basicSel").show();
	$("#moreStore").hide();
	$("#moreBrand").hide();
	$("#fqtRead").hide();
	$("#moreStore").prop("disabled", true);
	$("#moreBrand").prop("disabled", true);
	$("#fqtRead").prop("disabled", true);
}
//하위분류 다 초기화
function RCCreset(){
	$('#brandTYPE').val('');
	$('#downCode').val('');
	$("#moreStore").val('');
	$("#moreBrand").val('');
	$("#fqtRead").val('');	
	$("#store_name").val('');
	$("#store_wid").val('');
	$("#brand_wid").val('');
	$("#rfm_subcls_cd").val('');
}
$(document).ready(function() {
	$(".searchSub1").hide();
	$("#store_s").hide();
	$("#moreStore").hide();
	$("#moreBrand").hide();
	$("#fqtRead").hide();
});