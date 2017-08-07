package com.core.plus.test.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.test.dao.TestDao;
import com.core.plus.test.vo.TestVO;

@Service("TestService")
public class TestServiceImpl implements TestService{
	@Resource
	TestDao testDao;
	
	@Override
	public List<TestVO> testList() {
		// TODO Auto-generated method stub
		List<TestVO> tlist = testDao.testList();
		return tlist;
	}

}
