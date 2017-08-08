<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="/resources/common/js/lead/lead.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript">
//쿠폰이미지 미리보기
function previewCoupon() {
	// 비동기로 form 데이타 전송
	if( !file_Check($("#file").val()) ){
		return;
	}
	var options = {
	 	type:"POST",
	 	cache: false,
		url:"previewCoupon",
        success: function(data, status, xhr) {
           if(status == 'success'){
	       	// 이미지를 동일한파일에 임시 저장하므로 캐쉬때문에 이미지 갱신되지 않는 현상으로 인해 난수(현재시간)와 같이 지정
	       	$('#previewId').html("<img src='data:image/jpeg;base64,"+data+"' id='preview' height='100%;'>");
           }
        },
	beforeSend: function(){
    	viewLoadingShow();			
    },
    complete:function(){
    	viewLoadingHide();	
    }
    };
	$("#couponDetailForm").ajaxSubmit(options);
}

//이미지파일체크
function file_Check(file){
	banArray = new Array(".jpg", ".bmp", ".gif", ".png", ".pcx");    // 걸러낼 확장자를 등록
	banFile = false;
	while (file.indexOf("\\") != -1){
		file = file.slice(file.indexOf("\\") + 1);
		ban = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();    
		for (var i = 0; i < banArray.length; i++) {
			if (banArray[i] == ban) {
				banFile = true;
			}
		}
		if (banFile == false) {
			alert(ban + " 파일은 첨부할 수 없는 파일입니다.");
			cupn_clearFileInputField();
			break;
		}
	}
	return banFile;
}
 
 $(document).ready(function() {

/* 	 if('${cupnDetail.count}' > 0){
		 $("#coupon_detail_mdfy").prop("disabled",true);
	 } */
	 
	 if('${cupnDetailMap.cupnMgResult}' == 1){
			alert("등록 되었습니다.");
 			goCouponForm('${cupnDetailMap.cupn_wid}','${cupnDetail.active_flg}');
	 }else if('${cupnDetailMap.cupnMgResult}' == 2){
		 	alert("수정 되었습니다.");
			goCouponForm('${cupnDetailMap.cupn_wid}','${cupnDetail.active_flg}');
	 }
	 
	// 사용여부 선택
	if('${cupnDetail.active_flg}' == 'Y'){
		$("#active_flg_y").prop("checked", true);
		$("#active_flg_n").prop("checked", false);
	} else if('${cupnDetail.active_flg}' == 'N'){
		$("#active_flg_y").prop("checked", false);
		$("#active_flg_n").prop("checked", true);
	}
	
	// 전문항목타입 선택
	$("#cb_disc_type > option[value='${cupnDetail.disc_type}']").prop("selected", true);
	
	// 상세정보와 추가 페이지 구분
	if('${coupon_add}' == 1){
		couponAddFormFunc();
	}
	
	if( $("#cb_disc_type option:selected").val() == "1"){
		$('.discount_cost').text("*할인율");
		$('#td_disc_type').html("<input name='disc_rate' id='disc_rate' type='text' maxlength='2' max='99' value='${cupnDetail.disc_rate}' readonly='readonly' style='text-align: right;'>%")
	}else if($("#cb_disc_type option:selected").val() == "2"){
		$('.discount_cost').text("*할인금액");
		$('#td_disc_type').html("<input name='disc_amt' id='disc_amt' type='text' maxlength='6' max='999999' value='${cupnDetail.disc_amt}' readonly='readonly' style='text-align: right;'>원")
	}else{
		return;
	}
	
});
 
 function changeDiscType(){
	if( $("#cb_disc_type option:selected").val() == "1"){
		$('.discount_cost').text("*할인율");
		$('#td_disc_type').html("<input name='disc_rate' id='disc_rate' type='text' maxlength='2' max='99'>%")
	}else if($("#cb_disc_type option:selected").val() == "2"){
		$('.discount_cost').text("*할인금액");
		$('#td_disc_type').html("<input name='disc_amt' id='disc_amt' type='text' maxlength='6' max='999999'>원")
	}else{
		return;
	}
}
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="cupn_add_chk" value="${coupon_add}">
<!-- 쿠폰관리 -->
<div id="coupon_detail">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 상세 정보</span>
		</span>
	</div>
	<div style="height:10px;"></div>
	<form name="couponDetailForm" id="couponDetailForm" method="post" action="${ctx}/couponForm" enctype="multipart/form-data">	
	<div class="commonDetail">
	<table id="coupon_form_tbl" class="commonDetailTable">
		<tr>
 			<th id="impTh" style="text-align:right;">리드번호</th>
			<td>
			<input type="text" id="lead_no" value="${detail.lead_no}">
 			</td>
			<th id="impTh" style="text-align:right;">*리드명</th>
			<td>
 			 <input type="text" id="lead_name" value="${detail.lead_name}">
  			</td>
		</tr>
		
		<tr>
			<th id="impTh" style="text-align:right;">고객</th>
			<td>
			<input type="text" id="cust_name" value="${detail.cust_no}">
 			</td>
			<th style="text-align:right;">담당자</th>
			<td> 
	       <input type="text" id="emp_name" value="${detail.emp_no}"> 
 			</td>
		</tr>
		<tr>
			<th id="impTh" class="discount_cost" style="text-align:right;">접촉할일자
			</th>
			<td id="td_disc_type">	
				<input name="disc_type" id="disc_type" type="text" value=" " readonly="readonly" style="text-align: right; padding-right: 1.5%;">
			</td>
			<th style="text-align:right;">순위</th>
			<td>
		  <input type="text" id="rank_cd" value="${detail.rank_cd}">
 			</td>
		</tr>
		<tr>
			<th style="text-align:right;">포기사유</th>
			<td colspan="3">	
			<input type="text" id="reason_cd" value="${detail.reason_cd}">
 			</td>
 		</tr>
		<tr>
			<th  style="text-align:right;">특이 사항</th>
			<td colspan="3">
			<input type="text" id="remark_cn" value="${detail.remark_cn}">
 			</td>
 		</tr>
 	</table>
	<div class="listFootDiv" style="float: none;">
	 	 <div id="coupon_detail_btn_div">
	 	 	<input type="button" class="func_btn" id="coupon_detail_add" value="추가">
	 	 	<input type="button" class="func_btn" id="coupon_detail_mdfy" value="편집">
	 	 </div>
		 <div id="coupon_insert_btn_div">
			<input type="button" class="tr_btn" id="coupon_addsave" value="저장">
			<input type="button" class="func_btn" id="coupon_acancel" value="취소">
		 </div>
		 <div id="coupon_mdfy_btn_div">
			<input type="button" class="tr_btn" id="coupon_mdfysave" value="저장" onclick="modCoupon();">
			<input type="button" class="func_btn" id="coupon_mcancel" value="취소">
		 </div>
   </div>
	</div>
  </form>
</div>	