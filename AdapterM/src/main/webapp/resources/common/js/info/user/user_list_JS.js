/**
 * 
업 무 명 : statistic_list 권한관리 화면
작 성 자 : 송성호 (0302333@coreplus.co.kr)
작 성 일 : 2015/08/07
수 정 자 : 송성호 (0302333@coreplus.co.kr)
수 정 일 : 2015/08/20
내 용 : 사용자 관리에 대한 javascript 공통 코드이다.
*참고사항 : 
*/
// user 검색
function user_search(){	
	var main_menu_id = $("#main_menu_id").val();	
	var menuIDinput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
	
	$("#userform").append(menuIDinput);
	viewLoadingShow();
	$("#userform").submit();
}
//검색 엔터키 기능
function userSearchEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		if ($("input[name=user_id]").val() == '' && $("input[name=user_nms]").val() == '' && $("input[name=org_nm]").val() == '') {
			alert("검색어를 입력하세요.");
		} else {
			user_search();			
		}
	}
}
// 상세화면 세팅
function user_detail(user_id){
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();

	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/userdetail?mode=detail');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var user_id_input = $('<input type="hidden" value="'+user_id+'" name="user_id">');
     var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
     
     $form.append(user_id_input);
     $form.append(Mainmenu_idInput);
     viewLoadingShow();
     $form.submit();
}
function user_detail_set(){
	// 입력 못하게  disabled
	$("#user_id").prop("readonly",true);
	$("#user_nm").prop("readonly",true);
	$("#pwd").prop("readonly",true);
	$("#user_type_cd").prop("readonly",true);
	$(".userAuthDetailList").prop("readonly",true);
	$("#cell_ph1").prop("readonly",true);
	$("input[name=cell_ph2]").prop("readonly",true);
	$("input[name=cell_ph3]").prop("readonly",true);
	$("#home_ph1").prop("readonly",true);
	$("input[name=home_ph2]").prop("readonly",true);
	$("input[name=home_ph3]").prop("readonly",true);
	$("#com_ph1").prop("readonly",true);
	$("input[name=com_ph2]").prop("readonly",true);
	$("input[name=com_ph3]").prop("readonly",true);
	$("input[name=email_id]").prop("readonly",true);
	$("input[name=email_dm]").prop("readonly",true);	
	$("#org_ids").prop("readonly",true);
	$("#org_nms").prop("readonly",true);
	$("#auth_id").prop("readonly",true);
	$("#auth_nm").prop("readonly",true);
	$(".userDetail").hide();	
	// 배경 하얀색
	$("#user_id").css("background","white");
	$("#user_nm").css("background","white");
	$("#pwd").css("background","white");
	$("#user_type_cd").css("background","white");
	$("#cell_ph1").css("background","white");
	$("input[name=cell_ph2]").css("background","white");
	$("input[name=cell_ph3]").css("background","white");
	$("#home_ph1").css("background","white");
	$("input[name=home_ph2]").css("background","white");
	$("input[name=home_ph3]").css("background","white");
	$("#com_ph1").css("background","white");
	$("input[name=com_ph2]").css("background","white");
	$("input[name=com_ph3]").css("background","white");
	$("input[name=email_id]").css("background","white");
	$("input[name=email_dm]").css("background","white");	
	$("input[name=act_yn1]").css("background","white");	
	$("#org_ids").css("background","white");
	$("#org_nms").css("background","white");
	$("#scs_btn_div").hide();	
}
// 추가화면 세팅
function user_insert(){	
	var ctx = $("#ctx").val();
	var chk = confirm("사용자를 추가 하시겠습니까?");
	if(chk){
	var main_menu_id = $("#main_menu_id").val();
	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/userdetail?mode=insert');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
     
     $form.append(Mainmenu_idInput);
     viewLoadingShow();
     $form.submit();
	}
}
//추가화면 세팅
function userList_insert(){	
	var ctx = $("#ctx").val();
	var main_menu_id = $("#main_menu_id").val();
	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/userdetail?mode=insert');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
     
     $form.append(Mainmenu_idInput);
     viewLoadingShow();
     $form.submit();
}
function user_insert_set(){
	$("#ams_btn_div").hide();
	$("input[name=act_yn1]").hide();
	$("#org_ids").prop("readonly",true);
	$("#org_nms").prop("readonly",true);
	$("#org_ids").css("background","white");
	$("#org_nms").css("background","white");
	$(".userAuthDetailList").prop("readonly",true);
}
// 편집화면 세팅
function user_update(){
	// 입력 못하게  disabled
	var ctx = $("#ctx").val();
	$("#user_id").prop("readonly",true);
	$("#user_nm").prop("readonly",false);
	$("#pwd").prop("readonly",false);
	$("#user_type_cd").prop("readonly",false);
	$("#cell_ph1").prop("readonly",false);
	$("input[name=cell_ph2]").prop("readonly",false);
	$("input[name=cell_ph3]").prop("readonly",false);
	$("#home_ph1").prop("readonly",false);
	$("input[name=home_ph2]").prop("readonly",false);
	$("input[name=home_ph3]").prop("readonly",false);
	$("#com_ph1").prop("readonly",false);
	$("input[name=com_ph2]").prop("readonly",false);
	$("input[name=com_ph3]").prop("readonly",false);
	$("input[name=email_id]").prop("readonly",false);
	$("input[name=email_dm]").prop("readonly",false);
	$(".userDetail").show();
	$("#mode").val("update");
	$("#userform").prop("action",ctx+'/userupdate');
	// 배경 하얀색
	$("#user_id").css("background","white");
	$("#user_nm").css("background","white");
	$("#pwd").css("background","white");
	$("#user_type_cd").css("background","white");
	$("#cell_ph1").css("background","white");
	$("input[name=cell_ph2]").css("background","white");
	$("input[name=cell_ph3]").css("background","white");
	$("#home_ph1").css("background","white");
	$("input[name=home_ph2]").css("background","white");
	$("input[name=home_ph3]").css("background","white");
	$("#com_ph1").css("background","white");
	$("input[name=com_ph2]").css("background","white");
	$("input[name=com_ph3]").css("background","white");
	$("input[name=email_id]").css("background","white");
	$("input[name=email_dm]").css("background","white");	
	$("input[name=act_yn1]").css("background","white");	
	$("#org_ids").css("background","white");
	$("#org_nms").css("background","white");
	$("input[name=act_yn1]").hide();
	$("#ams_btn_div").hide();
	$("#scs_btn_div").show();
}

