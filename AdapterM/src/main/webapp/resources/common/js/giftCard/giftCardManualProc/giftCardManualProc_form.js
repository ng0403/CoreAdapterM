$(document).ready(function() {
	var ctx = $("#ctx").val();
	manualSaveCardSch(ctx);
	giftCardManualSaveProc(ctx);
	manualSaveRadioChange();
	pauseGiftCardRadioChange();
	cardChngOldKeyWidSch(ctx)
	cardChngNewKeyWidSch(ctx);
	giftCardManualChngProc(ctx);
	cardChngResetBtn();
	totAmtInfoResetBtn();
	manualSaveResetBtn();
	totAmtInfo(ctx);
	getGiftCardStatus(ctx);
	pauseGiftCardSaveProc(ctx);
	pauseGiftCardResetBtn();
	
});

//기프트카드 잔액 조회 
function totAmtInfo(ctx){
	
	$("#totAmtInfo_keyWid_sch").click(function(){
		var key_wid = $("#totAmtInfo_keyWid").val();
		if(key_wid == null ||  key_wid == ''){
			alert("조회하실 카드번호를 입력해주세요.");
			$("#totAmtInfo_keyWid").focus();
			return;
		}else if(isValidNumber(key_wid)==false){
			alert("숫자만 입력해주세요.");
			$("#totAmtInfo_keyWid").focus();
			return;
		}
		$.ajax({
			url: ctx + "/totAmtInfo", 
			type: "POST",  
			data: {"KEY_WID" : key_wid},
			dataType: "json",
			success: function(data) { 
				if(data.RESP_MESSAGE_CD == "00"){
					alert(data.RESP_MESSAGE_NM);
					$("#totAmtInfo_totAmt").attr("value",data.TOT_AMT);
					$("#totAmtInfo_keyWid").attr("disabled",true);
				}else{
					alert(data.RESP_MESSAGE_NM);
					$("#totAmtInfo_keyWid").focus();
				}
			}
		});
	});
	
}


//기프트카드 상태 조회 
function getGiftCardStatus(ctx){
	$("#pauseGiftCard_keyWid_sch").click(function(){
		var key_wid = $("#pauseGiftCard_keyWid").val();
		if(key_wid == null ||  key_wid == ''){
			alert("조회하실 카드번호를 입력해주세요.");
			$("#pauseGiftCard_keyWid").focus();
			return;
		}else if(isValidNumber(key_wid)==false){
			alert("숫자만 입력해주세요.");
			$("#pauseGiftCard_keyWid").focus();
			return;
		}
		$.ajax({
			url: ctx + "/getGiftCardStatus", 
			type: "POST",  
			data: {"KEY_WID" : key_wid},
			dataType: "json",
			success: function(data) { 
				if(data.RESP_MESSAGE_CD == "00"){
					alert(data.RESP_MESSAGE_NM);
					$("#pauseGiftCard_status").attr("value",data.CARD_STATUS_NM);
					$("#pauseGiftCard_keyWid").attr("disabled",true);
				}else{
					alert(data.RESP_MESSAGE_NM);
					$("#pauseGiftCard_keyWid").focus();
				}
			}
		});
	});
}

//수기 적립/차감 라디오 버튼 클릭시 checked 속성부여
function manualSaveRadioChange(){
	$(".manualSave_radio").click(function(){
		var val = $(this).val();
		$(".manualSave_radio").each(function(){
			if($(this).val()==val){
				$(this).prop("checked",true);
			}else{
				$(this).prop("checked",false);
			}
		});
	});
}

//분실신고/해제 라디오 버튼 클릭시 checked 속성부여
function pauseGiftCardRadioChange(){
	$(".pauseGiftCard_radio").click(function(){
		var val = $(this).val();
		$(".pauseGiftCard_radio").each(function(){
			if($(this).val()==val){
				$(this).prop("checked",true);
			}else{
				$(this).prop("checked",false);
			}
		});
	});
}


