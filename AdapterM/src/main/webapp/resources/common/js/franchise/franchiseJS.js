//가맹점 검색조건 초기화
function contResetStore() {
	$('#store_name').val('');
	$('#store_wid').val('');
}

function contCancelBtn(url, main_menu_id){
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
}

// contractlist js start
//가맹점 계약 상세 페이지로 이동
function contract_detail(brand_wid,contWid, storeWid, trnsPosDiv, contDiv, store_nm, cont_use_yn, cont_name, cont_start_dt, cont_end_dt){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();

	var page = '${pageNum}';

	/* 디테일 상단에 넘겨줄값 */
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractDetail');
    $form.attr('method', 'post');
    $form.appendTo('body');
    
	var contCondi = $("#contCondi").val();	
	
	var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var contWid_input = $('<input type="hidden" value="'+contWid+'" name="contWid">');
    var storeWid_input = $('<input type="hidden" value="'+storeWid+'" name="storeWid">');
    var trnsPosDiv_input = $('<input type="hidden" value="'+trnsPosDiv+'" name="trnsPosDiv">');
    var contCondi_input = $('<input type="hidden" value="'+contCondi+'" name="contCondi">');
    var contDiv_input = $('<input type="hidden" value="'+contDiv+'" name="cont_div">');
    var contdiv_input = $('<input type="hidden" value="'+contDiv+'" name="contdiv">');

    var brand_wid_input = $('<input type="hidden" value="'+brand_wid+'" name="brand_wid">');
    var page_input = $('<input type="hidden" value="'+page+'" name="page">');
    var store_nm_input = $('<input type="hidden" value="'+store_nm+'" name="store_nm">');
    var cont_use_yn_input = $('<input type="hidden" value="'+cont_use_yn+'" name="cont_use_yn">');
    var cont_name_input = $('<input type="hidden" value="'+cont_name+'" name="cont_name">');
    var cont_start_dt_input = $('<input type="hidden" value="'+cont_start_dt+'" name="cont_start_dt">');
    var cont_end_dt_input = $('<input type="hidden" value="'+cont_end_dt+'" name="cont_end_dt">');

    $form.append(Mainmenu_idInput)
			.append(contWid_input)
			.append(storeWid_input)
			.append(trnsPosDiv_input)
			.append(contDiv_input)
			.append(brand_wid_input)
			.append(store_nm_input)
			.append(cont_use_yn_input)
			.append(cont_name_input)
			.append(cont_start_dt_input)
			.append(cont_end_dt_input)
			.append(contdiv_input)
			.append(page_input);
    $form.append(contCondi_input);
    viewLoadingShow();
    $form.submit();	
}

function contract_Search(){
	var ctx = $("#ctx").val();
	var brand_wid = $("select[name=brandTYPE]").val();
	var store_wid  = $("input[name=store_wid]").val();
	var store_name  = $("input[name=store_name]").val();
	var contCondi  = $("select[name=contCondi]").val();
	var main_menu_id = $("#main_menu_id").val();
	var sch_flg = 0;
	if(brand_wid != ''){
		if(store_wid != ''){
			sch_flg=1;			
		}else{
			alert("가맹점을 선택해 주세요.");
			$("input[name=store_wid]").focus();
			return false;
		}
	}
	
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractList');
    $form.attr('method', 'post');
    $form.appendTo('body');
    
    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var brand_wid_input = $('<input type="hidden" value="'+brand_wid+'" name="brand_wid">');
    var store_wid_input = $('<input type="hidden" value="'+store_wid+'" name="store_wid">');
    var store_name_input = $('<input type="hidden" value="'+store_name+'" name="store_name">');
    var contCondi_input = $('<input type="hidden" value="'+contCondi+'" name="contCondi">');
    var sch_flg_input = $('<input type="hidden" value="'+sch_flg+'" name="sch_flg">');

    $form.append(Mainmenu_idInput)
			.append(brand_wid_input)
			.append(store_wid_input)
			.append(store_name_input)
			.append(contCondi_input)
			.append(sch_flg_input);
    viewLoadingShow();
    $form.submit();	
}

function createContNormal(){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	var	contdiv = '001';
	var mode = "add";
	
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractInsertForm');
    $form.attr('method', 'post');
    $form.appendTo('body');

    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var contdiv_input = $('<input type="hidden" value="'+contdiv+'" name="contdiv">');
    var mode_input = $('<input type="hidden" value="'+mode+'" name="mode">');
    $form.append(Mainmenu_idInput).append(contdiv_input).append(mode_input);
    viewLoadingShow();
	$form.submit();    
}

