/**
업 무 명 : 번호발급 화면
작 성 자 : 이상민 (tkdals8401@coreplus.co.kr)
작 성 일 : 2015/09/22
수 정 자 : 이상민 (tkdals8401@coreplus.co.kr)
수 정 일 : 2015/09/22
내 용 : 번호발급에 대한 javascript 코드이다.
*참고사항 : 
 */
 
// 번호발급 엑셀출력
function numIssueExcel(){
	var type = $("#category_type_div").children('option:selected').val();
	var qty = $("#qty").val();
	var start_dt = $("#expired_start_dt").val();
	var end_dt = $("#expired_end_dt").val();
	
	if(type == 0){
		alert("채번구분을 선택해주세요!");
		return;
	}
	if(qty < 1){
		alert("0보다 큰 채번갯수를 입력해 주세요!");
		return;
	}
	if(start_dt == null || start_dt == ""){
		alert("유효기간을 선택해주세요!");
		return;
	}
	if(end_dt == null || end_dt == ""){
		alert("유효기간을 선택해주세요!");
		return;
	}
	
	if(confirm("엑셀파일로 다운 받으시겠습니까?\n\n현재 조회된 결과의 전체를 다운받습니다.\n양이 많으면 시간이 오래 걸릴 수 있습니다.")) {
		viewLoadingShow();
		$("#numIssue_form").submit();
	}
}