function modal_add(){
	
	var m_auth_ids = [];
	$("input[name=m_auth_id]").each(function(index) {
			m_auth_ids[index] = $(this).val();
	});
	var m_auth_nms = [];
	$("input[name=m_auth_nm]").each(function(index) {
		m_auth_nms[index] = $(this).val();
	});
	
	$("#auth_id").val(m_auth_ids.toString());
	$("#auth_nm").val(m_auth_nms.toString());
	
	$.unblockUI();
}

function cancels(me){
	var pNode = me.parentNode.parentNode;
	while (pNode.hasChildNodes())
	{
		pNode.parentNode.parentNode.deleteRow(pNode.rowIndex);       
	}
}
//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();

	// 디테일에서 취소버튼	
	$("#userCancelBtn").click(function(){
		alert("취소 되었습니다.");
		var main_menu_id = $("#main_menu_id").val();
		
		// 동적 폼생성 get 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/user');
		$form.attr('method', 'get');
		$form.appendTo('body');
		
		var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
		
		$form.append(Mainmenu_idInput);
		viewLoadingShow();
		$form.submit();		
	});
	
	// 디테일에서 사용자리스트로이동 버튼
	$("#userListGo").click(function(){
		var main_menu_id = $("#main_menu_id").val();
		
		// 동적 폼생성 get 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/user');
		$form.attr('method', 'get');
		$form.appendTo('body');
		
		var Mainmenu_idInput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
		
		$form.append(Mainmenu_idInput);
		viewLoadingShow();
		$form.submit();		
	});
	
	//리스트 체크박스 선택, 해제
	$("#userListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#userListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	//항목 선택 후 삭제를 눌렀을 때
	$("#user_chk_del").click(function() {
		var chked_val = [];
		var main_menu_id = $("#main_menu_id").val();
		var menuIDinput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
		
		$(":checkbox[id='user_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("사용자를 삭제 하시겠습니까?");
			if(delYn){
//				alert(chked_val);
				var user_id_input = $('<input type="hidden" value="'+chked_val+'" name="user_id2">');
		        var delFlag_input = $('<input type="hidden" value="1" name="delFlag">');
				
				$("#user_chk_list").append(user_id_input).append(menuIDinput).append(delFlag_input);
				viewLoadingShow();
				$("#user_chk_list").submit();
			}
		}
	});
	$("#user_detail_del").click(function() {
		var chked_val = [];
		var user_id = $("#user_id").val();
		var main_menu_id = $("#main_menu_id").val();
		var menuIDinput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
				
		chked_val[0] = user_id;
		
		//동적 폼생성 POST 전송 
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/user');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var delYn = confirm("사용자를 삭제 하시겠습니까?");
		if(delYn){
			var user_id = $('<input type="hidden" value="'+chked_val+'" name="user_id2">');
	        var delFlag_input = $('<input type="hidden" value="1" name="delFlag">');

			$form.append(user_id).append(menuIDinput).append(delFlag_input);
			viewLoadingShow();
			$form.submit();
		}
	});
});

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#userListCheck").prop("checked", false);
	});
}
	
