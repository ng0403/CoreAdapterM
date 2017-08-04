/**************************************************************************
 * OCVAN Communicator Mediation Platform.
 * Copyright since 2012
 * Licensed under KTDS inc.
 * ----------------------------------------------------
 * initial revision : 2012. 7. 28. chan77xx
 **************************************************************************/
package com.core.plus.common;

import org.apache.log4j.Logger;

/**
 * @author chan77xx
 *
 */
public class TransactionIdGenerator {
	
	static Logger logger = Logger.getLogger(TransactionIdGenerator.class);
	
	/**
	 * 트랜잭션ID를 생성하여 반환한다.
	 * @return
	 * @throws Exception
	 */
	public synchronized static String createTransactionId() throws Exception {
		logger.debug("== Creating Transaction Id");
		String transactionId =    ConfigureFactory.getConfigure().getVanillaNode()
								+ System.currentTimeMillis()/100
								;
		Thread.sleep(100);
		logger.debug(" + transactionId : " + transactionId);
		return transactionId;
	}

}
