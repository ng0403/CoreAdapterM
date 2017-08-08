package com.core.plus.contact.cust.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.contact.cust.dao.CustPhoneDAO;
import com.core.plus.contact.cust.vo.CustVO;

@Service
public class CustPhoneServiceImpl implements CustPhoneService{
	
	@Resource
	CustPhoneDAO custPhoneDao;

	@Override
	public List<CustVO> custPhoneDetailList(String cust_no) {
		// TODO Auto-generated method stub
		List<CustVO> custPhList = custPhoneDao.custPhoneDetailList(cust_no);
		
		return custPhList;
	}

	@Override
	public int custPhoneDelete(String cust_no) {
		// TODO Auto-generated method stub
		int result = custPhoneDao.custPhoneDelete(cust_no);
		return result;
	}

	@Override
	public int custPhoneAdd(List<CustVO> custPH_list) {
		// TODO Auto-generated method stub
		int result = 0;
		for(int i = 0; i < custPH_list.size(); i++){
			result = custPhoneDao.custPhoneAdd(custPH_list.get(i));
		}
		return result;
	}

}