//수기적립차감 카드조회
function manualSaveCardSch(ctx){
	
	$("#manualSave_keyWid_sch").click(function(){
		var key_wid = $("#manualSave_keyWid").val();
		if(key_wid == null ||  key_wid == ''){
			alert("조회하실 카드번호를 입력해주세요.");
			$("#manualSave_keyWid").focus();
			return;
		}else if(isValidNumber(key_wid)==false){
			alert("숫자만 입력해주세요.");
			$("#manualSave_keyWid").focus();
			return;
		}
		$.ajax({
			url: ctx + "/giftNewCardSearch", 
			type: "POST",  
			data: {"KEY_WID" : key_wid},
			dataType: "json",
			success: function(data) { 
				if(data.RESP_MESSAGE_CD == "00"){
					alert(data.RESP_MESSAGE_NM);
					$("#manualSave_totAmt").attr("value",data.TOT_AMT);
					$("#manualSave_keyWid").attr("disabled",true);
				}else{
					alert(data.RESP_MESSAGE_NM);
					$("#manualSave_keyWid").focus();
				}
			}
		});
	});
}

//카드교체 리셋
function cardChngResetBtn(){
	
	$("#cardChng_reset").click(function(){
		$("#cardChng_oldKeyWid").val('');
		$("#cardChng_newKeyWid").val('');
		$("#cardChng_oldKeyWid").attr("disabled",false);
		$("#cardChng_newKeyWid").attr("disabled",false);
		$("#cardChng_oldTotAmt").attr('value','');
		$("#cardChng_newTotAmt").attr('value','');
		$("#cardChng_brandWid option").eq(0).attr('selected',true);
		$("#cardChng_store_wid").val('');
		$("#cardChng_store_name").val('');
		$("#cardChng_trns_pos_div").val('');
	});

}

//카드잔액조회 리셋
function totAmtInfoResetBtn(){
	$("#totAmtInfo_reset").click(function(){
		$("#totAmtInfo_keyWid").val('');
		$("#totAmtInfo_totAmt").attr("value",'');
		$("#totAmtInfo_keyWid").attr("disabled",false);
	});
}

//분실신고해제 리셋
function pauseGiftCardResetBtn(){
	$("#pauseGiftCard_reset").click(function(){
		$("#pauseGiftCard_keyWid").val('');
		$("#pauseGiftCard_status").attr("value",'');
		$("#pauseGiftCard_keyWid").attr("disabled",false);
		
		$("input[class=pauseGiftCard_radio]").each(function(){
			if($(this).val() == "1"){
				$(this).prop("checked",true);
			}else{
				$(this).prop("checked",false);
			}
		});
	});
}

//카드적립차감 리셋
function manualSaveResetBtn(){
	$("#manualSave_reset").click(function(){
		$("#manualSave_keyWid").val('');
		$("#manualSave_keyWid").attr("disabled",false);
		$("#manualSave_totAmt").attr('value','');
		$("#manualSave_trnsAmt").val('');
		$("#manualSave_brandWid option").eq(0).attr('selected',true);
		$("#manualSave_store_name").val('');
		$("#manualSave_store_wid").val('');
		$("#manualSave_trns_pos_div").val('');
		
		
		$("input[class=manualSave_radio]").each(function(){
			if($(this).val() == "1"){
				$(this).prop("checked",true);
			}else{
				$(this).prop("checked",false);
			}
		});
	});
}

//카드교체 구카드조회
function cardChngOldKeyWidSch(ctx){
	
	$("#cardChng_oldKeyWid_sch").click(function(){
		var key_wid = $("#cardChng_oldKeyWid").val();
		if(key_wid == null ||  key_wid == ''){
			alert("조회하실 카드번호를 입력해주세요.");
			$("#cardChng_oldKeyWid").focus();
			return;
		}else if(isValidNumber(key_wid)==false){
			alert("숫자만 입력해주세요.");
			$("#cardChng_oldKeyWid").focus();
			return;
		}
		$.ajax({
			url: ctx + "/giftOldCardSearch", 
			type: "POST",  
			data: {"KEY_WID" : key_wid},
			dataType: "json",
			success: function(data) { 
				if(data.RESP_MESSAGE_CD == "00"){
					alert(data.RESP_MESSAGE_NM);
					$("#cardChng_oldTotAmt").attr("value",data.TOT_AMT);
					$("#cardChng_oldKeyWid").attr("disabled",true);
				}else{
					alert(data.RESP_MESSAGE_NM);
					$("#cardChng_oldKeyWid").focus();
				}
			}
		});
	});
}

