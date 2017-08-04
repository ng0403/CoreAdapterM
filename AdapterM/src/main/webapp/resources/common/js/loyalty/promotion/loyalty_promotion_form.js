/**
업 무 명 : 로열티프로모션
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 로열티 프로모션 리스트 javascript
*참고사항 : 
 */

//////////////////////////////////////////////////////////////////////////////////////////
// 포인트 적립 유형 및 포인트 적립 조건 element
var pcondTgtOption1 = '<option value="0001">성별</option><option value="0002">연령대</option>';
var pcondTgtOption2 = '<option value="0003">사용일자</option><option value="0004">사용시간</option>';
var pcondValOption1 = '<select name="pcond_target_val1" id="pcond_target_val1"><option value="MAN">남</option><option value="WOMAN">여</option></select>';
var pcondValOption2 = '<select name="pcond_target_val1" id="pcond_target_val1">'
	+'<option value="10">10대</option>'
	+'<option value="20">20대</option>'
	+'<option value="30">30대</option>'
	+'<option value="40">40대</option>'
	+'<option value="50">50대</option>'
	+'<option value="60">60대이상</option>'
	+'</select>';
var pcondValOption3 = '<input type="text" id="pcond_date" name="pcond_target_val1" readonly="readonly"> - <input type="text" id="pcond_date" name="pcond_target_val2" readonly="readonly">';
var pcondValOption4 = '<select name="pcond_target_val1" id="pcond_target_val1">'
	for (var i = 1; i <= 24; i++) {
		if(i<10){
			pcondValOption4 += '<option value="'+i+'">0'+i+'</option>';
		} else {
			pcondValOption4 += '<option value="'+i+'">'+i+'</option>';
		}
	}
