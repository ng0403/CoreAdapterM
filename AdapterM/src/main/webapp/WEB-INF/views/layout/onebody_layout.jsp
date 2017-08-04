<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 공통 CSS -->
<link rel="stylesheet" href="${ctx}/resources/common/css/jquery-ui.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/header.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/menu.css?ver=1.1" type="text/css" /> 
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/subMenu.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/content.css?ver=1.1" type="text/css" />
<link href="http://code.jquery.com/ui/1.10.3/themes/redmond/jquery-ui.css?ver=1.1" rel="stylesheet">
<link rel="stylesheet" href="${ctx}/resources/common/css/standard/common.css?ver=1.1" type="text/css" />

<!-- //dateTimepicker.css -->
<link rel="stylesheet" href="//cdn.rawgit.com/xdan/datetimepicker/master/jquery.datetimepicker.css">

<!-- 고객 통합 관리  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/customerManager/customerManager_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/customerManager/customerManager_form.css?ver=1.1" type="text/css" />

<!-- 가맹점 정산 -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/franchiseeCalculate/franchiseeCalculateCSS.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/franchiseeCalculate/jquery.monthpicker-0.1.css?ver=1.1" type="text/css" />

<!-- ERP가맹점별 월 포인트 정산 -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/erp/erpMonthlyPoint/erpMonthlyPoint_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/erp/erpMonthlyPoint/erpMonthlyPointDetail_Modal_list.css?ver=1.1" type="text/css" />

<!-- ERP가맹점별 월 수수료 정산 -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/erp/erpMonthlyBill/erpMonthlyBill_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/erp/erpMonthlyBill/erpMonthlyBillDetail_Modal_list.css?ver=1.1" type="text/css" />

<!-- ERP부서별 월 상품권 정산  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/erp/erpMonthlyGift/erpMonthlyGift_list.css?ver=1.1" type="text/css" />

<!-- 소멸 예정 금액 조회  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/point/expectedExpiredAmt/expectedExpiredAmt_list.css?ver=1.1" type="text/css" />

<!-- 소멸 확정 금액 조회  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/point/confirmedExpiredAmt/confirmedExpiredAmt_list.css?ver=1.1" type="text/css" />

<!-- 다수적립사용내역 조회  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/point/custPointInfo/custPointInfo_list.css?ver=1.1" type="text/css" />

<!-- 포인트수기적립  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/calculate/point/trnsProcInitInfo/trnsProc.css?ver=1.1" type="text/css" />

<!-- 채번관리  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/numManager/numManager_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/numManager/numIssue.css?ver=1.1" type="text/css" />

<!-- 쿠폰관리  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/coupon/couponManager.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/coupon/couponSendInfo.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/coupon/couponUsedInfo.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/coupon/couponSendMain.css?ver=1.1" type="text/css" />

<!-- 상품권관리  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/giftbon/giftbonManager.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/giftbon/giftbonSendInfo.css?ver=1.1" type="text/css" />

<!-- 기프트카드관리  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/giftCard/giftCardManager.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/giftCard/giftCardSendInfo.css?ver=1.1" type="text/css" />

<!-- 로열티 프로그램  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/loyalty/program/loyalty_program_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/loyalty/program/loyalty_program_form.css?ver=1.1" type="text/css" />

<!-- 로열티 프로모션  -->
<link rel="stylesheet" href="${ctx}/resources/common/css/loyalty/promotion/loyalty_promotion_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/loyalty/promotion/loyalty_promotion_form.css?ver=1.1" type="text/css" />

<!-- RFM 고객 등급 관리 -->
<link rel="stylesheet" href="${ctx}/resources/common/css/scoring/rfmCustomerGrade/rfm_customer_grade_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/scoring/rfmCustomerGrade/rfm_customer_grade_form.css?ver=1.1" type="text/css" />

<!-- RFM 분류별 고객 관리 -->
<link rel="stylesheet" href="${ctx}/resources/common/css/scoring/rfmCategoryCustomer/rfm_category_customer_list.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/scoring/rfmCategoryCustomer/rfm_category_customer_form.css?ver=1.1" type="text/css" />

