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
// 	.keyup(function(e) {
//         if(e.keyCode == 8 || e.keyCode == 46) {
//         	$.datepicker._clearDate(this);
//         }
//     });
});

 
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="tmp" value="">

<div id="oppty_detail">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
		    ■ 매출 > <a style="cursor: pointer;" onclick="opptyList();"> 매출기회관리</a> > <span id="coupon_form_title">매출기회관리 상세 정보</span>
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
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<input name="oppty_name" id="oppty_name" type="text" value="${opptyDetail.oppty_name}" style="width: 53.4%;">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<input name="oppty_name" id="oppty_name" type="text" value="${opptyDetail.oppty_name}" style="width: 53.4%;" readonly="readonly">
						</c:if>
					</td>
				</tr>
				<!-- popup -->
				<tr>
					<th id="impTh" style="text-align: right;">*고객</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<input type="hidden" name="cust_no" id="cust_no" value="${opptyDetail.cust_no}"> 
							<input type="text" name="cust_name" id="cust_name" maxlength="50" value="${opptyDetail.cust_name}" style="width: 70%;" readonly="readonly">
							<input type="button" class="back_btn" id="custSchBtn" value="고객" onclick="custSchPopupOpen();">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<input type="hidden" name="cust_no" id="cust_no" value="${opptyDetail.cust_no}"> 
							<input type="text" name="cust_name" id="cust_name" maxlength="50" value="${opptyDetail.cust_name}" style="width: 70%;" readonly="readonly">
							<input type="button" class="back_btn" id="custSchBtn" value="고객" onclick="custSchPopupOpen();" disabled="disabled">
						</c:if>
					</td>
					<th id="impTh" style="text-align: right;">*담당자</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<input type="hidden" name="emp_no" id="emp_no" value="${opptyDetail.emp_no}"> 
							<input name="emp_name" id="emp_name" type="text" maxlength="50" value="${opptyDetail.emp_name}" style="width: 70%;" readonly="readonly">
							<input type="button" class="back_btn" id="empSchBtn" value="담담자" onclick="empSchPopupOpen();">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<input type="hidden" name="emp_no" id="emp_no" value="${opptyDetail.emp_no}"> 
							<input name="emp_name" id="emp_name" type="text" maxlength="50" value="${opptyDetail.emp_name}" style="width: 70%;" readonly="readonly">
							<input type="button" class="back_btn" id="empSchBtn" value="담담자" onclick="empSchPopupOpen();" disabled="disabled">
						</c:if>
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
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<input type="text" name="score" id="score" value="${opptyDetail.score}" maxlength="10" style="width: 30%; text-align: center;">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<input type="text" name="score" id="score" value="${opptyDetail.score}" maxlength="10" style="width: 30%; text-align: center;" readonly="readonly">
						</c:if>
					</td>
					<th  style="text-align:right;">예상종료일자</th>
					<td>
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<input type="text" name="exp_close_day" id="exp_close_day" value="${opptyDetail.exp_close_day}" maxlength="10" style="width: 30%; text-align: center;">
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<input type="text" name="exp_close_day" id="exp_close_day" value="${opptyDetail.exp_close_day}" maxlength="10" style="width: 30%; text-align: center;" readonly="readonly">
						</c:if>
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
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;" disabled="disabled">
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
					<th style="text-align:right;">시/수술계획</th>
					<td colspan="3">
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<textarea cols="70" rows="5"  name="sur_plan_cn" id="sur_plan_cn" maxlength="500" style="resize: none;">${opptyDetail.sur_plan_cn}</textarea>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<textarea cols="70" rows="5"  name="sur_plan_cn" id="sur_plan_cn" maxlength="500" style="resize: none;" readonly="readonly">${opptyDetail.sur_plan_cn}</textarea>
						</c:if>
					</td>
				</tr>
				<tr>
					<th style="text-align:right;">특이사항</th>
					<td colspan="3">
						<c:if test="${ opptyNoIndex.oppty_no != null }">	<!-- 신규 -->
							<textarea cols="70" rows="5"  name="description" id="description" maxlength="500" id="description" style="resize: none;">${opptyDetail.remark_cn}</textarea>
						</c:if>
						<c:if test="${ opptyNoIndex.oppty_no == null }">	<!-- 상세 -->
							<textarea cols="70" rows="5"  name="description" id="description" maxlength="500" id="description" style="resize: none;" readonly="readonly">${opptyDetail.remark_cn}</textarea>
						</c:if>
					</td>
				</tr>
			</table>
			
		<div class="listFootDiv" style="float: none;">
			<div id="coupon_detail_btn_div">
				<c:if test="${ opptyDetail.oppty_no == null }">
 		 			<input type="button" class="tr_btn" id="oppty_single_add" onclick="opptySingleAdd();" value="저장">
					<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="취소">
				</c:if>
				<c:if test="${ opptyDetail.oppty_no != null }">
 		 			<input type="button" class="func_btn" id="oppty_detail_mdfy" onclick="opptyMody();" value="편집">
 		 			<input type="button" class="tr_btn" id="oppty_detail_del" onclick="opptyDel();" value="삭제">
					<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="취소">
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
		    	  <span style="font-size: 8px;">(삭제할 상품을 체크한 후 삭제버튼을 누르고 저장을 눌러주세요.)</span>
			</span>
		</div>	
		<div id="coupon_mdfy_btn_div" style="float: right;">