pcondValOption4 += '</select>시 - <select name="pcond_target_val2" id="pcond_target_val2">';
for (var i = 1; i <= 24; i++) {
	if(i<10){
		pcondValOption4 += '<option value="'+i+'">0'+i+'</option>';
	} else {
		pcondValOption4 += '<option value="'+i+'">'+i+'</option>';
	}
}
pcondValOption4 += '</select>시';
////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	var ctx = $("#ctx").val();
	var prmt_id = $("#hprmt_id").val();
	var ruleAddYn = false;
	// 포인트 적립 룰 행 추가
	$("#prule_add").click(function() {
		ruleAddYn = true;
		var trElement = $("#pruleThead tr").clone().removeClass().empty().removeAttr("style");
		trElement.css('cursor', 'default');
		trElement.css('background-color', 'white');
		trElement.css('width', '100%');
		
		// 체크박스의 마지막 value 값을 가져와서 세팅
		var chkLength = $("#pruleTbody input[name=prule_name_chk]").last().val() == undefined ? 1 : parseInt($("#pruleTbody input[name=prule_name_chk]").last().val())+1;
		// NO로 보여주는 값
		var trLength = $("#pruleTbody").children().length+1;
		if(trLength == 0) trLength = 1; 
		
		$("#pruleTbody").append(trElement);
		$("#pruleTbody tr:last").append( 
 	 	 		'<td style="width: 8.1%;"><input type="checkbox" id="prule_name_chk'+chkLength+'" value="'+chkLength+'" name="prule_name_chk"></td>'
 	 	 		+ '<td style="width: 15%;" id="noTd">'+trLength+'</td>'
 	 	 		+'<td style="width: 75%; padding-left: 0; padding-right: 0;"><input type="text" id="prule_name" name="prule_name" style="width: 70%;"></td>');
		
		// 행추가시 체크박스 checked와 배경색 변경
		$("input[name=prule_name_chk]").each(function() {
			$(this).prop("checked", false);
			$(this).parent().parent().css("background-color", "white");
		});
		$("input[name=prule_name_chk]").each(function() {
			if($(this).val() == chkLength){
				$(this).prop("checked", true);
				$(this).parent().parent().css('background-color', '#eaeaea');
			}
		});
		
		// 체크박스 클릭시 해당 포인트 적립유형, 조건 tbody 호출
		$("#prule_name_chk"+chkLength).bind("click", function(e) {
			$("input[name=prule_name_chk]").each(function() {
				$(this).prop("checked", false);
				$(this).parent().parent().css("background-color", "white");
			});
			$("input[name=prule_name_chk]").each(function() {
				if($(this).val() == chkLength){
					$(this).prop("checked", true);
					$(this).parent().parent().css('background-color', '#eaeaea');
				}
			});
			$("#ptype_table tbody").each(function() { $(this).hide(); });
			$("#ptype_table tbody").each(function() { if($(this).is("#ptype_tbody"+chkLength)) $(this).css("display", "table-row-group"); });
			$("#pcond_table tbody").each(function() {	$(this).hide();	});
			$("#pcond_table tbody").each(function() {	if($(this).is("#pcond_tbody"+chkLength)) $(this).css("display", "table-row-group"); });
		});
		
		// 포인트적립유형 tbody 생성
		var ptypeTbodyElement = $("#pruleTbody").clone().empty().removeAttr("id");
		ptypeTbodyElement.attr("id", "ptype_tbody"+chkLength);
		$("#ptype_table").append(ptypeTbodyElement);
		$("#ptype_table tbody").each(function() {
			$(this).hide();
		});
		$("#ptype_table tbody").each(function() {
			if($(this).is("#ptype_tbody"+chkLength)) $(this).css("display", "table-row-group");
		});
		
		// 포인트적립조건 tbody 생성
		var pcondTbodyElement = $("#pruleTbody").clone().empty().removeAttr("id");
		pcondTbodyElement.attr("id", "pcond_tbody"+chkLength);
		$("#pcond_table").append(pcondTbodyElement);
		$("#pcond_table tbody").each(function() {
			$(this).hide();
		});
		$("#pcond_table tbody").each(function() {
			if($(this).is("#pcond_tbody"+chkLength)) $(this).css("display", "table-row-group");
		});
	});
	
	///////////////////////////// 포인트 적립 유형 행 추가 /////////////////////////////////
	$("#ptype_add").click(function() {
		var pruleLen = $("#pruleTbody").children().length;
		if(ruleAddYn || pruleLen > 0){
			var chkVal = $("input[name=prule_name_chk]:checked").val();
			var ptypeTbody = $("#ptype_tbody"+chkVal);
			var trElement = $("#pruleThead tr").clone().removeClass().empty().removeAttr("style");
			trElement.css('cursor', 'default');
			trElement.css('background-color', 'white');
			trElement.css('width', '100%');
			
			var chkLength = ptypeTbody.children().find("input[name=ptype_chk]").last().val() == undefined ? 1 : parseInt(ptypeTbody.children().find("input[name=ptype_chk]").last().val())+1;
			// NO로 보여주는 값
			var ptypeTbodyLength = ptypeTbody.children().length+1;
			if(ptypeTbodyLength == 0) ptypeTbodyLength = 1;
			ptypeTbody.append(trElement);
			ptypeTbody.children("tr").last().append('<td style="width: 5%;"><input type="checkbox" id="ptype_chk" value="'+chkLength+'" name="ptype_chk"></td>'
					+'<td style="width: 10%;" id="tNoTd">'+ptypeTbodyLength+'</td>'
					+'<td style="width: 40%;"><select id="ptype_cd'+chkVal+chkLength+'" name="ptype_cd">'
					+'<option value="0001">적립율(%)</option>'
					+'<option value="0002">적립금액(원)</option>'
					+'</select></td>'
					+'<td style="width: 40%;"><input type="text" id="ptype_val'+chkVal+chkLength+'" name="ptype_val" maxlength="10"></td>');
			
			$("#ptype_cd"+chkVal+chkLength).bind("change", function(e) {
				$("#ptype_val"+chkVal+chkLength).val('');
			});
		} else {
			alert("포인트 적립 Rule을 추가 해주세요.");
		}
	});
	
	///////////////////////////////// 포인트 적립 조건 행 추가 //////////////////////////////
	$("#pcond_add").click(function() {
		var pruleLen = $("#pruleTbody").children().length;
		if(ruleAddYn || pruleLen > 0){
			var chkVal = $("input[name=prule_name_chk]:checked").val();
			var pcondTbody = $("#pcond_tbody"+chkVal);
			var trElement = $("#pruleThead tr").clone().removeClass().empty().removeAttr("style");
			trElement.css('cursor', 'default');
			trElement.css('background-color', 'white');
			trElement.css('width', '100%');
			
			var chkLength = pcondTbody.children().find("input[name=pcond_chk]").last().val() == undefined ? 1 : parseInt(pcondTbody.children().find("input[name=pcond_chk]").last().val())+1;
			// NO로 보여주는 값
			var pcondTbodyLength = pcondTbody.children().length+1;
			if(pcondTbodyLength == 0) pcondTbodyLength = 1; 
			pcondTbody.append(trElement);
			pcondTbody.children("tr").last().append('<td style="width: 5%;"><input type="checkbox" id="pcond_chk'+chkLength+'" value="'+chkLength+'" name="pcond_chk"></td>'
					+'<td style="width: 10%;" id="cNoTd">'+pcondTbodyLength+'</td>'
					+'<td style="width: 20%;"><select id="pcond_type_cd'+chkVal+chkLength+'" name="pcond_type_cd">'
					+'<option value="0001">회원</option>'
					+'<option value="0002">포인트거래</option>'
					+'</select></td>'
					+'<td style="width: 20%;"><select id="pcond_target_cd'+chkVal+chkLength+'" name="pcond_target_cd">'
					+'<option value="0001">성별</option><option value="0002">연령대</option></select></td>'
					+'<td style="width: 40%;" id="ptype_val_td'+chkVal+chkLength+'">'
					+'<select name="pcond_target_val1" id="pcond_target_val1"><option value="0001">남</option><option value="0002">여</option></select></td>');
			
			// 적립조건구분에 따른 적립대상 변경
			$("#pcond_type_cd"+chkVal+chkLength).bind("change", function(e) {
				switch ($(this).val()) {
				case "0001": // 회원
					$("#pcond_target_cd"+chkVal+chkLength).empty();
					$("#pcond_target_cd"+chkVal+chkLength).append(pcondTgtOption1);
					$("#ptype_val_td"+chkVal+chkLength).empty();
					$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption1);
					break;
				case "0002": // 포인트 거래
					$("#pcond_target_cd"+chkVal+chkLength).empty();
					$("#pcond_target_cd"+chkVal+chkLength).append(pcondTgtOption2);
					$("#ptype_val_td"+chkVal+chkLength).empty();
					$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption3);
					$("#ptype_val_td"+chkVal+chkLength).children().each(function() {
						if($(this).is("input[name=pcond_target_val1]")){
							$(this).css("width", "30%").attr("id", "pcond_date"+chkVal+chkLength+1).datepicker();
						}
						if($(this).is("input[name=pcond_target_val2]")){
							$(this).css("width", "30%").attr("id", "pcond_date"+chkVal+chkLength+2).datepicker();
						}
					});
					break;
				}
			});
			
			// 적립 대상 변경에 따른 적립대상속성 변경
			$("#pcond_target_cd"+chkVal+chkLength).bind("change", function(e) {
				var pcond_type_cd = $("#pcond_type_cd"+chkVal+chkLength+" option:selected").val();
				if(pcond_type_cd == "0001"){ // 회원
					switch ($(this).val()) {
					case "0001": // 성별
						$("#ptype_val_td"+chkVal+chkLength).empty();
						$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption1);
						break;
					case "0002": // 연령대
						$("#ptype_val_td"+chkVal+chkLength).empty();
						$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption2);
						break;
					}
				} else if(pcond_type_cd == "0002"){
					switch ($(this).val()) {
					case "0003": // 사용일자
						$("#ptype_val_td"+chkVal+chkLength).empty();
						$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption3);
						// datepicker 적용
						$("#ptype_val_td"+chkVal+chkLength).children().each(function() {
							if($(this).is("input[name=pcond_target_val1]")){
								$(this).css("width", "30%").attr("id", "pcond_date"+chkVal+chkLength+1).datepicker();
							}
							if($(this).is("input[name=pcond_target_val2]")){
								$(this).css("width", "30%").attr("id", "pcond_date"+chkVal+chkLength+2).datepicker();
							}
						});
						break;
					case "0004": // 사용시간
						$("#ptype_val_td"+chkVal+chkLength).empty();
						$("#ptype_val_td"+chkVal+chkLength).append(pcondValOption4);
						break;
					}
				}
			});
		} else {
			alert("포인트 적립 Rule을 추가 해주세요.");
		}
	});
	
	// 포인트 적립 룰 삭제
	$("#prule_del").click(function() {
		$("input[name=prule_name_chk]:checked").each(function() {
			var thisVal = $(this).val();
			$("#ptype_tbody"+thisVal).remove();
			$("#pcond_tbody"+thisVal).remove();
			$(this).parent().parent().remove();
		});
		$("#pruleTbody").children().find("#noTd").each(function(index) {
			$(this).text(index+1);
		});
	});
	
	// 포인트 적립 유형 삭제
	$("#ptype_del").click(function() {
		var thisVal = "";
		$("input[name=prule_name_chk]:checked").each(function() { thisVal = $(this).val(); }); // 적립룰 체크된 value
		$("input[name=ptype_chk]:checked").each(function() { $(this).parent().parent().remove(); }); // 적립유형 체크된 것 삭제
		$("#ptype_tbody"+thisVal).children().find("#tNoTd").each(function(index) {	$(this).text(index+1);	}); // 삭제후 NO 세팅
	});
	
	// 포인트 적립 조건 삭제
	$("#pcond_del").click(function() {
		var thisVal = "";
		$("input[name=prule_name_chk]:checked").each(function() { thisVal = $(this).val(); }); // 적립룰 체크된 value
		$("input[name=pcond_chk]:checked").each(function() { $(this).parent().parent().remove(); }); // 적립조건 체크된 것 삭제
		$("#pcond_tbody"+thisVal).children().find("#cNoTd").each(function(index) {	$(this).text(index+1);	}); // 삭제후 NO 세팅
	});
	
	// 프로모션 추가
	$("#prmt_add_btn").click(function() {
		var $form = $('<form></form>');
	     $form.attr('action', ctx + "/loyaltyPromotionForm");
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
    	 var formFlagInput = $('<input type="hidden" value="1" name="form_flag">');
    	 var addFlagInput = $('<input type="hidden" value="1" name="add_flag">');
    	 var prmtIDInput = $('<input type="hidden" value="'+prmt_id+'" name="prmt_id">');
    	 $form.append(formFlagInput);
    	 $form.append(addFlagInput);
    	 $form.append(prmtIDInput);
    	 viewLoadingShow();
	     $form.submit();
	});

	// 프로모션 저장
	$("#prmt_save_btn").click(function() {
		var valChk = prmtValidation(); // 프로모션 validation 체크
		if(valChk){
			var pntChk = pointSaveValidation(); // 포인트 적립 validation 체크
			if(pntChk){
				var saveCnf = confirm("저장 하시겠습니까?");
				if(saveCnf){
				var prmtForm = $("#prmtForm");
				
					// 포인트 적립 룰 정보 가져오기
					var prule_name = [];
					$("input[name=prule_name]").each(function(index) {
						prule_name[index] = $(this).val();
					});
					
					// 포인트 적립 유형 정보 가져오기
					var ptype_arr = new Array();
					var ptypeLength = $("#ptype_table tbody").length-1;
					$("#ptype_table tbody").each(function(index) {
						var ptype_info_list = new Array();
						var cnt = 0;
						var ptype_info;
						var tbodyIndex = index;
						var tbChLength = $(this).children().children().children().length-1;
						$(this).children().children().children().each(function(index) {
							if($(this).is("select[name=ptype_cd]"))
								ptype_info = $(this).val();
							if($(this).is("input[name=ptype_val]")){
								ptype_info += ","+$(this).val();
								if(index == tbChLength && tbodyIndex != ptypeLength) ptype_info += "@@";
								ptype_info_list[cnt] = ptype_info;
								cnt++;
							}
						});
						ptype_arr[index] = ptype_info_list;
					});
					
					// 포인트 적립 조건 정보 가져오기
					var pcond_arr = new Array();
					var pcondLength = $("#pcond_table tbody").length-1; // tbody 개수
					$("#pcond_table tbody").each(function(index) {
						var pcond_info_list = new Array(); // tbody 하나의 적립조건 정보들 저장 배열
						var cnt = 0; // pcond_info_list의 index를 나타내는 cnt
						var pcond_info; // 적립조건 정보가 저장될 변수
						var pcond_target_cd; // 대상속성의 코드값(대상 속성값을 판단하기 위함) 
						var tbodyIndex = index; // 현재 tbody index
						var tbChLength = $(this).children().children().children().length-1; // td의 개수
						$(this).children().children().children().each(function(index) {
							if(this.name =="pcond_type_cd"){ // 적립 조건 구분 value값 넣기
								pcond_info = $(this).val();
							}
							if(this.name == "pcond_target_cd"){ // 적립 조건 대상 속성 value값 넣기
								pcond_info += ","+$(this).val();
								pcond_target_cd = $(this).val(); // 대상속성값을 구분할 값
							}
							if(pcond_target_cd == "0003" || pcond_target_cd == "0004"){ // 적립대상속성 value값을 넣기
								if(this.name == "pcond_target_val1"){
									pcond_info += ","+$(this).val();
								}
								if(this.name == "pcond_target_val2"){
									if(index == tbChLength && tbodyIndex != ptypeLength) pcond_info += "," + $(this).val() + "@@"; // tbody의 끝에 "@@" 구분자 지정
									else if(index == tbChLength && tbodyIndex == ptypeLength) pcond_info += "," + $(this).val();
									else pcond_info += ","+$(this).val() + "&&"; // tbody의 한 행의 끝에 "&&" 구분자 지정
									pcond_info_list[cnt] = pcond_info;
									cnt++;
								}
							} else {
								if(this.name == "pcond_target_val1"){
									if(index == tbChLength && tbodyIndex != ptypeLength) pcond_info += "," + $(this).val() + "@@";
									else if(index == tbChLength && tbodyIndex == ptypeLength) pcond_info += "," + $(this).val();
									else pcond_info += "," + $(this).val() + "&&";
									pcond_info_list[cnt] = pcond_info;
									cnt++;
								}
							}
						});
						pcond_arr[index] = pcond_info_list;
					});
					
					var formFlagInput = $('<input type="hidden" value="2" name="form_flag">');
					var pruleInfoInput = $('<input type="hidden" value="'+prule_name+'" name="prule_name">');
					var ptypeInfoInput = $('<input type="hidden" value="'+ptype_arr+'" name="ptype_info">');
					var pcondInfoInput = $('<input type="hidden" value="'+pcond_arr+'" name="pcond_info">');
					prmtForm.append(formFlagInput);
					prmtForm.append(pruleInfoInput);
					prmtForm.append(ptypeInfoInput);
					prmtForm.append(pcondInfoInput);
					viewLoadingShow();
					prmtForm.submit();
					
				} else {
					return false;
				}
			} else {
				return false;
			}
		} 
	});
	
	var old_prule_id = [];
	var old_ptype_id = [];
	var old_pcond_id = [];
	
	// 프로모션 편집 기능
	$("#prmt_mdfy_btn").click(function() {
		$("input[type=text]").each(function() {	$(this).prop("readonly", false);	});
		$("#prmtForm").children().find("input[type=button]").each(function() {
			$(this).prop("disabled", false);
		});
		$("select").each(function() {	$(this).prop("disabled", false);	});
		$("#prmt_step_cd").prop("disabled", false);
		$("#start_date").prop("readonly", true).datepicker();
		$("#end_date").prop("readonly", true).datepicker();
		$("input[type=button]").prop("disabled", false);
		$("#prmt_func_btn_div").hide();
		$("#prmt_save_btn_div").hide();
		$("#prmt_mdfy_btn_div").show();
		$("#prgm_name").prop("readonly",  true);
		$("#prgm_name").attr("onclick",  "loyalPrgmPopupOpen();");
		
		// 포인트적립 룰, 유형, 조건의 원래 id들을 저장(수정시 삭제에 필요)
		$("input[name=prule_id]").each(function(index) {	old_prule_id[index] = $(this).val();		});
		$("input[name=ptype_id]").each(function(index) {	old_ptype_id[index] = $(this).val();		});
		$("input[name=pcond_id]").each(function(index) {	old_pcond_id[index] = $(this).val();	});
	});
	
	// 프로모션 수정 저장
	$("#prmt_mdfy_save_btn").click(function() {
		var valChk = prmtValidation(); // 프로모션 validation 체크
		if(valChk){
			var pntChk = pointSaveValidation(); // 포인트 적립 validation 체크
			if(pntChk){
				var saveCnf = confirm("수정 하시겠습니까?");
				if(saveCnf){
					var prmtForm = $("#prmtForm");
					
					// 포인트 적립 룰 정보 가져오기
					var prule_name = [];
					$("input[name=prule_name]").each(function(index) {
						prule_name[index] = $(this).val();
					});
					// 포인트 적립 유형 정보 가져오기
					var ptype_arr = new Array();
					var ptypeLength = $("#ptype_table tbody").length-1;
					$("#ptype_table tbody").each(function(index) {
						var ptype_info_list = new Array();
						var cnt = 0;
						var ptype_info;
						var tbodyIndex = index;
						var tbChLength = $(this).children().children().children().length-1;
						$(this).children().children().children().each(function(index) {
							if($(this).is("select[name=ptype_cd]"))
								ptype_info = $(this).val();
							if($(this).is("input[name=ptype_val]")){
								ptype_info += ","+$(this).val();
								if(index == tbChLength && tbodyIndex != ptypeLength) ptype_info += "@@";
								ptype_info_list[cnt] = ptype_info;
								cnt++;
							}
						});
						ptype_arr[index] = ptype_info_list;
					});
					// 포인트 적립 조건 정보 가져오기
					var pcond_arr = new Array();
					var pcondLength = $("#pcond_table tbody").length-1; // tbody 개수
					$("#pcond_table tbody").each(function(index) {
						var pcond_info_list = new Array(); // tbody 하나의 적립조건 정보들 저장 배열
						var cnt = 0; // pcond_info_list의 index를 나타내는 cnt
						var pcond_info; // 적립조건 정보가 저장될 변수
						var pcond_target_cd; // 대상속성의 코드값(대상 속성값을 판단하기 위함) 
						var tbodyIndex = index; // 현재 tbody index
						var tbChLength = $(this).children().children().children().length-1; // td의 개수
						$(this).children().children().children().each(function(index) {
							if(this.name =="pcond_type_cd"){ // 적립 조건 구분 value값 넣기
								pcond_info = $(this).val();
							}
							if(this.name == "pcond_target_cd"){ // 적립 조건 대상 속성 value값 넣기
								pcond_info += ","+$(this).val();
								pcond_target_cd = $(this).val(); // 대상속성값을 구분할 값
							}
							if(pcond_target_cd == "0003" || pcond_target_cd == "0004"){ // 적립대상속성 value값을 넣기
								if(this.name == "pcond_target_val1"){
									pcond_info += ","+$(this).val();
								}
								if(this.name == "pcond_target_val2"){
									if(index == tbChLength && tbodyIndex != ptypeLength) pcond_info += "," + $(this).val() + "@@"; // tbody의 끝에 "@@" 구분자 지정
									else if(index == tbChLength && tbodyIndex == ptypeLength) pcond_info += "," + $(this).val();
									else pcond_info += ","+$(this).val() + "&&"; // tbody의 한 행의 끝에 "&&" 구분자 지정
									pcond_info_list[cnt] = pcond_info;
									cnt++;
								}
							} else {
								if(this.name == "pcond_target_val1"){
									if(index == tbChLength && tbodyIndex != ptypeLength) pcond_info += "," + $(this).val() + "@@";
									else if(index == tbChLength && tbodyIndex == ptypeLength) pcond_info += "," + $(this).val();
									else pcond_info += "," + $(this).val() + "&&";
									pcond_info_list[cnt] = pcond_info;
									cnt++;
								}
							}
						});
						pcond_arr[index] = pcond_info_list;
					});
					
					var formFlagInput = $('<input type="hidden" value="3" name="form_flag">');
					prmtForm.append(formFlagInput);
					if(prule_name.length != 0){
						var pruleInfoInput = $('<input type="hidden" value="'+prule_name+'" name="prule_name">');
						var ptypeInfoInput = $('<input type="hidden" value="'+ptype_arr+'" name="ptype_info">');
						var pcondInfoInput = $('<input type="hidden" value="'+pcond_arr+'" name="pcond_info">');
						prmtForm.append(pruleInfoInput);
						prmtForm.append(ptypeInfoInput);
						prmtForm.append(pcondInfoInput);
					}
					if(old_prule_id.length != 0){
						var oldPruleInfoInput = $('<input type="hidden" value="'+old_prule_id+'" name="old_prule_id">');
						var oldPtypeInfoInput = $('<input type="hidden" value="'+old_ptype_id+'" name="old_ptype_id">');
						var oldPcondInfoInput = $('<input type="hidden" value="'+old_pcond_id+'" name="old_pcond_id">');
						prmtForm.append(oldPruleInfoInput);
						prmtForm.append(oldPtypeInfoInput);
						prmtForm.append(oldPcondInfoInput);
					}
					viewLoadingShow();
					prmtForm.submit();
				} else {
					return false;
				}
			}else {
				return false;
			}
		}else {
			return false;
		}
		
	});
	
	// 프로모션 삭제
	$("#prmt_del_btn").click(function() {
		var delYN = confirm("정말 삭제 하시겠습니까?");
		if(delYN){
			var prmt_id = $("#prmt_id").val();
			var prmt_frm = $("#prmtForm");
			
			prmt_frm.prop("action", ctx+"/loyaltyPromotion");
			
			var loyalPmtChkInput = $('<input type="hidden" value="'+prmt_id+'" name="loyalPmt_chk">');	
			var delFlag = $('<input type="hidden" name="delFlag" value="1">');
			
			prmt_frm.append(loyalPmtChkInput);
			prmt_frm.append(delFlag);
			viewLoadingShow();
			prmt_frm.submit();
		} else {
			return false;
		}
	});
	
	// 프로모션 저장  취소
	$("#prmt_cancle_btn").click(function() {
		var cancleCnf = confirm("정말 취소 하시겠습니까?");
		if(cancleCnf){
			var ctx = $("#ctx").val();
			if(prmt_id == ''){
				var $form = $('<form></form>');
				viewLoadingShow();
				$form.attr('action', ctx + "/loyaltyPromotion").attr('method', 'post').appendTo('body').submit();
			} else {
				var $form = $('<form></form>');
				$form.attr('action', ctx + "/loyaltyPromotionForm").attr('method', 'post').appendTo('body');
				var promoIDInput = $('<input type="hidden" value="'+prmt_id+'" name="prmt_id">');
				 var formFlagInput = $('<input type="hidden" value="0" name="form_flag">');
				 viewLoadingShow();
				 $form.append(promoIDInput).append(formFlagInput).submit();
			}
		}
	});
	
	// 프로모션 편집 취소
	$("#prmt_mdfy_cancle_btn").click(function() {
		var cancleCnf = confirm("정말 취소 하시겠습니까?");
		if(cancleCnf){
			var ctx = $("#ctx").val();
			var $form = $('<form></form>');
			$form.attr('action', ctx + "/loyaltyPromotionForm").attr('method', 'post').appendTo('body');
			var promoIDInput = $('<input type="hidden" value="'+prmt_id+'" name="prmt_id">');
			 var formFlagInput = $('<input type="hidden" value="0" name="form_flag">');
			 viewLoadingShow();
			 $form.append(promoIDInput).append(formFlagInput).submit();
		}
	});
});

