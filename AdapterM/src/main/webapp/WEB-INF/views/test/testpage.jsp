<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<script type="text/javascript">
// $(document).ready(function(){
// 	$('#exp_start_dt_srch').datepicker();
// 	$('#exp_end_dt_srch').datepicker();
// });
</script>

<input type="hidden" id="ctx" value="${ctx}">
<!-- 쿠폰관리 : 쿠폰목록조회 -->
<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 할인쿠폰 > 쿠폰관리 
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
						 <th style="width:5%;">쿠폰명</th>
						 <td style="width:15%;">
						    <input type="text" id="cupn_name_srch" name="cupn_name_srch" value="" style="width:80%" onkeypress="cupnEnterSearch(event);">
						 </td>
						 <th style="width:5%;">유효기간</th>
						 <td style="width:25%;">
							<input type="text" name="exp_start_dt_srch" id="exp_start_dt_srch" value="" class="expt_fin_d" placeholder="시작일자"
							 readonly="readonly" style="width : 35%; text-align: center; cursor: pointer;">
							-
							<input type="text" name="exp_end_dt_srch" id="exp_end_dt_srch" value="" class="expt_fin_d" placeholder="종료일자"
							 readonly="readonly" style="width : 35%; text-align: center; cursor: pointer;">
						 </td>
						 <th style="width:5%;">브랜드</th>
						 <td style="width:15%;">
							<select id="brand_wid" name="brand_wid" style="margin-left: 0; width: 70%;font-size: 10.5px;padding: 0.3em 0.3em 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
<%-- 								<c:forEach items="${brandList}" var="brand"> --%>
<%-- 									<option value="${brand.brand_wid}" --%>
<%-- 										<c:if test="${brand.brand_wid == cupnListMap.brand_wid}">selected="selected"</c:if> --%>
<%-- 									>${brand.brand_name}</option> --%>
<%-- 								</c:forEach> --%>
							</select>
						 </td>
						 <th style="width:5%;">사용여부</th>
						 <td style="width:15%;">
							<select id="active_flg_srch" name="active_flg_srch" style="margin-left: 0; width: 70%;text-align:center;font-size: 10.5px;
								padding: 0.3em 0.3em;">
								<option value="">선택해 주십시오</option>
<%-- 								<option value="Y"<c:if test="${cupnListMap.active_flg_srch == 'Y'}">selected="selected"</c:if>>Y</option> --%>
<%-- 				   				<option value="N"<c:if test="${cupnListMap.active_flg_srch == 'N'}">selected="selected"</c:if>>N</option> --%>
							</select>
						 </td>
		                 <td style="width: 12%;">
		                 	<input type="button" value="조회" id="coupon_list_sch" onclick="cupn_manager_sch(1);" class="tr_btn" style="margin-left: 0;">
		                 </td>
					</tr>
				</table>
			</div>
		</form>
	 	 <table class="commonTable" id="cupnManagerTabl">
	 	 	<thead>
	 	 		<tr>
	 	 			<th style="width: 100%;">이름</th>
<!-- 	 	 			<th style="width: 8%;">쿠폰번호</th> -->
<!-- 	 	 			<th style="width: 28%;">쿠폰명</th> -->
<!-- 	 	 			<th style="width: 22%;">파일명</th> -->
<!-- 	 	 			<th style="width: 8%;">할인</th> -->
<!-- 	 	 			<th style="width: 15%;">유효기간</th> -->
<!-- 	 	 			<th style="width: 13%;">등록일</th> -->
<!-- 	 	 			<th style="width: 6%;">사용여부</th> -->
	 	 		</tr>
	 	 	</thead>
	 	 	<tbody>
	 	 		<c:forEach items="${tlist }" var="list">
	 	 			<td style="text-align: left;" >${list.name }</td>
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
		 	 <input type="button" class="func_btn" id="coupon_list_add" value="추가">
		 	 <input type="button" class="func_btn" id="coupon_send" value="쿠폰발송">
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