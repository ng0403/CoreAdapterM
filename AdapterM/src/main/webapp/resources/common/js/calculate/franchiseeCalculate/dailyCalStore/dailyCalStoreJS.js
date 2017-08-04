//마감 여부 초기값 셋팅
var sumFlag = false;
$(document).ready(function(start_date, end_date){
	
	//마감여부
	var closeYN = $("#monthlyCloseYn").val();
	
	if(closeYN == 'Y'){		
//		$("#monthly_close_yn > option[value=1]").prop("selected", true);
		$("#monthly_close_yn").val("1").prop("selected","selected");
	}else if(closeYN == 'N'){
//		$("#monthly_close_yn > option[value=2]").prop("selected", true);
		$("#monthly_close_yn").val("2").attr("selected","selected");
	}else {
//		$("#monthly_close_yn > option[value=0]").prop("selected", true);
		$("#monthly_close_yn").val("").attr("selected","selected");
	}
	
	//등록 기간
	var start_date = $("#start_date").val();
	var end_date = $("#end_date").val();
	
	var today = getYesterday();										//어제 날짜 취득
	var today_dt = today[0] + "-" + today[1] + "-" + today[2]; //'-'포맷으로 셋팅
	
	if(start_date == null || start_date == ""){						//초기화면 일때만 오늘 날짜로 셋팅
		$("#start_date").val(today_dt);
		$("#end_date").val(today_dt);
	}
	
	
});

//당일 날짜 취득
//return Array -> year, month, day
function getYesterday() {
	var result = new Array();
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	year = year + '';
	
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}
	
	result[0] = year;
	result[1] = month;
	result[2] = day;
	return result;
}

//기간별 합계 체크
function checkSum(){
	var ctx = $("#ctx").val();
	if($("#chkSum").is(":checked") == true){ //기간별 합계가 체크 됐을 시 	
		$("#btn_t6").prop("disabled",true);	//가맹점 조회 버튼 비활성화
		$("#store_name").val('');	
		$("#monthly_close_yn").prop("disabled",true);	//마감여부 콤보 박스 비활성화
		$("#store_wid").val("");
		$("#trns_pos_div").val("");
		$("#chkSum").prop("checked", true);
		$("#dayCalculateStoreListform").attr("action", ctx+"/sumByTimePeriod");
	}else{
		$("#btn_t6").prop("disabled", false);
		$("#monthly_close_yn").prop("disabled", false);
		$("#chkSum").prop("checked", false);
		$("#dayCalculateStoreListform").attr("action", ctx+"/dayCalculateStore");
	}
}

// 거래 조건조회
function goDcsSearch(){
	
	//선택된 값 유지시켜주는 부분
	var start_date = $("#start_date").val();
	var st_year = $("#start_date").val().substr(0,4);
	var st_month = $("#start_date").val().substr(5,2);	
    var st_day = $("#start_date").val().substr(8,2);
    var st_date = new Date(st_year, st_month, st_day);
    var temp_end = new Date(Date.parse(st_date) + 180 * 1000 * 60 * 60 * 24);
	var end_date = $("#end_date").val();
	var ed_year = $("#end_date").val().substr(0,4);
    var ed_month = $("#end_date").val().substr(5,2);
    var ed_day = $("#end_date").val().substr(8,2);
    var ed_date = new Date(ed_year, ed_month, ed_day);
    var temp_start = new Date(Date.parse(ed_date) - 180 * 1000 * 60 * 60 * 24);
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var store_name = $("#store_name").val();
	var chkSum = $("#chkSum");
	var cnt = 0;
	//Validation 체크
	if(brand_wid == null || brand_wid == ""){
		alert("브랜드를 선택해주세요!");
		cnt++;
		return;
	}
//	else if(chkSum.is(":checked") == false && (store_wid == null || store_wid == "" && brand_wid != "0000"))
//	{
//		alert("가맹점을 선택해주세요!");
//		cnt++;
//		return;
//	}
	
	
	//의도를 모르겠음.
	/*else if(chkSum == null || chkSum == "")
	{
		if(store_wid == null || store_wid == "")
		{
			alert("가맹점을 선택해주세요!");
			cnt++;
		}
	}*/
	if(start_date != '' && end_date != ''){
		if(ed_date < st_date){
			alert("조회기간은 종료일이 시작일 이후여야 합니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
		if(temp_end < ed_date){
			alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
		if(temp_start > st_date){
			alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
	}
	
	if(cnt == 0)
		{
			$("#monthlyCloseYn").val($("#monthly_close_yn").val()); 
			
			if($("#chkSum").is(":checked") == true){	
				//페이지 초기값 설정
				$("#page").attr("value",1);
				$("#store_name").val("");	
				$("#dayCalculateStoreListform").attr("action", "sumByTimePeriod");
				viewLoadingShow();
				$("#dayCalculateStoreListform").submit();
			}else{
				$("#dayCalculateStoreListform").attr("action", "dayCalculateStore");
				viewLoadingShow();
				$("#dayCalculateStoreListform").submit();
			}
		
		}
}

//페이징 함수
function dcsPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    var dayCalculateStoreListform = $("#DCSForm");
	    dayCalculateStoreListform.append(pageNumInput);
	    viewLoadingShow();
	    dayCalculateStoreListform.submit();
	});
}

//가맹점 리스트 엔터키 기능
function dcsPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var dcsPageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(dcsPageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > dcsPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				dcsPaging(dcsPageNum);
			}
		}
		event.stopPropagation();
	});
}