// 추가 페이지 폼 세팅
function prmtAddSetting() {
	$("#prmtForm").children().find("input[type=text]").each(function() {
		$(this).prop("readonly", false);
	});
	$("#prmtForm").children().find("input[type=button]").each(function() {
		$(this).prop("disabled", false);
	});
	$("#prmt_step_cd").prop("disabled", false);
	$("#start_date").prop("readonly", true).datepicker();
	$("#end_date").prop("readonly", true).datepicker();
	$('#start_date').val("");
	$('#end_date').val("");
	$("input[type=button]").prop("disabled", false);
	$("#prmtADTitle").text("추가");
	$("#prmt_func_btn_div").hide();
	$("#prmt_save_btn_div").show();
	$("#prgm_name").prop("readonly", true);
	$("#prmt_name").focus();
}

// 포인트 적립 Rule 선택시, 적립 유형과 적립 조건 해당 Tbody 호출
function callTypeCondList(count) {
	$("input[name=prule_name_chk]").each(function() {
		$(this).prop("checked", false);
		$(this).parent().parent().css("background-color", "white");
	});
	$("input[name=prule_name_chk]").each(function() {
		if($(this).val() == count){
			$(this).prop("checked", true);
			$(this).parent().parent().css('background-color', '#eaeaea');
		}
	});
	$("#ptype_table tbody").each(function() { $(this).hide(); });
	$("#ptype_table tbody").each(function() { if($(this).is("#ptype_tbody"+count)) $(this).css("display", "table-row-group"); });
	$("#pcond_table tbody").each(function() {	$(this).hide();	});
	$("#pcond_table tbody").each(function() {	if($(this).is("#pcond_tbody"+count)) $(this).css("display", "table-row-group"); });
}

