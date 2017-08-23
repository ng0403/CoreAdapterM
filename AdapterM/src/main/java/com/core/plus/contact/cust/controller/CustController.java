package com.core.plus.contact.cust.controller;

import java.io.File;
import java.io.IOException;
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
import com.core.plus.contact.cust.service.CommonCodeService;
import com.core.plus.contact.cust.service.CustAddrService;
import com.core.plus.contact.cust.service.CustPhoneService;
import com.core.plus.contact.cust.service.CustService;
import com.core.plus.contact.cust.vo.CommonCodeVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

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
	public ModelAndView custList(@RequestParam(value = "custPageNum", defaultValue = "1") int custPageNum){
		Map<String, Object> custMap = new HashMap<String, Object>();
		custMap.put("custPageNum", custPageNum);
		
		// paging
		PagerVO page = custService.getCustListRow(custMap);
		System.out.println("cust page : " + page);
		custMap.put("page", page);
		
		List<CustVO> custList = custService.custList(custMap);

		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("cust_list");
		mav.addObject("page", page);
		mav.addObject("pageNum", custPageNum);
		mav.addObject("custList", custList);
		mav.addObject("vititCdList", vititCdList);
		mav.addObject("vititDtlCdList", vititDtlCdList);
		
//		System.out.println("custList" + custList);
//		System.out.println("vititCdList" + vititCdList);
		
		
		menuImport(mav, "cust");
		
		return mav; 
	}
	
	@RequestMapping(value="/custAjax", method={RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public Map<String, Object> custListAjax(@RequestParam(value = "custPageNum", defaultValue = "1") int custPageNum,
											String cust_no, String cust_name, String chart_no, String visit_cd, String rec_per, String phone_no)
	{
		Map<String, Object> result = new HashMap<String, Object>(0);
		Map<String, Object> custMap = new HashMap<String, Object>();

		custMap.put("custPageNum", custPageNum);
		custMap.put("cust_no", cust_no);
		custMap.put("cust_name", cust_name);
		custMap.put("chart_no", chart_no);
		custMap.put("visit_cd", visit_cd);
		custMap.put("rec_per", rec_per);
		custMap.put("phone_no", phone_no);

		// paging
		PagerVO page = custService.getCustListRow(custMap);
		custMap.put("page", page);
		
		System.out.println("custMap? " + custMap.toString());
		System.out.println("page? " + page);
		
		List<CustVO> custList = custService.custList(custMap);
		
		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();
		
		System.out.println("cust page : " + page);
		System.out.println("custList : " + custList);
		
		result.put("page", page);
		result.put("pageNum", custPageNum);
		result.put("custList", custList);
		result.put("vititCdList", vititCdList);
		result.put("vititDtlCdList", vititDtlCdList);
		
		return result;
	}
	
	//엑셀 출력 
	@RequestMapping(value = "/toCustExcel",  method=RequestMethod.POST)
	public ModelAndView toExcel(HttpServletRequest req, HttpSession session
			,String cust_no, String cust_name, String chart_no, String visit_cd, String rec_per, String phone_no, String flg) {
		
		char temp = flg.charAt(flg.length()-1);
		
		ModelAndView result = new ModelAndView();
		Map<String, Object> custkMap = new HashMap<String, Object> ();
		if(temp == '0')
		{
			custkMap.put("cust_no", cust_no);
			custkMap.put("cust_name", cust_name);
			custkMap.put("chart_no", chart_no);
			custkMap.put("visit_cd", visit_cd);
			custkMap.put("rec_per", rec_per);
			custkMap.put("phone_no", phone_no);
			//taskMap.put("some",req.getParameter("some"));    			// where에 들어갈 조건??
			
			System.out.println("custkMap??? "  + custkMap.toString());
			
			List<CustVO> list = custService.custExcelExport(custkMap);	// 쿼리
			result.addObject("custExcelExport", list); 					// 쿼리 결과를 model에 담아줌
			result.setViewName("/cust/custList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
			
			return result;
		}
		else
		{
			result.setViewName("/cust/custList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
			return result;
		}
	}

	@RequestMapping(value="/custForm")
	public ModelAndView custForm(@RequestParam("cust_no") String cust_no){
		
		List<CommonCodeVO> vititCdList = commonCode.vititCdList();
		List<CommonCodeVO> vititDtlCdList = commonCode.vititDtlCdList();			
		List<CommonCodeVO> phoneTypeCdList = commonCode.phoneTypeCdList(); 			//전화번호구분
		List<CommonCodeVO> phoneCountryCdList = commonCode.phoneCountryCdList(); 	//국가번호
		List<CommonCodeVO> addrTypeCdList = commonCode.addrTypeCdList();			//주소구분
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("cust_detail");
		
		if(cust_no == null || cust_no == "" ){
			
			mav.addObject("flg", "1");
			
		}else if(cust_no != null || cust_no != ""){
			
			CustVO custDlist = custService.custDetailList(cust_no);
			List<CustVO> custPList = custPhoneService.custPhoneDetailList(cust_no);
			List<CustVO> custAList = custAddrService.custAddrDetailList(cust_no);
			
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
		
		menuImport(mav, "cust");
		
		return mav;
	}
	
	@RequestMapping(value="/custSave", method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public CustVO custSave(
//			@RequestParam(value="cust_list[]",required=false) List<String> cust_list
			CustVO cvoS, String cust_no){
		int result;
//		int flg;
//		System.out.println("cvoS" + cvoS);
//		System.out.println("cust_no"+cust_no);
//		CustVO cvo = new CustVO();
//		if(cust_list != null){
//			for(int i=0; i < cust_list.size(); i++){
//				cvo.setCust_name(cust_list.get(i));
//				cvo.setResident_no(cust_list.get(++i));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
//				cvo.setChart_no(cust_list.get(++i));
//				cvo.setCust_id(cust_list.get(++i));
//				cvo.setVisit_cd(cust_list.get(++i));
//				cvo.setVisit_dtl_cd(cust_list.get(++i));
//				cvo.setVisit_cn(cust_list.get(++i));
//				cvo.setRec_per(cust_list.get(++i));
//				cvo.setRemark_cn(cust_list.get(++i));
//			}
//		}
		CustVO custVO = null;
		if(cust_no == null || cust_no == ""){
			result = custService.custAdd(cvoS);
			System.out.println("result"+result);
			
			if(result == 1){
				String custNo = cvoS.getCust_no();
				custVO = custService.custDetailList(custNo);
				System.out.println("if문 안 custVO : "+custVO);
				
			}
		}else if(cust_no != null || cust_no != ""){
//			flg=1;
			cvoS.setCust_no(cust_no);
			result = custService.custMdfy(cvoS);
			if(result == 1){
				custVO = custService.custDetailList(cust_no);
			}
		}
		
		
		return custVO;
	}
	
	@RequestMapping(value="/custPhoneSave", method=RequestMethod.POST)
	@ResponseBody
	public List<CustVO> custPhoneSave(
			@RequestParam(value="custPlist[]",required=false) List<String> custP_list
			,String cust_no){
		
		System.out.println("cust_no : " + cust_no);
		System.out.println("custP_list : " + custP_list);
		
		int Dresult = custPhoneService.custPhoneDelete(cust_no);
		
		//파라미터 리스트
		List<CustVO> custPH_list = new ArrayList<CustVO>();
		//반환 리스트
		List<CustVO> custPList;

		System.out.println(custP_list.size());
		
		if(custP_list != null){
			for(int i=0; i < custP_list.size(); i++){
				CustVO cvo = new CustVO();
				
				cvo.setCust_no(cust_no);
				cvo.setPhone_type_cd(custP_list.get(i));
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
			@RequestParam(value="custAlist[]",required=false) List<String> custA_list
			,String cust_no){
		
		System.out.println("custA_list : " + custA_list);
		
		int Dresult = custAddrService.custAddrDelete(cust_no);
		
		//파라미터 리스트
		List<CustVO> custAD_list = new ArrayList<CustVO>();
		//반환 리스트
		List<CustVO> custAList;
		
		if(custA_list != null){
			for(int i=0; i < custA_list.size(); i++){
				CustVO cvo = new CustVO();
				
				cvo.setCust_no(cust_no);
				cvo.setAddr_type_cd(custA_list.get(i));
				cvo.setZip_no(custA_list.get(++i));
				cvo.setMain_address(custA_list.get(++i));
				cvo.setDetail_address(custA_list.get(++i));
				cvo.setPrimary_yn(custA_list.get(++i));
				
				custAD_list.add(cvo);
			}
			
			int result = custAddrService.custAddrAdd(custAD_list);
		}
		
		custAList = custAddrService.custAddrDetailList(cust_no);
		
		return custAList;
	}
	
	@RequestMapping(value="cust_delete", method=RequestMethod.POST)
	public @ResponseBody int custDelete(CustVO custVo, HttpSession session)
	{
		int result = 0;
		
		result = custService.custDelete(custVo);
		return result;
	}
	
	//엑셀 추가 전 팝업
	@RequestMapping(value="/excelImportTab", method=RequestMethod.GET)
	public ModelAndView excelImportTab(HttpSession session, Locale locale,@RequestParam(value = "pageNum", defaultValue = "1") int pageNum)
	{
		System.out.println("ExcelTab Controller");
		ModelAndView mov = new ModelAndView("/cust/excel_import_tab");
		
		return mov;
	}
	
	// Excel Data Import
    @RequestMapping(value = "/excelUploadAjax", headers = "content-type=multipart/*", method = RequestMethod.POST)
    public ModelAndView excelUploadAjax(MultipartHttpServletRequest request)  throws Exception{
        MultipartFile excelFile = request.getFile("excelFile");
        System.out.println("excelFile : " + excelFile);
		
        System.out.println("엑셀 파일 업로드 컨트롤러");
        if(excelFile==null || excelFile.isEmpty()){
            throw new RuntimeException("엑셀파일을 선택 해 주세요.");
        }
        
        int result = custService.excelUpload(excelFile);
        System.out.println(result);
        
        return new ModelAndView("/cust/excel_import_tab", "result", result);
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