//사용자리스트로 이동하는 곳
function goUserList() {
	$(document).ready(function(){
		var ctx = $("#ctx").val();
		var main_menu_id = $("#main_menu_id").val();
		var menuIDinput = $('<input type="hidden" value="'+main_menu_id+'" name="menu_id">');
		
		//동적 폼생성 POST 전송 
		var $form = $('<form></form>');
		$form.attr('action', ctx+'/user');
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		$form.append(menuIDinput);
		viewLoadingShow();
		$form.submit();
	});
}
//페이징 함수
function userPaging(pageNum, url) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var user_id = $("input[name=user_id]").val();
		var user_nm = $("input[name=user_nm]").val();
		var org_nm = $("input[name=org_nm]").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx + url);
	     $form.attr('method', 'post');
	     $form.appendTo('body');

	     var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	     var user_idInput = $('<input type="hidden" value="'+user_id+'" name="user_id">');
	     var user_nmInput = $('<input type="hidden" value="'+user_nm+'" name="user_nm">');
	     var org_nmInput = $('<input type="hidden" value="'+org_nm+'" name="org_nm">');
	 
	     $form.append(pageNumInput).append(user_idInput).append(user_nmInput).append(org_nmInput);
	     viewLoadingShow();
	     $form.submit();
	});
}

