/**
업 무 명 : 전문 관리 상세 화면
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 공재원 (jwkong@coreplus.co.kr)
수 정 일 : 2017/04/20
내 용 : 전문 관리 상세에 대한 javascript 코드이다.
*참고사항 :  
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	var h_tele_id = $("#h_tele_id").val();
	
	// 전문 추가 기능
	$("#telegram_add").click(function() {
		var ctx = $("#ctx").val();
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/telegramForm").attr('method', 'post').appendTo('body');
		var form_flagInput = $('<input type="hidden" value="1" name="form_flag">');
		var h_tele_idInput = $('<input type="hidden" value="'+h_tele_id+'" name="tele_id">');
		$form.append(form_flagInput);
		$form.append(h_tele_idInput);
		$form.submit();
	});
	
	// 전문 추가 저장 기능
	$("#telegram_addsave").click(function() {
		var chkOk = teleFormValid();
		if(chkOk){
			var saveChk = confirm("저장 하시겠습니까?");
			if(saveChk){
				var t_frm = $("#telegram_frm");
				var form_flagInput = $('<input type="hidden" value="3" name="form_flag">');	
				t_frm.append(form_flagInput);
				t_frm.submit();
			}
		}
	});
	
	// 전문 편집 기능
	$("#telegram_mdfy").click(function() {
		$("#tel_am_btn_div").hide();
		$("#tel_msc_btn_div").show();
		$("#telegram_detail input[type=text]").prop("readonly", false);
		$("#telegram_form_tbl input[type=radio]").prop("disabled", false);
		$("#telegram_form_tbl select").prop("disabled", false);
		
		var tele_deli_type = $("#tele_deli_type").val();
		if(tele_deli_type == "BYTE"){
			$("#tele_deli_val").prop("readonly", true);
		} else if(tele_deli_type == "DELI"){
			$("#tele_deli_val").prop("readonly", false);
		}
		
		$("#tele_id").prop("readonly", true);
		$("#tele_nm").focus();
	});
	
	// 전문 수정 저장
	$("#telegram_mdfysave").click(function() {
		var chkOk = teleFormValid();
		if(chkOk){
			var saveChk = confirm("저장 하시겠습니까?");
			if(saveChk){
				var t_frm = $("#telegram_frm");
				var form_flagInput = $('<input type="hidden" value="4" name="form_flag">');	
				t_frm.append(form_flagInput);
				t_frm.submit();
			}
		}
	});
	
	// 전문 추가 취소 기능
	$("#telegram_acancel").click(function() {
		var addYn = confirm("전문 추가를 취소 하시겠습니까?");
		if(addYn){
			if(h_tele_id == ''){
				teleFormActiveSubmit("/telegramMng", '');
			} else {
				teleFormActiveSubmit('/telegramForm', h_tele_id);
			}
		} else {
			return false;
		}
	});
	
	// 전문 편집 취소 기능
	$("#telegram_mcancel").click(function() {
		var mdfyYn = confirm("전문 편집을 취소 하시겠습니까?");
		if(mdfyYn){
			teleFormActiveSubmit('/telegramForm', h_tele_id);
		} else {
			return false;
		}
	});
	
	// 전문 항목 타입 변경 시 기능
	$("#tele_deli_type").change(function(){ 
	    $("#tele_deli_type option:selected").each(function(){ 
	        var deliType = $(this).val();
	    	if(deliType == 'DELI'){
	        	$("#tele_deli_val").prop("readonly", false);
	        	$("#tele_deli_val").focus();
	        	// 편집에서 상태 변경시 DELI를 선택하면 이전 값을 가져온다.
	        	if($("#tele_add_chk").val() != '1'){
	        		$("#tele_deli_val").val($("#h_tele_deli_val").val());
	        	}
	        } else {
	        	$("#tele_deli_val").prop("readonly", true).val('');
	        }
	    });  
	}); 
	
	// 전문 항목으로 이동
	$("#go_telegram_item").click(function() {
		teleFormActiveSubmit('/telegramItem', $("#tele_id").val());
	});
	
	// 전문 삭제
	$("#telegram_form_del").click(function() {
		var teleDelYN = confirm("전문을 삭제하시겠습니까?");
		if(teleDelYN){
			var t_frm = $("#telegram_frm");
			
			t_frm.prop("action", ctx+"/telegram");
			
			var telegram_list_chk = $('<input type="hidden" value="'+$("#tele_id").val()+'" name="telegram_list_chk">');	
			var delFlag = $('<input type="hidden" name="delFlag" value="1">');
			
			t_frm.append(telegram_list_chk);
			t_frm.append(delFlag);
			t_frm.submit();
		} else {
			return false;
		}
	});
});

// 동적 폼생성 POST 전송 함수
function teleFormActiveSubmit(url, tele_id) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	if(url == ''){
		
	}
	// 이동 전달 값
	var tele_id_input = $('<input type="hidden" value="'+tele_id+'" name="tele_id">');
	
	var form_flagFlag = $('<input type="hidden" value="2" name="form_flag">');
	$form.append(tele_id_input);
	$form.append(form_flagFlag);
	$form.submit();
}

// 전문 추가 view 설정
function teleAddFormFunc() {
	$("#telegram_form_title").text("전문 추가");
	$("#tel_am_btn_div").hide();
	$("#tel_asc_btn_div").show();
	$("#tele_id_chk_btn").prop("disabled", false);
	
	$("#telegram_detail input[type=text]").val('').prop("readonly", false);
	$("#tele_deli_val").prop("readonly", true);
	$("#telegram_detail select > option[value=0]").prop("selected", true);
	$("#telegram_form_tbl input[type=radio]").prop("disabled", false);
	$("#telegram_form_tbl select").prop("disabled", false);
	$("#tele_id").focus();
	$("#tele_use_y").prop("checked", true);
}

// 전문 등록, 수정시 validation 체크 
function teleFormValid() {
	if($("#tele_id").val() == ''){
		alert("전문 ID를 입력해주세요.");
		$("#tele_id").focus();
		return false;
	} else if($("#tele_nm").val() == ''){
		alert("전문명을 입력해주세요.");
		$("#tele_nm").focus();
		return false;
	} else if($("#tele_deli_type").val() == '0'){
		alert("컬럼규칙타입을 선택해주세요.");
		$("#tele_deli_type").focus();
		return false;
	} else if($("#tele_deli_type").val() == 'DELI'){
		if($("#tele_deli_val").val() == ''){
			alert("구분자(DELIMETER)를 입력해주세요.");
			$("#tele_deli_val").focus();
			return false; 
		} else {
			return true;
		}
	} else {
		return true;
	}
}

// 전문 ID 중복 체크
function teleIDChk() {
	$(document).ready(function() {
		var inputTeleID = $("#tele_id").val();
		var ctx = $("#ctx").val();
		if(inputTeleID == ''){
			alert("전문ID를 입력하세요.");
		} else {
			$.ajax({
				url : ctx + "/teleIDChkAjax",
				type: "POST",  
				data: "tele_id="+inputTeleID,
				success: function(data) { 
					if(data >= 1){
						$("#teleIDChkRst").text("전문 ID가 중복됩니다.");
						$("#teleIDChkRst").css("color", "red");
						$("#tele_id").val("");
						$("#tele_id").focus();
					} else {
						$("#teleIDChkRst").text("중복되는 ID가 없습니다.");
						$("#teleIDChkRst").css("color", "blue");
						$("#tele_nm").focus();
					}
				},
				error: function(data) {
					alert("중복체크 수행중 오류가 발생했습니다.");
				}
			});
		}
	});
}