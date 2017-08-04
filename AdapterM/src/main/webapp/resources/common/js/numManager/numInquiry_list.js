/**
업 무 명 : 번호조회 리스트화면
작 성 자 : 이상민 (tkdals8401@coreplus.co.kr)
작 성 일 : 2015/09/21
수 정 자 : 이상민 (tkdals8401@coreplus.co.kr)
수 정 일 : 2015/09/21
내 용 : 번호조회에 대한 javascript 코드이다.
*참고사항 : 
 */

//번호조회 페이징
function niPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		//var sch_flg = $("#sch_flg").val();
		//if(sch_flg == 1) {
		    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		    $("#numInquiryPagingForm").append(pageNum_input);
		    viewLoadingShow();
		    $("#numInquiryPagingForm").submit();
		//}else {
			// 동적 폼생성 POST 전송
			/*var $form = $('<form></form>');
		    $form.attr('action', ctx+'/numInquiry');
		    $form.attr('method', 'post');
		    $form.appendTo('body');
		    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
		    $form.append(pageNum_input)
		    $form.submit();
		}*/
	});
}

//페이지 엔터키 기능
function inquiryNumInputEnter(event) {
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
				niPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 조회버튼
function numInqSearch(){
	var start_dt = $("#expired_start_dt_srch").val();
	var end_dt = $("#expired_end_dt_srch").val();
	var type = $("#category_type_div_srch").val();
	var key = $("#key_wid_srch").val();
	var amt = $("#amt_srch").val();
	var card = $("#card_reg_wid_srch").val();
	var sch_flg = $("#sch_flg").val(1);
	//if((start_dt == null || start_dt == '' || end_dt == null || end_dt == '') && (key == null || key == '')){
	//	alert("등록기간 혹은 발급번호를 입력해주세요");
	//}
	if(key == null || key == '') {
		alert("발급번호를 입력해 주세요.");
	}
	else{
		$("#ni_form").append(sch_flg);
		viewLoadingShow();
		$("#ni_form").submit();
	}
}

// 유효기간 종료일 업데이트
function expiredEndUpdate() {
	var ctx = $("#ctx").val();
	var type = $("#category_type_div_srch").val(); // 채번구분
	var expired_cnt = $("#expired_cnt").val();
	var expired_change_cnt = $("#expired_change_cnt").text();
	var key_wid = [];
	var expired_end_dt = [];
	var flag = 0;
	var cnt = $("#expired_cnt").val();
	var eflag = false;	//유효기간 연장 체크 Flag
	var vflag = false;	//유효기간 변경 체크 Flag
	
	$("input[name='expired_end_dt']").each(function(index) {
		expired_end_dt[index] = $(this).val();
		if(expired_end_dt[index] == "") {
			flag = 1;
		}
		var new_val = $(this).val();
		var org_val = $(this).attr("value");
		var exp_cnt = $("#expired_change_cnt").text();
		if(exp_cnt == cnt && new_val != org_val){
			alert("유효기간 연장은 최대 "+cnt+"회까지 입니다.");
			$(this).attr("value",org_val);
			eflag = true;
			cnt++;
		}
		if(new_val != org_val){
			vflag = true;
		}
	});
	if(eflag == true){
		return;
	}
	
	//유효기간 변경여부 체크
	if(vflag == false){
		alert("변경된 값이 없습니다.");
		return;
	}
	
	$("#num_inquiry_tbl td[id=key_wid]").each(function(index) {
		key_wid[index] = $(this).text();
	});
	if(flag == 1) {
		alert("유효기간 종료일을 입력해 주세요.");
	}
	else {
		var sendData = "type="+type+"&key_wid="+key_wid+"&expired_end_dt="+expired_end_dt
						+"&expired_cnt="+expired_cnt+"&expired_change_cnt="+expired_change_cnt;
		$.ajax({
			url: ctx + "/expiredEndUpdate", 
			type: "POST",  
			data: sendData,//보내는값
			dataType: "json",
			success: function(data) {
				alert("유효기간 종료일이 변경되었습니다.");
				//numInqSearch();
				viewLoadingShow();
				$("#ni_form").submit();
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
			error: function(data) {
				alert("전송실패");
			}
		});
	}
}