// 일 정산내역 엑셀출력
function DcsExcelDiv(){
	var ctx = $("#ctx").val();
	var chkSum = $("#chkSum").val();
	var url = "/dayCalculateStoreExcel";
	var sendData = "";
	
	if(chkSum == 'on'){// 기간별 합계 엑셀 출력 설정
		url = "/sumByTimePeriodExcel";
		sendData = "start_date="+$("#start_date").val()
		+"&end_date="+$("#end_date").val()
		+"&brand_wid="+$("#brand_wid").val();
	} else { // 그냥 엑셀 출력 설정
		sendData = "start_date="+$("#start_date").val()
		+"&end_date="+$("#end_date").val()
		+"&brand_wid="+$("#brand_wid").val()
		+"&store_wid="+$("#store_wid").val()
		+"&store_name="+$("#store_name").val()
		+"&monthly_close_yn="+$("#monthly_close_yn").val();
	}
	
	$.ajax({
		url: ctx + url,
		type: "POST",  
		data: sendData,//보내는값
		dataType: "json",	//@RequestParam 컨트롤에 써줘  //리턴타입 정하는 부분에 @ResponseBody
		success: function(data) {//리턴된값
			//dcsExcelTable tbody 내용 삭제
			$("#dcsExcelTable tbody").empty();
			
			var tempSum = '<tr><td>합계</td><td></td>'
				+'<td>'+data.dcsSum.store_name+'</td>'
				+'<td>'+data.dcsSum.sales_amt+'</td>'
				+'<td>'+data.dcsSum.agg_sales_amt+'</td>'
				+'<td>'+data.dcsSum.store_add_point+'</td>'
				+'<td>'+data.dcsSum.store_agg_add_point+'</td>'
				+'<td>'+data.dcsSum.store_del_point+'</td>'
				+'<td>'+data.dcsSum.store_agg_del_point+'</td>'
				+'<td>'+data.dcsSum.hq_add_point+'</td>'
				+'<td>'+data.dcsSum.hq_agg_add_point+'</td>'
				+'<td>'+data.dcsSum.hq_del_point+'</td>'
				+'<td>'+data.dcsSum.hq_agg_del_point+'</td>'
				+'<td>'+data.dcsSum.cupn_cnt+'</td>'
				+'<td>'+data.dcsSum.cupn_amt+'</td>'									
				+'<td>'+data.dcsSum.agg_cupn_cnt+'</td>'
				+'<td>'+data.dcsSum.agg_cupn_amt+'</td>'
				+'<td>'+data.dcsSum.gift_cnt+'</td>'
				+'<td>'+data.dcsSum.gift_amt+'</td>'										
				+'<td>'+data.dcsSum.agg_gift_cnt+'</td>'
				+'<td>'+data.dcsSum.agg_gift_amt+'</td>'
				+'<td>'+data.dcsSum.monthly_close_yn+'</td></tr>';
			$("#dcsExcelTable tbody").append(tempSum);
			
			//테이블 내용 추가
			$.each(data.dcsExcel, function(i) {
				var date = '';
				if($("#chkSum").is(":checked") == true){
					date= '<td>'+data.start_date+'~'+data.end_date+'</td>';
				} else {
					date= '<td>'+data.dcsExcel[i].std_ymd+'</td>';
				}
				var tempList = '<tr><td>'+(i+1)+'</td>'
					+date
					+'<td>'+data.dcsExcel[i].store_name+'</td>'
					+'<td>'+data.dcsExcel[i].sales_amt+'</td>'
					+'<td>'+data.dcsExcel[i].agg_sales_amt+'</td>'
					+'<td>'+data.dcsExcel[i].store_add_point+'</td>'
					+'<td>'+data.dcsExcel[i].store_agg_add_point+'</td>'
					+'<td>'+data.dcsExcel[i].store_del_point+'</td>'
					+'<td>'+data.dcsExcel[i].store_agg_del_point+'</td>'
					+'<td>'+data.dcsExcel[i].hq_add_point+'</td>'
					+'<td>'+data.dcsExcel[i].hq_agg_add_point+'</td>'
					+'<td>'+data.dcsExcel[i].hq_del_point+'</td>'
					+'<td>'+data.dcsExcel[i].hq_agg_del_point+'</td>'
					+'<td>'+data.dcsExcel[i].cupn_cnt+'</td>'
					+'<td>'+data.dcsExcel[i].cupn_amt+'</td>'										
					+'<td>'+data.dcsExcel[i].agg_cupn_cnt+''
					+'<td>'+data.dcsExcel[i].agg_cupn_amt+''
					+'<td>'+data.dcsExcel[i].gift_cnt+'</td>'
					+'<td>'+data.dcsExcel[i].gift_amt+'</td>'										
					+'<td>'+data.dcsExcel[i].agg_gift_cnt+'</td>'
					+'<td>'+data.dcsExcel[i].agg_gift_amt+'</td>'
					+'<td>'+data.dcsExcel[i].monthly_close_yn+'</td></tr>';
				$("#dcsExcelTable tbody").append(tempList);
			});
			CommonExcelDownLoad('가맹점별 일 정산내역', 'dcsExcelTable');
			},
			beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        }
	});
	
}

//function sDateClick() {
//  $('#start_date').datepicker("option", "maxDate", $("#end_date").val());
//    $('#start_date').datepicker("option", "onClose", function ( selectedDate ) {
//        $("#end_date").datepicker( "option", "minDate", selectedDate );
//    });
//}
//function eDateClick() {
// $('#end_date').datepicker("option", "minDate", $("#start_date").val());
//    $('#end_date').datepicker("option", "onClose", function ( selectedDate ) {
//        $("#start_date").datepicker( "option", "maxDate", selectedDate );
//    });
//}
