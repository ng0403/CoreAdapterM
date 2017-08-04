/**
업 무 명 : RFM 고객 등급 리스트
작 성 자 : 정은지
작 성 일 : 2015/10/26
수 정 자 : 정은지
수 정 일 : 2015/10/26
내 용 : RFM 고객 등급 리스트
*참고사항 : 
 */

//RFM 고객 등급 상세정보로 이동
function rfmCustGradeForm(rfm_sctn_cd, rfm_sctn_cd_val) {
	var ctx = $("#ctx").val();
	$('#rfm_mjrcls_cd').attr("disabled", false);
	var $form = $("#rfmCustListForm");
	$form.attr("action", ctx + "/rfmCustomerGradeForm");
	$form.append("<input type='hidden' name='rfm_sctn_cd' value='"+rfm_sctn_cd+"'>");
	$form.append("<input type='hidden' name='rfm_sctn_cd_val' value='"+rfm_sctn_cd_val+"'>");
	viewLoadingShow();
	$form.submit();
}

//RFM 고객 등급 관리 리스트 검색 엔터키
function rfmCustGradeListEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			rfmCustGradeList_search();
		}
	});
}

//RFM 기준 레이어 팝업창 처리
function doPopupRfmStd(rfmStdPageNum) {
	
	$("#rfm_work_dt_custGrd").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $("#rmfStdModal"),
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
	getRfmStdList(rfmStdPageNum);
	
}


function chkAndSubmitGradeList(){
	
	if($('#rfm_std_key').val() == ""){
		alert("RFM기준을 선택해주세요.");
		return ;
	}
	
	if($('#rfm_mjrcls_cd').val() == ""){
		alert("상위분류를 선택해주세요.");
		return ;
	}
	
	switch($('#rfm_mjrcls_cd').val()){
		
	case "0001":
		if($('#brand_wid').val() == ""){
			alert("하위분류를 선택해주세요.");
			return ;
		}
		break;
	case "0002":
		if($('#store_wid').val() == ""){
			alert("하위분류를 선택해주세요.");
			return ;
		}
		break;
	case "0003":
		if($('#moreStore').val() == ""){
			alert("하위분류를 선택해주세요.");
			return ;
		}
		break;
	case "0004":
		if($('#moreBrand').val() == ""){
			alert("하위분류를 선택해주세요.");
			return ;
		}
		break;
	case "0005":
		if($('#fqtRead').val() == ""){
			alert("하위분류를 선택해주세요.");
			return ;
		}
		break;
	default:
		break;
	}
	
	$('#rfm_mjrcls_cd').attr("disabled", false);
	viewLoadingShow();
	$('#rfmCustListForm').submit();
	
}

//RFM 기준 조회 표시
function getRfmStdList(rfmStdPageNum){
	var ctx = $("#ctx").val();
														//ticket_wid있을때
	var data = "rfm_work_dt_custGrd="+$("#rfm_work_dt_custGrd").val()
				+"&rfmStdPageNum="+rfmStdPageNum;

	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getRfmStdListAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			
			$("#rmfStdMoDetail").empty();
			
			if(data.getRfmStdList.length == 0){
				var trElement = $("#rmfStdModalTblHeader").clone().removeClass().empty();
				$("#rmfStdMoDetail").append(trElement);
				$("#rmfStdMoDetail tr:last").append("<td style='background-color: white; cursor: default;' colspan='5' align='center' height='194'>검색 결과가 없습니다</td>");
			}
			
			// 테이블 내용 추가
			$.each(data.getRfmStdList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#rmfStdModalTblHeader").clone().removeClass().empty();
				var rfm_work_dt = this.rfm_work_dt;
				var std_dt = this.std_dt;
				var rfm_mjrcls_cd = this.rfm_mjrcls_cd;
				var rfm_mjrcls_cd_val = this.rfm_mjrcls_cd_val;
				var std_term = this.std_term;
				var cust_grd_step = this.cust_grd_step;
				var rfm_std_key = this.rfm_std_key;
				trElement.bind("click", function(e) { // 기능 입히기
					$("#rfm_std_txt").val("기준일자 : " + std_dt+ ", 분류 : " + rfm_mjrcls_cd_val + ", 기간 : "+std_term+", 단계 : "+cust_grd_step);
					$("#rfm_std_dt").val(std_dt);	
					$("#rfm_std_key").val(rfm_std_key);	
					$("#cust_grd_step").val(cust_grd_step);
					$('#rfm_mjrcls_cd').val(rfm_mjrcls_cd);
					
				switch(rfm_mjrcls_cd) {
				case "0001":
					brandRead();
					break;
				case "0002":
					stroeRead();
					break;
				case "0003":
					moreStoreRead();
					break;
				case "0004":
					moreBrandRead();
					break;
				case "0005":
					fqtRead();
					break;
				default:
					basicSelect();
					break;
				}
					
					$.unblockUI();
				});
				// TR 작성
				$("#rmfStdMoDetail").append(trElement);
				$("#rmfStdMoDetail tr:last")
				$("#rmfStdMoDetail tr:last").append("<td style='width:25%;'>" + std_dt + "</td>");
				$("#rmfStdMoDetail tr:last").append("<td style='width:25%;'><input type='hidden' value=" + rfm_mjrcls_cd + " id='rfm_mjrcls_cd_hidden'>" + rfm_mjrcls_cd_val + "</td>");
				$("#rmfStdMoDetail tr:last").append("<td style='width:25%;'>" + std_term + "개월</td>");
				$("#rmfStdMoDetail tr:last").append("<td style='width:25%;'>"+cust_grd_step+"단계</td>");
				
			});
			
			var pageContent = "";
			
			// 페이징 다시그리기
			$("#rmfStdMoPagingDiv").empty();
			
			if(data.rfmPage.startPageNum == 1 && data.rfmPage.endPageNum == 1){
				pageContent = "<input type='hidden' id='rfmStdPageNum' value='"+data.rfmStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.rfmPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='rfmStdMoPageInput' readonly='readonly' value='"+data.rfmPage.startPageNum+"' onkeypress=\"rfmStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a> / "+data.rfmPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
			} else if(data.rfmStdPageNum == data.rfmPage.startPageNum){
				pageContent = "<input type='hidden' id='rfmStdPageNum' value='"+data.rfmStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.rfmPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='rfmStdMoPageInput' value='"+data.rfmPage.startPageNum+"' onkeypress=\"rfmStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+data.rfmPage.endPageNum+") id='pNum'> / "+data.rfmPage.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+(data.rfmStdPageNum+1)+") id='pNum'> ▶ </a>";
			} else if(data.rfmStdPageNum == data.rfmPage.endPageNum){
				pageContent = "<input type='hidden' id='rfmStdPageNum' value='"+data.rfmStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.rfmPage.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+(data.rfmStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='rfmStdMoPageInput' value='"+data.rfmPage.endPageNum+"' onkeypress=\"rfmStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a> / "+data.rfmPage.endPageNum+"</a>"
				+"<a style='text-decoration: none; color: black;'> ▶ </a>";
			} else {
				pageContent = "<input type='hidden' id='rfmStdPageNum' value='"+data.rfmStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+(data.rfmStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='rfmStdMoPageInput' value='"+data.rfmStdPageNum+"' onkeypress=\"rfmStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+data.page.endPageNum+") id='pNum'> / "+data.page.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getRfmStdList("+(data.rfmStdPageNum+1)+") id='pNum'> ▶ </a>";
			}
			$("#rmfStdMoPagingDiv").append(pageContent);
			
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
	//$("#ticket_wid").attr("value",ticket_wid);
}