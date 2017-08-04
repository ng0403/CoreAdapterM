/**
업 무 명 : menu_list 메뉴관리 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/08/03
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/08/06
내 용 : 메뉴관리에 대한 javascript 코드이다.
*참고사항 : 
*/

//메뉴 검색 값 유지
$(function() {
	var ctx = $('#ctx').val();
	
	var menuSearch = $('#menuSearch').val();
	$('#smenuSearch').val(menuSearch);
});

//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	//리스트 체크박스 선택, 해제
	$("#menuListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#menuListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때 (상위메뉴)
	$("#menu_chk_del").click(function() {
		var chked_val = [];
		
		$(":checkbox[id='menu_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("메뉴를 삭제 하시겠습니까?");
			if(delYn){
				alert(chked_val);
				var menu_id_input = $('<input type="hidden" value="'+chked_val+'" name="menu_id">');
				$("#menu_chk_list").append(menu_id_input);
//				$("#menu_chk_list").submit();
			}
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때 (하위위메뉴)
	$("#menudown_chk_del").click(function() {
		var chked_val = [];
		
		$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("메뉴를 삭제 하시겠습니까?");
			if(delYn){
//				alert(chked_val);
				var menu_id_input = $('<input type="hidden" value="'+chked_val+'" name="menu_id">');
				$("#menu_chk_list").append(menu_id_input);
				viewLoadingShow();
				$("#menu_chk_list").submit();
			}
		}
	});
});

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#menuListCheck").prop("checked", false);
	});
}

//메뉴리스트에서 추가버튼 눌렀을 때 속성변경
function menuListAdd(){
	$("#menu_am_btn_div").hide();
	$("#menu_add_btn_div").show();
	$("#menu_update_btn_div").hide();
	$("#menu_tab_btn_div").show();
	
	$("#mad_title").text("추가");
	$("#menu_lev > option[value=0001]").prop("selected", true);
	$("#menu_lev").prop("disabled", false);
	$("#up_menu_id").val('').attr("readonly", true);
	$("#up_menu_id").css("background-color", "#EAEAEA");
	$("#menu_nm").val('').attr("readonly", false);
	$("#menu_url").val('').attr("readonly", false);
	$("#menuDetailTable input[type=radio]").prop("disabled", false);
	$("#menu_nm").focus();
	
	$('#menu_lev').change(function(){
		/* 상위메뉴 select 값으로 조건주기 */
		if($("#menu_lev > option:selected").val() == '0001'){   //선택값이 상위메뉴 일 때
			$("#up_menu_srh").prop("disabled", true);	
			$("#up_menu_id").val('').attr("readonly", true);
			$("#up_menu_id").css("background-color", "#EAEAEA");
			
		}
		if($("#menu_lev > option:selected").val() == '0002' ){   //선택값이 하위메뉴 일 때
			$("#up_menu_id").click(function(){
				alert("검색버튼을 누르세요.");
			});
				$("#up_menu_srh").prop("disabled", false);	
				$("#up_menu_id").val('').attr("readonly", true);
				$("#up_menu_id").css("background-color", "white");
		}
	});
}
	
