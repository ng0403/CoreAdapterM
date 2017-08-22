/**
* 함수 목록
* taskSchList(taskPageNum)              : 상담 조회
* taskCancelList()						: 검색 input text 값 삭제(빈칸)
* task_add_save()                   	: 상담 단건 추가
* taskDetail(a)                     	: 상담 상세정보
* enterSearch(event)                	: 엔터키 기능
* taskPageNumInputEnter(event)          : 페이징 엔터키 기능
* taskPaging(pageNum)              	 	: 페이징 함수
* download_list_Excel(formID)			: 엑셀 출력 함수
* download_Excel_form(a)				: 엑셀 양식 출력
* taskExcelImportOpen() 				: 엑셀 Import 팝업
* taskExcelCheck()						: 엑셀 Insert
* taskCheckFileType(filePath) 			: 엑셀 파일 추가
*/

var ctx = $("#ctx").val();
var flg = $("#flg").val();

//상담조회
function taskSchList(pageNum) {
   
   var task_no_srch    = $("#task_no_srch").val();
   var subject_srch    = $("#subject_srch").val();
   var cust_name_srch  = $("#cust_name_srch").val();
   var emp_name_srch   = $("#emp_name_srch").val();
   var next_day_srch   = $("#next_day_srch").val();
   var dtype_cd_srch   = $("#dtype_cd_srch").val();
   

   var tbody = $('#task_list_tbody');
   var tbodyContent = "";
   
   $.ajax({
      url:ctx + '/task_sch',
      type: 'POST',
      data: {
         taskPageNum       : pageNum,
         task_no_srch      : task_no_srch,
         subject_srch      : subject_srch,
         cust_name_srch    : cust_name_srch,
         emp_name_srch     : emp_name_srch,
         next_day_srch     : next_day_srch,
         dtype_cd_srch     : dtype_cd_srch
      },
      dataType:'json',
      success: function(data){
    	  tbody.children().remove();
    	  if(data.srcList == 0){
    		  tbodyContent = "<tr style='height: 75px;'><td colspan='9' style='width: 1320px; text-align: center;  vertical-align: middle;'>검색 결과가 없습니다.</td></tr>";
    		  tbody.append(tbodyContent);
			}else{
				
		         var size = data.srcList.length;
		         for(var i=0; i<size; i++)
		         {
		            tbodyContent = "<tr>" +
		             "<td style='text-align: left;' >" +data.srcList[i].task_no +"</td>" +
		             "<td style='text-align: left;'>" +
		                "<a onclick=taskDetail('"+data.srcList[i].task_no+"'); id='"+data.srcList[i].task_no+"'>" + data.srcList[i].subject+"</a></td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].cust_no +"</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].cust_name +"</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].phone_no + "</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].emp_no + "</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].next_day + "</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].dtype_cd + "</td>" +
		             "<td style='text-align: left;'>" + data.srcList[i].create_date + "</td>" +
		             "</tr>"

		            tbody.append(tbodyContent);
		         }
			}

    	  	// 페이징
	         $(".pagingDiv").empty();
	         var pageContent = "";
	
	         if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
	            pageContent = "◀ <input type='text' id='taskPageNum' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
	         } else if(data.taskPageNum == data.page.startPageNum){
	            pageContent = "<input type='hidden' id='taskPageNum' value='"+data.taskPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
	            +"◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
	            +"<a onclick=\"taskSchList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
	            +"<a onclick=\"taskSchList("+(data.taskPageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
	         } else if(data.taskPageNum == data.page.endPageNum){
	            pageContent = "<input type='hidden' id='taskPageNum' value='"+data.taskPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
	            +"<a onclick=\"taskSchList("+(data.taskPageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
	            +"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
	            +"<a> / "+data.page.endPageNum+"</a> ▶";
	         } else {
	            pageContent = "<input type='hidden' id='taskPageNum' value='"+data.taskPageNum+"'/><input type='hidden' id='taskEndPageNum' value='"+data.page.endPageNum+"'/>"
	            +"<a onclick=\"taskSchList("+(data.taskPageNum-1)+",2);\" id='pNum' style='cursor: pointer;'> ◀ </a>"
	            +"<input type='text' id='pageInput' value='"+data.taskPageNum+"' onkeypress=\"taskPageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
	            +"<a onclick=\"taskSchList("+data.page.taskPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
	            +"<a onclick=\"taskSchList("+(data.taskPageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
	         }
	         $(".pagingDiv").append(pageContent);
	      },
	      error: function(){
	         alert("error");
	      }
	   });
}


//검색 취소버튼
function taskCancelList() {
	$('#task_no_srch').val('');
	$('#subject_srch').val('');
	$('#cust_name_srch').val('');
	$('#emp_name_srch').val('');
	$('#next_day_srch').val('');
	$('#dtype_cd_srch').val('');
}

