<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>서브메뉴</title>
<input type="hidden" id="ctx" value="${ctx}">
<div id="subDIV">
	<ul>
		<%-- <c:forEach var="submenu" items="${subMenuList}">
			<li
				<c:if test="${submenu.menu_url == sub_menu_url}">
					style="background-color: #98bccd;"
				</c:if>
			>
				<a onclick="menuMoveFunc('${ctx}/${submenu.menu_url}', '${submenu.up_menu_id}');" style="cursor: pointer;">
					<input type="hidden" id="main_menu_id" value="${submenu.up_menu_id}">
					${submenu.menu_nm}
				</a>
			</li>
		</c:forEach>
		<c:if test="${subMenuList.size() == 0}">
			<li>
				<span>&nbsp;</span>
			</li>
		</c:if> --%>
	</ul>
</div>
