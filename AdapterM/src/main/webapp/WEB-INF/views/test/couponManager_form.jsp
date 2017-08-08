<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

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
		    ■ 할인쿠폰 > <a style="cursor: pointer;" onclick="couponActiveFormSubmit('/couponManager','');"> 쿠폰관리</a> > <span id="coupon_form_title">쿠폰관리 상세 정보</span>
		</span>
	</div>
	<div style="height:10px;"></div>
	<form name="couponDetailForm" id="couponDetailForm" method="post" action="${ctx}/couponForm" enctype="multipart/form-data">	
	<div class="commonDetail">
	<table id="coupon_form_tbl" class="commonDetailTable">
		<tr>
			<td rowspan="6" style="width: 12%; text-align: center;">
				<div id="previewId" style="border: 1px solid black; height: 252px;">
					<img src='data:image/jpeg;base64,${cupnDetail.img_src}' id="preview" style="width:100%; height:100%;">
				</div>
			</td>
			<th id="impTh" style="text-align:right;">*파일명</th>
			<td>
				<div id="divFile">
					<input name="file" id="file" type="file" onchange="previewCoupon();" value="${cupnDetail.file_name}" style="width: 53.4%;" disabled="disabled">
					<input type="hidden" name="file_name" id="file_name">
				</div>
			</td>
			<th id="impTh" style="text-align:right;">*브랜드</th>
			<td class="imgTd">
			<c:if test="${empty cupnDetailBrandList and not empty coupon_add}">
			<img src="${ctx}/resources/images/add.png" id="addImg" style="width: 15px; height: 15px; cursor: pointer; margin-top: 3%;">
			<img src="${ctx}/resources/images/del.png" id="delImg" style="width: 15px; height: 15px; cursor: pointer; margin-top: 3%;">
			</c:if>
			<c:if test="${cupnDetailBrandList.size()!=0}">
			<c:set value="1" var="num"/>
			<c:forEach items="${cupnDetailBrandList}" var="cupnDetailBrandList">
			<select id="brand_wid${num}" name="brand_wid${num}" style="margin-left: 0;font-size: 10.5px;
					padding: 0.3em 0.3em 0.3em 0.3em;" disabled="disabled">
					<option value="0">선택해 주십시오</option>
					<c:forEach items="${brandList}" var="brand">
						<option value="${brand.brand_wid}"
							<c:if test="${brand.brand_wid == cupnDetailBrandList.brand_wid}">selected="selected"</c:if>
						>${brand.brand_name}</option>
					</c:forEach>
				</select>
			<c:set value="${num+1}" target="num" var="num"/>
			</c:forEach>
			</c:if>
			</td>
		</tr>
		<tr>
			<th id="impTh" style="text-align:right;">*쿠폰명</th>
			<td>
			    <input type="hidden" name="cupn_wid" id="cupn_wid" value="${cupnDetailMap.cupn_wid}">
			    <input type="hidden" id="active_flg" value="${cupnDetailMap.active_flg}">
				<input name="cupn_name" id="cupn_name" type="text" maxlength="50" value="${cupnDetail.cupn_name}" readonly="readonly" style="width: 98%;">
			</td>
			<th id="impTh" style="text-align:right;">*할인구분</th>
			<td>
				<select id="cb_disc_type" name="cb_disc_type" style="font-size: 10.5px;padding: 0.3em 0.3em 0.3em 0.3em;"
						onchange="changeDiscType()" disabled="disabled">
					<option value="0">선택해 주십시오</option>
					<c:forEach var="disc_type" items="${discTypeList}">
						<option value="${disc_type.name}">${disc_type.type_name}</option>
					</c:forEach>
				</select>
			</td>
		</tr>
		<tr>
			<th id="impTh" class="discount_cost" style="text-align:right;">*할인</th>
			<td id="td_disc_type">	
				<input name="disc_type" id="disc_type" type="text" value="${cupnDetail.disc_rate}" readonly="readonly" style="text-align: right; padding-right: 1.5%;">
			</td>
			<th id="impTh" style="text-align:right;">*유효기간</th>
			<td>
				<input name="exp_start_dt" id="exp_start_dt" maxlength="10" type="text"  style="width:30%; text-align: center;" value="${cupnDetail.exp_start_dt}" readonly="readonly">
				~ <input name="exp_end_dt" id="exp_end_dt" maxlength="10" type="text"  style="width:30%; text-align: center;" value="${cupnDetail.exp_end_dt}" readonly="readonly">
				<c:if test="${exp_count<=2}">
				<input type="button" class="func_btn" id="coupon_exp_extension_btn" value="기간연장" onclick="coupon_exp_extension('${cupnDetailMap.cupn_wid}');">
				</c:if>
				<c:if test="${exp_count>2}">
				<input type="button" class="func_btn" id="coupon_exp_extension_btn" value="연장불가" disabled="disabled" onclick="coupon_exp_extension('${cupnDetailMap.cupn_wid}');">
				</c:if>
			</td>
		</tr>
		<tr>
			<th id="impTh" style="text-align:right;">*콜백번호</th>
			<td>	
				<input name="callback_no" id="callback_no" type="text" maxlength="20"  value="${cupnDetail.callback_no}" readonly="readonly">
			</td>
			<th id="impTh" style="text-align:right;">*사용여부:</th>
			<td>
				<b>&nbsp;&nbsp;&nbsp;Y</b>&nbsp;<input type="radio" name="active_flg" id="active_flg_y" value="Y" disabled="disabled" checked="checked">&nbsp;&nbsp;
 				<b>&nbsp;N</b>&nbsp;<input type="radio" name="active_flg" id="active_flg_n" value="N" disabled="disabled" >
			</td>
		</tr>
		<tr>
			<th  style="text-align:right;">대상 구매액</th>
			<td>
				<input type="text" name="from_aply_amt" id="from_aply_amt" value="${cupnDetail.from_aply_amt}" maxlength="10" readonly="readonly" style="width: 30%; text-align: center;">
				~ <input type="text" name="to_aply_amt" id="to_aply_amt" value="${cupnDetail.to_aply_amt}" maxlength="10" readonly="readonly" style="width: 30%; text-align: center;">
			</td>
			<th  style="text-align:right;">정율 최대사용금액</th>
			<td>
				<input type="text" name="max_limit_amt" id="max_limit_amt" value="${cupnDetail.max_limit_amt}" maxlength="10" readonly="readonly" style="width: 30%; text-align: center;">
				</td>
		</tr>
		<tr>
			<th id="impTh" style="text-align:right;">*안내문구</th>
			<td colspan="3"><textarea cols="70" rows="5"  name="description" id="description" maxlength="500" id="description" readonly="readonly" style="resize: none;">${cupnDetail.description}</textarea></td>
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