function createContEvent(){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	var	contdiv = '002';
	var mode = "add";
	
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractInsertForm');
    $form.attr('method', 'post');
    $form.appendTo('body');

    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var contdiv_input = $('<input type="hidden" value="'+contdiv+'" name="contdiv">');
    var mode_input = $('<input type="hidden" value="'+mode+'" name="mode">');
    $form.append(Mainmenu_idInput).append(contdiv_input).append(mode_input);
    viewLoadingShow();
	$form.submit();
}

// 페이징 엔터키 
function contPageNumInputEnter(event, url) {
	$(document).ready(function() {
		var contCondi = $("#contCondi").val();
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
				// 컨트롤러로 전송
				var ctx = $("#ctx").val();
				// 동적 폼생성 POST 전송
				var $form = $('<form></form>');
				$form.attr('action', ctx + url);
				$form.attr('method', 'post');
				$form.appendTo('body');
				
				var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
				var contCondiInput = $('<input type="hidden" value="'+contCondi+'" name="contCondi">');
				
				$form.append(pageNumInput).append(contCondiInput);
				viewLoadingShow();
				$form.submit();
			}
		}
		event.stopPropagation();
	});
}

//페이징 함수
function ContPaging(pageNum, url) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var main_menu_id = $("#main_menu_id").val();
		var contCondi = $("select[name=contCondi]").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx + url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	     var menuIDInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
	     var contCondiInput = $('<input type="hidden" value="'+contCondi+'" name="contCondi">');
	 	 
	     $form.append(pageNumInput).append(menuIDInput).append(contCondiInput);
	     viewLoadingShow();
	     $form.submit();
	});
}
// contract list js end
// contract detail js start
//행추가
var sNum = 1;	//Day,Week 구분 변수
//취소버튼 리스트로 이동
function contListMoveFuncs(url, main_menu_id) {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="main_menu_id">');
	     var menu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
	 
	     $form.append(Mainmenu_idInput);
	     $form.append(menu_idInput);
	     viewLoadingShow();
	     $form.submit()
}
//계약 저장
function saveContract(){
	var ctx = $("#ctx").val();
	var contWid = $("#contWid").val();
	var brand_wid = "";
	$("#brand_wid option:selected").each(function(){
		brand_wid = $(this).val();
	});
	
	if($("#brand_wid").val()==""){
		alert("브랜드를 선택해주세요.");
		$("#brand_wid").focus();
	}else if($("#store_wid").val()=="" || $("#store_wid").val()==null){
		alert("가맹점를 선택해주세요.");
		$("#store_name").focus();
	}else if($("#contName").val()=="" || $("#contName").val()==null){
		alert("계약명을 입력해주세요.");
		$("#contName").focus();
	}else if($("#cont_SDT").val()=="" || $("#cont_SDT").val()==null){
		alert("시작 날짜를 선택해주세요.");
		$("#cont_SDT").focus();
	}else if($("#cont_EDT").val()=="" || $("#cont_EDT").val()==null){
		alert("종료 날짜를 선택해주세요.");
		$("#cont_EDT").focus();
	}else if (contWid == null || contWid == '') {
		
		if ($("#contractTYPE").val() == "001") {
			//기본계약 저장
			if (confirm('저장하시겠습니까?')) {
				saveNewBasicContract();
				// 중복검사 보류
// 				if (!validNewBaseCont()) {
// 					return false;
// 				}
// 				checkDuplNewContDate();
			}
		} else if ($("#contractTYPE").val() == "002"){
			if(sNum == 1){
				alert("컬럼을 한개 이상 추가해주세요.");
				return false;
			}
			//이벤트계약 저장
			if (confirm('저장하시겠습니까?')) {
				if (!validNewEventCont()){return false;}
				
				var main_menu_id = $("#main_menu_id").val();
				$("#sp_brandTYPE").attr("value",brand_wid);
				$("#sp_franchiseNM").attr("value",$("#store_name").val());
				$("#sp_contractNM").attr("value",$("#contName").val());
				$("#sp_trnsPosDiv").attr("value",$("#trns_pos_div").val());
				$("#sp_storeID").attr("value",$("#store_wid").val());
				$("#sp_usedChk").attr("value",$("#usedChk").val());
				$("#sp_contractTYPE").attr("value",$("#contractTYPE").val());
				$("#sp_cont_SDT").attr("value",$("#cont_SDT").val());
				$("#sp_cont_EDT").attr("value",$("#cont_EDT").val());
				
				$("#franchiseEventForm").attr('action', ctx+'/saveEventContractDetail');
				$("#franchiseEventForm").attr('method', 'post');
				viewLoadingShow();
				$("#franchiseEventForm").submit();
			}				
		}
	} else {
		//수정
		if ($("#contractTYPE").val() == "001"){
			if(confirm('저장하시겠습니까?')){
				saveBasicContract();
				/* setReadStatus(false);
				if (!validBaseCont()) {
					setReadStatus();
					return false;
				}
				checkDuplContDate(); */
			}
		} else if ($("#contractTYPE").val() == "002") {
			if(confirm('저장하시겠습니까?')){
				
				$("#franchiseEventForm").attr('action', ctx+'/updateEventContractDetail');
				$("#franchiseEventForm").attr('method', 'post');

				var main_menu_id = $("#main_menu_id").val();
				$("#sp_contWid").attr("value", contWid);
				$("#sp_usedChk").attr("value",$("#usedChk").val());
				$("#sp_contractNM").attr("value",$("#contName").val());
				$("#sp_cont_EDT").attr("value",$("#cont_EDT").val());
				$("#sp_page").attr("value", $("#page").val());			
				$("#sp_storeID").attr("value",$("#store_wid").val());
				$("#sp_trnsPosDiv").attr("value",$("#trns_pos_div").val());
				viewLoadingShow();
			    $("#franchiseEventForm").submit(); 				
// 				var url = "/updateEventContractDetail.do";
// 				$("#franchiseEventForm").attr("action",url).submit();
				
// 				setReadStatus(false);
// 				if (!validEventCont()) {
// 					setReadStatus();
// 					return false;
//				}
			}
		}
	}
}
//기본계약 저장
function saveBasicContract(){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	$("#ba_contWid").attr("value", $("#contWid").val());
		
	$("#ba_usedChk").attr("value",$("#usedChk").val());
	$("#ba_contractNM").attr("value",$("#contName").val());	
	$("#ba_cont_EDT").attr("value",$("#cont_EDT").val());
	$("#ba_page").attr("value", $("#page").val());
	$("#ba_storeID").attr("value",$("#store_wid").val());	
	$("#ba_trnsPosDiv").attr("value",$("#trns_pos_div").val());

//	alert($("#ba_contWid").val()+"/"+$("#ba_usedChk").val()+"/"+$("#ba_contractNM").val()+"/"+$("#ba_cont_EDT").val()+"/"+$("#ba_page").val()+"/"+$("#ba_storeID").val()+"/"+$("#ba_trnsPosDiv").val());

	$("#franchiseBasicForm").attr('action', ctx+'/updateBasicContractDetail');
	$("#franchiseBasicForm").attr('method', 'post');
	viewLoadingShow();
    $("#franchiseBasicForm").submit();	 
}
//저장시 기본계약 입력값 체크
function validBaseCont() {
	if (!validContractInfo()) {
		return false;
	}
	return true;
}
//계약 정보를 화면에 표시할때 화면처리
//flg가 true일경우 비활성, false일경우 활성 
function setReadStatus(flg) {
	if (flg == '' || flg == null) {
		flg = true;
	}
	// 계약종류
	$("#contractTYPE").attr('disabled', flg);
	// 시작
	$("#cont_SDT").attr('disabled', flg);
	
}
//신규 기본계약 저장
function saveNewBasicContract() {
	
	var brand_wid = "";
	$("#brand_wid option:selected").each(function(){
		brand_wid = $(this).val();
	});
	
	// 기본계약항목 활성
	$("#basicCont *").attr('disabled', false);

	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	$("#ba_brandTYPE").attr("value",brand_wid);
	$("#ba_franchiseNM").attr("value",$("#store_name").val());
	$("#ba_trnsPosDiv").attr("value",$("#trns_pos_div").val());
	$("#ba_storeID").attr("value",$("#store_wid").val());
	$("#ba_usedChk").attr("value",$("#usedChk").val());
	$("#ba_contractTYPE").attr("value",$("#contractTYPE").val());
	$("#ba_contractNM").attr("value",$("#contName").val());
	$("#ba_cont_SDT").attr("value",$("#cont_SDT").val());
	$("#ba_cont_EDT").attr("value",$("#cont_EDT").val());
	
	$("#ba_cont_SDT").val();
	
	$("#franchiseBasicForm").attr('action', ctx+'/saveContractDetail');
	$("#franchiseBasicForm").attr('method', 'post');
	viewLoadingShow();
    $("#franchiseBasicForm").submit();
}
//년, 월, 주, 일 입력값 체크
function checkLimitCount(obj, num) {

	// 숫자인지 체크
	if (!isNumber(obj)) {
		alert('숫자로 입력해 주십시오');
		obj.value = getRemovedStrNum(obj);
		return ;
	}
	
	if (Number(obj.value.length) > 5) {
		alert('5자리 이하로 입력해 주십시오');
		obj.value = '0';
		return false;
	}
}
//저장시 신규 이벤트계약 입력값 체크
function validNewEventCont() {
	if (!validContractInfo()) {
		return false;
	}	
	if ($("#eventItemTableBody input").size() == 0) {
		alert('컬럼을 추가해 주십시오');
		return false;
	}	
	return true;
}
// 저장시 계약정보 입력값 체크
// 미입력시 false 반환
function validContractInfo() {
	// 브랜드명
	if ($("#brand_wid").val() == '') {
		alert('브랜드명을 선택해 주십시오');
		$("#brand_wid").focus();
		return false;
	}
	// 가맹점명
	if ($("#store_name").val() == '') {
		alert('가맹점명을 선택해 주십시오');
		$("#store_name").focus();
		return false;
	}
	// 계약명
	if ($("#contName").val() == '') {
		alert('계약명을 입력해 주십시오');
		$("#contName").focus();
		return false;
	}
	// 계약기간 start
	if ($("#cont_SDT").val() == '') {
		alert('계약기간을 선택해 주십시오');
		$("#cont_SDT").focus();
		return false;
	}
	// 계약기간 end
	if ($("#cont_EDT").val() == '') {
		alert('계약기간을 선택해 주십시오');
		$("#cont_EDT").focus();
		return false;
	}
	return true;
}
// 저장시 신규 기본계약 입력값 체크
function validNewBaseCont() {
	if (!validContractInfo()) {
		return false;
	}
	return true;
}
//계약기간 중복체크
function checkDuplNewContDate() {
	// 비동기로 form 데이타 전송$("#storeID").val()
	var ctx = $("#ctx").val();
	var data = "storeWid=" + $("#store_wid").val() + "&contStartDt=" + $("#cont_SDT").val() + "&contEndDt=" + $("#cont_EDT").val();
	$.ajax({
		cache: false,	//cache 메모리 미사용(사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",
		url: ctx+"/checkDuplContDateAjax",
		async : false,
		data: data,
		success: function(data) {			
			eval(data);
			
			if (isExistCotract == true) {
				alert("계약기간이 중복되었습니다");
			} else {
				saveNewBasicContract();
			}			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("계약기간 중복체크중 에러가 발생했습니다");
			return false;
		}
	});
}
//계약기간 중복체크
function checkDuplContDate() {
	// 비동기로 form 데이타 전송$("#storeID").val()
	var data = "storeWid=" + $("#store_wid").val() + "&contWid=" + $("#contWid").val() + "&contStartDt=" + $("#cont_SDT").val() + "&contEndDt=" + $("#cont_EDT").val();
	/* alert($("#store_wid").val()+"/"+$("#contWid").val()+"/"+$("#cont_SDT").val()+"/"+$("#cont_EDT").val()); */
	
	$.ajax({
		cache: false,	//cache 메모리 미사용(사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/checkDuplContDateAjax",   
		async : false,
		data: data,
		success: function(data) { 
			eval(data);
			
			if (isExistCotract == true) {
				alert("계약기간이 중복되었습니다");
			} else {
				saveBasicContract();
			}
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("계약기간 중복체크중 에러가 발생했습니다");
			return false;
		}
	});
}
//행삭제
function delRow(obj) {
	
	// 선택행 배경색 변경
	$(obj).parent().siblings().andSelf().each(function(i) {
		$(this).css('background-color', '#d1d1d1');
	});
	
	// 행삭제
	if (confirm($(obj).parent().parent().children('td:first').text() + ' 번 계약정보를 삭제하시겠습니까?')) {
		$(obj).parent().parent().remove();
		// 행번호 초기화
		seteventItemTableNo();
		// 행이 없을경우 안내문 추가
		if ($("#eventItemTableBody tr").html() == null) {
			trElement = $("#eventCont tr:first").clone().removeClass().empty();
			$("#eventCont").append(trElement);
			$("#eventCont tr:last").append("<td class='list1_b2' id='firstTeleRow' align='center' colspan='15'>컬럼을 추가해 주세요.</td>");
		}
	} else {
		//$("#eventItemTable *").css('background-color', '');
		$(obj).parent().siblings().andSelf().each(function(i) {
			$(this).css('background-color', '');
		});
	}
	sNum--;
}
// 컬럼추가 버튼
function addRow() {

	//공통코드 취득
	var unitVal = "001/002".split("/");
	var unitNM =  "비율/금액".split("/");
	var salesVal = "001/002/003/004".split("/");
	var salesNM = "매장/배달/행사/엑셀".split("/");
	var tradeVal = "001/002/003".split("/");
	var tradeNM = "적립/차감/할인".split("/");
	var custVal = "001".split("/");
	var custNM = "일반".split("/");
	
	//콤보박스 동적 생성
	var unitCombo = "";
	var salesCombo = "";
	var tradeCombo = "";
	var custCombo = "";
	
	//단위구분 콤보 생성
	for(var i=0; i<unitVal.length; i++){
		if(i == 0){
			unitCombo += "<option value='"+unitVal[i]+"' selected >"+ unitNM[i] +"</option>";
		}else{
			unitCombo += "<option value='"+unitVal[i]+"' >"+ unitNM[i] +"</option>";
		}
	}
	
	//거래구분 콤보 생성
	for(var i=0; i<tradeVal.length; i++){
		if(i == 0){
			tradeCombo += "<option value='"+tradeVal[i]+"' selected >"+tradeNM[i]+"</option>";
		}else{
			tradeCombo += "<option value='"+tradeVal[i]+"' >"+tradeNM[i]+"</option>";
		}
	}
	
	//판매구분 콤보 생성
	for(var i=0; i<salesVal.length; i++){
		if(i == 0){
			salesCombo += "<option value='"+salesVal[i]+"' selected >"+salesNM[i]+"</option>";
		}else{
			salesCombo += "<option value='"+salesVal[i]+"' >"+salesNM[i]+"</option>";
		}
	}
	
	//고객등급 콤보 생성
	for(var i=0; i<custVal.length; i++){
		if(i == 0){
			custCombo += "<option value='"+custVal[i]+"' selected >"+custNM[i]+"</option>";
		}else{
			custCombo += "<option value='"+custVal[i]+"' >"+custNM[i]+"</option>";
		}
	}	
	trElement = getTrElement();
	
	// TR 작성
	$("#eventCont").append(trElement);
	$("#eventCont tr:last").append("<td class='list1_b_center'></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='checkbox' checked='true' name='sp_chkUsed1' onclick='ChkSetValue(this,\"#sp_usedChk" + sNum + "\");' /><input type='hidden' name='sp_usedChkArray' id='sp_usedChk" + sNum + "' value='Y'/></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_custClass' name='sp_custClass'  class='input1'>"+ custCombo +"</select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_salesTYPE' name='sp_salesTYPE'  class='input1'>"+ salesCombo +"</select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_saveTYPE' name='sp_saveTYPE' class='input1'>"+ tradeCombo +"</select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_Month"+sNum+"' name='sp_MonthArray' class='input1'><option value='00' selected>전체</option><option value='01'>1월</option><option value='02'>2월</option><option value='03'>3월</option><option value='04'>4월</option><option value='05'>5월</option><option value='06'>6월</option><option value='07'>7월</option><option value='08'>8월</option><option value='09'>9월</option><option value='10'>10월</option><option value='11'>11월</option><option value='12'>12월</option></select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_Week"+sNum+"' name='sp_WeekArray' class='input1' onchange='javascript:setEventWeekDay(this, \"" + sNum + "\");'><option value='0' selected>전체</option><option value='1'>일요일</option><option value='2'>월요일</option><option value='3'>화요일</option><option value='4'>수요일</option><option value='5'>목요일</option><option value='6'>금요일</option><option value='7'>토요일</option></select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_Day"+sNum+"' name='sp_DayArray' class='input1' onchange='javascript:setEventWeekDay(this, \"" + sNum + "\");'><option value='00' selected>전체</option><option value='01'>1일</option><option value='02'>2일</option><option value='03'>3일</option><option value='04'>4일</option><option value='05'>5일</option><option value='06'>6일</option><option value='07'>7일</option><option value='08'>8일</option><option value='09'>9일</option><option value='10'>10일</option><option value='11'>11일</option><option value='12'>12일</option><option value='13'>13일</option><option value='14'>14일</option><option value='15'>15일</option><option value='16'>16일</option><option value='17'>17일</option><option value='18'>18일</option><option value='19'>19일</option><option value='20'>20일</option><option value='21'>21일</option><option value='22'>22일</option><option value='23'>23일</option><option value='24'>24일</option><option value='25'>25일</option><option value='26'>26일</option><option value='27'>27일</option><option value='28'>28일</option><option value='29'>29일</option><option value='30'>30일</option><option value='31'>31일</option></select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_gubunSave"+sNum+"' name='sp_gubunSave' class='input1' onchange='javascript:setMoneyValues(\"sp_txtSave" + sNum + "\", \"sp_txtPay" + sNum + "\", \"sp_txtLimit" + sNum + "\");'>"+ unitCombo +"</select></td>");
//	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='text' value='0' style='width:100%;' id='sp_txtSave"+sNum+"' name= 'sp_txtSave' size='12' style='text-align:right;' onkeyup='javascript:checkSaveNum(this, \"sp_gubunSave" + sNum + "\")' maxlength='10'></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='text' value='0' style='width:100%;' id='sp_txtSave"+sNum+"' name= 'sp_txtSave' size='12' style='text-align:right;' onkeyup='javascript:onlyNum(this)' maxlength='10'></td>");

	
	$("#eventCont tr:last").append("<td class='list1_b_center'><select id='sp_gubunPay"+sNum+"' name='sp_gubunPay' class='input1' onchange='javascript:setPayValue(\"sp_txtPay" + sNum + "\")'>"+ unitCombo +"</select></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='text' value='0' style='width:100%;' id='sp_txtPay"+sNum+"' name= 'sp_txtPay' size='10' style='text-align:right;' onkeyup='javascript:checkPayNum(this, \"sp_gubunPay" + sNum + "\")' maxlength='10'></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='text' value='0' style='width:100%;' id='sp_txtLimit"+sNum+"' name= 'sp_txtLimit' size='10' style='text-align:right;' onkeyup='javascript:checkLimitNum(this, \"sp_gubunSave" + sNum + "\", \"sp_txtSave" + sNum + "\")' maxlength='10'></td>");
	//$("#eventCont tr:last").append("<td class='list1_b_center'></td>");
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='text' value=' ' style='width:100%;' name='sp_txtRmrk' size='10' onkeyup='javascript:checkContentLength(this, 255)' maxlength='255'></td>");
	// $("#eventCont tr:last").append("<td class='list1_b2'><input type='text' style='width:100%' class='input1' name='teleItemDesc' onkeyup='javascript:checkContentLength(this, 4000)' ></td>"); 
	$("#eventCont tr:last").append("<td class='list1_b_center'><input type='button' value='X' onclick='javascript:delRow(this);' ></td>");
	
	// 안내문 삭제
	if ($("#firstTeleRow").text() != '') {
		$("#eventItemTableBody tr:first").remove();
	}
	
 	// NO 초기화
	seteventItemTableNo();
 	sNum++;
}
//숫자 체크 함수
//function issNumber(str){
//	var chars = "0123456789"; 
// 	//alert(str.value);
// 	str = str.value;
// 	//alert(str.length);
// 	var length = str.length;
//	alert("length = "+length);
//     for (var inx=0; inx<3;inx++) {
////    	alert(str.charAt(inx));
////    	//alert(inx)
////     	alert(chars.indexOf(str.charAt(inx)));
////    	alert(chars.indexOf(str.charAt(inx)) != -1);
//         if (chars.indexOf(str.charAt(inx)) == -1){
//             return true;
//         }
//      }
//      return false;
// }