$(document).ready(function(){
	var ctx = $('#ctx').val();
	var menu_id = $('#hmenu_id').val();
	var auth_id = $('#hauth_id').val();
	
	/* 메뉴리스트에서 추가버튼 눌렀을 때 */
	$("#menulist_add").click(function(){
		menuList_goDetail('');
	});
	
	/* 메뉴상세정보에서 추가버튼 눌렀을 때 */
	$("#menu_add").click(function(){
		$("#menu_am_btn_div").hide();
		$("#menu_add_btn_div").show();
		$("#menu_update_btn_div").hide();
		$("#menu_tab_btn_div").show();
		
		$("#mad_title").text("추가");
		$("#menu_lev > option[value=0001]").prop("selected", true);
		$("#up_menu_id").val('').attr("readonly", true);
		$("#up_menu_id").css("background-color", "#EAEAEA");
		$("#menu_nm").val('').attr("readonly", false);
		$("#menu_url").val('').attr("readonly", false);
		$("#menuDetailTable select").prop("disabled", false);
		$("#menuDetailTable input[type=radio]").prop("disabled", false);
		$("#menu_nm").focus();
		
		$('#menu_lev').change(function(){
			/* 상위메뉴 select 값으로 조건주기 */
			if($("#menu_lev > option:selected").val() == '0001'){   //선택값이 상위메뉴 일 때
				$("#up_menu_srh").prop("disabled", true);	
				$("#up_menu_id").val('').attr("readonly", true);
				$("#up_menu_id").css("background-color", "#EAEAEA");
				
			}
			if($("#menu_lev > option:selected").val() == '0002' ){   //선택값이 하위메뉴 일 때
				$("#up_menu_id").click(function(){
					alert("검색버튼을 누르세요.");
				});
					$("#up_menu_srh").prop("disabled", false);	
					$("#up_menu_id").val('').attr("readonly", true);
					$("#up_menu_id").css("background-color", "white");
				
			}
		 });
	});
	
	/* 메뉴 추가 저장 버튼 기능 */
	$("#menu_save").click(function(){
		if($("#menu_nm").val() == '' || $("#menu_nm").val() == null){
			$("#menu_am_btn_div").hide();
			$("#menu_add_btn_div").show();
			$("#menu_update_btn_div").hide();
			$("#menu_tab_btn_div").show();
		} else{
			$("#menu_am_btn_div").show();
			$("#menu_add_btn_div").hide();
			$("#menu_update_btn_div").hide();
			$("#menu_tab_btn_div").show();
		}
	});
	
	/* 메뉴 추가 취소 버튼 기능 */
	$("#menu_cancel").click(function(){
		var addcan_comfirm = confirm("메뉴추가를 취소하시겠습니까?");
		if(addcan_comfirm){
				goMenuList();
		} else {
			return false;
		}
	});
	
	/* 메뉴상세정보 편집버튼 눌렀을 때 */
	$("#menu_mdfy").click(function(){
		$("#menu_am_btn_div").hide();
		$("#menu_add_btn_div").hide();
		$("#menu_update_btn_div").show();
		$("#menu_tab_btn_div").show();
		
		$("#mad_title").text("수정");
		$("#menuDetailTable input[type='text']").attr("readonly", false);
		$("#menuDetailTable select").prop("disabled", false);
		$("#up_menu_srh").prop("disabled", false);
		$("#menuDetailTable input[type=radio]").prop("disabled", false);
		$("#menu_nm").focus();
		
		$('#menu_lev').change(function(){
			/* 상위메뉴 select 값으로 조건주기 */
			if($("#menu_lev > option:selected").val() == '0001' ){   //선택값이 상위메뉴 일 때
				$("#up_menu_srh").prop("disabled", true);	
				$("#up_menu_id").val('').attr("readonly", true);
				$("#up_menu_id").css("background-color", "#EAEAEA");
				
			}
			if($("#menu_lev > option:selected").val() == '0002' ){   //선택값이 하위메뉴 일 때
				$("#up_menu_srh").prop("disabled", false);	
				$("#up_menu_id").val('').attr("readonly", true);
				$("#up_menu_id").css("background-color", "white");
			}
		 });
	});
	
	/* 메뉴 편집 저장 버튼 기능 */
	$("#menu_update_save").click(function() {
		if($("#menu_nm").val() == '' || $("#menu_nm").val() == null) {
			alert("메뉴명을 입력 해주세요");
			$("#menu_nm").focus();
			return false;
		}
		
		var save_comfirm = confirm("메뉴를 수정하시겠습니까?");
		if(save_comfirm){
			var menu_id_val = $('<input type="hidden" value="'+$('#hmenu_id').val()+'" name="menu_id">');
			var auth_id_val = $('<input type="hidden" value="'+$('#hauth_id').val()+'" name="auth_id">');
			
			$("#menuInsertForm").append(menu_id_val);
			$("#menuInsertForm").append(auth_id_val);
			$("#menuInsertForm").prop('action', ctx+'/menuUpdate');
			viewLoadingShow();
			$("#menuInsertForm").submit();
		} else {
			return false;
		}
	});
	
	/* 메뉴 편집 취소 버튼 기능 */
	$("#menu_update_cancel").click(function(){
		//alert(menu_id);
		var can_comfirm = confirm("메뉴편집을 취소하시겠습니까?");
		if(can_comfirm){
			var menu_id_val = $('<input type="hidden" value="'+menu_id+'" name="menu_id">');
			
		    $("#menuInsertForm").append(menu_id_val);
			$("#menuInsertForm").prop('action', ctx+'/menu');
			viewLoadingShow();
			$("#menuInsertForm").submit();
			
			$("#menu_am_btn_div").show();
			$("#menu_add_btn_div").hide();
			$("#menu_update_btn_div").hide();
			$("#menu_tab_btn_div").show();
			
			$(".menuDetailTable input[type='text']").val('').attr("readonly", true);
			$('select').find('option:first').attr('selected', 'selected');  //첫번째 option으로 초기화
			$(".menuDetailTable select").prop("disabled", true); 
			$(".menuDetailTable input[type=radio]").prop("disabled", true);
			$("#up_menu_srh").prop("disabled", true);
			$("#menu_mdfy").attr("disabled", true);
			$("#menu_del").attr("disabled", true);
			$("#up_menu_id").css("background-color", "white");
			
		    
		} else {
			return false;
		}
	});
	
	/* 삭제 버튼 기능 */
	$("#menu_del").click(function() {
		var del_comfirm = confirm("메뉴를 삭제하시겠습니까?");
		if(del_comfirm){
			$("#mi").val($("#hmenu_id").val());
			
		    $("#menuInsertForm").prop('action', ctx+'/menuDelete');
		    viewLoadingShow();
		    $("#menuInsertForm").submit();
		} else {
			return false;
		}
	});
});

