/**
업 무 명 : 법인 고객 상세정보 화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/11/24
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/11/24
내 용 : 법인 고객 상세정보 화면에 대한 javascript 코드이다.
*참고사항 : 
*/

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	var cust_wid = $("#cust_wid").val();
	
	//법인 고객 상세정보 버튼활성화 / 비활성화
	$("#custcomp_detail_btn_div").show();
	$("#custcomp_insert_btn_div").hide();
	$("#custcomp_mdfy_btn_div").hide();
	$("#custcomp_ex_btn_div").hide();
	
	// 법인 고객 추가 기능
	$("#custcomp_detail_add").click(function() {
		custCompAddFormFunc();
	});
	
	// 법인고객 등록 저장
	$("#custcomp_addsave").click(function() {
		
		if($("#cust_name").val()=="" || $("#cust_name").val()==null){
			alert("고객명을 입력해주세요");
			return false;
		}else if($("#id").val()=="" || $("#id").val()==null){
			alert("id를 입력해주세요");
			return false;
		}else if($("#comp_num1").val()=="" || $("#comp_num1").val()==null || $("#comp_num2").val()=="" || $("#comp_num2").val()==null || $("#comp_num3").val()=="" || $("#comp_num3").val()==null){
			alert("사업자번호를 입력해주세요");
			return false;
		}else if($("#cont_start_dt").val()=="" || $("#cont_start_dt").val()==null || $("#cont_end_dt").val()=="" || $("#cont_end_dt").val()==null){
			alert("계약기간을 선택해주세요");
			return false;
		}
	
		var addYn = confirm("저장 하시겠습니까?");
		if(addYn){
			$.ajax({
				url : ctx + "/custCompIDChk",
				data : "id="+$("#id").val(),
				type : "post",
				success : function(data) {
					if(data == 1){
						alert("법인고객에 등록된 ID 입니다.");
						return;
					} else if(data == 0) {
						var form = $('#custCompDetailForm');
						var compAddMdfyFlag_input = $('<input type="hidden" value="1" name="compAddMdfyFlag">');
						form.append(compAddMdfyFlag_input);
						form.submit();
					}
				},
				beforeSend: function(){
		        	viewLoadingShow();			
		        },
		        complete:function(){
		        	viewLoadingHide();	
		        },
				error : function(data) {
					alert("ID 중복체크 중 오류가 발생했습니다.");
				}
			});
		} 
	});
	
	// 법인 고객 편집 기능
	$("#custcomp_detail_mdfy").click(function() {
		$("#custCompTitle").text("법인고객 편집");
		$("#custcomp_detail_btn_div").hide();
		$("#custcomp_insert_btn_div").hide();
		$("#custcomp_mdfy_btn_div").show();
		
		$("#custManagerDetailDiv input[type=text]").attr("readonly", false);
		$("#cust_name").attr("readonly", true);
		$("#id").attr("readonly", true);
		$("#cont_start_dt").datepicker();
		$("#cont_end_dt").datepicker();
		$("#cont_start_dt").attr("readonly", true).css("cursor", "pointer");
		$("#cont_end_dt").attr("readonly", true).css("cursor", "pointer");
		
		$("#comp_num1").focus();
	});
	
	// 법인고객 수정 저장
	$("#custcomp_mdfysave").click(function() {
		var mdfyYn = confirm("수정하시겠습니까?");
		var m_frm = $("#custCompDetailForm");
		var compAddMdfyFlag = $('<input type="hidden" value="2" name="compAddMdfyFlag">');	
		m_frm.append(compAddMdfyFlag);
		if(mdfyYn){
			m_frm.submit();
		}
	});
	
	// 법인고객 추가 취소 기능
	$("#custcomp_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#comp_add_chk").val()=='1'){
				go_custComp_list();
			}else{
				custCompDetail(cust_wid);
			}
		} else {
			return false;
		}
	});
	
	// 법인고객 편집 취소 기능
	$("#custcomp_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			custCompDetail(cust_wid);
		} else {
			return false;
		}
	});
});

