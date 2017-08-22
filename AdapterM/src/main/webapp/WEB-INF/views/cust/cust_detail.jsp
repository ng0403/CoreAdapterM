<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath }" />    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="${ctx}/resources/common/js/cust/cust.js"></script> 
<script src="//d1p7wdleee1q2z.cloudfront.net/post/search.min.js"></script>
<%-- <script type="text/javascript" src="${ctx}/resources/common/js/common/search.min.js"></script> --%>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<script src="http://malsup.github.com/jquery.form.js"></script>

<script type="text/javascript">
//연락처타입코드리스트 저장
var phoneTypeCdList = new Array();
	<c:forEach var='phoneTypeCdList' items='${phoneTypeCdList}' varStatus="status">
	phoneTypeCdList.push("${phoneTypeCdList.code}");
	phoneTypeCdList.push("${phoneTypeCdList.code_name}");	
	</c:forEach>
//국가번호코드리스트 저장
var phoneCountryCdList = new Array();
	<c:forEach var='phoneCountryCdList' items='${phoneCountryCdList}' varStatus="status">
	phoneCountryCdList.push("${phoneCountryCdList.code}");
	phoneCountryCdList.push("${phoneCountryCdList.code_name}");	
	</c:forEach>
//주소타입코드리스트 저장
var addrTypeCdList = new Array();
	<c:forEach var='addrTypeCdList' items='${addrTypeCdList}' varStatus="status">
	addrTypeCdList.push("${addrTypeCdList.code}");
	addrTypeCdList.push("${addrTypeCdList.code_name}");	
	</c:forEach>
$(document).ready(function(){
	$('#contact_day').datepicker();
 });
</script>

<input type="hidden" id="ctx" value="${ctx}">
<input type="hidden" id="flg" value="${flg}">
<input type="hidden" id="cust_no" value="${custDlist.cust_no}">
<!-- 고객 -->
<div id="cust_detail">
	<div style="height:10px;"></div>
	
	<c:if test="${flg == 0 }">
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="custList();"> 고객</a> > <span id="cust_form_title">고객 상세정보</span>
		</span>
	</div>   
	</c:if>
	
	<c:if test="${flg == 1 }">
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="custList();"> 고객</a> > <span id="cust_form_title">고객 추가</span>
		</span>
	</div>   
	</c:if>
	
	<c:if test="${flg == 2}">
 		<div class="titleDIV">
		<span class="titleText">
		    ■  <a style="cursor: pointer;" onclick="custList();"> 고객</a> > <span id="cust_form_title">고객 수정</span>
		</span>
	</div>   
	</c:if>
	
	<div style="height:10px;"></div>
	<form role="form" name="cust_single_add" id="cust_single_add" method="post" action="${ctx}/cust_single_add" >	
	<div class="commonDetail">
	<table id="cust_form_tbl" class="commonDetailTable">
		
		<tr>
 			<th id="impTh" style="text-align:right; readonly:true">* 고객명</th>
			<td>
				<input type="text" id="cust_name" name="cust_name" value="${custDlist.cust_name}">
 			</td>
			<th  style="text-align:right;">주민번호</th>
			<td>
 			 <input type="text" id="resident_no" name="resident_no" value="${custDlist.resident_no }" >
  			</td>
		</tr>
		
		<tr>
			<th style="text-align:right;">차트번호</th>
			<td>
				<input type="text" id="chart_no" name="chart_no" value="${custDlist.chart_no}" >
 			</td>
			<th style="text-align:right;">전능고객ID</th>
			<td> 
	       		<input type="text" id="cust_id" name="cust_id" value="${custDlist.cust_id}"> 
 			</td>
		</tr>
		
		<tr>
			<th id="impTh" class="discount_cost" style="text-align:right;">* 내원경로</th>
			<td id="td_disc_type">	
				<select id="visit_cd" name="visit_cd" 
							style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
					<option value="">선택해 주십시오</option>
					<c:forEach var="vititCdList" items="${ vititCdList }">
						<c:if test= "${ vititCdList.code eq custDlist.visit_cd }">
							<option value="${ vititCdList.code }" selected="selected">${ vititCdList.code_name }</option>
						</c:if>
						<c:if test= "${ vititCdList.code ne custDlist.visit_cd }">
							<option value="${ vititCdList.code }">${ vititCdList.code_name }</option>
						</c:if>
					</c:forEach>
				</select>
				
			</td>
			<th id="impTh"  style="text-align:right;">* 내원경로상세</th>
			<td>
		 		 <select id="visit_dtl_cd" name="visit_dtl_cd" 
							style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
					<option value="">선택해 주십시오</option>
					<c:forEach var="vititDtlCdList" items="${ vititDtlCdList }">
						<c:if test= "${ vititDtlCdList.code eq custDlist.visit_dtl_cd }">
							<option value="${ vititDtlCdList.code }" selected="selected">${ vititDtlCdList.code_name }</option>
						</c:if>
						<c:if test= "${ vititDtlCdList.code ne custDlist.visit_dtl_cd }">
							<option value="${ vititDtlCdList.code }">${ vititDtlCdList.code_name }</option>
						</c:if>
					</c:forEach>
				</select>
 			</td>
		</tr>
		<tr>
			<th style="text-align:right;">내원경로세부</th>
			<td colspan="3">	
				<input type="text" id="reason_cd" name="reason_cd" value="${custDlist.visit_cn}">
			</td>
 		</tr>
		<tr>
			<th  style="text-align:right;">특이사항</th>
			<td colspan="3">
				<input type="text" id="remark_cn" name="remark_cn" value="${custDlist.remark_cn}">
 			</td>
 		</tr>
 	</table>
	<div class="listFootDiv">
	
	<c:if test="${flg == 0 }">
	 	 <div id="cust_detail_div">
	 	 	<input type="button" class="func_btn" id="cust_update" value="편집" onclick="cust_modify(${custDlist.cust_no});">
	 	 	<input type="button" class="tr_btn" id="cust_delete" value="삭제" onclick="cust_delete(${custDlist.cust_no});">
	 	 	<input type="button" class="func_btn" id="cust_detail_cancel" value="취소" onclick="cust_cancel();">
	 	 </div> 
	 </c:if>
	
	<c:if test="${flg == 1 }">
	 	 <div id="cust_single_add_div">
	 	 	<input type="button" class="func_btn" id="cust_list" onclick="custList();" value="조회">
	 	 	<input type="button" class="tr_btn" id="cust_single_add" value="저장" onclick="cust_add_save();">