$(document).ready(function(){
	$("#modOrgList tbody tr").click(function(){			
		var org_id = $(this).find(".modOrg_id").val();
		var org_nm = $(this).find('.modOrg_nm').val();
		$.unblockUI();
		$("#org_ids").val(org_id);
		$("#org_nms").val(org_nm);
		$("#org_id").val(org_id);
		$("#org_nm").val(org_nm);			
	});
	
	// 권한 중복 검사
	$("#modAuthList tbody tr").click(function(){
		var trLen = $("#modUserAuthList tbody tr").length;
		var modAuth_id = $(this).children().find(".modAuth_id").val();
		var modAuth_nm = $(this).children().find(".modAuth_nm").val();
		var idChk = 0;
		$("#modUserAuthList tbody tr").each(function() {
			if($(this).children().find($("input[id=m_auth_id]")).val() == modAuth_id){
				alert("중복된 권한이 존재합니다");
				idChk = 0;
				return false;
			} else {
				idChk = 1;
			}
		});
		// 증복안되면 추가
		if(idChk == 1){
			var authTrAdd = '<tr id="m_auth_list">'
				+'<td><a href="#" class="mUserAuth_id" style="width : 33%;">'
				+'<input type="text" id="m_auth_id" readonly="readonly" style="border: 1px solid white;" name="m_auth_id" value="'+modAuth_id+'">'
				+'</td><td class="mauth_nm" style="width : 33%;">'
				+'<input type="text" id="m_auth_nm" readonly="readonly" style="border: 1px solid white;" name="m_auth_nm" value="'+modAuth_nm+'">'
				+'</td><td><span class="cancels" onclick="cancels();">x</span></td></tr>';
			$("#modUserAuthList tbody").append(authTrAdd);
		} else if(trLen == 0) {
			var authTrAdd = '<tr id="m_auth_list">'
				+'<td><a href="#" class="mUserAuth_id" style="width : 33%;">'
				+'<input type="text" id="m_auth_id" readonly="readonly" style="border: 1px solid white;" name="m_auth_id" value="'+modAuth_id+'">'
				+'</td><td class="mauth_nm" style="width : 33%;">'
				+'<input type="text" id="m_auth_nm" readonly="readonly" style="border: 1px solid white;" name="m_auth_nm" value="'+modAuth_nm+'">'
				+'</td><td><span class="cancels" onclick="cancels();">x</span></td></tr>';
			$("#modUserAuthList tbody").append(authTrAdd);
		}
	});
	
	$("#auth_sch_btn").click(function(){
		$.blockUI({ 
				message: $('#userAuthList'),			
				css: { width: '700'
				  	 , height: "400"
				     , top: "30%"
				     , left: "35%"}
		});
	$(".btn_close").click(function(){
		$.unblockUI();
	});
	});
	
	$("#orgSchBtn").click(function(){
		
		$("#h_s_org_id").val('');
		$("#h_s_org_nm").val('');
		$("#s_org_id").val('');
		$("#s_org_nm").val('');
		
		schOrgList(1, 1);
		
		$.blockUI({ 
				message: $('#repUserOrgList'),			
				css: { width: '550'
				  	 , height: "330"
				     , top: "30%"
				     , left: "35%"}
			,onOverlayClick : $.unblockUI
		});
		
		$(".btn_close").click(function(){
			$.unblockUI();
		});
	});	
});
//부서명 검색
function schOrgList(pageNum, schDiv){
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tbody = $('#modOrgTbody');
		var tbodyContent = "";
		var s_org_id = $("#s_org_id").val();
		var s_org_nm = $("#s_org_nm").val();
		var h_s_org_id = $("#h_s_org_id").val();
		var h_s_org_nm = $("#h_s_org_nm").val();
				

		$("#h_s_org_id").val(s_org_id);
		$("#h_s_org_nm").val(s_org_nm);
		
		var sendData = "";
		if(schDiv == 1){
			sendData = {
					"pageNum": pageNum,
					"org_id":s_org_id,
					"org_nm":s_org_nm
			};
		} else if(schDiv == 2){
			sendData =  {
					"pageNum": pageNum,
					"org_id":h_s_org_id,
					"org_nm":h_s_org_nm
			};
		}
		
		$.ajax({
			url : ctx+'/orgMoList',
			type : 'POST',
			data : sendData,
			success : function(data) {
				if(data.orgMlistSize == 0){
					alert("검색결과가 없습니다.");
				}else{
					tbody.empty();
					
					// 테이블 그리기
					$.each(data.orgMlist, function(i) {
						var trElement = $("#orgMTable thead tr").clone().removeClass().empty();
						
						var org_id = data.orgMlist[i].org_id;
						var org_nm = data.orgMlist[i].org_nm;
						
						trElement.bind("click", function(e) { // 기능 입히기
							$("#org_ids").val(org_id);
							$("#org_nms").val(org_nm);
							$("#org_id").val(org_id);
							$("#org_nm").val(org_nm);
							$.unblockUI();
						});
						$("#modOrgTbody").append(trElement);
						$("#modOrgTbody tr:last").append("<td>"+org_id+"</td>"
								+"<td>"+org_nm+"</td>");						
					});
					
					var pageContent = "";
					// 페이징 다시그리기
					$("#orgMPagingDiv").empty();
					
					if(data.page.endPageNum==1){
						pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='color: black; text-decoration: none;'> ◀ </a><input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.startPageNum+"' onkeypress='pageInputOrg(event);'/>"  
						+"<a style='color: black; text-decoration: none;'> / "+data.page.endPageNum+"</a>"
						+"<a style='color: black; text-decoration: none;''> ▶ </a>"
					}else if(data.pageNum == data.page.startPageNum){
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='color:black; text-decoration: none;'>◀</a><input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.startPageNum+"' onkeypress=\"pageInputOrg(event);\"/>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+(data.pageNum+1)+",2) id='pNum'> ▶ </a>";
					} else if(data.pageNum == data.page.endPageNum){
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+(data.pageNum-1)+",2) id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.endPageNum+"' onkeypress=\"pageInputOrg(event);\"/>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='color:black; text-decoration: none;'>▶</a>";
					} else {
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+(data.pageNum-1)+",2) id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' class='repUserPageInput' value='"+data.pageNum+"' onkeypress=\"pageInputOrg(event);\"/>"
						+"<a style='cursor: pointer;' onclick=schOrgList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='cursor: pointer;' onclick=schOrgList("+(data.pageNum+1)+",2) id='pNum'> ▶ </a>";
					}
					$("#orgMPagingDiv").append(pageContent);
				}
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error : function(request,status,error) {
		          alert("사용자페이징code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		      }
		});
	});
}	

//대표자 검색 엔터키
function orgEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		schOrgList(1, 1);
	}
	event.stopPropagation();
}
//대표자 검색 페이징 엔터키
function pageInputOrg(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				schOrgList(pageNum, 2);
			}
		}
		event.stopPropagation();
	});
}