/**
업 무 명 : 전문 관리 상세 화면
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/07/30
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/07/30
내 용 : 전문 관리 상세에 대한 javascript 코드이다.
*참고사항 :  
 */

$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	var allChk = false; // 전체 체크 flag
	// 전체 체크, 해제
	$("#telegram_item_allchk").click(function(){
		if($("#telegram_item_allchk").prop("checked")){
			$("input[type=checkbox]").prop("checked", true);
			allChk = true;
		} else {
			$("input[type=checkbox]").prop("checked", false);
			allChk = false;
		}
	});
	
	// 하나 선택시 전체 체크만 해제
	$("#telegram_item_chk").click(function() {
		$("#telegram_item_allchk").prop("checked", false);
	});
	
	// 전문 항목 편집 기능
	$("#telegram_item_mdfy").click(function() {
		var mdfyYN = confirm("편집 하시겠습니까?");
		if(mdfyYN){
			$("#telegram_item_list input[type=checkbox]").prop("disabled", false);
			$("input[type=checkbox]").prop("checked", false);
			
			$("#tf_list_tbl_tbody input").prop("readonly", false);
			$("#tf_list_tbl_tbody input[type=text]").css("border-color", "#eaeaea");
			$("#tf_list_tbl_tbody input[id=tele_item_seq]").css("border-color", "white");
			$("#tf_list_tbl_tbody input[name=tele_fld_nm]").first().focus();
			
			$("#telegram_item_md").hide();
			$("#telegram_item_casc").show();
		}
	});
	
	
	// 컬럼 추가 기능
	$("#telegram_col_add").click(function() {
		// 컬럼이 추가된 이후 다시 저장될 컬럼 길이값
		var teleItemListSize = $("#teleItemListSize").val();
		if(teleItemListSize == 0){
			$("#tf_list_tbl_tbody > tbody").children().remove();
		}
		var afterRowsLen = $("#tf_list_tbl_tbody > tbody").children().length;
		// 전문 항목 row 추가
		var addTelCol ='<tr>'
							+ '<td style="width: 3%;"><input type="checkbox" id="telegram_item_chk"></td>'
							+ '	<td style="width: 5%;"><input type="text" class="tf_input" value="' + (afterRowsLen+1) + '" id="tele_item_seq" name="tele_item_seq" disabled="disabled" style="text-align: center; background-color: white;"></td>'
							+ '	<td style="width: 14%;"><input type="text" class="tf_input" value="" name="tele_fld_nm" maxlength="20"></td>'
							+ '	<td style="width: 14%;"><input type="text" class="tf_input" value="" name="tele_item_nm" maxlength="100"></td>'
							+ '	<td style="width: 7%;"><input type="text" class="tf_input_num" id="byte" name="tele_len" maxlength="5" onkeyup="numChk(this);"></td>'
							+ '	<td style="width: 45%;"><input type="text" class="tf_input" id="tele_item_desc" name="tele_item_desc" maxlength="4000"></td>'
							+ '	</tr>';
		$("#tf_list_tbl_tbody > tbody").append(addTelCol); // tbody에 추가
		$("#tf_list_tbl_tbody input[name=tele_fld_nm]").last().focus();
		$("#tf_list_tbl_tbody input[type=text]").css("border-color", "#eaeaea");
		$("#tf_list_tbl_tbody input[id=tele_item_seq]").css("border-color", "white");
	});
	
	var delTele_item_id = []; // item_id가 존재하는 컬럼이 삭제 되었을때 해당 id를 저장하는 변수
	
	// 컬럼 삭제 기능
	$("#telegram_col_del").click(function() {
		var rowsIndex = $("#tf_list_tbl_tbody > tbody").children().length;
		var chked_val = [];
		
		$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
			if($(this).val() != '') { // 원래 데이터를 삭제 했을 경우 id값을 저장
				var tele_item_id = $(this).parent().parent().children().find($('input[id=tele_item_id]')).val();// 해당 인덱스의 tele_item_id 찾기
				delTele_item_id[index] = tele_item_id; // 삭제된 tr의 id를 배열에 저장
				
				var thisVal = parseInt($(this).parent().parent().children().find($('input[id=tele_item_seq]')).val()); // 현재의 위치 값
				var downLen = $(this).parent().parent().nextAll().size(); // 현재 위치의 아래 값들의 길이
				
				$("input[id=tele_item_seq]").each(function(index, item) {
					var chngVal = parseInt($(this).val()); // 바뀔 값
					if(thisVal < chngVal){
						$(this).val(chngVal-1); // 현재의 값보다 -1한 값을 세팅
					}
				});
			}
			$(this).parent().parent().remove(); // 해당 index의 tr 삭제
		});
		
		if(allChk){  // 전체 체크 후 삭제 할 경우 모두 삭제 후 하나의 컬럼 자동 생성
			$("#telegram_item_allchk").prop("checked", false); // 전체 체크 해제
//			var addTelCol ='<tr>'
//				+ '<td style="width: 3%;"><input type="checkbox" id="telegram_form_chk" value="1" name="tele_item_seq"></td>'
//				+ '	<td style="width: 5%;"><input type="text" class="tf_input" value="1" id="tele_item_seq" name="tele_item_seq" disabled="disabled" style="text-align: center; background-color: white;"></td>'
//				+ '	<td style="width: 14%;"><input type="text" class="tf_input" value="" name="tele_fld_nm" autofocus="autofocus"></td>'
//				+ '	<td style="width: 14%;"><input type="text" class="tf_input" value="" name="tele_item_nm"></td>'
//				+ '	<td style="width: 7%;"><input type="text" class="tf_input_num" value="" name="tele_len"></td>'
//				+ '	<td style="width: 45%;"><input type="text" class="tf_input" name="tele_item_desc"></td>'
//				+ '	</tr>';
//			$("#tf_list_tbl_tbody > tbody").append(addTelCol); // tbody에 추가
		}
	});
	
	// 선택한 컬럼 위로 이동
	$('#telegram_col_up').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var prvChkNum; // 바로 위의 seq
			$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				
				chkNum = currTr.children().find($('input[id=tele_item_seq]')).val(); // 선택된 컬럼의 seq
				
				prvChkNum = currTr.prev().children().find($('input[id=tele_item_seq]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == 1){
				alert("더 이상 위로 이동할 수 없습니다.");
				return false;
			} else {
				$("#tf_list_tbl_tbody tbody tr").eq(chkNum-2).before(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=tele_item_seq][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=tele_item_seq]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=tele_item_seq]")).attr("value", prvChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=tele_item_seq]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.next().find($("input[name=tele_item_seq]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
	
	// 선택한 컬럼 아래로 이동
	$('#telegram_col_down').click(function(){
		var chkCnt = 0;
		// 체크된 값을 카운트
		$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
			chkCnt++;
		});
		
		if(chkCnt == 0){
			alert("이동할 대상을 선택하세요");
			return false;
		} else if(chkCnt > 1){
			alert("하나의 대상만 이동 가능합니다.");
			$("input[type=checkbox]").prop("checked", false);
			return false;
		} else {
			var childLen = $("#tf_list_tbl_tbody tbody").children().length; // tr의 개수
			var currTr; // 현재 컬럼 저장
			var chkNum; // 선택된 컬럼의 seq
			var nextChkNum; // 바로 위의 seq
			$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
				currTr = $(this).parent().parent(); // 선택된 chk의 tr값 가져오기
				
				chkNum = currTr.children().find($('input[id=tele_item_seq]')).val(); // 선택된 컬럼의 seq
				
				nextChkNum = currTr.next().children().find($('input[id=tele_item_seq]')).val(); // 바로 위의 seq
			});
			
			var moveTr = "<tr>" + currTr.html() + "</tr>"; // 선택된 컬럼에 tr 태그 붙이기
			
			if(chkNum == childLen){
				alert("더 이상 아래로 이동할 수 없습니다.");
				return false;
			} else {
				$("#tf_list_tbl_tbody tbody tr").eq(chkNum).after(moveTr); // 선택된 컬럼을 위로 이동
				currTr.remove(); // 원래의 tr을 삭제
				var moveAfterTr = $("input[id=tele_item_seq][value="+chkNum+"]").parent().parent(); // 이동 된 컬럼의 tr값을 가져옴
				moveAfterTr.children().find($('input[type=checkbox')).prop("checked", true); // 이동한 컬럼에 체크
				moveAfterTr.children().find($("input[name=tele_item_seq]")).removeAttr("value"); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.children().find($("input[name=tele_item_seq]")).attr("value", nextChkNum); // 이동한 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=tele_item_seq]")).removeAttr("value"); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
				moveAfterTr.prev().find($("input[name=tele_item_seq]")).attr("value", chkNum); // 이동한 컬럼의 다음 컬럼의 seq 값 변경
			}
		}
	});
	
	// 변경한 내용 저장
	$("#telegram_col_save").click(function() {
		var submitArr = [];
		$("input[type=checkbox]").prop("checked", true); // 저장 클릭시 전부 체크상태로 변경
		var chkCnt = 0;
		
		var insertTr = [];
		var updateTr = [];
		var insertCnt = 0;
		var updateCnt = 0;
		$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
			chkCnt++;
			if(chkCnt == 0){
				alert("항목이 존재하지 않습니다.");
				return false;
			} else {
				var currTr = $(this).parent().parent(); // 현재 index의 부모 tr값 저장
				// id값이 존재하지 않으면 insert
				if($(this).val() == 'on' && $(this).val() != '') {
					var tempElemet = '';
					currTr.children().find($('input')).each(function(index, item) {
						if($(this).val() != 'on' && $(this).val() != ''){ // 체크박스의 아이디를 제외
							tempElemet += $(this).val() + "@@"; // input의 내용 담기
						}
					});
					if(currTr.children().find($('input[id=tele_item_desc]')).val() == ''){
						tempElemet += "@@" + "-";
					}
					insertTr[insertCnt] = tempElemet;
					insertCnt++;
				} else { // 기존의 id가 존재하면 update
					var tempElemet = '';
					currTr.children().find($('input')).each(function(index, item) {
						if(index > 0){
							tempElemet += $(this).val() + "@@"; // input의 내용 담기
						}
					});
					if(currTr.children().find($('input[id=tele_item_desc]')).val() == ''){
						tempElemet += "@@" + "-";
					}
					updateTr[updateCnt] = tempElemet;
					updateCnt++;
				}
			}
		});
		
		var teleIVChk = teleItemValid(); // validation 체크
		// 전송할 값들을 배열에 세팅
		if(delTele_item_id.length != 0) submitArr[0] = delTele_item_id;
		if(updateTr.length != 0) submitArr[1] = updateTr;
		if(insertTr.length != 0) submitArr[2] = insertTr;
		var idArr = [];
		idArr[0] = $("#htele_id").val();
		submitArr[3] = idArr;
		if (teleIVChk == 1) {
			var saveChk = confirm("전문 항목을 저장 하시겠습니까?");
			if(saveChk){
				// Ajax 전송
				$.ajax({
					url: ctx+'/telegramItemSave',
					type:'post',
					data: JSON.stringify(submitArr),
					dataType : 'json',
					contentType : 'application/json',
					success:function(data){
						if(data == 1 || data == 2 || data == 3){
							alert("전문 항목이 저장 되었습니다.");
							teleItemActiveSubmit("/telegramItem");
						}
					}
				});
			}// if
		}// if
	});
	
	// 전문 항목 삭제
	$("#telegram_item_del").click(function() {
		var chked_val = [];
		var delCnt = 0;
		$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
			delCnt++;
		});
		if(delCnt > 0){
			var delOk = confirm("정말 삭제 하시겠습니까?");
			if(delOk){
				$(":checkbox[id='telegram_item_chk']:checked").each(function(index, item){
					var tele_item_id = $(this).val();// 해당 인덱스의 tele_item_id 찾기
					delTele_item_id[index] = tele_item_id; // 삭제된 tr의 id를 배열에 저장
				});
				delTele_item_id[delTele_item_id.length+1] = $("#htele_id").val(); // 전문 ID 넣기
				// Ajax 전송
				$.ajax({
		            url: ctx+'/telegramItemDelete',
		            type: 'post',
		            data: JSON.stringify(delTele_item_id),
		            dataType : 'json',
		            contentType : 'application/json',
		            success:function(data){
		            	if(data == 1){
		            		alert("전문 항목이 삭제 되었습니다.");
		            		teleItemActiveSubmit("/telegramItem");
		            	}
		            }
		        });
			} else {
				return false;
			}
		} else {
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		}
	});
	
	// 편집 내용 취소
	$("#telegram_col_cancel").click(function() {
		var cancelYN = confirm("편집한 내용을 취소 하시겠습니까?");
		if(cancelYN){
			teleItemActiveSubmit('/telegramItem');
		}
	});
	
	// 전문 상세로 이동
	/*$("#back_tele_form").click(function() {
		teleItemActiveSubmit('/telegramForm');
	});*/

});

// 동적 폼생성 POST 전송 함수
/*function teleItemActiveSubmit(url) {
	var ctx = $("#ctx").val();
	var tele_id = $("#htele_id").val();
	
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	var addMdfyFlagInput = $('<input type="hidden" value="2" name="form_flag">');
	var tele_id_input = $('<input type="hidden" value="'+tele_id+'" name="tele_id">');
	
	$form.append(tele_id_input).append(addMdfyFlagInput);
	$form.submit();
}*/

//전문 등록, 수정시 validation 체크 
function teleItemValid() {
	var chkNum = 0;
	$("#tf_list_tbl_tbody").find($("input")).each(function() {
		if(!$(this).is("#tele_item_desc") && $(this).val() == ''){
			alert("항목을 입력해주세요.");
			$(this).focus();
			chkNum = 0;
			return false;
		} else {
			chkNum = 1;
		}
	});
	$("input[type=checkbox]").prop("checked", false);
	return chkNum;
}
