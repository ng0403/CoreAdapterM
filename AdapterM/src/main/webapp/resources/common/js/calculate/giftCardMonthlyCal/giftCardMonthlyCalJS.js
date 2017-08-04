function goGCMCSearch(){
	
	//선택된 값 유지시켜주는 부분
	var date = $("#cond_dt").val();
	var cbo_year = $("#cbo_year").val();
	var cbo_month = $("#cbo_month").val();
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var store_name = $("#store_name").val();
	var cnt = 0;
	
	$("#cbo_year").val($("#cbo_year").children('option:selected').val());
	$("#cbo_month").val($("#cbo_month").children('option:selected').val());
	$("#brand_wid").val($("#brand_wid").val());
	$("#cond_dt").val($("#cbo_year").children('option:selected').val()+$("#cbo_month").children('option:selected').val());
	
	if(cnt == 0) {
		var cond_dt = $("#cond_dt").val();
		var giftCardMonthlyCalListform = $("#giftCardMonthlyCalListform").append(cond_dt, cond_dt);
		viewLoadingShow();
		
	    giftCardMonthlyCalListform.submit();
	}
}

//페이징 함수
function GCMCPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    var giftCardMonthlyCalListform = $("#GCMCForm");
	    giftCardMonthlyCalListform.append(pageNumInput);
	    viewLoadingShow();
	    giftCardMonthlyCalListform.submit();
	});
}

function CloseErpGiftCardMonthly(){
	
	var ctx = $("#ctx").val();
	
	var tran_yy = $('#cbo_year').val();
	var tran_mm = $('#cbo_month').val();
	
	var brand = $('#brand_wid').val();
	var store = $('#store_wid').val();
	
	var tran_dt = tran_yy+ tran_mm;
	
	var param = {
			std_ym : tran_dt,
			brand_wid : brand,
			store_wid : store
	}
	
	if(!confirm("마감 처리하시겠습니까?"))
		return;
	
	$.ajax({  
		url:  ctx+'/erpMonthlyCloseGiftCard',
		type: "POST",
		data: param,
		success: function(data) {
        	if(data=="error"){
        		alert("월 정산 에러가 발생하였습니다.");
        		return;
        	}
        	alert("월 정산이 완료되었습니다.");
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("월 정산 에러가 발생하였습니다.");
			return false;
		}	
	});		
	
}

function transGiftCardErp(){
	
var ctx = $("#ctx").val();
	
	var tran_yy = $('#cbo_year').val();
	var tran_mm = $('#cbo_month').val();
	
	var brand = $('#brand_wid').val();
	var store = $('#store_wid').val();
	
	var tran_dt = tran_yy+ tran_mm;
	
	var param = {
			std_ym : tran_dt,
			brand_wid : brand,
			store_wid : store
	}
	
	if(!confirm("ERP 전송 처리하시겠습니까?"))
		return;
	
	$.ajax({  
		url:  ctx+'/erpMonthlyGiftCardTrans',
		type: "POST",
		data: param,
		success: function(data) {
        	if(data=="error"){
        		alert("ERP 전송 에러가 발생하였습니다.");
        		return;
        	}
        	alert("ERP 전송이 완료되었습니다.");
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(data) { 
			alert("ERP 전송 에러가 발생하였습니다.");
			return false;
		}	
	});	
	
}

//가맹점 리스트 엔터키 기능
function GCMCPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var GCMCPageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(GCMCPageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > GCMCPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				GCMCPaging(GCMCPageNum);
			}
		}
		event.stopPropagation();
	});
}