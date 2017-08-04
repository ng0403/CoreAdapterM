<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
function checkEndYN(){
	if(document.getElementsByName("endYN")[0].checked){		
		$("#end_yn").val("");
	}else{
		$("#end_yn").val("Y");
	}
}

</script>

<!-- 가맹점 전문조회 모달창 시작 -->
<div id="franchiseeModalDiv" style="display: none;">
    <div style="width: 100%; height:7%; background-color: #ececec;" align="right">
 		<input type="button" value="X" id="popupBoxClose" onclick="doPopupClose();" >
 	</div>
	<form method="post" name="popupFranchiseForm" id="popupFranchiseForm">
	<div id="franModalContent">
		<div class="titleDIV" style="text-align: left; width: 100%;">
			<span class="titleText">■ 가맹점 리스트</span>
		</div>
		<div id="franchiseeModalList" class="commonList">
			 	<table id="franchiseeModalTables" class="commonTable">
			 	 	<thead>
			 	 		<tr id="franchiseListTableHeader">
			 	 			<td><b>검색범위</b>&nbsp;&nbsp;
								<select id="schGubun" name="schGubun" style="font-size:10.5px; padding:0.4em 0.4em;">
									<option value="NM">가맹점명</option>
									<option value="ID">가맹점ID</option>
								</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input type='text' id="searchNm" name="searchNm" style='width:150px'/>&nbsp;&nbsp;
								<input type='checkbox' name= 'endYN' value="${end_yn}" onclick="checkEndYN();" checked = "checked"/> 폐점포함&nbsp;&nbsp;&nbsp;&nbsp;
								<input type='button' value='검색' class="back_btn" onclick="franchiseSearch();" />
							</td>				
			 	 		</tr>
			 	 	</thead>
			 	</table>
			 	<br>
			 	<table class="commonTable">
			 		<thead>
			 			<tr id="franchiseListTableHeader">
						  <th width='10%'>No</th>
						  <th width='60%'>가맹점명</th>
						  <th width='30%'>가맹점ID</th>
						</tr>	
			 		</thead>
			 	 	<tbody id='contractDetail'></tbody>
				</table>
			<!-- 페이징 DIV -->
			<div class="pagingDiv" id="franPagingDiv" style="width: 100%; text-align: center;"></div>
		</div>	
	
	<input type="hidden" id="up_id" name="up_id"/>
	<input type="hidden" id="end_yn" name="end_yn"/>
	</div>
	</form>
	<!-- 페이징 전용 폼 -->
	<input type="hidden" id="h_schGubun" name="schGubun">
	<input type="hidden" id="h_searchNm" name="searchNm"/>
	<!-- 페이징 전용 폼 -->
</div>