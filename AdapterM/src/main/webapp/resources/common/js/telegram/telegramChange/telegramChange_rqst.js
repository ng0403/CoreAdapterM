/**
업 무 명  요청 전문 변환 규칙
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/07/30
내 용 : 요청 전문 변환 규칙에 대한 javascript 코드이다.
*참고사항 :  
 */
$(document).ready(function() {
	var map_id = $("#map_id").val();
	
	// 규칙 저장
	$("#tc_rqst_save").click(function() {
		var valYn = teleChngRqstValid();
		if(valYn){
			var subYn = confirm("요청 전문 변환 규칙을 저장 하시겠습니까?");
			if(subYn){
				var updateFlag = $('<input type="hidden" value="1" name="updateFlag">');
				$("#tcRqstRuleForm").append(updateFlag);
				$("#tcRqstRuleForm").submit();
			}else{
				return false;
			}
		}
	});
	
	// 편집버튼 클릭
	$("#tc_rqst_mdfy").click(function() {
		$("#tc_rqst_mdfy_div").hide();
		$("#tc_rqst_sc_div").show();
	});
	
	// 취소버튼 클릭
	$("#tc_rqst_cancel").click(function() {
		var cnYn = confirm("취소 하시겠습니까?");
		if(cnYn){
			backTeleChngForm('/telegramChangeRequest', map_id);
		} else {
			return false;
		}
	});
});

// 전문변환상세로 이동
function backTeleChngForm(url, map_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var main_menu_id = $("#main_menu_id").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx + url);
		$form.attr('method', 'post');
		$form.appendTo('body');
		// 메뉴아이디 추가부분
		// 이동 전달 값
		var map_id_input = $('<input type="hidden" value="'+map_id+'" name="map_id">');
		
		$form.append(map_id_input);
		$form.submit();
	});
}

//전문변환규칙 등록, 수정시 validation 체크 
function teleChngRqstValid() {
	var validChk = true;
	$("input[type=text]").each(function() {
		if($(this).val() == ''){
			alert("항목을 입력해주세요.");
			$(this).focus();
			validChk = false;
			return false;
		}
	});
	return validChk;
}
