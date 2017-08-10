/**
 * 
 * opptyItemAdd()			:: 추가 테이블 생성(tr/td)
 * opptyItemInsert()		:: 매출상품 추가
 * opptyItemDelte()			:: 매출상품 삭제
 * 
 */

var ctx = $("#ctx").val();

// 테이블 생성(Ajax)
function opptyItemAdd()
{
	var tbody = $('#oppty_item_list_tbody');
	var tbodyContent = "";
	
	// 새로 그려준다.
	tbody.append(
		"<tr>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' id='main_cate_cd' name='main_cate_cd' value=''>" +
				"<input type='text' id='main_cate_name' name='main_cate_name'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' id='mid_cate_cd' name='mid_cate_cd' value=''>" +
				"<input type='text' id='mid_cate_name' name='mid_cate_name'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' id='small_cate_cd' name='small_cate_cd' value=''>" +
				"<input type='text' id='small_cate_name' name='small_cate_name'></td>"+
			"<td style='text-align: left;'><input type='text' id='qty' name='qty'></td>"+
			"<td style='text-align: left;'><input type='text' id='list_price' name='list_price'></td>"+
			"<td style='text-align: left;'><input type='text' id='total_price' name='total_price'></td>"+
			"<td style='text-align: left;'><input type='text' id='dc_price' name='dc_price'></td>"+
			"<td style='text-align: left;'><input type='text' id='offer_price' name='offer_price'></td>"+
			"<td style='text-align: left;'><input type='text' id='payment_day' name='payment_day'></td>"+
		"</tr>"
	);
	
}

function opptyItemInsert()
{
	var oppty_no     = $("#oppty_no").val();
	var main_cat_cd  = [];
	var mid_cat_cd   = [];
	var small_cat_cd = [];
	var qty			 = [];
	var list_price	 = [];
	var dc_price	 = [];
	var payment_day  = [];
	var opptyItemList = [];
	
	$("#oppty_item_list_tbody tr").each(function() {
		main_cat_cd.push($(this).chilren().chilren().val());
		mid_cat_cd.push($(this).chilren().eq(1).chilren().val());
		small_cat_cd.push($(this).chilren().eq(2).chilren().val());
		qty.push($(this).chilren().eq(3).chilren().val());
		list_price.push($(this).chilren().eq(4).chilren().val());
		dc_price.push($(this).chilren().eq(6).chilren().val());
		payment_day.push($(this).chilren().eq(8).chilren().val());
		
		opptyItemList.push(main_cat_cd.pop());
		opptyItemList.push(mid_cat_cd.pop());
		opptyItemList.push(small_cat_cd.pop());
		opptyItemList.push(qty.pop());
		opptyItemList.push(list_price.pop());
		opptyItemList.push(dc_price.pop());
		opptyItemList.push(payment_day.pop());
		
	});
	
	$.ajax({
		url : ctx + '/opptyItemInsert',
		dataType : 'json',
		data : {
			oppty_no	  : oppty_no,
			opptyItemList : opptyItemList
		},
		success:function(){
			alert("정상적으로 등록되었습니다.");
		},
		error:function(request){
			alert("error : " + request.status)
		}
	});
}

function opptyItemDelte()
{
	
}