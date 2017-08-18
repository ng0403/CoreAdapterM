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
	response.setHeader("Content-Disposition", "attachment; filename="+UriUtils.encodeFragment("상담조회목록","UTF-8")+mTime+".xls;'");
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
			<td class="header" style="width: 10%;">task번호</td>
			<td class="header" style="width: 10%;">제목</td>
			<td class="header" style="width: 10%;">고객번호</td>
			<td class="header" style="width: 10%;">고객명</td>
			<td class="header" style="width: 10%;">전화번호</td>
			<td class="header" style="width: 10%;">담당자명</td>
			<td class="header" style="width: 10%;">다음일자</td>
			<td class="header" style="width: 10%;">분류</td>
			<td class="header" style="width: 10%;">등록일시</td>
		</tr>
	</thead>
	<tbody>
		<c:if test="${not empty taskSchExcel}">			
			<c:forEach var="taskSchExcel" items="${taskSchExcel}" >
				<tr>
					<td class="body" id="no" ><c:out value="${taskSchExcel.task_no}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.subject}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.cust_no}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.cust_name}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.phone_no}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.emp_no}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.next_day}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.dtype_cd}"></c:out></td>
					<td class="body"><c:out value="${taskSchExcel.create_date}"></c:out></td>
				</tr>
			</c:forEach>
		</c:if>
			
		<c:if test="${taskSchExcel.size() == 0}">
			<tr style="cursor: default; background-color: white;">
				<td colspan="9" style="height: 100%; text-align: center;"><b>검색 결과가 없습니다.</b></td>
			</tr>
		</c:if>
	</tbody>
</table>
</body>
</html>