//카드교체 새카드조회
function cardChngNewKeyWidSch(ctx){
	
	$("#cardChng_newKeyWid_sch").click(function(){
		var key_wid = $("#cardChng_newKeyWid").val();
		if(key_wid == null ||  key_wid == ''){
			alert("조회하실 카드번호를 입력해주세요.");
			$("#cardChng_newKeyWid").focus();
			return;
		}else if(isValidNumber(key_wid)==false){
			alert("숫자만 입력해주세요.");
			$("#cardChng_newKeyWid").focus();
			return;
		}
		$.ajax({
			url: ctx + "/giftNewCardSearch", 
			type: "POST",  
			data: {"KEY_WID" : key_wid},
			dataType: "json",
			success: function(data) { 
				if(data.RESP_MESSAGE_CD == "00"){
					alert(data.RESP_MESSAGE_NM);
					$("#cardChng_newTotAmt").attr("value",data.TOT_AMT);
					$("#cardChng_newKeyWid").attr("disabled",true);
				}else{
					alert(data.RESP_MESSAGE_NM);
					$("#cardChng_newKeyWid").focus();
				}
			}
		});
	});
}


//수기적립차감 저장
function giftCardManualSaveProc(ctx){
	
	$("#manualSave_save").click(function(){
		var sendData = "";
		var manualSave_keyWid = $("#manualSave_keyWid").val();
		var manualSave_totAmt = $("#manualSave_totAmt").val();
		var manualSave_trnsAmt = $("#manualSave_trnsAmt").val();
		var manualSave_radio = $("input[class=manualSave_radio]:checked").val(); 
		var manualSave_brandWid = $("#manualSave_brandWid").val();
		var manualSave_store_wid = $("#manualSave_store_wid").val();
		var manualSave_trns_pos_div = $("#manualSave_trns_pos_div").val();

		
		if(manualSave_totAmt == null ||  manualSave_totAmt == ''){
			alert("수기 적립/차감하실 카드를 먼저 조회해주세요.");
			$("#manualSave_keyWid").focus();
			return;
		}else if(manualSave_trnsAmt == null || manualSave_trnsAmt == ''){
			alert("금액을 입력해주세요.");
			$("#manualSave_trnsAmt").focus();
			return;
		}else if(isValidNumber(manualSave_trnsAmt) == false){
			alert("숫자만 입력해주세요.");
			$("#manualSave_trnsAmt").focus();
			return;
		}else if(manualSave_radio == null || manualSave_radio ==''){
			alert("충전/차감 체크박스를 선택해주세요.");
			return;
		}else if(manualSave_brandWid == null || manualSave_brandWid ==''){
			alert("브랜드를 선택해주세요.");
			$("#manualSave_brandWid").focus();
			return;
		}else if(manualSave_store_wid == null || manualSave_store_wid == ''){
			alert("가맹점을 선택해주세요.");
			$("#manualSave_store_wid").focus();
			return;
		}
		
		var message = "";
		if(manualSave_radio == "1"){
			message ="충전 하시겠습니까?";
		}else if(manualSave_radio == "2"){
			message ="차감 하시겠습니까?";
		}else if(manualSave_radio == "3"){
			message ="신규발급 하시겠습니까?";
		}
		
		if(!confirm(message))
			return;
		
		sendData = "TRNS_AMT=" +  manualSave_trnsAmt
				  +"&STORE_WID=" + manualSave_store_wid
				  +"&TRNS_POS_DIV="+manualSave_trns_pos_div
				  +"&RADIO_VAL="+manualSave_radio
				  +"&KEY_WID="+manualSave_keyWid;
		
		if(manualSave_radio == "1" || manualSave_radio == "3"){
			$.ajax({
				url: ctx + "/giftCardManualSaveProc", 
				type: "POST",  
				data: sendData,
				dataType: "json",
				success: function(data) {
					if(data.RESP_MESSAGE_CD == "00"){
						alert(data.RESP_MESSAGE_NM);
						$("#manualSave_totAmt").attr("value",data.GIFT_AMT);
						$("#manualSave_keyWid").attr("disabled",true);
					}else{
						alert(data.RESP_MESSAGE_NM);
						$("#manualSave_keyWid").focus();
					}
				}
			});
		}else if(manualSave_radio == "2"){
			$.ajax({
				url: ctx + "/giftCardManualDelProc", 
				type: "POST",  
				data: sendData,
				dataType: "json",
				success: function(data) {
					if(data.RESP_MESSAGE_CD == "00"){
						alert(data.RESP_MESSAGE_NM);
						$("#manualSave_totAmt").attr("value",data.GIFT_AMT);
						$("#manualSave_keyWid").attr("disabled",true);
					}else{
						alert(data.RESP_MESSAGE_NM);
						$("#manualSave_keyWid").focus();
					}
				}
			});
		}			
	});
}

