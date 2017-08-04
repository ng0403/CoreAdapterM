$(document).ready(function() {
	
	var add_cnt = 1;
	 
	var ctx = $("#ctx").val();
	var gift_wid = $("#gift_wid").val();
	var active_flg = $("#hactive_flg").val();
	
	//상품권관리 상세정보 버튼활성화 / 비활성화
	$("#giftbon_detail_btn_div").show();
	$("#giftbon_mdfy_btn_div").hide();
	$("#giftbon_insert_btn_div").hide();
	
	$('#giftbon_form_tbl').delegate('#delImg', 'click', function(){
		
		del_cnt = $('.imgTd').children().size();
		
		if(del_cnt==2){
			alert("삭제할 내용이 없습니다.");
			return ;
		}
		
		$('#addImg').remove();
		$('#delImg').remove();
		$('.imgTd').append("<img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		$('.imgTd').append("<img src='"+ctx+"/resources/images/del.png' id='delImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		
		$('.imgTd').children().eq(del_cnt-3).remove();
		
	});
	
	$('#giftbon_form_tbl').delegate('#addImg', 'click', function(){
		
		add_cnt = $('.imgTd').children().size();
		
		if(add_cnt>6){
			alert("브랜드 설정은 최대 5개 입니다.");
			return ;
		}
		$.ajax({
			type: "POST",  
			url: ctx+"/giftBrandList",
			dataType : "json",
			success: function(data) {
				
				$('.imgTd').append("<select id='brand_wid"+ (add_cnt-1) +"' name='brand_wid" + (add_cnt-1) + "' style='margin-left: 5px; '>");
				$('.imgTd select:last').append("<option value='0'>선택해 주십시오</option>");
				
				$.each(data.brandList, function(i) {
					
					$('.imgTd select:last').append("<option value="+this.brand_wid+">"+this.brand_name+"</option>");
					
				});
				
				$('.imgTd').append("</select>");
				$('#addImg').remove();
				$('#delImg').remove();
				$('.imgTd').append("<img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
				$('.imgTd').append("<img src='"+ctx+"/resources/images/del.png' id='delImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
				add_cnt++;
				
			},error: function(data) { 
					alert("정보 수정에 실패했습니다.");
					return false;
				}	
			});
	});
	
	// 상품권관리 추가 기능
	$("#giftbon_detail_add").click(function() {
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/giftbonForm');
	     $form.attr('method', 'post');
	     $form.attr('enctype', 'multipart/form-data');
	     $form.appendTo('body');
	     var gift_wid_input = $('<input type="hidden" value="'+gift_wid+'" name="gift_wid">');
	     var active_flg_input = $('<input type="hidden" value="'+active_flg+'" name="active_flg">');
	     var giftAddMdfyFlag_input = $('<input type="hidden" value="0" name="giftAddMdfyFlag">');
	     var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
	     
	     $form.append(giftAddMdfyFlag_input);
	     $form.append(gift_wid_input);
	     $form.append(file_input);
	     $form.append(active_flg_input);
	     viewLoadingShow();
	     $form.submit();
	});
	
	// 상품권관리 편집 기능
	$("#giftbon_detail_mdfy").click(function() {
		$("#giftbon_insert_btn_div").hide();
		$("#giftbon_detail_btn_div").hide();
		$("#giftbon_mdfy_btn_div").show();
		
		$("#giftbon_detail input[type=text]").attr("readonly", false);
		$("#giftbon_form_tbl input[type=radio]").prop("disabled", false);
		$("#giftbon_form_tbl select").prop("disabled", false);
		$("#file").attr("disabled", false);
		$("#gift_wid").attr("disabled", false);
		$("#web_description").prop("readonly",false);
		$("#gift_description").prop("readonly",false);
		
		$('.imgTd').append("<img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		$('.imgTd').append("<img src='"+ctx+"/resources/images/del.png' id='delImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		
		$("#gift_name").focus();
	});
	
	// 상품권 등록 저장
	$("#giftbon_addsave").click(function() {
		
		if($("#gift_file").val()==0 || $("#gift_file").val()==null){
			alert("파일선택 선택해주세요");
			return false;
		}else if($("#gift_name").val()=="" || $("#gift_name").val()==null){
			alert("상품권명을 입력해주세요");
			return false;
		}else if($("#gift_amt").val()=="" || $("#gift_amt").val()==null){
			alert("할인금액을 입력해주세요");
			return false;
		}else if($("#exp_dt").val()=="" || $("#exp_dt").val()==null){
			alert("유효기간을 입력해주세요");
			return false;
		}else if($("#callback_no").val()=="" || $("#callback_no").val()==null){
			alert("콜백번호를 입력해주세요");
			return false;
		}else if($("#from_aply_amt").val()=="" || $("#from_aply_amt").val()==null){
			alert("대상구매액 시작금액을 입력해주세요.");
			return false;
		}else if($("#to_aply_amt").val()=="" || $("#to_aply_amt").val()==null){
			alert("대상구매액 종료금액을 입력해주세요. (전체적용시 0)");
			return false;
		}else if($("#max_limit_amt").val()=="" || $("#max_limit_amt").val()==null){
			alert("정률 최대사용금액을 입력해주세요. (제한없을 시 0)");
			return false;
		}else if($("#web_description").val()=="" || $("#web_description").val()==null){
			alert("구매시 안내문구를 입력해주세요");
			return false;
		}else if($("#gift_description").val()=="" || $("#gift_description").val()==null){
			alert("발송시 안내문구를 입력해주세요");
			return false;
		}
		
		var brandListSize = $('.imgTd').children().size();
		
		for(var i =1; i<brandListSize; i++){
			if($('#brand_wid' +i).val()=='0'){
				alert("브랜드를 입력해주세요");
				return;
			}
		}
		
		var addYn = confirm("저장 하시겠습니까?");
		if(addYn){
			var form = $('#giftbonDetailForm');
			var giftAddMdfyFlag_input = $('<input type="hidden" value="1" name="giftAddMdfyFlag">');
			form.append(giftAddMdfyFlag_input);
			viewLoadingShow();
			form.submit();
		} 
	});
	
	// 상품권 추가 취소 기능
	$("#giftbon_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		alert(gift_wid+active_flg);
		if(addYn){
			if($("#giftAddMdfyFlag").val() == '0' && gift_wid == ''){
				giftbonActiveFormSubmit('/giftbonManager', '');
			}else{
				goGiftbonForm(gift_wid, active_flg);
			}
		} else {
			return false;
		}
	});

	// 상품권 편집 취소 기능
	$("#giftbon_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			goGiftbonForm(gift_wid, active_flg);
		} else {
			return false;
		}
	});
});

// 동적폼생성
function giftbonActiveFormSubmit(url, gift_wid) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	var gift_wid_input = $('<input type="hidden" value="'+gift_wid+'" name="gift_wid">');
	
	$form.append(gift_wid_input);
	viewLoadingShow();
//	$form.append(menuIDinput);
	$form.submit();
}

