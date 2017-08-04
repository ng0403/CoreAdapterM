/**
업 무 명  응답 전문 변환 규칙
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/07/30
내 용 : 응답 전문 변환 규칙에 대한 javascript 코드이다.
*참고사항 :  
 */

$(document).ready(function() {
	var map_id = $("#map_id").val();
	
	// 응답 규칙 저장
	$("#tc_rspn_save").click(function() {
		var valYn = teleChngRqstValid();
		if(valYn){
			var subYn = confirm("응답 전문 변환 규칙을 저장 하시겠습니까?");
			if(subYn){
				var updateFlag = $('<input type="hidden" value="1" name="updateFlag">');
				$("#tcRspnRuleForm").append(updateFlag);
				$("#tcRspnRuleForm").submit();
			}else{
				return false;
			}
		}
	});
	
	// 편집버튼 클릭
	$("#tc_rspn_mdfy").click(function() {
		$("#tc_rspn_mdfy_div").hide();
		$("#tc_rspn_sc_div").show();
	});
	
	// 취소버튼 클릭
	$("#tc_rspn_cancel").click(function() {
		var cnYn = confirm("취소 하시겠습니까?");
		if(cnYn){
			backTeleChngForm('/telegramChangeResponse', map_id);
		} else {
			return false;
		}
	});
});

//전문변환규칙 등록, 수정시 validation 체크 
function teleChngRspnValid() {
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