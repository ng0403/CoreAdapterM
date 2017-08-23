<%@ page   language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<c:set var="ctx" value="${pageContext.request.contextPath }" />

<script type="text/javascript" src="${ctx}/resources/common/js/task/task.js"></script> 
<script type="text/javascript" src="${ctx}/resources/common/js/task/task_detail.js"></script> 

<script type="text/javascript">
	$(document).ready(function(){
		$('#next_day_srch').datepicker();
 	});
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
  
<!-- task : task조회 -->
<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 상담 > 상담 관리 
		</span>
	</div>
	<div style="height:10px;"></div>
	<div class="commonList">
	    <form name="taskListForm" id="taskListForm" method="post" action="${ctx}/couponManager" >
		 	<div id="searchDiv">
	        	<table id="cupnSearchTable" class="commonTable">
					<tr style="background-color: white; cursor:default; border:0;">
						 <th style="width:5%;">상담번호</th>
						 <td style="width:15%;">
						    <input type="text" id="task_no_srch" name="task_no_srch" value="" style="width:80%" onkeypress="taskenterSearch(event);">
						 </td> 
						 <th style="width:5%;">제목</th>
						 <td style="width:15%;">
						    <input type="text" id="subject_srch" name="subject_srch" value="" style="width:80%" onkeypress="taskenterSearch(event);">
						 </td>
						  <th style="width:5%;">고객명</th>
						 <td style="width:15%;">
						    <input type="text" id="cust_name_srch" name="cust_name_srch" value="" style="width:80%" onkeypress="taskenterSearch(event);">
						 </td>
					  
 		                 <td style="width: 12%;">
		                 	<input type="button" value="조회" id="task_list_srch" onclick="taskSchList(); "    class="tr_btn" >
		                 	<input type="button" value="검색 초기화" id="task_cancel_srch" onclick="taskCancelList(); " class="tr_btn" >
		                 	
		                 </td>
					</tr>
					
					<tr>
						 <th style="width:5%;">담당자명</th>
						 <td style="width:15%;">
						    <input type="text" id="emp_name_srch" name="emp_name_srch" value="" style="width:80%" onkeypress="taskenterSearch(event);">
						 </td>
					
						 <th style="width:5%;">다음일자</th>
						 <td style="width:15%;">
<!-- 							<input type="text" id="next_day" name="next_day" value=""  style="width : 80%;" onkeypress="cupnEnterSearch(event);"> -->
 							<input type="text" name="next_day_srch" id="next_day_srch" value="" class="expt_fin_d" 
							 		readonly="readonly" style="width : 80%; text-align: center; cursor: pointer;" >
 						 </td>
						 
						  <th style="width:5%;">분류</th>
						 <td style="width:15%;">
						    <select id="dtype_cd_srch" name="dtype_cd_srch" 
										style="margin-left: 0; width: 83%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
								<c:forEach var="dtypeCd" items="${ dtypeCd }">
<%-- 									<c:if test= "${ dtypeCd.code eq taskList.dtype_cd }"> --%>
<%-- 										<option value="${ dtypeCd.code }">${ dtypeCd.code_name }</option> --%>
<%-- 									</c:if> --%>
<%-- 									<c:if test= "${ dtypeCd.code ne taskList.dtype_cd }"> --%>
										<option value="${ dtypeCd.code }">${ dtypeCd.code_name }</option>
