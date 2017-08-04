/**
업 무 명 : RFM 작업 이력
작 성 자 : 
작 성 일 : 2015/10/26
수 정 자 : 
수 정 일 : 2015/10/26
내 용 : RFM 작업 이력
*참고사항 : 
 */

function goRfmWorkHistroyForm(rfm_std_key){
	
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/rfmWorkHistory');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     // 상세정보일때
	     if(rfm_std_key != ''){
	    	 var rfm_std_key_input = $('<input type="hidden" value="'+rfm_std_key+'" name="rfm_std_key">');
	    	 $form.append(rfm_std_key_input);
	     }
	     viewLoadingShow();
	     $form.submit();
	
}

function rfmHstPaging(pageNum){
	
}


function rfmHstPageNumInputEnter(event){
	
	
	
}

//페이징 함수
function rfmHstPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var std_ym = $('#cbo_year').val() + $('#cbo_month').val();
		
		var f_grdStdList = $("#f_rfmHstList");
		var grd_std_key_input = $('<input type="hidden" value="'+$('#rfm_std_key_h').val()+'" name="rfm_std_key">');
		var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    f_grdStdList.append(pageNumInput);
	    f_grdStdList.append(std_ym_input);
	    f_grdStdList.append(grd_std_key_input);
	    
	    viewLoadingShow();
	    f_grdStdList.submit();
	});
}

function rfm_std_history_list_sch(pageNum){
	
	var ctx = $("#ctx").val();
	
	var std_ym = $('#cbo_year').val() + $('#cbo_month').val();
	
	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/rfmWorkHistory');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var grd_std_key_input = $('<input type="hidden" value="'+$('#rfm_std_key_h').val()+'" name="rfm_std_key">');
     var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
     
     $form.append(std_ym_input);
     $form.append(grd_std_key_input);
     viewLoadingShow();
     $form.submit();
	
}

function rfmWorkStop(work_stat_h){
	
	var ctx = $("#ctx").val();
	var rfm_std_key_h = $('#rfm_std_key_h').val();
	
	data = {
			rfm_std_key : rfm_std_key_h,
			work_stat_cd : work_stat_h
	}
	
	
	$.ajax({
		type: "POST",  
		url: ctx+"/rfmWorkHistoryUpdate",
		data: data,
		dataType : "text",
		success: function(data) {
			
			if(data == "succ"){
				alert("성공!");
				
				if(work_stat_h=='0004'){
					$('#rfm_work_stop').css("display","none");
					$('#rfm_work_start').css("display","inline-block");
					$('#rfm_work_stop').prop("disabled",true);
					$('#rfm_work_start').prop("disabled",false);
					$('#rfmStandardTable tbody tr').children().eq(7).text("일시중지");
				}else{
					$('#rfm_work_stop').css("display","inline-block");
					$('#rfm_work_start').css("display","none");
					$('#rfm_work_stop').prop("disabled",false);
					$('#rfm_work_start').prop("disabled",true);
					$('#rfmStandardTable tbody tr').children().eq(7).text("월 작업진행중");
				}
				
			}else{
				alert("정보 수정에 실패했습니다.");
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