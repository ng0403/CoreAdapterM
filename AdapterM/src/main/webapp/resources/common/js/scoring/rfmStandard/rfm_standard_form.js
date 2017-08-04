/**
업 무 명 : RFM 기준 상세
작 성 자 : 민지민(minjm93@coreplus.co.kr)
작 성 일 : 2015/10/26
수 정 자 : 민지민(minjm93@coreplus.co.kr)
수 정 일 : 2015/10/26
내 용 : RFM 기준 상세
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	var rfm_std_key = $("#rfm_std_key").val();
	var rfm_work_dt = $("#rfm_work_dt").val();
	var std_dt = $("#std_dt").val();
	var std_term = $("#std_term").val();
	var rfm_mjrcls_cd= $("#rfm_mjrcls_cd").val();
	var cust_grd_step = $("#cust_grd_step").val();
	var work_act_type = $("#work_act_type").val();
	
	// RTFM기준 관리 추가 기능
	$("#rfm_add_btn").click(function() {
		rfmAddFormFunc();
	});
	
	$("#upCode").on("change", function(){
		
		$('#store_name').css("width", "20%");
		$(".searchText").css("margin-left", "0px");
		
	});
	
	$('#rfm_modal_save').click(function(){
		if(!confirm("RFM 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		rfm_std_key = $('#rfm_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		work_start_dt = $('#modal_start_y').val() + $('#modal_start_m').val();
		work_end_dt = $('#modal_end_y').val() + $('#modal_end_m').val();
		
		var data = "rfm_std_key="+rfm_std_key+"&work_act_type=" +act_type+"&work_start_dt="+work_start_dt+"&work_end_dt="+work_end_dt;
		 
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/rfmCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				alert("성공!");
				$.unblockUI();
				$('#rfm_score_btn').prop("disabled", true);
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("RFM계산중 오류가 발생했습니다.");
				return false;
			}	
		});
	
	});
	
	$('#rfm_modal_cancel').click(function(){
		
		$.unblockUI();
		
	});
	
	// RFM기준 등록 저장
	$("#rfm_add_save").click(function() {
		
		if($("#std_dt").val()=="" || $("#std_dt").val()==null){
			alert("기준일자를 선택해주세요");
			return false;
		}else if($("#std_term").val()=="" || $("#std_term").val()==null){
			alert("기준기간을 입력해주세요");
			return false;
		}else if($("#cust_grd_step").val()=="" || $("#cust_grd_step").val()==null){
			alert("고객등급단계를 선택해주세요");
			return false;
		}else if($("#rfm_mjrcls_cd").val()=="" || $("#rfm_mjrcls_cd").val()==null){
			alert("작업분류를 선택해주세요");
			return false;
		}else if($("#work_act_type").val()=="" || $("#work_act_type").val()==null){
			alert("반복실행구분을 선택해주세요");
			return false;
		}
		
		var addYn = confirm("저장 하시겠습니까?");
		
		var ctx = $("#ctx").val();
		
		var data = "rfm_work_dt="+$("#rfm_work_dt").val()
					+"&std_dt="+$("#std_dt").val()
					+"&std_term="+$("#std_term").val()+"&cust_grd_step="+$("#cust_grd_step").val()
					+"&rfm_mjrcls_cd="+$("#rfm_mjrcls_cd").val()+"&work_act_type="+$("#work_act_type").val();
		 
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/rfmInsertValiChk",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				if(data > 0){
					alert("중복된 RFM 기준정보가 있습니다. 다시 입력해주세요!");
					$("#rfm_work_dt").val("");
					$("#std_dt").val("");
					$("#std_term").val("");
					$("#cust_grd_step").val("");
					$("#work_act_type").val("");
				} else {
					if(addYn){
						var form = $('#rfmStdForm');
						var rfmAddMdfyFlag_input = $('<input type="hidden" value="1" name="rfmAddMdfyFlag">');
						form.append(rfmAddMdfyFlag_input);
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
	$("#rfm_add_cancle").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#rfm_add_chk").val()=='1'){
				rfmActiveFormSubmit('/rfmStandard', '');
			}else{
				goRfmStdForm(rfm_std_key);
			}
		} else {
			return false;
		}
	});
	
	// RTFM기준 편집 기능
	$("#rfm_mdfy_btn").click(function() {
		$("#rfm_func_btn_div").hide();
		$("#rfm_insert_btn_div").hide();
		$("#rfm_mdfy_btn_div").show();
		
		$("#rfm_work_dt").prop("disabled", true);
		$("#rfm_std_detail input[type=text]").attr("readonly", false);
		$("#rfmStdTbl select").prop("disabled", false);
		
	});
	
	// RTFM기준 수정 저장
	$("#rfm_mdfy_save").click(function() {
		var mdfyYn = confirm("수정하시겠습니까?");
		var m_frm = $("#rfmStdForm");
		
		$('#rfm_work_dt').prop("disabled", false);
		$('#std_dt').prop("disabled", false);
		$('#std_term').prop("disabled", false);
		var rfmAddMdfyFlag = $('<input type="hidden" value="2" name="rfmAddMdfyFlag">');	
		m_frm.append(rfmAddMdfyFlag);
		if(mdfyYn){
			viewLoadingShow();
			m_frm.submit();
		}
	});
	
	// RTFM기준 편집 취소 기능
	$("#rfm_mdfy_cancle").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			goRfmStdForm(rfm_std_key);
		} else {
			return false;
		}
	});
	
	$("#rfm_weight_btn").click(function() {
		
		rfmActiveFormSubmit('/rfmCategoryWeight', rfm_std_key, rfm_mjrcls_cd,rfm_work_dt);
	});
	
	// RFM 작업 이력
	$("#rfm_score_work_his_btn").click(function() {
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/rfmWorkHistory").attr('method', 'post').appendTo('body');
		var rfm_std_key_input = $('<input type="hidden" value="'+rfm_std_key+'" name="rfm_std_key">');
		$form.append(rfm_std_key_input);
		viewLoadingShow();
		$form.submit();
	});
	
});

//RTFM기준 추가부분 내용초기화
function rfmAddFormFunc() {
	$("#rfmStdTitle").text("RFM 기준정보 추가");
	var rfm_work_dt_td = $("#rfm_work_dt_td").val();
	
	$("#rfm_func_btn_div").hide();
	$("#rfm_insert_btn_div").show();
	$("#rfm_std_detail input[type=text]").val('');
	$("#rfm_work_dt").val(rfm_work_dt_td);
	$("#rfm_std_detail select > option[value='']").attr("selected", "selected");
	$("#rfm_std_detail input[type=text]").attr("readonly", false);
	$("#rfmStdTbl select").prop("disabled", false);

}

//RTFM기준 동적폼생성
function rfmActiveFormSubmit(url, rfm_std_key, rfm_mjrcls_cd,rfm_work_dt) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	var rfm_std_key_input = $('<input type="hidden" value="'+rfm_std_key+'" name="rfm_std_key">');
	var rfm_mjrcls_cd =     $('<input type="hidden" value="'+rfm_mjrcls_cd+'" name="rfm_mjrcls_cd">');
	var rfm_work_dt_input = $('<input type="hidden" value="'+rfm_work_dt+'" name="rfm_work_dt">');
	
	$form.append(rfm_std_key_input).append(rfm_work_dt_input).append(rfm_mjrcls_cd);
	viewLoadingShow();
	$form.submit();
}

function rfmCal(rfm_std_key, work_act_type){
	
	if(work_act_type == "M"){
		$.blockUI({ message: $("#rfmStdModalMonTbl"),
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
		
		if(!confirm("RFM 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		rfm_std_key = $('#rfm_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		var data = "rfm_std_key="+rfm_std_key+"&work_act_type="+act_type;
		
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/rfmCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				if(data.rfmCal == 1){
					
					alert("성공!");
					$('#rfm_score_btn').prop("disabled",true);
					$('#rfm_score_work_his_btn').prop("disabled",false);
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
				alert("RFM 계산중 오류가 발생했습니다.");
				return false;
			}	
		});
		
	}
	
}