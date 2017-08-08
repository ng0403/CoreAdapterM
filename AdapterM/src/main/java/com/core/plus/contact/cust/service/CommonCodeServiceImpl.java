package com.core.plus.contact.cust.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.contact.cust.dao.CommonCodeDao;
import com.core.plus.contact.cust.vo.CommonCodeVO;

@Service
public class CommonCodeServiceImpl implements CommonCodeService{
	@Resource
	CommonCodeDao commonCodeDao;

	@Override
	public List<CommonCodeVO> vititCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> vititCdList = commonCodeDao.vititCdList();
		
		return vititCdList;
	}

	@Override
	public List<CommonCodeVO> vititDtlCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> vititDtlCdList = commonCodeDao.vititDtlCdList();
		
		return vititDtlCdList;
	}

	@Override
	public List<CommonCodeVO> phoneTypeCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> phoneTypeCdList = commonCodeDao.phoneTypeCdList();
		
		return phoneTypeCdList;
	}

	@Override
	public List<CommonCodeVO> phoneCountryCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> phoneCountryCdList = commonCodeDao.phoneCountryCdList();
		
		return phoneCountryCdList;
	}

	@Override
	public List<CommonCodeVO> addrTypeCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> addrTypeCdList = commonCodeDao.addrTypeCdList();
		
		return addrTypeCdList;
	}

}