// 숫자만 입력 허용
// function onlyNum(event) {
//	 alert("sss"+event.keyCode);
//      if((event.keyCode < 48) || (event.keyCode > 57)) {
// 		     if(navigator.appName=="Netscape")
//                 event.preventDefault();
//              else
// 			    event.returnValue = false;
// 	 }
// }

//적립(%/원) 입력값 체크
function checkSaveNum(obj, gubunSaveId){
	alert(issNumber(obj));
	// 숫자인지 체크
	if (!issNumber(obj)){
		alert('숫자로 입력해 주십시오');
		obj.value = getRemovedStrNum(obj);
		return false;
	}
	
	//obj.value = Number(obj.value);
	
	//공통코드 취득
// 	var unitVal = $("#unitVal").val().split("/");
	var unitVal = "001/002".split("/");
	
	if ($("#" + gubunSaveId).val() == unitVal[0]) {
		if (Number(obj.value) > 100) {
			alert('적립 비율을 100 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	} else if ($("#" + gubunSaveId).val() == unitVal[1]) {
		if (Number(obj.value) > 9999999999) {
			alert('적립 금액을 9999999999 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	}
}
// //숫자 체크 함수
// function issNumber(str, length){
// 	var chars = "0123456789"; 

//     if (chars.indexOf(str.charAt(inx)) != -1){
//         return true;
//     }else{
//     	return false;	
//     }
// }
//매출한도액(원) 입력값 체크
function checkLimitNum(obj, gubunSaveId, txtSaveId) {
	// 숫자인지 체크
	if (!issNumber(obj)) {
		alert('숫자로 입력해 주십시오');
		
		obj.value = getRemovedStrNum(obj);
		return false;
	}
	
	//obj.value = Number(obj.value);
	
	if (Number($("#" + txtSaveId).val()) == 0) {
		$("#" + txtSaveId).val('0');
	}
	
	//공통코드 취득
// 	var unitVal = $("#unitVal").val().split("/");
	var unitVal = "001/002".split("/");
	
	if ($("#" + gubunSaveId).val() == unitVal[0]) {
		if (Number(obj.value) > 9999999999) {
			alert('가맹점 분담금액을 9999999999 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	} else if ($("#" + gubunSaveId).val() == unitVal[1]) {
		if (Number($("#" + txtSaveId).val()) < Number(obj.value)) {
			alert('매출한도액을 적립금액 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	}
}
// 가맹점분담(%/원) 입력값 체크
function checkPayNum(obj, payId) {
	
	// 숫자인지 체크
	if (!issNumber(obj)) {
		alert('숫자로 입력해 주십시오');
		obj.value = getRemovedStrNum(obj);
		return false;
	}
	
	//obj.value = Number(obj.value);
	
	//공통코드 취득
// 	var unitVal = $("#unitVal").val().split("/");
	var unitVal = "001/002".split("/");
	
	if ($("#" + payId).val() == unitVal[0]) {
		if (Number(obj.value) > 100) {
			alert('가맹점 분담비율을 100 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	} else if ($("#" + payId).val() == unitVal[1]) {
		if (Number(obj.value) > 9999999999) {
			alert('가맹점 분담금액을 9999999999 이하로 입력해 주십시오');
			obj.value = '0';
			return false;
		}
	}
}
//TR 요소 취득
function getTrElement() {
	// 헤더에서 TR 요소 취득
	var trElement = $("#eventCont tr:first").clone().removeClass().empty();

	// 마우스 오버시 화면 표시 이벤트 추가
	/* trElement.bind("mouseover", function(e) {
		this.className = 'on';
	}); */
	trElement.bind("mouseout", function(e) {
		$('#eventItemTableBody tr').removeClass();
	});
	return trElement;
}
//가맹점분담(%/원) 초기화
function setPayValue(textPayId) {
	$("#" + textPayId).val('0');
}
// 적립(%/원), 가맹점분담(%/원), 매출한도액(원) 초기화
function setMoneyValues(textSaveId, textPayId, textLimitId) {
	$("#" + textSaveId).val('0');
	$("#" + textPayId).val('0');
	$("#" + textLimitId).val('0');
}
//NO 설정
function seteventItemTableNo() {
	// NO 설정
	$("#eventItemTableBody td:first-child").each(function(i) {
		$(this).text(i + 1);
	});
}
//신규 저장시 입력 값 길이 제한
function checkContentLength(str,max){
	
	var inputStr = $(str).val();
	var subStr = inputStr.substr(0,max - 1);
	
	
	if(inputStr.length > max){
		alert("255자를 넘을 수 없습니다.");
		$(str).value(subStr);
		return false;
	}
}
//체크박스 Value 설정
function ChkSetValue(obj, str){	
	if($(obj).is(":checked")){
		$(str).attr("value","Y");
	}else{
		$(str).attr("value","N");
	}
}
//이벤트 등록시 요일, 일 배타적으로 선택
function setEventWeekDay(obj, num) {
	if (Number($(obj).val()) != 0) {
		var temp = $(obj).val();
		$("#sp_Week" + num).val('0');
		$("#sp_Day" + num).val('00');
		$(obj).val(temp);
	}
}
//유효기간 Vallidation 체크
function validateDates(obj) {
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
//신규생성
function doNewContract() {
	 
	//setEventValue();
	$("#basic").attr("style","");
	$("#event").attr("style","display:none");
	$("#btnAdd").attr("style","display:none");
		
	// 브랜드명을 선택하지 않았을 경우
	if ($("#brand_wid").val() == '') {
		alert('브랜드명을 선택해 주십시오');
		$("#brand_wid").focus();
		return;
	}
	
	// 가맹점명을 선택하지 않았을 경우
	if ($("#store_name").val() == '') {
		alert('가맹점 조회 버튼을 클릭하여 선택해 주십시오');
		return;
	}
	// 가맹점의 폐점여부 확인
	checkStoreEndYn($("#brand_wid").val(), $("#store_wid").val(), $('#trnsPosDiv').val());
}
// 특수 계약 이동
function special_cont(cont_wid){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	var store_name = $("input[name=store_name]").val();
	var store_wid = $("input[name=store_wid]").val();
	var brand_wid = $("select[name=brand_wid]").val();	
	var cont_name = $("input[name=contName]").val();	
	var trnsPosDiv = $("input[name=trns_pos_div]").val();// 2016-02-12 '${trnsPosDiv}';
    var cont_use_yn = $("#usedChk").val();
	var cont_name = $("input[name=contName]").val();	
    var cont_start_dt = $("#cont_SDT").val();
    var cont_end_dt = $("#cont_EDT").val();
    
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/specialCont');
    $form.attr('method', 'post');
    $form.appendTo('body');    
    
    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var cont_wid_input = $('<input type="hidden" value="'+cont_wid+'" name="cont_wid">');
    var store_name_input = $('<input type="hidden" value="'+store_name+'" name="store_name">');
    var store_wid_input = $('<input type="hidden" value="'+store_wid+'" name="store_wid">');
    var trnsPosDiv_input = $('<input type="hidden" value="'+trnsPosDiv+'" name="trnsPosDiv">');
    var brand_wid_input = $('<input type="hidden" value="'+brand_wid+'" name="brand_wid">');
    var cont_use_yn_input = $('<input type="hidden" value="'+cont_use_yn+'" name="cont_use_yn">');
    var cont_name_input = $('<input type="hidden" value="'+cont_name+'" name="cont_name">');
    var cont_start_dt_input = $('<input type="hidden" value="'+cont_start_dt+'" name="cont_start_dt">');
    var cont_end_dt_input = $('<input type="hidden" value="'+cont_end_dt+'" name="cont_end_dt">');
    
    $form.append(Mainmenu_idInput)
			.append(cont_wid_input)
			.append(store_name_input)
			.append(store_wid_input)
			.append(trnsPosDiv_input)
			.append(brand_wid_input)
			.append(cont_name_input)
			.append(cont_start_dt_input)
			.append(cont_end_dt_input)
			.append(cont_use_yn_input);
    viewLoadingShow();
    $form.submit();	
}
//계약 삭제
function deleteContract() {
	var ctx = $("#ctx").val();
	var contWid = $("#contWid").val();
	
	if (contWid != null && contWid != '') {
		// 계약 삭제
		if (confirm('삭제하시겠습니까?')) {
			// 비동기로 form 데이타 전송
			var data = "contWid=" + contWid;
			
			var $form = $('<form></form>');
		    $form.attr('action', ctx+'/deleteContractAjax');
		    $form.attr('method', 'post');
		    $form.appendTo('body');
		    
		    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
		    var cont_wid_input = $('<input type="hidden" value="'+contWid+'" name="cont_wid">');

		    $form.append(Mainmenu_idInput)
					.append(cont_wid_input);
		    viewLoadingShow();
		    $form.submit();	
		}
	}
}
function createContNormal(){
	if(confirm("기본계약을 추가 하시겠습니까?")){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	var	contdiv = '001';
	var mode = "add";
	
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractInsertForm');
    $form.attr('method', 'post');
    $form.appendTo('body');

    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var contdiv_input = $('<input type="hidden" value="'+contdiv+'" name="contdiv">');
    var mode_input = $('<input type="hidden" value="'+mode+'" name="mode">');
    $form.append(Mainmenu_idInput).append(contdiv_input).append(mode_input);
    viewLoadingShow();
	$form.submit();
	}    
}
function createContEvent(){
	if(confirm("이벤트계약을 추가 하시겠습니까?")){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	var	contdiv = '002';
	var mode = "add";
	
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/contractInsertForm');
    $form.attr('method', 'post');
    $form.appendTo('body');

    var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
    var contdiv_input = $('<input type="hidden" value="'+contdiv+'" name="contdiv">');
    var mode_input = $('<input type="hidden" value="'+mode+'" name="mode">');
    $form.append(Mainmenu_idInput).append(contdiv_input).append(mode_input);
    viewLoadingShow();
	$form.submit();
	}	   
}
function editBtnClick(){
	$("#useCheckBox").attr("disabled",false);
	$(".chkUsed").attr("disabled",false);
	$("#cont_EDT").attr("disabled",false);
	$("#cont_EDT").css("background","white");
	$("input[name=txtRmrkArray]").attr("disabled",false);
	$("input[name=txtRmrkArray]").css("background","white");
	
	$("#add_btn").hide();
	$("#add_btn2").hide();
	$("#edit_btn").hide();
	$("#edit_btn2").hide();
	$("#save_btn").show();
	$("#save_btn2").show();
}

//표시 월을 반환
function getEventMonth(month) {
	if (month == '00') {
		return '-';
	} else {
		var monthInt = Number(month);
		return monthInt + '월';
	}
}

//표시 일을 반환
function getEventDay(day) {
	if (day == '00') {
		return '-';
	} else {
		var dayInt = Number(day);
		return dayInt + '일';
	}
}

//표시 요일을 반환
function getEventWeek(week) {
	if (week == '0') {
		return '-';
	} else {
		var weekInt = Number(week);
		switch (weekInt) {
			case 1 : return '일요일';
			case 2 : return '월요일';
			case 3 : return '화요일';
			case 4 : return '수요일';
			case 5 : return '목요일';
			case 6 : return '금요일';
			case 7 : return '토요일';
		}
	}
}
// contract detail js end

