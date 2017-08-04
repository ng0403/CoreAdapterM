package com.core.plus.common;

import java.math.BigDecimal;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map.Entry;
import java.util.Set;
import java.util.Vector;

public class ValueObject extends LinkedHashMap<String,Object> {

	private static final long serialVersionUID = 1L;
	
	public ValueObject() {
		super();
	}
	
	/**
	 * Setting column value
	 * @param key
	 * @param value
	 */
	public void setColumn(String key, Object value) {
		this.put(key, value);
	}
	
	/**
	 * Getting column value
	 * @param key
	 * @return
	 */
	public Object getColumn(String key) {
		return this.get(key);
	}
	
	/**
	 * Getting value as string
	 * @param key
	 * @return
	 */
	public String getString(String key) {
		Object value = this.get(key);
		if(value == null) return null;
		return value.toString();
	}
	
	/**
	 * Setting value as string
	 * @param key
	 * @param value
	 */
	public void setString(String key, String value) {
		this.put(key, value);
	}
	
	/**
	 * Getting value as number type
	 * @param key
	 * @return
	 */
	public BigDecimal getNumber(String key) {
		Object value = this.get(key);
		if(value == null) return null;
		BigDecimal decimal = BigDecimal.ZERO;
		try {
			decimal = new BigDecimal(value.toString());
		}catch(Exception e){
			return BigDecimal.ZERO;
		}
		return decimal;
	}
	
	/**
	 * Setting value as number type
	 * @param key
	 * @param value
	 */
	public void setNumber(String key, Object value) {
		BigDecimal decimal = BigDecimal.ZERO;
		try {
			decimal = new BigDecimal(value.toString());
			this.put(key, decimal);
		}catch(Exception e){
			this.put(key, BigDecimal.ZERO);
		}
	}
	
	/**
	 * Getting column names
	 * @return
	 */
	public String[] getColumnNames() {
		Vector<String> buffer = new Vector<String>();
		Set<Entry<String,Object>> set = (Set<Entry<String,Object>>)this.entrySet();
		Iterator<Entry<String,Object>> iter = set.iterator();
		while(iter.hasNext()) {
			Entry<String,Object> entry = iter.next();
			buffer.addElement(entry.getKey());
		}
		return buffer.toArray(new String[buffer.size()]);
	}
	
}
