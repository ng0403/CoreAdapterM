/**
업 무 명 : statistic_list 권한관리 화면
작 성 자 : 송성호 (0302333@coreplus.co.kr)
작 성 일 : 2015/08/17
수 정 자 : 송성호 (0302333@coreplus.co.kr)
수 정 일 : 2015/08/17
내 용 : 부서 관리에 대한 javascript 공통 코드이다.
*참고사항 : 
*/

$(document).ready(function() {
	
	// 부서 추가 저장
	$("#org_save").click(function() {
		if($("#org_nm").val()==""){
			alert("부서명을 입력해주세요.");
			$("#org_nm").focus();
			return;
		} else {
			if(confirm("저장 하시겠습니까?")){
				var form_flag_input = $('<input type="hidden" value="3" name="form_flag">');
				$("#orgform").append(form_flag_input);
				viewLoadingShow();
				$("#orgform").submit();
			}else{
				return;
			}
		}
	});
	
	// 부서 수정 저장
	$("#org_mdfy_save").click(function() {
		if($("#org_nm").val()==""){
			alert("부서명을 입력해주세요.");
			$("#org_nm").focus();
			return;
		} else {
			if(confirm("저장 하시겠습니까?")){
				var form_flag_input = $('<input type="hidden" value="4" name="form_flag">');
				$("#orgform").append(form_flag_input);
				viewLoadingShow();
				$("#orgform").submit();
			}else{
				return;
			}
		}
	});
	
	var h_org_id = $("#h_org_id").val();
	// 부서 추가 취소 기능
	$("#org_cancel").click(function() {
		var addYn = confirm("부서 추가를 취소 하시겠습니까?");
		if(addYn){
			if(h_org_id == ''){
				goOrgSubmit('/org', '');
			} else {
				goOrgSubmit('/orgForm', h_org_id);
			}
		} else {
			return false;
		}
	});
	
	// 부서 편집 취소 기능
	$("#org_mdfy_cancel").click(function() {
		var mdfyYn = confirm("부서 편집을 취소 하시겠습니까?");
		if(mdfyYn){
			goOrgSubmit('/orgForm', h_org_id);
		} else {
			return false;
		}
	});
});

// 취소 기능
function goOrgSubmit(url, org_id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		var $form = $('<form></form>');
		$form.attr('action', ctx+ url);
		$form.attr('method', 'post');
		$form.appendTo('body');
		if(org_id != ''){
			var form_flag_input = $('<input type="hidden" value="2" name="form_flag">');
			var org_id_input = $('<input type="hidden" value="'+org_id+'" name="org_id">');
			$form.append(org_id_input);
			$form.append(form_flag_input);
		}
		viewLoadingShow();
		$form.submit();
	});
}

// 상세화면에서 보여줄 태그 / 안보여줄 태그 관리함수
function org_detail(org_id) {
	var ctx = $("#ctx").val();

	var $form = $('<form></form>');
     $form.attr('action', ctx+'/orgForm');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var org_id_input = $('<input type="hidden" value="'+org_id+'" name="org_id">');
     var form_flag_input = $('<input type="hidden" value="2" name="form_flag">');
     
     $form.append(org_id_input);
     $form.append(form_flag_input);
     viewLoadingShow();
     $form.submit();
}

// 추가화면에서 보여줄 태그 / 안보여줄 태그  관리함수
function org_insert(org_id){
	var ctx = $("#ctx").val();

	var $form = $('<form></form>');
     $form.attr('action', ctx+'/orgForm');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     if(org_id != ''){
    	 var org_id_input = $('<input type="hidden" value="'+org_id+'" name="org_id">');
    	 $form.append(org_id_input);
     }
     var form_flag_input = $('<input type="hidden" value="1" name="form_flag">');
     
     $form.append(form_flag_input);
     viewLoadingShow();
     $form.submit();
}

// 추가 화면 세팅
function org_insert_set(){
	$("#org_am_btn_div").hide();
	$("#org_msc_btn_div").hide();
	$("#org_asc_btn_div").show();
	$("input[type=text]").prop("readonly", false);
	$("#rep_emp_nm").prop("readonly", true);
	$("input[type=radio]").prop("disabled", false);
	$("select").prop("disabled", false);
	$("#repEmpSchBtn").prop("disabled", false);
	$("#org_form_title").text("부서 추가");
	$("#act_y").prop("checked", true);
}

// 편집화면에서 보여줄 태그 / 안보여줄 태그  관리함수
function org_update(){
	var chk = confirm("편집 하시겠습니까?");
	if(chk){
		$("input[type=text]").prop("readonly", false);
		$("input[type=radio]").prop("disabled", false);
		$("#rep_emp_nm").prop("readonly", true);
		$("select").prop("disabled", false);
		$("#repEmpSchBtn").prop("disabled", false);
		$("#org_am_btn_div").hide();
		$("#org_msc_btn_div").show();
		$("#org_asc_btn_div").hide();
	}
}