//법인고객 추가부분 내용초기화
function custCompAddFormFunc() {
	$("#custCompTitle").text("법인고객 추가");
	$("#custcomp_detail_btn_div").hide();
	$("#custcomp_mdfy_btn_div").hide();
	$("#custcomp_ex_btn_div").hide();
	$("#custcomp_insert_btn_div").show();
	
	$("#custManagerDetailDiv input[type=text]").val('');
	$("#custManagerDetailDiv input[type=text]").attr("readonly", false);
	$("#id").attr("readonly", true);
	$("#custSearch").attr("disabled", false);
	$("#cont_start_dt").datepicker();
	$("#cont_end_dt").datepicker();
	$("#cont_start_dt").attr("readonly", true).css("cursor", "pointer");
	$("#cont_end_dt").attr("readonly", true).css("cursor", "pointer");
	$("#cust_name").prop("readonly", true);
	$("#comp_num1").focus();
	$("#cust_comp_div").show();
}

// 단건 다건 폼 변경
function custCompChng() {
	var cust_comp_div = $("#cust_comp_div").val();
	
	if(cust_comp_div == 0001){		// 단건 적립 
		$("#custComp_form_one_tbl").show();
		$("#custComp_form_multi_tbl").hide();
		$("#custcomp_ex_btn_div").hide();
		$("#custcomp_insert_btn_div").show();
	} else if(cust_comp_div == 0002){ // 다건 적립
		$("#custComp_form_one_tbl").hide();
		$("#custComp_form_multi_tbl").show();
		$("#cont_start_dt_excel").datepicker().prop("readonly", true).css("cursor", "pointer");
		$("#cont_end_dt_excel").datepicker().prop("readonly", true).css("cursor", "pointer");
		$("#custcomp_ex_btn_div").show();
		$("#custcomp_insert_btn_div").hide();
	}
}

// 엑셀파일체크
function excelFileChk() {
	var file = $("#file").val();
	if(!excelFileCheck(file)) return;
}

//엑셀파일체크
function excelFileCheck(file){
	banArray = new Array(".xls", ".xlsx");    // 걸러낼 확장자를 등록
	banFile = false;
	while (file.indexOf("\\") != -1){
		file = file.slice(file.indexOf("\\") + 1);
		ban = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();    
		for (var i = 0; i < banArray.length; i++) {
			if (banArray[i] == ban) {
				banFile = true;
			}
		}
		if (banFile == false) {
			alert(ban + " 파일은 첨부할 수 없는 파일입니다.");
			fileFormReset();
			break;
		}
	}
	return banFile;
}

// 파일 폼 초기화
function fileFormReset() {
	$("#file_td").empty();
	$("#file_td").append('<input name="file" id="file" type="file" readonly="readonly" style="width: 50%; text-align: center;" onchange="excelFileChk();">');
}

// 법인고객 엑셀 업로드 저장
function custCompExcelUpload() {
	var ctx = $("#ctx").val();
	
	if($("#file").val() == ''){
		alert("파일을 선택해 주세요.");
		return;
	} else if($("#cont_start_dt_excel").val() == ''){
		alert("시작일자를 선택해 주세요.");
		return;
	} else if($("#cont_end_dt_excel").val() == ''){
		alert("종료일자를 선택해 주세요.");
		return;
	}
	
	if(confirm("저장 하시겠습니까?")){
		var options = {
				type:"POST",
				cache: false,
				url: ctx + "/custCompExcelForm",
				success: function(data) {
					alert(data.upRst+"건 수정, " + data.inRst +"건 등록 되었습니다.");
					go_custComp_list();
				}, error: function(data) { 
					alert("엑셀 업로드 중 에러가 발생했습니다.");
					fileFormReset();
					return;
				} 
		};
		
		$("#custCompExcelForm").ajaxSubmit(options);
	}
}














