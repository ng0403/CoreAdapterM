<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/common.css" type="text/css" />
<script type="text/javascript">
function goLoginHome() {
	location.href= '${ctx}/logout';
}
</script>
<div align="center" style="width: 100%; line-height: 100%; padding-top: 10%;">
	<div style="background-image: URL(${ctx}/resources/images/error.jpg); background-repeat: no-repeat; width: 710px; height: 360px;">
		<input type="button" class="back_btn" value="로그인 페이지로 이동" onclick="goLoginHome();" style="top: 290px; left: 200px; position: relative;">
	</div>
</div>