// 날짜 선택 세팅
function datePickerSetting(id){
	$('#'+id).datepicker();
}

// 포인트 적립 유형 select 변경시 포인트 적립값 세팅
function selectOnchangeType(id) {
	$("#"+id).val("");
}
// 포인트 적립 조건 구분 select 변경시 대상속성 select 세팅
function selectOnchangeCondType(me, id, td_id) {
	var thisVal = me.value;
	if(thisVal == '0001') {
		$("#"+id).children().remove();
		$("#"+id).append(pcondTgtOption1);
		$("#"+td_id).empty();
		$("#"+td_id).append(pcondValOption1);
	} else if (thisVal == '0002') {
		$("#"+id).children().remove();
		$("#"+id).append(pcondTgtOption2);
		$("#"+td_id).empty();
		$("#"+td_id).append(pcondValOption3);
		// datepicker 적용
		$("#"+td_id).children().each(function() {
			if($(this).is("input[name=pcond_target_val1]")){
				$(this).css("width", "30%").attr("id", "pcond_date"+td_id+1).datepicker();
			}
			if($(this).is("input[name=pcond_target_val2]")){
				$(this).css("width", "30%").attr("id", "pcond_date"+td_id+2).datepicker();
			}
		});
	}
}
// 포인트 적립 조건 대상속성 select 변경시 대상속성값 세팅
function selectOnchangeCondTarget(me, id) {
	switch (me.value) {
	case "0001": // 성별
		$("#"+id).empty();
		$("#"+id).append(pcondValOption1);
		break;
	case "0002": // 연령대
		$("#"+id).empty();
		$("#"+id).append(pcondValOption2);
		break;
	case "0003": // 사용일자
		$("#"+id).empty();
		$("#"+id).append(pcondValOption3);
		// datepicker 적용
		$("#"+id).children().each(function() {
			if($(this).is("input[name=pcond_target_val1]")){
				$(this).css("width", "30%").attr("id", "pcond_date"+id+1).datepicker();
			}
			if($(this).is("input[name=pcond_target_val2]")){
				$(this).css("width", "30%").attr("id", "pcond_date"+id+2).datepicker();
			}
		});
		break;
	case "0004": // 사용시간
		$("#"+id).empty();
		$("#"+id).append(pcondValOption4);
		break;
	}
}

