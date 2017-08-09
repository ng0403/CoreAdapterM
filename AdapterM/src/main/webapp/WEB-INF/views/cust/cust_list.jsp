<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<script type="text/javascript" src="${ctx}/resources/common/js/cust/cust.js"></script> 

<script type="text/javascript">
 $(document).ready(function(){
	$('#contact_day_srch').datepicker();

 });
</script>

<input type="hidden" id="ctx" value="${ctx}">
<!-- 고객 : 고객목록조회 -->
<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 고객 > 고객 관리 
		</span>
	</div>
	<div style="height:10px;"></div>
	<div class="commonList">
		<!-- 페이징 전용 폼 -->
	    <form id="couponListPagingForm" method="post" action="${ctx}/couponManager" >
<%-- 		    <input type="hidden" name="cupn_name_srch" value="${cupnListMap.cupn_name_srch}"> --%>
<%-- 			<input type="hidden" name="exp_start_dt_srch" value="${cupnListMap.exp_start_dt_srch}"> --%>
<%-- 			<input type="hidden" name="exp_end_dt_srch" value="${cupnListMap.exp_end_dt_srch}"> --%>
<%-- 			<input type="hidden" name="active_flg_srch" value="${cupnListMap.active_flg_srch}"> --%>
<%-- 			<input type="hidden" name="brand_wid" value="${cupnListMap.brand_wid}"> --%>
		</form>
	    <form name="couponListForm" id="couponListForm" method="post" action="${ctx}/couponManager" >
		 	<div id="searchDiv">
	        	<table id="cupnSearchTable" class="commonTable">
					<tr style="background-color: white; cursor:default; border:0;">
						 <th style="width:5%;">고객번호</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_no" name="cust_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td> 
						 <th style="width:5%;">고객명</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_nnme" name="cust_nnme" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						  <th style="width:5%;">차트번호</th>
						 <td style="width:15%;">
						    <input type="text" id="chart_no" name="chart_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					  
					  
					  
 		                 <td style="width: 12%;">
		                 	<input type="button" value="조회" id="lead_list_srch" onclick="searchKeyword();" class="tr_btn" style="margin-left: 0;">
		                 </td>
					</tr>
					
					<tr>
						 <th style="width:5%;">내원경로</th>
						 <td style="width:15%;">
						    <input type="text" id="visit_cd" name="visit_cd" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					
						 <th style="width:5%;">소개자</th>
						 <td style="width:15%;">
							<input type="text" id="rec_per" name="rec_per" value=""  style="width : 80%;" onkeypress="cupnEnterSearch(event);">
 						 </td>
						 
						  <th style="width:5%;">전화번호</th>
						 <td style="width:15%;">
						    <input type="text" id="phone_no" name="phone_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					
					</tr>
				</table>
			</div>
		</form>
	 	 <table class="commonTable" id="cupnManagerTabl">
	 	 	<thead>
	 	 		<tr>
 	 	 			<th style="width: 10%;">고객번호</th> 
	 	 			<th style="width: 10%;">고객명</th>
 	 	 			<th style="width: 10%;">차트번호</th>
	 	 			<th style="width: 10%;">내원경로</th> 
	 	 			<th style="width: 10%;">내원경로상세</th>
	 	 			<th style="width: 10%;">소개자</th>
	 	 			<th style="width: 10%;">전화번호</th>
	 	 			<th style="width: 15%;">주소</th>
	 	 			<th style="width: 10%;">등록일시</th> 
 	 	 		</tr>
	 	 	</thead>
	 	 	<tbody id="cust_list_tbody"> 
	 	 		<c:forEach items="${custList}" var="list">
	 	 		<tr>
	 	 			<td style="text-align: left;" >${list.cust_no}</td>
	 	 			<td style="text-align: left;" >
	 	 				<a href="#" onclick="custDetail('${list.cust_no}');" id="${list.cust_no}">${list.cust_name}</a>
	 	 			</td>
	 	 			<td style="text-align: left;" >${list.chart_no}</td>
	 	 			<td style="text-align: left;" >
	 	 				<c:forEach var="vititCdList" items="${ vititCdList }">
							<c:if test= "${ vititCdList.code eq list.visit_cd }">${ vititCdList.code_name }</c:if>
						</c:forEach>
	 	 			</td>
	 	 			<td style="text-align: left;" >
						<c:forEach var="vititDtlCdList" items="${ vititDtlCdList }">
							<c:if test= "${ vititDtlCdList.code eq list.visit_dtl_cd }">${ vititDtlCdList.code_name }</c:if>
						</c:forEach>
	 	 			</td>
	 	 			<td style="text-align: left;" >${list.rec_per}</td>
	 	 			<td style="text-align: left;" >${list.phone_no}</td>
	 	 			<td style="text-align: left;" >${list.address}</td>
	 	 			<td style="text-align: left;" >${list.create_date}</td>
	 	 			</tr>
	 	 		</c:forEach>
	 	 	
