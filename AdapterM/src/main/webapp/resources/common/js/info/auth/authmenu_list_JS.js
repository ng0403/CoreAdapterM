/**
업 무 명 : authmenu_list 권한메뉴 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/08/03
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/08/03
내 용 : 권한메뉴에 대한 javascript 코드이다.
*참고사항 : 
*/

//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();
	var auth_id = $('#hauth_id').val();
	
	//리스트 체크박스 선택, 해제
	$("#authmenuListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#authmenuListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때
	$("#authmenu_chk_del").click(function() {
		var chked_val = [];
		
		$(":checkbox[id='authmenu_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("권한 메뉴를 삭제 하시겠습니까?");
			if(delYn){
//				alert(chked_val);
				//alert(auth_id);
				var menu_id_input = $('<input type="hidden" value="'+chked_val+'" name="menu_id">');
				var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
				
				$("#authmenu_chk_list").append(menu_id_input);
				$("#authmenu_chk_list").append(auth_id_input);
				viewLoadingShow();
				$("#authmenu_chk_list").submit();
			}
		}
	});
});

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#authmenuListCheck").prop("checked", false);
	});
}

$(document).ready(function(){
	var ctx = $("#ctx").val();
	var auth_id = $("#hauth_id").val();
	
	/* 권한 상세에서 메뉴권한 버튼 눌렀을 때 */
	$("#go_menu_auth").click(function(){
		if($("#auth_id").val() == '' || $("#auth_id").val() == null) {
			alert("권한관리 목록의 권한을 클릭하세요");
			return false;
		}
		
		//동적 폼생성 전송 >> 메뉴권한 리스트 페이지로 이동
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/authmenu');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
		
		$form.append(auth_id_input);
		viewLoadingShow();
		$form.submit();
	});
	
	/* 권한 상세에서 사용자권한 버튼 눌렀을 때 */
	$("#go_user_auth").click(function(){
		if($("#auth_id").val() == '' || $("#auth_id").val() == null) {
			alert("권한관리 목록의 권한을 클릭하세요");
			return false;
		}
		
		//동적 폼생성 전송 >> 메뉴권한 리스트 페이지로 이동
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/authuser');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
		
		$form.append(auth_id_input);
		viewLoadingShow();
		$form.submit();
	});
	
	//권한 메뉴에서 권한관리 상세정보로 이동
	$("#go_to_auth").click(function(){
		
		//동적 폼생성 전송 
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/auth');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
		
		$form.append(auth_id_input);
		viewLoadingShow();
		$form.submit();
	});
});

//삭제 후 권한메뉴리스트로 이동하는 곳
function goAuthMenuList() {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var auth_id = $('#hauth_id').val();
		
		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/authmenu');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		$form.append(auth_id_input);
		viewLoadingShow();
		$form.submit();
	});
}

$(document).ready(function(){
	var ctx = $('#ctx').val();
	var menu_id = $('#hmenu_id').val();
	var auth_id = $('#hauth_id').val();
	
	/* 권한메뉴 추가 > 저장 */
	$("#authmenu_save_btn").click(function(){
		var addcan_comfirm = confirm("권한메뉴 추가를 저장하시겠습니까?");
		if(addcan_comfirm){
			var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
			var menu_id_input = $('<input type="hidden" value="'+menu_id+'" name="menu_id">');
			
			$('input:checkbox[name=crt_yn]').each(function(index,item){
				if(!$(this).is(":checked")){
					$(this).val("N");
					$(this).attr("checked", "checked");
					$(this).hide();
				}
			});
			
			$('input:checkbox[name=mdfy_yn]').each(function(index,item){
				if(!$(this).is(":checked")){
					$(this).val("N");
					$(this).attr("checked", "checked");
					$(this).hide();
				}
			});
			
			$('input:checkbox[name=del_yn]').each(function(index,item){
				if(!$(this).is(":checked")){
					$(this).val("N");
					$(this).attr("checked", "checked");
					$(this).hide();
				}
			});
			
			$('input:checkbox[name=rtrv_yn]').each(function(index,item){
				if(!$(this).is(":checked")){
					$(this).val("N");
					$(this).attr("checked", "checked");
					$(this).hide();
				}
			});
			
			$("#authmenu_chk_list").append(auth_id_input);
			$("#authmenu_chk_list").append(menu_id_input);
			$("#authmenu_chk_list").prop("action", ctx + "/authmenuInsert");
			viewLoadingShow();
			$("#authmenu_chk_list").submit();
		} else {
			return false;
		}
	});
	
	/* 권한메뉴리스트에서 권한관리 상세정보로 이동  */
	$("#back_authDetail").click(function(){
		backAuthSubmit('/authDetail');
	});
	
	/* 권한메뉴리스트에서 권한관리 리스트로 이동  */
	$("#back_auth").click(function(){
		backAuthSubmit('/auth');
	});
	
	/* 권한메뉴 추가버튼 누르고 취소 눌렀을 때  */
	$("#authmenu_cancel_btn").click(function(){
		var addCancel = confirm("메뉴권한 추가를 취소하시겠습니까?");
		if(addCancel){
			backAuthSubmit('/authmenu');
		} else
			return false;
	});
});

/* 체크박스 선택되지 않은값을 hidden으로 넘기기 */
function CheckboxToHidden(f,ele) {
    var ele_h;
    var val;
    
    if (typeof(ele.length) != "undefined") {// checkbox가 배열일경우
        for (var i = 0; i < ele.length; i++) {
            // hidden객체생성, 이름은 checkbox와 같게한다.
            ele_h = document.createElement("input");
            ele_h.setAttribute("type","hidden");
            ele_h.setAttribute("name",ele[i].name);
            ele[i].checked ? val = ele[i].value : val = "";
            ele_h.setAttribute("value",val);
            f.appendChild(ele_h);
    
            // 기존 checkbox의 이름을 이름_dummy로 변경한후 checked = false해준다.
            ele[i].checked = false;
            ele[i].setAttribute("name",ele[i].name + "_dummy");
        }
    } else {// checkbox가 한개
            ele_h = document.createElement("input");
            ele_h.setAttribute("type","hidden");
            ele_h.setAttribute("name",ele.name);
            ele.checked ? val = ele.value : val = "";
            ele_h.setAttribute("value",val);
            f.appendChild(ele_h);
    
            ele.checked = false;
            ele.setAttribute("name",ele.name + "_dummy");   
    }
}

//메뉴권한리스트에서 추가페이지로 이동
//function authmenuList_goInsert() {
//	$(document).ready(function() {
//		var ctx = $("#ctx").val();
//		var auth_id = $('#hauth_id').val();
//		var main_menu_id = $("#main_menu_id").val();
//		
//		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
//		var $form = $('<form></form>');
//		$form.attr('action', ctx+'/authmenuDetail');
//		$form.attr('method', 'post');
//		$form.appendTo('body');
//		
//		var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
//		var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="main_menu_id">');
//		
//		$form.append(auth_id_input);
//		$form.append(Mainmenu_idInput);
//		$form.submit();
//	});
//}

//url 이동 동적폼 전송
function backAuthSubmit(url) {
	var ctx = $("#ctx").val();
	var auth_id = $("#hauth_id").val();
	
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	var auth_id_input = $('<input type="hidden" value="'+auth_id+'" name="auth_id">');
	
	$form.append(auth_id_input);
	viewLoadingShow();
	$form.submit();
}