//분실신고해제 저장
function pauseGiftCardSaveProc(ctx){
	
	$("#pauseGiftCard_save").click(function(){
		var sendData = "";
		var pauseGiftCard_keyWid = $("#pauseGiftCard_keyWid").val();
		var pauseGiftCard_status = $("#pauseGiftCard_status").val();
		var pauseGiftCard_radio = $("input[class=pauseGiftCard_radio]:checked").val(); 
		var pauseGiftCard_CD = $("input[type=pauseGiftCard_radio]:checked").val(); 

		
		if(pauseGiftCard_status == null ||  pauseGiftCard_status == ''){
			alert("분실 신고/해제하실 카드를 먼저 조회해주세요.");
			$("#pauseGiftCard_keyWid").focus();
			return;
		}else if(pauseGiftCard_radio == null || pauseGiftCard_radio ==''){
			alert("신고/해제 체크박스를 선택해주세요.");
			return;
		}else if(pauseGiftCard_radio == "1" && pauseGiftCard_status == "일시정지"){
			alert("이미 분실신고 처리된 카드입니다.");
			return;
		}else if(pauseGiftCard_radio == "2" && pauseGiftCard_status == "사용가능"){
			alert("이미 사용가능한 카드입니다.");
			return;
		}
		
		var message = "";
		if(pauseGiftCard_radio == "1"){
			message ="분실 신고 하시겠습니까?";
		}else if(pauseGiftCard_radio == "2"){
			message ="분실 해제 하시겠습니까?";
		}
		if(!confirm(message))
			return;
		
		sendData = "KEY_WID=" +  pauseGiftCard_keyWid;
		
		if(pauseGiftCard_radio == "1"){
			$.ajax({
				url: ctx + "/pauseGiftCard", 
				type: "POST",  
				data: sendData,
				dataType: "json",
				success: function(data) {
					if(data.RESP_MESSAGE_CD == "00"){
						alert(data.RESP_MESSAGE_NM);
						$("#pauseGiftCard_status").attr("value",data.CARD_STATUS_NM);
						$("#pauseGiftCard_keyWid").attr("disabled",true);
					}else{
						alert(data.RESP_MESSAGE_NM);
						$("#pauseGiftCard_keyWid").focus();
					}
				}
			});
		}else if(pauseGiftCard_radio == "2"){
			$.ajax({
				url: ctx + "/cancelPauseGiftCard", 
				type: "POST",  
				data: sendData,
				dataType: "json",
				success: function(data) {
					if(data.RESP_MESSAGE_CD == "00"){
						alert(data.RESP_MESSAGE_NM);
						$("#pauseGiftCard_status").attr("value",data.CARD_STATUS_NM);
						$("#pauseGiftCard_keyWid").attr("disabled",true);
					}else{
						alert(data.RESP_MESSAGE_NM);
						$("#pauseGiftCard_keyWid").focus();
					}
				}
			});
		   }
		});
}

