package com.core.plus.contact.cust.dao;

import java.util.List;

import com.core.plus.contact.cust.vo.CommonCodeVO;

public interface CommonCodeDao {

	List<CommonCodeVO> vititCdList();

	List<CommonCodeVO> vititDtlCdList();

	List<CommonCodeVO> phoneTypeCdList();

	List<CommonCodeVO> phoneCountryCdList();

	List<CommonCodeVO> addrTypeCdList();

}
