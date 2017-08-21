package com.core.plus.lead.dao;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.task.vo.TaskVO;

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
		 System.out.println("Dao : " + lead_no);
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

	// 엑셀 출력
	@Override
	public List<LeadVO> leadExcelExport(Map<String, Object> leadMap) {
		
		List<LeadVO> leadExcelExport = null;
		try {
			leadExcelExport = sqlSession.selectList("lead.leadExcelExport", leadMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return leadExcelExport;
	}

	@Override
	public int leadUploadExcel(MultipartFile excelFile) {
		// TODO Auto-generated method stub
		System.out.println("Excel Upload Dao");
		int result = 0;
		
		try {
			Workbook workBook = WorkbookFactory.create(excelFile.getInputStream());
			Sheet sheet = workBook.getSheetAt(0);
			Row row = null;
			Cell cell = null;
			
			String lead_no   = null;
			String lead_name = null;
			String cust_no = null;
			String emp_no  = null;
			String contact_day = null;
			String rank_cd  = null;
			String reason_cd = null;
			String remark_cn = null;
			
			int rows = sheet.getPhysicalNumberOfRows();
			System.out.println(rows);
			
			for(int i=0; i<rows; i++) {
				row = sheet.getRow(i);
				
				cell = row.getCell(0);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					lead_no = cell.getStringCellValue();
					
					System.out.println("oppty_no");
				}
				
				cell = row.getCell(1);
				lead_name = cell.getStringCellValue().trim();
				
				System.out.println("oppty_name");

				cell = row.getCell(2);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					cust_no = cell.getStringCellValue();
					
					System.out.println("cust_no");
				}
				
				cell = row.getCell(3);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					emp_no = cell.getStringCellValue();
					
					System.out.println("emp_no");
				}
				
				cell = row.getCell(4);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					contact_day = String.valueOf(tmp);
				}
				
				cell = row.getCell(5);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					rank_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(6);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					reason_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(7);
				remark_cn = cell.getStringCellValue();
				
				LeadVO leadVo = new LeadVO();
				leadVo.setLead_no(lead_no);;
				leadVo.setLead_name(lead_name);
				leadVo.setCust_no(cust_no);
				leadVo.setEmp_no(emp_no);
				leadVo.setContact_day(contact_day);
				leadVo.setRank_cd(rank_cd);
				leadVo.setReason_cd(reason_cd);
				leadVo.setRemark_cn(remark_cn);
				
				System.out.println("VO : " + leadVo);
				
				if(lead_no != null || leadVo.getLead_no() != null)
				{
					result += sqlSession.insert("lead.lead_multi_insert", leadVo);
				}
			}
			
		} catch (InvalidFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(result);
		
		return result;
	}
}