//상담 단건 추가
function task_add(){
	//focus, css, readonly, disabled false 상태로 변경
	//값 초기화
	$("#subject").focus();
	$("#task_form_tbl input[type='text'], textarea, input[type='date']").attr({
		readonly:false,
		style:'background-color:white'
	}).val('');
	$("#task_form_tbl select").attr({
		display:false,
		style:'background-color:white'
	});
	
	location.href="/task_detail?task_no="
}

//상담 상세정보
function taskDetail(a) {
  var no = a; 
  location.href="/task_detail?task_no=" + no; 
}

//엔터키 기능
function taskenterSearch(event) 
{
   var keycode = (event.keyCode ? event.keyCode : event.which);
   if (keycode == '13') {
      searchKeyword()(1, 1);
   }
   event.stopPropagation();
}

//페이징 엔터키
function taskPageNumInputEnter(event) {
   var keycode = (event.keyCode ? event.keyCode : event.which);
   if (keycode == '13') {
      var pageNum = parseInt($("#pageInput").val());
      if ($("#pageInput").val() == '') {
         alert("페이지 번호를 입력하세요.")
         $("#pageInput").val($("#pageNum").val());
         $("#pageInput").focus();
      } else if(pageNum > parseInt($("#endPageNum").val())) {
         alert("페이지 번호가 너무 큽니다.");
         $("#pageInput").val($("#pageNum").val());
         $("#pageInput").focus();
      } else if (1 > pageNum) {
         alert("페이지 번호가 너무 작습니다.");
         $("#pageInput").val($("#pageNum").val());
         $("#pageInput").focus();
      } else {
         taskPaging(pageNum);
      }
   }
   event.stopPropagation();
}

//페이징 함수
function taskPaging(pageNum) {
   $(document).ready(function() {
      // 컨트롤러로 전송
      var ctx = $("#ctx").val();
      var taskListForm = $("#taskListPagingForm");
        
       var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
    
       taskListForm.append(pageNumInput);
       viewLoadingShow();
       taskListForm.submit();
   });
}


//엑셀 출력 적용 함수
function download_list_Excel(formID, flg) {
   
	var t = flg;
   var ctx = $("#ctx").val();
   var form = $("#"+formID);
   var excel = $('<input type="hidden" value="true" name="excel">');
   var flg = $('<input type="hidden" value="'+flg+'" name="flg">');
   
   if(confirm("리스트를 출력하시겠습니까? 대량의 경우 대기시간이 필요합니다.")) 
   {
	   form.append(excel);
	   form.append(flg);
      
       form.attr("action", "/toExcel");
       form.submit();
         
   } 
   $("input[name=excel]").val("");
}

//엑셀 양식 다운로드 
function download_Excel_form(a) { 
	var ctx = $("#ctx").val();
	var form = $("#"+formID);
    var flg = a;
	var excel = $('<input type="hidden" value="true" name="excel">');
	
	if(confirm("엑셀 양식을 다운로드 받으시겠습니까?")) 
	{
			
			form.append(flg);
			form.append(excel); 
			if(flg == 1) 
			{
				form.attr("action", "/toLeadExcel");
				form.submit(); 
			}  
 
	} 
	$("input[name=excel]").val("");
}

function exportToExcel(){
   document.taskExcelForm.action="/toExcel";
   document.taskExcelForm.method="POST"
   document.taskExcelForm.submit();
}


//엑셀 Import 팝업	
function taskExcelImportOpen() 
{
	var popWidth  = '520'; // 파업사이즈 너비
	var popHeight = '160'; // 팝업사이즈 높이
	var winHeight = document.body.clientHeight;	// 현재창의 높이
	var winWidth = document.body.clientWidth;	// 현재창의 너비
	var winX = window.screenLeft;	// 현재창의 x좌표
	var winY = window.screenTop;	// 현재창의 y좌표

	var popX = winX + (winWidth - popWidth)/2;
	var popY = winY + (winHeight - popHeight)/2;
	var popUrl = "taskExcelImportTab";
	var popOption = "width=520, height=160, resize=no, scrollbars=no, status=no, location=no, directories=no; ,top=pop,left=popX";
	window.open(popUrl, "_blank","width="+popWidth+"px,height="+popHeight+"px,top="+popY+",left="+popX);
}

//엑셀파일 insert
function taskExcelCheck()
{
var excelFile = $("#excelFile").val();

if (excelFile == "" || excelFile == null) 
{
    alert("파일을 선택해주세요.");
    
    return false;
} 
else if (!taskCheckFileType(excelFile)) 
{
    alert("엑셀 파일만 업로드 가능합니다.");
    
    return false;
}
if (confirm("업로드 하시겠습니까?")) 
{
	$("#excelUploadForm").append(excelFile);
	$("#excelUploadForm").submit();
	}
	
//	opener.parent.location.reload();
}

//엑셀 파일 추가 fucntion
function taskCheckFileType(filePath) 
{
	var fileFormat = filePath.split(".");
	
	if (fileFormat.indexOf("xlsx") > -1) {
		return true;
	} 
	else {
		return false;
	}

}