/**
 * 
 * opptyItemAdd()			:: 추가 테이블 생성(tr/td)
 * opptyItemInsert()		:: 매출상품 추가
 * opptyItemDelte()			:: 매출상품 삭제
 * 
 */

// 테이블 생성(Ajax)
function opptyItemAdd()
{
	var tbody = $('#oppty_item_list_tbody');
	var tbodyContent = "";
	
	// 새로 그려준다.
	tbody.append(
		"<tr>"+
			"<td style='text-align: left;'><input type='text' id='main_cate_name' name='main_cate_name'></td>"+
			"<td style='text-align: left;'><input type='text' id='mid_cate_name' name='mid_cate_name'></td>"+
			"<td style='text-align: left;'><input type='text' id='small_cate_name' name='small_cate_name'></td>"+
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
	
}

function opptyItemDelte()
{
	
}