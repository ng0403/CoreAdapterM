/**
업 무 명 : auth_list 권한관리 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/08/03
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/08/03
내 용 : 권한관리에 대한 javascript 코드이다.
*참고사항 : 
*/

//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	//리스트 체크박스 선택, 해제
	$("#authListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#authListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때
	$("#auth_chk_del").click(function() {
		var chked_val = [];	
		
		$(":checkbox[id='auth_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("권한을 삭제 하시겠습니까?");
			if(delYn){
//				alert(chked_val);
				var auth_id_input = $('<input type="hidden" value="'+chked_val+'" name="auth_id">');
				
				$("#auth_chk_list").append(auth_id_input);
				viewLoadingShow();
				$("#auth_chk_list").submit();
			}
		}
	});
});

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#authListCheck").prop("checked", false);
	});
}

$(document).ready(function(){
	var ctx = $("#ctx").val();
	
	/* 권한 추가버튼 눌렀을 때 */
	$("#auth_add").click(function(){
		$("#auth_am_btn_div").hide();
		$("#Authsc_btn_div").show();
		$("#Authupdate_btn_div").hide();
		$("#tab_btn_div").show();
		
		$("#auth_id").val('').attr("readonly", true).css("background-color", "#eaeaea");
		$("#auth_nm").val('').attr("readonly", false);
		$("#go_menu_auth").prop("disabled", true);
		$("#go_user_auth").prop("disabled", true);
		$(".auth_detailTable input[type=radio]").prop("disabled", false);
		$("#auth_nm").focus();
	});
	
	/* 권한 추가 저장 버튼 기능 */
	$("#auth_save").click(function(){
		if($("#auth_nm").val() == '' || $("#auth_nm").val() == null) {
			alert("권한명을 입력 해주세요");
			$("#auth_nm").focus();
			return false;
		}
		
		var save_comfirm = confirm("권한을 추가하시겠습니까?");
		if(save_comfirm){
			$("#auth_am_btn_div").show();
			$("#Authsc_btn_div").hide();
			$("#Authupdate_btn_div").hide();
			$("#tab_btn_div").show();
			var auth_id = $("#auth_id").val();
			var auth_id_val = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
			
			$("#AuthDetailForm").append(auth_id_val);
			$("#AuthDetailForm").prop('action', ctx+'/authInsert');
			viewLoadingShow();
			$("#AuthDetailForm").submit();
		} else {
			return false;
		}
	});
	
	/* 권한 추가 취소 버튼 기능 */
	$("#auth_cancel").click(function(){
		var authcan_comfirm = confirm("권한추가를 취소하시겠습니까?");
		if(authcan_comfirm){
			$("#auth_am_btn_div").show();
			$("#Authsc_btn_div").hide();
			$("#Authupdate_btn_div").hide();
			$("#tab_btn_div").show();
			
			$("#auth_id").css("background-color", "white");
			$("#auth_detail input[type='text']").val('').attr("readonly", true);
			$(".auth_detailTable input[type=radio]").prop("disabled", true);
			$("#auth_mdfy").attr("disabled", true);
			$("#auth_del").attr("disabled", true);
			$("#go_menu_auth").prop("disabled", false);
			$("#go_user_auth").prop("disabled", false);
			
			$("#AuthDetailForm").attr('method', 'get');
			viewLoadingShow();
			$("#AuthDetailForm").submit();
		} else {
			return false;
		}
	});
	
	/* 권한 편집버튼 눌렀을 때 */
	$("#auth_mdfy").click(function(){
		if($("#auth_id").val() == '' || $("#auth_id").val() == null) {
			alert("수정할 권한을 선택하세요.");
			return false;
		}
		
		$("#auth_am_btn_div").hide();
		$("#Authsc_btn_div").hide();
		$("#Authupdate_btn_div").show();
		$("#tab_btn_div").show();
		
		$("#auth_id").attr("readonly", true).css("background-color", "#eaeaea");
		$("#auth_nm").attr("readonly", false);
		$(".auth_detailTable input[type=radio]").prop("disabled", false);
		$("#go_menu_auth").prop("disabled", true);
		$("#go_user_auth").prop("disabled", true);
		$("#auth_nm").focus();
	});
	
	/* 권한 편집 저장 버튼 기능 */
	$("#auth_update_save").click(function(){
		if($("#auth_nm").val() == '' || $("#auth_nm").val() == null) {
			alert("권한명을 입력 해주세요");
			$("#auth_nm").focus();
			return false;
		}
		
		var save_comfirm = confirm("권한을 수정하시겠습니까?");
		if(save_comfirm){
			
			$("#auth_am_btn_div").show();
			$("#Authsc_btn_div").hide();
			$("#Authupdate_btn_div").hide();
			$("#tab_btn_div").show();
			
			$("#AuthDetailForm").prop('action', ctx+'/authUpdate');
			viewLoadingShow();
			$("#AuthDetailForm").submit();
		} else {
			return false;
		}
	});
	
	/* 권한 편집 취소 버튼 기능 */
	$("#auth_update_cancel").click(function(){
		var authmdfycan_comfirm = confirm("권한편집을 취소하시겠습니까?");
		if(authmdfycan_comfirm){
			
			$("#auth_am_btn_div").show();
			$("#Authsc_btn_div").hide();
			$("#Authupdate_btn_div").hide();
			$("#tab_btn_div").show();
			
			$("#auth_id").css("background-color", "white");
			$("#auth_detail input[type='text']").val('').attr("readonly", true);
			$(".auth_detailTable input[type=radio]").prop("disabled", true);
			$("#auth_mdfy").attr("disabled", true);
			$("#auth_del").attr("disabled", true);
			$("#go_menu_auth").prop("disabled", false);
			$("#go_user_auth").prop("disabled", false);
			
			$("#AuthDetailForm").attr('method', 'get');
			viewLoadingShow();
			$("#AuthDetailForm").submit();
		} else {
			return false;
		}
	});
	
	/* 삭제 버튼 기능 */
	$("#auth_del").click(function() {
		if($("#auth_id").val() == '' || $("#auth_id").val() == null) {
			alert("삭제할 권한을 선택하세요.");
			return false;
		}
		var del_comfirm = confirm("권한을 삭제하시겠습니까?");
		if(del_comfirm){
			
			$("#AuthDetailForm").prop('action', ctx+'/authDelete');
			viewLoadingShow();
			$("#AuthDetailForm").submit();
		} else {
			return false;
		}
	});
});

//tr 클릭시 색 변경
//$(document).ready(function () {
//    $('#authTable tr').click(function () {
//        $('#authTable tr').css('background-color', 'white');
//        $(this).css('background-color', 'red');
//
//    });
//});

//권한 상세정보
function authDetail(auth_id, main_menu_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
	
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/authDetail');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
	     
	     $form.append(auth_id_input);
	     viewLoadingShow();
	     $form.submit();
	});
}

//추가, 수정, 삭제 후 권한리스트로 이동하는 곳
function goAuthList() {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var main_menu_id_input = $('<input type="hidden" value="'+main_menu_id+'" name="main_menu_id">');
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/auth');
		$form.attr('method', 'post');
		$form.appendTo('body');
		viewLoadingShow();
		$form.submit();
	});
}

