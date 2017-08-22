<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="org.springframework.web.util.UriUtils" %>
<%@ page import="java.util.*"%>
<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
	SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "yyyyMMddHHmmss", Locale.KOREA );
	Date currentTime = new Date();
	String mTime = mSimpleDateFormat.format (currentTime);
	response.setHeader("Content-Disposition", "attachment; filename="+UriUtils.encodeFragment("가망고객목록","UTF-8")+mTime+".xls;'");
	response.setHeader("Content-Description", "JSP Generated Data");
	response.setContentType("application/vnd.ms-excel");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
.taskExcelTbl {
	border: thin solid black;
}
.header{
	border: thin solid black;
	background-color: #f9ffff;
	text-align: center;
}
.body{
	border: thin solid black;
	text-align: center;
}
#no{
	mso-number-format: "@";
}
</style>
</head>
<body>
<table class="taskExcelTbl">
	<thead>
		<tr>
			<td class="header" style="width: 10%;">리드번호</td>
			<td class="header" style="width: 10%;">리드명</td>
			<td class="header" style="width: 10%;">고객번호</td>
			<td class="header" style="width: 10%;">고객명</td>
			<td class="header" style="width: 10%;">전화번호</td>
			<td class="header" style="width: 10%;">담당자명</td>
			<td class="header" style="width: 10%;">접촉할일자</td>
			<td class="header" style="width: 10%;">순위</td>
			<td class="header" style="width: 10%;">등록일시</td>
		</tr>
	</thead>
	<tbody>
		<c:if test="${not empty leadExcelExport}">			
			<c:forEach var="leadExcelExport" items="${leadExcelExport}" >
				<tr>
					<td class="body" id="no" ><c:out value="${leadExcelExport.lead_no}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.lead_name}"></c:out></td>
					<td class="body" id="no"><c:out value="${leadExcelExport.cust_no}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.cust_name}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.phone_no}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.emp_name}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.contact_day}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.rank_cd}"></c:out></td>
					<td class="body"><c:out value="${leadExcelExport.create_date}"></c:out></td>
				</tr>
			</c:forEach>
		</c:if>
			
		  <c:if test="${fn:length(leadExcelExport) == 0}" >
			<tr style="cursor: default; background-color: white;">
				<td class="body" id="no" ></td>
					<td class="body"></td>
					<td class="body" id="no"></td>
					<td class="body"></td>
					<td class="body"></td>
					<td class="body"></td>
					<td class="body"></td>
					<td class="body"></td>
					<td class="body"></td>
			</tr>
		</c:if> 
	</tbody>
</table>
</body>
</html>