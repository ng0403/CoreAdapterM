/**
업 무 명 : ltv 분류별 가중치
작 성 자 : 
작 성 일 : 2015/10/26
수 정 자 : 
수 정 일 : 2015/10/26
내 용 : ltv 분류별 가중치
*참고사항 : 
 */

$(document).ready(function() {
	
});

//조회 버튼 기능
function ltvCateWegSch() {
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	$("#f_ltvWeight").append(sch_flg);
	viewLoadingShow();
	$("#f_ltvWeight").submit();
}