<!-- 			<input type="button" class="func_btn" id="oppty_list" onclick="opptyList();" value="조회">				 -->
			<input type="button" class="func_btn" id="opptyItem_add" onclick="opptyItemAdd();" value="추가">
			<input type="button" class="tr_btn" id="opptyItem_save" onclick="opptyItemInsert();" value="저장" >
			<input type="button" class="tr_btn" id="opptyItem_save" onclick="opptyItemDelte();" value="삭제" >
		</div>		
		<div style="height:10px;"></div>
		
		<table class="commonTable" id="opptyItemTable">
			<thead>
	 	 		<tr>
	 	 			<th rowspan="2" style="width: 2%; text-align: center;">
	 	 				<input id="optyItemChk" type="checkbox" onclick="actAllChk(this);" />
	 	 			</th>
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
	 	 			<tr class="oppty_item_list_tr">
	 	 				<td>
	 	 					<input type="checkbox" class="del_chk" name="del_chk">
	 	 				</td>
<!-- 	 	 				<td> -->
<%-- 	 	 					<input type="checkbox" class="del_chk" name="del_chk" onclick="actChkCancel();> --%>
<!-- 	 	 				</td> -->
		 	 			<td style="text-align: left;" >
		 	 				<input type="hidden" class="main_cate_cd" name="main_cate_cd" value="${ itemList.main_cate_cd }">
		 	 				<input type="text"  class="main_cate_name" name="main_cate_name" value="${ itemList.main_cate_name }" readonly="readonly">
		 	 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="hidden" class="mid_cate_cd" id="mid_cate_cd" name="mid_cate_cd" value="${ itemList.mid_cate_cd }">
	 		 				<input type="text" class="mid_cate_name" id="mid_cate_name" name="mid_cate_name" value="${ itemList.mid_cate_name }" readonly="readonly" onclick="midCatPopup();">
	 		 			</td>
	 		 			<td style="text-align: left;" >
							<input type="hidden" class="small_cate_cd" name="small_cate_cd" value="${ itemList.small_cate_cd }">	 		 			
	 		 				<input type="text" class="small_cate_name" name="small_cate_name" value="${ itemList.small_cate_name }" readonly="readonly" onclick="smallCatPopup();">
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="qty" name="qty" value="${ itemList.qty }">
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="list_price" name="list_price" value="${ itemList.list_price }">
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="total_price" name="total_price" value="${ itemList.total_price }" readonly="readonly"> <!-- 총금액 -->
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="dc_price" name="dc_price" value="${ itemList.dc_price }">
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="offer_price" name="offer_price" value="${ itemList.offer_price }"> <!-- 제안금액 -->
	 		 			</td>
	 		 			<td style="text-align: left;" >
	 		 				<input type="text" class="patment_day" name="payment_day" value="${ itemList.payment_day }">
	 		 			</td>
	 	 			</tr>
	 	 		</c:forEach>
	 	 	</tbody>
		</table>
			
		</div>
	</form>
