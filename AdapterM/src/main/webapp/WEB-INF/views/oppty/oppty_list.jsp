<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<c:set var="ctx" value="${pageContext.request.contextPath }" />

<script type="text/javascript" src="${ctx}/resources/common/js/opty/oppty.js"></script>

<script type="text/javascript">
 $(document).ready(function(){
	$('#exp_close_dt_srch').datepicker();

 });
</script>


<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">

<!-- 매출관리 : 매출기회조회 -->

<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 매출 > 매출기회관리 
		</span>
	</div>
	<div style="height:10px;"></div>
	<div class="commonList">
		<!-- 페이징 전용 폼 -->
	    <form id="opptyListPagingForm" method="post" action="${ctx}/couponManager" >
<%-- 		    <input type="hidden" name="cupn_name_srch" value="${cupnListMap.cupn_name_srch}"> --%>
<%-- 			<input type="hidden" name="exp_start_dt_srch" value="${cupnListMap.exp_start_dt_srch}"> --%>
<%-- 			<input type="hidden" name="exp_end_dt_srch" value="${cupnListMap.exp_end_dt_srch}"> --%>
<%-- 			<input type="hidden" name="active_flg_srch" value="${cupnListMap.active_flg_srch}"> --%>
<%-- 			<input type="hidden" name="brand_wid" value="${cupnListMap.brand_wid}"> --%>
		</form>
	    <form name="opptyListForm" id="opptyListForm" method="post" action="${ctx}/couponManager" >
		 	<div id="searchDiv">
	        	<table id="cupnSearchTable" class="commonTable">
					<tr style="background-color: white; cursor:default; border:0;">
						 <th style="width:5%;">기회번호</th>
						 <td style="width:15%;">
						    <input type="text" id="oppty_no_srch" name="oppty_no_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						 
						 <th style="width:5%;">기회명</th>
						 <td style="width:15%;">
						    <input type="text" id="oppty_name_srch" name="oppty_name_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						 
						 <th style="width:5%;">고객명</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_name_srch" name="cust_name_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					</tr>
					<tr>
						<th style="width:5%;">담당자명</th>
						<td style="width:15%;">
						    <input type="text" id="emp_name_srch" name="emp_name_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						</td >
						
						<th style="width:5%;">기회상태</th>
						<td>
							<select id="oppty_status_cd_srch" name="oppty_status_cd_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="status" items="${ opptyStatusCd }">
									<option value="${ status.code }">${ status.code_name }</option>
								</c:forEach>
							</select>
						</td>
						
						<th style="width:5%;">기회단계</th>
						<td>
							<select id="oppty_stage_cd_srch" name="oppty_stage_cd_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="stage" items="${ opptyStageCd }">
									<option value="${ stage.code }">${ stage.code_name }</option>
								</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th style="width: 10%;">예상종료일자</th>
						<td style="width:25%;">
							<input type="text" name="exp_close_dt_srch" id="exp_close_dt_srch" value="" class="expt_fin_d" placeholder="예상종료일자"
							 	   readonly="readonly" style="width : 35%; text-align: center; cursor: pointer;">
						 </td>
						 
						<th style="width: 5%;">분류</th>
						<td style="width: 15%;">
							<select id="dtype_cd_srch" name="dtype_cd_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="dtype" items="${ dtypeCd }">
									<option value="${ dtype.code }">${ dtype.code_name }</option>
								</c:forEach>
							</select>
						</td>
						
						<th style="width: 5%;">구매형태</th>
						<td style="width: 15%;">
							<select id="purchase_type_srch" name="purchase_type_srch" 
									style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="purchase_type" items="${ purchaseType }">
									<option value="${ purchase_type.code }">${ purchase_type.code_name }</option>
								</c:forEach>
							</select>
						</td>
						
						<td style="width: 12%;">
							<input type="button" value="조회" id="oppty_list_sch"  onclick="opptySchList(1);"	class="tr_btn" style="margin-left: 0;"> <!-- pageing 시 매개변수 1을 전달한다. -->
							<input type="button" value="검색 초기화" id="oppty_list_sch_reset"  onclick="opptySchReset();"	class="tr_btn" style="margin-left: 0;"> <!-- pageing 시 매개변수 1을 전달한다. -->
						</td>

						
					</tr>
				</table>
			</div>
		</form>
		<!-- 엑셀 출력 -->
		<form id="opptyExcelForm" name="opptyExcelForm" method="post"></form>
	 	 <table class="commonTable" id="cupnManagerTabl">
	 	 	<thead>
	 	 		<tr>
	 	 			<th >기회번호</th>
	 	 			<th >기회명</th>
	 	 			<th >고객번호</th>
	 	 			<th >고객명</th>
	 	 			<th >전화번호</th>
	 	 			<th >담당자명</th>
	 	 			<th >기회상태</th>
	 	 			<th >기회단계</th>
	 	 			<th >예상종류일자</th>
	 	 			<th >분류</th>
	 	 			<th >구매</th>
	 	 			<th >소개자</th>
	 	 			<th >등록일시</th>
	 	 		</tr>
	 	 	</thead>
	 	 	<tbody id="oppty_list_tbody">
	 	 		<c:forEach items="${ opptyList }" var="list">
	 	 			<tr>
	 		 			<td style="text-align: left;" >${ list.oppty_no }</td>
	 		 			<td style="text-align: left;" >
	 		 				<a onclick="opptyDetail('${ list.oppty_no }');" id="${ list.oppty_no }">${ list.oppty_name }</a>
	 		 			</td>
		 	 			<td style="text-align: left;" >${ list.cust_no }</td>
	 		 			<td style="text-align: left;" >${ list.cust_name }</td>
	 		 			<td style="text-align: left;" >${ list.cust_phone }</td>
	 		 			<td style="text-align: left;" >${ list.emp_name }</td>
	 		 			<td style="text-align: left;" >${ list.oppty_status_cd }</td>
	 		 			<td style="text-align: left;" >${ list.oppty_stage_cd }</td>
	 		 			<td style="text-align: left;" >${ list.exp_close_day }</td>
	 	 				<td style="text-align: left;" >${ list.dtype_cd }</td>
	 	 				<td style="text-align: left;" >${ list.purchase_type }</td>
	 	 				<td style="text-align: left;" >${ list.rec_per_cd }</td>
	 	 				<td style="text-align: left;" >${ list.create_date }</td>
	 	 			</tr>
	 	 		</c:forEach>
	 	 		
	 	 	</tbody>
	 	 </table>
   	
		<div class="listFootDiv">
		 	 <input type="button" class="func_btn" id="oppty_single_add" value="단건등록" onclick="opptySingleAddForm();">
		 	 <input type="button" class="func_btn" id="oppty_multi_add" value="다건등록" onclick="opptyExcelImportOpen();">
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀출력"  onclick="download_list_Excel('opptyListForm', 0);" >	
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀Form 출력"  onclick="download_list_Excel('opptyListForm', 1);" >	
		</div>
	 	<div class="pagingDiv">
			<input type="hidden" id="endPageNum" value="${page.endPageNum}"/>
			<input type="hidden" id="startPageNum" value="${page.startPageNum}"/>
			<input type="hidden" id="opptyPageNum" value="${opptyPageNum}"/>
			<c:choose>
				<c:when test="${page.endPageNum == 0 || page.endPageNum == 1}">
					<a style="color: black; text-decoration: none;"> ◀ </a><input type="text" id="pageInput" value="${page.startPageNum}" readonly="readonly"/>  
					<a style="color: black; text-decoration: none;"> / 1</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:when test="${opptyPageNum == page.startPageNum}">
					 ◀ <input type="text" id="pageInput" value="${page.startPageNum}" onkeypress="opptyPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="opptySchList('${page.endPageNum}');" id="pNum" > / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="opptySchList('${opptyPageNum+1}');" id="pNum"> ▶ </a>
				</c:when>
				<c:when test="${opptyPageNum == page.endPageNum}">
					<a style="cursor: pointer;" onclick="opptySchList('${opptyPageNum-1}');" id="pNum"> ◀ </a>
					<input type="text" id="pageInput"  value="${page.endPageNum}" onkeypress="opptyPageNumInputEnter(event);"/> 
					<a style="cursor: pointer;" onclick="opptySchList('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:otherwise>
					<a style="cursor: pointer;" onclick="opptySchList('${opptyPageNum-1}');" id="pNum" > ◀ </a>
					<input type="text" id="pageInput"  value="${opptyPageNum}" onkeypress="opptyPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="opptySchList('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="opptySchList('${opptyPageNum+1}');" id="pNum"> ▶ </a>
				</c:otherwise>
			</c:choose>
		</div>
   </div>
</div>