//메뉴리스트에서 상세정보로 이동
function menuList_goDetail(menu_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/menu');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var menu_id_input = $('<input type="hidden" value="'+menu_id+'" name="menu_id">');
		
		$form.append(menu_id_input);
		viewLoadingShow();
		$form.submit();
	});
}

//상위메뉴 상세정보
function menuDetail(menu_id, seq_no) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/menu');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var menu_id_input = $('<input type="hidden" value="'+menu_id+'" name="menu_id">');
	     var seq_no_input = $('<input type="hidden" value="'+seq_no+'" name="seq_no">');
	     
	     $form.append(menu_id_input);
	     $form.append(seq_no_input);
	     viewLoadingShow();
	     $form.submit();
	});
}

//하위메뉴 상세정보
function menudownDetail(menu_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		$("#menuDownTableDB tr").each(function() {
			$(this).css("background-color", "white");
		});
		$("#"+menu_id).css("background-color", "#eaeaea");
		$.ajax({  
			url:  ctx+'/MenuDownDetailAjax',   
			type: "POST",
			data: "menu_id="+menu_id,
			dataType: "json",
			success: function(data) {
				$("#menu_nm").val(data.menuVo.menu_nm);
				$("#hmenu_nm").val(data.menuVo.menu_nm);
				$("#hmenu_id").val(data.menuVo.menu_id);
				$("#menu_lev option[value="+data.menuVo.menu_lev+"]").prop("selected", true);
				$("#menu_url").val(data.menuVo.menu_url);
				$("#hmenu_url").val(data.menuVo.menu_url);
				$("#up_menu_id").val(data.menuVo.up_menu_id);
				$("#hup_menu_id").val(data.menuVo.up_menu_id);
				$("#act_yn[value="+data.menuVo.act_yn+"]").prop("checked", true);
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("마감 처리중 에러가 발생하였습니다.");
				return false;
			},		
		});		
	});
}

