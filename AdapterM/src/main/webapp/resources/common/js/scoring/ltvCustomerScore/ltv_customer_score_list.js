/**
업 무 명 : ltv 고객 점수 리스트
작 성 자 : 유대열
작 성 일 : 2016/03/21
수 정 자 : 유대열
수 정 일 : 2016/03/21
내 용 : ltv 고객 점수 리스트
*참고사항 : 
 */



function doPopupLtvStd(rfmStdPageNum) {
	
	$("#ltv_work_dt").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $("#ltvStdModal"),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '770px',
    	'height': '390px',
    	'cursor': 'default'
    	}
	 	,onOverlayClick : $.unblockUI
	});

	//RFM 기준 조회 표시
	getLtvStdList(rfmStdPageNum);
	
}


//RFM 고객 등급 관리 리스트 검색 엔터키
function ltvCustomerScoreListEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			chkAndSubmitLtvCustomerList();
		}
	});
}

function ltvCSPagePaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#ltvCustListPagingForm');
	    
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    
	    $form.append(pageNum_input);
	    viewLoadingShow();
	    $form.submit();
	});
}



function ltvCSpageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if (pageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#rfmCGPageNum").val());
				$("#pageInput").focus();
			} else {
				ltvCSPagePaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}


function chkAndSubmitLtvCustomerList(){
	
	if($('#ltv_std_key').val() == ""){
		alert("LTV기준을 선택해주세요.");
		return ;
	}
	
//	$('#rfm_mjrcls_cd').attr("disabled", false);
	viewLoadingShow();
	$('#ltvCustListForm').submit();
	
}

function getLtvStdList(rfmStdPageNum){
	var ctx = $("#ctx").val();
														//ticket_wid있을때
	var data = "ltv_work_dt="+$("#ltv_work_dt").val();

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getLtvStdListAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			
			$("#ltvStdMoDetail").empty();
			
			if(data.getLtvStdList.length == 0){
				var trElement = $("#ltvStdModalTblHeader").clone().removeClass().empty();
				$("#ltvStdMoDetail").append(trElement);
				$("#ltvStdMoDetail tr:last").append("<td style='background-color: white; cursor: default;' colspan='5' align='center' height='194'>검색 결과가 없습니다</td>");
			}
			
			// 테이블 내용 추가
			$.each(data.getLtvStdList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#ltvStdModalTblHeader").clone().removeClass().empty();
				var ltv_work_dt = this.ltv_work_dt;
				var std_ym = this.std_ym;
				var ltv_mjrcls_cd = this.ltv_mjrcls_cd;
				var rfm_mjrcls_cd_val = this.rfm_mjrcls_cd_val;
				var std_term = this.std_term;
				var cust_grd_step = this.cust_grd_step;
				var ltv_std_key = this.ltv_std_key;
				trElement.bind("click", function(e) { // 기능 입히기
					$("#ltv_std_txt").val("기준년월 : " + std_ym+ ", 분류 : " + ltv_mjrcls_cd + ", 기간 : "+std_term);
					$("#ltv_std_key").val(ltv_std_key);	
					$("#std_ym").val(std_ym);	
					$("#ltv_work_dt").val(ltv_work_dt);	
					$('#ltv_mjrcls_cd').val(ltv_mjrcls_cd);
					$.unblockUI();
				});
				// TR 작성
				$("#ltvStdMoDetail").append(trElement);
				$("#ltvStdMoDetail tr:last")
				$("#ltvStdMoDetail tr:last").append("<td style='width:33%;'>" + std_ym + "</td>");
				$("#ltvStdMoDetail tr:last").append("<td style='width:34%;'><input type='hidden' value=" + ltv_mjrcls_cd + " id='rfm_mjrcls_cd_hidden'>" + ltv_mjrcls_cd + "</td>");
				$("#ltvStdMoDetail tr:last").append("<td style='width:33%;'>" + std_term + "개월</td>");
				
			});
			
			var pageContent = "";
			
			// 페이징 다시그리기
			$("#ltvStdMoPagingDiv").empty();
			
			if(data.ltvStdPage.startPageNum == 1 && data.ltvStdPage.endPageNum == 1){
				pageContent = "<input type='hidden' id='ltvStdPageNum' value='"+data.ltvStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.ltvStdPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='rfmStdMoPageInput' readonly='readonly' value='"+data.ltvStdPage.startPageNum+"' onkeypress=\"ltvStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a> / "+data.ltvStdPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
			} else if(data.ltvStdPageNum == data.ltvStdPage.startPageNum){
				pageContent = "<input type='hidden' id='rfmStdPageNum' value='"+data.ltvStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.ltvStdPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='ltvStdMoPageInput' value='"+data.rfmPage.startPageNum+"' onkeypress=\"ltvStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+data.ltvStdPage.endPageNum+") id='pNum'> / "+data.rfmPage.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+(data.ltvStdPageNum+1)+") id='pNum'> ▶ </a>";
			} else if(data.ltvStdPageNum == data.ltvStdPage.endPageNum){
				pageContent = "<input type='hidden' id='ltvStdPageNum' value='"+data.ltvStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.ltvStdPage.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getLtvStdList("+(data.ltvStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='rfmStdMoPageInput' value='"+data.ltvStdPage.endPageNum+"' onkeypress=\"ltvStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a> / "+data.ltvStdPage.endPageNum+"</a>"
				+"<a style='text-decoration: none; color: black;'> ▶ </a>";
			} else {
				pageContent = "<input type='hidden' id='ltvStdPageNum' value='"+data.rfmStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.ltvStdPage.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getLtvStdList("+(data.ltvStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='ltvStdMoPageInput' value='"+data.ltvStdPageNum+"' onkeypress=\"ltvStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a style='cursor:pointer;' onclick=getLtvStdList("+data.ltvStdPage.endPageNum+") id='pNum'> / "+data.ltvStdPage.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getLtvStdList("+(data.ltvStdPageNum+1)+") id='pNum'> ▶ </a>";
			}
			$("#ltvStdMoPagingDiv").append(pageContent);
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();
        },
		error: function(data) { 
			alert("RFM 기준리스트를 취득하지 못했습니다.");
			return false;
		}
	});
}