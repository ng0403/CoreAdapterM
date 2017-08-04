$(function(){
	clickStoreSearchBtn(event);
	clickviewStoreNotPaiedSearchbtn(event);
	checkParameterData();
});

function clickStoreSearchBtn(event){	
	$('.back_btn').click(function(){
		
		if($('#brand_wid').val()==''){
			
			return false;
		}
	});
}

function clickviewStoreNotPaiedSearchbtn(event){
	$('#viewStoreNotPaiedSearchbtn').click(function(){
		
		
		if($('#brand_wid').val()!=""){		
			if($('#store_name').val()==''){
				alert("가맹점을 선택해주세요.");
				$("#store_search").focus();
				return false;
			}
		}else{
			alert("브랜드를 선택해주세요");
			$('#brand_wid').focus();
			return false;
		}

		if($('#store_name').val()=='' && $('#erp_id').val()==''){			
			return false;
		}	
		viewLoadingShow();
		$('#viewStoreNotPaiedform').submit();		
	});	
}

function enterviewStoreNotPaiedSearch(){
//	검색클릭 erp_id값이 널인지 확인 널이 아니면 브랜드 아이디값이 널인지 확인
//	널이면 포커스 아니면 가맹점값 검색 널이면 포커스 아니면 검색
	
		if($('#brand_wid').val()!=""){		
			if($('#store_name').val()==''){
				alert("가맹점을 선택해주세요.");
				$("#store_search").focus();
				return false;
			}
		}else{
			alert("브랜드를 선택해주세요");
			$('#brand_wid').focus();
			return false;
		}

		if($('#store_name').val()=='' && $('#erp_id').val()==''){			
			return false;
		}
	viewLoadingShow();
	$('#viewStoreNotPaiedform').submit();		
}

function checkParameterData(){
	
	if($('#brandTYPE').val()!=''){
		
		$('#brand_wid').val($('#brandTYPE').val());
		
	}
	if($('#storeWid').val()!=''){
		
		$('#store_wid').val($('#storeWid').val());
		$('#store_name').val($('#storeName').val());
		
	}
	
	if($('#brandTYPE').val()!=''){
		
		$('#brand_wid').val($('#brandTYPE').val());
		
	}
	
	if($('#trnsPosDiv').val()!=''){
		
		$('#trns_pos_div').val($('#trnsPosDiv').val());
		
	}
	
}
//검색창 엔터키 기능
function contPageNumInputEnter(event, url) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(parseInt($("#pageInput").val()) > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				// 컨트롤러로 전송
				var ctx = $("#ctx").val();
				// 동적 폼생성 POST 전송
				var $form = $('<form></form>');
				$form.attr('action', ctx + url);
				$form.attr('method', 'post');
				$form.appendTo('body');
				
				var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
				$form.append(pageNumInput);
				viewLoadingShow();
				$form.submit();
			}
		}
		event.stopPropagation();
	});
}