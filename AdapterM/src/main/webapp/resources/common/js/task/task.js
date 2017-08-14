/**
* 함수 목록
* searchKeyword()                       : 상담 조회
* task_add() 							: 상담 단건 추가
* taskDetail(a)							: 상담 상세정보
* task_add_save()						: 상담 저장
* task_modify_save()					: 상담 수정 
* task_cancel()							: 상담 취소버튼(리스트로 이동)
* task_row_add(cust_no)					: 테이블 행 추가
* task_remove() 						: 테이블 행 삭제
* 
*/

var ctx = $("#ctx").val();




//상담 단건 추가
function task_add(){
	 location.href="/taskForm?task_no="
}

//상담 상세정보
function taskDetail(a) {
  var no = a; 
  location.href="/taskForm?task_no=" + no; 
}