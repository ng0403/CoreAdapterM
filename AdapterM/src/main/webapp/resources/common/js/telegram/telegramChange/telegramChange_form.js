/**
업 무 명 : 전문 관리 상세 화면
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/07/30
내 용 : 전문 관리 상세에 대한 javascript 코드이다.
*참고사항 :  
 */

$(document).ready(function() {
	
	var ctx = $("#ctx").val();
	var map_id = $("#map_id").val();
	
	// 전문 추가 기능
	$("#teleChng_add").click(function() {
		teleChangeFormFunc(0);
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 전문 편집 기능
	$("#teleChng_mdfy").click(function() {
		teleChangeFormFunc(1);
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 전문 추가 취소 기능
	$("#teleChng_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		if(addYn){
			if($("#formFlag").val() == '0'){
				teleChngFormActiveSubmit("/telegramMapList", '');
			} else {
				teleChngFormActiveSubmit('/telegramChangeForm', map_id);
			}
		} else {
			return false;
		}
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 전문 편집 취소 기능
	$("#teleChng_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			teleChngFormActiveSubmit('/telegramChangeForm', map_id);
		} else {
			return false;
		}
	});
	
	// 전문 변환 삭제
	$("#teleChng_del").click(function() {
		var teleDelYN = confirm("삭제하시겠습니까?");
		if(teleDelYN){
			var formID = $("#teleChng_form");
			
			formID.prop("action", ctx + "/telegramMapList");
			var delFlag = $('<input type="hidden" value="1" name="delFlag">');
			var telegramChange_list_chk = $('<input type="hidden" value="'+map_id+'" name="telegramChange_list_chk">');
			formID.append(telegramChange_list_chk);
			formID.append(delFlag);
			
			$("#req_tgt_tele_id").prop("disabled", false);
			$("#rspn_tgt_tele_id").prop("disabled", false);
			
			formID.submit();
		} else {
			return false;
		}
	});
	
	///////////////////////////////////////////////////////////////////////////
	///// POS 선택 //////
	// 요청전문소스의 option 저장
	var rqsValue = [];
	var rqsText = [];
	$("#req_src_tele_id").children().each(function(index, item) {
		rqsValue[index] = $(this).val();
		rqsText[index] = $(this).text();
	});
	
	// 응답전문타겟의 option 저장
	var rstValue = [];
	var rstText = [];
	$("#req_src_tele_id").children().each(function(index, item) {
		rstValue[index] = $(this).val();
		rstText[index] = $(this).text();
	});
	
	// 요청 채널 선택시 요청전문소스와 응답전문타겟 option 변경
	$("#req_chnl_id").change(function(){ 
		var req_chnl_id = $(this).val();
		// 요청전문소스의 옵션 지우고 다시 그리기
		$("#req_src_tele_id").children().remove();
		for (var i = 0; i < rqsValue.length; i++) {
			$("#req_src_tele_id").append('<option value="'+rqsValue[i]+'">'+rqsText[i]+'</option>');
		}
		// 응답전문타겟의 옵션 지우고 다시 그리기
		$("#rspn_tgt_tele_id").children().remove();
		for (var i = 0; i < rqsValue.length; i++) {
			$("#rspn_tgt_tele_id").append('<option value="'+rqsValue[i]+'">'+rqsText[i]+'</option>');
		}
		// 요청채널에 따른 요청전문소스 옵션 고르기
		$("#req_src_tele_id").children().each(function(index, item) {
			if(index != 0){
				if(!$(this).val().match(req_chnl_id)){
					$(this).remove();
				}
			}
		});
		// 요청채널에 따른 응답전문타겟 옵션 고르기
		$("#rspn_tgt_tele_id").children().each(function(index, item) {
			if(index != 0){
				if(!$(this).val().match(req_chnl_id)){
					$(this).remove();
				}
			}
		});
		
		// 요청전문소스가 선택되어있을때 요청전문타겟 상태 변경
		var req_src_tele_id = $("#req_src_tele_id").val();
		if(req_src_tele_id != 0){
			var headerCode = req_src_tele_id.substring(9, 13);
			$("#req_tgt_tele_id").children().each(function() {
				if($(this).val().match(headerCode)){
					$(this).prop("selected", true);
				}
			});
		} else {
			$("#req_tgt_tele_id option").eq(0).prop("selected", true);
		}
		
	});
	
	///////////////////////////////////////////////////////////////////////////
	///// VAN 선택 //////
	// 요청전문타겟의 option 저장
	var rqtValue = [];
	var rqtText = [];
	$("#req_tgt_tele_id").children().each(function(index, item) {
		rqtValue[index] = $(this).val();
		rqtText[index] = $(this).text();
	});
	
	// 응답전문소스의 option 저장
	var rssValue = [];
	var rssText = [];
	$("#req_tgt_tele_id").children().each(function(index, item) {
		rssValue[index] = $(this).val();
		rssText[index] = $(this).text();
	});
	
	// 응답 채널 선택시 요청전문타겟와 응답전문소스 option 변경
	$("#rspn_chnl_id").change(function(){ 
		var rspn_chnl_id = $(this).val();
		// 요청전문소스의 옵션 지우고 다시 그리기
		$("#req_tgt_tele_id").children().remove();
		for (var i = 0; i < rqtValue.length; i++) {
			$("#req_tgt_tele_id").append('<option value="'+rqtValue[i]+'">'+rqtText[i]+'</option>');
		}
		// 응답전문타겟의 옵션 지우고 다시 그리기
		$("#rspn_src_tele_id").children().remove();
		for (var i = 0; i < rssValue.length; i++) {
			$("#rspn_src_tele_id").append('<option value="'+rssValue[i]+'">'+rssText[i]+'</option>');
		}
		// 응답채널에 따른 요청전문타겟 옵션 고르기
		$("#req_tgt_tele_id").children().each(function(index, item) {
			if(index != 0){
				if(!$(this).val().match(rspn_chnl_id)){
					$(this).remove();
				}
			}
		});
		// 응답채널에 따른 응답전문소스 옵션 고르기
		$("#rspn_src_tele_id").children().each(function(index, item) {
			if(index != 0){
				if(!$(this).val().match(rspn_chnl_id)){
					$(this).remove();
				}
			}
		});
		
		// 응답전문소스가 선택되어있을때 응답전문타겟 상태 변경
		var rspn_src_tele_id = $("#rspn_src_tele_id option:selected").val();
		if(rspn_src_tele_id != 0){
			var headerCode = rspn_src_tele_id.substring(9, 13);
			$("#rspn_tgt_tele_id").children().each(function() {
				if($(this).val().match(headerCode)){
					$(this).prop("selected", true);
				}
			});
		} else {
			$("#rspn_tgt_tele_id option").eq(0).prop("selected", true);
		}
		
		$("#req_src_tele_id").prop("disabled", false); // 요청전문소스 diabled 해제
		$("#rspn_src_tele_id").prop("disabled", false); // 응답전문소스 diabled 해제
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 요청전문소스 선택시 요청전문타겟 자동설정
	$("#req_src_tele_id").change(function(){ 
		var req_src_tele_id = $(this).val();
		var headerCode = req_src_tele_id.substring(9, 13);
		$("#req_tgt_tele_id").children().each(function() {
			if($(this).val().match(headerCode)){
				$(this).prop("selected", true);
			}
		});
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 응답전문소스 선택시 응답전문타겟 자동설정
	$("#rspn_src_tele_id").change(function(){ 
		var rspn_src_tele_id = $(this).val();
		var headerCode = rspn_src_tele_id.substring(9, 13);
		$("#rspn_tgt_tele_id").children().each(function() {
			if($(this).val().match(headerCode)){
				$(this).prop("selected", true);
			}
		});
	});
	
	///////////////////////////////////////////////////////////////////////////
	
	// 메뉴아이디 추가부분
	
	// 추가 저장 기능
	$("#teleChng_add_save").click(function() {
		var valChk = teleChngFormValid();
		if(valChk){
			var saveChk = confirm("저장 하시겠습니까?");
			if(saveChk){
				var formID = $("#teleChng_form");
				
				var addMdfyFlag = $('<input type="hidden" value="1" name="addMdfyFlag">');
				formID.append(addMdfyFlag);
				
				$("#req_tgt_tele_id").prop("disabled", false);
				$("#rspn_tgt_tele_id").prop("disabled", false);
				
				formID.submit();
			}
		}
	});
	
	// 편집 저장 기능
	$("#teleChng_mdfy_save").click(function() {
		var valChk = teleChngFormValid();
		if(valChk){
			var saveChk = confirm("저장 하시겠습니까?");
			if(saveChk){
				var formID = $("#teleChng_form");
				
				var addMdfyFlag = $('<input type="hidden" value="2" name="addMdfyFlag">');
				formID.append(addMdfyFlag);
				
				formID.submit();
			}
		}
	});
	
	$("#rqstChng_btn").click(function() {
		teleChngFormActiveSubmit('/telegramChangeRequest', map_id);
	});
	
	$("#rspnChng_btn").click(function() {
		teleChngFormActiveSubmit('/telegramChangeResponse', map_id);
	});
	
});

///////////////////////////////////////////////////////////////////////////

//전문 추가 view 설정
function teleChangeFormFunc(amFlg) {
	if(amFlg == 0){
		$("#tc_title_txt").text("전문 변환 정보 추가");
		$("#telchn_asc_btn_div").show();
		$("#telegramChange_detail input[type=text]").val('');
		$("#telegramChange_detail select > option[value=0]").prop("selected", true);
		$("#req_chnl_id").prop("disabled", false);
		$("#rspn_chnl_id").prop("disabled", false);
	} else {
		$("#telchn_msc_btn_div").show();
		$("#tc_title_txt").text("전문 변환 정보 수정");
	}
	
	$("#telchn_amd_btn_div").hide();
	$("#telchn_rqstrspn_btn_div").hide();
	
	$("#telegramChange_detail input[type=text]").prop("readonly", false);
	
	$("#map_nm").focus();
}

//동적 폼생성 POST 전송 함수
function teleChngFormActiveSubmit(url, map_id) {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	// 이동 전달 값
	var map_id_input = $('<input type="hidden" value="'+map_id+'" name="map_id">');
	// 삭제 전달 값
	var map_id_del= $('<input type="hidden" value="'+map_id+'" name="telegramChange_list_chk">');
	
	
	$form.append(map_id_input);
	$form.append(map_id_del);
	$form.submit();
}

//전문변환 등록, 수정시 validation 체크 
function teleChngFormValid() {
	if($("#map_nm").val() == ''){
		alert("전문 매핑명을 입력해주세요.");
		$("#map_nm").focus();
		return false;
	} else if($("#req_chnl_id").val() == '0'){
		alert("요청채널을 선택해주세요.");
		return false;
	} else if($("#rspn_chnl_id").val() == '0'){
		alert("응답채널을 선택해주세요.");
		return false;
	} else if($("#req_src_tele_id").val() == '0'){
		alert("요청 전문 소스를 선택해주세요.");
		return false;
	} else if($("#rspn_src_tele_id").val() == '0'){
		alert("응답 전문 소스를 선택해주세요.");
		return false;
	} else {
		return true;
	}
}