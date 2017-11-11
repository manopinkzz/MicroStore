package com.microstore.application;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class mssqlConnect {
	
	static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	static String connectionString ="jdbc:sqlserver://localhost:1433;DatabaseName=CODMWF";
	static String user = "sa";
	static String password = "Password123";
	
	public static List<String> fetchDropdownValues(String sql) throws SQLException
	{
		List<String> dropDownValues = new ArrayList<String>();
		try {
			Class.forName(className);
			Connection con = DriverManager.getConnection(connectionString,user,password);
			Statement stmt = con.createStatement();
			ResultSet res = stmt.executeQuery(sql);
			while(res.next()) {
				dropDownValues.add(res.getString(1));
			}
			
			return dropDownValues;
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dropDownValues.add(e.toString());
			return dropDownValues;
		}
	}
	
	public static String fetchTableValues(String columns, String sql) throws SQLException, ClassNotFoundException
	{
		String tableData = "<thead>"+
						   "<tr>";
		String[] abc = columns.split(",");
		for(String a:abc)
			tableData = tableData + "<th>" + a + "</th>";
		tableData = tableData + "</tr>"+
								"</thead>"+ 
								"<tbody>";
		Class.forName(className);
		Connection con = DriverManager.getConnection(connectionString,user,password);
		Statement stmt = con.createStatement();
		ResultSet res = stmt.executeQuery(sql);
		int colCount= res.getMetaData().getColumnCount();
		int xx=0;
		while(res.next()) {
			tableData = tableData + "<tr>";
			tableData = tableData + "<td>" + (++xx) + "</td>";
			for(int i=1;i<=colCount;i++)
				tableData = tableData + "<td>" + res.getString(i) + "</td>";
			tableData = tableData + "</tr>";
		}
		tableData = tableData + "</tbody>";
		return tableData;
	}
	
	public static String verifyAndAddValues(String verifyQuery, String dataAddQuery) throws SQLException, ClassNotFoundException
	{
		Class.forName(className);
		Connection con = DriverManager.getConnection(connectionString,user,password);
		Statement stmt = con.createStatement();
		ResultSet res = stmt.executeQuery(verifyQuery);
		String sval = "Data Doesn't Exist";
		while(res.next()) {
			if(res.getString(1).equals(""))
			{
				sval="success";
				break;
			}
			else
			{
				sval="already exists";
				break;
			}
		}
		if(sval.equals("Data Doesn't Exist"))
		{
			try {
				stmt.executeUpdate(dataAddQuery);
				sval="success";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				sval="Error : "+e.toString();
			}
		}
		return sval;
	}
	
	public static String getSingleValue(String verifyQuery) throws SQLException, ClassNotFoundException
	{
		Class.forName(className);
		Connection con = DriverManager.getConnection(connectionString,user,password);
		Statement stmt = con.createStatement();
		ResultSet res = stmt.executeQuery(verifyQuery);
		String value = "";
		while(res.next()) 
		{
			value = res.getString(1)+","+res.getString(2);
			System.out.println(value);
		}
		return value;
	}

	
}
