/**
업 무 명 : ERP 가맹점별 월포인트 정산 리스트 상세보기 모달화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/09/14
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/09/14
내 용 : ERP 가맹점별 월포인트 정산 리스트 상세보기 모달창에 대한 javascript 코드이다.
*참고사항 : 
*/

//ajax에서 fmt태그 대신 1000단위로 , 구분
function commify(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
  n += '';                          // 숫자를 문자열로 변환
 
  while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
 
  return n;
}

/* ERP 가맹점별 월포인트 리스트를 눌렀을 때 상세정보화면 */
function erpPointListDetail(erp_store_wid) {
	var ctx = $('#ctx').val();
	var param = "erp_store_wid="+erp_store_wid;
	
	$.ajax({
		url: ctx+'/erpPointAjax',   
		type: "POST",  
		data: param,
		dataType: 'json',
		success: function(data) {
//			alert(data.erpPointDetailList.length);
			$("#erpPointDetailTableDB tbody").empty();
			var elemStr = "";
			for (var i = 0; i < data.erpPointDetailList.length; i++) {
				//천단위 , 구분 메소드 호출
				var store_add_point = commify(data.erpPointDetailList[i].store_add_point);
				var store_del_point = commify(data.erpPointDetailList[i].store_del_point);
				var hq_add_point = commify(data.erpPointDetailList[i].hq_add_point);
				var hq_del_point = commify(data.erpPointDetailList[i].hq_del_point);
				
				elemStr = '<tr height="30px" style="cursor: default; background-color: white;">'
				+ '<td style="width:5.8%;">'+(i+1)+'</td>'
				+ '<td style="width:11.7%;">'+data.erpPointDetailList[i].std_ym+'</td>'
				+ '<td style="width:27.9%;">'+data.erpPointDetailList[i].store_name+'</td>'
				+ '<td style="width:14.8%;" id="array">'+store_add_point+'</td>'
				+ '<td style="width:14.8%;" id="array">'+store_del_point+'</td>'
				+ '<td style="width:12.5%;" id="array">'+hq_add_point+'</td>'
				+ '<td id="array">'+hq_del_point+'</td></tr>';
				$("#erpPointDetailTableDB tbody").append(elemStr);
			}
			
			$.blockUI({ 
				message: $('#erpPointDetail')
		      , css: { width: '1000' 
				  	 , height: "400"
				     , top: "20%"
				     , left: "18%"
				 },onOverlayClick : $.unblockUI
			}); 
		}, 
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        }
		,error: function(data) { 
				alert("가맹점목록을 취득하지 못했습니다.");
				return false;
		}
	});
}

function modal_close() {
	$.unblockUI();
}