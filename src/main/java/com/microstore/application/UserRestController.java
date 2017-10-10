package com.microstore.application;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class UserRestController {


	/*static resource_path res_folder = new resource_path();
	static String res_path = res_folder.resource_folder();*/

	private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

	// Check the login credentials.
	@RequestMapping(value = "/checkLogin", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkLoginDetails(@RequestBody Map<String, String> requestBody)
			throws ClassNotFoundException, SQLException {

		String userName = requestBody.get("uName");
		String userPass = requestBody.get("uPass");
		System.out.println("HAKUNAMATATA");
		System.out.println("userName  :   " + userName);
		System.out.println("userPass  :   " + userPass);

		String loginResult = "";
		System.out.println("Login Results  :   " + loginResult);
		return new ResponseEntity<String>("{\"message\":\"" + loginResult + "\"}", HttpStatus.OK);
	}

	/******************************************************************************************************************/
	
	@RequestMapping(value = "/getCompanyList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getCompanyList() throws SQLException, IOException {

		String sql_query = "SELECT Distinct COMPANY_NAME FROM COMPANY_DETAILS";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getCompanyListVending", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getCompanyListVending() throws SQLException, IOException {

		String sql_query = "select distinct(A.COMPANY_NAME) from (select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID) as A";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}

	@RequestMapping(value = "/getCategoriesbyCompany", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getCategoriesbyCompany(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String sql_query = "select distinct(pc.product_catg) from product_details pd JOIN company_details c ON pd.c_id=c.c_id JOIN product_category pc ON pd.pc_id=pc.pc_id WHERE c.company_name='"+companyName+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getCategoriesbyCompanyVending", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getCategoriesbyCompanyVending(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String sql_query = "select distinct(A.PRODUCT_CATG) from (select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID) as A WHERE A.COMPANY_NAME='"+companyName+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductTypeByCompanyAndCategory", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductTypeByCompanyAndCategory(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String category = requestBody.get("category");
		String sql_query = "select distinct(pt.type_name) from product_details pd JOIN company_details c ON pd.c_id=c.c_id JOIN product_category pc ON pd.pc_id=pc.pc_id JOIN product_type pt ON pt.pt_id=pd.pt_id WHERE c.company_name='"+companyName+"' AND pc.product_catg='"+category+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductTypeByCompanyAndCategoryVending", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductTypeByCompanyAndCategoryVending(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String category = requestBody.get("category");
		String sql_query = "select distinct(A.TYPE_NAME) from (select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID) as A WHERE A.COMPANY_NAME='"+companyName+"' AND A.PRODUCT_CATG='"+category+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductDetails", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductDetails(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String category = requestBody.get("category");
		String type = requestBody.get("type");
		String sql_query = "select distinct(pd.prod_name) from product_details pd JOIN company_details c ON pd.c_id=c.c_id JOIN product_category pc ON pd.pc_id=pc.pc_id JOIN product_type pt ON pt.pt_id=pd.pt_id WHERE c.company_name='"+companyName+"' AND pc.product_catg='"+category+"' AND pt.type_name='"+type+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductDetailsVending", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductDetailsVending(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String category = requestBody.get("category");
		String type = requestBody.get("type");
		String sql_query = "select distinct(A.PROD_NAME) from (select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID) as A WHERE A.COMPANY_NAME='"+companyName+"' AND A.PRODUCT_CATG='"+category+"' AND A.TYPE_NAME='"+type+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getRetailerList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getRetailerList() throws SQLException, IOException {

		String sql_query = "select CONCAT(retailer_name,', ',retailer_address) from retailer_details";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductCategoryList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductCategoryList() throws SQLException, IOException {

		String sql_query = "select distinct(product_catg) from product_category";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getCityList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getCityList() throws SQLException, IOException {

		String sql_query = "select distinct(city) from city_list";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getMyInventory", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMyInventory() throws SQLException, IOException, ClassNotFoundException {
		
		String columns = "Sl No,COMPANY,CATEGORY,TYPE,PRODUCT,RETAILER NAME,RETAILER ADDRESS,UNIT,DATE OF PURCHASE,MFG DATE,EXPIRY DATE,QTY REMAINING,BATCH";
		String sql_query = "select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID";
		String tableData = mssqlConnect.fetchTableValues(columns,sql_query);
		return new ResponseEntity<String>("{\"message\":\"" + tableData + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getBatchListVending", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getBatchListVending(@RequestBody Map<String, String> requestBody) throws SQLException{

		String companyName = requestBody.get("companyName");
		String category = requestBody.get("category");
		String type = requestBody.get("type");
		String prodDet = requestBody.get("prodDet");
		String sql_query = "select distinct(A.BATCH_ID) from (select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.QTY_REMAINING,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID) as A WHERE A.COMPANY_NAME='"+companyName+"' AND A.PRODUCT_CATG='"+category+"' AND A.TYPE_NAME='"+type+"' AND A.PROD_NAME='"+prodDet+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addCompany", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addCompany(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String companyName = requestBody.get("companyName");
		String verifyQuery = "SELECT DISTINCT COMPANY_NAME FROM COMPANY_DETAILS WHERE COMPANY_NAME='"+companyName+"'";
		String dataAddQuery = "INSERT INTO COMPANY_DETAILS VALUES ((SELECT COUNT(*)+1 FROM COMPANY_DETAILS),'"+companyName+"','')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addCategory", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addCategory(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String category = requestBody.get("category");
		String verifyQuery = "SELECT DISTINCT PRODUCT_CATG FROM PRODUCT_CATEGORY WHERE PRODUCT_CATG='"+category+"'";
		String dataAddQuery = "INSERT INTO PRODUCT_CATEGORY VALUES ((SELECT COUNT(*)+1 FROM PRODUCT_CATEGORY),'"+category+"','')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addProductType", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addProductType(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String category = requestBody.get("category");
		String type = requestBody.get("type");
		String verifyQuery = "SELECT DISTINCT PT.TYPE_NAME FROM PRODUCT_TYPE PT JOIN PRODUCT_CATEGORY PC ON PC.PC_ID=PT.PC_ID WHERE PC.PRODUCT_CATG='"+category+"' AND PT.type_name='"+type+"'";
		String dataAddQuery = "INSERT INTO PRODUCT_TYPE VALUES ((SELECT COUNT(*)+1 FROM PRODUCT_TYPE),(SELECT PC_ID FROM PRODUCT_CATEGORY WHERE PRODUCT_CATG='"+category+"'),'"+type+"')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getProductTypeByCategory", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getProductTypeByCategory(@RequestBody Map<String, String> requestBody) throws SQLException{

		String category = requestBody.get("category");
		String sql_query = "SELECT PT.TYPE_NAME FROM PRODUCT_TYPE PT JOIN PRODUCT_CATEGORY PC ON PC.PC_ID=PT.PC_ID WHERE PC.PRODUCT_CATG='"+category+"'";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addRetailer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addRetailer(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String retailer = requestBody.get("retailer");
		String city = requestBody.get("city");
		String address = requestBody.get("address");
		String verifyQuery = "SELECT DISTINCT RD.RETAILER_NAME FROM RETAILER_DETAILS RD JOIN CITY_LIST CL ON RD.CITY_ID=CL.CITY_ID WHERE RD.RETAILER_NAME='"+retailer+"' AND CL.CITY='"+city+"'";
		String dataAddQuery = "INSERT INTO RETAILER_DETAILS VALUES ((SELECT COUNT(*)+1 FROM RETAILER_DETAILS),(SELECT CITY_ID FROM CITY_LIST WHERE CITY='"+city+"'),'"+retailer+"','"+address+"')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addCity", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addCity(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String city = requestBody.get("city");
		String verifyQuery = "SELECT DISTINCT CITY FROM CITY_LIST WHERE CITY='"+city+"'";
		String dataAddQuery = "INSERT INTO CITY_LIST VALUES ((SELECT COUNT(*)+1 FROM CITY_LIST),'"+city+"')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addProductDetail", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addProductDetail(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{

		String company = requestBody.get("company");
		String category = requestBody.get("category");
		String type = requestBody.get("type");
		String detail = requestBody.get("detail");
		String unit = requestBody.get("unit");
		String verifyQuery = "SELECT PD.PROD_NAME FROM PRODUCT_DETAILS PD JOIN PRODUCT_CATEGORY PC ON PC.PC_ID=PD.PC_ID JOIN PRODUCT_TYPE PT ON PT.PT_ID=PD.PT_ID JOIN COMPANY_DETAILS CD ON CD.C_ID=PD.C_ID WHERE CD.COMPANY_NAME='"+company+"' AND PC.PRODUCT_CATG='"+category+"' AND PT.TYPE_NAME='"+type+"' AND PD.PROD_NAME='"+detail+"'";
		String dataAddQuery = "INSERT INTO PRODUCT_DETAILS VALUES ((SELECT COUNT(*)+1 FROM PRODUCT_DETAILS),(SELECT PC_ID FROM PRODUCT_CATEGORY WHERE PRODUCT_CATG='"+category+"'),(SELECT PT.PT_ID FROM PRODUCT_TYPE PT JOIN PRODUCT_CATEGORY PC ON PC.PC_ID=PT.PC_ID WHERE PT.TYPE_NAME='"+type+"'),(SELECT C_ID FROM COMPANY_DETAILS WHERE COMPANY_NAME='"+company+"'),'"+detail+"',(SELECT U_ID FROM UNIT WHERE UNIT='"+unit+"'))";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getUnitList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getUnitList() throws SQLException, IOException {

		String sql_query = "select distinct(unit) from unit";
		List<String> dbName = mssqlConnect.fetchDropdownValues(sql_query);
		return new ResponseEntity<List<String>>(dbName, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addItemToStore", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addItemToStore(@RequestBody Map<String, String> requestBody) throws SQLException, ClassNotFoundException{
		
		String company = requestBody.get("company");
		String type = requestBody.get("type");
		String category = requestBody.get("category");
		String detail = requestBody.get("detail");
		String retailer = requestBody.get("retailer");
		String unit = requestBody.get("unit");
		String quantity = requestBody.get("quantity");
		String dop = requestBody.get("dop");
		String domfg = requestBody.get("domfg");
		String doexp = requestBody.get("doexp");
		String ppunit = requestBody.get("ppunit");
		String purprice = requestBody.get("purprice");
		String batch = requestBody.get("batch");
		String ret_Name = retailer.substring(0,retailer.indexOf(", "));
		String ret_Addr = retailer.substring(retailer.indexOf(", ")+1,retailer.length());
		ret_Addr = ret_Addr.trim();	
		
		System.out.println(ret_Name+"\n"+ret_Addr);
		
		String verifyQuery = "select F.F_ID,C.COMPANY_NAME,PC.PRODUCT_CATG,PT.TYPE_NAME,PD.PROD_NAME,R.retailer_name,R.retailer_address,U.UNIT,F.DATE_OF_PURCHASE,F.MFG_DATE,F.EXP_DATE,F.BATCH_ID from FACT_INVENTORY1 F JOIN company_details C ON C.c_id=F.C_ID JOIN product_category PC ON PC.pc_id=F.PC_ID JOIN product_type PT ON PT.pt_id=F.PT_ID JOIN product_details PD ON PD.pd_id=F.PD_ID JOIN retailer_details R ON R.r_id=F.R_ID JOIN unit U ON U.u_id=F.U_ID WHERE c.company_name='"+company+"' AND PC.product_catg='"+category+"' AND PT.type_name='"+type+"' AND PD.prod_name='"+detail+"' AND R.retailer_name='"+ret_Name+"' AND R.retailer_address='"+ret_Addr+"' AND U.unit='"+unit+"' AND F.DATE_OF_PURCHASE='"+dop+"' AND F.MFG_DATE='"+domfg+"' AND F.EXP_DATE='"+doexp+"' AND F.BATCH_ID='"+batch+"'";
		String dataAddQuery = "INSERT INTO FACT_INVENTORY1 values((select count(*)+1 from FACT_INVENTORY1),(select c_id from company_details where company_name='"+company+"'),(select pc_id from product_category where product_catg='"+category+"'),(select pt.pt_id from product_type pt JOIN product_category pc ON pc.pc_id=pt.pc_id where pc.product_catg='"+category+"' AND pt.type_name='"+type+"'),(select pd.pd_id from product_details pd JOIN company_details c ON c.c_id=pd.c_id JOIN product_category pc on pc.pc_id=pd.pc_id JOIN product_type pt ON pt.pt_id=pd.pt_id where c.company_name='"+company+"' AND pc.product_catg='"+category+"' AND pt.type_name='"+type+"' AND pd.prod_name='"+detail+"'),(select r_id from retailer_details where retailer_name='"+ret_Name+"' AND retailer_address='"+ret_Addr+"'),(select u_id from unit where unit='"+unit+"'),'"+quantity+"','"+quantity+"','"+dop+"','"+domfg+"','"+doexp+"','"+ppunit+"','"+purprice+"','"+batch+"')";
		String result = mssqlConnect.verifyAndAddValues(verifyQuery,dataAddQuery);
		return new ResponseEntity<String>("{\"message\":\"" + result + "\"}", HttpStatus.OK);
	}

}
