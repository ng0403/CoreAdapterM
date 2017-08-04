/**
업 무 명 : 전문 변환 관리
작 성 자 : 공재원 (jwkong@coreplus.co.kr)
작 성 일 : 2017/04/12
수 정 자 : 공재원 (jwkong@coreplus.co.kr)
수 정 일 : 2017/04/12
내 용 : 전문관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	$("#telegramChange_list_allchk").click(function(){
		// 만약 전체 선택 체크박스가 체크된 상태일 경우
		if($("#telegramChange_list_allchk").prop("checked")){
			// 해당화면 전체 checkbox들을 체크해준다.
			$("input[type=checkbox]").prop("checked", true);
		// 전체선택 체크박스가 해제된 경우
		} else {
			// 해당화면에 모든 checkbox들의 체크를 해제시킨다.
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	// 전문변환관리 추가 페이지 이동
	$("#telegramChange_list_add").click(function() {
		goTeleChngFormGo('/telegramChangeForm', '');
	});
	
	// 전문변환관리 삭제
	$("#telegramChange_list_del").click(function() {
		var chked_val = [];
		var chkCnt = 0;
		$(":checkbox[id='telegramChange_list_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
			chkCnt++;
		});
		if(chkCnt == 0){
			alert("삭제할 항목을 선택 해주세요.")
		} else {
			var delYn = confirm("정말 삭제하시겠습니까?");
			if(delYn){
				var tcForm = 	$("#teleChng_del_frm");
				var delFlag = $('<input type="hidden" name="delFlag" value="1">');
				tcForm.append(delFlag);
				tcForm.submit();
			}
		}
	});
	
	// 전체체크 해제
	$("#telegramChange_list_chk").click(function() {
		$("#telegramChange_list_allchk").prop("checked", false);
	});
	
});

//전문 상세정보 가기
function goTeleChngFormGo(url, map_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx + url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var map_id_input = $('<input type="hidden" value="'+map_id+'" name="map_id">');
	     
	     $form.append(map_id_input);
	     $form.submit();
	});
}