//추가, 수정, 삭제 후 메뉴리스트로 이동하는 곳
function goMenuList() {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		//동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/menu');
		$form.attr('method', 'post');
		$form.appendTo('body');
		viewLoadingShow();
		$form.submit();
	});
}

//메뉴 리스트로 이동 버튼
function go_menu_list() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/menu');
	$form.attr('method', 'post');
	$form.appendTo('body');
	viewLoadingShow();
	$form.submit();
}

//메뉴 추가 >> 저장
function menu_save(ctx){
	$(document).ready(function() {
		var save_comfirm = confirm("메뉴를 추가하시겠습니까?");
		if(save_comfirm){
			var menu_id = $("#hmenu_id").val();
	
			if($("#menu_nm").val() == '' || $("#menu_nm").val() == null) {
				alert("메뉴명을 입력 해주세요");
				$("#menu_nm").focus();
				return false;
			}
			var menu_id_input = $('<input type="hidden" value="'+menu_id+'" name="menu_id">');
			
			if($('#menu_lev').val()=='0001'){
				var seq_no_input = $('<input type="hidden" value="'+($("#menuTbody tr").length+2) +'" name="seq_no">');
			}else if($('#menu_lev').val()=='0002'){
				var seq_no_input = $('<input type="hidden" value="'+($("#menudownTbody tr").length+1) +'" name="seq_no">');
			}

			$("#menuInsertForm").append(menu_id_input);
			$("#menuInsertForm").append(seq_no_input);
			viewLoadingShow();
			$("#menuInsertForm").submit();
		} else {
			return false;
		}
	});
}