//기프트카드 수기카드교체
function giftCardManualChngProc(ctx){
	$("#cardChng_save").click(function(){
		var sendData = "";
		var cardChng_oldKeyWid = $("#cardChng_oldKeyWid").val();
		var cardChng_newKeyWid = $("#cardChng_newKeyWid").val();
		var cardChng_oldTotAmt = $("#cardChng_oldTotAmt").val();
		var cardChng_newTotAmt = $("#cardChng_newTotAmt").val();
		var cardChng_brandWid = $("#cardChng_brandWid").val();
		var cardChng_store_wid = $("#cardChng_store_wid").val();
		var cardChng_trns_pos_div = $("#cardChng_trns_pos_div").val();
		
		if(cardChng_oldTotAmt == null ||  cardChng_oldTotAmt == ''){
			alert("교체하실 구카드번호를 먼저 조회해주세요.");
			$("#cardChng_oldKeyWid").focus();
			return;
		}else if(cardChng_newTotAmt == null || cardChng_newTotAmt ==''){
			alert("교체하실 새카드번호를 먼저 조회해주세요.");
			$("#cardChng_newKeyWid").focus();
			return;
		}else if(cardChng_brandWid == null || cardChng_brandWid ==''){
			alert("브랜드를 선택해주세요.");
			$("#cardChng_brandWid").focus();
			return;
		}else if(cardChng_store_wid == null || cardChng_store_wid == ''){
			alert("가맹점을 선택해주세요.");
			return;
		}
		
		var message = "카드를 교체하시겠습니까?";
		
		if(!confirm(message))
			return;
		
		sendData = "STORE_WID=" + cardChng_store_wid
				  +"&TRNS_POS_DIV="+cardChng_trns_pos_div
				  +"&OLD_KEY_WID="+cardChng_oldKeyWid
				  +"&NEW_KEY_WID="+cardChng_newKeyWid
		
				  $.ajax({
						url: ctx + "/giftCardManualChngProc", 
						type: "POST",  
						data: sendData,
						dataType: "json",
						success: function(data) {
							if(data.RESP_MESSAGE_CD == "00"){
								alert(data.RESP_MESSAGE_NM);
								$("#cardChng_newTotAmt").attr("value",data.NEW_TOT_AMT);
								$("#cardChng_oldTotAmt").attr("value",data.OLD_TOT_AMT);
							}else{
								alert(data.RESP_MESSAGE_NM);
							}
						}
					});		
				});
}

/* 수기적립/차감 팝업창 가맹점목록 표시 */
function viewSaveFranchiseList(franPageNum, schDiv) {
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

			$("#searchNm").bind("keypress", function(event) {
				saveFranEnterSearch(event);
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
					doPopupClose(); // 팝업창 닫기
					setSaveStoreID(store_wid, store_name, pos_no);
				});
				
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				// TR 작성
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td class='list1_b' align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.franPageNum) - 1) * 10)) + "</td>"
						+ "<td class='list1_b' width='60%'>" + this.store_name + "</td>"
						+ "<td class='list1_b' width='30%'>" + this.store_wid + "</td>");
			});
			
			// 페이징 다시그리기
			$("#franPagingDiv").empty();
			var pageContent = "";
			if(data.franPage.endPageNum == 0 || data.franPage.endPageNum == 1){
				pageContent = "◀ <input type='text' id='franPageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.franPageNum == data.franPage.startPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"◀ <input type='text' id='franPageInput' value='"+data.franPage.startPageNum+"' onkeypress=\"saveFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewSaveFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewSaveFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.franPageNum == data.franPage.endPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewSaveFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPage.endPageNum+"' onkeypress=\"saveFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.franPage.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewSaveFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPageNum+"' onkeypress=\"saveFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewSaveFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewSaveFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
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


/* 수기카드교체 팝업창 가맹점목록 표시 */
function viewChngFranchiseList(franPageNum, schDiv) {
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

			$("#searchNm").bind("keypress", function(event) {
				chngFranEnterSearch(event);
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
					doPopupClose(); // 팝업창 닫기
					setChngStoreID(store_wid, store_name, pos_no);
				});
				
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				// TR 작성
				$("#contractDetail").append(trElement);
				$("#contractDetail tr:last").append("<td class='list1_b' align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.franPageNum) - 1) * 10)) + "</td>"
						+ "<td class='list1_b' width='60%'>" + this.store_name + "</td>"
						+ "<td class='list1_b' width='30%'>" + this.store_wid + "</td>");
			});
			
			// 페이징 다시그리기
			$("#franPagingDiv").empty();
			var pageContent = "";
			if(data.franPage.endPageNum == 0 || data.franPage.endPageNum == 1){
				pageContent = "◀ <input type='text' id='franPageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.franPageNum == data.franPage.startPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"◀ <input type='text' id='franPageInput' value='"+data.franPage.startPageNum+"' onkeypress=\"chngFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewChngFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewChngFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.franPageNum == data.franPage.endPageNum){
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewChngFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPage.endPageNum+"' onkeypress=\"chngFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.franPage.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='franPageNum' value='"+data.franPageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.franPage.endPageNum+"'/>"
				+"<a onclick=\"viewChngFranchiseList("+(data.franPageNum-1)+", 2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='franPageInput' value='"+data.franPageNum+"' onkeypress=\"chngFranPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewChngFranchiseList("+data.franPage.endPageNum+", 2);\" id='pNum' style='cursor: pointer;'> / "+data.franPage.endPageNum+"</a>"
				+"<a onclick=\"viewChngFranchiseList("+(data.franPageNum+1)+", 2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
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


//수기카드교체 가맹점 리스트 엔터키 기능
function chngFranEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewChngFranchiseList(1, 1);
	}
	event.stopPropagation();
}
//수기적립차감 가맹점 리스트 엔터키 기능
function saveFranEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewSaveFranchiseList(1, 1);
	}
	event.stopPropagation();
}

