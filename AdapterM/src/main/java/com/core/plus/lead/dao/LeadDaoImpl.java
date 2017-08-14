package com.core.plus.lead.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;

@Repository
public class LeadDaoImpl implements LeadDao {
	 
	@Autowired SqlSession sqlSession;

	@Override
	public List<LeadVO> lead_list(Map<String, Object> map) {
		
		List<LeadVO> vo = sqlSession.selectList("leadList", map);
		
		return vo;
	}

	@Override
	public void lead_insert(LeadVO vo) {
		System.out.println("insert vo " + vo.toString());
		sqlSession.insert("lead_single_add", vo);
		
	}

	@Override
	public void lead_update(LeadVO vo) {
		
		sqlSession.update("lead_update", vo);
		
	}

	@Override
	public LeadVO lead_detail(String lead_no) {
		 
		return sqlSession.selectOne("lead_detail", lead_no);
	}

	@Override
	public void lead_delete(String lead_no) {
		
		sqlSession.update("lead_delete", lead_no);
		
	}

	@Override
	public List<LeadVO> leadSearch(Map<String, Object> leadMap) {
		
		List<LeadVO> obj = sqlSession.selectList("leadList", leadMap);
		return obj;
	}

	@Override
	public List<CustVO> custPopupList() {
		// TODO Auto-generated method stub
		List<CustVO> custPopList = sqlSession.selectList("lead.custPopupList");
		
		return custPopList;
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<CustVO> custPopList = sqlSession.selectList("lead.custPopupList", map);
		
		return custPopList;
	}

	@Override
	public List<EmpVO> empPopupList() {
		// TODO Auto-generated method stub
		List<EmpVO> empPopList = sqlSession.selectList("lead.empPopupList");
		
		return empPopList;
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<EmpVO> empPopList = sqlSession.selectList("lead.empPopupList", map);
		
		return empPopList;
	}
	
	
	@Override
	public int getLeadListRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("lead.leadListTotalRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	
}
