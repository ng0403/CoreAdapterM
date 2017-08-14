package com.core.plus.common;

public class PagerVO {
	private int totalCount; //전체게시글의 총갯수
	private int pageSize;	//한 페이지에 보여줄 게시물 갯수--
	private int pageBlockSize;	//한 펭지에 보여질 페이징갯수
	private int startRow; //시작행 번호
	private int endRow; //끝행 번호
	private int startPageNum;	//시작페이지 index번호--
	private int endPageNum;		//끝페이지 index번호
	private int currentPageNum; //현재페이지 번호
	private int totalPageCount; //전체페이징 갯수
	private int limitStartNum;
	
	public PagerVO(){}

	public PagerVO(int currentPageNum, int totalCount, int pageSize, int pageBlockSize) {
		this.totalCount = totalCount;
		this.currentPageNum = currentPageNum;
		this.pageSize=pageSize;
		this.pageBlockSize=pageBlockSize;
		
		limitStartNum = (currentPageNum-1)*10;
		startRow = (currentPageNum-1)*pageSize+1;
		
		if(startRow != 1){
			endRow  = startRow-1;
		} else {
			endRow = startRow;
		}
		
		totalPageCount = (int) Math.ceil((double)totalCount/pageSize);
		
		startPageNum = (int)((currentPageNum-1)/pageBlockSize)*pageBlockSize+1;
		endPageNum = startPageNum+(pageBlockSize-1);
		if(endPageNum>totalPageCount){
			endPageNum = totalPageCount;
		}
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	public int getEndRow() {
		return endRow;
	}

	public void setEndRow(int endRow) {
		this.endRow = endRow;
	}

	public int getStartPageNum() {
		return startPageNum;
	}

	public void setStartPageNum(int startPageNum) {
		this.startPageNum = startPageNum;
	}

	public int getEndPageNum() {
		return endPageNum;
	}

	public void setEndPageNum(int endPageNum) {
		this.endPageNum = endPageNum;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageBlockSize() {
		return pageBlockSize;
	}

	public void setPageBlockSize(int pageBlockSize) {
		this.pageBlockSize = pageBlockSize;
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getCurrentPageNum() {
		return currentPageNum;
	}

	public void setCurrentPageNum(int currentPageNum) {
		this.currentPageNum = currentPageNum;
	}
	
	public int getLimitStartNum() {
		return limitStartNum;
	}

	public void setLimitStartNum(int limitStartNum) {
		this.limitStartNum = limitStartNum;
	}

	@Override
	public String toString() {
		return "PagerVO [totalCount=" + totalCount + ", pageSize=" + pageSize + ", pageBlockSize=" + pageBlockSize
				+ ", startRow=" + startRow + ", endRow=" + endRow + ", startPageNum=" + startPageNum + ", endPageNum="
				+ endPageNum + ", currentPageNum=" + currentPageNum + ", totalPageCount=" + totalPageCount
				+ ", limitStartNum=" + limitStartNum + "]";
	}

	
	
}
