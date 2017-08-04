/**
업 무 명 : 고객 등급 기준
작 성 자 : 이지용
작 성 일 : 2015/10/26
수 정 자 : 이지용
수 정 일 : 2015/10/26
내 용 : 고객 등급 기준
*참고사항 : 
 */

$(document).ready(function() {
	
	var ctx = $("#ctx").val();
	
	$("#cgmd_detail_btn_div").show();
	$("#cgmd_mdfy_btn_div").hide();
	$("#cgmd_insert_btn_div").hide();
	
	// 로열티프로그램 편집 기능
	$("#cgmd_detail_mdfy").click(function() {
		$("#cgmd_insert_btn_div").hide();
		$("#cgmd_detail_btn_div").hide();
		$("#cgmd_mdfy_btn_div").show();
		$("#cust_grd_div").prop("disabled", true);
		
		$("input[class=act]").each(function() { /* 반복문 아이디 각각을 가져오는방법 */
			
	 		$(this).prop("disabled", false);

		});
		$("select[class=act]").each(function() { /* 반복문 아이디 각각을 가져오는방법 */
			
			$(this).prop("disabled", false);
			
		});
	});
	
	
	// 프로그램 수정 저장
	$("#cgmd__mdfysave").click(function() {
		var cgmdMdfyYn = confirm("수정하시겠습니까?");
		var valid = true;
		if(cgmdMdfyYn){
			//데이터 값 검사
			$("#cgmdTbody tr").each(function(index,item) {
					visit_cnt_min = $(item).children().eq(1).children();
					visit_abv_cd  = $(item).children().eq(2).children();
					visit_cnt_max = $(item).children().eq(3).children();
					visit_blw_cd  = $(item).children().eq(4).children(); 
					pchs_amt_min  = $(item).children().eq(5).children();
					pchs_abv_cd   = $(item).children().eq(6).children();
					pchs_amt_max  = $(item).children().eq(7).children();
					pchs_blw_cd   = $(item).children().eq(8).children(); 
					if(visit_cnt_min.val()==''){ alert("최소 연간 방문횟수를 입력하세요."); visit_cnt_min.focus(); valid=false; return; }
					else if(visit_abv_cd.val()==''){ alert("최소 연간 방문타입을 선택하세요."); visit_abv_cd.focus(); valid=false; return;}
					else if(visit_cnt_max.val()==''){ alert("최대 연간 방문횟수를 입력하세요."); visit_cnt_max.focus(); valid=false; return;}
					else if(visit_blw_cd.val()==''){ alert("최대 연간 방문타입을 선택하세요."); visit_blw_cd.focus(); valid=false; return;}
					else if(pchs_amt_min.val()==''){ alert("최소 연간 구매금액을 입력하세요."); pchs_amt_min.focus(); valid=false; return;}
					else if(pchs_abv_cd.val()==''){ alert("최소 연간 구매타입을 선택하세요."); pchs_abv_cd.focus(); valid=false; return;}
					else if(pchs_amt_max.val()==''){ alert("최대 연간 구매금액을 입력하세요."); pchs_amt_max.focus(); valid=false; return;}
					else if(pchs_blw_cd.val()==''){ alert("최대 연간 구매타입을 선택하세요."); pchs_blw_cd.focus(); valid=false; return;}
					else if(isValidNumber(visit_cnt_min.val())==false){ alert("숫자만 입력 가능 합니다."); visit_cnt_min.focus(); valid=false; return;}
					else if(isValidNumber(visit_cnt_max.val())==false){ alert("숫자만 입력 가능 합니다."); visit_cnt_max.focus(); valid=false; return;} 
					else if(isValidNumber(pchs_amt_min.val()) ==false){ alert("숫자만 입력 가능 합니다."); pchs_amt_min.focus(); valid=false; return;} 
					else if(isValidNumber(pchs_amt_max.val()) ==false){ alert("숫자만 입력 가능 합니다."); pchs_amt_max.focus(); valid=false; return;}  
					else if((parseInt(visit_cnt_min.val()) > parseInt(visit_cnt_max.val())) || 
						   (visit_abv_cd.val()=="0001" &&  visit_blw_cd.val()=="0002" && parseInt(visit_cnt_min.val()) == parseInt(visit_cnt_max.val())) ||
						   (visit_abv_cd.val()=="0002" &&  visit_blw_cd.val()=="0001" && parseInt(visit_cnt_min.val()) == parseInt(visit_cnt_max.val())) ||
						   (visit_abv_cd.val()=="0002" &&  visit_blw_cd.val()=="0002" && (parseInt(visit_cnt_min.val()) == parseInt(visit_cnt_max.val()) || ((parseInt(visit_cnt_min.val()))+1) == parseInt(visit_cnt_max.val()))))
						    { alert("최소값이 최대값보다 클 수 없습니다."); visit_cnt_min.focus(); valid=false; return; }
					else if((parseInt(pchs_amt_min.val()) > parseInt(pchs_amt_max.val())) || 
							(pchs_abv_cd.val()=="0001" &&  pchs_blw_cd.val()=="0002" && parseInt(pchs_amt_min.val()) == parseInt(pchs_amt_max.val())) ||
							(pchs_abv_cd.val()=="0002" &&  pchs_blw_cd.val()=="0001" && parseInt(pchs_amt_min.val()) == parseInt(pchs_amt_max.val())) ||
							(pchs_abv_cd.val()=="0002" &&  pchs_blw_cd.val()=="0002" && (parseInt(pchs_amt_min.val()) ==parseInt(pchs_amt_max.val()) || ((parseInt(pchs_amt_min.val()))+1) == parseInt(pchs_amt_max.val()))))
							{ alert("최소값이 최대값보다 클 수 없습니다."); pchs_amt_min.focus(); valid=false; return;	}
				
			});	
			if(valid==false){
				return;
			}
			var cnt = 0;
			var cgmdTbodyLen = $("#cgmdTbody tr").length; 
			$("#cgmdTbody tr").each(function(index) {
				var data="";
				// tr 한줄 데이터 넣기
				var modifyYn="N";
				$(this).children().each(function(index) {
						switch (index) {
							case 0:data += "cust_grd_key="+$(this).children().eq(1).val()+"&"; break;
							case 1:data += "visit_cnt_min="+$(this).children().val()+"&"; break;
							case 2:data += "visit_abv_cd="+$(this).children().val()+"&"; break;
							case 3:data += "visit_cnt_max="+$(this).children().val()+"&"; break;
							case 4:data += "visit_blw_cd="+$(this).children().val()+"&"; break;
							case 5:data += "pchs_amt_min="+$(this).children().val()+"&"; break;
							case 6:data += "pchs_abv_cd="+$(this).children().val()+"&"; break;
							case 7:data += "pchs_amt_max="+$(this).children().val()+"&"; break;
							case 8:data += "pchs_blw_cd="+$(this).children().val()+"&"; break;
						}
						//수정여부 확인
						if(index != 0 ){
							if($(this).children().val() != $(this).children().eq(1).val()){
								modifyYn ="Y";
							}
						}
				});
						data += "modify_yn="+modifyYn;
				// tr 한줄 데이터 전송 수정
				$.ajax({
					type: "POST",  
					url: ctx+"/custGradeUpdateAjax",
					data: data,
					dataType : "json",
					success: function(data) {
						if(data == 1)	cnt++;
						if(cnt == cgmdTbodyLen) location.reload();
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
				
			});
		}
	});
	
	// 쿠폰 추가 취소 기능
	$("#cgmd_acancel").click(function() {
		var addYn = confirm("취소 하시겠습니까?");
		
		if(addYn){
			if($("#cgmd_add_chk").val()=='1'){
				cgmdActiveFormSubmit('/customerGradeManager', '');
			}else{
				location.reload();
			}
		} else {
			return false;
		}
	});
	
	// 프로그램 편집 취소 기능
	$("#cgmd_mcancel").click(function() {
		var mdfyYn = confirm("취소 하시겠습니까?");
		if(mdfyYn){
			location.reload();
		} else {
			return false;
		}
	});

});

function stepChng() {
	viewLoadingShow();
	$("#stepChngForm").submit();
}
