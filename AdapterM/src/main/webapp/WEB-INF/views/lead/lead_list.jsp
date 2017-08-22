<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<script type="text/javascript" src="/resources/common/js/lead/lead.js"></script> 

<script type="text/javascript">
 $(document).ready(function(){
	$('#contact_day_srch').datepicker();

 });
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
<!-- 쿠폰관리 : 쿠폰목록조회 -->
<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 가망고객 > 가망고객 관리 
		</span>
	</div>
	<div style="height:10px;"></div>
	<div class="commonList">
 
	    <form name="leadListForm" id="leadListForm" method="post" action="${ctx}/couponManager" >
		 	<div id="searchDiv">
	        	<table id="cupnSearchTable" class="commonTable">
					<tr style="background-color: white; cursor:default; border:0;">
						 <th style="width:5%;">리드번호</th>
						 <td style="width:15%;">
						    <input type="text" id="lead_no_srch" name="lead_no_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						  <th style="width:5%;">리드명</th>
						 <td style="width:15%;">
						    <input type="text" id="lead_name_srch" name="lead_name_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						 <th style="width:5%;">고객번호</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_no" name="cust_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td> 
					  
 		                 <td style="width: 12%;">
		                 	<input type="button" value="조회" id="lead_list_srch" onclick="searchKeyword();" class="tr_btn" style="margin-left: 0;">
		                 </td>
					</tr>
					<tr>
					 			 
						 <th style="width:5%;">담당자번호</th>
						 <td style="width:15%;">
						    <input type="text" id="emp_no" name="emp_no" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					
						 <th style="width:5%;">접촉할 일자</th>
						 <td style="width:25%;">
							<input type="text" name="contact_day_srch" id="contact_day_srch" value="" class="expt_fin_d" 
							 readonly="readonly" style="width : 35%; text-align: center; cursor: pointer;">
 						 </td>
						 
						  <th style="width:5%;">순위</th>
						 <td style="width:15%;">
						    <input type="text" id="rank_cd" name="rank_cd" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
					
					</tr>
				</table>
			</div>
		</form>
		<!-- 엑셀 출력 -->
		<form id="leadExcelForm" name="leadExcelForm" method="post"></form>
	 	 <table class="commonTable" id="cupnManagerTabl">
	 	 	<thead>
	 	 		<tr>
	 	 			<th style="width: 10%;">리드번호</th>
 	 	 			<th style="width: 10%;">리드명</th>
 	 	 			<th style="width: 10%;">고객번호</th> 
	 	 			<th style="width: 10%;">고객명</th> 
	 	 			<th style="width: 10%;">전화번호</th>
	 	 			<th style="width: 10%;">담당자명</th>
	 	 			<th style="width: 15%;">접촉할일자</th>
	 	 			<th style="width: 10%;">순위</th>
	 	 			<th style="width: 15%;">등록일시</th> 
 	 	 		</tr>
	 	 	</thead>
	 	 	<tbody id="lead_list_tbody"> 
	 	 		<c:forEach items="${lead_list}" var="list">
	 	 		<tr>
	 	 			<td style="text-align: left;" >${list.lead_no}</td>
	 	 			<td style="text-align: left;" >
	 	 			<a href="#" onclick="leadDetail('${list.lead_no}');" id="${list.lead_no}">${list.lead_name}</a>
	 	 			</td>
	 	 			<td style="text-align: left;" >${list.cust_no}</td>
	 	 			<td style="text-align: left;" >${list.cust_name}</td>
	 	 			<td style="text-align: left;" >${list.phone_no}</td>
	 	 			<td style="text-align: left;" >${list.emp_name}</td>
	 	 			<td style="text-align: left;" >${list.contact_day}</td>
	 	 			<td style="text-align: left;" >${list.rank_cd}</td>
	 	 			<td style="text-align: left;" >${list.create_date}</td>
	 	 			</tr>
	 	 		</c:forEach>
 
	 	 	</tbody>
	 	 </table>
   	
		<div class="listFootDiv">
 		 	 <input type="button" class="func_btn" id="lead_add" value="단건등록" onclick="lead_add();">
		 	 <input type="button" class="func_btn" id="lead_add_multi" value="다건등록" onclick="leadExcelImportOpen();">
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀출력"  onclick="download_list_Excel('leadListForm');" >	
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
					 ◀ <input type="text" id="pageInput" value="${page.startPageNum}"  onkeypress="leadPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="leadPaging('${page.endPageNum}');" id="pNum" > / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="leadPaging('${pageNum+1}');" id="pNum"> ▶ </a>
				</c:when>
				<c:when test="${pageNum == page.endPageNum}">
					<a style="cursor: pointer;" onclick="leadPaging('${pageNum-1}');" id="pNum"> ◀ </a>
					<input type="text" id="pageInput"  value="${page.endPageNum}" onkeypress="cupnPageNumInputEnter(event);"/> 
					<a style="cursor: pointer;" onclick="leadPaging('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:otherwise>
					<a style="cursor: pointer;" onclick="leadPaging('${pageNum-1}');" id="pNum" > ◀ </a>
					<input type="text" id="pageInput"  value="${pageNum}" onkeypress="cupnPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="leadPaging('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="leadPaging('${pageNum+1}');" id="pNum"> ▶ </a>
				</c:otherwise>
			</c:choose>
		</div>
   </div>
</div>