// 상품권관리 추가부분 내용초기화
function giftbonAddFormFunc() {
	var ctx = $("#ctx").val();
	
	$("#giftbon_form_title").text("상품권 추가");
	$("#giftbon_detail_btn_div").hide();
	$("#giftbon_mdfy_btn_div").hide();
	$("#giftbon_insert_btn_div").show();

	$("#giftbon_detail input[type=text]").val('');
	$("#giftbon_detail select > option[value=0]").attr("selected", "selected");
	$("#active_flg_y").prop("disabled",false);
	$("#active_flg_n").prop("disabled",false);
	$("#giftbon_detail input[type=text]").attr("readonly", false);
	$("#giftbon_form_tbl input[type=radio]").prop("disabled", false);
	$("#giftbon_form_tbl select").prop("disabled", false);
	$("#web_description").val('');
	$("#web_description").attr("readonly", false);
	$("#gift_description").val('');
	$("#gift_description").attr("readonly", false);
	
	$('.imgTd').children().remove();
	$('.imgTd').append("&nbsp <img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%;'>");
	$("#gift_file").focus();
	clearFileInputField();
}

//이미지파일체크
function file_Check(file) {
	banArray = new Array(".jpg", ".bmp", ".gif", ".png", ".pcx"); // 걸러낼 확장자를 등록
	banFile = false;
	while (file.indexOf("\\") != -1){
		file = file.slice(file.indexOf("\\") + 1);
		ban = file.substring(file.lastIndexOf('.'), file.length).toLowerCase();
		for (var i = 0; i < banArray.length; i++) {
			if (banArray[i] == ban) {
				banFile = true;
			}
		}
		if (banFile == false) {
			alert(ban + " 파일은 첨부할 수 없는 파일입니다.");
			clearFileInputField();
			break;
		}
	}
	return banFile;
}

//파일부분삭제
function clearFileInputField() {
	$('#gift_file').remove();	//파일 엘리멘트 삭제
	$('#divFile').append("<input name='file' id='gift_file' size='40' type='file' class='input1' onchange='previewGiftbon();'>");	//div에 파일엘리멘트 새로 생성
	$('#preview').remove();
}

