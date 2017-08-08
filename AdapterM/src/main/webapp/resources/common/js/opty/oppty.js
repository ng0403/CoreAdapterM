/**
 * 
 * opptyDetail(oppty_no)			:: Detail 화면으로 이동.
 * 
 */

function opptyDetail(oppty_no, flg)
{
	var ctx = $("#ctx").val();
	
	location.href = ctx + "/oppty_detail?oppty_no=" + oppty_no;
}

// 단건 등록
function opptySingleAdd()
{
	var ctx = $("#ctx").val();
	
	location.href = ctx + "/oppty_detail";
}