<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath }" />    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="/resources/common/js/lead/lead.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript">


$(document).ready(function(){
	$('#contact_day').datepicker();

 });	
 
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
<!-- 가망고객 -->
<div id="coupon_detail">
	<div style="height:10px;"></div>
	
	<c:if test="${flg == 0 }">
 		<div class="titleDIV" id="lead_detail_title">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 상세정보</span>
		</span>
	</div>   
	</c:if>
	
	<c:if test="${flg == 1 }">
 		<div class="titleDIV" id ="lead_insert_title">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 추가</span>
		</span>
	</div>   
	</c:if>
	
 
 		<div class="titleDIV" id="lead_update_title">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 수정</span>
		</span>
	</div>   
 
	
	<div style="height:10px;"></div>
	<form role="form" name="lead_single_add" id="lead_single_add" method="post" action="${ctx}/lead_single_add" >	
	<div class="commonDetail">
	<table id="coupon_form_tbl" class="commonDetailTable">
		<tr>
 			<th id="impTh" style="text-align:right;" >리드번호</th>
			<td>
			<input type="text" id="lead_no" name="lead_no"  readonly="readonly" value="${detail.lead_no}">
 			</td>
			<th id="impTh" style="text-align:right;">*리드명</th>
			<td>
 			 <input type="text" id="lead_name" name="lead_name"  value="${detail.lead_name}" >
  			</td>
		</tr>
		
		<tr>
			<th id="impTh" style="text-align:right;">고객</th>
			<td>
			<input type="hidden" id="cust_no" name="cust_no"  value="${detail.cust_no}" >
			<input type="text" id="cust_name" readonly="readonly" name="cust_name" value="${detail.cust_name}">
			<input type="button" id="emp_list_pop" value="고객" onclick="custSchPopupOpen();"/>
 			</td>
			<th style="text-align:right;">담당자</th>
			<td> 
	       <input type="text" id="emp_name" name="emp_name"  value="${detail.emp_name}">
	       <input type="hidden" id="emp_no" name="emp_no" readonly="readonly" value="${detail.emp_no}">
 		 <input type="button" id="cust_list_pop" value="담당자" onclick="empSchPopupOpen();">
 			</td>
		</tr>
		<tr>
			<th id="impTh" class="discount_cost" style="text-align:right;">접촉할일자
			</th>
			<td id="td_disc_type">	
				<input name="contact_day" id="contact_day" type="text" value="${detail.contact_day}" class="expt_fin_d" 
							 readonly="readonly" style="text-align: center; cursor: pointer;">
			</td>
			<th style="text-align:right;">순위</th>
			<td>
		  <input type="text" id="rank_cd" name="rank_cd" value="${detail.rank_cd}">
 			</td>
		</tr>
		<tr>
			<th style="text-align:right;">포기사유</th>
			<td colspan="3">	
			<input type="text" id="reason_cd" name="reason_cd" value="${detail.reason_cd}">
 			</td>
 		</tr>
		<tr>
			<th  style="text-align:right;">특이 사항</th>
			<td colspan="3">
			<input type="text" id="remark_cn" name="remark_cn"  value="${detail.remark_cn}">
 			</td>
 		</tr>
 	</table>
 	
	<div class="listFootDiv">
	
	<c:if test="${flg == 0 }">
	 	 <div id="lead_detail_div">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="조회" onclick="lead_cancel();">
	 	 	<input type="button" class="func_btn" id="lead_update" value="편집" onclick="lead_modify();">
	 	 	<input type="button" class="tr_btn" id="lead_delete" value="삭제" onclick="lead_remove();">
	 	 </div> 
	 </c:if>
	
	<c:if test="${flg == 1 }">
	 	 <div id="lead_single_add_div">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="조회" onclick="lead_cancel();">
	 	 	<input type="button" class="tr_btn" id="lead_single_add" value="저장" onclick="lead_single_save();">
	 	 </div> 
	 </c:if>
	  
	 	  <div id="lead_update_div">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="조회" onclick="lead_cancel();">
	 	 	<input type="button" class="tr_btn" id="lead_single_add" value="저장" onclick="lead_modify_save();">
	 	 	<input type="button" class="tr_btn" id="lead_delete" value="삭제" onclick="lead_remove();">
	 	 </div> 
 
    </div>
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
			<span class="titleText">■ 담당자 리스트</span>
		</div>
		<div id="custModalList" class="commonList">
			 	<table id="custListModalTables" style="width: 100%;">
			 	 	<thead>
			 	 		<tr id="custListTableHeader">
			 	 			<th style="width: 20%; text-align: right; padding-right: 1%;">고객명 : </th>
			 	 			<td style="width: 40%;">
			 	 			    <input type="text" id="s_emp_name" name="s_emp_name" style="width: 70%;" maxlength="100"/>&nbsp;&nbsp;
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
			 			<tr id="empListTableHeader">
						  <th width="45%">고객번호</th>
						  <th width="45%">고객명</th>
						</tr>	
			 		</thead>
			 	 	<tbody id="custListTbody"></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="prodMenuPagingDiv" style="width: 100%; text-align: center;"></div>
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
			<div class="pagingDiv" id="prodMenuPagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	</div>
	</form>
	<input type="hidden" id="h_nm_menu">
</div>



