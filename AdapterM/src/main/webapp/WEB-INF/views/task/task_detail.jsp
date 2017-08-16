<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath }" />
<c:set var="taskDetail" value="${ taskDetail }" />
<c:set var="flg" value="${ flg }" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/task/task.js"></script>

<script type="text/javascript">
	$(document).ready(function(){
		$('#exp_close_day').datepicker();
	});
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
<!-- 상담 -->
<div id="task_detail">
	<div style="height:10px;"></div>
	
	<c:if test="${flg == 0 }">
 		<div class="titleDIV">
			<span class="titleText">
			    ■  <a style="cursor: pointer;" onclick="taskList();"> 상담</a> > <span id="task_form_title">상담 상세정보</span>
			</span>
		</div>   
	</c:if>
	
	<c:if test="${flg == 1 }">
 		<div class="titleDIV">
			<span class="titleText">
			    ■  <a style="cursor: pointer;" onclick="taskList();"> 상담</a> > <span id="task_form_title">상담 추가</span>
			</span>
		</div>   
	</c:if>
	
	<c:if test="${flg == 2}">
 		<div class="titleDIV">
			<span class="titleText">
			    ■  <a style="cursor: pointer;" onclick="taskList();"> 상담</a> > <span id="cust_form_title">상담 수정</span>
			</span>
		</div>   
	</c:if>
	
	<div style="height:10px;"></div>
	<form role="form" name="task_single_add" id="task_single_add" method="post" action="${ctx}/task_single_add" >	
	<div class="commonDetail">
		<table id="task_form_tbl" class="commonDetailTable">
			
			<tr>
	 			<th id="impTh" style="text-align:right; readonly:true">* task번호</th>
				<td>
					<input type="text" id="task_no" name="task_no" value="${taskDetail.task_no}">
	 			</td>
				<th id="impTh" style="text-align:right;">* 제목</th>
				<td>
	 			 <input type="text" id="subject" name="subject" value="${taskDetail.subject }" >
	  			</td>
			</tr>
			
			<tr>
				<th style="text-align:right;">고객</th>
				<td>
					<input type="text" id="cust_no" name="cust_no" value="${taskDetail.cust_no}" >
	 			</td>
				<th id="impTh" style="text-align:right;">* 담당자</th>
				<td> 
		       		<input type="text" id="emp_no" name="emp_no" value="${taskDetail.emp_no}"> 
	 			</td>
			</tr>
			
			<tr>
				<th id="impTh" class="discount_cost" style="text-align:right;">* 다음일자</th>
				<td id="td_disc_type">	
					<input type="text" name="next_day" id="next_day" value="${taskDetail.next_day}" maxlength="10" style="width: 30%; text-align: center;">
				</td>
				<th id="impTh" style="text-align:right;">* 분류</th>
				<td>
			 		 <select id="dtype_cd" name="dtype_cd" 
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
						<option value="">선택해 주십시오</option>
						<c:forEach var="dtypeCd" items="${ dtypeCd }">
							<c:if test= "${ dtypeCd.code == taskDetail.dtype_cd }">
								<option value="${ dtypeCd.code }" selected="selected">${ dtypeCd.code_name }</option>
							</c:if>
							<c:if test= "${ dtypeCd.code != taskDetail.dtype_cd }">
								<option value="${ dtypeCd.code }">${ dtypeCd.code_name }</option>
							</c:if>
						</c:forEach>
					</select>
	 			</td>
			</tr>
			<tr>
				<th style="text-align:right;">가망고객</th>
				<td >	
					<input type="text" id="reason_cd" name="reason_cd" value="${taskDetail.lead_no}">
				</td>
				<th  style="text-align:right;">영업기회</th>
				<td colspan="3">
					<input type="text" id="remark_cn" name="remark_cn" value="${taskDetail.oppty_no}">
	 			</td>
	 		</tr>
	 		<tr>
				<th id="impTh" class="discount_cost" style="text-align:right;">* 상대가치점수</th>
				<td id="td_disc_type">	
					<select id="score_cd" name="score_cd" 
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
						<option value="">선택해 주십시오</option>
						<c:forEach var="scoreCd" items="${ scoreCd }">
							<c:if test= "${ scoreCd.code eq taskDetail.score_cd }">
								<option value="${ scoreCd.code }" selected="selected">${ scoreCd.code_name }</option>
							</c:if>
							<c:if test= "${ scoreCd.code ne taskDetail.score_cd }">
								<option value="${ scoreCd.code }">${ scoreCd.code_name }</option>
							</c:if>
						</c:forEach>
					</select>
					
				</td>
				<th id="impTh" style="text-align:right;">* 진행장소</th>
				<td>
			 		<input type="text" id="location" name="location" value="${taskDetail.location}">
	 			</td>
			</tr>
	 		<tr>
				<th id="impTh" style="text-align:right;">* 특이사항</th>
				<td>
			 		<input type="text" id="remark_cn" name="remark_cn" value="${taskDetail.remark_cn}">
	 			</td>
			</tr>
	 		
	 	</table>
		<div class="listFootDiv">
			<c:if test="${flg == 0 }">
			 	 <div id="cust_detail_div">
			 	 	<input type="button" class="func_btn" id="task_update" value="편집" onclick="task_modify(${taskDetail.task_no});">
			 	 	<input type="button" class="func_btn" id="task_delete" value="삭제" onclick="task_remove();">
			 	 	<input type="button" class="func_btn" id="task_detail_cancel" value="취소" onclick="task_cancel();">
			 	 </div> 
			 </c:if>
			
			<c:if test="${flg == 1 }">
			 	 <div id="cust_single_add_div">
			 	 	<input type="button" class="func_btn" id="task_single_add" value="저장" onclick= "task_add_save();">
			 	 	<input type="button" class="func_btn" id="task_single_cancel" value="취소" onclick="task_cancel();">
			 	 </div> 
			 </c:if>
			 <c:if test="${flg == 2 }">	 
			 	  <div id="cust_update_div">
			 	 	<input type="button" class="func_btn" id="task_single_modify" value="수정" onclick="task_modify_save();">
			 	 	<input type="button" class="func_btn" id="task_single_cancel" value="취소" onclick="task_cancel();">
			 	 </div> 
			 </c:if>
	    </div>
	</div>
  	</form>
</div>	