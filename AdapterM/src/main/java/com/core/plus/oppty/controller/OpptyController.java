package com.core.plus.oppty.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;
import com.core.plus.oppty.service.OpptyService;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

@Controller
public class OpptyController {
	
	@Resource
	OpptyService opptyService;
	
	@Resource
	MenuService menuService;
	
	public void menuImport(ModelAndView mav, String url){
		String menu_id = menuService.getMenuUrlID(url);
//		String user_id = session.getAttribute("user").toString();
	
		Map<String, String> menuAuthMap = new HashMap<String, String>();
		menuAuthMap.put("menu_url", url);
//		menuAuthMap.put("user_id", user_id);
		menuAuthMap.put("menu_id", menu_id);
//		MenuVo menuAuth = loginDao.getMenuAuthInfo(menuAuthMap);
//		mav.addObject("menuAuth", menuAuth);
			
		List<MenuVo> mainMenuList = menuService.getMainMenuList(/*user_id*/);
		List<MenuVo> subMenuList = menuService.getSubMenuList(menuAuthMap);
		mav.addObject("mainMenuList", mainMenuList);  //mainMenuList
		mav.addObject("subMenuList", subMenuList);    //subMenuList
	}
	
	// 처음 list 화면
	@RequestMapping(value="/oppty")
	public ModelAndView opptyList(HttpSession session,
			@RequestParam(value = "opptyPageNum", defaultValue = "1") int opptyPageNum)
	{
		Map<String, Object> opptyMap = new HashMap<String, Object>();
		opptyMap.put("opptyPageNum", opptyPageNum);
		
		// paging
		PagerVO page = opptyService.getOpptyListRow(opptyMap);
		
		System.out.println("page : " + page);
		opptyMap.put("page", page);
		
		List<OpptyVO> vo = opptyService.opptyList(opptyMap);
		List<OpptyVO> status = opptyService.opptyStatusCD();
		List<OpptyVO> stage = opptyService.opptyStageCD();
		List<OpptyVO> dtype = opptyService.opptyDtypeCD();
		List<OpptyVO> purchase = opptyService.opptyPerchaseType();
		
		System.out.println("status : " + status);
		
		ModelAndView mov = new ModelAndView("oppty_list");
		
		mov.addObject("page", page);
		mov.addObject("opptyPageNum", opptyPageNum);
		mov.addObject("opptyList", vo);
		mov.addObject("opptyStatusCd", status);
		mov.addObject("opptyStageCd", stage);
		mov.addObject("dtypeCd", dtype);
		mov.addObject("purchaseType", purchase);

		menuImport(mov, "oppty");
		
		return mov;
	}
	
