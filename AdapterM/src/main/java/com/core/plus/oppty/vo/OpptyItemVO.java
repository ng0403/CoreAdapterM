package com.core.plus.oppty.vo;

public class OpptyItemVO {

	private String oppty_no; 		// 기회번호
	private String main_cate_cd; 	// 제품대분류코드
	private String mid_cate_cd; 	// 제품중분류코드
	private String small_cate_cd; 	// 제품소분류코드
	private String create_date; 	// 등록일시
	private String update_date; 	// 수정일시
	private String payment_day;		// 결재일자
	private int qty; 				// 수량
	private int list_price; 		// 단가
	private int dc_price; 			// 할인금액
	
	private String main_cate_name;
	private String mid_cate_name;
	private String small_cate_name;
	private int total_price;
	private int offer_price;

	public String getOppty_no() {
		return oppty_no;
	}

	public void setOppty_no(String oppty_no) {
		this.oppty_no = oppty_no;
	}

	public String getMain_cate_cd() {
		return main_cate_cd;
	}

	public void setMain_cate_cd(String main_cate_cd) {
		this.main_cate_cd = main_cate_cd;
	}

	public String getMid_cate_cd() {
		return mid_cate_cd;
	}

	public void setMid_cate_cd(String mid_cate_cd) {
		this.mid_cate_cd = mid_cate_cd;
	}

	public String getSmall_cate_cd() {
		return small_cate_cd;
	}

	public void setSmall_cate_cd(String small_cate_cd) {
		this.small_cate_cd = small_cate_cd;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}

	public String getUpdate_date() {
		return update_date;
	}

	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}

	public String getPayment_day() {
		return payment_day;
	}

	public void setPayment_day(String payment_day) {
		this.payment_day = payment_day;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public int getList_price() {
		return list_price;
	}

	public void setList_price(int list_price) {
		this.list_price = list_price;
	}

	public int getDc_price() {
		return dc_price;
	}

	public void setDc_price(int dc_price) {
		this.dc_price = dc_price;
	}

	public String getMain_cate_name() {
		return main_cate_name;
	}

	public void setMain_cate_name(String main_cate_name) {
		this.main_cate_name = main_cate_name;
	}

	public String getMid_cate_name() {
		return mid_cate_name;
	}

	public void setMid_cate_name(String mid_cate_name) {
		this.mid_cate_name = mid_cate_name;
	}

	public String getSmall_cate_name() {
		return small_cate_name;
	}

	public void setSmall_cate_name(String small_cate_name) {
		this.small_cate_name = small_cate_name;
	}
	
	public int getTotal_price() {
		return total_price;
	}

	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}

	public int getOffer_price() {
		return offer_price;
	}

	public void setOffer_price(int offer_price) {
		this.offer_price = offer_price;
	}

	@Override
	public String toString() {
		return "OpptyItemVO [oppty_no=" + oppty_no + ", main_cate_cd=" + main_cate_cd + ", mid_cate_cd=" + mid_cate_cd
				+ ", small_cate_cd=" + small_cate_cd + ", create_date=" + create_date + ", update_date=" + update_date
				+ ", payment_day=" + payment_day + ", qty=" + qty + ", list_price=" + list_price + ", dc_price="
				+ dc_price + ", main_cate_name=" + main_cate_name + ", mid_cate_name=" + mid_cate_name
				+ ", small_cate_name=" + small_cate_name + "]";
	}
	
	
}
