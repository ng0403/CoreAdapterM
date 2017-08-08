<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="http://malsup.github.com/jquery.form.js"></script>

<input type="hidden" id="ctx" value="${ctx}">

<div id="oppty_detail">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
		    ■ 매출 > <a style="cursor: pointer;" onclick="opptyActiveFormSubmit('/couponManager','');"> 매출기회관리</a> > <span id="coupon_form_title">매출기회관리 상세 정보</span>
		</span>
	</div>
	<div style="height:10px;"></div>
	<form name="opptyDetailForm" id="opptyDetailForm" method="post" action="${ctx}/opptyForm" enctype="multipart/form-data">	
	<div class="commonDetail">
	<table id="oppty_form_tbl" class="commonDetailTable">
		<tr>
			<th id="impTh" style="text-align:right;">*기회번호</th>
			<td>
				<div id="divFile">
					<input name="file" id="file" type="file" onchange="previewCoupon();" value="${cupnDetail.file_name}" style="width: 53.4%;" disabled="disabled">
					<input type="hidden" name="file_name" id="file_name">
				</div>
			</td>
			<th>기회명</th>
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