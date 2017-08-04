/**
업 무 명 : 전문관리 화면
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/07/30
내 용 : 전문관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	// 전체 체크, 해제
	$("#telegram_list_allchk").click(function(){
		if($("#telegram_list_allchk").prop("checked")){
			$("input[type=checkbox]").prop("checked", true);
		} else {
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	// 전문 추가 페이지 이동
	$("#telegram_list_add").click(function() {
		goTeleDetail('');
	});
	
	// 전문 삭제
	$("#telegram_list_del").click(function() {
		var delChkCnt = 0;
		$(":checkbox[id='telegram_list_chk']:checked").each(function(index, item){
			delChkCnt++;
		});
		
		if(delChkCnt == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("정말 삭제 하시겠습니까?");
			if(delYn){
				var form = $("#tele_del_frm");
				
				var delFlag = $('<input type="hidden" name="delFlag" value="1">');
				form.append(delFlag);
				
				form.submit();
			}
		}
	});
	
	$("#telegram_list_chk").click(function() {
		$("#telegram_list_allchk").prop("checked", false);
	});
	
});

// 전문 상세정보 가기
function goTeleDetail(tele_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/telegramForm');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     var addMdfyFlagInput = "";
	     if(tele_id == ''){
	    	 addMdfyFlagInput = $('<input type="hidden" value="1" name="form_flag">');
	     } else {
	    	 addMdfyFlagInput = $('<input type="hidden" value="2" name="form_flag">');
	    	 var tele_id_input = $('<input type="hidden" value="'+tele_id+'" name="tele_id">');
	    	 $form.append(tele_id_input);
	     }
	     
	     $form.append(addMdfyFlagInput);
	     $form.submit();
	});
}