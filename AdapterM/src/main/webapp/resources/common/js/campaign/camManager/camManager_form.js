/**
업 무 명 : 캠페인 조회 상세
작 성 자 : 유대열
작 성 일 : 2016/05/16
수 정 자 : 공재원
수 정 일 : 2017/04/25
내 용 : 캠페인 조회 상세 javascript
 */
function camTgtDtlPageNumInputEnter(){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	var pageNum = parseInt($("#pageInput").val());
	if (keycode == '13') {
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
		}  else {
			camTgtDtlListAjax(pageNum,1);
		}
			
	}
	event.stopPropagation();
}


//검색창 엔터키 기능
function camTgtDtlSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			camTgtDtlListAjax(1,2);
		}
		event.stopPropagation();
	});
}

//캠페인 대상자 조회 ajax
function camTgtDtlListAjax(pageNum,schDiv){
	var ctx = $("#ctx").val();
	var param ="";
	if(schDiv == "1"){
		param = "cam_id="+$("#cam_id").val()
				+"&mem_id="+$("#h_mem_id").val()
				+"&bnf_value="+$("#h_bnf_value").val()
				+"&pr_key_wid="+$("#h_pr_key_wid").val()
				+"&use_yn="+$("#h_use_yn").val()
				+"&pageNum="+pageNum;
	}else if(schDiv =="2"){
		param = "cam_id="+$("#cam_id").val()
				+"&mem_id="+$("#mem_id").val()
				+"&bnf_value="+$("#bnf_value").val()
				+"&pr_key_wid="+$("#pr_key_wid").val()
				+"&use_yn="+$("#use_yn").children(":selected").val()
				+"&pageNum="+pageNum;
	}
	$.ajax({
		type: "POST",  
		url: ctx +"/camTgtDtlListAjax",   
		data: param,
		dataType: "json",
		success: function(data) {
			eval(data);
			$("#camTgtDtl_list").empty();
		
			
			if(data.camTgtDetailList.length == 0){
				var trElement = $("#camtgtDtl_header").clone().removeClass().empty();
				$("#camTgtDtl_list").append(trElement);
				if(data.offerTypeName == "포인트 정책"){
					$("#camTgtDtl_list tr:last").append("<td colspan='5' ><b>데이터가 존재하지 않습니다.</b></td>");
				}else if(data.offerTypeName == "모바일쿠폰"){
					$("#camTgtDtl_list tr:last").append("<td colspan='8' ><b>데이터가 존재하지 않습니다.</b></td>");
				}else if(data.offerTypeName == "모바일기프트본"){
					$("#camTgtDtl_list tr:last").append("<td colspan='8' ><b>데이터가 존재하지 않습니다.</b></td>");
				}else{
					$("#camTgtDtl_list tr:last").append("<td colspan='5' ><b>데이터가 존재하지 않습니다.</b></td>");
				}
			}
			
			$.each(data.camTgtDetailList, function(i) {
				
				// 헤더에서 TR 요소 취득
				var trElement = $("#camtgtDtl_header").clone().removeClass().empty();
				// 마우스 오버시 화면 표시 이벤트 추가
				addMouseEvent(trElement);
				trElement.css('cursor', 'pointer');
				
				if(data.offerTypeName == "포인트 정책"){
					$("#camTgtDtl_list").append(trElement);
					$("#camTgtDtl_list tr:last")
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.item_seq+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.mem_id+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.key_wid+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.modify_date+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.create_date+"</td>");
				}else if(data.offerTypeName == "모바일쿠폰"){
					$("#camTgtDtl_list").append(trElement);
					$("#camTgtDtl_list tr:last")
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.item_seq+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+(this.tc_trans_wid == null ? "": ""+this.tc_trans_wid)+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.mem_id+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.key_wid+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.use_yn+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+(this.use_dt == null ? "": ""+this.use_dt)+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.modify_date+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.create_date+"</td>");
				}else if(data.offerTypeName == "모바일기프트본"){
					$("#camTgtDtl_list").append(trElement);
					$("#camTgtDtl_list tr:last")
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.item_seq+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+(this.gb_trans_wid == null ? "": ""+this.gb_trans_wid)+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.mem_id+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.key_wid+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.use_yn+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+(this.use_dt == null ? "": ""+this.use_dt)+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.modify_date+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.create_date+"</td>");
				}else{
					$("#camTgtDtl_list").append(trElement);
					$("#camTgtDtl_list tr:last")
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.item_seq+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.mem_id+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.key_wid+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.modify_date+"</td>");
					$("#camTgtDtl_list tr:last").append("<td style='text-align: center;'>"+this.create_date+"</td>");
				}
			});	
			var pageContent = "";
			
			$("#h_mem_id").val(data.camTgtListMap.mem_id);
			$("#h_bnf_value").val(data.camTgtListMap.bnf_value);
			$("#h_pr_key_wid").val(data.camTgtListMap.pr_key_wid);
			$("#h_use_yn").val(data.camTgtListMap.use_yn);
			
			// 페이징 다시그리기
			$("#camTgtDtl_pagingDiv").empty();
			
			pageContent = "<input type='hidden' id='endPageNum' value='"+data.page.endPageNum+"'/>"
			+ "<input type='hidden' id='startPageNum' value='"+data.page.startPageNum+"'/>"
			+ "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/>";
			
			if(data.page.endPageNum == 1 || data.page.endPageNum == 0){
				pageContent += "<a style='color: black; text-decoration: none;'> ◀ </a><input type='text' id='pageInput' readonly='readonly' value='"+data.page.startPageNum+"'/> "
				+"<a style='color: black; text-decoration: none;'> / 1</a>"
				+"<a style='color: black; text-decoration: none;'> ▶ </a>";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent +="◀ <input type='text' id='pageInput' value='"+data.page.startPageNum+"'  onkeypress=\"camTgtDtlPageNumInputEnter(event);\" />"  
				+"<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+data.page.endPageNum+"','1');\" id='pNum' > / "+data.page.endPageNum+"</a>"
				+"<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+(data.pageNum+1)+"','1');\" id='pNum'> ▶ </a>"
			} else if(data.pageNum == data.page.endPageNum){
				pageContent +="<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+(data.pageNum-1)+"','1');\" id='pNum'> ◀ </a>"
				+"<input type='text' id='pageInput'  value='"+data.page.endPageNum+"' onkeypress=\"camTgtDtlPageNumInputEnter(event);\"/>"
				+"<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+(data.page.endPageNum)+"','1');\" id='pNum'> / "+data.page.endPageNum+"</a>"
				+"<a style='color: black; text-decoration: none;'> ▶ </a>";
			} else {
				pageContent +="<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+(data.pageNum-1)+"','1');\" id='pNum' > ◀ </a>"
				+"<input type='text' id='pageInput'  value='"+data.pageNum+"' onkeypress=\"camTgtDtlPageNumInputEnter(event);\"/> " 
				+"<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+data.page.endPageNum+"','1');\" id='pNum'> / "+data.page.endPageNum+"</a>"
				+"<a style='cursor: pointer;' onclick=\"camTgtDtlListAjax('"+(data.pageNum+1)+"','1');\" id='pNum'> ▶ </a>"
			}
			$("#camTgtDtl_pagingDiv").append(pageContent);
		},
		beforeSend: function(){
      	viewLoadingShow();			
      },
      complete:function(){
      	viewLoadingHide();	
      },
		error: function(request, status, error) { 
		return false;
		}
	});
}