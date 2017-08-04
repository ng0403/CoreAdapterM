/**
업 무 명 : 쿠폰관리 상세화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/09/14
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/09/14
내 용 : 쿠폰관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	
	var add_cnt = 1;
	 
	var ctx = $("#ctx").val();
	var cupn_wid = $("#cupn_wid").val();
	var active_flg = $("#active_flg").val();
	
	//쿠폰관리 상세정보 버튼활성화 / 비활성화
	$("#coupon_detail_btn_div").show();
	$("#coupon_mdfy_btn_div").hide();
	$("#coupon_insert_btn_div").hide();
	
	$('#coupon_form_tbl').delegate('#delImg', 'click', function(){
		
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
	
	$('#coupon_form_tbl').delegate('#addImg', 'click', function(){
		
		add_cnt = $('.imgTd').children().size();
		
		if(add_cnt>6){
			alert("브랜드 설정은 최대 5개 입니다.");
			return ;
		}
		
		$.ajax({
			type: "POST",  
			url: ctx+"/cupnBrandList",
			dataType : "json",
			success: function(data) {
				
				$('.imgTd').append("<select id='brand_wid"+ (add_cnt-1) +"' name='brand_wid" +(add_cnt-1) + "' style='margin-left: 0; '>");
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
	
	
	
	// 쿠폰관리 추가 기능
	$("#coupon_detail_add").click(function() {
		couponAddFormFunc();
	});
	
	// 쿠폰관리 편집 기능
	$("#coupon_detail_mdfy").click(function() {
		$("#coupon_insert_btn_div").hide();
		$("#coupon_detail_btn_div").hide();
		$("#coupon_mdfy_btn_div").show();
		
		$("#coupon_detail input[type=text]").attr("readonly", false);
		$("#coupon_form_tbl input[type=radio]").prop("disabled", false);
		$("#coupon_form_tbl select").prop("disabled", false);
		$("#file").prop("disabled", false);
		$("#description").prop("readonly",false);
		$('#exp_start_dt').datepicker();
		$('#exp_end_dt').datepicker();
		$('#exp_start_dt').prop("readonly",true);
		$('#exp_end_dt').prop("readonly",true);
		
		$('.imgTd').append("<img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		$('.imgTd').append("<img src='"+ctx+"/resources/images/del.png' id='delImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
		
		$("#cupn_name").focus();
	});
	
	// 쿠폰 등록 저장
	$("#coupon_addsave").click(function() {
		
		if($("#file").val()==0 || $("#file").val()==null){
			alert("파일선택 선택해주세요");
			return false;
		}else if($("#cupn_name").val()=="" || $("#cupn_name").val()==null){
			alert("쿠폰명을 입력해주세요");
			return false;
		}else if($("#cb_disc_type").val()==0 || $("#cb_disc_type").val()==null){
			alert("할인구분을 선택해주세요");
			return false;
		}
		if($("#cb_disc_type").val()==1){
			if($("#disc_rate").val()=="" || $("#disc_rate").val()==null){
				alert("할인율을 입력해주세요");
				return false;
			}
		}else if($("#cb_disc_type").val()==2)
			if($("#disc_amt").val()=="" || $("#disc_amt").val()==null){
				alert("할인금액을 입력해주세요");
				return false;
			}
		else if($("#exp_start_dt").val()=="" || $("#exp_start_dt").val()==null){
			alert("유효일자를 입력해주세요");
			return false;
		}else if($("#exp_end_dt").val()=="" || $("#exp_end_dt").val()==null){
			alert("유효일자를 입력해주세요");
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
		}
		else if($("#description").val()=="" || $("#description").val()==null){
			alert("안내문구를 입력해주세요");
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
			var form = $('#couponDetailForm');
			var cupnAddMdfyFlag_input = $('<input type="hidden" value="1" name="cupnAddMdfyFlag">');
			form.append(cupnAddMdfyFlag_input);
			viewLoadingShow();
			form.submit();
		} 
	});
	
	// 쿠폰 추가 취소 기능
	$("#coupon_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#cupn_add_chk").val()=='1'){
				couponActiveFormSubmit('/couponManager', '');
			}else{
				goCouponForm(cupn_wid, active_flg);
			}
		} else {
			return false;
		}
	});
	
	// 쿠폰 편집 취소 기능
	$("#coupon_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			goCouponForm(cupn_wid, active_flg);
		} else {
			return false;
		}
	});
	
});

//동적폼생성
function couponActiveFormSubmit(url, cupn_wid) {
	var ctx = $("#ctx").val();
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx + url);
	$form.attr('method', 'post');
	$form.appendTo('body');
	
	var cupn_wid_input = $('<input type="hidden" value="'+cupn_wid+'" name="cupn_wid">');
	
	$form.append(cupn_wid_input);
	viewLoadingShow();
	$form.submit();
}

//쿠폰관리 추가부분 내용초기화
function couponAddFormFunc() {
	
	var ctx = $("#ctx").val();
	
	$("#coupon_form_title").text("쿠폰 추가");
	$("#coupon_detail_btn_div").hide();
	$("#coupon_mdfy_btn_div").hide();
	$("#coupon_insert_btn_div").show();
	
	$("#coupon_detail input[type=text]").val('');
	$("select option[value=0]").prop("selected", true);
	$("#active_flg_y").prop("disabled",false);
	$("#active_flg_n").prop("disabled",false);
	$("#coupon_detail input[type=text]").attr("readonly", false);
	$("#coupon_form_tbl input[type=radio]").prop("disabled", false);
	$("#coupon_form_tbl select").prop("disabled", false);
	$("#description").val('');
	$("#description").attr("readonly", false);
	$("#exp_start_dt").datepicker();
	 $("#exp_end_dt").datepicker();
	 $("#exp_start_dt").attr("readonly", true).css("cursor", "pointer");
	 $("#exp_end_dt").attr("readonly", true).css("cursor", "pointer");
	 
	 $('.imgTd').children().remove();
	 $('.imgTd').append("<img src='"+ctx+"/resources/images/add.png' id='addImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%;'>");
	 $('.imgTd').append("<img src='"+ctx+"/resources/images/del.png' id='delImg' style='width: 15px; height: 15px; cursor: pointer; margin-top: 3%; margin-left: 5px;'>");
	$("#file").focus();
	cupn_clearFileInputField();

}

function coupon_exp_extension(cupn_wid){
	
	var ctx = $("#ctx").val();
	var param = {
			cupn_wid : cupn_wid
	}
	
	$.ajax({
		type: "POST",  
		url: ctx+"/cupnExpCountCheck",
		data: param,
		dataType : "text",
		success: function(data) {
			
			if(data <= 19){
				alert(data + "회 연장하였습니다.");
				if(confirm("기간연장 하시겠습니까?")){
					$.ajax({
						type: "POST",  
						url: ctx+"/cupnExpDtExtension",
						data: param,
						dataType : "text",
						success: function(data) {
							
							if(data=="error"){
								alert("기간연장에 실패했습니다.");
							}else{
								alert("기간연장 되었습니다.");
								$('#exp_end_dt').val(data);
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

//파일부분삭제
function cupn_clearFileInputField() {
	$("#file").remove();	//파일 엘리멘트 삭제
	$("#divFile").append("<input name='file' id='file' type='file' onchange='previewCoupon();' style='width:53.4%;'>");	//div에 파일엘리멘트 새로 생성
	$("#preview").remove();
}

//쿠폰수정
function modCoupon() {
	
	if($("#cupn_name").val()=="" || $("#cupn_name").val()==null){
		alert("쿠폰명을 입력해주세요");
		return false;
	}else if($("#cb_disc_type").val()==0 || $("#cb_disc_type").val()==null){
		alert("할인구분을 선택해주세요");
		return false;
	}
	if($("#cb_disc_type").val()==1){
		if($("#disc_rate").val()=="" || $("#disc_rate").val()==null){
			alert("할인율을 입력해주세요");
			return false;
		}
	}else if($("#cb_disc_type").val()==2)
		if($("#disc_amt").val()=="" || $("#disc_amt").val()==null){
			alert("할인금액을 입력해주세요");
			return false;
		}
	else if($("#exp_start_dt").val()=="" || $("#exp_start_dt").val()==null){
		alert("유효일자를 입력해주세요");
		return false;
	}else if($("#exp_end_dt").val()=="" || $("#exp_end_dt").val()==null){
		alert("유효일자를 입력해주세요");
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
	}
	else if($("#description").val()=="" || $("#description").val()==null){
		alert("안내문구를 입력해주세요");
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
//	setValue();
	var addYn = confirm("저장 하시겠습니까?");
	if(addYn){
		
		var url = "/modCoupon";								//입력항목 수정액션
		var condition = $("form[name=couponDetailForm]").serialize();		//파라미터 세팅
		var fileChanged = false;
		if($('#file').val() != null && $('#file').val() != ''){	//이미지 파일 변경 여부
			fileChanged = true;
			setFileName();
		}
		if(fileChanged){										//이미지 변경시
			url = "/modImageCoupon";							//이미지파일 수정액션
		}
		
		// 비동기로 form 데이타 전송
		var options = {
				type:"POST",
				url: ctx + url,
				success: function(data) {
					if(data.modCouponRst != 1){
						alert("쿠폰수정에 실패하였습니다.");
						return;
					} else {
						alert("쿠폰이 정상적으로 수정되었습니다.");
						//쿠폰상세정보조회
						goCouponForm(data.cupn_wid, data.active_flg);
					}
				},
				error: function(data) { 
					alert("쿠폰 정보를 취득하지 못했습니다.");
					return false;
				}
		};
		$("#couponDetailForm").ajaxSubmit(options);		
	}
}

//미리보기로 이미지 로딩후 hidden속성에 파일명 저장
function setFileName(){
	var fname = $('#file').val().toString();
	var s = fname.lastIndexOf("\\");
	var m = fname.lastIndexOf(".");
	var e = fname.length;
	var filename = fname.substring(s+1,m);
	var extname  = fname.substring(m+1,e);
	var fullname = filename+"."+extname;
	$('#file_name').attr("value",fullname);
}