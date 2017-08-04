// 거래 조건조회
function goTranSearch(){
	
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
	var point_div = $("#point_div").val();

	var cnt = 0;
	//Validation 체크
	if(start_date != '' && end_date != ''){
		if(end_date < start_date){
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
	if(brand_wid == null || brand_wid == ""){
		alert("브랜드를 선택해주세요!");
		cnt++;
	}
	else if(store_wid == null || store_wid == "" && brand_wid !="0000"){
		alert("가맹점을 선택해주세요!");
		cnt++;
	}
	else if(point_div == null || point_div == ""){
		alert("거래구분을 선택해주세요!");
		cnt++;
	}
	

	if(cnt == 0){
		viewLoadingShow();
		$("#transactionInfoListform").submit();	//VO로 넘겨짐.  map으로는 ajax
	}
}

//페이징 함수
function transPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    var telegramListform = $("#TILForm");
	    telegramListform.append(pageNumInput);
	    viewLoadingShow();
	    telegramListform.submit();
	});
}

//가맹점 리스트 엔터키 기능
function trnsPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var transPageNum = $("#pageInput").val();
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(transPageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > transPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				transPaging(transPageNum);
			}
		}
		event.stopPropagation();
	});
}

function tranInfoExcelDownLoad(title, tblListNm, tblDetailNm) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();

		var l_tblID = $("#"+tblListNm+"");
		
		var l_thTxt = [];
		l_tblID.find('th').each(function(index, item) {
			l_thTxt[index] = $(this).text();
		});
		
		var l_trLength = l_tblID.find('tbody tr').length;
		var l_content = [];
		l_tblID.find('tbody tr').each(function(index, item) {
			var tdTxt = '';
			var tdLength = $(this).find('td').length;
			$(this).find('td').each(function(index, item) {
				if(index != tdLength-1) {
					tdTxt += $(this).text() + "@@";
				} else {
					if($(this).text().trim() == ''){
						tdTxt += $(this).text() + " @@";
					} else {
						tdTxt += $(this).text();
					}
				}
			});
			l_content[index] = tdTxt;
		});
		
		var d_tblID = $("#"+tblDetailNm+"");
		
		var d_trLength = d_tblID.find('tbody tr').length;
		var d_content = [];
		d_tblID.find('tbody tr').each(function(index, item) {
			var childTxt = '';
			var childLength = $(this).children().length;
			$(this).children().each(function(index, item) {
				if(index != childLength-1) {
					childTxt += $(this).text().replace(/,/gi, "").trim() + "@@";
				} else {
					if($(this).text().trim() == ''){
						childTxt += $(this).text().replace(/,/gi, "").trim() + "@@";
					} else {
						childTxt += $(this).text().replace(/,/gi, "").trim();
					}
				}
			});
			d_content[index] = childTxt;
		});
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
		$form.attr('action', ctx + "/ExcelDownLoad");
		$form.attr('method', 'post');
		$form.appendTo('body');
		
		var title_input = $('<input type="hidden" value="'+title+'" name="title">');
		var thTxt_input = $('<input type="hidden" value="'+l_thTxt+'" name="header">');
		var l_trLength_input = $('<input type="hidden" value="'+l_trLength+'" name="lRowlength">');
		var l_content_input = $('<input type="hidden" value="'+l_content+'" name="listContent">');
		var d_trLength_input = $('<input type="hidden" value="'+d_trLength+'" name="dRowlength">');
		var d_content_input = $('<input type="hidden" value="'+d_content+'" name="detailContent">');
		
		$form.append(title_input);
		$form.append(thTxt_input);
		$form.append(l_trLength_input);
		$form.append(l_content_input);
		$form.append(d_trLength_input);
		$form.append(d_content_input);
		viewLoadingShow();
		$form.submit();
	});
}

//일 정산내역 엑셀출력
function TisExcelDiv(){
	$(document).ready(function() {
		alert("들어옴??");
		var ctx = $("#ctx").val();
		var sendData = "start_date="+$("#start_date").val()
		+"&end_date="+$("#end_date").val()
		+"&brand_wid="+$("#brand_wid").val()
		+"&store_wid="+$("#store_wid").val()
		+"&point_div="+$("#point_div").val()
		+"&trns_pos_div="+$("#trns_pos_div").val();
		
		$.ajax({
			url: ctx + "/transactionInfoExcel",
			type: "POST",  
			data: sendData,//보내는값
			dataType: "json",	//@RequestParam 컨트롤에 써줘  //리턴타입 정하는 부분에 @ResponseBody
			success: function(data) {//리턴된값
				//dcsExcelTable tbody 내용 삭제
				$("#tisExcelTbody").empty();
				
				if(data.tiListExcel.length == 0){
					var tempList = '<tr><td>검색 결과가 없습니다.</td></tr>'
						$("#tisExcelTbody").append(tempList);
				} else {
					//테이블 내용 추가
					$.each(data.tiListExcel, function(i) {
						var tempList = '<tr>'
							+'<td>'+(i+1)+'</td>'
							+'<td>'+this.trns_dt+'</td>'
							+'<td>'+this.key_wid+'</td>'
							+'<td>'+this.trns_div_nm+'</td>'
							+'<td>'+this.trns_amt+'</td>'
							+'<td>'+this.add_point+'</td>'
							+'<td>'+this.del_point+'</td>'
							+'</tr>'
							$("#tisExcelTbody").append(tempList);
					});
				}
				tranInfoExcelDownLoad('거래내역', 'transactionInfoSearchListExcelTable', 'transactionInfoSearchDeatilTable');
			},
				beforeSend: function(){
		        	viewLoadingShow();			
		        },
		        complete:function(){
		        	viewLoadingHide();	
		        }
		});
	});
}