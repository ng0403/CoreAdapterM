/**
업 무 명 : 상품권관리 리스트화면
작 성 자 : 
작 성 일 : 
수 정 자 : 
수 정 일 : 
내 용 : 상품권관리에 대한 javascript 코드이다.
참고사항 : 
*/

// 상품권명 클릭 모달창 처리
function doPopupGiftbonDetail(gift_wid,active_flg) {
	$('#preview').remove();
	$("#giftbon_send_de_tbl :input").attr("value","");	
	// 팝업창 표시
	$.blockUI({ message: $('#gift_send_mo_detail'),
    	css: { 
    		width: "700"
		  , height: "350"
		  , top: "25%"
		  , left: "30%"
    	}
	,onOverlayClick : $.unblockUI // 모달팝업, 배경 클릭시 창 닫기
	});
	getGiftSendDetail(gift_wid,active_flg);
}

// 상품권명 클릭시 상세정보 Ajax
function getGiftSendDetail(key_wid, gift_wid, active_flg){
	//var data = "gift_wid="+rowid;
	var ctx = $("#ctx").val();
	var data = {
			"key_wid": key_wid,
			"gift_wid": gift_wid,
			"active_flg":active_flg
	};
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/giftSendDetailAjax",   
		data: data,
		dataType : "json",
		success: function(data) {
			for(var i=0; i<data.length; i++){
				$('#previewId').html("<img src='data:image/jpeg;base64,"+data[i].img_src+"' id='preview' style='width:100%; height:100%;'>");	//div에 파일엘리멘트 새로 생성
				$('#gift_name').val(data[i].gift_name);
				$("#brand_wid option[value='"+data[i].brand_wid+"'").prop("selected", true);
				$('#gift_amt').val(data[i].gift_amt);
				$('#exp_start_dt').val(data[i].expired_start_dt);
				$('#exp_end_dt').val(data[i].expired_end_dt);
				$('#callback_no').val(data[i].ordr_ctn);

				var tempStr = data[i].description;
				tempStr = tempStr.replace("{cust_msg}",data[i].receive_msg);
				tempStr = tempStr.replace("{code}",data[i].key_wid);
				tempStr = tempStr.replace("{exp_df}",data[i].expired_end_dt);
				$('#description').val(tempStr);
			}
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("상품권 정보를 취득하지 못했습니다.");
			return false;
		}	
	});
}

// 발송상태 클릭 모달창 처리
function doPopupGiftSrchErrorInfo(rslt_cd) {
	$("#gift_send_status_tbl :input").attr("value","");	
	
	giftSrchErrorInfo(rslt_cd);
}

// 발송상태 - 에러코드값 조회 Ajax
function giftSrchErrorInfo(rslt_cd){
	
	var ctx = $("#ctx").val();
	if(rslt_cd == null || rslt_cd == '' ){
		alert("에러코드값이 없습니다.");
		return;
	}
	var name = rslt_cd;
	var type = "TCS_RESULT";
	
	var data = "name="+name+"&type="+type;
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/TCSResultErrorViewAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			// 팝업창 표시
			$.blockUI({ message: $('#gift_send_status'),
		    	css: { 
		    		width: "400"
				  , height: "250"
				  , top: "25%"
				  , left: "30%"
		    	}
			,onOverlayClick : $.unblockUI // 모달팝업, 배경 클릭시 창 닫기
			});
			
			$('#name').val(data.name);
			$('#type_name').val(data.type_name);
			$('#val').val(data.val);
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("상품권 정보를 취득하지 못했습니다.");
			return false;
		}	
	});
}

// 재발송 신청 버튼 클릭시
function retrySendGiftbon(gb_trans_wid){
	var ctx = $("#ctx").val();
	if(!confirm("재발송을 신청하시겠습니까?"))
		return;
	var data = "gb_trans_wid="+gb_trans_wid;
	$.ajax({
		//cache: true,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/retrySendGiftbonAction",
		async : false,
		data: data,
		success: function(data) {
			if(data == "error"){
				alert("재발송 신청중 에러가 발생하였습니다.");
				return;
			}
			alert("재발송 신청이 되었습니다.");
			giftSendInfoPaging(1);
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("재발송 신청중 에러가 발생하였습니다.");
			return false;
		}
	});
}

$(document).ready(function() {
	 //모달창 닫기
	  $("#gift_send_btn_div > #gift_send_exit").click(function(){
		$.unblockUI();
	  });
});

//페이징 함수
function giftSendInfoPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var giftSendInfoListForm = $("#GMPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    giftSendInfoListForm.append(pageNumInput);
	    viewLoadingShow();
	    giftSendInfoListForm.submit();
	});
}

// 페이지 엔터키 기능
function GiftbonManagerPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		var pageNum = parseInt($("#pageInput").val());
		if (keycode == '13') {
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
			}  else {
				giftSendInfoPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

function gift_exp_extension_no(key_wid){
	
	var ctx = $("#ctx").val();
	var param = {
			key_wid : key_wid
	}
	
	$.ajax({
		type: "POST",  
		url: ctx+"/giftNoExpCountCheck",
		data: param,
		dataType : "text",
		success: function(data) {
			
			if(data <= 19){
				alert(data + "회 연장하였습니다.");
				if(confirm("기간연장 하시겠습니까?")){
					$.ajax({
						type: "POST",  
						url: ctx+"/giftNoExpDtExtension",
						data: param,
						dataType : "text",
						success: function(data) {
							
							if(data=="error"){
								alert("기간연장에 실패했습니다.");
							}else{
								alert("기간연장 되었습니다.");
							}
						},
						beforeSend: function(){
					    	viewLoadingShow();			
					    },
					    complete:function(){
					    	viewLoadingHide();
					    },
						error: function(data) { 
							alert("기간연장에 실패했습니다.");
							return false;
						}
					});
					
				};
			}else{
				alert("5년 연장 초과");
				return ;
			}
		},
		beforeSend: function(){
	    	viewLoadingShow();			
	    },
	    complete:function(){
	    	viewLoadingHide();
	    },
		error: function(data) { 
			alert("정보 수정에 실패했습니다.");
			return false;
		}	
	});
	
}

// 검색창 엔터키 기능
function giftbonSendSchEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			giftSendInfoListSch();
		}
		event.stopPropagation();
	});
}
