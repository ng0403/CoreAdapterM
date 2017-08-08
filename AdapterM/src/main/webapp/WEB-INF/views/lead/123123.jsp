<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<script type="text/javascript" src="/resources/common/css/standard/common.css"></script>

<title>Insert title here</title>
</head>
<body>

<div id="cupnManager">
	<div style="height:10px;"></div>
	<div class="titleDIV">
		<span class="titleText">
			 ■ 가망고객 > 가망고객 상세 111
		</span>
	</div>
	<div style="height:10px;"></div>
</div>

<table id="cupnSearchTable" class="leadDetailTable" >

<tr style="background-color: white; cursor:default; border:0;">
<th style="width:30%">리드번호</th>
<td></td>
<th>리드명</th>
<td></td>
</tr>
<tr>
<th>고객</th>
<td></td>
<th>담당자</th>
</tr>
<tr>
<th>접촉할일자</th>
<td></td>
<th>순위</th>
<td></td>
</tr>
<tr>
<th>포기사유</th>
<td colspan="3"></td>
</tr>
<tr>
<th>특이사항</th>
<td colspan="3"></td>
</tr>
</table>

</body>
</html>