// 프로모션 validation 체크
function prmtValidation() {
	if($("#prmt_name").val() == ''){
		alert("프로모션 명을 입력해주세요.");
		$("#prmt_name").focus();
		return false;
	} else if($("#prmt_step_cd option:selected").val() == ''){
		alert("진행단계를 선택해주세요.");
		$("#prmt_step_cd").focus();
		return false;
	} else if($("#start_date").val() == ''){
		alert("시작일자를 입력해주세요.");
		$("#start_date").focus();
		return false;
	} else if($("#end_date").val() == ''){
		alert("종료일자를 입력해주세요.");
		$("#end_date").focus();
		return false; 
	} else if($("#prgm_name").val() == ''){
		alert("로열티 프로그램을 선택해주세요.");
		$("#prgm_name").focus();
		return false; 
	} else {
		return true;
	}
}

// 포인트 적립 Validation 체크
function pointSaveValidation() {
	var cnt = 0;
	// 포인트 적립 룰 체크
	$("input[name=prule_name]").each(function() {
		if($(this).val() == ''){
			alert("포인트 적립룰 명을 입력해주세요.");
			$(this).focus();
			cnt++;
			return false;
		}
	});
	if(cnt == 0){
		// 포인트 적립 유형 체크
		$("input[name=ptype_val]").each(function() {
			if($(this).val() == ''){
				alert("포인트 적립값을 입력해주세요.");
				$(this).focus();
				cnt++;
				return false;
			}
		});
		if(cnt == 0){
			// 포인트 적립 조건 대상속성 값 체크 1
			$("input[name=pcond_target_val1]").each(function() {
				if($(this).val() == ''){
					alert("대상 속성 값을 입력해주세요.");
					$(this).focus();
					cnt++;
					return false;
				}
			});
		}
		if(cnt == 0){
			// 포인트 적립 조건 대상속성 값 체크 2
			$("input[name=pcond_target_val2]").each(function() {
				if($(this).val() == ''){
					alert("대상 속성 값을 입력해주세요.");
					$(this).focus();
					cnt++;
					return false;
				}
			});
		}
	}
	if(cnt == 0){
		return true;
	} else{
		return false;
	}
}

