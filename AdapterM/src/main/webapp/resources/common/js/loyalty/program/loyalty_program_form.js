/**
업 무 명 : 로열티프로그램
작 성 자 : 이지용 (ezyong@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 이지용 (ezyong@coreplus.co.kr)
수 정 일 : 2015/10/01
내 용 : 로열티 프로그램 폼  javascript
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	var prgm_id = $("#prgm_id").val();
	

	
	// 쿠폰관리 추가 기능
	$("#loyalty_detail_add").click(function() {
		
		loyaltyAddFormFunc();
	});
	
	// 로열티프로그램 편집 기능
	$("#loyalty_detail_mdfy").click(function() {
		$("#loyalty_insert_btn_div").hide();
		$("#loyalty_detail_btn_div").hide();
		$("#loyalty_mdfy_btn_div").show();
		$("#prgm_name").prop("readonly", false);
		$("#prgm_repr_id_nm").prop("readonly", false);
		$("#LoPrgmReprSch").prop("disabled", false);
		$("#prgm_type_cd").prop("disabled", false);
		$("#prgm_desc").prop("readonly", false);
		$("#prgm_type_cd").prop("readonly", false);
		
		$("#prgm_name").focus();
	});
	
	// 프로그램 등록 저장
	$("#loyalty_addsave").click(function() {
		
		if($("#prgm_name").val()=="" || $("#prgm_name").val()==null){
			alert("프로그램명을 입력해주세요");
			return false;
		}
		else if($("#prgm_repr_id").val()=="" || $("#prgm_repr_id").val()==null){
			alert("담당자명을 입력해주세요");
			return false;
		}
		else if($("#prgm_desc").val()=="" || $("#prgm_desc").val()==null){
			alert("프로그램설명을 입력해주세요");
			return false;
		}
		else if($("#prgm_type_cd").val()=="" || $("#prgm_type_cd").val()==null){
			alert("프로그램구분을 선택해주세요");
			return false;
		}

		
		var addYn = confirm("저장 하시겠습니까?");
		if(addYn){
			var form = $('#loyaltyDetailForm');
			var formFlagInput = $('<input type="hidden" value="2" name="form_flag">');
			form.append(formFlagInput);
			viewLoadingShow();
			form.submit();
		} 
	});
	
	// 프로그램 수정 저장
	$("#loyalty_mdfysave").click(function() {
		var mdfyYn = confirm("수정하시겠습니까?");
		var m_frm = $("#loyaltyDetailForm");
		var formFlagInput = $('<input type="hidden" value="3" name="form_flag">');
		m_frm.append(formFlagInput);
		if(mdfyYn){
			viewLoadingShow();
			m_frm.submit();
		}
	});
	
	// 쿠폰 추가 취소 기능
	$("#loyalty_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#loyalty_add_chk").val()=='1'){
				loyaltyActiveFormSubmit('/loyaltyProgram', '');
			}else{
				location.reload();
			}
		} else {
			return false;
		}
	});
	
	// 프로그램 편집 취소 기능
	$("#loyalty_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			location.reload();
		} else {
			return false;
		}
	});
	
});

//쿠폰관리 추가부분 내용초기화
function loyaltyAddFormFunc() {
	$("#loyalty_detail_btn_div").hide();
	$("#loyalty_mdfy_btn_div").hide();
	$("#loyalty_insert_btn_div").show();
	$("#prgm_name").prop("readonly", false);
	$("#prgm_repr_id_nm").prop("readonly", true);
	$("#LoPrgmReprSch").prop("disabled", false);
	$("#prgm_type_cd").prop("disabled", false);
	$("#prgm_desc").prop("readonly", false);
	$("#prgm_type_cd").val("readonly", false);
	$("#prgm_name").val("");
	$("#prgm_repr_id").val("");
	$("#prgm_repr_id_nm").val("");
	$("#prgm_desc").val("");
	$("#prgm_type_cd").val("");
	$("#loyalty_form_span").text("추가").css("color", "black");

	$("#prgm_name").focus();
}

//동적폼생성
function loyaltyActiveFormSubmit(url, prgm_id, prgm_type_cd) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body'); /* append to기존에 있던 것에 내가 만든것을 붙이는 것*/ 
	
	var prgm_id_input = $('<input type="hidden" value="'+prgm_id+'" name="prgm_id">');
	var prgm_type_cd_input = $('<input type="hidden" value="'+prgm_type_cd+'" name="prgm_type_cd">');
	var formFlagInput = $('<input type="hidden" value="0" name="form_flag">');
	$form.append(prgm_id_input); /*append내가 만든 것에 붙이는 것*/ 
	$form.append(prgm_type_cd_input); /*append내가 만든 것에 붙이는 것*/ 
	$form.append(formFlagInput);
	viewLoadingShow();
	$form.submit();
}

