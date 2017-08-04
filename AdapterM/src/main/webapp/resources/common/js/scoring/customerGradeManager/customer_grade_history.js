function grd_std_history_list_sch(pageNum){
	
	var ctx = $("#ctx").val();
	
	var std_ym = $('#cbo_year').val() + $('#cbo_month').val();
	
	//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
	var $form = $('<form></form>');
     $form.attr('action', ctx+'/customerGradeWorkHistory');
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     var grd_std_key_input = $('<input type="hidden" value="'+$('#grd_std_key_h').val()+'" name="grd_std_key">');
     var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
     
     $form.append(std_ym_input);
     $form.append(grd_std_key_input);
     viewLoadingShow();
     $form.submit();
	
}

//페이징 함수
function grdHstPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
//		var std_ym = $('#cbo_year').val() + $('#cbo_month').val();
		var std_ym = "";
		
		var f_grdStdList = $("#f_grdHstList");
		var grd_std_key_input = $('<input type="hidden" value="'+$('#grd_std_key_h').val()+'" name="grd_std_key">');
		var std_ym_input = $('<input type="hidden" value="'+std_ym+'" name="std_ym">');
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    f_grdStdList.append(pageNumInput);
	    f_grdStdList.append(std_ym_input);
	    f_grdStdList.append(grd_std_key_input);
	    
	    viewLoadingShow();
	    f_grdStdList.submit();
	});
}

//작업 일시중지
function grdWorkStop(work_stat_h){
	
	var ctx = $("#ctx").val();
	var grd_std_key_h = $('#grd_std_key_h').val();
	
	data = {
			grd_std_key : grd_std_key_h,
			work_stat_cd : work_stat_h
	}
	
	
	$.ajax({
		type: "POST",  
		url: ctx+"/customerGradeWorkHistoryUpdate",
		data: data,
		dataType : "text",
		success: function(data) {
			
			if(data == "succ"){
				alert("성공!");
				
				if(work_stat_h=='0004'){
					$('#grd_work_stop').css("display","none");
					$('#grd_work_start').css("display","inline-block");
					$('#grd_work_stop').prop("disabled",true);
					$('#grd_work_start').prop("disabled",false);
					$('#grdStandardTable tbody tr').children().eq(6).text("일시중지");
				}else{
					$('#grd_work_stop').css("display","inline-block");
					$('#grd_work_start').css("display","none");
					$('#grd_work_stop').prop("disabled",false);
					$('#grd_work_start').prop("disabled",true);
					$('#grdStandardTable tbody tr').children().eq(6).text("월 작업진행중");
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