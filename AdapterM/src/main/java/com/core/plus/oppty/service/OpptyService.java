package com.core.plus.oppty.service;

import java.util.List;

import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

public interface OpptyService {
	
	List<OpptyVO> oppty_list();
	List<OpptyItemVO> opptyItem_list();

}
