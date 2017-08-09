package com.core.plus.contact.cust.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.contact.cust.service.CommonCodeService;
import com.core.plus.contact.cust.service.CustAddrService;
import com.core.plus.contact.cust.service.CustPhoneService;
import com.core.plus.contact.cust.service.CustService;
import com.core.plus.contact.cust.vo.CommonCodeVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;

@Controller
public class CustController {
	
	@Resource
	CustService custService;
	
	@Resource
	CustPhoneService custPhoneService;
	
	@Resource
	CustAddrService custAddrService;
	
	@Resource
	CommonCodeService commonCode;
	
	@Resource
	MenuService menuService;
	
	@RequestMapping(value="/cust")
	public ModelAndView custList(){
		List<CustVO> custList = custService.custList();
		
		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("cust_list");
		mav.addObject("custList", custList);
		mav.addObject("vititCdList", vititCdList);
		mav.addObject("vititDtlCdList", vititDtlCdList);
		
		System.out.println("custList" + custList);
		System.out.println("vititCdList" + vititCdList);
		
		
		menuImport(mav, "cust");
		
		return mav; 
	}
	
	@RequestMapping(value="/custAjax")
	@ResponseBody
	public Map<String, Object> custListAjax(){
		Map<String, Object> result = new HashMap<String, Object>(0);
		List<CustVO> custList = custService.custList();
		
		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();
		
		result.put("custList", custList);
		result.put("vititCdList", vititCdList);
		result.put("vititDtlCdList", vititDtlCdList);
		
		return result;
	}
	
	@RequestMapping(value="/custForm")
	public ModelAndView custForm(@RequestParam("cust_no") String cust_no){
		
		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();
		List<CommonCodeVO> phoneTypeCdList = commonCode.phoneTypeCdList();
		List<CommonCodeVO> phoneCountryCdList = commonCode.phoneCountryCdList();
		List<CommonCodeVO> addrTypeCdList = commonCode.addrTypeCdList();
		
		ModelAndView mav = new ModelAndView();
		
		if(cust_no == null || cust_no == "" ){
			mav.setViewName("cust_detail");
			mav.addObject("flg", "1");
			
		}else if(cust_no != null){
			
			CustVO custDlist = custService.custDetailList(cust_no);
			List<CustVO> custPList = custPhoneService.custPhoneDetailList(cust_no);
			List<CustVO> custAList = custAddrService.custAddrDetailList(cust_no);
			
			mav.setViewName("cust_detail");
			mav.addObject("flg", "2");
			
			mav.addObject("custDlist", custDlist);
			mav.addObject("custPList", custPList);
			mav.addObject("custAList", custAList);
		}
		
		mav.addObject("vititCdList", vititCdList);
		mav.addObject("vititDtlCdList", vititDtlCdList);
		mav.addObject("phoneTypeCdList", phoneTypeCdList);
		mav.addObject("phoneCountryCdList", phoneCountryCdList);
		mav.addObject("addrTypeCdList", addrTypeCdList);
		
		return mav;
	}
	
	@RequestMapping(value="/custSave" , method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public CustVO custSave(
			@RequestParam(value="cust_list[]",required=false) List<String> cust_list
			,CustVO cvoS, String cust_no){
		int result;
		int flg;
		CustVO cvo = new CustVO();
		if(cust_list != null){
			for(int i=0; i < cust_list.size(); i++){
				cvo.setCust_name(cust_list.get(i));
				cvo.setResident_no(cust_list.get(++i));
				cvo.setChart_no(cust_list.get(++i));
				cvo.setCust_id(cust_list.get(++i));
				cvo.setVisit_cd(cust_list.get(++i));
				cvo.setVisit_dtl_cd(cust_list.get(++i));
				cvo.setVisit_cn(cust_list.get(++i));
				cvo.setRec_per(cust_list.get(++i));
				cvo.setRemark_cn(cust_list.get(++i));
			}
		}
		CustVO custVO = null;
		if(cust_no == null){
			result = custService.custAdd(cvo);
			if(result == 1){
				String custNo = cvoS.getCust_key();
				custVO = custService.custDetailList(custNo);
			}
		}else if(cust_no != null){
			flg=1;
			cvo.setCust_no(cust_no);
			result = custService.custMdfy(cvo);
			if(result == 1){
				custVO = custService.custDetailList(cust_no);
			}
		}
		return custVO;
	}
	
	@RequestMapping(value="/custPhoneSave")
	@ResponseBody
	public List<CustVO> custPhoneSave(
			@RequestParam(value="custP_list[]",required=false) List<String> custP_list
			,String cust_no){
		
		int Dresult = custPhoneService.custPhoneDelete(cust_no);
		//파라미터 리스트
		List<CustVO> custPH_list = null;
		//반환 리스트
		List<CustVO> custPList;
		if(custP_list != null){
			for(int i=0; i < custP_list.size(); i++){
				CustVO cvo = new CustVO();
				cvo.setCust_no(cust_no);
				cvo.setPhone_type_cd(custP_list.get(++i));
				cvo.setPhone_country_cd(custP_list.get(++i));
				cvo.setPhone_area_no(custP_list.get(++i));
				cvo.setPhone_no(custP_list.get(++i));
				cvo.setPrimary_yn(custP_list.get(++i));
				custPH_list.add(cvo);
			}
			int Iresult = custPhoneService.custPhoneAdd(custPH_list);
		}
		custPList = custPhoneService.custPhoneDetailList(cust_no);
		
		return custPList;
	}
	
	@RequestMapping(value="/custAddrSave")
	@ResponseBody
	public List<CustVO> custAddrSave(
			@RequestParam(value="custA_list[]",required=false) List<String> custA_list
			,String cust_no){
		int Dresult = custAddrService.custAddrDelete(cust_no);
		//파라미터 리스트
		List<CustVO> custAD_list = null;
		//반환 리스트
		List<CustVO> custAList;
		
		if(custA_list != null){
			for(int i=0; i < custA_list.size(); i++){
				CustVO cvo = new CustVO();
				cvo.setCust_no(custA_list.get(i));
				cvo.setAddr_type_cd(custA_list.get(++i));
				cvo.setRoad_yn(custA_list.get(++i));
				cvo.setZip_no(custA_list.get(++i));
				cvo.setAddress(custA_list.get(++i));
				cvo.setPrimary_yn(custA_list.get(++i));
				custAD_list.add(cvo);
			}
			int result = custAddrService.custAddrAdd(custAD_list);
		}
		
		custAList = custAddrService.custAddrDetailList(cust_no);
		return custAList;
	}

	
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

}
