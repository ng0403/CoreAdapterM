/**
업 무 명 : 고객 등급 기준 상세
작 성 자 : 이지용
작 성 일 : 2015/10/26
수 정 자 : 김기현
수 정 일 : 2016/03/20
내 용 : 고객 등급 기준
*참고사항 : 
 */

$(document).ready(function() {
	
	var ctx = $("#ctx").val();
	
	$("#cgm_detail_btn_div").hide();
	$("#cgm_mdfy_btn_div").hide();
	$("#cgm_insert_btn_div").hide();
	
	if($('#grd_add_chk').val() == "1"){
		$("#cgm_mdfy_btn_div").show();
	}else if($('#grd_add_chk').val() == "0"){
		
		$('#grd_work_dt_sch').prop("disabled", true);
		$('#cbo_year').prop("disabled", true);
		$('#cbo_month').prop("disabled", true);
		$('#std_term').prop("disabled", true);
		$('#cust_grd_step').prop("disabled", true);
		$('#work_act_type').prop("disabled", true);
		
		$('.visit_cnt_min_class').prop("disabled", true);
		$('.visit_cnt_max_class').prop("disabled", true);
		
		$('.pchs_amt_min_class').prop("disabled", true);
		$('.pchs_amt_max_class').prop("disabled", true);
		
		$("#cgm_detail_btn_div").show();
		
	}else{
		
	}
	
	$('#cgm_modal_save').click(function(){
		
		if(!confirm("고객등급 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		grd_std_key = $('#grd_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		work_start_dt = $('#modal_start_y').val() + $('#modal_start_m').val();
		work_end_dt = $('#modal_end_y').val() + $('#modal_end_m').val();
		
		work_div_cd = "0004";
		work_stat_cd = "0001";
		
		var data = "grd_std_key="+grd_std_key+"&work_act_type=" +act_type+"&work_start_dt="+work_start_dt+"&work_end_dt="+work_end_dt+"&work_div_cd="+work_div_cd+"&work_stat_cd="+work_stat_cd;
		
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/grdCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				alert("성공!");
				$.unblockUI();
				
				$('#grd_work_start_btn').prop("disabled", true);
				
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("고객등급 계산중 오류가 발생했습니다.");
				return false;
			}	
		});
		
	});
	
	$('#cgm_modal_cancel').click(function(){
		
		$.unblockUI();
		
	});
	
	// 로열티프로그램 편집 기능
	$("#cgm_detail_mdfy").click(function() {
		$("#cgm_insert_btn_div").hide();
		$("#cgm_detail_btn_div").hide();
		$("#cgm_mdfy_btn_div").show();
		$("#cust_grd_div").prop("disabled", true);
		
		$('#cbo_year').prop("disabled", false);
		$('#cbo_month').prop("disabled", false);
		$('#std_term').prop("disabled", false);
		$('#cust_grd_step').prop("disabled", false);
		$('#work_act_type').prop("disabled", false);
		
		$('.visit_cnt_min_class').prop("disabled", false);
		$('.visit_cnt_max_class').prop("disabled", false);
		
		$('.pchs_amt_min_class').prop("disabled", false);
		$('.pchs_amt_max_class').prop("disabled", false);
	
	});
	
	
	// 프로그램 수정 저장
	$("#cgm_mdfysave").click(function() {
		
		if($('#grd_work_dt_sch').val()==''){
			alert("작업일자가 입력되지 않았습니다.");
			return ;
		}else if($('#cbo_year').val()=='' || $('#cbo_month').val() ==''){
			alert("기준월이 입력되지 않았습니다.");
			return ;
		}else if($('#std_term').val()==''){
			alert("기준기간이 입력되지 않았습니다.");
			return ;
		}else if($('#cust_grd_step').val()==''){
			alert("고객등급단계가 입력되지 않았습니다.");
			return ;
		}else if($('#work_act_type').val()==''){
			alert("반복실행구분이 입력되지 않았습니다.");
			return ;
		}
		
		var grdlist = new Array();
		
		//데이터 값 검사
		$("#cgmTbody tr").each(function(index,item) {
				buy_cnt_input = $(item).children().eq(1).children();
				buy_amt_input = $(item).children().eq(2).children();
				
				visit_cnt_min = buy_cnt_input.eq(0).val();
				visit_cnt_max = buy_cnt_input.eq(1).val();
				
				pchs_amt_min = buy_amt_input.eq(0).val();
				pchs_amt_max = buy_amt_input.eq(1).val();
				
				if(visit_cnt_max==''){
					alert((index+1) + "번째 구매수 최대값을 설정하지 않았습니다.");
					valid = false;
					return ;
				}else if(visit_cnt_min==''){
					alert((index+1) + "번째 구매수 최소값을 설정하지 않았습니다.");
					valid = false;
					return ;
				}else if(pchs_amt_max==''){
					alert((index+1) + "번째 구매액 최소값을 설정하지 않았습니다.");
					valid = false;
					return ;
				}else if(pchs_amt_min==''){
					alert((index+1) + "번째 구매액 최소값을 설정하지 않았습니다.");
					valid = false;
					return ;
				}
				
				if(Number(visit_cnt_max)<Number(visit_cnt_min)){
					alert((index+1) + "번째 구매수 최대값이 최소값보다 작습니다.");
					valid = false;
					return ;
				}else if(Number(pchs_amt_max)<Number(pchs_amt_min)){
					alert((index+1) + "번째 구매액 최대값이 최소값보다 작습니다.");
					valid = false;
					return ;
				}
				
				var grd = {
						visit_cnt_min : visit_cnt_min,
						visit_cnt_max : visit_cnt_max,
						pchs_amt_min : pchs_amt_min,
						pchs_amt_max : pchs_amt_max
				}
				
				grdlist[index] = grd;
				
		});
		
		if(valid==false){
			return;
		}
		var valid = true;
		
		var cgmMdfyYn = confirm("저장하시겠습니까?");

		if(cgmMdfyYn){
			
			var data = {
					grd_std_key : $('#grd_std_key_h').val(),
					add_chk : $('#grd_add_chk').val(),
					grd_work_dt : $('#grd_work_dt_sch').val(),
					std_ym : $('#cbo_year').val() + $('#cbo_month').val(),
					std_term : $('#std_term').val(),
					cust_grd_step : $('#cust_grd_step').val(),
					work_act_type : $('#work_act_type').val(),
					grdlist : grdlist
			}
			
			$.ajax({
				type: "POST",  
				url: ctx+"/editGrdStdListAjax",
				data: data,
				dataType : "json",
				success: function(data) {
					alert("정보가 수정되었습니다.");
				},
				beforeSend: function(){
		        	viewLoadingShow();			
		        },
		        complete:function(){
		        	viewLoadingHide();
		        	location.reload();
//		        	location.href(ctx + "/customerGradeManager");
		        },
				error: function(data) { 
					alert("정보 수정에 실패했습니다.");
					return false;
				}	
			});
		}
	});
	
	// 쿠폰 추가 취소 기능
	$("#cgm_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#cgm_add_chk").val()=='1'){
				cgmActiveFormSubmit('/customerGradeManager', '');
			}else{
				location.reload();
			}
		} else {
			return false;
		}
	});
	
	// 프로그램 편집 취소 기능
	$("#cgm_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			location.reload();
		} else {
			return false;
		}
	});

});

