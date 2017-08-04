<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
$(document).ready(function() {
	var ctx = $("#ctx").val();
	$("#logout").click(function(){
		var logoutYn = confirm("로그아웃 하시겠습니까?");
		if(logoutYn){
			location.href = ctx + "/logout";
		} else {
			return false;
		}
	});
});
</script>
<title>메인메뉴</title>
<div id="main_gnb">
	<c:forEach var="mainMenu" items="${mainMenuList}">
	<ul class="left">
		<li
			<c:if test="${mainMenu.menu_url == main_menu_url}">
				style="background-color: white;"
			</c:if>
		>
			<c:if test ="${empty mainMenu.up_menu_id}">
				<a onclick="menuMoveFunc('${ctx}/${mainMenu.menu_url}', '${mainMenu.menu_id}');"
					<c:if test="${mainMenu.menu_url == main_menu_url}">
						style="color: black; cursor: pointer;"
					</c:if>
				 style="cursor: pointer;">
					${mainMenu.menu_nm}
				</a> 
			</c:if>
		</li>
	</ul>
	</c:forEach>
	<ul class="right">
       <li><a href="#" id="logout">로그아웃</a></li>
   </ul>
</div> 
