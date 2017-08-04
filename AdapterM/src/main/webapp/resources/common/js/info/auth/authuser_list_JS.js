/**
업 무 명 : authuser_list 사용자권한 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/08/03
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/08/03
내 용 : 사용자권한에 대한 javascript 코드이다.
*참고사항 : 
*/

//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();
	var auth_id = $('#hauth_id').val();
	
	//리스트 체크박스 선택, 해제
	$("#authuserListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#authuserListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때
	$("#authuser_chk_del").click(function() {
		var chked_val = [];
		$(":checkbox[id='authuser_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("사용자 권한을 삭제 하시겠습니까?");
			if(delYn){
//				alert("사용자ID : " + chked_val);
//				alert("권한ID : " + auth_id);
				var user_id_input = $('<input type="hidden" value="'+chked_val+'" name="user_id">');
				var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
				$("#authuser_chk_list").append(user_id_input);
				$("#authuser_chk_list").append(auth_id_input);
				viewLoadingShow();
				$("#authuser_chk_list").submit();
			}
		}
	});
});

//삭제 후 사용자권한 리스트로 이동하는 곳
function goAuthUserList() {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var auth_id = $('#hauth_id').val();
		
		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/authuser');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		$form.append(auth_id_input);
		viewLoadingShow();
		$form.submit();
	});
}

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#authuserListCheck").prop("checked", false);
	});
}

$(document).ready(function(){
	var ctx = $('#ctx').val();
	var auth_id = $('#hauth_id').val();

	/* 사용자권한 리스트에서 권한관리 상세정보로 이동  */
	$("#back_authDetail").click(function(){
		backAuthSubmit('/authDetail');
	});
	
	/* 사용자권한 리스트에서 권한관리 리스트로 이동  */
	$("#back_auth").click(function(){
		backAuthSubmit('/auth');
	});
});