function stepChng() {
	viewLoadingShow();
	$("#stepChngForm").submit();
}

function grdStepChange(){
	
	if($('#cust_grd_step').val()=='3'){
		$('#cgmTbody').children().remove();
		
		$('#cgmTbody').append("<tr><td>본프렌드</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>본패밀리</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>본VIP</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		
	}else if($('#cust_grd_step').val()=='5'){
		$('#cgmTbody').children().remove();

		$('#cgmTbody').append("<tr><td>일반</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>BRONZE</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>SILVER</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>GOLD</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		$('#cgmTbody').append("<tr><td>VIP</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td><td colspan='4'><input type='text' onkeydown='numChk(this);' style=' width: 20%;'>이상 <input type='text' onkeydown='numChk(this);' style=' width: 20%;'>미만</td></tr>");
		
	}else{
		$('#cgmTbody').children().remove();
		$('#cgmTbody').append("<tr><td colspan='10' style='text-align: center; height: 274px; font-weight: bold; cursor: default;'>등급 기준 등록이 필요합니다.</td></tr>");
	}
	
}

//RTFM기준 추가부분 내용초기화
function grdAddFormFunc() {
	$("#grdStdTitle").text("고객등급 기준정보 추가");
	var grd_work_dt_td = $("#grd_work_dt_td").val();
	
	$("#grd_func_btn_div").hide();
	$("#grd_insert_btn_div").show();
	$("#grd_std_detail input[type=text]").val('');
	$("#grd_work_dt").val(grd_work_dt_td);
	$("#grd_std_detail select > option[value='']").attr("selected", "selected");
	$("#grd_std_detail input[type=text]").attr("readonly", false);
	$("#grdStdTbl select").prop("disabled", false);

}

function grdCal(grd_std_key, act_type){
	
	if(act_type == "M"){
		$.blockUI({ message: $("#grdStdModalMonTbl"),
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
		
		if(!confirm("고객등급 작업을 등록하시겠습니까?")){
			return ;
		}
		
		var ctx = $("#ctx").val();
		
		grd_std_key = $('#grd_std_key_h').val();
		act_type = $('#work_act_type').val();
		
		work_div_cd = "0004";
		work_stat_cd = "0001";
		
		var data = "grd_std_key="+grd_std_key+"&work_act_type=" +act_type+"&work_div_cd="+work_div_cd+"&work_stat_cd="+work_stat_cd;
		
		$.ajax({
			//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
			type: "POST",  
			url: ctx+"/grdCalInsert",   
			data: data,
			dataType : "json",
			success: function(data) {
				
				alert("성공!");
				$.unblockUI();
				
				$('#grd_work_start_btn').prop("disabled", true);
				
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) { 
				alert("고객등급 계산중 오류가 발생했습니다.");
				return false;
			}	
		});
		
	}
	
}

function grd_work_list(grd_std_key){
	
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/customerGradeWorkHistory');
	$form.attr('method', 'post');
	$form.appendTo('body');
	 
	 // 상세정보일때
	if(grd_std_key != ''){
		var grd_std_key_input = $('<input type="hidden" value="'+grd_std_key+'" name="grd_std_key">');
		$form.append(grd_std_key_input);
	}
	
	var pageNum_input = $('<input type="hidden" value="1" name="pageNum">');
	$form.append(pageNum_input);
	 
	viewLoadingShow();
	$form.submit();
	
}