//수기적립 가맹점 리스트 페이징 엔터 기능
function saveFranPageNumInputEnter(event) {
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
				viewSaveFranchiseList(franPageNum, 2);
			}
		}
		event.stopPropagation();
	});
}

//수기카드교체 가맹점 리스트 페이징 엔터 기능
function chngFranPageNumInputEnter(event) {
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
				viewChngFranchiseList(franPageNum, 2);
				
			}
		}
		event.stopPropagation();
	});
}

//PopUp Box 비표시
function doPopupClose() {
	setTimeout($.unblockUI, 0);
}

//수기적립차감 가맹점값 세팅
function setSaveStoreID(store_wid, store_name, pos_no){
	$(document).ready(function() {
		$("#manualSave_store_name").val(store_name);
		$("#manualSave_store_wid").val(store_wid);
		$("#manualSave_trns_pos_div").val(pos_no);
	});
}


//수기카드교체 가맹점값 세팅
function setChngStoreID(store_wid, store_name, pos_no){
	$(document).ready(function() {
		$("#cardChng_store_name").val(store_name);
		$("#cardChng_store_wid").val(store_wid);
		$("#cardChng_trns_pos_div").val(pos_no);
		
	});
}

// 팝업창 가맹점 조건값 조회
//function franchiseSearch(){	
//	$("#h_schGubun").val($("#schGubun").val());
//	$("#h_searchNm").val($("#searchNm").val());
//	viewFranchiseList(1, 2);
//}
//
////가맹점 초기화
//function franchiseClear(){
//	$("#franchiseNM").attr("value","");
//	$("#store_wid").attr("value","");
//}



function doCardChngStorePopupOpen(){

	$("#searchNm").val('');	//검색 값 초기화
	
	var brand = $("#cardChng_brandWid").val();
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
	var up_id = $("#cardChng_brandWid").val();
	$("#cardChng_brandWid").attr("value",up_id);
	$("#pageNum").val("1");
	
	// 가맹점목록 표시
	viewChngFranchiseList(1, 1);
}


//전문선택 레이어 팝업창 처리
function doManualSaveStorePopupOpen() {
	
	$("#searchNm").val('');	//검색 값 초기화
	
	var brand = $("#manualSave_brandWid").val();
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
	var up_id = $("#manualSave_brandWid").val();
	$("#up_id").attr("value",up_id);
	$("#pageNum").val("1");
	
	// 가맹점목록 표시
	viewSaveFranchiseList(1, 1);
}


//가맹점 구분 Text 설정
function setSaveText(){
	var sVal = "";
	$("#manualSave_brandWid option:selected").each(function(){
		sTxt = $(this).text();
		sVal = $(this).val();
	});
	
	$("#up_id").attr("value",sVal);

	// 가맹점 정보 초기화
	resetSaveStore();
}

//가맹점 검색조건 초기화
function resetSaveStore() {
	$('#manualSave_store_name').val('');
	$('#manualSave_store_wid').val('');
	$('#cardChng_trns_pos_div').val('');
}


//가맹점 구분 Text 설정
function setChngText(){
	var sVal = "";
	$("#cardChng_brandWid option:selected").each(function(){
		sTxt = $(this).text();
		sVal = $(this).val();
	});
	
	$("#up_id").attr("value",sVal);

	// 가맹점 정보 초기화
	resetChngStore();
}

//수기가맹점 검색조건 초기화
function resetChngStore() {
	$('#cardChng_store_name').val('');
	$('#cardChng_store_wid').val('');
	$('#cardChng_trns_pos_div').val('');
}