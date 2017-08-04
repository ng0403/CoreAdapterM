/**
업 무 명 : 고객 통합 상세정보 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 고객 통합 상세정보에 대한 javascript 코드이다.
*참고사항 : 
*/

//고객 통합 정보 리스트로 이동 버튼
function go_custManager_list() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/customerManager');
	$form.attr('method', 'post');
	$form.appendTo('body');
	viewLoadingShow();
	$form.submit();
}

//카드발급내역 > 카드상태 수정
function CardStatusChange() {
	var ctx = $('#ctx').val();
	var doubleChck =0;
	
 	count = $("#custManagerCardTbody input[name='hkey_wid']").length;
 	if(count==0){
 		alert("카드상태를 수정할 수 있는 카드발급내역이 없습니다.");
 		return false;
 	} else if(count>0){
 	var save_card_comfirm = confirm("카드상태를 수정 하시겠습니까?");
	if(save_card_comfirm){
		var param = "";
	 	for(var i=0; i<count; i++){
			param += $("#custManagerCardTbody input[name='hkey_wid']").eq(i).val()
			       +","+$("[name='cardStatus'] option:selected").eq(i).val();
			if(i != count-1){
				param += ",";
			}
	 		//카드 사용중 중복 체크
			 if ($("[name='cardStatus']").eq(i).val() =='001'){
				 doubleChck +=1;
			 }
	 	}
	 	param += "," + $("#id").val(); 
	 	
	 	if (doubleChck >1){
	 		alert("사용중인 카드가 2개 이상 될 수 없습니다.");
	 		return;
	 	}
	 	
	 	$.ajax({   
	 		url: ctx+'/cardStatusUpdate',   
	 		type: "POST",  
	 		data: "cardInfo="+param,
	 		success: function(data) { 
	 			
	 			var elemStr = "";
	 			custManagerCardListCount = $("#custManagerCardTbody input[name='hkey_wid']").length;
				$("#custManagerCardTbody tbody").empty();
		 		for(var i=0; i<custManagerCardListCount; i++){
		 			elemStr = '<tr><input type="hidden" id="h_id"         name="h_id"         value='+data.custManagerCardList[i].id+'>'
		 			    		+ '<input type="hidden" id="hkey_wid"     name="hkey_wid"     value='+data.custManagerCardList[i].key_wid+'>'
		 			    		+ '<input type="hidden" id="hcard_status" name="hcard_status" value='+data.custManagerCardList[i].card_status+'>'
								
		 			    		+ '<td style="width: 9.18%;">'+data.custManagerCardList[i].key_wid+'</td>'
								+ '<td style="width: 9.189%;">'+data.custManagerCardList[i].category_type_nm+'</td>'
								+ '<td style="width: 9.21%;">'+ 
									'<select name="cardStatus">'
										 +"<option value='001'" + (data.custManagerCardList[i].card_status == '001' ? 'selected' : '') +">"+ '사용중' +"</option>"
										 +"<option value='002'" + (data.custManagerCardList[i].card_status == '002' ? 'selected' : '') +">"+ '일시정지' +"</option>"
										 +"<option value='003'" + (data.custManagerCardList[i].card_status == '003' ? 'selected' : '') +">"+ '해지' +"</option>"
							 	   +'</select>'
								+ '</td>'
								+ '<td style="width: 9.2%;">'+data.custManagerCardList[i].channel_div+'</td>'
								+ '<td style="width: 11%;">' +data.custManagerCardList[i].created+'</td></tr>';
					$("#custManagerCardTbody tbody").append(elemStr);
		 		}
		 		alert(data.custCardUpdate);
	 		}, 
	 		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
	 		error: function(data) { 
	 			alert("오류 발생!!");
	 			return false;
	 		}
	 	}); 
	}
}
}

