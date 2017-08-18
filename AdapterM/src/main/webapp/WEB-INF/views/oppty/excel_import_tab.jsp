<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 
<!DOCTYPE html>
<html>
<head>
<c:set var="result" value="${result}" />
<c:set var="ctx" value="${pageContext.request.contextPath }" />

<script src="${ctx}/resources/common/js/jquery-1.11.1.js"></script>
<script src="${ctx}/resources/common/js/opty/oppty.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Insert title here</title>

<script type="text/javascript">
 $(document).ready(function() {
	 var result = $("#result").val();
	 if(result > 0){
	 	console.log(result);
		 opener.parent.location.reload();
// 		 sleep(1*1000);
		 window.open("about:blank","_self").close();
	 }
 });
 
 </script>

</head>
<body>
	<input type="hidden" id="ctx" value="${ctx}">
	<input type="hidden" id="result" value="${result}">
		<!-- Modal Main Div -->
	<div>
		<div style="text-align: center; margin-top: 10%;">
			<form id="excelUploadForm" name="excelUploadForm" enctype="multipart/form-data" method="post"action="${ctx}/opptyExcelUploadAjax"> 
				<input id="excelFile" type="file" name="excelFile" class="btn btn-default" style="float: center;"/>
				<input type="button" id="addExcelImpoartBtn" class="btn btn-default" onclick="opptyExcelCheck();" value="업로드" style="float: center;">
			</form>
		</div>
		
	</div>
	
</body>
</html>