<!-- 	 	 	<input type="button" class="func_btn" id="cust_single_cancel" value="취소" onclick="cust_cancel();"> -->
	 	 </div> 
	 </c:if>
	 <c:if test="${flg == 2 }">	 
	 	  <div id="cust_update_div">
		 	<input type="button" class="func_btn" id="cust_list" onclick="custList();" value="조회">
	 		<input type="button" class="func_btn" id="cust_single_modify" value="편집" onclick="cust_modify();">
	 		<input type="button" class="tr_btn" id="cust_delete" value="삭제" onclick="custDelete();">
	 	 </div> 
	 </c:if>
    </div>
    
    <div id="cust_phone_div" style="float: right; margin-top: 25px; margin-bottom: 7px;">
 	 	<input type="button" class="func_btn" id="cust_update" value="추가" onclick="cust_phone_add();">
 	 	<input type="button" class="tr_btn" id="cust_detail_cancel" value="저장" onclick="cust_phone_save();">
 	 	<input type="button" class="tr_btn" id="cust_delete" value="삭제" onclick="cust_remove();">
	</div>

	 
    <div id="cust_phone">
    	<div style="height:50px;"></div>
			<div class="titleDIV">
				<span class="titleText">
	    			■ <span id="coupon_form_title">전화번호</span>
					<span style="font-size: 8px;">(삭제할 전화번호를 체크한 후 삭제버튼을 누르고 저장을 눌러주세요.)</span>
				</span>
		</div>
		<div style="height:25px;"></div>	
    	<table id="custP_form_tbl" class="commonDetailTable">
	    	<thead>
				<tr>
					<td rowspan="2" style="width: 2%; text-align: center;">
	 	 				<input id="custPhoneChk" class="custPhoneChk" type="checkbox" onclick="actAllChk(this);" />
	 	 			</td>
		 			<th style="text-align:center;">구분</th>
					<th style="text-align:center;">국가코드</th>
					<th style="text-align:center;">국번호</th>
					<th style="text-align:center;">고유번호</th>
					<th style="text-align: center;">메인여부</th>
				</tr>
			</thead>
			<tbody id="table_tbody">
				<c:forEach items="${custPList}" var="custPList" >
				<tr>
					<td style="width: 2%; text-align: center;">
	 	 				<input type="checkbox" class="del_chk" name="del_chk">
	 	 			</td>
					<td>
						<select id="phone_type_cd" name="phone_type_cd" 
								style="margin-left: 0; width: 70%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
							<option value="">선택</option>
							<c:forEach var="phoneTypeCdList" items="${ phoneTypeCdList }">
								<c:if test= "${ phoneTypeCdList.code eq custPList.phone_type_cd }">
									<option value="${ phoneTypeCdList.code }" selected="selected">${ phoneTypeCdList.code_name }</option>
								</c:if>
								<c:if test= "${ phoneTypeCdList.code ne custPList.phone_type_cd }">
									<option value="${ phoneTypeCdList.code }">${ phoneTypeCdList.code_name }</option>
								</c:if>
							</c:forEach>
						</select>
		 			</td>
					<td>
			 			 <select id="phone_country_cd" name="phone_country_cd" 
									style="margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택</option>
								<c:forEach var="phoneCountryCdList" items="${ phoneCountryCdList }">
									<c:if test= "${ phoneCountryCdList.code eq custPList.phone_country_cd }">
										<option value="${ phoneCountryCdList.code }" selected="selected">${ phoneCountryCdList.code_name }</option>
									</c:if>
									<c:if test= "${ phoneCountryCdList.code ne custPList.phone_country_cd }">
										<option value="${ phoneCountryCdList.code }">${ phoneCountryCdList.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
		  			</td>
					<td>
						<input type="text" id="phone_area_no" name="phone_area_no" style="width: 90%;" value="${custPList.phone_area_no}" >
		 			</td>
					<td> 
			       		<input type="text" id="phone_no" name="phone_no" style="width: 90%;" value="${custPList.phone_no}"> 
		 			</td>
		 			<c:if test= "${ custPList.primary_yn eq 'Y' }">
	 					<td style="text-align: center;">
	 	 					<input id="custPhoneChk" class="phone_primary_yn" type="checkbox" checked="checked" />
	 	 				</td>
	 				</c:if>
	 				<c:if test= "${ custPList.primary_yn eq 'N' }">
	 					<td style="text-align: center;">
 	 						<input id="custPhoneChk" class="phone_primary_yn" type="checkbox" />
	 					</td>
 					</c:if>
				</tr>	
				</c:forEach>
			</tbody>
    	</table>
    </div>
        
    <div id="cust_address_div" style="float: right; margin-top: 25px; margin-bottom: 7px;">
 	 	<input type="button" class="func_btn" id="cust_update" value="추가" onclick="cust_address_add();">
 	 	<input type="button" class="tr_btn" id="cust_detail_cancel" value="저장" onclick="cust_addr_save();">
 	 	<input type="button" class="tr_btn" id="cust_delete" value="삭제" onclick="custAddr_remove();">
	</div>
	
	<div style="height:25px;"></div>
	<div class="titleDIV">
		<span class="titleText">
	    	■ <span id="coupon_form_title">우편번호</span>
	    	  <span style="font-size: 8px;">(삭제할 우편번호를 체크한 후 삭제버튼을 누르고 저장을 눌러주세요.)</span>
		</span>
	</div>	
    <div id="cust_address">
    	<table id="custA_form_tbl" class="commonDetailTable">
    		<thead>
				<tr>
					<td style="width: 2%; text-align: center;">
	 	 				<input id="custAddrChk" class="custAddrChk" type="checkbox" onclick="actAllChk(this);" />
	 	 			</td>
	 				<th style="text-align:center;">구분</th>
					<th style="text-align:center;">우편번호</th>
					<th style="text-align:center;">기본주소</th>
					<th style="text-align:center;">상세주소</th>
					<th style="text-align: center;">메인여부</th>
				</tr>
			</thead>
			<tbody id="tableAddr_tbody">
				<c:forEach items="${custAList}" var="custAList" >
					<tr>
						<td style="width: 2%; text-align: center;">
	 	 					<input id="custAddrChk" class="custAddrChk" type="checkbox" onclick="actAllChk(this);" />
	 	 				</td>
						<td>
							<select id="addr_type_cd" name="addr_type_cd" 
									style="margin-left: 0; width: 90%; text-align: center; font-size: 10.5px; padding: 0.3em 0.3em;">
								<option value="">선택</option>
								<c:forEach var="addrTypeCdList" items="${ addrTypeCdList }">
									<c:if test= "${ addrTypeCdList.code eq custAList.addr_type_cd }">
										<option value="${ addrTypeCdList.code }" selected="selected">${ addrTypeCdList.code_name }</option>
									</c:if>
									<c:if test= "${ addrTypeCdList.code ne custAList.addr_type_cd }">
										<option value="${ addrTypeCdList.code }">${ addrTypeCdList.code_name }</option>
									</c:if>
								</c:forEach>
							</select>
		 				</td>
						<td>
							<input type="text" id="zip_no" name="zip_no" style="width: 90%;" value="${custAList.zip_no }" >
	  					</td>
						<td>
							<input type="text" id="main_address" name="main_address" style="width: 90%;"  value="${custAList.main_address}" >
			 			</td>
						<td> 
			    	   		<input type="text" id="detail_address" name="detail_address" style="width: 90%;" value="${custAList.detail_address}"> 
	 					</td>
	 					<c:if test= "${ custAList.primary_yn eq 'Y' }">
	 						<td style="text-align: center;">
	 	 						<input id="custAddrChk" class="addr_primary_yn" type="checkbox" checked="checked" />
	 	 					</td>
	 					</c:if>
	 					<c:if test= "${ custAList.primary_yn eq 'N' }">
	 						<td style="text-align: center;">
	 	 						<input id="custAddrChk" class="addr_primary_yn" type="checkbox" />
	 	 					</td>
	 					</c:if>
	 					
					</tr>	
				</c:forEach>
			</tbody>
    	</table>
    </div>
    
	</div>
  </form>
</div>	