// 로열티 프로그램 모달 팝업
function loyalPrgmPopupOpen() {
	
	$("#sch_prgm_name").val('');	//검색 값 초기화
	$("#prgmGubun option[value='']").prop("selected", true);	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $('#loyalPrgmModalDiv'),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '800px',
    	'height': '500px',
    	'cursor': 'default'
    	}
		,onOverlayClick : $.unblockUI
	});
	
	// 가맹점목록 표시
	viewLoyalProgramList(1);
}

// 프로그램 리스트
function viewLoyalProgramList(pageNum) {
	var ctx = $("#ctx").val();
	var sendData = "prgmGubun="+$("#prgmGubun option:selected").val()
	+"&prgm_name="+$("#sch_prgm_name").val() +"&pageNum="+pageNum;
	$.ajax({
		url: ctx + "/loyaltyProgramSearch", 
		type: "POST",  
		data: sendData,
		dataType: "json",
		success: function(data) {
			
			$("#loyalPrgmTbody").empty(); // div 내용삭제

			// 프로그램 구분 option 설정
			$("#prgmGubun").empty();
			$("#prgmGubun").append('<option value="">==선택해주세요==</option>');
			$.each(data.prmtStepCD, function(i) {
				$("#prgmGubun").append('<option value="'+this.prgm_type_cd+'">'+this.prgm_type_cd_nm+'</option>');
			});
			
			// 검색 조건 값 유지
			if(data.prgm_name != '') $("#sch_prgm_name").val(data.prgm_name);
			if(data.prgmGubun != '') $("#prgmGubun option[value="+data.prgmGubun+"]").prop("selected", true);
			
			$.each(data.loyalPrgmList, function(i) { // 테이블 내용 추가
				// 헤더에서 TR 요소 취득
				var trElement = $("#loyalPrgmListTableHeader").clone().removeClass().empty();
				var prgm_id = this.prgm_id;
				var prgm_name = this.prgm_name;
				var prgm_type_cd_nm = this.prgm_type_cd_nm;
				var prgm_repr_id = this.prgm_repr_id;
				
				trElement.bind("click", function(e) { // TR에 클릭이벤트 추가
					loyalPrgmPopupClose(); // 팝업창 닫기
					setLoyalPrgmID(prgm_id, prgm_name); // 프로그램 아이디 설정
				});
				
				mouseHoverEvent(trElement); // 마우스 오버시 화면 표시 이벤트 추가
				trElement.css('cursor', 'pointer');
				
				// tr 작성
				$("#loyalPrgmTbody").append(trElement);
				$("#loyalPrgmTbody tr:last").append("<td align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.pageNum) - 1) * 10)) + "</td>"
						+ "<td width='50%'>" + prgm_name + "</td>"
						+ "<td width='20%'>" + prgm_type_cd_nm + "</td>"
						+ "<td width='20%'>" + prgm_repr_id + "</td>");
				
				var pageContent = "";
				// 페이징 다시그리기
				$("#loyalPrgmPagingDiv").children().remove();
				
				if(data.page.startPageNum == 1 && data.page.endPageNum == 1){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='pageInput' readonly='readonly' value='"+data.page.startPageNum+"' onkeypress=\"pageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a style='text-decoration: none; color: black;'> / "+data.page.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.pageNum == data.page.startPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"pageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a href='#' onclick=viewLoyalProgramList("+data.page.endPageNum+") id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick=viewLoyalProgramList("+(parseInt(data.pageNum)+1)+") id='pNum'> ▶ </a>";
				} else if(data.pageNum == data.page.endPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick=viewLoyalProgramList("+(parseInt(data.pageNum)-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"pageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a> / "+data.page.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='franEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick=viewLoyalProgramList("+(parseInt(data.pageNum)-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"pageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a href='#' onclick=viewLoyalProgramList("+data.page.endPageNum+") id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick=viewLoyalProgramList("+(parseInt(data.pageNum)+1)+") id='pNum'> ▶ </a>";
				}
				$("#loyalPrgmPagingDiv").append(pageContent);
			});
			
			if (data.loyalPrgmList.length < 10 && data.loyalPrgmList.length > 0) {
				for (var int = 0; int < 10-data.loyalPrgmList.length; int++) {
					$("#loyalPrgmTbody").append("<tr style='background-color: white; cursor: default;'><td>&nbsp;</td><td></td><td></td><td></td></tr>");
				}
			}
			
			// 검색된 프로그램목록이 없을경우 표시
			if (data.loyalPrgmList.length == 0) {
				var trElement = $("#loyalPrgmListTableHeader").clone().removeClass().empty();
				$("#loyalPrgmTbody").append(trElement);
				$("#loyalPrgmTbody tr:last").append("<td class='list1_b' colspan='3' align='center'>검색 결과가 없습니다</td>");
			}
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("프로그램 목록을 불러올 수 없습니다.");
			return false;
		}
	});
}

// 폼에 프로그램 아이디 세팅
function setLoyalPrgmID(prgm_id, prgm_name){
	$(document).ready(function() {
		$("#prgm_id").val(prgm_id);
		$("#prgm_name").val(prgm_name);
	});
}

//마우스 오버시 화면 표시 이벤트 추가
function mouseHoverEvent(trElement) {
	trElement.bind("mouseover", function(e) {
		this.className = 'on';
	});
	trElement.bind("mouseout", function(e) {
		this.className = '';
	});
}

// 가맹점 리스트 엔터키 기능
function pageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if (pageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#franEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				viewLoyalProgramList(pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 팝업 닫기
function loyalPrgmPopupClose() {
	setTimeout($.unblockUI, 0);
}

// 팝업창 가맹점 조건값 조회
function prgmSearch(){	
	viewLoyalProgramList(1);
}
