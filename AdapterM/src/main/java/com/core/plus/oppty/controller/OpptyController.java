package com.core.plus.oppty.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.oppty.service.OpptyService;
import com.core.plus.oppty.vo.OpptyVO;

@Controller
public class OpptyController {
	
	@Resource
	OpptyService opptyService;
	
	// 처음 list 화면
	@RequestMapping(value="oppty")
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
	
	@RequestMapping(value="oppty_detail")
	public ModelAndView opptyDetail(String oppty_no, String flg)
	{
		System.out.println(oppty_no);
		
		if(oppty_no == null || oppty_no == "")
		{
			List<OpptyVO> status = opptyService.opptyStatusCD();
			List<OpptyVO> stage = opptyService.opptyStageCD();
			List<OpptyVO> dtype = opptyService.opptyDtypeCD();
			List<OpptyVO> purchase = opptyService.opptyPerchaseType();
			List<OpptyVO> payment = opptyService.opptyPaymentCD();
			List<OpptyVO> recper = opptyService.opptyRecPerCD();
			
			ModelAndView mov = new ModelAndView("oppty_detail");

			mov.addObject("opptyStatusCd", status);
			mov.addObject("opptyStageCd", stage);
			mov.addObject("dtypeCd", dtype);
			mov.addObject("purchaseType", purchase);
			mov.addObject("paymentCd", payment);
			mov.addObject("recperCd", recper);
			
			return mov;
		}
		else
		{
			List<OpptyVO> status = opptyService.opptyStatusCD();
			List<OpptyVO> stage = opptyService.opptyStageCD();
			List<OpptyVO> dtype = opptyService.opptyDtypeCD();
			List<OpptyVO> purchase = opptyService.opptyPerchaseType();
			List<OpptyVO> payment = opptyService.opptyPaymentCD();
			List<OpptyVO> recper = opptyService.opptyRecPerCD();
			
			ModelAndView mov = new ModelAndView("oppty_detail");

			mov.addObject("opptyDetail",  opptyService.opptyDetail(oppty_no));
			mov.addObject("opptyStatusCd", status);
			mov.addObject("opptyStageCd", stage);
			mov.addObject("dtypeCd", dtype);
			mov.addObject("purchaseType", purchase);
			mov.addObject("paymentCd", payment);
			mov.addObject("recperCd", recper);
			
			return mov;
		}
	}

}
