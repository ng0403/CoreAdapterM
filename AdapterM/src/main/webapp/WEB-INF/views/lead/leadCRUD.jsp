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
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 상세정보</span>
		</span>
	</div>   
	</c:if>
	
	<c:if test="${flg == 1 }">
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 추가</span>
		</span>
	</div>   
	</c:if>
	
	<c:if test="${flg == 2}">
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="leadlist();"> 가망고객</a> > <span id="coupon_form_title">가망고객 수정</span>
		</span>
	</div>   
	</c:if>
	
	<div style="height:10px;"></div>
	<form role="form" name="lead_single_add" id="lead_single_add" method="post" action="${ctx}/lead_single_add" >	
	<div class="commonDetail">
	<table id="coupon_form_tbl" class="commonDetailTable">
		<tr>
 			<th id="impTh" style="text-align:right; readonly:true">리드번호</th>
			<td>
			<input type="text" id="lead_no" name="lead_no" value="${detail.lead_no}">
 			</td>
			<th id="impTh" style="text-align:right;">*리드명</th>
			<td>
 			 <input type="text" id="lead_name" name="lead_name" value="${detail.lead_name }" >
  			</td>
		</tr>
		
		<tr>
			<th id="impTh" style="text-align:right;">고객</th>
			<td>
			<input type="text" id="cust_no" name="cust_no" value="${detail.cust_no}" >
 			</td>
			<th style="text-align:right;">담당자</th>
			<td> 
	       <input type="text" id="emp_name" name="emp_name" value="${detail.emp_no}"> 
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
			<input type="text" id="remark_cn" name="remark_cn" value="${detail.remark_cn}">
 			</td>
 		</tr>
 	</table>
	<div class="listFootDiv">
	
	<c:if test="${flg == 0 }">
	 	 <div id="lead_detail_div">
	 	 	<input type="button" class="func_btn" id="lead_update" value="편집" onclick="lead_modify(${detail.lead_no});">
	 	 	<input type="button" class="func_btn" id="lead_delete" value="삭제" onclick="lead_remove();">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="취소" onclick="lead_cancel();">
	 	 </div> 
	 </c:if>
	
	<c:if test="${flg == 1 }">
	 	 <div id="lead_single_add_div">
	 	 	<input type="button" class="func_btn" id="lead_single_add" value="저장" onclick="lead_single_save();">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="취소" onclick="lead_cancel();">
	 	 </div> 
	 </c:if>
	 <c:if test="${flg == 2 }">	 
	 	  <div id="lead_update_div">
	 	 	<input type="button" class="func_btn" id="lead_single_add" value="수정" onclick="lead_modify_save();">
	 	 	<input type="button" class="func_btn" id="lead_single_cancel" value="취소" onclick="lead_cancel();">
	 	 </div> 
	 </c:if>
    </div>
	</div>
  </form>
</div>	