//상품권 연장
function gift_exp_extension(gift_wid){
	
	var ctx = $("#ctx").val();
	var param = {
			gift_wid : gift_wid
	}
	
	$.ajax({
		type: "POST",  
		url: ctx+"/giftExpCountCheck",
		data: param,
		dataType : "text",
		success: function(data) {
			
			if(data <= 19){
				alert(data + "회 연장하였습니다.");
				if(confirm("기간연장 하시겠습니까?")){
					$.ajax({
						type: "POST",  
						url: ctx+"/giftExpDtExtension",
						data: param,
						dataType : "text",
						success: function(data) {
							
							if(data=="error"){
								alert("기간연장에 실패했습니다.");
							}else{
								alert("기간연장 되었습니다.");
								$('#exp_dt').val(data);
							}
						},
						beforeSend: function(){
					    	viewLoadingShow();			
					    },
					    complete:function(){
					    	viewLoadingHide();
					    },
						error: function(data) { 
							alert("기간연장에 실패했습니다.");
							return false;
						}
					});
					
				};
			}else{
				alert("5년 연장 초과");
				return ;
			}
		},
		beforeSend: function(){
	    	viewLoadingShow();			
	    },
	    complete:function(){
	    	viewLoadingHide();
	    },
		error: function(data) { 
			alert("정보 수정에 실패했습니다.");
			return false;
		}	
	});
	
}

//상품권수정
function modGiftbon() {
	
	if($("#gift_name").val()=="" || $("#gift_name").val()==null){
		alert("상품권명을 입력해주세요");
		return false;
	}else if($("#gift_amt").val()=="" || $("#gift_amt").val()==null){
		alert("할인금액을 입력해주세요");
		return false;
	}else if($("#exp_dt").val()=="" || $("#exp_dt").val()==null){
		alert("유효기간을 입력해주세요");
		return false;
	}else if($("#callback_no").val()=="" || $("#callback_no").val()==null){
		alert("콜백번호를 입력해주세요");
		return false;
	}else if($("#from_aply_amt").val()=="" || $("#from_aply_amt").val()==null){
		alert("대상구매액 시작금액을 입력해주세요.");
		return false;
	}else if($("#to_aply_amt").val()=="" || $("#to_aply_amt").val()==null){
		alert("대상구매액 종료금액을 입력해주세요. (전체적용시 0)");
		return false;
	}else if($("#max_limit_amt").val()=="" || $("#max_limit_amt").val()==null){
		alert("정률 최대사용금액을 입력해주세요. (제한없을 시 0)");
		return false;
	}else if($("#web_description").val()=="" || $("#web_description").val()==null){
		alert("구매시 안내문구를 입력해주세요");
		return false;
	}else if($("#gift_description").val()=="" || $("#gift_description").val()==null){
		alert("발송시 안내문구를 입력해주세요");
		return false;
	}
	
	var brandListSize = $('.imgTd').children().size();
	
	for(var i =1; i<brandListSize; i++){
		if($('#brand_wid' +i).val()=='0'){
			alert("브랜드를 입력해주세요");
			return;
		}
	}
	
	var ctx = $("#ctx").val();
	var addYn = confirm("저장 하시겠습니까?");
	if(addYn){
		var url = "/modGiftbon";								//입력항목 수정액션
		var fileChanged = false;
		if($('#file').val() != null && $('#file').val() != ''){	//이미지 파일 변경 여부
			fileChanged = true;
			setFileName();
		}	
		if(fileChanged){										//이미지 변경시
			url = "/modImageGiftbon";							//이미지파일 수정액션
		}
		// 비동기로 form 데이타 전송
		var options = {
			 type:"POST",
				url: ctx+url,
			success: function(data) {
	        	if(data.giftResult != 1){
	        		alert("상품권 수정에 실패하였습니다.");
	        		return;
	        	}else{			
		        	alert("상품권이 정상적으로 수정되었습니다.");
		        	goGiftbonForm(data.gift_wid, data.active_flg)
	        	}
			},
			error: function(data) { 
				alert("상품권수정에 실패하였습니다.");
				return false;
			}
		};
		$("#giftbonDetailForm").ajaxSubmit(options);
	}
}

