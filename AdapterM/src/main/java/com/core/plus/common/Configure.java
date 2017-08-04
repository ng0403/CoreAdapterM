/**************************************************************************
 * OCVAN Communicator Mediation Platform.
 * Copyright since 2012
 * Licensed under KTDS inc.
 * ----------------------------------------------------
 * initial revision : 2012. 7. 19. Administrator
 **************************************************************************/
package com.core.plus.common;

import java.util.ArrayList;
import java.util.List;


/**
 * @author Administrator
 *
 */
public class Configure {
	
	//----------------------------------
	// 환경변수로 설정된 내용
	//----------------------------------
	String vanillaHome = null;
	String vanillaNode = null;
	String configPath = null;
	
	//----------------------------------
	// 설정파일 주요설정
	//----------------------------------
	boolean nodbMode = false;
	String approvalType = null; 		// 승인유형(MID/IKC/VAN)
	String securityAlgorithm = null;
	String securityKey = null;
	
	
	//SEED 암호화 설정내용
	byte[] seedCryptKey = null;
	byte[] requestIV = null;
	byte[] responseIV = null;
	

	//----------------------------------
	// 추가업무영역에서 사용할 설정
	//----------------------------------
	ValueObject properties = new ValueObject();
	
	//----------------------------------
	// VanServers List
	//----------------------------------	
	List<ValueObject> vanServers = new ArrayList<ValueObject>();
	
	/**
	 * 지정된 프로퍼티값 반환
	 * @param key
	 * @return
	 */
	public String getProperty(String key) {
		return properties.getString(key);
	}
	
	/**
	 * 지정된 프로퍼티값 할당
	 * @param key
	 * @param value
	 */
	public void setProperty(String key, String value) {
		properties.setString(key, value);
	}
	
	/**
	 * 설정정보출력
	 */
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		
		// 프로토콜정보 출력
		buffer.append("\n/ Configure Infomation");
		String[] columnNames = new String[] { 
				 "configPath"
				,"vanillaHome"
				,"vanillaNode"
				,"nodbMode"
				,"approvalType"
				,"securityAlgorithm"
				,"securityKey" 
		};
		String[] columnValues = new String[] { 
				 configPath
				,vanillaHome
				,vanillaNode
				,Boolean.toString(nodbMode)
				,approvalType
				,securityAlgorithm
				,securityKey 
		};
		buffer.append(TextTableBuilder.createTextTable(columnNames, columnValues));
		
		// 프로토콜항목 출력
		buffer.append("\n/ Configure poroperties ");
		buffer.append(properties.toString());
		
		// VanServers List
		buffer.append("\n/ VanServers");
		buffer.append(TextTableBuilder.createTextTable(vanServers));

		return buffer.toString();
	}

	public String getVanillaHome() {
		return vanillaHome;
	}

	public void setVanillaHome(String vanillaHome) {
		this.vanillaHome = vanillaHome;
	}

	public String getConfigPath() {
		return configPath;
	}

	public void setConfigPath(String configPath) {
		this.configPath = configPath;
	}

	public String getVanillaNode() {
		return vanillaNode;
	}

	public void setVanillaNode(String vanillaNode) {
		this.vanillaNode = vanillaNode;
	}

	public boolean isNodbMode() {
		return nodbMode;
	}

	public void setNodbMode(boolean nodbMode) {
		this.nodbMode = nodbMode;
	}

	public String getApprovalType() {
		return approvalType;
	}

	public void setApprovalType(String approvalType) {
		this.approvalType = approvalType;
	}

	public String getSecurityAlgorithm() {
		return securityAlgorithm;
	}

	public void setSecurityAlgorithm(String securityAlgorithm) {
		this.securityAlgorithm = securityAlgorithm;
	}

	public String getSecurityKey() {
		return securityKey;
	}

	public void setSecurityKey(String securityKey) {
		this.securityKey = securityKey;
	}

	public ValueObject getProperties() {
		return properties;
	}

	public void setProperties(ValueObject properties) {
		this.properties = properties;
	}

	public List<ValueObject> getVanServers() {
		return vanServers;
	}

	public void setVanServers(List<ValueObject> vanServers) {
		this.vanServers = vanServers;
	}

	public ValueObject getVanServer() {
		String id = getVanillaNode();
    	return getVanServer(id);
    }

	public ValueObject getVanServer(String id) {
		List<ValueObject> vanServers = getVanServers();
    	for(ValueObject vo : vanServers) {
    		if(vo.getString("id").equals(id))
    			return vo;
    	}
    	return null;
    }

	public ValueObject getVanServer(String type, String name) {
		List<ValueObject> vanServers = getVanServers();
    	for(ValueObject vo : vanServers) {
    		if(type.equals("id") && vo.getString("id").equals(name))
    			return vo;
    		if(type.equals("type") && vo.getString("type").equals(name))
    			return vo;
    	}
    	return null;
    }

	public void setVanServer(String id, String key, String val) {
		List<ValueObject> vanServers = getVanServers();
    	for(ValueObject vo : vanServers) {
    		if(vo.getString("id").equals(id)) {
    			vo.put(key, val);
    			return;
    		}
    	}
    }

	/**
	 * @return the seedCryptKey
	 */
	public byte[] getSeedCryptKey() {
		return seedCryptKey;
	}

	/**
	 * @param seedCryptKey the seedCryptKey to set
	 */
	public void setSeedCryptKey(byte[] seedCryptKey) {
		this.seedCryptKey = seedCryptKey;
	}

	/**
	 * @return the requestIV
	 */
	public byte[] getRequestIV() {
		return requestIV;
	}

	/**
	 * @param requestIV the requestIV to set
	 */
	public void setRequestIV(byte[] requestIV) {
		this.requestIV = requestIV;
	}

	/**
	 * @return the responseIV
	 */
	public byte[] getResponseIV() {
		return responseIV;
	}

	/**
	 * @param responseIV the responseIV to set
	 */
	public void setResponseIV(byte[] responseIV) {
		this.responseIV = responseIV;
	}
}