/**
업 무 명 : RFM 분류별 고객 리스트
작 성 자 : 송성호
작 성 일 : 2015/10/26
수 정 자 : 
수 정 일 : 2015/10/26
내 용 : RFM 분류별 고객 리스트
*참고사항 : 
 */

function rfmCateCust_Search(){
	var a = $("#rfm_work_dt").val();
	var b = $("#upCode").val();	
	var c = $("#brand_wid").val();
	var d = $("#store_name").val();
	var e = $("#store_wid").val();
	var f = $("#moreStore").val();
	var g = $("#moreBrand").val();
	var h = $("#fqtRead").val();
	alert(a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f+"/"+g+"/"+h);
}

// 분류별 고객 상세 리스트
function rfmCCDetail(rfm_mjrcls_cd,rfm_ctgr_score, cust_grd_step){
	// 컨트롤러로 전송
	var ctx = $("#ctx").val();
	var $form = $("#rfmCtgrCustForm");
    $form.attr('action', ctx + "/rfmCategoryCustomerForm");
    
    var rfm_ctgr_scoreInput = $('<input type="hidden" value="'+rfm_ctgr_score+'" name="rfm_ctgr_score">');
    var rfm_mjrcls_cd = $('<input type="hidden" value="'+rfm_mjrcls_cd+'" name="rfm_mjrcls_cd">');
    var cust_grd_stepInput = $('<input type="hidden" value="'+cust_grd_step+'" name="cust_grd_step">');
    
    $form.append(rfm_ctgr_scoreInput).append(cust_grd_stepInput).append(rfm_mjrcls_cd);
    viewLoadingShow();
    $form.submit();	
}

function chkAndSubmitCategoryList(){
	
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
	
	$('#rfmCtgrCustForm').submit();
	
}

//페이징 함수
function rfmCateCustPaging(pageNum) {
	var $form = $("#rfmCtgrCustPagingForm");
     var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
     $form.append(pageNumInput);
     viewLoadingShow();
     $form.submit();
}
//페이징 엔터키 이동
function rfmCCPageNumInputEnter(event){
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
					rfmCateCustPaging(pageNum);
				}
			}
			event.stopPropagation();
		});
}