<!-- 기준 정보 관련 CSS -->
<link rel="stylesheet" href="${ctx}/resources/common/css/info/auth/auth_CSS.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/info/menu/menu_CSS.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/info/org/org_CSS.css?ver=1.1" type="text/css" />
<link rel="stylesheet" href="${ctx}/resources/common/css/info/user/user_CSS.css?ver=1.1" type="text/css" />

<!-- 공통 JS -->
<script type="text/javascript" src="${ctx}/resources/common/js/jquery-1.11.1.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/jquery-ui.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/standard/menu.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/standard/subMenu.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/common/common_func.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/common/util.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/jquery.blockUI.js"></script>

<!-- 고객 통합 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/customerManager/customerManager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/customerManager/customerManager_form.js?ver=1.1"></script>

<!-- 법인 고객 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/customerManager/customerCompany/customerCompany_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/customerManager/customerCompany/customerCompany_form.js?ver=1.1"></script>

<!-- ERP가맹점별 월 포인트 정산 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/erp/erpMonthlyPoint/erpMonthlyPoint_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/erp/erpMonthlyPoint/erpMonthlyPointDetail_Modal_list.js?ver=1.1"></script>

<!-- ERP가맹점별 월 수수료 정산 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/erp/erpMonthlyBill/erpMonthlyBill_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/erp/erpMonthlyBill/erpMonthlyBillDetail_Modal_list.js?ver=1.1"></script>

<!-- ERP부서별 월 상품권 정산  -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/erp/erpMonthlyGift/erpMonthlyGift_list.js?ver=1.1"></script>

<!-- 미수금 조회 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/billStore/billStore_list.js?ver=1.1"></script>

<!-- 상품권비용정산 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/giftCalculate/giftCalculate_list.js?ver=1.1"></script>

<!-- 소멸 예정 금액 조회  -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/point/expectedExpiredAmt/expectedExpiredAmt_list.js?ver=1.1"></script>

<!-- 소멸 확정 금액 조회  -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/point/confirmedExpiredAmt/confirmedExpiredAmt_list.js?ver=1.1"></script>

<!-- 다수적립사용내역 조회  -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/point/custPointInfo/custPointInfo_list.js?ver=1.1"></script>

<!-- 포인트수기적립  -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/point/trnsProcInitInfo/trnsProc.js?ver=1.1"></script>

<!-- 채번관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/numManager/numManager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/numManager/numInquiry_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/numManager/numIssue.js?ver=1.1"></script>

<!-- 쿠폰관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/coupon/couponManager/coupon_manager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/coupon/couponManager/coupon_manager_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/coupon/couponSendInfo/coupon_send_info_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/coupon/couponUsedInfo/coupon_used_info_list.js?ver=1.1"></script>

<!-- 상품권 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/giftbon/giftbonManager/giftbon_manager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftbon/giftbonManager/giftbon_manager_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftbon/giftbonSendInfo/giftbon_send_info_list.js?ver=1.1"></script>


<!-- 기프트카드 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardManager/giftCard_manager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardManager/giftCard_manager_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardSendInfo/giftCard_send_info_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardChangeInfo/giftCard_change_info_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardTrnsInfo/giftCard_trns_info_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/giftCard/giftCardManualProc/giftCardManualProc_form.js?ver=1.1"></script>


<!-- VAN수수료 확정내역조회 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/point/vanCommissionList/vanCommissionList_list.js?ver=1.1"></script>

<!-- 가맹점 정산-전문조회 -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/franchiseeCalculate/telegramInqr/telegramInqrJS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/franchiseeCalculate/transactionInfoJS/transactionInfoJS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/franchiseeCalculate/dailyCalStore/dailyCalStoreJS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/franchiseeCalculate/monthCalStore/monthCalStoreJS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/franchiseeCalculate/jquery.monthpicker-0.1.js"></script>
<!-- 가맹점 계약 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/franchise/franchiseJS.js?ver=1.1"></script>

<!-- 로열티 프로그램 -->
<script type="text/javascript" src="${ctx}/resources/common/js/loyalty/program/loyalty_program_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/loyalty/program/loyalty_program_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_manager.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_manager_detail.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_manager_form.js?ver=1.1"></script>

