/**
업 무 명 : authmenu_modal_JS 메뉴권한 모달창
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/08/27
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/08/27
내 용 : 권한메뉴의 모달창에 대한 javascript 코드이다.
*참고사항 : 
*/

/* 권한메뉴 리스트 > 권한메뉴 추가 모달창 */
$(document).ready(function(){
	var ctx = $("#ctx").val();
	
	//리스트 체크박스 선택, 해제
	$("#chk").click(function(){
		//전체 선택 체크박스가 체크된 상태일 경우
		if($("#chk").prop("checked")){
			//전체 체크박스 체크
			$("#amModalTableDB input[type=checkbox]").prop("checked", true);
		} else {
			//전체 체크박스 해제
			$("#amModalTableDB input[type=checkbox]").prop("checked", false);
		}
	});
	
	/* 메뉴권한 추가에서 메뉴 검색 버튼 눌렀을 때 modal 팝업 띄우기 */
	$("#authmenu_add_btn").click(function() {
		
		$.blockUI({ 
			message: $('#authmenu_srh_modal')
	      , css: { width: '600'
			  	 , height: "367"
			     , top: "20%"
			     , left: "35%"
			 } 
		}); 
	});
	
	$("#cod_save").click(function() {
		var count = 0;
		
		var list_menuId_length = $("input:checkbox[name=authmenu_chk]").length;
		
		var authmenu_chk = $("input:checkbox[name=authmenu_chk]");
		
		var chked_val = [];  //menu_id
		var m_menu_nmArr = [];  //menu_nm
		var m_up_menu_idArr = [];  //up_menu_id
		$(":checkbox[id='chk_am']:checked").each(function(index, item){
			chked_val[index] = item.value;
			
			var m_menu_nm = $(this).parent().parent().children().find($(".Modalmenu_name")).val();
			m_menu_nmArr[index] = m_menu_nm;
			
			var m_up_menu_id = $(this).parent().parent().find($("td[id=m_up_menu_id]")).text();
			m_up_menu_idArr[index] = m_up_menu_id;
			
			count++;
		});

		if(count != 0){
			var conf = confirm("정말 선택하시겠습니까?");
			if(conf){
				if(list_menuId_length == 0){
					for(var i=0; i<chked_val.length; i++){
						var add_authmenu ='<tr>'
											+ ' <td style="width: 2.9%;"><input type="checkbox" class="am_chkbox" name="authmenuListCheck" value="' +chked_val[i] +m_menu_id + '"></td>'
											+ '	<td style="width: 19.35%;"><input type="text" class="authAddInput" name="menu_id" value="' +chked_val[i]+ '" readonly="readonly"></td>'
											+ '	<td style="width: 35.05%;"><input type="text" class="authAddInput" name="m_menu_nm" value="' +m_menu_nmArr[i]+ '" readonly="readonly"></td>'
											+ '	<td style="width: 18.4%;"><input type="text" class="authAddInput" name="m_up_menu_id" value="' +m_up_menu_idArr[i]+ '" readonly="readonly"></td>'
											+ '	<td style="width: 6.3%;"><input type="checkbox"  name="crt_yn"  id="crt_yn"  value="Y"></td>'
											+ '	<td style="width: 6.28%;"><input type="checkbox" name="mdfy_yn" id="mdfy_yn" value="Y"></td>'
											+ '	<td style="width: 6.35%;"><input type="checkbox" name="del_yn"  id="del_yn"  value="Y"></td>'
											+ '	<td style="width: 6.1%;"><input type="checkbox"  name="rtrv_yn" id="rtrv_yn" value="Y"></td>'
											+ '	</tr>';
						$("#authmenuTbody").append(add_authmenu); // tbody에 추가
					}
					
					$.unblockUI();
					$("#authmenu_am_btn_div").hide();
					$("#authmenu_add_btn_div").show();
				}
				
				if(list_menuId_length != 0){
					for(var i=0; i<chked_val.length; i++){
						var j=0;
						while(j<list_menuId_length){
							if(chked_val[i] == authmenu_chk[j].value){
								break;
							} else{
								j++
								if(j==list_menuId_length){
									var add_authmenu ='<tr>'
										+ ' <td style="width: 2.9%;"><input type="checkbox" class="am_chkbox" name="authmenuListCheck" value="' +chked_val[i] +m_menu_id + '"></td>'
										+ '	<td style="width: 19.35%;"><input type="text" class="authAddInput" name="menu_id" value="' +chked_val[i]+ '" readonly="readonly"></td>'
										+ '	<td style="width: 35.05%;"><input type="text" class="authAddInput" name="m_menu_nm" value="' +m_menu_nmArr[i]+ '" readonly="readonly"></td>'
										+ '	<td style="width: 18.4%;"><input type="text" class="authAddInput" name="m_up_menu_id" value="' +m_up_menu_idArr[i]+ '" readonly="readonly"></td>'
										+ '	<td style="width: 6.3%;"><input type="checkbox"  name="crt_yn"  id="crt_yn"  value="Y"></td>'
										+ '	<td style="width: 6.28%;"><input type="checkbox" name="mdfy_yn" id="mdfy_yn" value="Y"></td>'
										+ '	<td style="width: 6.35%;"><input type="checkbox" name="del_yn"  id="del_yn"  value="Y"></td>'
										+ '	<td style="width: 6.1%;"><input type="checkbox"  name="rtrv_yn" id="rtrv_yn" value="Y"></td>'
										+ '	</tr>';
									
									$("#authmenuTbody").append(add_authmenu); // tbody에 추가
								}
							}
						}
					}
					$.unblockUI();
					$("#authmenu_am_btn_div").hide();
					$("#authmenu_add_btn_div").show();
				}
				
				if(add_authmenu == null){
					alert("중복된 메뉴가 존재합니다.");
					$.unblockUI();
					$("input:checkbox[name=chk_am]").attr("checked", false);
					$("#authmenu_am_btn_div").show();
					$("#authmenu_add_btn_div").hide();
				}
			}
		} else {
			alert("항목을 선택해주세요.");
		}
	});
});

function authmenu_Mclose() {
	$.unblockUI();
	$("input:checkbox[name=chk_am]").attr("checked", false);
}
