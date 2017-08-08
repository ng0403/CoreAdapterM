package com.core.plus.lead.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.lead.vo.LeadVO;

@Repository
public class LeadDaoImpl implements LeadDao {
	 
	@Autowired SqlSession sqlSession;

	@Override
	public List<LeadVO> lead_list() {
		
		List<LeadVO> vo = sqlSession.selectList("leadList");
		
		return vo;
	}

	@Override
	public void lead_insert(LeadVO vo) {
		
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

	
}