// 상품(메뉴) 검색
function doProdMenuPopupOpenForGiftBon() {
	
	$("#s_nm_menu").val("");
	
	// 팝업창 표시
	$.blockUI({ message: $('#prodMenuModalDiv'),
    	css: { 
    	'left': '65%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '400px',
    	'height': '500px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});
	
	$("#pageNum").val("1");
	
	viewProdMenuListForGiftBon(1, 1);
}

/* 팝업창 가맹점목록 표시 */
function viewProdMenuListForGiftBon(prodMenuPageNum, schDiv) {
	var ctx = $("#ctx").val();

	var sendData = "";
	if(schDiv == 1){
		sendData = "nm_menu="+$("#s_nm_menu").val() +"&prodMenuPageNum="+prodMenuPageNum;
	}else if(schDiv == 2){
		sendData = "nm_menu="+$("#h_nm_menu").val() +"&prodMenuPageNum="+prodMenuPageNum;
	}
	$.ajax({
		url: ctx + "/prodMenuListAjax", 
		type: "POST",  
		data: sendData,
		dataType: "json",
		success: function(data) { 
			
			$("#prodMenuTbody").empty();

			$("#s_nm_menu").bind("keypress", function(event) {
				prodMenuEnterSearch(event);
			});
			
			if (data.prodMenuList.length == 0) {
				var trElement = $("#prodMenuchiseListTableHeader").clone().removeClass().empty();
				$("#prodMenuTbody").append(trElement);
				$("#prodMenuTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				$.each(data.prodMenuList, function(i) {
					var trElement = $("#prodMenuListTableHeader").clone().removeClass().empty();
					var cd_menu = this.cd_menu;
					var nm_menu = this.nm_menu;
					var sales_price = this.sales_price;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						$("#cd_menu").val(cd_menu);
						$("#nm_menu").val(nm_menu);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#prodMenuTbody").append(trElement);
					$("#prodMenuTbody tr:last").append("<td align='center' width='10%'>" 
							+ (i + 1 + ((eval(data.prodMenuPageNum) - 1) * 10)) + "</td>"
							+ "<td width='60%'>" + nm_menu + "</td>"
							+ "<td width='30%'>" + sales_price + "</td>");
				});
			}
			
			// 페이징 다시그리기
			$("#prodMenuPagingDiv").empty();
			var pageContent = "";
			if(data.prodMenuPage.endPageNum == 0 || data.prodMenuPage.endPageNum == 1){
				pageContent = "◀ <input type='text' id='prodMenuPageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.prodMenuPageNum == data.prodMenuPage.startPageNum){
				pageContent = "<input type='hidden' id='prodMenuPageNum' value='"+data.prodMenuPageNum+"'/><input type='hidden' id='prodMenuEndPageNum' value='"+data.prodMenuPage.endPageNum+"'/>"
				+"◀ <input type='text' id='prodMenuPageInput' value='"+data.prodMenuPage.startPageNum+"' onkeypress=\"prodMenuPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewProdMenuListForGiftBon("+data.prodMenuPage.endPageNum+",2);\" id='pNum' style='cursor: pointer;'> / "+data.prodMenuPage.endPageNum+"</a>"
				+"<a onclick=\"viewProdMenuListForGiftBon("+(data.prodMenuPageNum+1)+",2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			} else if(data.prodMenuPageNum == data.prodMenuPage.endPageNum){
				pageContent = "<input type='hidden' id='prodMenuPageNum' value='"+data.prodMenuPageNum+"'/><input type='hidden' id='prodMenuEndPageNum' value='"+data.prodMenuPage.endPageNum+"'/>"
				+"<a onclick=\"viewProdMenuListForGiftBon("+(data.prodMenuPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='prodMenuPageInput' value='"+data.prodMenuPage.endPageNum+"' onkeypress=\"prodMenuPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.prodMenuPage.endPageNum+"</a> ▶";
			} else {
				pageContent = "<input type='hidden' id='prodMenuPageNum' value='"+data.prodMenuPageNum+"'/><input type='hidden' id='prodMenuEndPageNum' value='"+data.prodMenuPage.endPageNum+"'/>"
				+"<a onclick=\"viewProdMenuListForGiftBon("+(data.prodMenuPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='prodMenuPageInput' value='"+data.prodMenuPageNum+"' onkeypress=\"prodMenuPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewProdMenuListForGiftBon("+data.prodMenuPage.endPageNum+",2);\" id='pNum' style='cursor: pointer;'> / "+data.prodMenuPage.endPageNum+"</a>"
				+"<a onclick=\"viewProdMenuListForGiftBon("+(data.prodMenuPageNum+1)+",2);\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#prodMenuPagingDiv").append(pageContent);
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("가맹점목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

//가맹점 리스트 엔터키 기능
function prodMenuEnterSearch(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		viewProdMenuListForGiftBon(1, 1);
	}
	event.stopPropagation();
}

// 가맹점 리스트 페이징 엔터 기능
function prodMenuPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var prodMenuPageNum = parseInt($("#prodMenuPageInput").val());
			if ($("#prodMenuPageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#prodMenuPageInput").val($("#prodMenuPageNum").val());
				$("#prodMenuPageInput").focus();
			} else if(prodMenuPageNum > parseInt($("#prodMenuEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#prodMenuPageInput").val($("#prodMenuPageNum").val());
				$("#prodMenuPageInput").focus();
			} else if (1 > prodMenuPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#prodMenuPageInput").val($("#prodMenuPageNum").val());
				$("#prodMenuPageInput").focus();
			} else {
				viewProdMenuListForGiftBon(prodMenuPageNum, 2);
			}
		}
		event.stopPropagation();
	});
}

function prodMenuPopupClose(){
	
	$.unblockUI();
	
}