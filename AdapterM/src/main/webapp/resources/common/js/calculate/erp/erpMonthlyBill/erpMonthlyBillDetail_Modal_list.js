/**
업 무 명 : ERP 가맹점별 월수수료 정산 리스트 상세보기 모달화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/09/14
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/09/14
내 용 : ERP 가맹점별 월수수료 정산 리스트 상세보기 모달창에 대한 javascript 코드이다.
*참고사항 : 
*/

/* ERP 가맹점별 월수수료 리스트를 눌렀을 때 상세정보화면 */
function erpBillListDetail(erp_store_wid) {
	var ctx = $('#ctx').val();
	var param = "erp_store_wid="+erp_store_wid;
	$.ajax({
		url: ctx+'/erpBillAjax',   
		type: "POST",  
		data: param,
		dataType: 'json',
		success: function(data) {
//			alert(param);
			$("#erpBillDetailTableDB tbody").empty();
			var elemStr = "";
			for (var i = 0; i < data.erpBillDetailList.length; i++) {
				//erpMonthlyPointDetail_Modal_list.js 에서 선언된 commify 메소드 호출 (천단위 ,)
//				var bill_amt = commify(data.erpBillDetailList[i].bill_amt);
				var gift_amt = commify(data.erpBillDetailList[i].gift_amt);
				var paper_gift_amt = commify(data.erpBillDetailList[i].paper_gift_amt);
				var mobile_gift_amt = commify(data.erpBillDetailList[i].mobile_gift_amt);
				var cal_amt = commify(data.erpBillDetailList[i].cal_amt);
				elemStr += '<tr height="30px" style="cursor: default; background-color: white;">'
				+ '<td style="width: 10%;">'+(i+1)+'</td>'
				+ '<td style="width: 13%;">'+data.erpBillDetailList[i].std_ym+'</td>'
				+ '<td style="width: 25%;">'+data.erpBillDetailList[i].store_name+'</td>'
				+ '<td style="width: 13%;">'+paper_gift_amt+'</td>'
				+ '<td style="width: 13%;">'+mobile_gift_amt+'</td>'
				+ '<td style="width: 13%;">'+gift_amt+'</td>'
				+ '<td style="width: 13%;">'+cal_amt+'</td>';
			}
			$("#erpBillDetailTableDB tbody").append(elemStr);
			
			$.blockUI({ 
				message: $('#erpBillDetail')
		      , css: { width: '1000' 
				  	 , height: "400"
				     , top: "20%"
				     , left: "18%"
				 }
				,onOverlayClick : $.unblockUI
			}); 

		},beforeSend: function(){
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