$(document).ready(function(){
	
	// 대표검색 버튼 팝업창 부르기
	$("#repEmpSchBtn").click(function(){
		
		$("#h_rep_user_id").val('');
		$("#h_rep_user_nm").val('');
		$("#rep_user_id").val('');
		$("#rep_user_nm").val('');
		
		schRepEmpMoList(1, 1);
		$.blockUI({ 
				message: $('#repOrgUserList'),			
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

// 대표명 검색
function schRepEmpMoList(pageNum, schDiv){
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var tbody = $('#repEmpTbody');
		var tbodyContent = "";
		var rep_user_id = $("#rep_user_id").val();
		var rep_user_nm = $("#rep_user_nm").val();
		var h_rep_user_id = $("#h_rep_user_id").val();
		var h_rep_user_nm = $("#h_rep_user_nm").val();
		
		var sendData = "";
		if(schDiv == 1){
			sendData = {
					"pageNum": pageNum,
					"rep_user_id":rep_user_id,
					"rep_user_nm":rep_user_nm
			};
		} else if(schDiv == 2){
			sendData =  {
					"pageNum": pageNum,
					"rep_user_id":h_rep_user_id,
					"rep_user_nm":h_rep_user_nm
			};
		}
		
		$.ajax({
			url : ctx+'/repMoList',
			type : 'POST',
			data : sendData,
			success : function(data) {
				if(data.replistSize == 0){
					alert("검색결과가 없습니다.");
				}else{
					tbody.empty();
					
					$("#h_rep_user_id").val(data.rep_user_id);
					$("#h_rep_user_nm").val(data.rep_user_nm);
					
					// 테이블 그리기
					$.each(data.replist, function(i) {
						var trElement = $("#repUserTable thead tr").clone().removeClass().empty();

						trElement.bind("click", function(e) { // 기능 입히기
							$("#rep_emp_id").val(data.replist[i].user_id);
							$("#rep_emp_nm").val(data.replist[i].user_nm);	
							$.unblockUI();
						});

						$("#repEmpTbody").append(trElement);
						$("#repEmpTbody tr:last").append("<td>"+data.replist[i].user_id+"</td>"
								+"<td>"+data.replist[i].user_nm+"</td>"
								+"<td>"+data.replist[i].user_type_nm+"</td>");
					});
					
					var pageContent = "";
					// 페이징 다시그리기
					$("#repUserPagingDiv").empty();
					
					if(data.page.endPageNum==1){
						pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+ "<a style='color: black; text-decoration: none;'> ◀ </a><input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.startPageNum+"' onkeypress='pageInputRepUser(event);'/>"  
						+"<a style='color: black; text-decoration: none;'> / "+data.page.endPageNum+"</a>"
						+"<a style='color: black; text-decoration: none;''> ▶ </a>"
					}else if(data.pageNum == data.page.startPageNum){
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+ "<a style='color:black; text-decoration: none;'>◀</a><input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.startPageNum+"' onkeypress=\"pageInputRepUser(event);\"/>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+(data.pageNum+1)+",2) id='pNum'> ▶ </a>";
					} else if(data.pageNum == data.page.endPageNum){
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+(data.pageNum-1)+",2) id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' class='repUserPageInput' value='"+data.page.endPageNum+"' onkeypress=\"pageInputRepUser(event);\"/>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='color:black; text-decoration: none;'>▶</a>";
					} else {
						pageContent ="<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+(data.pageNum-1)+",2) id='pNum'> ◀ </a>"
						+"<input type='text' id='pageInput' class='repUserPageInput' value='"+data.pageNum+"' onkeypress=\"pageInputRepUser(event);\"/>"
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+data.page.endPageNum+",2) id='pNum'> / "+data.page.endPageNum+"</a>" 
						+"<a style='cursor: pointer;' onclick=schRepEmpMoList("+(data.pageNum+1)+",2) id='pNum'> ▶ </a>";
					}
					$("#repUserPagingDiv").append(pageContent);
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

// 대표자 검색 엔터키
function repEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		schRepEmpMoList(1, 1);
	}
	event.stopPropagation();
}
// 대표자 검색 페이징 엔터키
function pageInputRepUser(event) {
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
				schRepEmpMoList(pageNum, 2);
			}
		}
		event.stopPropagation();
	});
}

//리스트 목로 전체 선택
$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	//리스트 체크박스 선택, 해제
	$("#orgListCheck").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#orgListCheck").prop("checked")){
			//전체 체크박스 체크
			$("input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	$("#org_del").click(function() {
		var org_id = $("#org_id").val();
		
		var $form = $('<form></form>');
	    $form.attr('action', ctx+'/org');
	    $form.attr('method', 'post');
	    $form.appendTo('body');
		
		var org_id_input = $('<input type="hidden" value="'+org_id+'" name="org_id">');
        var delFlag_input = $('<input type="hidden" value="1" name="delFlag">');
		
		var delYn = confirm("부서를 삭제 하시겠습니까?");
		if(delYn){
			 $form.append(org_id_input).append(delFlag_input);
			 viewLoadingShow();
		     $form.submit();
		}	
	});
	
	//항목 선택 후 삭제를 눌렀을 때
	$("#org_chk_del").click(function() {
		var chked_val = [];
		
		$(":checkbox[id='org_chk']:checked").each(function(index, item){
			chked_val[index] = item.value;
		});
		
		if(chked_val == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			if(confirm("부서를 삭제 하시겠습니까?")){
				 var delFlag_input = $('<input type="hidden" value="1" name="delFlag">');
				$("#org_chk_list").append(delFlag_input);
				viewLoadingShow();
				$("#org_chk_list").submit();
			}
		}
	});
});

//전체 체크 해제
function chkCancel() {
	$(document).ready(function() {
		$("#orgListCheck").prop("checked", false);
	});
}