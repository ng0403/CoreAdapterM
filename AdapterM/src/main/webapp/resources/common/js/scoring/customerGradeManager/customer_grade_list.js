//grd 기준 레이어 팝업창 처리
function doPopupGrdStd(grdStdPageNum) {
	
	$("#grd_work_dt_custsch").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $("#grdStdModal"),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '770px',
    	'height': '390px',
    	'cursor': 'default'
    	}
	 	,onOverlayClick : $.unblockUI
	});

	//grd 기준 조회 표시
	getGrdStdList(grdStdPageNum,"");
	
}

function grdStdPageNumMoInputEnter(event) {
	
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var page = $("#grdStdMoPageInput").val();
			var std_ym = $("#hgrd_work_dt_sch").val();
			getGrdStdList(page,std_ym);
		}
	});
}

function getPageGrdStdList(grdStdPageNum){
	var std_ym = $("#grd_work_dt_custsch").val();
	getGrdStdList(grdStdPageNum,std_ym);
}

function getSchGrdStdList(grdStdPageNum){
	var std_ym = $("#grd_work_dt_custsch").val();
	getGrdStdList(grdStdPageNum,std_ym);
}


//grd 기준 조회 표시
function getGrdStdList(grdStdPageNum,std_ym){
	var ctx = $("#ctx").val();

														//ticket_wid있을때
	var data = "grdStdPageNum="+grdStdPageNum+"&grd_work_dt_sch="+std_ym;
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx +"/getGrdStdListAjax",   
		data: data,
		dataType: "json",
		success: function(data) {
			
			$("#grdStdMoDetail").empty();
			
			if(data.getGrdStdList.length == 0){
				var trElement = $("#grdStdModalTblHeader").clone().removeClass().empty();
				$("#grdStdMoDetail").append(trElement);
				$("#grdStdMoDetail tr:last").append("<td style='background-color: white; cursor: default;' colspan='5' align='center' height='194'>검색 결과가 없습니다</td>");
			}
			
			// 테이블 내용 추가
			$.each(data.getGrdStdList, function(i) {
				// 헤더에서 TR 요소 취득
				var trElement = $("#grdStdModalTblHeader").clone().removeClass().empty();
				var grd_std_key = this.grd_std_key;
				var std_ym = this.std_ym;
				var cust_grd_div = this.cust_grd_div;
				var std_term = this.std_term;
				trElement.bind("click", function(e) { // 기능 입히기
					$("#grd_std_txt").val("기준년월 : " + std_ym + ", 등급구분 : " + cust_grd_div + ", 기간 : "+std_term);
					$("#set_grd_std_key").val(grd_std_key);
					$("#set_std_ym").val(std_ym);
					$('#set_cust_grd_div').val(cust_grd_div);
					
					$.unblockUI();
				});
				// TR 작성
				$("#grdStdMoDetail").append(trElement);
				$("#grdStdMoDetail tr:last");
				$("#grdStdMoDetail tr:last").append("<td style='width:40%;'>" + std_ym + "</td>");
				$("#grdStdMoDetail tr:last").append("<td style='width:30%;'>" + cust_grd_div + "단계</td>");
				$("#grdStdMoDetail tr:last").append("<td style='width:30%;'>" + std_term + "개월</td>");
				
			});
			
			var pageContent = "";
			
			// 페이징 다시그리기
			$("#grdStdMoPagingDiv").empty();
			if(data.grdPage.startPageNum == 1 && data.grdPage.endPageNum == 1){
				pageContent = "<input type='hidden' id='grdStdPageNum' value='"+data.grdStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.grdPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='grdStdMoPageInput' readonly='readonly' value='"+data.grdPage.startPageNum+"' onkeypress=\"grdStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a> / "+data.grdPage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
			} else if(data.grdStdPageNum == data.grdPage.startPageNum){
				pageContent = "<input type='hidden' id='grdStdPageNum' value='"+data.grdStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.grdPage.endPageNum+"'/>"
				+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='grdStdMoPageInput' value='"+data.grdPage.startPageNum+"' onkeypress=\"grdStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>" 
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+data.grdPage.endPageNum+") id='pNum'> / "+data.grdPage.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+(data.grdStdPageNum+1)+") id='pNum'> ▶ </a>";
			} else if(data.grdStdPageNum == data.grdPage.endPageNum){
				pageContent = "<input type='hidden' id='grdStdPageNum' value='"+data.grdStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.grdPage.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+(data.grdStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='grdStdMoPageInput' value='"+data.grdPage.endPageNum+"' onkeypress=\"grdStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a> / "+data.grdPage.endPageNum+"</a>"
				+"<a style='text-decoration: none; color: black;'> ▶ </a>";
			} else {
				pageContent = "<input type='hidden' id='grdStdPageNum' value='"+data.grdStdPageNum+"'/><input type='hidden' id='cupnSeEndPageNum' value='"+data.grdPage.endPageNum+"'/>"
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+(data.grdStdPageNum-1)+") id='pNum'> ◀ </a>"
				+"<input type='text' id='grdStdMoPageInput' value='"+data.grdStdPageNum+"' onkeypress=\"grdStdPageNumMoInputEnter(event);\" style='width: 30px; text-align: center;'/>"
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+data.grdPage.endPageNum+") id='pNum'> / "+data.grdPage.endPageNum+"</a>"
				+"<a style='cursor:pointer;' onclick=getPageGrdStdList("+(data.grdStdPageNum+1)+") id='pNum'> ▶ </a>";
			}
			$("#grdStdMoPagingDiv").append(pageContent);
			
		},
		beforeSend: function(){
			viewLoadingShow();		
        },
        complete:function(){
        	viewLoadingHide();
        },
		error: function(data) { 
			alert("고객등급 기준리스트를 취득하지 못했습니다.");
			return false;
		}
	});
	//$("#ticket_wid").attr("value",ticket_wid);
}

//조회 버튼 기능
function grd_std_list_sch(pageNum) {
	var ctx = $("#ctx").val();
	var grd_std_key_input = $('<input type="hidden" value="'+$("#set_grd_std_key").val()+'" name="grd_std_key">');
	var std_ym_input = $('<input type="hidden" value="'+$("#set_std_ym").val()+'" name="std_ym">');
	$("#grdCustomerList").append(std_ym_input);
	$("#grdCustomerList").append(grd_std_key_input);
	viewLoadingShow();
	$("#grdCustomerList").submit();
}

function grdCustGradeForm(grd_std_key, std_ym, cust_grd_cd, cust_grd_desc){
	
	var ctx = $("#ctx").val();
	var $form = $('<form></form>');
    $form.attr('action', ctx + "/grdCustomerDetailList");
    $form.attr('method', 'post');
    $form.appendTo('body');
	
    var grd_std_key_input = $('<input type="hidden" value="'+grd_std_key+'" name="grd_std_key">');
    var page_input = $('<input type="hidden" value="1" name="pageNum">');
	var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
	var cust_grd_cd_input = $('<input type="hidden" value="'+cust_grd_cd+'" name="cust_grd_cd">');
	var cust_grd_desc_input = $('<input type="hidden" value="'+cust_grd_desc+'" name="cust_grd_desc">');
	
	$form.append(grd_std_key_input);
	$form.append(std_ym_input);
	$form.append(cust_grd_cd_input);
	$form.append(cust_grd_desc_input);
	$form.append(page_input);
	
	viewLoadingShow();
    $form.submit();
	
}