	@RequestMapping(value="oppty_sch", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> opptSchList(HttpSession session,
												  @RequestParam(value = "opptyPageNum", defaultValue = "1") int opptyPageNum,
												  String oppty_no_srch, String oppty_name_srch, 
												  String cust_name_srch, String emp_name_srcj,
												  String oppty_status_cd_srch, String oppty_stage_cd_srch,
												  String exp_close_dt_srch, String dtype_cd_srch, String purchase_type_srch)
	{
		Map<String, Object> kMap = new HashMap<String, Object>();
		System.out.println("page num : " + opptyPageNum);
		kMap.put("opptyPageNum", opptyPageNum);
		kMap.put("oppty_no_srch", oppty_no_srch);
		kMap.put("oppty_name_srch", oppty_name_srch);
		kMap.put("cust_name_srch", cust_name_srch);
		kMap.put("emp_name_srcj", emp_name_srcj);
		kMap.put("oppty_status_cd_srch", oppty_status_cd_srch);
		kMap.put("oppty_stage_cd_srch", oppty_stage_cd_srch);
		kMap.put("exp_close_dt_srch", exp_close_dt_srch);
		kMap.put("dtype_cd_srch", dtype_cd_srch);
		kMap.put("purchase_type_srch", purchase_type_srch);
		
		// paging
		PagerVO page = opptyService.getOpptyListRow(kMap);
		kMap.put("page", page);
		System.out.println("Map : " + kMap);
		System.out.println("page : " + page);
				
		List<OpptyVO> srcList = opptyService.opptySchList(kMap);
		
		kMap.put("srcList", srcList);
		
		return kMap;
	}
	
	//엑셀 출력 
	@RequestMapping(value = "/toOpptyExcel",  method=RequestMethod.POST)
	public ModelAndView toExcel(HttpServletRequest req, HttpSession session, 
			 String oppty_no_srch, String oppty_name_srch, 
			  String cust_name_srch, String emp_name_srcj,
			  String oppty_status_cd_srch, String oppty_stage_cd_srch,
			  String exp_close_dt_srch, String dtype_cd_srch, String purchase_type_srch, String flg) {
		
		
		char temp = flg.charAt(flg.length()-1);
		
		System.out.println(temp);
		ModelAndView result = new ModelAndView();
		Map<String, Object> opptykMap = new HashMap<String, Object> ();
		
		if(temp == '0')
		{
			opptykMap.put("oppty_no_srch", oppty_no_srch);
			opptykMap.put("oppty_name_srch", oppty_name_srch);
			opptykMap.put("cust_name_srch", cust_name_srch);
			opptykMap.put("emp_name_srcj", emp_name_srcj);
			opptykMap.put("oppty_status_cd_srch", oppty_status_cd_srch);
			opptykMap.put("oppty_stage_cd_srch", oppty_stage_cd_srch);
			opptykMap.put("exp_close_dt_srch", exp_close_dt_srch);
			opptykMap.put("dtype_cd_srch", dtype_cd_srch);
			opptykMap.put("purchase_type_srch", purchase_type_srch);
			//taskMap.put("some",req.getParameter("some"));    				// where에 들어갈 조건??
			
			List<OpptyVO> list = opptyService.opptyExcelExport(opptykMap);	// 쿼리
			result.addObject("opptyExcelExport", list); 					// 쿼리 결과를 model에 담아줌
			result.setViewName("/oppty/opptyList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
			
			return result;
		}
		else
		{
			result.setViewName("/oppty/opptyList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
			
			return result;
		}
		 
	}
	
	
	
	// 상세보기 및 단건등록화면
	@RequestMapping(value="oppty_detail")
	public ModelAndView opptyDetail(String oppty_no, String flg)
	{
		System.out.println(oppty_no);
		
		if(oppty_no == null || oppty_no == "")	// 단건등록 시
		{
			OpptyVO opptyNo = opptyService.opptyNoIndex();
			List<OpptyVO> status = opptyService.opptyStatusCD();
			List<OpptyVO> stage = opptyService.opptyStageCD();
			List<OpptyVO> dtype = opptyService.opptyDtypeCD();
			List<OpptyVO> purchase = opptyService.opptyPerchaseType();
			List<OpptyVO> payment = opptyService.opptyPaymentCD();
			List<OpptyVO> recper = opptyService.opptyRecPerCD();
			
			ModelAndView mov = new ModelAndView("oppty_detail");

			mov.addObject("opptyNoIndex", opptyNo);
			mov.addObject("opptyStatusCd", status);
			mov.addObject("opptyStageCd", stage);
			mov.addObject("dtypeCd", dtype);
			mov.addObject("purchaseType", purchase);
			mov.addObject("paymentCd", payment);
			mov.addObject("recperCd", recper);
			
			menuImport(mov, "oppty");
			
			return mov;
		}
		else	// 상세보기	OpptyItem도 조회해야함.
		{
			List<OpptyItemVO> itemList 	= opptyService.opptyItemList(oppty_no);
			List<OpptyVO> status 		= opptyService.opptyStatusCD();
			List<OpptyVO> stage 		= opptyService.opptyStageCD();
			List<OpptyVO> dtype 		= opptyService.opptyDtypeCD();
			List<OpptyVO> purchase 		= opptyService.opptyPerchaseType();
			List<OpptyVO> payment 		= opptyService.opptyPaymentCD();
			List<OpptyVO> recper 		= opptyService.opptyRecPerCD();
			
			System.out.println("itemList : " + itemList);
			ModelAndView mov = new ModelAndView("oppty_detail");

			mov.addObject("opptyDetail",  opptyService.opptyDetail(oppty_no));
			mov.addObject("itemList", itemList);
			mov.addObject("opptyStatusCd", status);
			mov.addObject("opptyStageCd", stage);
			mov.addObject("dtypeCd", dtype);
			mov.addObject("purchaseType", purchase);
			mov.addObject("paymentCd", payment);
			mov.addObject("recperCd", recper);
			
			menuImport(mov, "oppty");
			
			return mov;
		}
	}

	/* CUD */
	@RequestMapping(value="oppty_single_add", method=RequestMethod.POST)
	public @ResponseBody int opptySingleInsert(OpptyVO opptyVo, HttpSession session, HttpServletRequest request)
	{
		int result = 0;
		System.out.println("insert : " + opptyVo);
		
		result = opptyService.opptyInsert(opptyVo);
		
		System.out.println("insert : " + result);
		
		return 0;
	}
	
	@RequestMapping(value="oppty_edit", method=RequestMethod.POST)
	public @ResponseBody int opptyEdit(OpptyVO opptyVo, HttpSession session)
	{
		int result = 0;
		
		System.out.println("opptyvo : " + opptyVo);
		
		result = opptyService.opptyEdit(opptyVo);
		
		System.out.println("edit : " + result);
		
		return result;
	}
	
	@RequestMapping(value="oppty_delete", method=RequestMethod.POST)
	public @ResponseBody int opptyDelete(OpptyVO opptyVo, HttpSession session)
	{
		int result = 0;
		
		result = opptyService.opptyDelete(opptyVo);
		
		return result;
	}
	
	/* Item CUD */
	@RequestMapping(value="opptyItemInsert", method=RequestMethod.POST)
	public @ResponseBody List<OpptyItemVO> opptItemInsert(@RequestParam(value="opptyItemList[]", required=false) List<String> opptyItemList, String oppty_no)
	{
		System.out.println("Item Insert : " + opptyItemList);
		System.out.println("Item Insert : " + oppty_no);
		
		List<OpptyItemVO> itemList = new ArrayList<OpptyItemVO>();
		List<OpptyItemVO> ditemList = opptyService.opptyItemList(oppty_no);
		
		if(ditemList == null)
		{
			System.out.println("list 없음.");
		}
		else
		{
			System.out.println("list");
			int result = opptyService.opptyItemDelete(oppty_no);
		}
		
		if(opptyItemList != null)
		{
			for(int i=0; i<opptyItemList.size(); i++)
			{
				OpptyItemVO ovo = new OpptyItemVO();
				
				ovo.setOppty_no(oppty_no);
				ovo.setMain_cate_cd(opptyItemList.get(i));
				ovo.setMid_cate_cd(opptyItemList.get(++i));
				ovo.setSmall_cate_cd(opptyItemList.get(++i));
				ovo.setQty(Integer.parseInt(opptyItemList.get(++i)));
				ovo.setList_price(Integer.parseInt(opptyItemList.get(++i)));
				ovo.setDc_price(Integer.parseInt(opptyItemList.get(++i)));
				ovo.setPayment_day(opptyItemList.get(++i));
				itemList.add(ovo);
			}
			System.out.println("itemList : " + itemList);
			// opptyItem Insert
			int oResult = opptyService.opptyItemInsert(itemList);
		}
		
		// 바로 detail 화면으로 뿌려준다.
//		List<OpptyVO> optyItemList = opptyService.opptyDetail(oppty_no);
		List<OpptyItemVO> optyItemList 	= opptyService.opptyItemList(oppty_no);
		
		return optyItemList;
	}
	
	/* Popup*/
	@RequestMapping(value="custListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> custListPopup(@RequestParam(value = "custPopupPageNum", defaultValue = "1") int custPopupPageNum, String s_cust_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("custPopupPageNum", custPopupPageNum);
		
		// paging
		PagerVO page = opptyService.getCustPopupRow(map);
		
		// 고객리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_cust_name == null || s_cust_name == "")
		{
			List<CustVO> custPopupList = opptyService.custPopupList();
			map.put("custPopupList", custPopupList);
			map.put("page", page);
			map.put("pageNum", custPopupPageNum);
			
			return map;
		}
		else
		{
			map.put("s_cust_name", s_cust_name);
			List<CustVO> schCustPopupList = opptyService.custPopupList(map);
			map.put("custPopupList", schCustPopupList);
			map.put("page", page);
			map.put("pageNum", custPopupPageNum);
			
			return map;
		}
	}
	
	@RequestMapping(value="empListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> empListPopup(@RequestParam(value = "empPopupPageNum", defaultValue = "1") int empPopupPageNum, String s_emp_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("empPopupPageNum", empPopupPageNum);
		
		// paging
		PagerVO page = opptyService.getEmpPopupRow(map);
		
		// 담당자리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_emp_name == null || s_emp_name == "")
		{
			List<EmpVO> empPopupList = opptyService.empPopupList();
			map.put("empPopupList", empPopupList);
			map.put("page", page);
			map.put("pageNum", empPopupPageNum);
			
			return map;
		}
		else
		{
			map.put("s_emp_name", s_emp_name);
			List<EmpVO> schEmpPopupList = opptyService.empPopupList(map);
			map.put("empPopupList", schEmpPopupList);
			map.put("page", page);
			map.put("pageNum", empPopupPageNum);
			
			return map;
		}
	}
	
	@RequestMapping(value="mainCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> mainCatList(@RequestParam(value = "mainCatePopupPageNum", defaultValue = "1") int mainCatePopupPageNum, String s_main_cate_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("mainCatePopupPageNum", mainCatePopupPageNum);
		System.out.println(s_main_cate_name);
		// paging
		PagerVO page = opptyService.getMainCatePopupRow(map);
		map.put("page", page);
		map.put("pageNum", mainCatePopupPageNum);
		
		if(s_main_cate_name == null || s_main_cate_name == "")
		{
			System.out.println("page : " + page);
			List<OpptyItemVO> mainCatePopupList = opptyService.mainCatPopupList(map);
			map.put("mainCatePopupList", mainCatePopupList);
			
			return map;
		}
		else
		{
			System.out.println("s_main_cat_name : " +s_main_cate_name);
			System.out.println("page : " + page);
			map.put("s_main_cate_name", s_main_cate_name);
			
			List<OpptyItemVO> schMainCatePopupList = opptyService.mainCatPopupList(map);
			map.put("mainCatePopupList", schMainCatePopupList);
			
			return map;
		}
	}
	
	@RequestMapping(value="midCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> midCatList(@RequestParam(value = "midCatePopupPageNum", defaultValue = "1") int midCatePopupPageNum, String main_cate_cd, String s_mid_cate_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("midCatePopupPageNum", midCatePopupPageNum);
		System.out.println("main_cate_cd : " + main_cate_cd);
		
		// paging
		PagerVO page = opptyService.getMidCatePopupRow(map);
		map.put("page", page);
		map.put("pageNum", midCatePopupPageNum);
		
		if(s_mid_cate_name == null || s_mid_cate_name == "")
		{
			map.put("main_cate_cd", main_cate_cd);
			
			List<OpptyItemVO> midCatePopupList = opptyService.midCatPopupList(map);
			map.put("midCatePopupList", midCatePopupList);
			
			return map;
		}
		else
		{
			map.put("main_cate_cd", main_cate_cd);
			map.put("s_mid_cate_name", s_mid_cate_name);
			
			List<OpptyItemVO> schMidCatePopupList = opptyService.midCatPopupList(map);
			map.put("midCatePopupList", schMidCatePopupList);
			
			return map;
		}
	}
	
	@RequestMapping(value="smallCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> smallCatList(@RequestParam(value = "smallCatePopupPageNum", defaultValue = "1") int smallCatePopupPageNum, String main_cate_cd, String mid_cate_cd, String s_small_cate_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("smallCatePopupPageNum", smallCatePopupPageNum);
		
		// paging
		PagerVO page = opptyService.getSmallCatePopupRow(map);
		map.put("page", page);
		map.put("pageNum", smallCatePopupPageNum);		
		
		if(s_small_cate_name == null || s_small_cate_name == "")
		{
			map.put("main_cate_cd", main_cate_cd);
			map.put("mid_cate_cd", mid_cate_cd);
			
			List<OpptyItemVO> smallCatPopupList = opptyService.smallCatPopupList(map);
			map.put("smallCatePopupList", smallCatPopupList);
			
			return map;
		}
		else
		{
			map.put("main_cate_cd", main_cate_cd);
			map.put("mid_cate_cd", mid_cate_cd);
			map.put("s_small_cate_name", s_small_cate_name);
			
			List<OpptyItemVO> schSmallCatPopupList = opptyService.smallCatPopupList(map);
			map.put("smallCatePopupList", schSmallCatPopupList);
			
			return map;
		}
	}
	
	//엑셀 추가 전 팝업
	@RequestMapping(value="/opptyExcelImportTab", method=RequestMethod.GET)
	public ModelAndView excelImportTab(HttpSession session, Locale locale,@RequestParam(value = "pageNum", defaultValue = "1") int pageNum)
	{
		System.out.println("ExcelTab Controller");
		ModelAndView mov = new ModelAndView("/oppty/excel_import_tab");
		
		return mov;
	}	
	
	
	// Excel Data Import
    @RequestMapping(value = "/opptyExcelUploadAjax", headers = "content-type=multipart/*", method = RequestMethod.POST)
    public ModelAndView excelUploadAjax(MultipartHttpServletRequest request)  throws Exception
    {
        MultipartFile excelFile = request.getFile("excelFile");
        System.out.println("excelFile : " + excelFile);
		
        System.out.println("엑셀 파일 업로드 컨트롤러");
       
        if(excelFile==null || excelFile.isEmpty()){
            throw new RuntimeException("엑셀파일을 선택 해 주세요.");
        }
        
        int result = opptyService.excelUpload(excelFile);
        System.out.println(result);
        
        return new ModelAndView("/oppty/excel_import_tab", "result", result);
    }	

}