<%-- 									</c:if> --%>
								</c:forEach>
							</select>
						 </td>
					
					</tr>
				</table>
			</div>
		</form>
		
		<!-- 엑셀 출력 -->
		<form id="taskExcelForm" name="taskExcelForm" method="post">
			<table class="commonTable" id="taskManagerTabl">
		 	 	<thead>
		 	 		<tr>
	 	 	 			<th style="width: 10%;">task번호</th> 
		 	 			<th style="width: 15%;">제목</th>
	 	 	 			<th style="width: 10%;">고객번호</th>
		 	 			<th style="width: 9%;">고객명</th> 
		 	 			<th style="width: 9%;">전화번호</th>
		 	 			<th style="width: 9%;">담당자명</th>
		 	 			<th style="width: 10%;">다음일자</th>
		 	 			<th style="width: 12%;">분류</th>
		 	 			<th style="width: 10%;">등록일시</th> 
	 	 	 		</tr>
		 	 	</thead>
		 	 	<tbody id="task_list_tbody"> 
		 	 		<c:forEach items="${taskList}" var="list">
		 	 		<tr>
		 	 			<td style="text-align: left;" >${list.task_no}</td>
		 	 			<td style="text-align: left;" >
		 	 				<a href="#" onclick="taskDetail('${list.task_no}');" id="${list.task_no}">${list.subject}</a>
		 	 			</td>
		 	 			<td style="text-align: left;" >${list.cust_no}</td>
		 	 			<td style="text-align: left;" >${list.cust_name}</td>
		 	 			<td style="text-align: left;" >${list.phone_no}</td>
		 	 			<td style="text-align: left;" >${list.emp_no}</td>
		 	 			<td style="text-align: left;" >${list.next_day}</td>
		 	 			<td style="text-align: left;" >${list.dtype_cd}</td>
		 	 			<td style="text-align: left;" >${list.create_date}</td>
		 	 			</tr>
		 	 		</c:forEach>
		 	 	</tbody>
		 	 </table>
   		</form>	
		<div class="listFootDiv">
 		 	 <input type="button" class="func_btn" id="task_add"       value="단건등록" onclick="task_add();">
		 	 <input type="button" class="func_btn" id="task_add_multi" value="다건등록" onclick="taskExcelImportOpen();">
		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀출력"  onclick="download_list_Excel('taskListForm','0');" >
		 	 <input type="button" class="func_btn" id="excel_form_down" value="엑셀Form 출력"  onclick="download_list_Excel('taskListForm','1');" >	
<!-- 		 	 <input type="button" class="func_btn" id="exportBtn"      value="엑셀출력"  onclick="exportToExcel();" >	 -->
		</div>
		
		<div class="pagingDiv">
			<input type="hidden" id="endPageNum" value="${page.endPageNum}"/>
			<input type="hidden" id="startPageNum" value="${page.startPageNum}"/>
			<input type="hidden" id="taskPageNum" value="${taskPageNum}"/>
			<c:choose>
				<c:when test="${page.endPageNum == 0 || page.endPageNum == 1}">
					<a style="color: black; text-decoration: none;"> ◀ </a><input type="text" id="pageInput" value="${page.startPageNum}" readonly="readonly"/>  
					<a style="color: black; text-decoration: none;"> / 1</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:when test="${taskPageNum == page.startPageNum}">
					 ◀ <input type="text" id="pageInput" value="${page.startPageNum}" onkeypress="taskPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="taskSchList('${page.endPageNum}');" id="pNum" > / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="taskSchList('${taskPageNum+1}');" id="pNum"> ▶ </a>
				</c:when>
				<c:when test="${taskPageNum == page.endPageNum}">
					<a style="cursor: pointer;" onclick="taskSchList('${taskPageNum-1}');" id="pNum"> ◀ </a>
					<input type="text" id="pageInput"  value="${page.endPageNum}" onkeypress="taskPageNumInputEnter(event);"/> 
					<a style="cursor: pointer;" onclick="taskSchList('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="color: black; text-decoration: none;"> ▶ </a>
				</c:when>
				<c:otherwise>
					<a style="cursor: pointer;" onclick="taskSchList('${taskPageNum-1}');" id="pNum" > ◀ </a>
					<input type="text" id="pageInput"  value="${taskPageNum}" onkeypress="taskPageNumInputEnter(event);"/>  
					<a style="cursor: pointer;" onclick="taskSchList('${page.endPageNum}');" id="pNum"> / ${page.endPageNum}</a>
					<a style="cursor: pointer;" onclick="taskSchList('${taskPageNum+1}');" id="pNum"> ▶ </a>
				</c:otherwise>
			</c:choose>
		</div>
		
   </div>
</div>