</div>

<!-- 고객 모달창 시작 -->
<div id="custListModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="popupClose();" >
 	</div>
	<form method='post' name='custListPopup' id='custListPopup'>
	<div id="custListModalContent" style="margin: 0 1.5% 0 1.5%;">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 고객 리스트</span>
		</div>
		<div id="custModalList" class="commonList">
			 	<table id="custListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="custListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">고객명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_cust_name" name="s_cust_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
							</td>
							<td style="width: 40%; text-align: right;">
								<input type="button" value="검색" class="back_btn" style="float: right;" onclick="viewCustList();"/> <!-- onclick="viewProdMenuList(1); -->
							</td>			
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="custListTableHeader">
						  <th width="45%">고객번호</th>
						  <th width="45%">고객명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="custListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="custPopupPagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>

<!-- 담당자 모달창 시작 -->
<div id="empListModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="popupClose();" >
 	</div>
	<form method='post' name='custListPopup' id='custListPopup'>
	<div id="empListModalContent" style="margin: 0 1.5% 0 1.5%;">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 담당자 리스트</span>
		</div>
		<div id="empModalList" class="commonList">
			 	<table id="empListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="empListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">고객명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_emp_name" name="s_emp_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
							</td>
							<td style="width: 40%; text-align: right;">
								<input type="button" value="검색" class="back_btn" style="float: right;" onclick="viewEmpList();"/> <!-- onclick="viewProdMenuList(1); -->
							</td>			
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="empListTableHeader">
						  <th width="45%">직원번호</th>
						  <th width="45%">직원명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="empListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="empPopupPagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>

<!-- 대분류 모달창 시작 -->
<div id="mainCateListModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="popupClose();" >
 	</div>
	<form method='post' name='custListPopup' id='custListPopup'>
	<div id="mainCateListModalContent" style="margin: 0 1.5% 0 1.5%;">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 대분류 리스트</span>
		</div>
		<div id="mainCateModalList" class="commonList">
			 	<table id="mainCateListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="mainCateListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">대분류명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_main_cate_name" name="s_main_cate_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
							</td>
							<td style="width: 40%; text-align: right;">
								<input type="button" value="검색" class="back_btn" style="float: right;" onclick="viewMainCateList(1);"/>
							</td>			
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="mainCateListTableHeader">
						  <th width="45%">대분류코드</th>
						  <th width="45%">대분류명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="mainCateListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="mainCatePagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>

<!-- 중분류 모달창 시작 -->
<div id="midCateListModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="popupClose();" >
 	</div>
	<form method='post' name='custListPopup' id='custListPopup'>
	<div id="midCateListModalContent" style="margin: 0 1.5% 0 1.5%;">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 중분류 리스트</span>
		</div>
		<div id="midCateModalList" class="commonList">
			 	<table id="midCateListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="midCateListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">중분류명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_mid_cate_name" name="s_mid_cate_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
							</td>
							<td style="width: 40%; text-align: right;">
								<input type="button" value="검색" class="back_btn" style="float: right;" onclick="viewMidCateList(1);"/> <!-- onclick="viewProdMenuList(1); -->
							</td>			
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="midCateListTableHeader">
						  <th width="45%">중분류코드</th>
						  <th width="45%">중분류명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="midCateListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="midCatePagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>

<!-- 소분류 모달창 시작 -->
<div id="smallCateListModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="popupClose();" >
 	</div>
	<form method='post' name='custListPopup' id='custListPopup'>
	<div id="smallCateListModalContent" style="margin: 0 1.5% 0 1.5%;">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 소분류 리스트</span>
		</div>
		<div id="smallCateModalList" class="commonList">
			 	<table id="smallCateListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="smallCateListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">소분류명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_small_cate_name" name="s_small_cate_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
							</td>
							<td style="width: 40%; text-align: right;">
								<input type="button" value="검색" class="back_btn" style="float: right;" onclick="viewSmallCateList(1);"/> <!-- onclick="viewProdMenuList(1); -->
							</td>			
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="smallCateListTableHeader">
						  <th width="45%">소분류코드</th>
						  <th width="45%">소분류명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="smallCateListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="smallCatePagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>

