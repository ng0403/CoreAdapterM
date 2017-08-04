/**
업 무 명 : 가맹점 폐점 및 양도양수
작 성 자 : 오은경 (ekoh@coreplus.co.kr)
작 성 일 : 2015/10/05
수 정 자 : 오은경 (ekoh@coreplus.co.kr)
수 정 일 : 2015/10/05
내 용 : 가맹점 폐점 및 양도양수 처리한다.
*참고사항 : 
*/

var srchDiv="";		//가맹점조회 호출 구분

//가맹점 폐점 및 양도양수 검색 값 유지
$(document).ready(function() {
	var ctx = $('#ctx').val();
	//가맹점 팝업 폐업 불포함 초기값 셋팅
	$("#end_yn").val("N");
});

//가맹점 검색조건 초기화
function resetStore() {
	$('#store_wid').val('');
	$('#store_name').val('');
}

//가맹점 조회 팝업창 처리
function doPopupOpen_shutdown(selectDiv) {
	
	$("#searchNm").val('');	//검색 값 초기화
	var brand_wid = $("#brand_wid").val();
	
	if(brand_wid == null || brand_wid == ''){
		if(selectDiv == 'main')
			alert("브랜드를 선택해 주세요.");
		else
			alert("양도가맹점을 먼저 조회해 주세요.");
		return;
	}
	
	// 팝업창 표시
	$.blockUI({ message: $('#franchiseeModalDiv_shutdown'),
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
	srchDiv = selectDiv;
	
	// 가맹점목록 표시
	viewFranchiseList_shutdown(1);
}

/**
 * 팝업창 가맹점목록 표시
 */
function viewFranchiseList_shutdown(franPageNum) {
	var ctx = $("#ctx").val();
	// 비동기로 form 데이타 전송
	var sendData = "schGubun="+$("#schGubun").val()
	+"&searchNm="+$("#searchNm").val()+"&up_id="+$("#up_id").val()
	+"&franPageNum="+franPageNum+"&end_yn="+$("#end_yn").val()+"&dateSch_flg="+$("#dateSch_flg").val();
	$.ajax({
		url: ctx + "/FranchiseListAjax", 
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",
		success: function(data) {//리턴된값 
			// div 내용삭제
			$("#contractDetail").empty();
			
			$("#searchNm").bind("keypress", function(event) {
				viewFranchiseList_shutdownEnterSearch(event);
			});
			// 테이블 내용 추가
			$.each(data.franchiseList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#franchiseListTableHeader").clone().removeClass().empty();
				var store_wid = this.store_wid;
				var store_name = this.store_name;
				var pos_no = this.trns_pos_div;
				
				// TR에 클릭이벤트 추가
				trElement.bind("click", function(e) {
					// 팝업창 닫기
					doPopupClose();
					
					if(srchDiv == "main"){	//가맹점 조회시
						setStoreID(store_wid, store_name, pos_no);
					}else{						//양수 가맹점 조회시
						setSubStoreID(store_wid, store_name, pos_no);
						$("#btnTrns").val("양수가맹점이관");
						//$("#trns_type").val("to_store");
						$("#trnsBtnDiv").attr("style", "visibility: visible");
						search();
					}
				});
				
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				// TR 작성
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.franPageNum) - 1) * 10)) + "</td>"
						+ "<td width='60%'>" + this.store_name + "</td>"
						+ "<td width='30%'>" + this.store_wid + "</td>");
			});
			// 페이징 다시그리기
			$("#franPagingDiv_shutdown").empty();
			
			var pageContent = "";
			if(data.franPage.endPageNum == 0 || data.franPage.endPageNum == 1){
				pageContent = "◀ <input type='text' id='franPageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.franPageNum == data.franPage.startPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"◀ <input type='text' id='franPageInput' value='"+data.franPage.startPageNum+"' onkeypress=\"viewFranchiseList_shutdownPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewFranchiseList_shutdown("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewFranchiseList_shutdown("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.franPageNum == data.franPage.endPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewFranchiseList_shutdown("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPage.endPageNum+"' onkeypress=\"viewFranchiseList_shutdownPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.franPage.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewFranchiseList_shutdown("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPageNum+"' onkeypress=\"viewFranchiseList_shutdownPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewFranchiseList_shutdown("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewFranchiseList_shutdown("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#franPagingDiv_shutdown").append(pageContent);
			
			// 검색된 가맹점목록이 없을경우 표시
			if (data.franchiseList.length == 0) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#franchiseListTableHeader").clone().removeClass().empty();
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td colspan='3' " +
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
			alert("가맹점목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

//가맹점 리스트 페이징 엔터 기능
function viewFranchiseList_shutdownPageNumInputEnter(event) {
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

//가맹점 리스트 엔터키 기능
function viewFranchiseList_shutdownEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewFranchiseList_shutdown(1, 1);
	}
	event.stopPropagation();
}

//가맹점 팝업 폐점 포함 체크 여부
function checkEndYN_shutdown(){
	if(document.getElementsByName("endYN")[0].checked){		
		$("#end_yn").val('');
	}else{
		$("#end_yn").val("N");
	}
}

//가맹점 정보 설정
function setStoreID(store_wid, store_name, pos_no){
	$(document).ready(function() {
		$("#store_wid").val(store_wid);
		$("#store_name").val(store_name);
		$("#trns_pos_div").val(pos_no);
	});
}

//양수 가맹점 정보 설정
function setSubStoreID(store_wid, store_name, pos_no){
	$(document).ready(function() {
	$("#sub_store_wid").attr("value",store_wid);
	$("#sub_store_name").attr("value",store_name);
	$("#sub_trns_pos_div").val(pos_no);
	});
}

//팝업창 가맹점 조건값 조회
function franchiseSearch_shutdown(){	
	viewFranchiseList_shutdown(1);
}

//양도가맹점 조회
function mainSearch(){

	//선택된 값 유지시켜주는 부분
	var ctx = $('#ctx').val();
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var store_name = $("#store_name").val();
	
	if(brand_wid == null || brand_wid == ''){
		alert("브랜드명을 선택해 주세요!");
		return;
	}
	if(store_wid == null || store_wid == ''){
		alert("가맹점을 선택해 주세요!");
		return;
	}
	
	srchDiv = "main";
	search();
}

/**
 * 가맹점 미정산내역 조회
 */
function search() {

	var brand_wid = $("#brand_wid").val();
 	if(brand_wid == null || brand_wid == ""){
		alert("브랜드를 선택해주세요!");
		return;
	}
 	
	var ctx = $("#ctx").val();
	if(srchDiv=="main")	var sendData = "store_wid="+$("#store_wid").val()+"&store_name="+$("#store_name").val();
	else	var sendData = "store_wid="+$("#sub_store_wid").val()+"&store_name="+$("#sub_store_name").val();
	
	$.ajax({
		url: ctx + "/getNotPaiedInfoAjax", 
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",
		success: function(data) {//리턴된값 
			var tmpStr = "";
			if(srchDiv=="sub")
				tmpStr = "Sub";	 
			
			$("#notPaiedInfo"+tmpStr).empty();
			
			var str_std="";
			if(data.notPaiedInfo.std_ymd_point_from != "" && data.notPaiedInfo.std_ymd_point_from != null) 
				str_std = data.notPaiedInfo.std_ymd_point_from+"~"+data.notPaiedInfo.std_ymd_point_to+"(포인트)";
			
			if(str_std!="") 
				str_std = str_std+"<br>";
			
			if(data.notPaiedInfo.std_ymd_bill_from != "" && data.notPaiedInfo.std_ymd_bill_from != null)
				str_std = str_std+data.notPaiedInfo.std_ymd_bill_from+"~"+data.notPaiedInfo.std_ymd_bill_to+"(수수료)";
			
			var trElement = $("#notPaiedInfoTableHeader"+tmpStr).clone().removeClass().empty();
			
			trElement.css('cursor', 'default');
			trElement.css('background-color', 'white');
			
			if(data.notPaiedInfo != null){
				$("#notPaiedInfo"+tmpStr).append(trElement);
				$("#notPaiedInfo"+tmpStr+ " tr:last").append(
						  "<td>" + str_std + "</td>"
						+ "<td>" + data.notPaiedInfo.store_name + "</td>"
						+ "<td>" + data.notPaiedInfo.erp_store_wid + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.store_add_point + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.store_del_point + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.hq_add_point + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.hq_del_point + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.gift_amt + "</td>"
						+ "<td id='td_value' style='text-align : right;'>" + data.notPaiedInfo.bill_amt + "</td>");
			} else {
				$("#notPaiedInfo"+tmpStr).append(trElement);
				$("#notPaiedInfo"+tmpStr+ " tr:last").append("<td colspan='9' align='center'><b>검색 결과가 없습니다.</b></td>");
			}
			if(srchDiv=="main") {
				viewStoreShutStatus(data.notPaiedInfo.store_end_yn);
			}
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

/**
 * 종결처리조회
 */
function transfer_BonifStore() {
	var store_wid = $("#store_wid").val();
 	if(store_wid == null || store_wid == ""){
		alert("양도가맹점을 먼저 조회해주세요.");
		return;
	}
 	
 	srchDiv="sub";
	$('#srchDiv').val(srchDiv);
	
	var ctx = $("#ctx").val();
	var sendData = "sub_store_wid="+$("#sub_store_wid").val()+"&sub_store_name="+$("#sub_store_name").val();

	$.ajax({
		url: ctx + "/searchBonifTransferStoreAjax", 
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",
		success: function(data) {//리턴된값 
			setSubStoreID(data.bonifTrnsStore.store_wid, data.bonifTrnsStore.store_name, '');
			$("#btnTrns").val("종결처리이관");
			$("#trnsBtnDiv").attr("style", "visibility: visible");
			search();
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("가맹점목록을 취득하지 못했습니다.");
		}
	});
}


function trns_Store(){
	var checkValue=0;
	for(var i = 0 ; i < 6 ; i++){
		if($("[id='td_value']").eq(i).text() == 0){
			++checkValue;
		}
	}
	
	if(checkValue == "6"){
		alert("이관할 데이터가 없습니다.");
		return;
	}
	
	$("[id='release_Content']").eq(i).show();
	
	if($("#btnTrns").val() == "종결처리이관"){
		$("#job_type").attr("value","H");
		if(!confirm("종결처리 하시겠습니까? 미정산된 데이터가 본사가맹점으로 이관되며, 향후 정산과 pos연동이 불가능하게 됩니다.")){
			$("#job_type").attr("value","");
			return;
		}
	}else{
		$("#job_type").attr("value","T");
		if(!confirm("양수가맹점으로 이관하시겠습니까?")){
			$("#job_type").attr("value","");
			return;
		}		
					
	}
	
	var ctx = $("#ctx").val();
	var sendData = "store_wid="+$("#store_wid").val()+"&sub_store_wid="+$("#sub_store_wid").val()
					+"&memo="+$("#memo").val()+"&job_type="+$("#job_type").val();
	$.ajax({
		url: ctx + "/trnsStoreAjax",
		type: "POST",  
		data: sendData,
		dataType: "json",
		success: function(data) {
				if(data.result =="succ"){
					srchDiv = "main";
					search();
					srchDiv = "sub";
					search();
					if($("#job_type").val()=="T")
						alert("양수가맹점 이관이 완료되었습니다.");
					if($("#job_type").val()=="H")
						alert("종결처리가 완료되었습니다.");
				}
				else
					alert("폐점처리중 에러가 발생하였습니다.");
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("가맹점 이관중 에러가 발생했습니다.");
				return false;
			}
	});
}

function confirm_Shutdown(){
	var store_wid = $("#store_wid").val();
 	if(store_wid == null || store_wid == ""){
		alert("양도가맹점을 먼저 조회해주세요.");
		return;
	}
 	
	if(!confirm("폐점처리하시겠습니까? 향후 정산과 pos연동이 불가능하게 됩니다."))
		return;	
	
	doShutdownStore();
}

function doShutdownStore(){

	var ctx = $("#ctx").val();
	var sendData = "store_wid="+$("#store_wid").val()+"&job_type=C";

	$.ajax({
		url: ctx + "/trnsStoreAjax",
		type: "POST", 
		async : false,
		data: sendData, 
		dataType: "json",
		success: function(data) {
			if(data.result =="succ"){
				alert("폐점처리 되었습니다.");
				viewStoreShutStatus("Y");
			}
			else
				alert("폐점처리중 에러가 발생하였습니다.");
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("폐점처리중 에러가 발생하였습니다.");
			return false;
		}
	});
	$("#job_type").attr("value","");
}

function viewStoreShutStatus(storeEndYn){
	if(storeEndYn=="Y") {
		$("#td_shutdown").show();
		$("#shutdownBtn").hide();
	}
	else {
		$("#td_shutdown").hide();
		$("#shutdownBtn").show();
	}
}

//마우스 오버시 화면 표시 이벤트 추가
function addMouseEvent(trElement) {
	trElement.bind("mouseover", function(e) {
		this.className = 'on';
	});
	trElement.bind("mouseout", function(e) {
		this.className = '';
	});
}

