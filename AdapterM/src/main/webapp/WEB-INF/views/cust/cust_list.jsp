<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<script type="text/javascript" src="${ctx}/resources/common/js/cust/cust.js"></script>

<script type="text/javascript">
//내원코드리스트 저장
var vititCdList = new Array();
	<c:forEach var='vititCdList' items='${vititCdList}' varStatus="status">
	vititCdList.push("${vititCdList.code}");
	vititCdList.push("${vititCdList.code_name}");	
	</c:forEach>
//내원경로상세코드리스트 저장
var vititDtlCdList = new Array();
	<c:forEach var='vititDtlCdList' items='${vititDtlCdList}' varStatus="status">
	vititDtlCdList.push("${vititDtlCdList.code}");
	vititDtlCdList.push("${vititDtlCdList.code_name}");	
	</c:forEach>
 $(document).ready(function(){
	$('#contact_day_srch').datepicker();

 });
</script>


<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
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
	    <form name="custListForm" id="custListForm" method="post" action="${ctx}/couponManager" >
		 	<div id="searchDiv">
	        	<table id="cupnSearchTable" class="commonTable">
					<tr style="background-color: white; cursor:default; border:0;">
						 <th style="width:5%;">고객번호</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_no" name="cust_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td> 
						 <th style="width:5%;">고객명</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_name" name="cust_name" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						  <th style="width:5%;">차트번호</th>
						 <td style="width:15%;">
						    <input type="text" id="chart_no" name="chart_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					  
 		                 <td style="width: 12%;">
		                 	<input type="button" value="조회" id="lead_list_srch" onclick="searchKeyword(1);" class="tr_btn" style="margin-left: 0;">
		                 	<input type="button" value="검색 초기화" id="cust_list_sch_reset"  onclick="custSchReset();"	class="tr_btn" style="margin-left: 0;"> <!-- pageing 시 매개변수 1을 전달한다. -->
		                 </td>
					</tr>
					
					<tr>
						 <th style="width:5%;">내원경로</th>
						 <td style="width:15%;">
<!-- 						    <input type="text" id="visit_cd" name="visit_cd" value="" style="width:80%" onkeypress="cupnEnterSearch(event);"> -->
						 	<select id="visit_cd" name="visit_cd" 
										style="margin-left: 0; width: 83%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="vititCdList" items="${ vititCdList }">
<%-- 									<c:if test= "${ vititCdList.code eq custDlist.visit_cd }"> --%>
<%-- 										<option value="${ vititCdList.code }">${ vititCdList.code_name }</option> --%>
<%-- 									</c:if> --%>
<%-- 									<c:if test= "${ vititCdList.code ne custDlist.visit_cd }"> --%>
										<option value="${ vititCdList.code }">${ vititCdList.code_name }</option>
<%-- 									</c:if> --%>
								</c:forEach>
							</select>
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
		
		<!-- 엑셀 출력 -->
		<form id="custExcelForm" name="custExcelForm" method="post"></form>
	 	 <table class="commonTable" id="cupnManagerTabl">
	 	 	<thead>
	 	 		<tr>
 	 	 			<th style="width: 10%;">고객번호</th> 
	 	 			<th style="width: 8%;">고객명</th>
 	 	 			<th style="width: 10%;">차트번호</th>
	 	 			<th style="width: 10%;">내원경로</th> 
	 	 			<th style="width: 10%;">내원경로상세</th>
	 	 			<th style="width: 10%;">소개자</th>
	 	 			<th style="width: 10%;">전화번호</th>
	 	 			<th style="width: 17%;">주소</th>
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
	 	 			<td style="text-align: left;" >${list.phone_area_no}${list.phone_no}</td>
	 	 			<td style="text-align: left;" >${list.main_address}</td>
	 	 			<td style="text-align: left;" >${list.create_date}</td>
	 	 			</tr>
	 	 		</c:forEach>
	 	 	
	 	 	</tbody>
	 	 </table>
   	
		<div class="listFootDiv">
 		 	 <input type="button" class="func_btn" id="cust_add" value="단건등록" onclick="cust_add();">
		 	 <input type="button" class="func_btn" id="lead_add_multi" value="다건등록" onclick="excelImportOpen();">
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀출력"  onclick="download_list_Excel('custListForm', 0);" >
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀Form 출력"  onclick="download_list_Excel('custListForm', 1);" >
		</div>
	 	<div class="pagingDiv">
			<input type="hidden" id="endPageNum" value="${page.endPageNum}"/>
			<input type="hidden" id="startPageNum" value="${page.startPageNum}"/>
			<input type="hidden" id="pageNum" value="${pageNum}"/>
			<c:choose>
				<c:when test="${page.endPageNum == 0 || page.endPageNum == 1}">
					<a style="color: black; text-decoration: none;"> ◀ </a><input type="text" id="pageInput" value="${page.startPageNum}" readonly="readonly"/>  
					<a style="color: black; text-decoration: none;"> / 1</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:when test="${pageNum == page.startPageNum}">
					 ◀ <input type="text" id="pageInput" value="${page.startPageNum}"  onkeypress="custPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="searchKeyword('${page.endPageNum}');" id="pNum" > / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="searchKeyword('${pageNum+1}');" id="pNum"> ▶ </a>
				</c:when>
				<c:when test="${pageNum == page.endPageNum}">
					<a style="cursor: pointer;" onclick="searchKeyword('${pageNum-1}');" id="pNum"> ◀ </a>
					<input type="text" id="pageInput"  value="${page.endPageNum}" onkeypress="custPageNumInputEnter(event);"/> 
					<a style="cursor: pointer;" onclick="searchKeyword('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:otherwise>
					<a style="cursor: pointer;" onclick="searchKeyword('${pageNum-1}');" id="pNum" > ◀ </a>
					<input type="text" id="pageInput"  value="${pageNum}" onkeypress="custPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="searchKeyword('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="searchKeyword('${pageNum+1}');" id="pNum"> ▶ </a>
				</c:otherwise>
			</c:choose>
		</div>
   </div>
</div>