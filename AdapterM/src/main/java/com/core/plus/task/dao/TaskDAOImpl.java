package com.core.plus.task.dao;

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
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

@Repository
public class TaskDAOImpl implements TaskDAO {
	
	@Autowired
	SqlSession sqlSession;

	//List
	@Override
	public List<TaskVO> taskList() {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList");
		return vo;
	}

	//List 페이지
	@Override
	public List<TaskVO> taskList(Map<String, Object> taskMap) {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList", taskMap);
		return vo;
	}
	
	//분류코드
	@Override
	public List<TaskVO> taskDtypeCD() {
		
		List<TaskVO> code = sqlSession.selectList("task.taskDtypeCode");
		return code;
	}

	//상대가치점수
	@Override
	public List<TaskVO> taskScoreCD() {
		
		List<TaskVO> code = sqlSession.selectList("task.taskScoreCode");
		return code;
	}

	//조회
	@Override
	public List<TaskVO> taskSchList(Map<String, Object> taskMap) {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList", taskMap);
		return vo;
	}
	
	//인덱스번호
	@Override
	public TaskVO taskNoIndex() {
		
		return sqlSession.selectOne("task.taskNoIndex");
	}

	//상세보기
	@Override
	public Object taskDetail(String task_no) {
		
		TaskVO detail = sqlSession.selectOne("task.taskDetail", task_no);
		return detail;
	}

	//추가
	@Override
	public int taskInsert(TaskVO taskVo) {
		
		int result = sqlSession.insert("task.taskInsert", taskVo);
		return result;
	}

	//수정
	@Override
	public int taskEdit(TaskVO taskVo) {
		
		int result = sqlSession.insert("task.taskEdit", taskVo);
		return result;
	}

	@Override
	public int taskDelete(TaskVO taskVo) {
		
		int result = sqlSession.delete("task.taskDelete", taskVo);
		return result;
	}

	@Override
	public int getTaskListRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.taskListTotalRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}
	
	@Override
	public List<CustVO> custPopupList() {
		
		List<CustVO> custPopList = sqlSession.selectList("task.custPopupList");
		return custPopList;
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		
		List<CustVO> custPopList = sqlSession.selectList("task.custPopupList", map);
		return custPopList;
	}

	@Override
	public int getEmpPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.empPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<EmpVO> empPopupList() {
		
		List<EmpVO> empPopList = sqlSession.selectList("task.empPopupList");
		return empPopList;
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		
		List<EmpVO> empPopList = sqlSession.selectList("task.empPopupList", map);
		return empPopList;
	}

	@Override
	public int getLeadPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.leadPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<LeadVO> leadPopupList() {
		
		List<LeadVO> leadPopupList = sqlSession.selectList("task.leadPopupList");
		return leadPopupList;
	}

	@Override
	public List<LeadVO> leadPopupList(Map<String, Object> map) {
		
		List<LeadVO> leadPopupList = sqlSession.selectList("task.leadPopupList", map);
		return leadPopupList;
	}

	@Override
	public int getOpptyPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.opptyPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<OpptyVO> opptyPopupList() {
		
		List<OpptyVO> opptyPopupList = sqlSession.selectList("task.opptyPopupList");
		return opptyPopupList;
	}

	@Override
	public List<OpptyVO> opptyPopupList(Map<String, Object> map) {
		
		List<OpptyVO> opptyPopupList = sqlSession.selectList("task.opptyPopupList", map);
		return opptyPopupList;
	}

	//엑셀 출력
	@Override
	public List<TaskVO> taskExcelExport(Map<String, Object> taskMap) {
		
		List<TaskVO> taskExcelExport = null;
		try {
			taskExcelExport = sqlSession.selectList("task.taskExcelExport", taskMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return taskExcelExport;
	}

	@Override
	public int taskUploadExcel(MultipartFile excelFile) {
		// TODO Auto-generated method stub
		System.out.println("Excel Upload Dao");
		int result = 0;
		
		try {
			Workbook workBook = WorkbookFactory.create(excelFile.getInputStream());
			Sheet sheet = workBook.getSheetAt(0);
			Row row = null;
			Cell cell = null;
			
			String task_no   = null;
			String subject  = null;
			String cust_no  = null;
			String emp_no   = null;
			String lead_no  = null;
			String oppty_no = null;
			String location = null;
			String next_day = null;
			String dtype_cd = null;
			String score_cd = null;
			String remark_cn = null;
			
			int rows = sheet.getPhysicalNumberOfRows();
			System.out.println(rows);
			
			for(int i=0; i<rows; i++) {
				row = sheet.getRow(i);
				
				cell = row.getCell(0);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					task_no = cell.getStringCellValue();
				}
				
				cell = row.getCell(1);
				subject = cell.getStringCellValue().trim();
				
				cell = row.getCell(2);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					cust_no = cell.getStringCellValue();
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
					cell.setCellType(Cell.CELL_TYPE_STRING);
					lead_no = cell.getStringCellValue();
				}
				
				cell = row.getCell(5);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					oppty_no = cell.getStringCellValue();
				}
				
				cell = row.getCell(6);
				location = cell.getStringCellValue();
				
				cell = row.getCell(7);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					next_day = String.valueOf(tmp);
				}
				
				cell = row.getCell(8);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					dtype_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(9);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					score_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(10);
				remark_cn = cell.getStringCellValue();
				
				TaskVO taskVo = new TaskVO();
				taskVo.setTask_no(task_no);;
				taskVo.setLead_name(subject);
				taskVo.setCust_no(cust_no);
				taskVo.setLead_no(lead_no);;
				taskVo.setOppty_no(oppty_no);
				taskVo.setEmp_no(emp_no);
				taskVo.setLocation(location);
				taskVo.setNext_day(next_day);
				taskVo.setDtype_cd(dtype_cd);
				taskVo.setScore_cd(score_cd);
				taskVo.setRemark_cn(remark_cn);
				
				System.out.println("VO : " + taskVo);
				
				if(task_no != null || taskVo.getTask_no() != null)
				{
					result += sqlSession.insert("task.task_multi_insert", task_no);
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