<!-- 로열티 프로모션 -->
<script type="text/javascript" src="${ctx}/resources/common/js/loyalty/promotion/loyalty_promotion_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/loyalty/promotion/loyalty_promotion_form.js?ver=1.1"></script>

<!-- RFM 기준정보 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmStandard/rfm_standard_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmStandard/rfm_standard_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmStandard/rfm_weight.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmStandard/rfm_work_history.js?ver=1.1"></script>

<!-- RFM 고객 등급 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmCustomerGrade/rfm_customer_grade_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmCustomerGrade/rfm_customer_grade_form.js?ver=1.1"></script>

<!-- RFM 분류별 고객 리스트 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmCategoryCustomer/rfm_category_customer_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/rfmCategoryCustomer/rfm_category_customer_form.js?ver=1.1"></script>

<!-- LTV 기준정보 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/ltvStandard/ltv_standard_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/ltvStandard/ltv_standard_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/ltvStandard/ltv_weight.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/ltvStandard/ltv_work_history.js?ver=1.1"></script>

<!-- LTV 고객점수 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/ltvCustomerScore/ltv_customer_score_list.js?ver=1.1"></script>

<!-- 고객 등급 관리 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_list.js?ver=1.1"></script>

<!-- 고객 등급 상세 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_form.js?ver=1.1"></script>

<!-- 고객 등급 이력 -->
<script type="text/javascript" src="${ctx}/resources/common/js/scoring/customerGradeManager/customer_grade_history.js?ver=1.1"></script>

<!--  기프트카드 월 정산 JS -->
<script type="text/javascript" src="${ctx}/resources/common/js/calculate/giftCardMonthlyCal/giftCardMonthlyCalJS.js?ver=1.1"></script>


<!--  캠페인 JS -->
<script type="text/javascript" src="${ctx}/resources/common/js/campaign/camManager/camManager_list_v1.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/campaign/camManager/camManager_form.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/campaign/offerManager/offerManager_list.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/campaign/camPointManager/camPointManager_list_v1.js?ver=1.1"></script>


<!-- 기준 정보 관련 JS -->
<script type="text/javascript" src="${ctx}/resources/common/js/info/auth/auth_list_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/auth/authmenu_list_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/auth/authmenu_modal_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/auth/authuser_list_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/menu/menu_list_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/org/org_list_JS.js?ver=1.1"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/info/user/user_list_JS.js?ver=1.1"></script>



<title>Coreplus Point System</title>
<style type="text/css">
</style>
</head>
<body>
   <!-- 헤더 -->
    <header id="header_div">
          <tiles:insertAttribute name="header"></tiles:insertAttribute>
    </header>
   <!-- 헤더 -->
   
    <!-- 메인 메뉴 Navi -->
    <nav id="main_navi_div">
          <tiles:insertAttribute name="menu"></tiles:insertAttribute>
    </nav>
    
    <!-- 메인 메뉴 Navi -->    
    <section id="wrap">
        <!-- 서브 메뉴 Navi -->
        <nav id="main_lnb">        
           <tiles:insertAttribute name="subMenu"></tiles:insertAttribute>
        </nav>
        
        <div id="content_wrap">
        
        	<input type="hidden" id="ma_crt_yn" value="${menuAuth.crt_yn}">
        	<input type="hidden" id="ma_mdfy_yn" value="${menuAuth.mdfy_yn}">
        	<input type="hidden" id="ma_del_yn" value="${menuAuth.del_yn}">
        	<input type="hidden" id="ma_rtrv_yn" value="${menuAuth.rtrv_yn}">
   			<div id="viewLoadingImg" style="display: none;">
					<img src="${ctx}/resources/images/viewLoading.gif">
			</div>
            <div id="content">
            	<tiles:insertAttribute name="body"></tiles:insertAttribute>
            </div>           
        </div>
    </section>
    <!-- footer -->
    <%-- <footer id="footer_div">
          <tiles:insertAttribute name="footer"></tiles:insertAttribute>
    </footer> --%>
    <!-- footer -->
</body>
</html>