$(document).ready(function(){
	
	/* tr 선택했을 때 input="text" 로 값 넣기 */
	$("#ModaldetailTableDB tbody tr").click(function(){			
		var menu_id = $(this).find(".Modmenu_id").val();
		var menu_name = $(this).find('.Modmenu_name').val();
		$.unblockUI();
		$("#hup_menu_id").val(menu_id);
		$("#up_menu_id").val(menu_id);			
	});
	
	/* 메뉴 추가에서 상위메뉴 검색 버튼 눌렀을 때 modal 팝업 띄우기 */
	$("#up_menu_srh").click(function() {
		$.blockUI({ 
			message: $('#up_menu_srh_modal')
	      , css: { width: '400'
			  	 , height: "365"
			     , top: "20%"
			     , left: "35%"
			 } 
		}); 
	});
	
	/* 메뉴 tree modal 팝업 */
	$("#menu_tree").click(function() {
		$.blockUI({ 
			message: $('#menu_treeModal')
			, css: { width: '350'
				   , height: "620"
				   , top: "10%"
				   , left: "35%"
			} 
		}); 
	});
	
	//상위메뉴리스트 편집 눌렀을 때
	$('#up_update').click(function(){
		$("#up_update").hide();
		$("#menu_col_up").show();
		$("#menu_col_down").show();
		$("#up_save").show();
		$("#up_update_cancel").show();
	});
	
	//상위메뉴리스트 편집 취소 눌렀을 때
	$("#up_update_cancel").click(function(){
		var upcan_comfirm = confirm("상위메뉴순서 편집을 취소하시겠습니까?");
		if(upcan_comfirm){
			$("#up_update").show();
			$("#menu_col_up").hide();
			$("#menu_col_down").hide();
			$("#up_save").hide();
			$("#up_update_cancel").hide();
			goMenuList();
		} else {
			return false;
		}
	});
	
	//하위메뉴리스트 편집 눌렀을 때
	$('#down_update').click(function(){
		$("#down_update").hide();
		$("#menudown_col_up").show();
		$("#menudown_col_down").show();
		$("#down_save").show();
		$("#down_update_cancel").show();
	});
	
	//하위메뉴리스트 편집 취소 눌렀을 때
	$("#down_update_cancel").click(function(){
		var downcan_comfirm = confirm("하위메뉴순서 편집을 취소하시겠습니까?");
		if(downcan_comfirm){
			$("#down_update").show();
			$("#menudown_col_up").hide();
			$("#menudown_col_down").hide();
			$("#down_save").hide();
			$("#down_update_cancel").hide();
			goMenuList();
		} else {
			return false;
		}
	});
	
	// 선택한 컬럼 위로 이동
	$('#menu_col_up').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='menu_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var prvChkNum; // 바로 위의 seq
			$(":checkbox[id='menu_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				chkNum = currTr.children().find($('input[id=seq_no]')).val(); // 선택된 컬럼의 seq
				prvChkNum = currTr.prev().children().find($('input[id=seq_no]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr style='background-color: #eaeaea;'>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == 1){
				alert("더 이상 위로 이동할 수 없습니다.");
				return false;
			} else {
				$("#menuTableDB tbody tr").eq(chkNum-2).before(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=seq_no][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox]')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=seq_no]")).attr("value", prvChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=seq_no]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
//	$('#menu_col_up').click(function(){
//		var chkCnt = 0;
//		// 체크된 값을 카운트
//		$(":checkbox[id='menu_chk']:checked").each(function(index, item){
//			chkCnt++;
//		});
//		
//		if(chkCnt == 0){
//			alert("이동할 대상을 선택하세요");
//			return false;
//		} else if(chkCnt > 1){
//			alert("하나의 대상만 이동 가능합니다.");
//			$("input[type=checkbox]").prop("checked", false);
//			return false;
//		} else {
//			var currTr; // 현재 컬럼 저장
//			var chkNum; // 선택된 컬럼의 seq
//			var prvChkNum; // 바로 위의 seq
//			$(":checkbox[id='menu_chk']:checked").each(function(index, item){
//				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
//				
//				chkNum = currTr.children().find($('input[id=seq_no]')).val(); // 선택된 컬럼의 seq
//				
//				prvChkNum = currTr.prev().children().find($('input[id=seq_no]')).val(); // 바로 위의 seq
//			});
//			
//			var moveTr = "<tr style='background-color: #eaeaea;'>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
//			
//			if(chkNum == 1){
//				alert("더 이상 위로 이동할 수 없습니다.");
//				return false;
//			} else {
//				$("#menuTableDB tbody tr").eq(chkNum-2).before(moveTr); // 선택된 컬럼을 위로 이동
//				currTr.remove(); // 원래의 tr을 삭제
//				var moveAfterTr = $("input[id=seq_no][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
//				moveAfterTr.children().find($('input[type=checkbox]')).prop("checked", true); // 이동한 컬럼에 체크
//				moveAfterTr.children().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
//				moveAfterTr.children().find($("input[name=seq_no]")).attr("value", prvChkNum); // 이동한 컬럼의 seq 값 변경
//				moveAfterTr.next().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
//				moveAfterTr.next().find($("input[name=seq_no]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
//			}
//		}
//	});
	
	// 선택한 컬럼 아래로 이동
	$('#menu_col_down').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='menu_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var childLen = $("#menuTableDB tbody").children().length; // tr의 개수
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var nextChkNum; // 바로 위의 seq
			$(":checkbox[id='menu_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				
				chkNum = currTr.children().find($('input[id=seq_no]')).val(); // 선택된 컬럼의 seq
				
				nextChkNum = currTr.next().children().find($('input[id=seq_no]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr style='background-color: #eaeaea;'>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == childLen){
				alert("더 이상 아래로 이동할 수 없습니다.");
				return false;
			} else {
				$("#menuTableDB tbody tr").eq(chkNum).after(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=seq_no][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox]')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=seq_no]")).attr("value", nextChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=seq_no]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=seq_no]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
	
	// 선택한 컬럼 위로 이동
	$('#menudown_col_up').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var prvChkNum; // 바로 위의 seq
			$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				
				chkNum = currTr.children().find($('input[id=menudown_seq_no]')).val(); // 선택된 컬럼의 seq
				
				prvChkNum = currTr.prev().children().find($('input[id=menudown_seq_no]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr style='background-color: #eaeaea;'>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == 1){
				alert("더 이상 위로 이동할 수 없습니다.");
				return false;
			} else {
				$("#menuDownTableDB tbody tr").eq(chkNum-2).before(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=menudown_seq_no][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox]')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=menudown_seq_no]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=menudown_seq_no]")).attr("value", prvChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=menudown_seq_no]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=menudown_seq_no]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
	
	// 선택한 컬럼 아래로 이동
	$('#menudown_col_down').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var childLen = $("#menuDownTableDB tbody").children().length; // tr의 개수
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var nextChkNum; // 바로 위의 seq
			$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				
				chkNum = currTr.children().find($('input[id=menudown_seq_no]')).val(); // 선택된 컬럼의 seq
				
				nextChkNum = currTr.next().children().find($('input[id=menudown_seq_no]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr style='background-color: #eaeaea;'>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == childLen){
				alert("더 이상 아래로 이동할 수 없습니다.");
				return false;
			} else {
				$("#menuDownTableDB tbody tr").eq(chkNum).after(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=menudown_seq_no][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox]')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=menudown_seq_no]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=menudown_seq_no]")).attr("value", nextChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=menudown_seq_no]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=menudown_seq_no]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
	
	//상위메뉴 편집 저장
	$('#up_save').click(function(){
		var chked_val = [];
		
		$(":checkbox[id='menu_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		var ctx = $('#ctx').val();
		var upsaveYN = confirm("상위메뉴 순서를 수정하시겠습니까?");
		
		if(upsaveYN){
			var cnt = 0;
			var menuTbodylen = $("#menuTbody tr").length; 
			$("#menuTbody tr").each(function(i,index) {
				var data="";
//					data += "seq_no="+$(this).find($('input[id=seq_no]')).val()+"&"; 
					data += "seq_no="+(i+1)+"&"; 
					data += "menu_id="+$(this).find($('input[id=menu_id]')).val(); 
				// tr 한줄 데이터 전송 수정
				$.ajax({
					type: "POST",  
					url: ctx+"/menuUpdateSaveAjax",
					data: data,
					dataType : "json",
					success: function(data) {
						if(data == 1)	cnt++;
						if(cnt == menuTbodylen) location.reload();
					},
					beforeSend: function(){
			        	viewLoadingShow();			
			        },
			        complete:function(){
			        	viewLoadingHide();	
			        },
					error: function(data) { 
						alert("상위메뉴 수정에 실패했습니다.");
						return false;
					}	
				});
				
			});
		}
	});
	
	//하위메뉴 편집 저장
	$('#down_save').click(function(){
		var chked_val = [];
		
		$(":checkbox[id='menudown_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		var ctx = $('#ctx').val();
		var downsaveYN = confirm("하위메뉴 순서를 수정하시겠습니까?");
		if(downsaveYN){
			var cnt = 0;
			var menudownTbodylen = $("#menudownTbody tr").length; 
			$("#menudownTbody tr").each(function(i,index) {
				var data="";
//				data += "seq_no="+$(this).find($('input[id=menudown_seq_no]')).val()+"&";
				data += "seq_no="+(i+1)+"&"; 
				data += "menu_id="+$(this).find($('input[id=menu_id]')).val(); 
				// tr 한줄 데이터 전송 수정
				$.ajax({
					type: "POST",  
					url: ctx+"/menudownUpdateSaveAjax",
					data: data,
					dataType : "json",
					success: function(data) {
						if(data == 1)	cnt++;
						if(cnt == menudownTbodylen) location.reload();
					},
					beforeSend: function(){
			        	viewLoadingShow();			
			        },
			        complete:function(){
			        	viewLoadingHide();	
			        },
					error: function(data) { 
						alert("하위메뉴 수정에 실패했습니다.");
						return false;
					}	
				});
				
			});
		}
	});
});

function modal_close() {
	$.unblockUI();
}



