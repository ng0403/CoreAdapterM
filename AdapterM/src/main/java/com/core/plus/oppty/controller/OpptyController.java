package com.core.plus.oppty.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.oppty.service.OpptyService;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

@Controller
public class OpptyController {
	
	@Resource
	OpptyService opptyService;
	
	// 처음 list 화면
	@RequestMapping(value="/oppty")
	public ModelAndView opptyList()
	{
		List<OpptyVO> vo = opptyService.opptyList();
		List<OpptyVO> status = opptyService.opptyStatusCD();
		List<OpptyVO> stage = opptyService.opptyStageCD();
		List<OpptyVO> dtype = opptyService.opptyDtypeCD();
		List<OpptyVO> purchase = opptyService.opptyPerchaseType();
		
		System.out.println("status : " + status);
		
		ModelAndView mov = new ModelAndView("oppty_list");
		
		mov.addObject("opptyList", vo);
		mov.addObject("opptyStatusCd", status);
		mov.addObject("opptyStageCd", stage);
		mov.addObject("dtypeCd", dtype);
		mov.addObject("purchaseType", purchase);
		
		return mov;
	}
	
	@RequestMapping(value="oppty_sch", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> opptSchList(HttpSession session,
												  @RequestParam(value = "opptyPageNum", defaultValue = "1") int actPageNum,
												  String oppty_no_srch, String oppty_name_srch, 
												  String cust_name_srch, String emp_name_srcj,
												  String oppty_status_cd_srch, String oppty_stage_cd_srch,
												  String exp_close_dt_srch, String dtype_cd_srch, String purchase_type_srch)
	{
		Map<String, Object> kMap = new HashMap<String, Object>();
		
		kMap.put("oppty_no_srch", oppty_no_srch);
		kMap.put("oppty_name_srch", oppty_name_srch);
		kMap.put("cust_name_srch", cust_name_srch);
		kMap.put("emp_name_srcj", emp_name_srcj);
		kMap.put("oppty_status_cd_srch", oppty_status_cd_srch);
		kMap.put("oppty_stage_cd_srch", oppty_stage_cd_srch);
		kMap.put("exp_close_dt_srch", dtype_cd_srch);
		kMap.put("dtype_cd_srch", dtype_cd_srch);
		kMap.put("purchase_type_srch", purchase_type_srch);
		
		List<OpptyVO> srcList = opptyService.opptySchList(kMap);
		
		kMap.put("srcList", srcList);
		
		return kMap;
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
	public @ResponseBody Map<String, Object> custListPopup(String s_cust_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 고객리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_cust_name == null || s_cust_name == "")
		{
			List<CustVO> custPopupList = opptyService.custPopupList();
			map.put("custPopupList", custPopupList);
			
			return map;
		}
		else
		{
			map.put("s_cust_name", s_cust_name);
			List<CustVO> schCustPopupList = opptyService.custPopupList(map);
			map.put("custPopupList", schCustPopupList);
			
			return map;
		}
	}
	
	@RequestMapping(value="empListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> empListPopup(String s_emp_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 담당자리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_emp_name == null || s_emp_name == "")
		{
			List<EmpVO> empPopupList = opptyService.empPopupList();
			map.put("empPopupList", empPopupList);
			
			return map;
		}
		else
		{
			map.put("s_emp_name", s_emp_name);
			List<EmpVO> schEmpPopupList = opptyService.empPopupList(map);
			map.put("empPopupList", schEmpPopupList);
			
			return map;
		}
	}
	
	@RequestMapping(value="mainCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> mainCatList(String s_main_cat_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(s_main_cat_name == null || s_main_cat_name == "")
		{
			List<OpptyItemVO> mainCatePopupList = opptyService.mainCatPopupList();
			map.put("mainCatePopupList", mainCatePopupList);

			return map;
		}
		else
		{
			map.put("s_main_cat_name", s_main_cat_name);
			
			List<OpptyItemVO> schMainCatePopupList = opptyService.mainCatPopupList(map);
			map.put("mainCatePopupList", schMainCatePopupList);

			return map;
		}
	}
	
	@RequestMapping(value="midCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> midCatList(String main_cate_cd, String s_mid_cate_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(s_mid_cate_name == null || s_mid_cate_name == "")
		{
			map.put("main_cate_cd", main_cate_cd);
			
			List<OpptyItemVO> midCatePopupList = opptyService.midCatPopupList(map);
			map.put("midCatePopupList", midCatePopupList);
			System.out.println("midCatePopupList : " + midCatePopupList);
			
			return map;
		}
		else
		{
			map.put("s_mid_cate_name", s_mid_cate_name);
			
			List<OpptyItemVO> schMidCatePopupList = opptyService.midCatPopupList(map);
			map.put("midCatePopupList", schMidCatePopupList);

			return map;
		}
	}
	
	@RequestMapping(value="smallCateListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> smallCatList(String main_cate_cd, String mid_cate_cd, String s_small_cate_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(s_small_cate_name == null || s_small_cate_name == "")
		{
			map.put("main_cate_cd", main_cate_cd);
			map.put("mid_cate_cd", mid_cate_cd);
			
			List<OpptyItemVO> smallCatPopupList = opptyService.smallCatPopupList(map);
			map.put("smallCatePopupList", smallCatPopupList);
			System.out.println("smallCatPopupList : " + smallCatPopupList);
			
			return map;
		}
		else
		{
			map.put("s_small_cate_name", s_small_cate_name);
			
			List<OpptyItemVO> schSmallCatPopupList = opptyService.smallCatPopupList(map);
			map.put("smallCatePopupList", schSmallCatPopupList);
			
			return map;
		}
	}

}
