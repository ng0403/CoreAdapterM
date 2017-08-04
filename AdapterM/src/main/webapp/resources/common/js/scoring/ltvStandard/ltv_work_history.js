/**
업 무 명 : LTV 작업 이력
작 성 자 : 
작 성 일 : 2015/10/26
수 정 자 : 
수 정 일 : 2015/10/26
내 용 : LTV 작업 이력
*참고사항 : 
 */

function goltvWorkHistroyForm(ltv_std_key){
	
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/ltvWorkHistory');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     // 상세정보일때
	     if(ltv_std_key != ''){
	    	 var ltv_std_key_input = $('<input type="hidden" value="'+ltv_std_key+'" name="ltv_std_key">');
	    	 $form.append(ltv_std_key_input);
	     }
	     viewLoadingShow();
	     $form.submit();
	
}

function ltvHstPaging(pageNum){
	
}

function ltvHstPageNumInputEnter(event){
	
	
	
}

//작업 일시중지
function ltvWorkStop(work_stat_h){
	
	var ctx = $("#ctx").val();
	var ltv_std_key_h = $('#ltv_std_key_h').val();
	
	data = {
			ltv_std_key : ltv_std_key_h,
			work_stat_cd : work_stat_h
	}
	
	
	$.ajax({
		type: "POST",  
		url: ctx+"/ltvWorkHistoryUpdate",
		data: data,
		dataType : "text",
		success: function(data) {
			
			if(data == "succ"){
				alert("성공!");
				
				if(work_stat_h=='0004'){
					$('#ltv_work_stop').css("display","none");
					$('#ltv_work_start').css("display","inline-block");
					$('#ltv_work_stop').prop("disabled",true);
					$('#ltv_work_start').prop("disabled",false);
					$('#ltvStandardTable tbody tr').children().eq(6).text("일시중지");
				}else{
					$('#ltv_work_stop').css("display","inline-block");
					$('#ltv_work_start').css("display","none");
					$('#ltv_work_stop').prop("disabled",false);
					$('#ltv_work_start').prop("disabled",true);
					$('#ltvStandardTable tbody tr').children().eq(6).text("월 작업진행중");
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

function ltv_std_history_list_sch(pageNum){
	
	var ctx = $("#ctx").val();
	
	var std_ym = $('#cbo_year').val() + $('#cbo_month').val();
	
	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/ltvWorkHistory');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var ltv_std_key_input = $('<input type="hidden" value="'+$('#ltv_std_key_h').val()+'" name="ltv_std_key">');
     var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
     
     $form.append(std_ym_input);
     $form.append(ltv_std_key_input);
     viewLoadingShow();
     $form.submit();
	
}