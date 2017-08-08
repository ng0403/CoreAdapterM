package com.core.plus.contact.cust.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.contact.cust.dao.CustDAO;
import com.core.plus.contact.cust.vo.CustVO;

@Service
public class CustServiceImpl implements CustService{
	@Resource
	CustDAO custDao;

	@Override
	public List<CustVO> custList() {
		// TODO Auto-generated method stub
		List<CustVO> custList = custDao.custList();
		
		return custList;
	}

	@Override
	public CustVO custDetailList(String cust_no) {
		// TODO Auto-generated method stub
		CustVO custDList = custDao.custDetailList(cust_no);
		return custDList;
	}

	@Override
	public int custAdd(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = custDao.custAdd(cvo);
		return result;
	}

	@Override
	public int custMdfy(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = custDao.custMdfy(cvo);
		return result;
	}

}
