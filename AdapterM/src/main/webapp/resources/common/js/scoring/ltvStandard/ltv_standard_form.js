/**
업 무 명 : LTV 기준 상세
작 성 자 : 김기현(comeanding@coreplus.co.kr)
작 성 일 : 2016/03/16
수 정 자 : 김기현(comeanding@coreplus.co.kr)
수 정 일 : 2016/03/16
내 용 : LTV 기준 상세
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	var ltv_std_key = $("#ltv_std_key").val();
	var ltv_work_dt = $("#ltv_work_dt").val();
	var std_dt = $("#std_dt").val();
	var std_term = $("#std_term").val();
	var cust_grd_step = $("#cust_grd_step").val();
	
	// RTFM기준 관리 추가 기능
	$("#ltv_add_btn").click(function() {
		ltvAddFormFunc();
	});
	
	$("#upCode").on("change", function(){
		
		$('#store_name').css("width", "20%");
		$(".searchText").css("margin-left", "0px");
		
	});
	
	$('#ltv_modal_save').click(function(){
		
		if(!confirm("LTV 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		ltv_std_key = $('#ltv_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		work_start_dt = $('#modal_start_y').val() + $('#modal_start_m').val();
		work_end_dt = $('#modal_end_y').val() + $('#modal_end_m').val();
		
		var data = "ltv_std_key="+ltv_std_key+"&work_act_type=" +act_type+"&work_start_dt="+work_start_dt+"&work_end_dt="+work_end_dt;
		
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/ltvCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				alert("성공!");
				$.unblockUI();
				
				$('#ltv_score_btn').prop("disabled", true);
				
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("LTV 계산중 오류가 발생했습니다.");
				return false;
			}	
		});
		
	});
	
	$('#ltv_modal_cancel').click(function(){
		
		$.unblockUI();
		
	});
	
	
	
	
	// ltv기준 등록 저장
	$("#ltv_add_save").click(function() {
		
		if($("#cbo_year").val()=="" || $("#cbo_year").val()==null){
			alert("기준년을 선택해주세요");
			return false;
		}else if($("#cbo_month").val()=="" || $("#cbo_month").val()==null){
			alert("기준월을 선택해주세요");
			return false;
		}
		else if($("#std_term").val()=="" || $("#std_term").val()==null){
			alert("기준기간을 입력해주세요");
			return false;
		}else if($("#cust_grd_step").val()=="" || $("#cust_grd_step").val()==null){
			alert("고객등급단계를 선택해주세요");
			return false;
		}else if($("#work_act_type").val()=="" || $("#work_act_type").val()==null){
			alert("반복실행구분을 선택해주세요");
			return false;
		}
		
		var addYn = confirm("저장 하시겠습니까?");
		
		var ctx = $("#ctx").val();
		
		var data = "ltv_work_dt="+$("#ltv_work_dt").val()
					+"&std_ym="+$("#cbo_year").val() + $("#cbo_month").val()
					+"&std_term="+$("#std_term").val()+"&cust_grd_step="+$("#cust_grd_step").val();
		 
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/ltvInsertValiChk",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				if(data > 0){
					alert("중복된 LTV 기준정보가 있습니다. 다시 입력해주세요!");
					$("#ltv_work_dt").val("");
					$("#cbo_year").val("");
					$("#cbo_month").val("");
					$("#std_term").val("");
					$("#cust_grd_step").val("");
				} else {
					if(addYn){
						var form = $('#ltvStdForm');
						var ltvAddMdfyFlag_input = $('<input type="hidden" value="1" name="ltvAddMdfyFlag">');
						form.append(ltvAddMdfyFlag_input);
						viewLoadingShow();
						form.submit();
					}
				}
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();
	        },
			error: function(data) { 
				alert("중복조건을 취득하지 못했습니다.");
				return false;
			}	
		});
	});
	
	// RTFM기준 추가 취소 기능
	$("#ltv_add_cancle").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#ltv_add_chk").val()=='1'){
				ltvActiveFormSubmit('/ltvStandard', '');
			}else{
				goltvStdForm(ltv_std_key);
			}
		} else {
			return false;
		}
	});
	
	// RTFM기준 편집 기능
	$("#ltv_mdfy_btn").click(function() {
		$("#ltv_func_btn_div").hide();
		$("#ltv_insert_btn_div").hide();
		$("#ltv_mdfy_btn_div").show();
		
		$("#ltv_work_dt").prop("disabled", true);
		$("#ltv_std_detail input[type=text]").attr("readonly", false);
		$("#ltvStdTbl select").prop("disabled", false);
		$('#std_term').prop("disabled", false);
		
	});
	
	// RTFM기준 수정 저장
	$("#ltv_mdfy_save").click(function() {
		var mdfyYn = confirm("수정하시겠습니까?");
		var m_frm = $("#ltvStdForm");
		var ltvAddMdfyFlag = $('<input type="hidden" value="2" name="ltvAddMdfyFlag">');	
		m_frm.append(ltvAddMdfyFlag);
		if(mdfyYn){
			viewLoadingShow();
			m_frm.submit();
		}
	});
	
	// RTFM기준 편집 취소 기능
	$("#ltv_mdfy_cancle").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			goltvStdForm(ltv_std_key);
		} else {
			return false;
		}
	});
	
	// ltv 작업 이력
	$("#ltv_score_work_his_btn").click(function() {
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/ltvWorkHistory").attr('method', 'post').appendTo('body');
		var ltv_std_key_input = $('<input type="hidden" value="'+ltv_std_key+'" name="ltv_std_key">');
		$form.append(ltv_std_key_input);
		viewLoadingShow();
		$form.submit();
	});
	
});

//RTFM기준 추가부분 내용초기화
function ltvAddFormFunc() {
	$("#ltvStdTitle").text("LTV 기준정보 추가");
	var ltv_work_dt_td = $("#ltv_work_dt_td").val();
	
	$("#ltv_func_btn_div").hide();
	$("#ltv_insert_btn_div").show();
	$("#ltv_std_detail input[type=text]").val('');
	$("#ltv_work_dt").val(ltv_work_dt_td);
	$("#ltv_std_detail select > option[value='']").attr("selected", "selected");
	$("#ltv_std_detail input[type=text]").attr("readonly", false);
	$("#ltvStdTbl select").prop("disabled", false);

}

//RTFM기준 동적폼생성
function ltvActiveFormSubmit(url, ltv_std_key, ltv_work_dt) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	var ltv_std_key_input = $('<input type="hidden" value="'+ltv_std_key+'" name="ltv_std_key">');
	var ltv_work_dt_input = $('<input type="hidden" value="'+ltv_work_dt+'" name="ltv_work_dt">');
	
	$form.append(ltv_std_key_input).append(ltv_work_dt_input);
	viewLoadingShow();
	$form.submit();
}

function ltvCal(ltv_std_key, work_act_type){
	
	if(work_act_type == "M"){
		$.blockUI({ message: $("#ltvStdModalMonTbl"),
	    	css: { 
	    	'left': '50%',
	    	'top': '50%',
	    	'margin-left': '-400px',
	    	'margin-top': '-150px',
	    	'width': '770px',
	    	'height': '150px',
	    	'cursor': 'default'
	    	}
		 	,onOverlayClick : $.unblockUI
		});
		
	}else{
		
		if(!confirm("LTV 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		ltv_std_key = $('#ltv_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		var data = "ltv_std_key="+ltv_std_key+"&work_act_type="+act_type;
		
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/ltvCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				if(data.ltvCal == 1){
					
					alert("성공!");
					$('#ltv_score_btn').prop("disabled",true);
					$('#ltv_score_work_his_btn').prop("disabled",false);
					$.unblockUI();
					
				}
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("ltv계산중 오류가 발생했습니다.");
				return false;
			}	
		});
		
	}
	
}