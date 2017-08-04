package com.core.plus.common;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class ValueObjectUtil {
	
	static Logger logger = Logger.getLogger(ValueObjectUtil.class);
	
	/**
	 * HttpServletRequest��ü�� �ж���ͷ� ���� VO ����
	 * @param request
	 * @return
	 */
	public static ValueObject toValueObject(HttpServletRequest request) {
		ValueObject valueObject = new ValueObject();
		Enumeration en = request.getParameterNames();
		while(en.hasMoreElements() == true) {
			String key = (String) en.nextElement();
			Object value = request.getParameter(key) == null ? request.getParameterValues(key) : request.getParameter(key);
			valueObject.put(key, value);
		}
		return valueObject;
	}
	
	/**
	 * Parsing request parameter into List of valueObject
	 * @param request
	 * @param columnNames
	 * @return
	 */
	public static List<ValueObject> toList(HttpServletRequest request, String... columnNames) {
		List<ValueObject> list = new ArrayList<ValueObject>();
		if(columnNames == null || columnNames.length < 1){
			Enumeration enu = request.getParameterNames();
			List<String> params = new ArrayList<String>();
			while(enu.hasMoreElements()){
				params.add((String)enu.nextElement());
			}
			columnNames = params.toArray(new String[params.size()]);
		}
		int maxCnt = request.getParameterValues(columnNames[0]).length;
		for (int idx = 0; idx < maxCnt; idx++) {
			list.add(new ValueObject());
		}
		
		for (int idx = 0; idx < columnNames.length; idx++) {
			String[] temp = request.getParameterValues(columnNames[idx]);
			for (int j = 0; j < temp.length; j++) {
				list.get(j).setString(columnNames[idx], temp[j]);
			}
		}
		return list;
	}
}
