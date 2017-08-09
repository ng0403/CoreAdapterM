<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath }" />
<c:set var="opptyDetail" value="${ opptyDetail }" />
<c:set var="flg" value="${ flg }" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/opty/oppty_detail.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/opty/opptyItem.js"></script>

<script type="text/javascript">


$(document).ready(function(){
	$('#exp_close_day').datepicker();
});
 
</script>

<input type="hidden" id="ctx" value="${ctx}">

<div id="oppty_detail">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
		    ■ 매출 > <a style="cursor: pointer;" onclick="opptyActiveFormSubmit('/couponManager','');"> 매출기회관리</a> > <span id="coupon_form_title">매출기회관리 상세 정보</span>
		</span>
	</div>
	<div style="height:10px;"></div>

		<form name="opptyDetailForm" id="opptyDetailForm" method="post" action="${ctx}/oppty_single_add">	
			<div class="commonDetail">
			<table id="oppty_form_tbl" class="commonDetailTable">
				<tr>
					<th id="impTh" style="text-align:right;">*기회번호</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">						
							<input name="oppty_no" id="oppty_no" type="text" value="${opptyNoIndex.oppty_no}" style="width: 53.4%;" disabled="disabled">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">						
							<input name="oppty_no" id="oppty_no" type="text" value="${opptyDetail.oppty_no}" style="width: 53.4%;" disabled="disabled">
						</c:if>
					</td>
					<th id="impTh" style="text-align:right;">*기회명</th>
					<td>
						<input name="oppty_name" id="oppty_name" type="text" value="${opptyDetail.oppty_name}" style="width: 53.4%;">
					</td>
				</tr>
				<!-- popup -->
				<tr>
					<th id="impTh" style="text-align: right;">*고객</th>
					<td>
						<input type="hidden" name="cust_no" id="cust_no" value="${opptyDetail.cust_no}"> 
						<input name="cust_name" id="cust_name" type="text" maxlength="50" value="${opptyDetail.cust_name}" style="width: 98%;">
					</td>
					<th id="impTh" style="text-align: right;">*담당자</th>
					<td>
						<input type="hidden" name="emp_no" id="emp_no" value="${opptyDetail.emp_no}"> 
						<input name="emp_name" id="emp_name" type="text" maxlength="50" value="${opptyDetail.emp_name}" style="width: 98%;">
					</td>
				</tr>
				<tr>
				</tr>
				<tr>
					<th id="impTh" style="text-align:right;">*기회상태</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="oppty_status_cd_sel" name="oppty_status_cd_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="status" items="${ opptyStatusCd }">
									<option value="${ status.code }">${ status.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="oppty_status_cd_sel" name="oppty_status_cd_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
									<c:forEach var="status" items="${ opptyStatusCd }">
										<c:if test="${ opptyDetail.oppty_status_cd == status.code }">
											<option selected="selected" value="${ status.code }">${ status.code_name }</option>
										</c:if>
										<c:if test="${ opptyDetail.oppty_status_cd != status.code }">
											<option value="${ status.code }">${ status.code_name }</option>
										</c:if>
									</c:forEach>
							</select>
						</c:if>
						
					</td>
					<th id="impTh" style="text-align:right;">*기회단계:</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="oppty_stage_cd_sel" name="oppty_stage_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="stage" items="${ opptyStageCd }">
									<option value="${ stage.code }">${ stage.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="oppty_stage_cd_sel" name="oppty_stage_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="stage" items="${ opptyStageCd }">
									<c:if test="${ opptyDetail.oppty_stage_cd == stage.code }">
										<option selected="selected" value="${ stage.code }">${ stage.code_name }</option>
									</c:if>
									<c:if test="${ opptyDetail.oppty_stage_cd != stage.code }">
										<option value="${ stage.code }">${ stage.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</td>
				</tr>
				<tr>
					<th  style="text-align:right;">점수</th>
					<td>
						<input type="text" name="score" id="score" value="${opptyDetail.score}" maxlength="10" style="width: 30%; text-align: center;">
					</td>
					<th  style="text-align:right;">예상종료일자</th>
					<td>
						<input type="text" name="exp_close_day" id="exp_close_day" value="${opptyDetail.exp_close_day}" maxlength="10" style="width: 30%; text-align: center;">
					</td>
				</tr>
				<tr>
					<th id="impTh" style="text-align:right;">*분류</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="dtype_cd_sel" name="dtype_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="dtype" items="${ dtypeCd }">
									<option value="${ dtype.code }">${ dtype.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="dtype_cd_sel" name="dtype_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="dtype" items="${ dtypeCd }">
									<c:if test="${ opptyDetail.dtype_cd == dtype.code }">
										<option selected="selected" value="${ dtype.code }">${ dtype.code_name }</option>
									</c:if>
									<c:if test="${ opptyDetail.dtype_cd != dtype.code }">
										<option value="${ dtype.code }">${ dtype.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</td>
					<th id="impTh" style="text-align:right;">*구매형태</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="purchase_type_sel" name="purchase_type_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="purchase_type" items="${ purchaseType }">
									<option value="${ purchase_type.code }">${ purchase_type.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="purchase_type_sel" name="purchase_type_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="purchase_type" items="${ purchaseType }">
									<c:if test="${ opptyDetail.purchase_type == purchase_type.code }">
										<option selected="selected" value="${ purchase_type.code }">${ purchase_type.code_name }</option>
									</c:if>
									<c:if test="${ opptyDetail.purchase_type != purchase_type.code }">
										<option value="${ purchase_type.code }">${ purchase_type.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</td>
				</tr>
				<tr>
					<th id="impTh" style="text-align:right;">*결재처</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="payment_cd_sel" name="payment_cd_sel" 
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="payment_cd" items="${ paymentCd }">
									<option value="${ payment_cd.code }">${ payment_cd.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="payment_cd_sel" name="payment_cd_sel" 
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="payment_cd" items="${ paymentCd }">
									<c:if test="${ opptyDetail.payment_cd == payment_cd.code }">
										<option selected="selected" value="${ payment_cd.code }">${ payment_cd.code_name }</option>
									</c:if>
									<c:if test="${ opptyDetail.payment_cd != payment_cd.code }">
										<option value="${ payment_cd.code }">${ payment_cd.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</td>
					<th id="impTh" style="text-align:right;">*소개자</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">
							<select id="rec_per_cd_sel" name="rec_per_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="recper_cd" items="${ recperCd }">
									<option value="${ recper_cd.code }">${ recper_cd.code_name }</option>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">
							<select id="rec_per_cd_sel" name="rec_per_cd_sel" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="recper_cd" items="${ recperCd }">
									<c:if test="${ opptyDetail.rec_per_cd == recper_cd.code }">
										<option selected="selected" value="${ recper_cd.code }">${ recper_cd.code_name }</option>
									</c:if>
									<c:if test="${ opptyDetail.rec_per_cd != recper_cd.code }">
										<option value="${ recper_cd.code }">${ recper_cd.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</td>
				</tr>
				<tr>
					<th id="impTh" style="text-align:right;">시/수술계획</th>
					<td colspan="3">
						<textarea cols="70" rows="5"  name="sur_plan_cn" id="sur_plan_cn" maxlength="500" style="resize: none;">${opptyDetail.sur_plan_cn}</textarea>
					</td>
				</tr>
				<tr>
					<th id="impTh" style="text-align:right;">특이사항</th>
					<td colspan="3">
						<textarea cols="70" rows="5"  name="description" id="description" maxlength="500" id="description" style="resize: none;">${opptyDetail.remark_cn}</textarea>
					</td>
				</tr>
			</table>
			
		<div class="listFootDiv" style="float: none;">
			<div id="coupon_detail_btn_div">
				<c:if test="${ opptyDetail.oppty_no == null }">
					<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="조회">
 		 			<input type="button" class="tr_btn" id="oppty_single_add" onclick="opptySingleAdd();" value="저장">
				</c:if>
				<c:if test="${ opptyDetail.oppty_no != null }">
					<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="조회">
 		 			<input type="button" class="tr_btn" id="oppty_detail_mdfy" onclick="opptyEdit();" value="편집">
 		 			<input type="button" class="tr_btn" id="oppty_detail_del" onclick="opptyDel();" value="삭제">
				</c:if>
 			</div>
		 	<div id="coupon_mdfy_btn_div">
				<input type="button" class="tr_btn" id="oppty_mdfysave" value="저장" >
				<input type="button" class="func_btn" id="oppty_mcancel" value="취소">
		 	</div>
  		</div>
			
		<div style="height:25px;"></div>
		
		<div class="titleDIV">
			<span class="titleText">
		    	■ <span id="coupon_form_title">매출 상품</span>
			</span>
		</div>	
		<div id="coupon_mdfy_btn_div" style="float: right;">
			<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="조회">				
			<input type="button" class="func_btn" id="opptyItem_add" onclick="opptyItemAdd();" value="추가">
			<input type="button" class="tr_btn" id="opptyItem_save" onclick="opptyItemInsert();" value="저장" >
			<input type="button" class="tr_btn" id="opptyItem_save" onclick="opptyItemDelte();" value="삭제" >
		</div>		
		<div style="height:10px;"></div>
	
		<table class="commonTable" id="cupnManagerTabl">
			<thead>
	 	 		<tr>
	 	 			<th >대분류</th>
	 	 			<th >중분류</th>
	 	 			<th >소분류</th>
	 	 			<th >수량</th>
	 	 			<th >단가</th>
	 	 			<th >총금액</th>
	 	 			<th >할인금액</th>
	 	 			<th >제안금액</th>
	 	 			<th >결제일자</th>
	 	 		</tr>
	 	 	</thead>
	 	 	<tbody id="oppty_item_list_tbody">
	 	 		<c:forEach items="${ itemList }" var="itemList">
	 	 			<tr>
		 	 			<td style="text-align: left;" >${ itemList.main_cate_name }</td>
	 		 			<td style="text-align: left;" >${ itemList.mid_cate_name }</td>
	 		 			<td style="text-align: left;" >${ itemList.small_cate_name }</td>
	 		 			<td style="text-align: left;" >${ itemList.qty }</td>
	 		 			<td style="text-align: left;" >${ itemList.list_price }</td>
	 		 			<td style="text-align: left;" ><!-- 총금액 --></td>
	 		 			<td style="text-align: left;" >${ itemList.dc_price }</td>
	 		 			<td style="text-align: left;" ><!-- 제안금액 --></td>
	 		 			<td style="text-align: left;" >${ itemList.payment_day }</td>
	 	 			</tr>
	 	 		</c:forEach>
	 	 	</tbody>
		</table>
			
		</div>
	</form>
	
  	
</div>	