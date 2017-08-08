package com.core.plus.contact.cust.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.contact.cust.dao.CustAddrDAO;
import com.core.plus.contact.cust.vo.CustVO;

@Service
public class CustAddrServiceImpl implements CustAddrService{
	@Resource
	CustAddrDAO custAddrDao;

	@Override
	public List<CustVO> custAddrDetailList(String cust_no) {
		// TODO Auto-generated method stub
		List<CustVO> custPhList = custAddrDao.custAddrDetailList(cust_no);
		
		return custPhList;
	}

	@Override
	public int custAddrDelete(String cust_no) {
		// TODO Auto-generated method stub
		int result = custAddrDao.custAddrDelete(cust_no);
		return result;
	}

	@Override
	public int custAddrAdd(List<CustVO> custAD_list) {
		// TODO Auto-generated method stub
		int result = 0;
		for(int i = 0; i < custAD_list.size(); i++){
			result = custAddrDao.custAddrAdd(custAD_list.get(i));
		}
		return result;
	}

}