<%-- 	 	 		<c:forEach items="${couponList}" var="couponList"> --%>
<%-- 	 	 		<input type="hidden" id="img_src" value="${couponList.img_src}"> --%>
<!-- 	 	 		<tr> -->
<%-- 	 	 			<td onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.cupn_wid}</td> --%>
<%-- 	 	 			<td style="text-align: left;" onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.cupn_name}</td> --%>
<%-- 	 	 			<td style="text-align: left;" onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.file_name}</td> --%>
<%-- 	 	 			<td style="text-align: right;" onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');"> --%>
<%-- 	 	 			<c:if test="${couponList.disc_type==1}"> --%>
<%-- 	 	 				${couponList.disc_rate}% --%>
<%-- 	 	 			</c:if> --%>
<%-- 	 	 			<c:if test="${couponList.disc_type==2}"> --%>
<%-- 	 	 				<fmt:formatNumber value="${couponList.disc_amt}" type="number"/>원 --%>
<%-- 	 	 			</c:if> --%>
<!-- 	 	 			</td> -->
<%-- 	 	 			<td onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.exp_start_dt} ~ ${couponList.exp_end_dt} </td> --%>
<%-- 	 	 			<td onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.created}</td> --%>
<%-- 	 	 			<td onclick="goCouponForm('${couponList.cupn_wid}', '${couponList.active_flg}');">${couponList.active_flg}</td> --%>
<!-- 	 	 		</tr> -->
<%-- 	 	 		</c:forEach> --%>
<%-- 	 	 		<c:if test="${couponList.size() == 0}"> --%>
<!-- 		 	 		<tr style="background-color:white; cursor: default;"> -->
<!-- 			 	 		<td colspan=8" style="height: 274px;"><b>검색 결과가 없습니다.</b></td> -->
<!-- 		 	 		</tr> -->
<%-- 	 	 		</c:if> --%>
	 	 	</tbody>
	 	 </table>
   	
		<div class="listFootDiv">
 		 	 <input type="button" class="func_btn" id="cust_add" value="단건등록" onclick="cust_add();">
		 	 <input type="button" class="func_btn" id="lead_add_multi" value="다건등록">
		</div>
<!-- 	 	<div class="pagingDiv"> -->
<%-- 			<input type="hidden" id="endPageNum" value="${page.endPageNum}"/> --%>
<%-- 			<input type="hidden" id="startPageNum" value="${page.startPageNum}"/> --%>
<%-- 			<input type="hidden" id="pageNum" value="${pageNum}"/> --%>
<%-- 			<c:choose> --%>
<%-- 				<c:when test="${page.endPageNum == 0 || page.endPageNum == 1}"> --%>
<%-- 					<a style="color: black; text-decoration: none;"> ◀ </a><input type="text" id="pageInput" value="${page.startPageNum}" readonly="readonly"/>   --%>
<!-- 					<a style="color: black; text-decoration: none;"> / 1</a> -->
<!-- 					<a style="color: black; text-decoration: none;"> ▶ </a> -->
<%-- 				</c:when> --%>
<%-- 				<c:when test="${pageNum == page.startPageNum}"> --%>
<%-- 					 ◀ <input type="text" id="pageInput" value="${page.startPageNum}"  onkeypress="cupnPageNumInputEnter(event);"/>   --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${page.endPageNum}');" id="pNum" > / ${page.endPageNum}</a> --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${pageNum+1}');" id="pNum"> ▶ </a> --%>
<%-- 				</c:when> --%>
<%-- 				<c:when test="${pageNum == page.endPageNum}"> --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${pageNum-1}');" id="pNum"> ◀ </a> --%>
<%-- 					<input type="text" id="pageInput"  value="${page.endPageNum}" onkeypress="cupnPageNumInputEnter(event);"/>  --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a> --%>
<!-- 					<a style="color: black; text-decoration: none;"> ▶ </a> -->
<%-- 				</c:when> --%>
<%-- 				<c:otherwise> --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${pageNum-1}');" id="pNum" > ◀ </a> --%>
<%-- 					<input type="text" id="pageInput"  value="${pageNum}" onkeypress="cupnPageNumInputEnter(event);"/>   --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a> --%>
<%-- 					<a style="cursor: pointer;" onclick="cupnPaging('${pageNum+1}');" id="pNum"> ▶ </a> --%>
<%-- 				</c:otherwise> --%>
<%-- 			</c:choose> --%>
<!-- 		</div> -->
   </div>
</div>