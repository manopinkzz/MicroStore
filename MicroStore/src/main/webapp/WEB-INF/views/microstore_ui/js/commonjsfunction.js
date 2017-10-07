function getProject(comboId){
	$(comboId).html('');
	var urole = $('#user_role').val();
	var userProj = $('#user_project').val();
	if(typeof urole !== "undefined" && typeof userProj !== "undefined"){
	if(urole == "Admin"){
	$('#spinLoad').show();
	$.ajax({
		type: 'get',
		url: localUrl+'getDataBases',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';				
				$(comboId).append(optionDB);
			});
			if(comboId == '#csvProjectCombo')
				getFiles('#csvProjectCombo','#csvFileCombo');
			else if(comboId == '#xmlProjectCombo')
				getXmlFiles('#xmlProjectCombo');
			else if(comboId == '#testProjectCombo')
				getTestName('#testProjectCombo');
			else if(comboId == '#joinProject'){
				getJoinFiles('#joinProject');
				$("#list2").html('');
			}else if(comboId == '#unionProject'){
				getFiles('#unionProject','#list3');
				$("#list4").html('');
			}else if(comboId == '#customProject'){
				getFiles('#customProject','#customFile');
			}else if(comboId == '#histPro'){
				fetchTestName('#histPro','#histTest');
			}else if(comboId == '#tsProject'){
				 batchnames('#tsProject','#tsBatchName','#tsBatchDate','#tsBatchTime','#tsBatchOrder')
			}else if(comboId == '#batproject'){
				loadFiles1();
				//batchnames1();
			}else if(comboId == '#projectFile'){
				$("#projectFile").select2({
	 				placeholder: "Select an option",
					  width: "250px"
					});	 		
			}
			$('#spinLoad').hide();
			
		},//async: false,
 		
		error: function(){$('#spinLoad').hide();}
	});
	}
	else{
		splitProj = userProj.split(",");
				
		if(splitProj.length > 1){
			splitProj = userProj.split(",");
			$(splitProj).each(function(){
				var optionDB = '<option>'+this+'</option>';				
				$(comboId).append(optionDB);
			});			
			
		}else{
			var optionDB = '<option>'+userProj+'</option>';				
			$(comboId).append(optionDB);			
		}
		
		if(comboId == '#csvProjectCombo')
			getFiles('#csvProjectCombo','#csvFileCombo');
		else if(comboId == '#xmlProjectCombo')
			getXmlFiles('#xmlProjectCombo');
		else if(comboId == '#testProjectCombo')
			getTestName('#testProjectCombo');
		else if(comboId == '#joinProject'){
			getJoinFiles('#joinProject');
			$("#list2").html('');
		}else if(comboId == '#unionProject'){
			getFiles('#unionProject','#list3');
			$("#list4").html('');
		}else if(comboId == '#customProject'){
			getFiles('#customProject','#customFile');
		}else if(comboId == '#histPro'){
		fetchTestName('#histPro','#histTest');
		}else if(comboId == '#tsProject'){
			 batchnames('#tsProject','#tsBatchName','#tsBatchDate','#tsBatchTime','#tsBatchOrder')
		}else if(comboId == '#batproject'){
			loadFiles1();
			//batchnames1();
		}
	}
	
	}else{
		window.location.replace(localUrl);
	}
	updateButtons();
}
function getFiles(comboId,fileId) {
	$(fileId).html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getFileList',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$(fileId).append(optionDB);
			});
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}
function getJoinFiles(comboId) {
	$("#joinFile1").html('');
	$("#joinFile2").html('');
	$("#joinFile3").html('');
	$("#joinFile4").html('');
	$("#joinFile5").html('');
	$("#joinFile6").html('');
	$("#joinFile7").html('');
	$("#joinFile8").html('');
	$("#joinFile9").html('');
	$("#joinFile10").html('');	
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getFileList',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$("#joinFile1").append(optionDB);
				$("#joinFile2").append(optionDB);
				$("#joinFile3").append(optionDB);
				$("#joinFile4").append(optionDB);
				$("#joinFile5").append(optionDB);
				$("#joinFile6").append(optionDB);
				$("#joinFile7").append(optionDB);
				$("#joinFile8").append(optionDB);
				$("#joinFile9").append(optionDB);
				$("#joinFile10").append(optionDB);
			});
			getScrCol('#joinFile1',comboId,'#Keys1','Keys1');
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}
function getXmlFiles(comboId) {
	$("#xmlFileCombo").html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getFileList',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$("#xmlFileCombo").append(optionDB);
			});
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}
	
function getTestName(comboId,comboId2,comboId3,comboId4) {
	$(comboId2).html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getTestNames',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$(comboId2).append(optionDB);
			});
			getTestDate(comboId,comboId2,comboId3,comboId4);
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}
function getTestDate(comboId,comboId2,comboId3,comboId4) {
	$(comboId3).html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getTestDates',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val(),'testName' : $(comboId2).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$(comboId3).append(optionDB);				
			});
			getTestTime(comboId,comboId2,comboId3,comboId4);
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
}
function getTestTime(comboId,comboId2,comboId3,comboId4) {
	$(comboId4).html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getTestTimes',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(comboId).val(),'testName' : $(comboId2).val(),'testDate' : $(comboId3).val()}),
		success: function(response){
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$(comboId4).append(optionDB);
			});
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
}
function delProject(){
	
	bootbox.confirm({
	    
	    message: "Do you want to delete the Selected project?",
	    buttons: {
	        cancel: {
	            label: '<i class="fa fa-times"></i> Cancel'
	        },
	        confirm: {
	            label: '<i class="fa fa-check"></i> Confirm'
	        }
	    },
	    callback: function (result) {
	    	
	    	if(result)
	    	{
	    		$('#spinLoad').show();
	    		$.ajax({
		    		type: 'post',
		    		url: localUrl+'deleteProject',
		    		contentType: "application/json; charset=utf-8",
		    		data: JSON.stringify({'projectName' : $('#del_project_projectList').val()}),
		    		success: function(response){
		    			$('#spinLoad').hide();
		    			console.log(response);
		    			if(response.message == "success"){
		    				console.log("inside jumbo_manager.html");
		    				bootbox.alert("Project deleted successfully");
		    			}
		    			else{
		    				bootbox.alert("Failed to delete the Project");
		    			}
		    			getProjectCount();
		    			getProject("#pro_list_files"); 
		    	  		getProject("#del_project_projectList");
		    	  		getProject("#del_fileDB_projectList");
		    	  		getProject("#del_test_projectList");
		    	  		getProject("#del_batch_projectList");	
		    	  		
		    	  		updateGraph();
		    	  		
		    		},
		    		error: function(response){bootbox.alert("Unexpected Error!!");$('#spinLoad').hide();}
		    	});
	    	}
	    }
	});
}
function delCsvFiles()
{	
	if($('#del_fileDB_fileList').val() == "--No File Names Available--")
	{
		bootbox.alert("No File names available in the selected project");
	}
	else
	{
	bootbox.confirm({
	    
	    message: "Do you want to remove the Selected File/DB Connection from the selected project?",
	    buttons: {
	        cancel: {
	            label: '<i class="fa fa-times"></i> Cancel'
	        },
	        confirm: {
	            label: '<i class="fa fa-check"></i> Confirm'
	        }
	    },
	    callback: function (result) {
	    	
	    	if(result)
	    	{
	    		$('#spinLoad').show();
	    		$.ajax({
	    			type: 'post',
	    			url: localUrl+'deleteFiles',
	    			contentType: "application/json; charset=utf-8",
	    			data: JSON.stringify({'projectName' : $('#del_fileDB_projectList').val(),'fileName' : $('#del_fileDB_fileList').val()}),
	    			success: function(response){
	    				$('#spinLoad').hide();
	    				console.log(response);
	    				if(response.message == "success"){
	    					bootbox.alert("File/DB Connection removed from project successfully");
	    				}
	    				else{
	    					bootbox.alert(response.message);
	    				}
	    				getFilesForDeleting("#del_fileDB_fileList");	
	    			},
	    			error: function(response){
	    				$('#spinLoad').hide();
	    			}
	    		});
	    	}
	    }
	});
	}
}
function delTestName(){

	if($('#testCombo').val() == "--No Test Names Available--")
	{
		bootbox.alert("No Test names available in the selected project");
	}
	else
	{
		bootbox.confirm({
		    
		    message: "Do you want to remove the Selected Test from the project?",
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Confirm'
		        }
		    },
		    callback: function (result) {
		    	
		    	if(result)
		    	{
		    		$('#spinLoad').show();
		    		$.ajax({
		    			type: 'post',
		    			url: localUrl+'deleteTest',
		    			contentType: "application/json; charset=utf-8",
		    			data: JSON.stringify({'projectName' : $('#del_test_projectList').val(),'testName' : $('#testCombo').val(),'testCreationDateNTime' : $('#testCreationDateandTimeCombo').val(),'testExecutionDateNTime' : $('#testExecutionDateandTimeCombo').val()}),
		    			success: function(response){
		    				$('#spinLoad').hide();
		    				console.log(response);
		    				if(response.message == "success"){
		    					bootbox.alert("Test name deleted successfully");
		    				}
		    				else{
		    					bootbox.alert("Failed to delete the Test name.");
		    				}
		    				getTestName('#del_test_projectList','#testCombo','#testCreationDateandTimeCombo','#testExecutionDateandTimeCombo');
		    			},
		    			error: function(response){
		    				$('#spinLoad').hide();
		    			}
		    		});
		    	}
		    }
		});
	}
}
function testValidate(){
	var prjName = $('#comProject').val();
	var testName = $('#testname').val();
	//alert($('#testname').val());
	if(testName == ''){
		bootbox.alert('Enter the test name ');
		$('#testname').focus();	
	}else if (testName.substr(0,1) == "_") {
		   // do this if begins with _ (UnderScore)
		bootbox.alert('Test Name cannot start with "_" ');
		$('#testname').focus();		
		}else if(/^[0-9]*$/.test(testName) == true) {
			bootbox.alert('Test Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#testname').focus();
		}else if(/^[a-zA-Z0-9_]*$/.test(testName) == false) {
			bootbox.alert('Test Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#testname').focus();
		}else{			
			
			window.location.replace('/jumbo/views/JUMBO_HTML_UI/theme-quasar/new_run.html?projectName='+prjName+'&testName='+testName);
			
		}
}
function getParams() {
    var idx = document.URL.indexOf('?');
    var params = {};
    if (idx != -1) {
        var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
        for (var i = 0; i < pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    return params;
}
function getUserProject(){
	params = getParams();
	//alert("	params.length   :  "+	params.length);
	prjName = unescape(params["UserProject"]);
	$('#user_project').val(prjName);
	//alert($('#user_project').val());
	$("#jumboHref").attr("href","jumbo_manager.html?UserProject="+prjName);
    $("#comparisonHref").attr("href","comparison_tool.html?UserProject="+prjName);
    $("#fileCustHref").attr("href","file_customizer.html?UserProject="+prjName);
}

function ParamValue(pName){
	$( "#spinNT" ).spinner();
	if(typeof pName ==  'undefined'){
	$("#projectFile").select2("val", "");
	$("#souceFile").select2("val", "");
	$("#targetFile").select2("val", "");
	$("#testName").val("");
	$("#jTable > tbody").empty();
	/*$("#dupKeys").prop('checked', true);
	$("#dupRecs").prop('checked', true);
	$("#uniKeys").prop('checked', true);
	$("#uniRecs").prop('checked', true);
	$("#matRecs").prop('checked', true);
	$("#orpRecs").prop('checked', true);
	$("#misRecs").prop('checked', true);*/
	getProjects();	
	}
	params = getParams();
	//prjName = unescape(params["projectName"]);
	prjName = pName;
	//tstName = unescape(params["testName"]);
	//alert("ProjectName : "+prjName+" TestName : "+tstName);
	$('#hidPrjName').val(prjName);
	//$('#hidTestName').val(tstName);
	$("#projectFile").select2("val", prjName);
	//alert("hidPrjName : "+$('#hidPrjName').val()+" hidTestName : "+$('#hidTestName').val());
	$("#souceFile").html('');
	$("#targetFile").html('');
	var val = $('#hidPrjName').val();
	if(val == "undefined"){
		$('#jTable').hide();
	}
	//alert("hidden prj name : "+$('#hidPrjName').val());
	//getFiles('#hidPrjName');
	if($('#hidPrjName').val() !=""){
		$( "#spinNT" ).show();
		
		$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getFileList',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $('#hidPrjName').val()}),
		success: function(response){
			$('#spinLoad').hide();
			$( "#spinNT" ).hide();
			//alert(response);
			$(response).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$("#souceFile").append(optionDB);
				$("#targetFile").append(optionDB);
			});
			//getScrCol('#souceFile','#hidPrjName','#scrCol','');
			getScrTbl('#souceFile','#hidPrjName','',1);
			//getTgtCol('#targetFile','#hidPrjName','#tgtCol','');
			//getScrTgtCol('#souceFile');
		},
		error: function(){$('#spinLoad').hide();console.log("Unable to fetch");}
	});	
	}
}
function getProjects(){	
	var urole = $('#user_role').val();
	var userProj = $('#user_project').val();
	$("#projectFile").text('');
	if(urole == "Admin"){
		$('#spinLoad').show();
	 $.ajax({
	 		type: 'get',
	 		url: localUrl+'getDataBases',
	 		contentType: "application/json; charset=utf-8",
	 		dataType: "json",
	 		data: '',
	 		success: function(response){
	 			/*var str = response+'';
	 			var files = str.split(',');
	 			var optionDB = '';
	 			for(var i = 0; i < files.length; i++) {
	 				optionDB += '<option>'+files[i]+'</option>';	
	 			}*/
	 			$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';				
					$("#projectFile").append(optionDB);
				});
	 			
	 			$("#projectFile").select2({
	 				placeholder: "Select an option",
					  width: "250px"
					});
	 			$('#spinLoad').hide();
	 		},async: false,
	 		error: function(){alert("error");$('#spinLoad').hide();}
	 	});
	}else{
		splitProj = userProj.split(",");
				
		if(splitProj.length > 1){
			splitProj = userProj.split(",");
			$(splitProj).each(function(){
				var optionDB = '<option>'+this+'</option>';				
				$("#projectFile").append(optionDB);
			});			
			$("#projectFile").select2({
 				placeholder: "Select an option",
				  width: "250px"
				});
		}else{
			var optionDB = '<option>'+userProj+'</option>';				
			$("#projectFile").append(optionDB);
			$("#projectFile").select2({
 				placeholder: "Select an option",
				  width: "250px"
				});
		}
	}
}


function getDatabaseConnections(){
	 $("#connectionNames").html('');
	 $("#del_ConnectionNameList").html('');
	 $('#spinLoad').show();
	 $.ajax({
	 		type: 'get',
	 		url: localUrl+'getDatabaseConnections',
	 		contentType: "application/json; charset=utf-8",
	 		dataType: "json",
	 		data: '',
	 		success: function(response){
	 			var str = response+'';
	 			var files = str.split(',');
	 			var optionDB = '';
	 			for(var i = 0; i < files.length; i++) {
	 				optionDB += '<option>'+files[i]+'</option>';	
	 			}
	 			$("#connectionNames").append(optionDB);
	 			$("#del_ConnectionNameList").append(optionDB);
	 			$('#spinLoad').hide();
	 		},async: false,
	 		error: function(){alert("error");$('#spinLoad').hide();}
	 	});
}



function getScrCol(comboId,projId,colsId,fieldId){
	console.log("inside getScrCol"+comboId+" projId"+projId+" colsId"+colsId+" fieldId"+fieldId);
	$(colsId).html('');
	var prjName = $( "#projectFile option:selected" ).text();
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getSrcTgtFile',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : prjName,'fileName' : $(comboId).val(),'keyName' : fieldId}),
		success: function(response){
			//alert(response.colsList+"   ,    "+response.filePath);
			$(response.colsList).each(function(){
				var optionDB = '<option>'+this+'</option>';
				$(colsId).append(optionDB);				
			});
			if(projId == '#hidPrjName')
			$("#hidSrcPath").val(response.filePath);
			/*if(colsId == '#columns_rules')
				appendSrcTgtRules();
			if(colsId == '#columns_filters')
				appendSrcTgtFilters();*/
			
			if(colsId == '#scrCol')
				getTgtCol('#targetFile','#hidPrjName','#tgtCol','');
			else if(comboId == '#joinFile1')
				getTgtCol('#joinFile2',projId,'#Keys2','Keys2');
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}



function getTgtCol(comboId,projId,colsId,fieldId){
	$(colsId).html('');
	$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'getSrcTgtFile',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'projectName' : $(projId).val(),'fileName' : $(comboId).val(),'keyName' : fieldId}),
		success: function(response){
			//alert(response.colsList+"   ,    "+response.filePath);
			$(response.colsList).each(function(){
				var optionDB = '<option>'+this+'</option>';
				//$("#scrCol").append(optionDB);
				$(colsId).append(optionDB);				
			});		
			if(projId == '#hidPrjName')
			$("#hidTgtPath").val(response.filePath);
			if(colsId == '#columns_rules')
				appendSrcTgtRules();
			if(colsId == '#columns_filters')
				appendSrcTgtFilters();
			if($("#file3").is(':visible')){
				$("#joinKey3").html('');
				$('#file3').show();
				getScrCol('#joinFile3','#joinProject','#Keys3','Keys3');
				
				$('#Keys1 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey3").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys2 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey3").append(optionDB);			
				});
				
			}
			if($("#file4").is(':visible')){
				$("#joinKey4").html('');
				$('#file4').show();
				getScrCol('#joinFile4','#joinProject','#Keys4','Keys4');
				
				$('#joinKey3 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey4").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys3 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey4").append(optionDB);			
				});
				
			}
			if($("#file5").is(':visible')){
				$("#joinKey5").html('');
				$('#file5').show();
				getScrCol('#joinFile5','#joinProject','#Keys5','Keys5');
				
				$('#joinKey4 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey5").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys4 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey5").append(optionDB);			
				});
				
			}
			if($("#file6").is(':visible')){
				$("#joinKey6").html('');
				$('#file6').show();
				getScrCol('#joinFile6','#joinProject','#Keys6','Keys6');
				
				$('#joinKey5 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey6").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys5 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey6").append(optionDB);			
				});
			}
			if($("#file7").is(':visible')){
				$("#joinKey7").html('');
				$('#file7').show();
				getScrCol('#joinFile7','#joinProject','#Keys7','Keys7');
				
				$('#joinKey6 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey7").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys6 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey7").append(optionDB);			
				});		
			}
			if($("#file8").is(':visible')){
				$("#joinKey8").html('');
				$('#file8').show();
				getScrCol('#joinFile8','#joinProject','#Keys8','Keys8');
				
				$('#joinKey7 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey8").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys7 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey8").append(optionDB);			
				});
			}
			if($("#file9").is(':visible')){
				$("#joinKey9").html('');
				$('#file9').show();
				getScrCol('#joinFile9','#joinProject','#Keys9','Keys9');
				
				$('#joinKey8 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey9").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys8 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey9").append(optionDB);			
				});
			}
			if($("#file10").is(':visible')){
				$("#joinKey10").html('');		
				$('#file10').show();
				getScrCol('#joinFile10','#joinProject','#Keys10','Keys10');
				
				$('#joinKey9 option').each(function() {
					 var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey10").append(optionDB); 
				});
				//alert($("#joinKey3").text);
				$('#Keys9 option').each(function() {
					var optionDB = '<option>'+$(this).text()+'</option>';
					$("#joinKey10").append(optionDB);			
				});		
			}
			$('#spinLoad').hide();
		},
		error: function(){$('#spinLoad').hide();}
	});
	
}

//var srcTotalVal = [];
//var tgtTotalVal = [];

//Global access for source column and target column list.
/*var srcTotalCol = [];
var tgtTotalCol = [];*/
// Global access ended.
function addRight(){
		
	var optionCheck = '';
	$( "#list1 option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#list2").append(optionCheck);
			else
			$("#list2").html('');
});
	$( "#list1 option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){
		/*$( "#list1 option" ).each(function() {
			optionCheck = '<option>'+$(this).text()+'</option>';
			$("#list2").append(optionCheck);*/
		bootbox.alert("Select atlest one value");
	//});	
		//$("#list1").html('');
	}
	// sorting ascending order
	$("#list2").html($('#list2 option').sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#list2").get(0).selectedIndex = 0;
 // e.preventDefault();
  // end sorting.
}

function addLeft(){
	
	var optionCheck = '';
	$( "#list2 option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#list1").append(optionCheck);
			else
			$("#list1").html('');
});
	$( "#list2 option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){
		/*$( "#list2 option" ).each(function() {
			optionCheck = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionCheck);*/	
		bootbox.alert("Select atlest one value");
	//});	
		//$("#list2").html('');
	}
	// sorting ascending order
	$("#list1").html($('#list1 option').sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#list2").get(0).selectedIndex = 0;
  //e.preventDefault();
  // end sorting.
}

function addTestRight(batchFileList,filesselected){
	//$("#"+filesselected).html('');
	var optionCheck = '';
	$( "#"+batchFileList+" option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		//if($("#fileorder option:selected").val() !="--No Test Names Available--"))
		//alert("this.text()   :  "+this.text());
		//alert("$(this).text()   :  "+$(this).text());
		if($(this).text() != '--No Test Names Available--')
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#"+filesselected).append(optionCheck);
			else
			$("#"+filesselected).html('');
});
	if($("#"+batchFileList+" option").val() !="--No Test Names Available--")
	$( "#"+batchFileList+" option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){
		$( "#"+batchFileList+" option" ).each(function() {
			//alert("this.text() inside 0  :  "+this.text());
			//alert("$(this).text()   :  "+$(this).text());
			if($(this).text() != '--No Test Names Available--'){
			var optionCheck = '<option>'+$(this).text()+'</option>';
			if(optionCheck.length > 0)
			$("#"+filesselected).append(optionCheck);		
			}
	});	
		//alert($("#"+batchFileList+" option").val());
		if($("#"+batchFileList+" option").val() !="--No Test Names Available--")
		$("#"+batchFileList).html('');
	}
	// sorting ascending order
	$("#"+filesselected).html($("#"+filesselected+" option").sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#batchFileList, #filesselected").dragOptions({highlight: '-> '});
 // $("#list2").get(0).selectedIndex = 0;
 // e.preventDefault();
  // end sorting.
}

function addTestLeft(batchFileList,filesselected){
	
	var optionCheck = '';
	$( "#"+filesselected+" option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		if($(this).text() != '--No Test Names Available--')
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#"+batchFileList).append(optionCheck);
			else
			$("#"+batchFileList).html('');
});
	$( "#"+filesselected+" option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){
		$( "#"+filesselected+" option" ).each(function() {
			if($(this).text() != '--No Test Names Available--'){
			var optionCheck = '<option>'+$(this).text()+'</option>';
			if(optionCheck.length > 0)
			$("#"+batchFileList).append(optionCheck);		
			}
	});	
		$("#"+filesselected).html('');
	}
	// sorting ascending order
	$("#"+batchFileList).html($("#"+batchFileList+" option").sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#list2").get(0).selectedIndex = 0;
  //e.preventDefault();
  // end sorting.
}

function srcRemove(){	
	
	var optionCheck = '';
	$( "#srcMap option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		//alert(" srcRemove : "+optionCheck);		
});
	if(optionCheck.length > 0)
		$( "#srcMap option:selected" ).remove();
		else
			bootbox.alert("Please select column(s) to remove.");
}
/*function tgtRemove(){	
	var optionCheck = '';
	$( "#tgtMap option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		//alert(" tgtRemove : "+optionCheck);		
});
	if(optionCheck.length > 0)
		$( "#tgtMap option:selected" ).remove();
		else
			bootbox.alert("Please select column(s) to remove.");
}*/

function tgtRemove(){
	var optionCheck = '';
	$( "input.chkbox" ).each(function(index,element) {
		if(element.checked){
			$("#tr_"+(index+1)).remove();
		}
});
	if(optionCheck.length > 0)
		$( "#tgtMap option:selected" ).remove();
		else
			bootbox.alert("Please select column(s) to remove.");
}

function srcRefresh(){
	$("#srcMap").html('');
							
		$( "#scrCol option:not(:selected)" ).each(function() {
				var optionDB = '<option>'+$(this).text()+'</option>';
				//alert("optionDB : "+optionDB);
				$("#srcMap").append(optionDB);		
		});		
		
}
function tgtRefresh(){
	$("#tgtMap").html('');
	$("#chkbox_all").prop('checked',false);	
	 $(".chkbox").prop('checked',false);
		/*$( "#tgtCol option:not(:selected)" ).each(function() {							
				var optionDB = '<option>'+$(this).text()+'</option>';
				//alert("optionDB : "+optionDB);
				$("#tgtMap").append(optionDB);									
		});*/
		
}


function addFileRight(){
	$("#list4").html('');
	var optionCheck = '';
	$( "#list3 option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#list4").append(optionCheck);
			else
			$("#list4").html('');
});
	$( "#list3 option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){		
		$( "#list3 option" ).each(function() {
			optionCheck = '<option>'+$(this).text()+'</option>';
			$("#list4").append(optionCheck);		
	});	
		$("#list3").html('');
	}
	// sorting ascending order
	$("#list4").html($('#list4 option').sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#list2").get(0).selectedIndex = 0;
 // e.preventDefault();
  // end sorting.
}

function addFileLeft(){
	
	var optionCheck = '';
	$( "#list4 option:selected" ).each(function() {
		//var length = $('#list2 > option').length;
		optionCheck = '<option>'+$(this).text()+'</option>';
		if(optionCheck.length > 0)
			$("#list3").append(optionCheck);
			else
			$("#list3").html('');
});
	$( "#list4 option:selected" ).remove();
	//alert("optionCheck.length  :  "+optionCheck.length);
	
	if(optionCheck.length == 0){
		$( "#list4 option" ).each(function() {
			optionCheck = '<option>'+$(this).text()+'</option>';
			$("#list3").append(optionCheck);		
	});	
		$("#list4").html('');
	}
	// sorting ascending order
	$("#list3").html($('#list3 option').sort(function(x, y) {
        return $(x).val() < $(y).val() ? -1 : 1;
  }))
 // $("#list2").get(0).selectedIndex = 0;
  //e.preventDefault();
  // end sorting.
}
function generateQuery(){
	var colValue = '';
	var splitStr = ' --> ';
	
	$( "#list2 option" ).each(function() {
		var optionCheck = $(this).text();
		col = optionCheck.split(splitStr);
		if(colValue == '')
			colValue=col[0];
		else 
			colValue=colValue+", "+col[0];				
});
	var removeCol1=$( "#Keys1 option:selected" ).text();
	var removeCol2=$( "#Keys2 option:selected" ).text();
	removeColon1 = removeCol1.split(splitStr);
	removeColon2 = removeCol2.split(splitStr);
	var joinValue = $( "#joinFile1 option:selected" ).text() +" t1 JOIN "+ $( "#joinFile2 option:selected" ).text() +" t2 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	if($("#file3").is(':visible')){
		var removeCol1=$( "#joinKey3 option:selected" ).text();
		var removeCol2=$( "#Keys3 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);	
		joinValue = joinValue+" JOIN "+$( "#joinFile3 option:selected" ).text()+" t3 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}
	if($("#file4").is(':visible')){
		var removeCol1=$( "#joinKey4 option:selected" ).text();
		var removeCol2=$( "#Keys4 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);		
		joinValue = joinValue+" JOIN "+$( "#joinFile4 option:selected" ).text()+" t4 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}	
	if($("#file5").is(':visible')){
		var removeCol1=$( "#joinKey5 option:selected" ).text();
		var removeCol2=$( "#Keys5 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);
		
		joinValue = joinValue+" JOIN "+$( "#joinFile5 option:selected" ).text()+" t5 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}
	if($("#file6").is(':visible')){
		var removeCol1=$( "#joinKey6 option:selected" ).text();
		var removeCol2=$( "#Keys6 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);	
			
		joinValue = joinValue+" JOIN "+$( "#joinFile6 option:selected" ).text()+" t6 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}	
	if($("#file7").is(':visible')){
		var removeCol1=$( "#joinKey7 option:selected" ).text();
		var removeCol2=$( "#Keys7 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);	
			
		joinValue = joinValue+" JOIN "+$( "#joinFile7 option:selected" ).text()+" t7 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}	
	if($("#file8").is(':visible')){
		var removeCol1=$( "#joinKey8 option:selected" ).text();
		var removeCol2=$( "#Keys8 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);	
			
		joinValue = joinValue+" JOIN "+$( "#joinFile8 option:selected" ).text()+" t8 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}	
	if($("#file9").is(':visible')){
		var removeCol1=$( "#joinKey9 option:selected" ).text();
		var removeCol2=$( "#Keys9 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);
			
		joinValue = joinValue+" JOIN "+$( "#joinFile9 option:selected" ).text()+" t9 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}	
	if($("#file10").is(':visible')){
		var removeCol1=$( "#joinKey10 option:selected" ).text();
		var removeCol2=$( "#Keys10 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);	
		
		joinValue = joinValue+" JOIN "+$( "#joinFile10 option:selected" ).text()+" t10 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
	}
	$("#generateQry").val("SELECT "+colValue+" FROM "+joinValue);
	//SELECT "+colValue+" FROM "+joinValue
}
function callResult(){
	$("#spinCD").spinner();
	var prjName = $( "#joinProject option:selected" ).text();
	var queryStr = $("#generateQry").val();
	var tblName = '';
	var joinName = $("#joinFileName").val();
	tblName = $( "#joinFile1 option:selected" ).text();
	tblName = tblName+","+$( "#joinFile2 option:selected" ).text();
	//alert("counter : "+counter);
	if(counter == 1){
		//alert("counter1 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text();
	}else if(counter==2){
		//alert("counter2 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text();
	}else if(counter==3){
		//alert("counter3 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text();
	}else if(counter==4){
		//alert("counter4 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text()+","+$( "#joinFile6 option:selected" ).text();
	}else if(counter==5){
		//alert("counter5 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text()+","+$( "#joinFile6 option:selected" ).text()+","+$( "#joinFile7 option:selected" ).text();
	}else if(counter==6){
		//alert("counter6 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text()+","+$( "#joinFile6 option:selected" ).text()+","+$( "#joinFile7 option:selected" ).text()+","+$( "#joinFile8 option:selected" ).text();
	}else if(counter==7){
		//alert("counter7 : "+counter);	
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text()+","+$( "#joinFile6 option:selected" ).text()+","+$( "#joinFile7 option:selected" ).text()+","+$( "#joinFile8 option:selected" ).text()+","+$( "#joinFile9 option:selected" ).text();
	}else if(counter==8){
		//alert("counter8 : "+counter);
		tblName = tblName+","+$( "#joinFile3 option:selected" ).text()+","+$( "#joinFile4 option:selected" ).text()+","+$( "#joinFile5 option:selected" ).text()+","+$( "#joinFile6 option:selected" ).text()+","+$( "#joinFile7 option:selected" ).text()+","+$( "#joinFile8 option:selected" ).text()+","+$( "#joinFile9 option:selected" ).text()+","+$( "#joinFile10 option:selected" ).text();
	}
	var prjName = $( "#projectFile option:selected" ).text();	
	//alert("Query String : "+queryStr);
	//alert("TblName : "+tblName);
	//alert("joinName : "+joinName);
	if(joinName == ''){
		bootbox.alert('Enter the File name ');
		$('#joinFileName').focus();	
	}else if (joinName.substr(0,1) == "_") {
		   // do this if begins with _ (UnderScore)
		bootbox.alert('File Name cannot start with "_" ');
		$('#joinFileName').focus();		
		}else if(/^[0-9]*$/.test(joinName) == true) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#joinFileName').focus();
		}else if(/^[a-zA-Z0-9_]*$/.test(joinName) == false) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#joinFileName').focus();
		}else if(queryStr == ''){
			bootbox.alert("Generate and verify the query");
			$('#queryStr').focus();
		}
		else{	
			$('#spinLoad').show();
	$.ajax({
		type: 'post',
		url: localUrl+'sparkJoin',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'prjName' : prjName,'queryStr' : queryStr,'tblName' : tblName,'filename' : joinName}),
		success: function(response){
			console.log(response);
			if(response.message == "success"){
				//console.log("inside jumbo_manager.html");
				$('#spinLoad').hide();
				bootbox.alert("Join file created successfully", function(){ $("#joinFileName").val("");$("#generateQry").val("");$("#list1").html('');
				ParamValue(prjName);
				$("#list2").html('');$('#customQueryModal').modal('hide')});
				//$('#csvProjectCombo').val('');
			}
			else{
				bootbox.alert(response.message);
				//$('#csvProjectCombo').focus();
				$('#spinLoad').hide();
			}
		},
		error: function(a,b,c){
			console.log(a,b,c);
			$('#spinLoad').hide();
		}
	});
		}
	
}

function callUnionResult(){
	$('#spinLoad').show();
	var prjName = $( "#unionProject option:selected" ).text();
	var queryStr = '';
	var tblName = '';
	$('#list4 option').each(function() {
		tblName = tblName+$(this).text()+",";		
	});
	//alert("tblName : "+tblName);
	
	var joinName = $("#unionFileName").val();
	//alert("Project Name  : "+prjName);	
	//alert("Query String : "+queryStr);
	//alert("TblName : "+tblName);
	//alert("joinName : "+joinName);
	$.ajax({
		type: 'post',
		url: localUrl+'sparkJoin',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'prjName' : prjName,'queryStr' : queryStr,'tblName' : tblName,'filename' : joinName}),
		success: function(response){
			if(response.message == "success"){
				//console.log("inside jumbo_manager.html");
				bootbox.alert("Union File Created successfully");
				$('#spinLoad').hide();
				//$('#csvProjectCombo').val('');
			}
			else{
				bootbox.alert(response.message);
				//$('#csvProjectCombo').focus();
				$('#spinLoad').hide();
			}
		},
		error: function(){
			bootbox.alert("Unexpected Error, please refer the logs for detailed error");
			$('#spinLoad').hide();}
	});		
	
}

function verifyUnion(){
	$('#spinLoad').show();
	var verifyStr = '';
	var count = 0;
	var prjName = $( "#unionProject option:selected" ).text();
	var unionName = $("#unionFileName").val();
	$('#list4 option').each(function() {
		verifyStr = verifyStr+$(this).text()+",";
		count++;
	});
	//alert("VerifyStr : "+verifyStr);
	if(count > 1){
	if(unionName == ''){
		bootbox.alert('Enter the File name ');
		$('#unionFileName').focus();	
	}else if (unionName.substr(0,1) == "_") {
		   // do this if begins with _ (UnderScore)
		bootbox.alert('File Name cannot start with "_" ');
		$('#unionFileName').focus();		
		}else if(/^[0-9]*$/.test(unionName) == true) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#unionFileName').focus();
		}else if(/^[a-zA-Z0-9_]*$/.test(unionName) == false) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#unionFileName').focus();
		}else{	
	$.ajax({
		type: 'post',
		url: localUrl+'verifyJoin',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify({'prjName' : prjName,'tblName' : verifyStr}),
		success: function(response){
			bootbox.alert(response);
			if(response.message == "success"){
				console.log("inside jumbo_manager.html");
				bootbox.alert("verified successfully");
				//$('#csvProjectCombo').val('');
				$('#spinLoad').hide();
			}
			else{
				bootbox.alert(response.message);
				//$('#csvProjectCombo').focus();
				$('#spinLoad').hide();
			}
			
		},
		error: function(){
			bootbox.alert("Unexpected Error, please refer the logs for detailed error");
			$('#spinLoad').hide();
			
		}
	});
		}
	}else
		bootbox.alert("Minimum two files required for UNION operation");
	
	
}

function callCustomResult(){
	$( "#spinCD" ).spinner();
    var prjName = $("#hidPrjName").val();
    var queryStr = $("#generateCustomQry").val();
    var tblName = $( "#customFile option:selected" ).text();
    var joinName = $('#customuname').val();
    /* alert("Project Name  : "+prjName);    
    alert("Query String : "+queryStr);
    alert("TblName : "+tblName);
    alert("joinName : "+joinName); */
    if(joinName == ''){
		bootbox.alert('Enter the File name ');
		$('#joinFileName').focus();	
	}else if (joinName.substr(0,1) == "_") {
		   // do this if begins with _ (UnderScore)
		bootbox.alert('File Name cannot start with "_" ');
		$('#joinFileName').focus();		
		}else if(/^[0-9]*$/.test(joinName) == true) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#joinFileName').focus();
		}else if(/^[a-zA-Z0-9_]*$/.test(joinName) == false) {
			bootbox.alert('File Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
			$('#joinFileName').focus();
		}else if(queryStr == ''){
			bootbox.alert("Generate and verify the query");
			$('#queryStr').focus();
		}else {
			$('#spinLoad').show();
    $.ajax({
           type: 'post',
           url: localUrl+'sparkJoin',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           data: JSON.stringify({'prjName' : prjName,'queryStr' : queryStr,'tblName' : tblName,'filename' : joinName}),
           success: function(response){
                 if(response.message == "success"){
                        //bootbox.alert("inside jumbo_manager.html");
                	 $('#spinLoad').hide();
                        bootbox.alert("Custom File Created successfully",function(){ $("#customuname").val("");$("#generateCustomQry").val("");$('#customQueryModal').modal('hide')});
                        //$('#csvProjectCombo').val('');
                        
                 }
                 else{
                	 $('#spinLoad').hide();
                        if(response.message.includes("File Already Exist")){
                        	bootbox.alert("File Name Already Exist");
                        }
                         console.log("Failed");
                        //$('#csvProjectCombo').focus();
                 }
           },
           error: function(){$('#spinLoad').hide();bootbox.alert("Unexpected Error!!");}
    });
	}
}

function retrieveQuery(){
	var prjName = $( "#projectFile option:selected" ).text();
	var fileName = $("#customFile option:selected").text();
	$('#spinLoad').show();
	$.ajax({
	       type: 'post',
	       url: localUrl+'retrieveQuery',
	       contentType: "application/json; charset=utf-8",
	       dataType: "json",
	       data: JSON.stringify({'prjName' : prjName,'fileName' : fileName}),
	       success: function(response){
	             //$("#generateCustomQry").html('');
	             $("#generateCustomQry").val(response.message);
	             $('#spinLoad').hide();
	       },
	       error: function(){$('#spinLoad').hide();}
	});    
}

function addColumn(){
	$("#list2").html('');
	if(counter==0)
	{
		$("#list1").html('');
		$('#Keys1 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys2 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});		
		
	}
	else if(counter==1)
	{
		$("#list1").html('');
		$('#joinKey3 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys3 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==2)
	{
		$("#list1").html('');
		$('#joinKey4 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys4 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==3)
	{
		$("#list1").html('');
		$('#joinKey5 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys5 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==4)
	{
		$("#list1").html('');
		$('#joinKey6 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys6 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==5)
	{
		$("#list1").html('');
		$('#joinKey7 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys7 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==6)
	{
		$("#list1").html('');
		$('#joinKey8 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys8 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	else if(counter==7)
	{
		$("#list1").html('');
		$('#joinKey9 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys9 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#list1").append(optionDB);			
		});
	}
	
}

function columnNext(){
	var srcSelValue = [];
	var tgtSelValue = [];
	$("#srcDiv").html('');
	$("#tgtDiv").html('');
	$("#chkBox").html('');
	$("#selectall").prop('checked',false);
	var flag = 0;
		
	$( "#scrCol option:selected" ).each(function() {
		srcSelValue.push($(this).text());		
	});
	
	$( "#tgtCol option:selected" ).each(function() {
		tgtSelValue.push($(this).text());
	});	
	
	//alert('srcSelValue : '+srcSelValue+' tgtSelValue : '+tgtSelValue);
	
	if(srcSelValue.length > 0 && tgtSelValue.length > 0){
	if(srcSelValue.length === tgtSelValue.length){
		for(var i = 0; i < srcSelValue.length; i++){
			srcType = srcSelValue[i].split(" --> ");
			tgtType = tgtSelValue[i].split(" --> ");
			if(srcType[1] === tgtType[1]){	//checking src key(s) selection and tgt key(s) selection are correct with datatype.			
			}else flag++;
		}
	if(flag === 0) {
		var array = [];
		//alert('inside flag'+scrCol.length +" tgt len"+tgtCol.length);
		array.push({sid:"",srcDt:"",tid:"",tgtDt:""});
		var hstr="";
		var cnt =0;
		var i=0;
		$( "#scrCol option:not(:selected)" ).each(function() {
			cnt++;
			//array[cnt]=({sid:"sid_"+cnt,srcDt:$(this).text()});
				var optionDB = '<option id='+cnt+'>'+$(this).text()+'</option>';
				hstr+=optionDB;
				//$("#srcMap").append(optionDB);		
		});
		//alert(hstr);
		$( "#scrCol option:not(:selected)" ).each(function() {
			i++;
			$("#chkBox").append("<input id='chkbox_"+i+"' type='checkbox' style='height:36px' class='chkbox'><br/>");
			var optionDB = "<select id='srcdiv_"+i+"'style='width:400px'>";
			if(hstr.includes("id="+i))
				var hstr1 = hstr.replace("id="+i, "id="+i+" selected");
				optionDB += hstr1+"</select>";
				array[i]=({sid:"sid_"+i,srcDt:optionDB});
			$("#srcDiv").append(optionDB);
	});
		if(scrCol.length < tgtCol.length){
			var diff = tgtCol.length - scrCol.length;
			for(j=0;j<diff;j++){
				i++;
				array[i] = ({sid:"",srcDt:""});
				$("#chkBox").append("<input id='chkbox_"+i+"' type='checkbox' style='height:36px' class='chkbox'><br/>");
				var optionDB = "<select id='srcdiv_"+i+"' style='width:400px'>";
				var hstr2 = '<option value="" selected="selected"></option>' + hstr;
				optionDB += hstr2+"</select>";
				array[i]=({sid:"sid_"+i,srcDt:optionDB});
				$("#srcDiv").append(optionDB);
			}
		}
		
		cnt=0;
		hstr="";
		i=0;
		$( "#tgtCol option:not(:selected)" ).each(function() {
			cnt++;
			//array[cnt].tid="tid_"+cnt,
			//array[cnt].tgtDt =$(this).text();
				var optionDB = '<option id='+cnt+'>'+$(this).text()+'</option>';
				hstr+=optionDB;
				//$("#tgtMap").append(optionDB);									
		});
		
		$( "#tgtCol option:not(:selected)" ).each(function() {
			i++;
				var optionDB = "<select id='tgtdiv_"+i+"' style='width:400px'>";
				if(hstr.includes("id="+i))
					var hstr1 = hstr.replace("id="+i, "id="+i+" selected");
					optionDB += hstr1+"</select>";
					array[i].tid="tid_"+i,
					array[i].tgtDt = optionDB;
				$("#tgtDiv").append(optionDB);								
		});
		
		if(scrCol.length > tgtCol.length){
			var diff = scrCol.length - tgtCol.length;
			for(j=0;j<diff;j++){
				i++;
				var optionDB = "<select id='tgtdiv_"+i+"' style='width:400px'>";
				var hstr2 = '<option value="" selected="selected"></option>' + hstr;
				optionDB += hstr2+"</select>";
				array[i].tid="tid_"+i,
				array[i].tgtDt = optionDB;
				$("#tgtDiv").append(optionDB);
			}
		}
		
		console.log("asasassasasas"+JSON.stringify(array))  ; 
		
		var table = document.createElement("table");
		table.id="grid";
		var tr = table.insertRow(-1);
		var col=["sid","srcDt","tgtDt"];
		var th = document.createElement("th");
		th.className ="col-lg-2";
		th.innerHTML = "<input id='chkbox_all' type='checkbox' onclick='toggleAll()'>";
		tr.appendChild(th);
		var th1 = document.createElement("th"); 
		th1.className ="col-lg-5";
		th1.innerHTML = "Source Columns for Mapping(Except the Key(s) selected)";
        tr.appendChild(th1);
        var th2 = document.createElement("th"); 
        th2.className ="col-lg-5";
		th2.innerHTML = "Target Columns for Mapping(Except the Key(s) selected)";
		tr.appendChild(th2);
		
		for (var i = 0; i < array.length; i++) {
			if(i==0){
				continue;
			}
            tr = table.insertRow(-1);
            tr.id="tr_"+i;
            for (var j = 0; j < 3; j++) {
                var tabCell = tr.insertCell(-1);
                if(j==0){
                	var cb ="<input id='chkbox_"+i+"' type='checkbox' class='chkbox'>";
                	tabCell.className ="col-lg-2";
                	tabCell.innerHTML = cb;
                	continue;
                }
                tabCell.className ="col-lg-5";
                tabCell.innerHTML = array[i][col[j]];
            }
        }
		
		var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
		
		$('#fileselection').hide();
		$('#columnmapping').show();
		$('#rulesfilters').hide();
		$('#confirmparameter').hide();	
		
	}
	else
		bootbox.alert("Wrong key(s) selection.. Check for mismatches of datatypes of the selected columns");
		//}
	}else
		bootbox.alert("Number of key(s) selected in Source should be equal to the Number of key(s) selected in Target");
	
	}else
		bootbox.alert("Please select the key(s) to proceed");
	
}
function toggleAll(){
	console.log("chkbox_all")  ; 
	if($('#chkbox_all').is(":checked"))
		$(".chkbox").prop('checked', true);
		else
		   $(".chkbox").prop('checked',false);
}
function dispFilesCol(counter){
	
	if(counter == 1){
		
		getScrCol('#joinFile1','#joinProject','#Keys1','Keys1');
				
	}else if(counter == 2){
		getScrCol('#joinFile2','#joinProject','#Keys2','Keys2');
				
	}else if(counter == 3){
		$("#joinKey3").html('');
		$('#file3').show();
		getScrCol('#joinFile3','#joinProject','#Keys3','Keys3');
		
		$('#Keys1 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey3").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys2 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey3").append(optionDB);			
		});
		
	}else if(counter == 4){
		$("#joinKey4").html('');
		$('#file4').show();
		getScrCol('#joinFile4','#joinProject','#Keys4','Keys4');
		
		$('#joinKey3 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey4").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys3 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey4").append(optionDB);			
		});
		
	}else if(counter == 5){
		$("#joinKey5").html('');
		$('#file5').show();
		getScrCol('#joinFile5','#joinProject','#Keys5','Keys5');
		
		$('#joinKey4 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey5").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys4 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey5").append(optionDB);			
		});
		
	}else if(counter == 6){
		$("#joinKey6").html('');
		$('#file6').show();
		getScrCol('#joinFile6','#joinProject','#Keys6','Keys6');
		
		$('#joinKey5 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey6").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys5 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey6").append(optionDB);			
		});
	}else if(counter == 7){
		$("#joinKey7").html('');
		$('#file7').show();
		getScrCol('#joinFile7','#joinProject','#Keys7','Keys7');
		
		$('#joinKey6 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey7").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys6 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey7").append(optionDB);			
		});		
	}else if(counter == 8){
		$("#joinKey8").html('');
		$('#file8').show();
		getScrCol('#joinFile8','#joinProject','#Keys8','Keys8');
		
		$('#joinKey7 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey8").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys7 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey8").append(optionDB);			
		});
	}else if(counter == 9){
		$("#joinKey9").html('');
		$('#file9').show();
		getScrCol('#joinFile9','#joinProject','#Keys9','Keys9');
		
		$('#joinKey8 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey9").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys8 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey9").append(optionDB);			
		});
	}else if(counter == 10){
		$("#joinKey10").html('');		
		$('#file10').show();
		getScrCol('#joinFile10','#joinProject','#Keys10','Keys10');
		
		$('#joinKey9 option').each(function() {
			 var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey10").append(optionDB); 
		});
		//alert($("#joinKey3").text);
		$('#Keys9 option').each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#joinKey10").append(optionDB);			
		});		
	}
				
}


		
	
	
	function fetchTestName(proId,testId) {
		$(testId).html('');
		//$("#testDateCombo").html('');
		//$("#testTimeCombo").html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getTestNames',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(proId).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(testId).append(optionDB);
				});	
				if(proId == '#rerunpro')
				fetchDate('#rerunpro','#reruntest','#rerundate'); 
				else if(proId == '#histPro')
				fetchDate('#histPro','#histTest','#histDate'); 
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function fetchDate(proId,testId,dateId) {
		$(dateId).html('');
		//$("#testDateCombo").html('');
		//$("#testTimeCombo").html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getTestDates',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(proId).val(),'testName' : $(testId).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(dateId).append(optionDB);
				});	
				if(proId == '#rerunpro')
				fetchTime('#rerunpro','#reruntest','#rerundate','#reruntime','#rsFileName','#rtFileName','#rsSelectedKey','#rtSelectedKey','#rsRules','#rtRules','#rsFilters','#rtFilters');
				else if(proId == '#histPro')
				fetchTime('#histPro','#histTest','#histDate','#histTime','#hsFileName','#htFileName','#hsSelectedKey','#htSelectedKey','#hsRules','#htRules','#hsFilters','#htFilters');
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function fetchTime(proId,testId,dateId,timeId,sFileName,tFileName,sKeys,tKeys,sRules,tRules,sFilters,tFilters) {
		$(timeId).html('');
		//alert($(proId).val());
		//alert($(testId).val());
		//alert($(dateId).val());
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getTestTimes',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(proId).val(),'testName' : $(testId).val(),'testDate' : $(dateId).val()}),
			success: function(response){
				//alert(response);
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(timeId).append(optionDB);
				});	
				loadFiles();
				loadSrcTgtDetails(proId,testId,dateId,timeId,sFileName,tFileName,sKeys,tKeys,sRules,tRules,sFilters,tFilters);
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}
	function getSrcTgtDetail(){
		var selectedVal = $( "#fileorder option:selected" ).text();
		//alert("Selected Val  :  " + selectedVal);
		srcType = selectedVal.split(" --> ");
		//alert("srcType[0] :  " + srcType[0] +"     srcType[1]   :   "+srcType[1]+"     srcType[2]    :   "+srcType[2]);
		loadSrcTgtDetails('#batproject',srcType[0],srcType[1],srcType[2],'#hsFileName','#htFileName','#hsSelectedKey','#htSelectedKey','#hsRules','#htRules','#hsFilters','#htFilters');
	}
	function loadSrcTgtDetails(proId,testId,dateId,timeId,sFileName,tFileName,sKeys,tKeys,sRules,tRules,sFilters,tFilters)
	{
		$(sFileName).html('');
		$(tFileName).html('');
		$(sKeys).html('');
		$(tKeys).html('');
		$(sRules).html('');
		$(tRules).html('');
		$(sFilters).html('');
		$(tFilters).html('');
		var testname='';
		var testdate='';
		var testtime='';
		if (testId.match("^#"))
			testname = $(testId).val();
		else 
			testname = testId;
		
		if (dateId.match("^#"))
			testdate = $(dateId).val();
		else 
			testdate = dateId;
		
		if (timeId.match("^#"))
			testtime = $(timeId).val();
		else 
			testtime = timeId;
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'loadSrcTgtDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(proId).val(),'testName' : testname,'testDate' : testdate,'testTime' : testtime}),
			success: function(response){
					$(sFileName).append(response.sFileName);
					$(tFileName).append(response.tFileName);
					$(sKeys).append(response.sKeys);
					$(tKeys).append(response.tKeys);
					$(sRules).append(response.sRules);
					$(tRules).append(response.tRules);
					$(sFilters).append(response.sFilters);
					$(tFilters).append(response.tFilters);
					$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function loadFiles(proName)
	{
		$('#tgt_change').html('');
		$('#scr_change').html('');
		$('#batchFileList').html('');
		$("#scr_change").prepend("<option value=''>Select Source</option>").val('Select Source');
		$("#tgt_change").prepend("<option value=''>Select Target</option>").val('Select Target');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getFileList',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : proName}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';					
					$('#tgt_change').append(optionDB);
					$('#scr_change').append(optionDB);
					$('#batchFileList').append(optionDB);
				});	
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}
	function batchnames(comboId,comboId2,comboId3,comboId4,comboId5)
	{
		$(comboId2).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchNames',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(comboId).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(comboId2).append(optionDB);
				});	
				batchDate(comboId,comboId2,comboId3,comboId4,comboId5);
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function batchDate(comboId,comboId2,comboId3,comboId4,comboId5)
	{
		$(comboId3).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchDates',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(comboId).val(), 'batchName' : $(comboId2).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(comboId3).append(optionDB);
				});	
				batchTime(comboId,comboId2,comboId3,comboId4,comboId5);
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function batchTime(comboId,comboId2,comboId3,comboId4,comboId5)
	{
		$(comboId4).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchTimes',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(comboId).val(), 'batchName' : $(comboId2).val(), 'batchDate' : $(comboId3).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(comboId4).append(optionDB);
				});	
				batchDetails(comboId,comboId2,comboId3,comboId4,comboId5);
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function batchDetails(comboId,comboId2,comboId3,comboId4,comboId5)
	{
		$(comboId5).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(comboId).val(),'batName' : $(comboId2).val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(comboId5).append(optionDB);
				});	
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}


	function createBatchTask(){
		var days = [];
		
		if($('#scheduleTypeBat1').is(':checked'))
		{
			etype='D';
			days.push('NA');
		}
		else if($('#scheduleTypeBat2').is(':checked'))
		{
			etype='W';
			$.each($(".batchDaysB:checked"), function(){            
			    days.push($(this).val());
			});
			console.log(days);
		}
		else if($('#scheduleTypeBat3').is(':checked'))
		{
			etype='S';
			days.push('NA');
			$('#bEDate').val('NA');
		}		
			console.log("End Date  :   "+$('#bEDate').val());
		
		if(etype == 'W' && days.length == 0){
			bootbox.alert(" Please select the Days ");
			$('.batchDaysB').get(0).focus();
			return false;
		}
		if($('#bSDate').val() == ""){
			bootbox.alert(" Start Date should not be empty");
			$('#bSDate').get(0).focus();
			return false;
		}
		if((etype != 'S'  && $('#bEDate').val() == "")){
			bootbox.alert(" End Date should not be empty");
			$('#bEDate').get(0).focus();
			return false;
		}
		$('#spinLoad').show();
		 $.ajax({
			type: 'post',
			url: localUrl+'createBatchTask',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $('#tsProject option:selected').val(),'batName' : $('#tsBatchName option:selected').val(), 'batDate' : $('#tsBatchDate option:selected').val(), 'batTime' : $('#tsBatchTime option:selected').val(), 'etype' : etype, 'days':days.toString(),'sdate':$('#bSDate').val(),'edate':$('#bEDate').val()}),
			success: function(response){
				if(response.message == "Success")
					bootbox.alert("Batch Scheduled successfully");
				else
					bootbox.alert("Failed");
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		}); 
	}

	function createTestTask(){
		var days = [];
		if($('#scheduleTypeTest1').is(':checked'))
			{
				etype='D';
				days.push('NA');
			}
		else if($('#scheduleTypeTest2').is(':checked'))
		{
			etype='W';
			$.each($(".testDaysT:checked"), function(){            
			    days.push($(this).val());
			});
			console.log(days);
		}
		else if($('#scheduleTypeTest3').is(':checked'))
			{
				etype='S';
				days.push('NA');
				$('#tEDate').val('NA');
			}		
		console.log("End Date  :   "+$('#tEDate').val());
		
		if(etype == 'W' && days.length == 0){
			bootbox.alert(" Please select the Days ");
			$('.testDaysT').get(0).focus();
			return false;
		}
		if($('#tSDate').val() == ""){
			bootbox.alert(" Start Date should not be empty");
			$('#tSDate').get(0).focus();
			return false;
		}
		if((etype != 'S'  && $('#tEDate').val() == "")){
			bootbox.alert(" End Date should not be empty");
			$('#tEDate').get(0).focus();
			return false;
		}
		$('#spinLoad').show();
		 $.ajax({
			type: 'post',
			url: localUrl+'createTestTask',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $('#tsProject option:selected').val(),'testName' : $('#tsTestName option:selected').val(), 'testDate' : $('#tsTestDate option:selected').val(), 'testTime' : $('#tsTestTime option:selected').val(), 'etype' : etype, 'days':days.toString(),'sdate':$('#tSDate').val(),'edate':$('#tEDate').val()}),
			success: function(response){
				if(response.message == "Success")
					bootbox.alert("Test Scheduled successfully");
				else
					bootbox.alert("Failed");
				/*$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
				});	*/	
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}
	
	function showresult()
	{
		histPro=$('#histPro').val();
		histTest=$('#histTest').val();
		histDate=$('#histDate').val();
		histTime=$('#histTime').val();
		alert("  histPro   :  "+histPro+"   histTest   :   "+histTest+"   histDate    :   "+histDate+"  histTime  :   "+histTime);
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getTestId',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : histPro,'testName' : histTest,'histDate' : histDate,'histTime' : histTime}),
			success: function(response){
				console.log(response.testID);
				window.open('/jumbo/views/JUMBO_HTML_UI/theme-quasar/statistics.html?projectName='+histPro+'&testID='+response.testID);
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

//*-*-*-*-*-*-*-*-*-*-*-*-* G E T  CSV  F I L E S  L I S T *-*-*-*-*-*-*-*-*-*-*-*-*//
	
	function getAllFiles(type,comboId){
		$(comboId).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getAllFiles',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'filetype' : type}),
			success: function(response){
				//alert(response);
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';				
					$(comboId).append(optionDB);
				});
				$('#spinLoad').hide();
			},
			error: function(){console.log("File Loading Error");$('#spinLoad').hide();}
		});
		
	}
	
	//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*	
	
	/*function getProject(comboId){
		$(comboId).html('');
		var urole = $('#user_role').val();
		var userProj = $('#user_project').val();
		//alert(urole);
		//alert(userProj);
		if(typeof urole !== 'undefined' && typeof userProj !== 'undefined'){
		if(urole == "Admin"){
		$.ajax({
			type: 'get',
			url: localUrl+'getDataBases',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';				
					$(comboId).append(optionDB);
				});
				if(comboId == '#csvProjectCombo')
					getFiles('#csvProjectCombo','#csvFileCombo');
				else if(comboId == '#xmlProjectCombo')
					getXmlFiles('#xmlProjectCombo');
				else if(comboId == '#testProjectCombo')
					getTestName('#testProjectCombo');
				else if(comboId == '#joinProject'){
					getJoinFiles('#joinProject');
					$("#list2").html('');
				}else if(comboId == '#unionProject'){
					getFiles('#unionProject','#list3');
					$("#list4").html('');
				}else if(comboId == '#customProject'){
					getFiles('#customProject','#customFile');
				}
			},
			error: function(){alert("Unable to fetch Project List");}
		});
		}
		else{
			splitProj = userProj.split(",");		
			if(splitProj.length > 1){
				splitProj = userProj.split(",");
				$(splitProj).each(function(){
					var optionDB = '<option>'+this+'</option>';				
					$(comboId).append(optionDB);
				});			
				
			}else{
				var optionDB = '<option>'+userProj+'</option>';				
				$(comboId).append(optionDB);			
			}
			if(comboId == '#csvProjectCombo')
				getFiles('#csvProjectCombo','#csvFileCombo');
			else if(comboId == '#xmlProjectCombo')
				getXmlFiles('#xmlProjectCombo');
			else if(comboId == '#testProjectCombo')
				getTestName('#testProjectCombo');
			else if(comboId == '#joinProject'){
				getJoinFiles('#joinProject');
				$("#list2").html('');
			}else if(comboId == '#unionProject'){
				getFiles('#unionProject','#list3');
				$("#list4").html('');
			}else if(comboId == '#customProject'){
				getFiles('#customProject','#customFile');
			}
		}
		
		}else{
			window.location.replace(localUrl);
		}
	}*/
	
	function addFile()
	{
		$('#spinLoad').show();
		console.log("Adding file "+$('#file_loc_csv option:selected').val());
		/* var x = document.getElementById("mydelimitercheck"); */
	    
		if($('#delimiter option:selected').val() == "Other")
		{
			//alert($('#delimitertext').val().length);
			delimiter=$('#delimitertext').val();
		}
		else
		{
			delimiter=$('#delimiter option:selected').val();
		}
		if(delimiter.length > 0){
		$.ajax({
			type: 'post',
			url: localUrl+'addFile',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projName' : $('#pro_list_files option:selected').val(),'fileName' : $('#file_loc_csv option:selected').val(),'delimiter' : delimiter}),
			success: function(response){
				$('#spinLoad').hide();
				if(response.message == "Invalid delimiter"){
					bootbox.alert("Choose or Enter the correct delimiter");
					$('#delimitertextmissingerror').html('<font color="red">* Choose or Enter the correct delimiter</font>');
					$('#delimitertextmissingerror').show();
				}else if(response.message == "success"){
					bootbox.alert("File Added Successfully");
					$('#delimitertextmissingerror').hide();
				}	
				else{
					bootbox.alert("File Already Exists");	
					$('#delimitertextmissingerror').hide();
				}	
			},
			error: function(){
				$('#spinLoad').hide();
				bootbox.alert("File Loading Error");}
		});
		}else {
			$('#delimitertextmissingerror').html('<font color="red">* Please enter a delimiter</font>');
			$('#delimitertextmissingerror').show();
			setTimeout(function(){
				$('#delimitertext').focus();
	        }, 1);	
			
		}
	}
	function loadFiles1()
	{
		//alert('inside loadFiles1');
		$('#batchFileList').html('');
		$("#filesselected").html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getTestNamesWithDate',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $('#batproject').val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$('#batchFileList').append(optionDB);					
				});	
				batchnames1();
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function batchnames1()
	{
		//alert('inside batchnames1');
		$('#batnames').html('');
		$('#batnamesforResults').html('');
		//$('#tsBatchName').html('');
		//$("#fileorder").html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchNames',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $('#batproject').val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$('#batnames').append(optionDB);
					$('#batnamesforResults').append(optionDB);
					//$('#tsBatchName').append(optionDB);
				});	
				batchDetails1();
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function batchDetails1()
	{
		//alert('inside batchDetails1');
		$("#fileorder").html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $('#batproject').val(),'batName' : $('#batnames').val()}),
			success: function(response){
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$('#fileorder').append(optionDB);
				});
				showResultStatus();
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}
	function pushToBatch(){
		//var filesSelected = [];
		//alert('inside pushToBatch');
		$("#filesselected").html('');
		//var flag = 0;
		
		$( "#batchFileList option:selected" ).each(function() {
			var optionDB = '<option>'+$(this).text()+'</option>';
			$("#filesselected").append(optionDB);	
		});	
	}

	function createBatch(){
		//alert('inside createBatch');
		console.log($("#batproject option:selected").val());
		console.log($("#batname").val());
		var testnames= [];
		$("#filesselected option").each(function() {
			testnames.push($(this).text());
		});
		console.log(testnames.toString());
		if($('#batname').val() == ""){
			bootbox.alert(" Batch name should not be empty");
			$('#batname').get(0).focus();
			return false;
		}
		if(testnames.length <= 0){
			bootbox.alert(" Unable to create Batch without Test");			
			return false;
		}
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'createBatch',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $("#batproject option:selected").val(),'batname' : $("#batname").val(),'testnames':testnames.toString(),'userName' : $('#loginUname').val()}),
			success: function(response){
				bootbox.alert(response.message);
				batchnames1();	
				$('#spinLoad').hide();
			},
			error: function(){$('#spinLoad').hide();}
		});
	}

	function runBatch(){
		//alert('inside runBatch');
		if($("#batnames option:selected").val() != "--No Batch Details Available--" && $("#fileorder option:selected").val() !="--No Test Details Available--"){
		$("#spinLoad").show();	
		console.log($("#batnames option:selected").val());
		//console.log($("#batname").val());
		var batchFiles= [];
		$("#fileorder option").each(function() {
			batchFiles.push($(this).text());
		});
		console.log(batchFiles.toString());		
		$.ajax({
			type: 'post',
			url: localUrl+'runBatch',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $("#batproject option:selected").val(),'batname' : $("#batnames option:selected").val(),'batchFiles':batchFiles.toString()}),
			success: function(response){
				bootbox.alert(response.message);
				$("#spinLoad").hide();
				showResultStatus();
				//getBatchList();
				//window.open('/jumbo/views/JUMBO_HTML_UI/theme-quasar/batch_results.html?projectName='+$("#batproject option:selected").val()+'&batchName='+$("#batnames option:selected").val());
			},
			error: function(){$('#spinLoad').hide();}
		});
		}else
			bootbox.alert("No Batch or Test(s) to run");
	}
	
	function getBatchList(){
/*
		params = getParams();
		projectName = unescape(params["projectName"]);
		batchName = unescape(params["batchName"]);*/
		//alert('inside getBatchList');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchResult',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"projectName" : $("#batproject option:selected").val(),"batchName" : $("#batnames option:selected").val()}),
			success: function(response){
				$("#proName").html('');
				$("#proName").append(response.projectName);
				$("#batName").html('');
				$("#batName").append(response.batchName);
				$("#totalTests").html('');
				$("#totalTests").append(response.totalTests);
				$("#totalPass").html('');
				$("#totalPass").append(response.totalPass);
				$("#totalFail").html('');
				$("#totalFail").append(response.totalFail);
				$("#doc").html('');
				$("#doc").append(response.doc);
				$("#doe").html('');
				$("#doe").append(response.doe);
				$("#user").html('');
				$("#user").append(response.user);
				$("#execTime").html('');
				$("#execTime").append(response.execTime);
				$("#tableData tbody").empty();
				$("#tableData tbody").append(response.tableData);
				$('#batchResultModal').modal('show');
				$('#spinLoad').hide();
			},
			error: function(){
				bootbox.alert("Error");
				$('#spinLoad').hide();
			}
		});
	}
	
	function showResultStatus(){
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getExecutedBatchResult',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"projectName" : $("#batproject option:selected").val(),"batchName" : $("#batnamesforResults option:selected").val()}),
			success: function(response){
				//alert(response.message);
				if(response.message == "success"){
					$("#showResults").prop("disabled",false);
					$('#spinLoad').hide();
				}
				else{
					$("#showResults").prop("disabled",true);
					$('#spinLoad').hide();
				}
			},
			error: function(){alert("Error");$('#spinLoad').hide();}
		});
	}
	/**********************D A S H B O A R D  F U N C T I O N S**************************/
	
	function getProjectCount()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'get',
			url: localUrl+'getProjectCount',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalProjectCountText : '+response.message);
				$('#totalProjectCountText').html(response.message);
				$('#spinLoad').hide();
			},
			error: function(){console.log('#totalProjectCountText --> Gala re Pilaa');$('#spinLoad').hide();}
		});
	}
	
	function getUserCount()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'get',
			url: localUrl+'getUserCount',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalUserCountText : '+response.message);
				$('#totalUserCountText').html(response.message);
				$('#spinLoad').hide();
			},
			error: function(){console.log('#totalUserCountText --> Gala re Pilaa');$('#spinLoad').hide();}
		});
	}
	
	function loadProjectDetails()
	{
		$('#spinLoad').show();
		$('#projectTable').html("");
		$.ajax({
			type: 'get',
			url: localUrl+'loadProjectDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalUserCountText : '+response.message);
				$('#projectTable').html(response.message);
				$('#spinLoad').hide();
			},
			error: function(){console.log('#loadProjectDetails --> Gala re Pilaa');$('#spinLoad').hide();}
		});
	}
	
	function fetchPassValue()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'get',
			url: localUrl+'fetchPassValue',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalTestPassCountText : '+response.message);
				$('#totalTestPassCountText').html(response.message);
				$('#spinLoad').hide();
			},
			error: function(){console.log('#totalTestPassCountText --> Gala re Pilaa');$('#spinLoad').hide();}
		});
	}
	
	function fetchFailValue()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'get',
			url: localUrl+'fetchFailValue',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalTestFailCountText : '+response.message);
				$('#totalTestFailCountText').html(response.message);
				$('#spinLoad').hide();
			},
			error: function(){console.log('#totalTestFailCountText --> Gala re Pilaa');$('#spinLoad').hide();}
		});
	}
	
	/**********************U S E R  M A N A G E M E N T  F U N C T I O N S**************************/
	
	
	
	function emailConfirm(){
		var fromMailAdd = $('#fromMailId').val();
		var smtpServerName=$('#smtpServer').val();
		var smtpPortName=$('#smtpPort').val();
		var SMTPUsername=$('#SMTPUsername').val();
		var SMTPPassword=$('#SMTPPassword').val();
		if(fromMailAdd == '' ){
			bootbox.alert(" From Address should not be empty");
			$('#fromMailId').get(0).focus();
			return false;
		}
		if(!isEmail($('#fromMailId').val())){
			bootbox.alert(" Invalid Email Id");
			$('#fromMailId').get(0).focus();
			return false;
		}
		if(smtpServerName == ''){
			bootbox.alert(" SMTP server should not be empty");
			$('#smtpServer').get(0).focus();
			return false;
		}
		if(smtpPortName == ''){
			bootbox.alert(" SMTP port should not be empty");
			$('#smtpPort').get(0).focus();
			return false;
		}
		if(SMTPUsername == ''){
			bootbox.alert(" SMPT username should not be empty");
			$('#SMTPUsername').get(0).focus();
			return false;
		}
		if(SMTPPassword == ''){
			bootbox.alert(" SMPT password should not be empty");
			$('#SMTPPassword').get(0).focus();
			return false;
		}
		$('#spinLoad').show();
		$.ajax({
			type: 'POST',
			url: localUrl + 'admin/addEmailConfig',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'fromMailId' : fromMailAdd,'smtpServer' : smtpServerName,'smtpPort' : smtpPortName,'SMTPUsername' : SMTPUsername,'SMTPPassword' : SMTPPassword}),
			success: function(response) {
				if(response.message == 'success')
				{
					bootbox.alert("SMTP Configuration saved successfully");
					document.getElementById("fromMailId").value = "";
					document.getElementById("smtpServer").value = "";
					document.getElementById("smtpPort").value = "";
					document.getElementById("SMTPUsername").value = "";
					document.getElementById("SMTPPassword").value = "";
					$('#spinLoad').hide();
				}
				else{
					bootbox.alert("SMTP Configuration saving failed");
					$('#spinLoad').hide();
				}
					
			},
			error: function(error,errorMsg,b) {bootbox.alert("Unexpected Error");$('#spinLoad').hide();}
		});
	}

	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
		
	function validateAndCloseModal()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'POST',
			url: localUrl + 'checkCreds',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'connectionNames' : $('#connectionNames option:selected').val(), 'username' : $('#usernameatmodal').val(), 'password' : $('#passwordatmodal').val()}),
			success: function(response) {
				if(response.message == 'Success')
				{
					$('#spinLoad').show();
					$.ajax({
						type: 'POST',
						url: localUrl + 'addDBConnection',
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: JSON.stringify({'connectionNames' : $('#connectionNames option:selected').val(), 'projName' : $('#pro_list_files option:selected').val()}),
						success: function(response) {
							if(response.message == 'Success')
							{
								bootbox.alert("Connection added successfully to the project");	
								getFilesForDeleting("#del_fileDB_fileList");
								$('#spinLoad').hide();
							}	
							else if(response.message == 'Already_Available')
								{
									bootbox.alert("Connection already available for the selected project.");
									$('#spinLoad').hide();
								}	
							else
								{
									bootbox.alert(response.message);
									$('#spinLoad').hide();
								}
								
						},
						error: function(error,errorMsg,b) {
							console.log(error.responseText + " " + errorMsg + " " + error.status);
							$('#spinLoad').hide();
						}
					});
				}		
				else if(response.message == '**')
				{
					bootbox.alert("Incorrect Username or Password");
					$('#spinLoad').hide();
				}
			},
			error: function(error,errorMsg,b) {
				console.log(error.responseText + " " + errorMsg + " " + error.status);
				$('#spinLoad').hide();
			}
		});
		$('#modalForAddingDBConnection').modal('hide');
	}

	
	function fetchConnectionDetails()
	{
		//alert('fetchingdata');
		$('#spinLoad').show();
		$.ajax({
			type: 'POST',
			url: localUrl + 'fetchConnectionDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'connectionNames' : $('#connectionNames option:selected').val()}),
			success: function(response) {
				$("#connectionDetailsFromFile").html(response.message);
				$('#spinLoad').hide();
			},
			error: function(error,errorMsg,b) {
				console.log(error.responseText + " " + errorMsg + " " + error.status);
				$('#spinLoad').hide();
			}
		});
	}
	
	// <! ----        New Test Run Methods          --------------------  !>
	
	function getPrjDetails(t){
		/* var prj = t.id;
		 var selVal = $('#'+prj).val();
		 var url = window.location.href;
		 alert(url);
		 if (url.indexOf('?') > -1){
			   url = url.substring(0,url.indexOf('?'));
			   url += '?projectName='+selVal;
			}else{
			   url += '?projectName='+selVal;
			}
		 alert("url >> "+url);
		 window.location.href = url;*/
		 //location.reload();
		//alert(t.value);
		//$("#filterDiv").hide();
		$("#filterDiv").show();
		$('#toggle2').prop('checked', false);
		$("#ftrScreen").hide();
		 $("[id^='srcfilter_']").remove();
		 $("[id^='tgtfilter_']").remove();
		srChgDt="";
		tgChgDt="";
		var projectName =t.value; 
		ParamValue(projectName);
	 }
	function closeCustomQry(){
		$("#joinFileName").val("");
		$("#generateQry").val("");
		$("#list1").html('');
		$("#list2").html('');		
		getPrjDetails();
	}
	var srChgDt="";
	var tgChgDt="";
	function getScrTbl(comboId,projId,fieldId,isSorce){
		srChgDt="";
		tgChgDt="";
		//console.log("inside getScrTbl "+isSorce);
		var mydata = [];
		var srcArr=[];
		var tgtArr=[];
		var sourceLength=0;
		var TargetLength=0;
		var DATA_TYPES='<option>int</option>'+
						'<option>string</option>'+
						'<option>date</option>'+
						'<option>float</option>'+
						'<option>boolean</option>';
	    var INT_RULES = '<option>Add</option>'+
					    '<option>Subtract</option>'+
					    '<option>Multiply with</option>'+
					    '<option>Divide By</option>'+
					    '<option>Modulus</option>';
	    var STRING_RULES = '<option>Concat</option>'+
						    '<option>Substring</option>'+
						    '<option>Add Prefix</option>'+
						    '<option>Add Suffix</option>';
	    var DATE_RULES = '<option>d/M/y</option>'+
						    '<option>d/M/y h:m:s a</option>'+
						    '<option>M/d/y h:m:s a</option>'+
						    '<option>M/d/y</option>'+
						    '<option>YYYY-mm-dd hh:mm:ss a</option>';					    
						
		mydata.push({srcCol:"",srcDt:"",srcrules:"",srcval:"",tgtCol:"",tgtDt:"",tgtrules:"",tgtval:""});
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getSrcTgtFile',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $(projId).val(),'fileName' : $('#souceFile').val(),'keyName' : fieldId}),
			success: function(response){
				$(response.colsList).each(function(){
					sourceLength = response.colsList.length;
					srcArr = response.colsList;
				});
				$("#souceFile").select2({
					allowClear: true,
					  width: "250px"
					});
				if(projId == '#hidPrjName')
				$("#hidSrcPath").val(response.filePath);
				$('#spinLoad').hide();
			}, async: false,
			error: function(){$('#spinLoad').hide();}
		});
		$('#spinLoad').show();
		$.ajax({
	 		type: 'post',
	 		url: localUrl+'getSrcTgtFile',
	 		contentType: "application/json; charset=utf-8",
	 		dataType: "json",
	 		data: JSON.stringify({'projectName' : $(projId).val(),'fileName' : $('#targetFile').val(),'keyName' : fieldId}),
	 		success: function(response){
	 			
	 			$(response.colsList).each(function(){
	 				TargetLength = response.colsList.length; 
	 				tgtArr = response.colsList;		     							
	 			});
	 			$("#targetFile").select2({
					allowClear: true,
					  width: "250px"
					});
	 			$('#spinLoad').hide();
	 		},async: false,
	 		error: function(){$('#spinLoad').hide();}
	 	});
		
		var totLen;
		var srcColumns="";
		var tgtColumns="";
		var srcDataType="";
		var tgtDataType="";
		
		if(srcArr.length > tgtArr.length){
			totLen = srcArr.length;
			
			var sc = null;
			
			for(var j = 0;j<srcArr.length;j++){
				sc = srcArr[j].split(' --> ');
				srcColumns +="<option>"+sc[0]+"</option>";
				
				srcDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
			
			for(var j = 0;j<tgtArr.length;j++){
				sc = tgtArr[j].split(' --> ');
				tgtColumns +="<option>"+sc[0]+"</option>";
				
				tgtDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
			
		}else if(srcArr.length < tgtArr.length){
			totLen = tgtArr.length;
			
			var sc = null;
			
			for(var j = 0;j<srcArr.length;j++){
				sc = srcArr[j].split(' --> ');
				srcColumns +="<option>"+sc[0]+"</option>";
				
				srcDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
			
			for(var j = 0;j<tgtArr.length;j++){
				sc = tgtArr[j].split(' --> ');
				tgtColumns +="<option>"+sc[0]+"</option>";
				
				tgtDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
		}else {
			totLen = tgtArr.length;
			
			var sc = null;
			
			for(var j = 0;j<srcArr.length;j++){
				sc = srcArr[j].split(' --> ');
				srcColumns +="<option>"+sc[0]+"</option>";
				
				srcDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
			
			for(var j = 0;j<tgtArr.length;j++){
				sc = tgtArr[j].split(' --> ');
				tgtColumns +="<option>"+sc[0]+"</option>";
				
				tgtDataType +="<option>"+sc[1]+"</option>";
				//console.log("srcOpt  >>> "+srcOpt);
			}
		}
		
		var srcHTML="";
		var srcsplit = [];
		var tgtsplit = [];
		 /* $('#sTable').html(''); 
	     $('#tTable').html(''); */
	     $("#jTable > tbody").empty();
	     //$("#tTable > tbody").empty();
	     $("#jTable").append("<tbody class='content' >");
		for(var k=0;k<totLen;k++){
			//console.log("inside loop");
			if(srcArr[k]!=null && tgtArr[k]!=null){
				//console.log("inside loop 1 ");
				srcsplit =  srcArr[k].split(' --> ');
				tgtsplit =  tgtArr[k].split(' --> ');
			
				srcHTML = '<tr id="rowid_'+k+'"><td id="colid_'+k+'_0"><input type="checkbox" id="chkboxRmv_'+k+'" class="checkbox"></td><td id="colid_'+k+'_1"><input type="checkbox" id="chkboxKey_'+k+'" class="checkboxkey"></td><td id="colid_'+k+'_2">'+srcsplit[0]+'</td><td id="colid_'+k+'_3" class="inputCls">'+srcsplit[1]+'</td><td id="colid_'+k+'_4"></td><td id="colid_'+k+'_5"></td>';
				srcHTML += '<td id="colid_'+k+'_6">'+tgtsplit[0]+'</td><td id="colid_'+k+'_7">'+tgtsplit[1]+'</td><td id="colid_'+k+'_8"></td><td id="colid_'+k+'_9"></td></tr>';
	        $("#jTable").append(srcHTML); 
	         
			}else if(srcArr[k] == null && tgtArr[k]!=null){
				//console.log("inside loop 2 ");
				tgtsplit =  tgtArr[k].split(' --> ');
				srcHTML = '<tr id="rowid_'+k+'"><td id="colid_'+k+'_0"><input type="checkbox" id="chkboxRmv_'+k+'" class="checkbox" checked></td><td id="colid_'+k+'_1"><input type="checkbox" id="chkboxKey_'+k+'" class="checkboxkey"></td><td id="colid_'+k+'_2"> - </td><td id="colid_'+k+'_3"> - </td><td id="colid_'+k+'_4"> - </td><td id="colid_'+k+'_5"> - </td>';
				srcHTML += '<td id="colid_'+k+'_6">'+tgtsplit[0]+'</td><td id="colid_'+k+'_7">'+tgtsplit[1]+'</td><td id="colid_'+k+'_8" ></td><td id="colid_'+k+'_9"></td></tr>';
	        $("#jTable").append(srcHTML); 
	        
				
			}else if(srcArr[k] != null && tgtArr[k]==null){
				//console.log("inside loop 3 ");
				srcsplit =  srcArr[k].split(' --> ');
				srcHTML = '<tr id="rowid_'+k+'"><td id="colid_'+k+'_0"><input type="checkbox" id="chkboxRmv_'+k+'" class="checkbox" checked></td><td id="colid_'+k+'_1"><input type="checkbox" id="chkboxKey_'+k+'" class="checkboxkey"></td><td id="colid_'+k+'_2">'+srcsplit[0]+'</td><td id="colid_'+k+'_3">'+srcsplit[1]+'</td><td id="colid_'+k+'_4"></td><td id="colid_'+k+'_5"></td>';
				srcHTML += '<td id="colid_'+k+'_6"> - </td><td id="colid_'+k+'_7"> - </td><td id="colid_'+k+'_8"> - </td><td id="colid_'+k+'_9"> - </td></tr>';
	        $("#jTable").append(srcHTML);         
				
			}
			
		}
		$("#jTable").append("</tbody>");
		
			$("#selectAll").click(function () {
			    $(".checkbox").prop('checked', $(this).prop('checked'));
			});
			
			$("#jTable .checkboxkey").click(function () {
				//console.log("checked >> "+this.checked);
				var keyid=this.id;
				var keynum = keyid.substring(keyid.indexOf("_")+1, keyid.length);
				if(this.checked){
				$("#chkboxRmv_"+keynum).prop("checked", false);
				$("#chkboxRmv_"+keynum).prop("disabled", true);
				}else{
					//$("#chkboxRmv_"+keynum).prop("checked", true);
					$("#chkboxRmv_"+keynum).prop("disabled", false);
				}
			});
		
		$("#jTable").DataTable({
           responsive: true,
           destroy: true,
           retrieve: true,
           stateSave: true,
           DeferRender: true,
           paging: false,
           ordering:false,
           info:false,
           "bSort": false,
           searching:false
       });
		//console.log("srcColumns after dataTable >>  "+srcColumns);
		$("#nxtDiv").show();		
			$("#jTable tbody").on("click", "td", function (e) {
				//console.log("srcColumns >> "+srcColumns);
				//console.log("e.target "+e.currentTarget.nodeName);
			 var columnId=this.id;
			        //var data = table.row( this ).data();
					//var row_index = table.row( this ).index();
					//var col_index = table.cell( this ).index().columnVisible;
					//console.log("index >> "+row_index+" - "+col_index);
			        //alert( 'You clicked on '+data[0]+'\'s row' );
					//var x = document.getElementById('jTable').rows[row_index+2].cells[col_index];
					var x = document.getElementById(columnId);
					
					var num = x.id.substring(6, x.id.lastIndexOf('_'));
					
					$("#rowid_"+num).css("background-color", "");
					var elementType = "";
					var list = document.getElementById(x.id).hasChildNodes();
					//console.log("list >>> "+list);
							if(list) {
							elementType = document.getElementById(x.id);
							
							}
							
						if (x.id.endsWith("_3") || x.id.endsWith("_7")){
							var n_id = $('#'+x.id).closest('td').next('td').attr('id');
							$('#'+n_id).text('');
							$('#'+n_id).closest('td').next('td').text('');
						//$("#"+x.id).click(function(){
						var selected_text = $("#"+x.id).text().trim().split(" ")[0];
						
						var opt = '<option>int</option><option>string</option><option>date</option><option>float</option><option>boolean</option>';
						var name = $(this).text();
						$(this).html('');
						if(opt.includes(selected_text)){
							opt = opt.replace(">"+selected_text," selected>"+selected_text);
							//console.log(" opt >>> "+opt);
						}
						var selectStr = '<select >'
						
						$('<select></select>')
							.attr({
								'name': 'sname',
								'id': 'sel_'+x.id,
								
							})
							.html(opt)
							.appendTo('#'+x.id);
						if(list && elementType.childNodes[0].nodeName=='SELECT')
						{
							//console.log("Middle"+selected_text.trim().split(" ")[0]);
						}
						
						$("#sel_"+x.id).select2({
							allowClear: true,
							  width: "100px"
						}).on("select2-blur", function(e) {
							
							var name = $(this).val();
							var pn = $(this).closest('td').prev('td').text();
							if(x.id.endsWith("_3")){
								if(srChgDt.includes(pn)){
									var str;
									var prvTxt = srChgDt.split(",");
									if(prvTxt!=null && prvTxt !=''){
										for(var i=0;i<prvTxt.length;i++){
											if(prvTxt[i].includes(pn)){
												str = prvTxt[i]+",";
											}
										}
									}
									srChgDt = 	srChgDt.replace(str,"");
								}
							srChgDt += pn+" --> "+name+",";
							}
							else{
								if(tgChgDt.includes(pn)){
									var str;
									var prvTxt = tgChgDt.split(",");
									if(prvTxt!=null && prvTxt !=''){
										for(var i=0;i<prvTxt.length;i++){
											if(prvTxt[i].includes(pn)){
												str = prvTxt[i]+",";
											}
										}
									}
									tgChgDt = 	tgChgDt.replace(str,"");
								}
							tgChgDt += pn+" --> "+name+",";	
							}
							$("#"+x.id).text(name);});
						
						//$('#txt_fullname1').focus();
					//});
					//console.log("End >>>");
					}
						
						if (x.id.endsWith("_2") || x.id.endsWith("_6")){
							//$("#"+x.id).click(function(){								
							var selected_text = $("#"+x.id).text().trim().split(" ")[0];
							if(list && elementType.childNodes[0].nodeName=='SELECT')
								{
								//$("#"+x.id).select2('val',selected_text);
								}
							//console.log("selected_text >>> "+selected_text);	
							var options='';
							if(x.id.substring(x.id.lastIndexOf("_"),x.id.length)=="_2"){options=srcColumns}
							if(x.id.substring(x.id.lastIndexOf("_"),x.id.length)=="_6"){options=tgtColumns}
							var name = $(this).text();
							if(options.includes(selected_text)){
								options = options.replace(">"+selected_text," selected>"+selected_text);
								//console.log(" options >>> "+options);
							}else{
								return false;
							}
							console.log("options ??? "+options);
							$(this).html('');
							var selectStr = '<select >'							
							$('<select></select>')
								.attr({
									'name': 'fname',
									'id': 'sel_'+x.id,
									
								})
								.html(options)
								.appendTo("#"+x.id);
							
							$("#sel_"+x.id).select2({
								allowClear: true,
								  width: "100px"
								}).on("select2-blur", function(e) {
								//console.log("sel id"+x.id);
								var name = $(this).val();
								$("#"+x.id).text(name);});
						//});
						
						}
						
						if (x.id.endsWith("_4") || x.id.endsWith("_8")){
							
							$("#"+x.id).click(function(){
								var selected_text = $("#"+x.id).text().trim().split(" ")[0];
								
							var int_opt = '<option></option><option>Add</option><option>Subtract</option><option>Multiply with</option><option>Divide By</option><option>Modulus</option>';
							var string_opt = '<option></option><option>Concat</option><option>Substring</option><option>Add Prefix</option><option>Add Suffix</option>';
							var date_opt = '<option></option><option>d/M/y</option><option>d/M/y h:m:s a</option><option>M/d/y h:m:s a</option><option>M/d/y</option><option>YYYY-mm-dd hh:mm:ss a</option>';
							var rule_opt='';
							
							
								var pn = $(this).closest('td').prev('td').text();
							    if(pn=='int')
							    	rule_opt=int_opt;
							    else if(pn=='string')
							    	rule_opt=string_opt;
							    else if(pn=='date')
							    	rule_opt=date_opt;
							    else if(pn=='float')
							    	rule_opt=int_opt;
							
							var name = $(this).text();
							$(this).html('');
							if(rule_opt.includes(selected_text)){
								rule_opt = rule_opt.replace(">"+selected_text," selected>"+selected_text);
								//console.log(" rule_opt >>> "+rule_opt);
							}
							var selectStr = '<select >'
							$('<select></select>')
								.attr({
									'name': 'rname',
									'id': 'sel_'+x.id,
									'onChange':function(e){
										$('#'+x.id).closest('td').next('td').text('');
										
									}
								})
								.html(rule_opt)
								.appendTo('#'+x.id);
							
							$("#sel_"+x.id).select2({
								allowClear: true,
								placeholder: "Select a Rule",
								  width: "100px"
								}).on("select2-blur", function(e) {
								//console.log("sel id"+x.id);
								var name = $(this).val();
								$("#"+x.id).text(name);
															
								});
							
							//$('#txt_fullname1').focus();
						});
						
						}
						if(x.id.endsWith("_5") || x.id.endsWith("_9")){
							 var pnrules = $(this).closest('td').prev('td').text();
							 if(pnrules=='') return;
							 //var pnrulesId = $(this).closest('td').prev('td').attr('id');
							 //var pnType = $('#'+pnrulesId).closest('td').prev('td').text()
							 //console.log("pnrules -- >> "+pnrules);
							 //console.log("pnType -- >> "+pnType);
							 closeBox();
							 if(x.id.includes("_5"))
							 var option= srcColumns;
							 else if(x.id.includes("_9"))
							 var option= tgtColumns;
							 //console.log("option >>>> "+option);
						if(list && elementType.childNodes[0].nodeName=='INPUT')
						{
							//console.log("srcColumns >><< "+srcColumns);
							$('#popupSelect').html('');
							var name = $(this).text();
							$(this).html('');
							$('<input></input>')
								.attr({
									'type': 'text',
									'name': 'fname',
									'id': 'txt_'+x.id,
									'size': '10',
									'value': name,
									'onclick' : function(){
										if(pnrules !='Concat' && pnrules !='Add Prefix' && pnrules !='Add Suffix'){return false;}
										$('#popupSelect').append('<select multiple="multiple" size="10" name="popupSel">'+option+'</select><br><button onclick="submitdata('+x.id+');" class="btn btn-default btn-block">Submit data</button>');
										var demo1 = $('[name=popupSel]').bootstrapDualListbox();
										$('#popupSelect').show();
										$('#testSelection').modal('show');
									}
								})
								.appendTo("#"+x.id);
							$('#txt_'+x.id).focus();
						}
						else
						{
							//console.log("srcColumns >><< "+srcColumns);
							var name = $(this).text();
							$(this).html('');
							$('<input></input>')
								.attr({
									'type': 'text',
									'name': 'fname',
									'id': 'txt_'+x.id,
									'size': '10',
									'value': name,
									'onclick' : function(){
										if(pnrules !='Concat' && pnrules !='Add Prefix'&& pnrules !='Add Suffix'){return false;}
										$('#popupSelect').append('<select multiple="multiple" size="10" name="popupSel">'+option+'</select><br><button onclick="submitdata('+x.id+');" class="btn btn-default btn-block">Submit data</button>');
										var demo1 = $('[name=popupSel]').bootstrapDualListbox();
										$('#popupSelect').show();
										$('#testSelection').modal('show');
									}
								})
								.appendTo("#"+x.id);
							$('#txt_'+x.id).focus();
						}
					}
						 $(document).on("blur","#txt_"+x.id, function(){
							//console.log("after"+x.id);
							var name = $(this).val();
							$("#"+x.id).text(name);
							
						});
						 /* $(document).on("blur","#sel_"+x.id, function(){
							console.log("sel id"+x.id);
							var name = $(this).val();
							$("#"+x.id).text(name);
							
						}); */
						 $( ".inputCls" ).on( "blur", function() {
							 //alert("inputCls");
						 });						 
					
			    } );
		  
	}
	function sparkVariable1(){
		/*console.log($('#souceFile option:selected').val());
		console.log($('#targetFile option:selected').val());
		console.log($("#skeys").text());
		console.log($("#tkeys").text());*/
		params = getParams();
		prjName = unescape(params["projectName"]);
		console.log(prjName);
		tstName = unescape(params["testName"]);
		console.log(tstName);
		$.ajax({
			type: 'post',
			url: localUrl+'scrvariablesave',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"srcKeys":$("#skeys").text(),"tgtKeys" :$("#tkeys").text(),"file1": $('#souceFile option:selected').val() ,"file2": $('#targetFile option:selected').val(),"prjName":prjName, "tstName":tstName}),
			success: function(response){
				console.log(response.message);
				testID=response.message;
				window.location.assign('/jumbo/views/JUMBO_HTML_UI/theme-quasar/functions.html');
				//window.location.assign('statistics.html');
				//window.location.replace('/jumbo/views/JUMBO_HTML_UI/theme-quasar/statistics.html?projectName='+prjName+'&testID='+testID);
				//$("#tgtCol").append(optionDB);        			
			},
			error: function(){console.log("HAila Error");}
		});
	}
	
	function getFileDetails(filename,proName,Type,dbName,IP,Schema)
	{
		console.log($(filename).val()+'***');
		console.log($(proName).val()+'***');
		
		$.ajax({
			type: 'post',
			url: localUrl+'getFileDetails',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"filename" : $(filename).val(), "proName" : $(proName).val()}),
			success: function(response){
				$(Type).empty();
				$(Type).append(response.type);
				
				$(dbName).empty();
				$(dbName).append(response.dbName);
				
				$(IP).empty();
				$(IP).append(response.ipaddr);
				
				$(Schema).empty();
				$(Schema).append(response.schema);
			},
			error: function(){bootbox.alert("Error");}
		});
		 $("#toggle2").prop("checked", false);
		 $("#ftrScreen").hide();
		 $("[id^='srcfilter_']").remove();
		 $("[id^='tgtfilter_']").remove();
	}
	
	function toggle2operation()
	{
		//console.log($("#toggle2").text());
		if($("#toggle2").is(":checked"))
		{
			//$("#toggle2").html('');
			//$("#toggle2").append('ON');
			$("#ftrScreen").show();
		}
		else
		{
			//$("#toggle2").html('');
			//$("#toggle2").append('OFF');
			 $("#ftrScreen").hide();
			 $("[id^='srcfilter_']").remove();
			 $("[id^='tgtfilter_']").remove();
		}
	}

	var n=0;
	function addSrcFilter(){
		n++;
		var sel='';
		var rowCount = $('#jTable > tbody > tr').length;
		console.log("rowCount >> "+rowCount);
		var cols='';
		for(var k=0;k<rowCount;k++){			
			cols += '<option>'+$('#colid_'+k+'_2').text()+'</option>';
		}
		console.log("cols >>>"+cols);
		var str='<div class="col-lg-12" id="srcfilter_'+n+'"><div class="col-lg-1" ><input type="checkbox" id="fltChk_'+n+'"></div><div class="col-lg-4"><select id="ftrSel_'+n+'" onchange="changeSrcFlt(this);" style="width:140px">'+cols+'</select></div>';
		if($('#colid_0_3').text()=='int' || $('#colid_0_3').text()=='float'){
			sel='<div class="col-lg-4" ><select id="fltOpt_'+n+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>'+
			'</select></div>';
		}else if($('#colid_0_3').text() =='string'){
			sel='<div class="col-lg-4" ><select id="fltOpt_'+n+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>'+
			'</select></div>';
		}else if($('#colid_0_3').text() =='date'){
			sel='<div class="col-lg-4" ><select id="fltOpt_'+n+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'</select></div>';
		}
		
		str += sel +'<div class="col-lg-3" style="width:100px;padding-bottom:5px;padding-left:0px;"><input id="srcFtrTxt_'+n+'" type ="text" style="width:125px;height:25px;"></div></div>';
		
		$('#srcFtr').append(str);
		$("#ftrSel_"+n).select2({
			allowClear: true,
			  width: "130px"
			});
		$("#fltOpt_"+n).select2({
			allowClear: true,
			  width: "120px"
			});
	}
	
	var m=0;
	function addTgtFilter(){
		m++;
		var sel='';
		var rowCount = $('#jTable > tbody > tr').length;
		console.log("rowCount >> "+rowCount);
		var cols='';
		for(var k=0;k<rowCount;k++){			
			cols += '<option>'+$('#colid_'+k+'_6').text()+'</option>';
		}
		console.log("cols >>>"+cols);
		var str='<div class="col-lg-12" id="tgtfilter_'+m+'"><div class="col-lg-1" ><input type="checkbox" id="tfltChk_'+m+'"></div><div class="col-lg-4"><select id="tftrSel_'+m+'" onchange="changeTgtFlt(this);" style="width:140px">'+cols+'</select></div>';
		if($('#colid_0_7').text()=='int' || $('#colid_0_7').text()=='float'){
			sel='<div class="col-lg-4" ><select id="tfltOpt_'+m+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>'+
			'</select></div>';
		}else if($('#colid_0_7').text() =='string'){
			sel='<div class="col-lg-4" ><select id="tfltOpt_'+m+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>'+
			'</select></div>';
		}else if($('#colid_0_7').text() =='date'){
			sel='<div class="col-lg-4" ><select id="tfltOpt_'+m+'" style="width:130px">'+
			'<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'</select></div>';
		}
		str += sel +'<div class="col-lg-3" style="width:100px;padding-bottom:5px;padding-left:0px;"><input id="tgtFtrTxt_'+m+'" type ="text" style="width:125px;height:25px;"></div></div>';
		
		$('#tgtFtr').append(str);
		$("#tftrSel_"+m).select2({
			allowClear: true,
			  width: "130px"
			});
		$("#tfltOpt_"+m).select2({
			allowClear: true,
			  width: "120px"
			});
	}
	
	function changeSrcFlt(id){
		var tt=id.id;
		var tex=$("#"+tt+" option:selected").text();
		
		var tableRow = $("tr:contains('"+tex+"')");
		console.log("tableRow >> "+tableRow.text());
		var rowText = tableRow.text();
		rowText = rowText.substring(tex.length,rowText.length);
		//console.log("rowText >> "+rowText);
		/* var nn = id.selectedIndex;
		var ss = document.getElementById("srcDT_"+nn).value;*/
		var num = tt.substring(tt.indexOf("_")+1, tt.length); 
		if(rowText.startsWith('int') || rowText.startsWith('float')){
			var sel='<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>';
			$('#fltOpt_'+num).html(sel);
		}else if(rowText.startsWith('string')){
			console.log("stringgg "+tt);
			var sel='<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>';
			$("#fltOpt_"+num).html(sel);
		}
	}
	function changeTgtFlt(id){
		var tt=id.id;
		var tex=$("#"+tt+" option:selected").text();
		
		var tableRow = $("tr:contains('"+tex+"')");
		console.log("tableRow >> "+tableRow.text());
		var rowText = tableRow.text().trim();
		//rowText = rowText.substring(tex.length,rowText.length);
		//console.log("rowText >> "+rowText);
		/* var nn = id.selectedIndex;
		var ss = document.getElementById("srcDT_"+nn).value;*/
		var num = tt.substring(tt.indexOf("_")+1, tt.length); 
		if(rowText.endsWith('int') || rowText.endsWith('float')){
			var sel='<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Greater than</option>'+
			'<option>Greater than or Equals</option>'+
			'<option>Less than</option>'+
			'<option>Less than or Equals</option>'+
			'<option>Between</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>';
			$('#tfltOpt_'+num).html(sel);
		}else if(rowText.endsWith('string')){
			//console.log("stringgg "+tt);
			var sel='<option>Equals</option>'+
			'<option>Not Equals</option>'+
			'<option>Begins With</option>'+
			'<option>Ends With</option>'+
			'<option>Doesnot Begins With</option>'+
			'<option>Doesnot Ends With</option>'+
			'<option>Contains</option>'+
			'<option>Doesnot Contains</option>'+
			'<option>IN</option>';
			$("#tfltOpt_"+num).html(sel);
		}
	}
	function removeSrcFilter(){
		if(n==0){
			bootbox.alert("No record to remove!!");
			return;
		}
		var rcnt=0;
		for(var r=1;r<=n;r++){
			//console.log($("#fltChk_" + r).is(":checked") );
			if(($('#fltChk_' + r).is(":checked") == true)){
				$("#srcfilter_"+r).remove();
				rcnt++;
				}
			}
		if(rcnt==n){n=0;}
		if(rcnt==0){bootbox.alert("Please select atleast one record to remove.");}
	}

	function removeTgtFilter(){
		if(m==0){
			bootbox.alert("No record to remove!!");
			return;
		}
		var rcnt=0;
		for(var r=1;r<=m;r++){
			//console.log($("#tfltChk_" + r).is(":checked") );
			if(($('#tfltChk_' + r).is(":checked") == true)){
				$("#tgtfilter_"+r).remove();
				rcnt++;
				}
			}
		if(rcnt==m){m=0;}
		if(rcnt==0){bootbox.alert("Please select atleast one record to remove.");}
	}
	
	function removeAll(){		
		
		var totalCheckboxes = $('input:checkbox.checkbox').length;

		 if ($("#jTable .checkboxkey:checked").length == 0 && $("#jTable .checkbox:checked").length == totalCheckboxes){
			 bootbox.alert("Select Alteast one Key to Proceed");
				return;
			} 
		
		if ($("#jTable .checkbox:checked").length == 0){
			bootbox.alert("Select Alteast one Record to Proceed");
			return;
		}
		var cnt = 0 ;
		$('input:checked').each(function() {
			if(this.id.includes("chkboxRmv_")){cnt++;}
		      });		
		bootbox.confirm({		    
		    message: "Do you want to remove the Selected ("+cnt+") Records ?",
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Confirm'
		        }
		    },
		 callback: function (result) {
		    	if(result){
		    		$('input:checked').each(function() {
		    			if(this.id.includes("chkboxRmv_")){
		    				$(this).closest('tr').remove();
		    			}
		    		});
		    	
		    	}
		    }
		});
		$("#selectAll").prop('checked',false);
	}
	
	function onNext(){
		
		var testName = $('#testName').val();
		if (testName.length == 0) {
			$('#txtValidation').show();							
		}
		else if (testName.substr(0,1) == "_") {
			bootbox.alert('Test Name cannot start with "_" ');	
		}else if(/^[0-9]*$/.test(testName) == true) {
			bootbox.alert('Test Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
		}else if(/^[a-zA-Z0-9_]*$/.test(testName) == false) {
			bootbox.alert('Test Name cannot be numeric and special characters \n It must contain only Alphabets \n or Alpha Numeric with "_" only');
		}
		else
		{
			$("#spin").spinner();
			var sourceFile = $('#souceFile').val();
			var targetFile = $('#targetFile').val();
			if(sourceFile == targetFile){
				bootbox.alert("Source and Target Files are Same!!!!");
				return;
			}
			var cnt = 0;
			var tdcnt = 0;
			$('.checkbox:checkbox:checked').each(function() {
				   var chkid = this.id;
				   var rownum = chkid.substring(chkid.indexOf("_")+1, chkid.length);
				   if($('#colid_'+rownum+'_6').text().trim() == "-" || $('#colid_'+rownum+'_2').text().trim() == "-"){
					   cnt++;				   
				   }
				   
				});
			$("#jTable tr td:contains(' - ')").each(function(){
				tdcnt++;
			});
			if(cnt > 1){
				bootbox.alert("Please Remove the Selected Records !!!");
				   return;
				  }
			if(tdcnt > 1){
				bootbox.alert("Please Remove the empty columns!!");
				return;
			}
			var keycnt=0;
			var src_keys_selected='';
			var tgt_keys_selected='';
			$('.checkboxkey:checkbox:checked').each(function() {
				keycnt++;
				 var rowid = this.id;
				 var rowNum = rowid.substring(rowid.indexOf("_")+1, rowid.length);
				 src_keys_selected += $('#colid_'+rowNum+'_2').text()+" --> "+$('#colid_'+rowNum+'_3').text()+"," ;
				 tgt_keys_selected += $('#colid_'+rowNum+'_6').text()+" --> "+$('#colid_'+rowNum+'_7').text()+"," ;
			});
			if(keycnt == 0){
				bootbox.alert("Please select atleast one key !!!");
				   return;
				  }
			var datacnt=0;
			var src_rules_selected = '';
			var tgt_rules_selected = '';
			var src_emp = 0;
			var tgt_emp = 0;
			$('#jTable > tbody  > tr').each(function() {
				 	var rowid = this.id;
				    var rowNum = rowid.substring(rowid.indexOf("_")+1, rowid.length);
				   if($('#colid_'+rowNum+'_3').text().trim() !=  $('#colid_'+rowNum+'_7').text().trim()){
					   datacnt++;
					   $(this).css("background-color", "#ff0000");				  
				   }
				   if($('#colid_'+rowNum+'_4').text().length > 0 ){
					   if($('#colid_'+rowNum+'_5').text().trim() == null || $('#colid_'+rowNum+'_5').text().trim() == ''){
						   src_emp++;
					   }
					   src_rules_selected += $('#colid_'+rowNum+'_2').text().trim()+" --> "+$('#colid_'+rowNum+'_4').text().trim()+" --> "+$('#colid_'+rowNum+'_5').text().trim()+",";
				   }
				   if($('#colid_'+rowNum+'_8').text().length > 0 ){
					   if($('#colid_'+rowNum+'_9').text().trim() == null || $('#colid_'+rowNum+'_9').text().trim() == ''){
						   tgt_emp++;
					   }
					   tgt_rules_selected += $('#colid_'+rowNum+'_6').text().trim()+" --> "+$('#colid_'+rowNum+'_8').text().trim()+" --> "+$('#colid_'+rowNum+'_9').text().trim()+",";
				   }
				   
			});
			if(datacnt > 0){
				bootbox.alert("Data Type Mismatch !!!");
				 return;
			}
			if(src_emp > 0){
				bootbox.alert("Enter the Source Rule Value !!!");
				 return;
			}
			if(tgt_emp > 0){
				bootbox.alert("Enter the Target Rule Value !!!");
				 return;
			}
			if($('#testName').val() == null || $('#testName').val() ==""){
			$('#txtValidation').show();
			return;
			}
			var src_filter_selected='';
			var tgt_filter_selected='';
			var sCnt=0;
			$('#srcFtr > div').map(function() {
			    var id = this.id;
			    var selId = id.substring(id.indexOf("_")+1, id.length);
			    var srcFtrVal = $('#srcFtrTxt_'+selId).val();
			    if(srcFtrVal == null || srcFtrVal ==''){
			    	sCnt++;
			    }
			    src_filter_selected += jQuery("#ftrSel_"+selId+" option:selected").text()+" --> "+jQuery("#fltOpt_"+selId+" option:selected").text()+" --> "+srcFtrVal+",";
			});
			if(sCnt > 0){
				bootbox.alert("Enter the Source Filter Value");
		    	return;
			}
			var tCnt = 0 ;
			$('#tgtFtr > div').map(function() {
			    var id = this.id;
			    var selId = id.substring(id.indexOf("_")+1, id.length);
			    var tgtFtrVal = $('#tgtFtrTxt_'+selId).val();
			    if(tgtFtrVal == null || tgtFtrVal ==''){
			    	tCnt++;
			    }
			    tgt_filter_selected += jQuery("#tftrSel_"+selId+" option:selected").text()+" --> "+jQuery("#tfltOpt_"+selId+" option:selected").text()+" --> "+tgtFtrVal+",";
			});
			if(tCnt > 0){
				bootbox.alert("Enter the Target Filter Value");
		    	return;
			}
			$('#srcPrjName').html($('#hidPrjName').val());
			$('#tgtPrjName').html($('#hidPrjName').val());
			$('#srcFileName').html($('#souceFile').val());
			$('#tgtFileName').html($('#targetFile').val());
			$('#srcKeySel').html(src_keys_selected);
			$('#tgtKeySel').html(tgt_keys_selected);
			if(src_rules_selected==''){src_rules_selected='NA'}
			$('#srcRuleSel').html(src_rules_selected);
			if(tgt_rules_selected==''){tgt_rules_selected='NA'}
			$('#tgtRuleSel').html(tgt_rules_selected);
			if(src_filter_selected==''){src_filter_selected='NA'}
			$('#srcFtrSel').html(src_filter_selected);
			if(tgt_filter_selected==''){tgt_filter_selected='NA'}
			$('#tgtFtrSel').html(tgt_filter_selected);
			selectResult();		
			$('#tableDiv').hide();
			$('#filterDiv').hide();
			$('#nxtDiv').hide();
		}
	}
	
	// Display the email ids based on project selection.
	function selectResult(){
		var projName = $('#hidPrjName').val();
		console.log("projName  :  "+projName);
		$.ajax({
			type: 'post',
			url: localUrl+'displayEmailId',
			contentType: "application/json; charset=utf-8",
			//dataType: "json",
			data: JSON.stringify({'proName' : projName}),
			//data: {'uName':$('#uname').val(),'uPass':$('#upass').val()},
			success: function(response){			
				console.log("Response : "+response);
				$('#toEmailAddr').val(response);
				$('#confirmparameter').show();
				//$('#testSelection').modal('show');
			},
			error: function(response){
				
			}
		});
		
	}
	
	function textValid(){
		$('#txtValidation').hide();
	}	
	function backPage(){
		$('#confirmparameter').hide();
		$('#tableDiv').show();
		$('#filterDiv').show();
		$('#nxtDiv').show();
	}
	
	function backPage12(){
		$('#confirmparameter').hide();
		$('#tableDiv').show();
		$('#filterDiv').show();
		$('#nxtDiv').show();
		menuNewTest();
	}
	
	function columnExecute(value) {
			var prjName = $('#hidPrjName').val();
			var tstName = $('#testName').val();
			var srcTgtKeys = $("#srcKeySel").text()+"##"+$("#tgtKeySel").text();
			var srcTgtFiles = $('#souceFile option:selected').val()+"##"+$('#targetFile option:selected').val();
			//var srcTgtRules = $("#srcRuleSel").text()+"##"+$("#tgtRuleSel").text();
			var srcrules ='';
			var tgtrules ='';
			var srcTgtRules = '';
			if(srChgDt =="")srChgDt ="NA,";
			if(tgChgDt =="")tgChgDt ="NA,";
			var ChgDt = srChgDt +"##"+	tgChgDt;	
			var srcTgtFilters = $("#srcFtrSel").text()+"##"+$("#tgtFtrSel").text();
			
			var srcMapCol = '';
			var tgtMapCol = '';
			var srcFilterApplied = '';
			var tgtFilterApplied = '';
			var srcRulesApplied = '';
			var tgtRulesApplied = '';
			var srcTgtRuleApp = '';
			var srcTgtFilterApp = '';
			$('#jTable > tbody  > tr').each(function() {
				var rowid = this.id;
				var rowNum = rowid.substring(rowid.indexOf("_")+1, rowid.length);
				srcMapCol += $('#colid_'+rowNum+'_2').text().trim()+" --> "+$('#colid_'+rowNum+'_3').text().trim()+",";
				if($('#colid_'+rowNum+'_4').text().trim() == ""){
				srcrules += $('#colid_'+rowNum+'_2').text().trim()+",";
				}
				tgtMapCol += $('#colid_'+rowNum+'_6').text().trim()+" --> "+$('#colid_'+rowNum+'_7').text().trim()+",";
				if($('#colid_'+rowNum+'_8').text().trim() == ""){
				tgtrules += $('#colid_'+rowNum+'_6').text().trim()+",";
				}
				var rule = $('#colid_'+rowNum+'_4').text().trim();
				var val = $('#colid_'+rowNum+'_5').text().trim();
				if($('#colid_'+rowNum+'_4').text().trim() != ""){
					srcRulesApplied += $('#colid_'+rowNum+'_2').text().trim();
				if(rule == "Add"){
					srcRulesApplied += " + "+val;
				}else if(rule == "Subtract"){
					srcRulesApplied += " - "+val;
				}else if(rule == "Multiply with"){
					srcRulesApplied += " * "+val;
				}else if(rule == "Divide By"){
					srcRulesApplied += " * "+val;
				}else if(rule == "Modulus"){
					srcRulesApplied += " % "+val;
				}else if(rule == "Concat"){
					srcRulesApplied = "CONCAT("+val+")";
				}
				else if(rule == "Add Prefix"){
					srcRulesApplied = "CONCAT("+val+",'')";
				}else if(rule == "Add Suffix"){
					srcRulesApplied = "CONCAT('',"+val+")";
				}
				
				srcrules += srcRulesApplied+" AS "+$('#colid_'+rowNum+'_2').text().trim()+", ";
				srcRulesApplied += ", ";
				}
				var tval = $('#colid_'+rowNum+'_9').text().trim();
				if($('#colid_'+rowNum+'_8').text().trim() != ""){
					tgtRulesApplied += $('#colid_'+rowNum+'_6').text().trim();
					if($('#colid_'+rowNum+'_8').text().trim() == "Add"){
						tgtRulesApplied += " + "+tval;
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Subtract"){
						tgtRulesApplied += " - "+tval;
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Multiply with"){
						tgtRulesApplied += " * ";
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Divide By"){
						tgtRulesApplied += " * "+tval;
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Modulus"){
						tgtRulesApplied += " % "+tval;
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Concat"){
						tgtRulesApplied = "CONCAT("+tval+")";
					}
					else if($('#colid_'+rowNum+'_8').text().trim() == "Add Prefix"){
						tgtRulesApplied = "CONCAT("+tval+",'')";
					}else if($('#colid_'+rowNum+'_8').text().trim() == "Add Suffix"){
						tgtRulesApplied = "CONCAT('',"+tval+")";
					}
					
					tgtrules += tgtRulesApplied+" AS "+$('#colid_'+rowNum+'_6').text().trim()+", ";
					tgtRulesApplied += ",";
				}
			});
			
			srcrules = srcrules.substring(0,srcrules.length-1);
			tgtrules = tgtrules.substring(0,tgtrules.length-1);
			console.log("srcrules ?? >"+srcrules);
			console.log("tgtrules ?? >"+tgtrules);
			console.log("srcMapCol >>> "+srcMapCol);
			console.log("tgtMapCol >>> "+tgtMapCol);
			console.log("srcRulesApplied >>> "+srcRulesApplied);
			console.log("tgtRulesApplied >>> "+tgtRulesApplied);
			
			if(srcRulesApplied == "")
				srcRulesApplied = "NA";
			if(tgtRulesApplied == "")
				tgtRulesApplied = "NA";
			
			srcTgtRuleApp = srcRulesApplied +"##"+ tgtRulesApplied;
			
			var srcTgtMap=srcMapCol+"##"+tgtMapCol;
			srcTgtRules = srcrules +"##"+ tgtrules;
			console.log("srcTgtRules >>>> "+srcTgtRules);
			$('#srcFtr > div').map(function() {
			    var id = this.id;
			    var selId = id.substring(id.indexOf("_")+1, id.length);
			    var srcfltSelVal = $('#ftrSel_'+selId).val();
			    var srcfltOptVal = $('#fltOpt_'+selId).val();
			    var srcFtrTxtVal = $('#srcFtrTxt_'+selId).val();
			    
				var tableRow = $("#jTable tr:contains('"+srcfltSelVal+"')");
				console.log("tableRow >> "+tableRow.text());
				var RowId = tableRow.attr('id');
				var rowNum = RowId.substring(RowId.indexOf("_")+1, RowId.length);
				var src_dt = $('#colid_'+rowNum+'_3').text().trim();
				var rowText = tableRow.text();
				rowText = rowText.substring(srcfltSelVal.length,rowText.length);
				console.log("rowText <<<< "+rowText);
			    srcFilterApplied += srcfltSelVal;
			    if(src_dt == 'int' || src_dt == 'float'){
			    if(srcfltOptVal == "Equals"){
			    	srcFilterApplied += " = "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Not Equals"){
			    	srcFilterApplied += " != "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Greater than"){
			    	srcFilterApplied += " > "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Greater than or Equals"){
			    	srcFilterApplied += " >= "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Less than"){
			    	srcFilterApplied += " < "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Less than or Equals"){
			    	srcFilterApplied += " <= "+srcFtrTxtVal;
			    }else if(srcfltOptVal == "Between"){
			    	var SplitValues = srcFtrTxtVal.split(',');
			    	if(SplitValues.length == 2)
					{
			    		srcFilterApplied += " BETWEEN "+SplitValues[0]+" AND "+SplitValues[1];
					}
			    }
			    else if(srcfltOptVal == "Begins With")
			    	srcFilterApplied += " LIKE '"+srcFtrTxtVal+"%'";
				else if(srcfltOptVal == "Ends With")
					srcFilterApplied += " LIKE '%"+srcFtrTxtVal+"'";
				else if(srcfltOptVal == "Doesnot Begins With")
					srcFilterApplied += " NOT LIKE '"+srcFtrTxtVal+"%'";
				else if(srcfltOptVal == "Doesnot Ends With")
					srcFilterApplied += " NOT LIKE '%"+srcFtrTxtVal+"'";
				else if(srcfltOptVal == "Contains")
					srcFilterApplied += " LIKE '%"+srcFtrTxtVal+"%'";
				else if(srcfltOptVal == "Doesnot Contains")
					srcFilterApplied += " NOT LIKE '%"+srcFtrTxtVal+"%'";
				else if(srcfltOptVal == "IN")
				{
					srcFilterApplied += " IN ("; 
					SplitValues = srcFtrTxtVal.split(',');
					for(i=0;i<SplitValues.length;i++)
						srcFilterApplied += "'"+SplitValues[i]+"',";
					srcFilterApplied = srcFilterApplied.substring(0,rulesVal.length-1);
					srcFilterApplied = srcFilterApplied +")"
				}
			    }else if(src_dt == 'string'){
			    	
			    	if(srcfltOptVal == "Equals")
			    		srcFilterApplied += " = '"+srcFtrTxtVal+"'";
					else if(srcfltOptVal == "Not Equals")
						srcFilterApplied += " != '"+srcFtrTxtVal+"'";
					else if(srcfltOptVal == "Begins With")
						srcFilterApplied += " LIKE '"+srcFtrTxtVal+"%'";
					else if(srcfltOptVal == "Ends With")
						srcFilterApplied += " LIKE '%"+srcFtrTxtVal+"'";
					else if(srcfltOptVal == "Doesnot Begins With")
						srcFilterApplied += " NOT LIKE '"+srcFtrTxtVal+"%'";
					else if(srcfltOptVal == "Doesnot Ends With")
						srcFilterApplied += " NOT LIKE '%"+srcFtrTxtVal+"'";
					else if(srcfltOptVal == "Contains")
						srcFilterApplied += " LIKE '%"+srcFtrTxtVal+"%'";
					else if(srcfltOptVal == "Doesnot Contains")
						srcFilterApplied += " NOT LIKE '%"+srcFtrTxtVal+"%'";
					else if(srcfltOptVal == "IN")
					{
						srcFilterApplied += " IN ("; 
						SplitValues = srcFtrTxtVal.split(',');
						for(i=0;i<SplitValues.length;i++)
							srcFilterApplied += "'"+SplitValues[i]+"',";
						srcFilterApplied = srcFilterApplied.substring(0,srcFilterApplied.length-1);
						srcFilterApplied = srcFilterApplied+")"
					}
			    }
			});
			
			console.log("srcFilterApplied --->> "+srcFilterApplied);
			
			$('#tgtFtr > div').map(function() {
			    var id = this.id;
			    var selId = id.substring(id.indexOf("_")+1, id.length);
			    var tgtfltSelVal = $('#tftrSel_'+selId).val();
			    var tgtfltOptVal = $('#tfltOpt_'+selId).val();
			    var tgtFtrTxtVal = $('#tgtFtrTxt_'+selId).val();
			    
				var tableRow = $("#jTable tr:contains('"+tgtfltSelVal+"')");
				var RowId = tableRow.attr('id');
				var rowNum = RowId.substring(RowId.indexOf("_")+1, RowId.length);
				var tg_dt = $('#colid_'+rowNum+'_7').text().trim();
				console.log("tableRow >> "+tableRow.text());
				var rowText = tableRow.text();
				rowText = rowText.substring(tgtfltSelVal.length,rowText.length);
				console.log("rowText <<<< "+rowText);
			    tgtFilterApplied += tgtfltSelVal;
			    if(tg_dt == 'int' || tg_dt == 'float'){
			    if(tgtfltOptVal == "Equals"){
			    	tgtFilterApplied += " = "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Not Equals"){
			    	tgtFilterApplied += " != "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Greater than"){
			    	tgtFilterApplied += " > "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Greater than or Equals"){
			    	tgtFilterApplied += " >= "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Less than"){
			    	tgtFilterApplied += " < "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Less than or Equals"){
			    	tgtFilterApplied += " <= "+tgtFtrTxtVal;
			    }else if(tgtfltOptVal == "Between"){
			    	var SplitValues = tgtFtrTxtVal.split(',');
			    	if(SplitValues.length == 2)
					{
			    		tgtFilterApplied += " BETWEEN "+SplitValues[0]+" AND "+SplitValues[1];
					}
			    }
			    else if(tgtfltOptVal == "Begins With")
			    	tgtFilterApplied += " LIKE '"+tgtFtrTxtVal+"%'";
				else if(tgtfltOptVal == "Ends With")
					tgtFilterApplied += " LIKE '%"+tgtFtrTxtVal+"'";
				else if(tgtfltOptVal == "Doesnot Begins With")
					tgtFilterApplied += " NOT LIKE '"+tgtFtrTxtVal+"%'";
				else if(tgtfltOptVal == "Doesnot Ends With")
					tgtFilterApplied += " NOT LIKE '%"+tgtFtrTxtVal+"'";
				else if(tgtfltOptVal == "Contains")
					tgtFilterApplied += " LIKE '%"+tgtFtrTxtVal+"%'";
				else if(tgtfltOptVal == "Doesnot Contains")
					tgtFilterApplied += " NOT LIKE '%"+tgtFtrTxtVal+"%'";
				else if(tgtfltOptVal == "IN")
				{
					tgtFilterApplied += " IN ("; 
					SplitValues = tgtFtrTxtVal.split(',');
					for(i=0;i<SplitValues.length;i++)
						tgtFilterApplied += "'"+SplitValues[i]+"',";
					tgtFilterApplied = tgtFilterApplied.substring(0,rulesVal.length-1);
					tgtFilterApplied = tgtFilterApplied +")"
				}
			    }else if(tg_dt == 'string'){
			    	
			    	if(tgtfltOptVal == "Equals")
			    		tgtFilterApplied += " = '"+tgtFtrTxtVal+"'";
					else if(tgtfltOptVal == "Not Equals")
						tgtFilterApplied += " != '"+tgtFtrTxtVal+"'";
					else if(tgtfltOptVal == "Begins With")
						tgtFilterApplied += " LIKE '"+tgtFtrTxtVal+"%'";
					else if(tgtfltOptVal == "Ends With")
						tgtFilterApplied += " LIKE '%"+tgtFtrTxtVal+"'";
					else if(tgtfltOptVal == "Doesnot Begins With")
						tgtFilterApplied += " NOT LIKE '"+tgtFtrTxtVal+"%'";
					else if(tgtfltOptVal == "Doesnot Ends With")
						tgtFilterApplied += " NOT LIKE '%"+tgtFtrTxtVal+"'";
					else if(tgtfltOptVal == "Contains")
						tgtFilterApplied += " LIKE '%"+tgtFtrTxtVal+"%'";
					else if(tgtfltOptVal == "Doesnot Contains")
						tgtFilterApplied += " NOT LIKE '%"+tgtFtrTxtVal+"%'";
					else if(tgtfltOptVal == "IN")
					{
						tgtFilterApplied += " IN ("; 
						SplitValues = tgtFtrTxtVal.split(',');
						for(i=0;i<SplitValues.length;i++)
							tgtFilterApplied += "'"+SplitValues[i]+"',";
						tgtFilterApplied = tgtFilterApplied.substring(0,tgtFilterApplied.length-1);
						tgtFilterApplied = tgtFilterApplied+")"
					}
			    }
			});
			
			console.log("tgtFilterApplied --->> "+tgtFilterApplied);
			
			if(srcFilterApplied == "")
				srcFilterApplied = "NA";
			if(tgtFilterApplied == "")
				tgtFilterApplied = "NA";
			
			srcTgtFilterApp = srcFilterApplied + "##"+tgtFilterApplied;
			var allVals = [];
		    $('#filterexe :checked').each(function() {
		       allVals.push($(this).val());
		    });
		    $('#spinLoad').show();
			
		    if (value.id == "saveandexecutelater") {
		    	$.ajax({
					type: 'post',
					url: localUrl+'scrvariablesave',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					data: JSON.stringify({"srcKeys":srcTgtKeys,"file1":srcTgtFiles ,"prjName":prjName, "tstName":tstName, "srcRules":srcTgtRules,"srcFilters":srcTgtFilters,"srcMapCols":srcTgtMap,"srcRuleApp":srcTgtRuleApp,"srcFilterApp":srcTgtFilterApp,"filterExecute":allVals.toString()}),
					success: function(response){
						$('#spinLoad').hide();
						bootbox.alert('Test ID : '+response.message+' saved successfully.', function(){backPage12();}); 
						
					},
					error: function(){
						$('#spinLoad').hide();
						bootbox.alert("Error", function(){backPage12();});						
					}
				});
		    }
		    else if (value.id == "confirmandexecute") {
		    	var emailAddress = $('#toEmailAddr').val();
				if($('#emailIdCheck').is(':checked') ){
					if(emailAddress.length == 0) {
						bootbox.alert("Email address should not be blank");
					} else {				
						scrExecute(emailAddress,srcTgtKeys,srcTgtFiles,prjName,tstName,srcTgtRules,srcTgtFilterApp,srcTgtMap,srcTgtRuleApp,srcTgtFilters,allVals,ChgDt);				
					}
				} else {
					scrExecute(emailAddress,srcTgtKeys,srcTgtFiles,prjName,tstName,srcTgtRules,srcTgtFilterApp,srcTgtMap,srcTgtRuleApp,srcTgtFilters,allVals,ChgDt);
				}
		    }
		}									
	
	function sendEmailTo(emailAddress,prjName,testId){
		//alert("sendEmailTo");
		$.ajax({
			type: 'post',
			url: localUrl+'sendEmailToAddr',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"toMailId":emailAddress, "projectName":prjName, "testId":testId}),
			success: function(response){			
				bootbox.alert(response.message);	
			},
			
		});
	}
	
	function submitdata(xid){		
		$('#'+xid.id).text($('[name="popupSel"]').val());
		$('#testSelection').modal('hide');
	}
	function closeBox(){
		$('#popupSelect').html('');
	}
/**********************Re Run  F U N C T I O N S**************************/
	function displayStats(response,projName,testID,testName,testDate,testTime){
		
		$('#spinLoad').show();		 
		 if(response.statsData){			
			 if(response.statsData.value15 || response.statsData.value11){
				 if(response.statsData.value15 > "0" || response.statsData.value11 > "0"){
					 $("#includeGraph").show();
					 $("#misSource").show();
					 var ctx = document.getElementById("myChartM");
					 var myChart = new Chart(ctx, {
					     type: 'pie',
					     data: {
					         labels: ["Passed", "Mismatch"],
					         datasets: [{
					             label: 'Passed/Mismatches in Source',
					             data: [response.statsData.value11, response.statsData.value1-response.statsData.value11],
					             backgroundColor: [
					                 'rgba(255,99,132,1)',
					                 'rgba(54, 162, 235, 1)'
					             ],
					             borderWidth: 1
					         }]
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
				 }
			 }
			 $('#spinLoad').hide();	
			 $('#spinLoad').show();	
			 if(response.statsData.value7 || response.statsData.value5)
			 {
				 if(response.statsData.value7 > "0" || response.statsData.value5 > "0") {
					 $("#includeGraph").show();
					 $("#dupSource").show();
					 var ctx1 = document.getElementById("myChart1");
					 var myChart1 = new Chart(ctx1, {
					     type: 'pie',
					     data: {
					         labels: ["Unique", "Duplicate"],
					         datasets: [{
					             label: 'Unique/Duplicates in Source',
					             data: [response.statsData.value7, response.statsData.value3],
					             backgroundColor: [
					                 'rgba(75, 192, 192, 1)',
					                 'rgba(153, 102, 255, 1)',
					                 'rgba(200, 24, 215, 1)'
					             ],
					             borderWidth: 1
					         }]
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
				 }
			 }
		
			 if(response.statsData.value7 || response.statsData.value13)
			 {
				 if(response.statsData.value7 > "0" || response.statsData.value13 > "0"){
					 $("#includeGraph").show();
					 $("#orpSource").show();
					 var ctx2 = document.getElementById("myChart2");
					 var myChart2 = new Chart(ctx2, {
					     type: 'pie',
					     data: {
					         labels: ["Common", "Orphan"],
					         datasets: [{
					             label: 'Common/Orphan Records in Source',
					             data: [response.statsData.value11 , response.statsData.value13],
					             backgroundColor: [
					                 'rgba(252, 223, 108, 1)',
					                 'rgba(56, 80, 237, 1)'
					             ],
					             borderWidth: 1
					         }]
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
			 	}
			 }
		
			 if(response.statsData.value16 || response.statsData.value12){
				 if(response.statsData.value16 > "0" || response.statsData.value12 > "0"){
					 $("#includeGraph").show();
					 $("#misTarget").show();
					 var ctx3 = document.getElementById("myChart3");
					 var myChart3 = new Chart(ctx3, {
					     type: 'pie',
					     data: {
					         labels: ["Passed", "Mismatch"],
					         datasets: [{
					             label: 'Passed/Mismatches in Target',
					             data: [response.statsData.value12, response.statsData.value2-response.statsData.value12],
					             backgroundColor: [
					                 'rgba(255,99,132,1)',
					                 'rgba(54, 162, 235, 1)'
					             ],
					             borderWidth: 1
					         }]
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
			 	}	 
			 }
		
			 if(response.statsData.value8 || response.statsData.value6){
				 if(response.statsData.value8 > "0" || response.statsData.value8 > "0"){
					 $("#includeGraph").show();
					 $("#dupTarget").show();
					 var ctx4 = document.getElementById("myChart4");
					 var myChart4 = new Chart(ctx4, {
					     type: 'pie',
					     data: {
					         labels: ["Unique", "Duplicate"],
					         datasets: [{
					             label: 'Unique/Duplicates in Target',
					             data: [response.statsData.value8, response.statsData.value4],
					             backgroundColor: [
					                 'rgba(75, 192, 192, 1)',
					                 'rgba(153, 102, 255, 1)',
					                 'rgba(200, 24, 215, 1)'
					             ],
					             borderWidth: 1
					         }],			   
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
				 }
			 }
		
			 if(response.statsData.value8 || response.statsData.value14){
				 if(response.statsData.value8 > "0" || response.statsData.value14 > "0"){
					 $("#includeGraph").show();
					 $("#orpTarget").show();
					 var ctx5 = document.getElementById("myChart5");
					 var myChart5 = new Chart(ctx5, {
					     type: 'pie',
					     data: {
					         labels: ["Common", "Orphan"],
					         datasets: [{
					             label: 'Common/Orphan Records in Target',
					             data: [response.statsData.value12, response.statsData.value14],
					             backgroundColor: [
					                 'rgba(252, 223, 108, 1)',
					                 'rgba(56, 80, 237, 1)'
					             ],
					             borderWidth: 1
					         }]
					     },
					 	options: {
					 			legend: {
					                   display: true,
					                   position: 'bottom',
					                   fullWidth: false,
					                   labels: {
					                      boxWidth: 7
					                   }
					                }
					 		}
					     
					 });
				 }
			 }
		
			 if(response.statsData.value15 && response.statsData.value15cols){
				 				 
				 var ctx51 = document.getElementById("myChart51");
				 var myChart51 = new Chart(ctx51, {
				     type: 'bar',
				     data : {
				     labels: [response.statsData.value15cols[0],response.statsData.value15cols[1],response.statsData.value15cols[2],response.statsData.value15cols[3],response.statsData.value15cols[4],response.statsData.value15cols[5],response.statsData.value15cols[6]],
				     datasets: [
				 			{
				 				// label: "My First dataset",
				 				backgroundColor: [
				 					'rgba(255,99,132,0.85)',
				 					'rgba(54, 162, 235, 0.85)',
				 					'rgba(255, 206, 86, 0.85)',
				 					'rgba(75, 192, 192, 0.85)',
				 					'rgba(153, 102, 255, 0.85)'
				 				],
				 				borderWidth: 1,
				 				data: [response.statsData.value15[0],response.statsData.value15[1],response.statsData.value15[2],response.statsData.value15[3],response.statsData.value15[4],response.statsData.value15[5],response.statsData.value15[6]],
				 			}
				 		]
				 	},
				 	options: {
				 			legend: {
				                   display: false,
				                   position: 'bottom',
				                   fullWidth: false,
				                   labels: {
				                      boxWidth: 7
				                   }
				                }
				 		}
				     
				 });
			 }
			 
			 if(response.statsData.value16 && response.statsData.value16cols) {
				 var ctx52 = document.getElementById("myChart52");
				 var myChart52 = new Chart(ctx52, {
				     type: 'bar',
				     data : {
				     labels: [response.statsData.value16cols[0],response.statsData.value16cols[1],response.statsData.value16cols[2],response.statsData.value16cols[3],response.statsData.value16cols[4]],
				     datasets: [
				 			{
				 				// label: "My First dataset",
				 				backgroundColor: [
				 					'rgba(255,99,132,0.85)',
				 					'rgba(54, 162, 235, 0.85)',
				 					'rgba(255, 206, 86, 0.85)',
				 					'rgba(75, 192, 192, 0.85)',
				 					'rgba(153, 102, 255, 0.85)'
				 				],
				 				borderWidth: 1,
				 				data: [response.statsData.value15[0],response.statsData.value15[1],response.statsData.value15[2],response.statsData.value15[3],response.statsData.value15[4]],
				 			}
				 		]
				 	},
				 	options: {
				 			legend: {
				                   display: false,
				                   position: 'bottom',
				                   fullWidth: false,
				                   labels: {
				                      boxWidth: 7
				                   }
				                }
				 		}
				     
				 });			 
			 }
			 
			 
			 document.getElementById("myChartM").onclick = function(evt){
					var activePoints = myChart.getElementsAtEvent(evt);
					var firstPoint = activePoints[0];					
					if (firstPoint !== undefined)
					{
						var label = myChart.data.labels[firstPoint._index];
						var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
						if(label=="Passed")
							bootbox.alert(label + ": " + value);
						else
							$('#columnlevelmismatch1').modal('show');
					}
				};
		
			document.getElementById("myChart1").onclick = function(evt){
						var activePoints = myChart1.getElementsAtEvent(evt);
						var firstPoint = activePoints[0];						
						if (firstPoint !== undefined)
						{
							var label = myChart1.data.labels[firstPoint._index];
							var value = myChart1.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
							if(label=="Duplicate")
								$('#sourceDuplicateRecords').modal('show');							
							else
								bootbox.alert(label + ": " + value);
						}
					};
			
			document.getElementById("myChart2").onclick = function(evt){
						var activePoints = myChart2.getElementsAtEvent(evt);
						var firstPoint = activePoints[0];						
						if (firstPoint !== undefined)
						{
							var label = myChart2.data.labels[firstPoint._index];
							var value = myChart2.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
							if(label=="Common")
								bootbox.alert(label + ": " + value);
							else
								$('#sourceOrphanRecords').modal('show');
						}
					};
					
			document.getElementById("myChart3").onclick = function(evt){
						var activePoints = myChart3.getElementsAtEvent(evt);
						var firstPoint = activePoints[0];						
						if (firstPoint !== undefined)
						{
							var label = myChart3.data.labels[firstPoint._index];
							var value = myChart3.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
							if(label=="Passed")
								bootbox.alert(label + ": " + value);
							else
								$('#columnlevelmismatch2').modal('show');
						}
					};
					
			document.getElementById("myChart4").onclick = function(evt){
						var activePoints = myChart4.getElementsAtEvent(evt);
						var firstPoint = activePoints[0];						
						if (firstPoint !== undefined)
						{
							var label = myChart4.data.labels[firstPoint._index];
							var value = myChart4 .data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
							if(label=="Duplicate")
								$('#targetDuplicateRecords').modal('show');
							/*else if(label=="Duplicated")
								$('#targetDuplicatedRecords').modal('show');*/
							else
								bootbox.alert(label + ": " + value);
						}
					};
					
			document.getElementById("myChart5").onclick = function(evt){
						var activePoints = myChart5.getElementsAtEvent(evt);
						var firstPoint = activePoints[0];						
						if (firstPoint !== undefined)
						{
							var label = myChart5.data.labels[firstPoint._index];
							var value = myChart5 .data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
							if(label=="Common")
								bootbox.alert(label + ": " + value);
							else
								$('#targetOrphanRecords').modal('show');
						}
					};
				

		 }
		 		 
		 	/*document.getElementById("boxa").onclick = function(evt)
			{
				$('#srcmismatchindetails').modal('show');
				//window.open('result2.html?projectName='+projName+'&testID='+testID);
			}
		 	
		 	document.getElementById("boxb").onclick = function(evt)
			{
				$('#tgtmismatchindetails').modal('show');
				//window.open('result2.html?projectName='+projName+'&testID='+testID);
			}
		 	
		 	document.getElementById("mismatchedRecords").onclick = function(evt)
			{
				$('#mismatchAggregate').modal('show');
				//window.open('/jumbo/views/JUMBO_HTML_UI/theme-quasar/result2.html?projectName='+prjName+'&testID='+testID);
			}*/
		 	
		 	
		 	
		 	
		 
			$("#Tproname").text(response.resultDetails.proName);
			$("#Ttestname").text(response.resultDetails.testName);
			
			$("#Tdoc").text(response.resultDetails.doc);
			$("#Tdoe").text(response.resultDetails.doe);
			
			$("#Tuser").text(response.resultDetails.createdBy);
			$("#Tduration").text(response.resultDetails.duration);
			
			
			$("#datatable tbody").empty();
			//alert(response.statsData.tableData);
			$("#datatable tbody").append(response.statsData.tableData);
			
			
			
			/*$("#Dsrcname").text(response.sourceDetails.srcFile);
			$("#Dtgtname").text(response.targetDetails.tgtFile);
			
			$("#Dsrcdetails").text(response.sourceDetails.srcDetails);
			$("#Dtgtdetails").text(response.targetDetails.tgtDetails);
			
			$("#Dskeys").text(response.sourceDetails.srcKey);
			$("#Dtkeys").text(response.targetDetails.tgtKey);
			
			$("#Dsrules").text(response.sourceDetails.srcRules);
			$("#Dtrules").text(response.targetDetails.tgtRules);
			
			$("#Dsfilters").text(response.sourceDetails.srcFilters);
			$("#Dtfilters").text(response.targetDetails.tgtFilters);
			
			$("#Dscolcount").text(response.sourceDetails.srccolsCount);
			$("#Dtcolcount").text(response.targetDetails.tgtcolsCount);
			
			if(response.statsData){
				$("#datatable").find("tr:gt(6)").show();
				$("#Dsrecords").text(response.statsData.value1);
				$("#Dtrecords").text(response.statsData.value2);
				
				$("#Dsdupkeys").empty();
				$("#Dtdupkeys").empty();
				if(response.statsData.value3 && response.statsData.value4) {					
					if(response.statsData.value3 > "0" && response.statsData.value4 > "0")
					{					
						$("#Dsdupkeys").append("<a>"+response.statsData.value3+"</a>");	
						$("#Dtdupkeys").append("<a>"+response.statsData.value4+"</a>");
						
						document.getElementById("Dsdupkeys").onclick = function(evt)
						{
							$('#sourceDuplicateKeys').modal('show');
						}
	
						document.getElementById("Dtdupkeys").onclick = function(evt)
						{
							$('#targetDuplicateKeys').modal('show');
						}
												
					} else if(response.statsData.value3 && response.statsData.value3 > "0"){
						
						$("#Dsdupkeys").append("<a>"+response.statsData.value3+"</a>");
						$("#Dtdupkeys").text(response.statsData.value4);
						document.getElementById("Dsdupkeys").onclick = function(evt)
						{
							$('#sourceDuplicateKeys').modal('show');
						}
					}
					 else if (response.statsData.value4 && response.statsData.value4 > "0") {
						 $("#Dtdupkeys").append("<a>"+response.statsData.value4+"</a>");
						 $("#Dsdupkeys").text(response.statsData.value3);
						 
						 document.getElementById("Dtdupkeys").onclick = function(evt)
						{
								$('#targetDuplicateKeys').modal('show');
						}
					} else {
						$("#Dsdupkeys").text(response.statsData.value3);
						$("#Dtdupkeys").text(response.statsData.value4);
					}
				} else {
					$("#Dsdupkeys").text("NA");
					$("#Dtdupkeys").text("NA");
				}
				
				$("#Dsduprecs").empty();
				$("#Dtduprecs").empty();
				if(response.statsData.value5 && response.statsData.value6) {
					if(response.statsData.value5 > "0" && response.statsData.value6 > "0"){
						$("#Dsduprecs").append("<a>"+response.statsData.value5+"</a>");	
						$("#Dtduprecs").append("<a>"+response.statsData.value6+"</a>");	
						
						document.getElementById("Dsduprecs").onclick = function(evt)
						{
							$('#sourceDuplicateRecords').modal('show');
						}
						
						document.getElementById("Dtduprecs").onclick = function(evt)
						{
							$('#targetDuplicateRecords').modal('show');
						}
					}else if(response.statsData.value5 && response.statsData.value5 > "0"){
						$("#Dsduprecs").append("<a>"+response.statsData.value5+"</a>");	
						$("#Dtduprecs").text(response.statsData.value6);
						
						document.getElementById("Dsduprecs").onclick = function(evt)
						{
							$('#sourceDuplicateRecords').modal('show');
						}
					} else if(response.statsData.value6  && response.statsData.value6 > "0"){
						$("#Dtduprecs").append("<a>"+response.statsData.value6+"</a>");	
						$("#Dsduprecs").text(response.statsData.value5);
						
						document.getElementById("Dtduprecs").onclick = function(evt)
						{
							$('#targetDuplicateRecords').modal('show');
						}
					} else {
						$("#Dsduprecs").text(response.statsData.value5);
						$("#Dtduprecs").text(response.statsData.value6);
					}
				} else {
					$("#Dsduprecs").text("NA");
					$("#Dtduprecs").text("NA");
				}
				
				if(response.statsData.value7 && response.statsData.value8){
					$("#Dsunikeys").text(response.statsData.value7);
					$("#Dtunikeys").text(response.statsData.value8);
				} else {
					$("#Dsunikeys").text("NA");
					$("#Dtunikeys").text("NA");
				}
				
				if(response.statsData.value9 && response.statsData.value10){
					$("#Dsunirecs").text(response.statsData.value9);
					$("#Dtunirecs").text(response.statsData.value10);
				} else {
					$("#Dsunirecs").text("NA");
					$("#Dtunirecs").text("NA");
				}
				
				if(response.statsData.value11 && response.statsData.value12){
					$("#Dsmatching").text(response.statsData.value11);
					$("#Dtmatching").text(response.statsData.value12);
				} else {
					$("#Dsmatching").text("NA");
					$("#Dtmatching").text("NA");
				}
				
				$("#Dsorphan").empty();
				$("#Dtorphan").empty();
				if(response.statsData.value13 && response.statsData.value14) {
					if(response.statsData.value13 > "0" && response.statsData.value14 > "0"){					
						$("#Dsorphan").append("<a>"+response.statsData.value13+"</a>");	
						$("#Dtorphan").append("<a>"+response.statsData.value14+"</a>");	
						
	
						document.getElementById("Dsorphan").onclick = function(evt)
						{
							$('#sourceOrphanRecords').modal('show');
						}
						document.getElementById("Dtorphan").onclick = function(evt)
						{
							$('#targetOrphanRecords').modal('show');
						}
					}else if(response.statsData.value13 && response.statsData.value13 > "0"){
						$("#Dsorphan").append("<a>"+response.statsData.value13+"</a>");	
						$("#Dtorphan").text(response.statsData.value14);
						
						document.getElementById("Dsorphan").onclick = function(evt)
						{
							$('#sourceOrphanRecords').modal('show');
						}
					}else if(response.statsData.value14 && response.statsData.value14 > "0"){
						$("#Dtorphan").append("<a>"+response.statsData.value14+"</a>");	
						$("#Dsorphan").text(response.statsData.value13);
						
						document.getElementById("Dtorphan").onclick = function(evt)
						{
							$('#targetOrphanRecords').modal('show');
						}
					}else {
						$("#Dsorphan").text(response.statsData.value13);
						$("#Dtorphan").text(response.statsData.value14);
					}
				} else {
					$("#Dsorphan").text("NA");
					$("#Dtorphan").text("NA");
				}	
				
			}
			if(response.tableValue){
				$("#datatable").find("tr:gt(6)").show();
				$("#mismatchedRecords").hide();
				
				if(response.tableValue.tableDatamismatchsrc1 && response.tableValue.tableDatamismatchtgt1){
					$("#mismatchedRecords").show();
					$("#tablesrcmismatchindetails tbody").empty();
					$("#tablesrcmismatchindetails tbody").append(response.tableValue.tableDatamismatchsrc1);
					$("#tabletgtmismatchindetails tbody").empty();
					$("#tabletgtmismatchindetails tbody").append(response.tableValue.tableDatamismatchtgt1);
				}
				
				if(response.tableValue.tableDataduplicate_entiresrc1 && response.tableValue.tableDataduplicate_entiretgt1){
					$("#sourceDuplicateRecords tbody").empty();
					$("#sourceDuplicateRecords tbody").append(response.tableValue.tableDataduplicate_entiresrc1);
					$("#targetDuplicateRecords tbody").empty();
					$("#targetDuplicateRecords tbody").append(response.tableValue.tableDataduplicate_entiretgt1);	
				}
				
				if(response.tableValue.tableDataduplicate_keysrc1 && response.tableValue.tableDataduplicate_keytgt1){
					$("#tablesourceDuplicateKeys tbody").empty();
					$("#tablesourceDuplicateKeys tbody").append(response.tableValue.tableDataduplicate_keysrc1);
					$("#tabletargetDuplicateKeys tbody").empty();
					$("#tabletargetDuplicateKeys tbody").append(response.tableValue.tableDataduplicate_keytgt1);
				}
				
				if(response.tableValue.tableDatasrckeyNotinTgt1 && response.tableValue.tableDatatgtkeyNotinsrc1){
					$("#sourceOrphanRecords tbody").empty();
					$("#sourceOrphanRecords tbody").append(response.tableValue.tableDatasrckeyNotinTgt1);
					$("#targetOrphanRecords tbody").empty();
					$("#targetOrphanRecords tbody").append(response.tableValue.tableDatatgtkeyNotinsrc1);
				}
				
				if(response.tableValue.tableDatamismatchsrc1 && response.tableValue.tableDatamismatchtgt1){
					$("#tabulu1 tbody").empty();
					$("#tabulu1 tbody").append(response.tableValue.tableDatamismatchsrc1);
					$("#tabulu2 tbody").empty();
					$("#tabulu2 tbody").append(response.tableValue.tableDatamismatchtgt1); 			
				}
			}
			$('#spinLoad').hide();
			if(!response.statsData && !response.tableValue && !response.tableValue ){
				 $("#includeGraph").hide();
				 $("#includeResult").replaceWith( "<h2><b>Properties</b></h2>" );
				 $("#datatable").find("tr:gt(6)").hide();
			 }*/
			
			$('#executeReRun').click(function(){
				bootbox.confirm({ 
					  size: "medium",
					  message: "Would you like to update Source or Target ?", 
					  buttons: {
					        confirm: {
					            label: 'Yes',
					            className: 'btn-success'
					        },
					        cancel: {
					            label: 'No',
					            className: 'btn-danger'
					        }
					    },
					  callback: function(result){
						  if(result) {
							  loadFiles(response.resultDetails.proName);
							  $('#reRunModal').modal('show');
						  }
						  else {
							reRun(projName, testName, testDate,
									testTime);							
						  }
					  }
				})	
			});
			
			$('#VerifyReRun').click(function(){
				console.log("testIDDDD:"+testID);
				$('#spinLoad').show();	
				$.ajax({
					type: 'post',
					url: localUrl+'verify',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					data: JSON.stringify({'projectName' : response.resultDetails.proName, 'srcfileName':$("#scr_change option:selected").val(),'tgtfileName':$("#tgt_change option:selected").val(),'testID':response.resultDetails.testName}),
					success: function(verify){
						$('#spinLoad').show();	
						if(verify.message == "success") {
							reRun(response.resultDetails.proName,testName,testDate,testTime);							
						}
						else 
							bootbox.alert(verify.message);
					},
					error: function(){
						$('#spinLoad').show();	
						console.log("Error in error");
						bootbox.alert("Error retrieving filelist");
					}
				});
				$('#spinLoad').hide();	
			});
			
			
			
			
			
			
			/*document.getElementById("executeReRun").onclick = function()
			{
				bootbox.confirm({ 
					  size: "medium",
					  message: "Would you like to update Source or Target ?", 
					  buttons: {
					        confirm: {
					            label: 'Yes',
					            className: 'btn-success'
					        },
					        cancel: {
					            label: 'No',
					            className: 'btn-danger'
					        }
					    },
					  callback: function(result){
						  if(result) {
							  loadFiles(response.resultDetails.proName);
							  $('#reRunModal').modal('show');
						  }
  						  else {
							reRun(projName, testName, testDate,
									testTime);							
  						  }
					  }
				})				
			}
*/
			/*document.getElementById("VerifyReRun").onclick = function() {
				console.log("testIDDDD:"+testID);
				$('#spinLoad').show();	
				$.ajax({
					type: 'post',
					url: localUrl+'verify',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					data: JSON.stringify({'projectName' : response.resultDetails.proName, 'srcfileName':$("#scr_change option:selected").val(),'tgtfileName':$("#tgt_change option:selected").val(),'testID':response.resultDetails.testName}),
					success: function(verify){
						$('#spinLoad').show();	
						if(verify.message == "success") {
							reRun(response.resultDetails.proName,testName,testDate,testTime);							
						}
						else 
							bootbox.alert(verify.message);
					},
					error: function(){
						$('#spinLoad').show();	
						console.log("Error in error");
						bootbox.alert("Error retrieving filelist");
					}
				});
				$('#spinLoad').hide();	 								 
			}*/
			$('#spinLoad').show();	
	}
	 
	 function hideSourceSelectBox(t) {
		 
		 if (t.is(":checked")) {
		     $('#scr_change').attr('disabled', false);
		     $('#btnVerify').attr("disabled",false);
		   }
		   else {
		   $('#scr_change').attr('disabled', 'disabled');
		   if($('#tgt_change').checked) 
				$('#btnVerify').attr("disabled",false);
			else
				$('#btnVerify').attr("disabled",true);
		 }
	 }
	 
	 function hideTargetSelectBox(t) {
	 
	  if (t.is(":checked")) {
	     $('#tgt_change').attr('disabled', false);
	     $('#btnVerify').attr("disabled",false);
	   }
	   else {
		   $('#tgt_change').attr('disabled', 'disabled');
		   if($('#scr_change').checked) 
				$('#btnVerify').attr("disabled",false);
		   else
				$('#btnVerify').attr("disabled",true);
	   }	 
	 }
	 
	 
	 function reRun(proName,testName,date,time)
	 {
		 $("#spinLoad").show();		
		 	var x = document.getElementById("sourceCheck");
			var y = document.getElementById("targetCheck");
		    
			if(x.checked)
			{
				newsrc = $("#scr_change option:selected").val();
			}
		    else
		    {
		    	newsrc = '';
		    }
		   
		    if(y.checked)
		    {
		    	newtgt = $("#tgt_change option:selected").val();
		    }	
		    else
		    {
		    	newtgt = '';
		    }	
		    
	 	$.ajax({
	 		type: 'post',
	 		url: localUrl+'reRun',
	 		contentType: "application/json; charset=utf-8",
	 		dataType: "json",
	 		data: JSON.stringify({'projectName' :proName,'testName' : testName,'testDate':date,'testTime' : time,'newsrc' : newsrc,'newtgt' : newtgt}),
	 		success: function(response){
	 			if(response.message.includes(proName))
	 			{	 				
	 				testID=response.message;				
	 				$.ajax({
						type: 'post',
						url: localUrl+'getStatus22',
						contentType: "application/json; charset=utf-8",									
						data: JSON.stringify({'proName' : proName,'testID' : testID}),									
						success: function(response){
							console.log("Success inside getStatus");
							displayStats(response, proName ,testID,testName,date,time);								
							$("#executeReRun").show();	
							$("#spinLoad").hide();
							getTreeData();
						},
						error: function(response){
							bootbox.alert("Exception Occurred: "+response.message);
							$("#spinLoad").hide();
						}
					});
	 				bootbox.alert(response.message);
	 				$("#spinLoad").hide();
	 			} else {
	 				bootbox.alert("Exception Occurred: "+response.message);
	 				$("#spinLoad").hide();
	 			}
	 		},
	 		error: function(){
	 			bootbox.alert("Unexpected Error Occured. Please check logs");
	 			$("#spinLoad").hide();
	 		}
	 	});
	 }
	 
	 function getFilesForDeleting(fileId) 
	{
		$(fileId).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getFilesForDeleting',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $("#del_fileDB_projectList").val()}),
			success: function(response){								
				$(response).each(function(){					
					var optionDB = '<option>'+this+'</option>';
					$(fileId).append(optionDB);
				});
				$('#spinLoad').hide();
				
			},
			error: function(){bootbox.alert("Error retrieving filelist");$('#spinLoad').hide();}
		});
		
	}
	
	function getBatchNamesForDeleting(fileId) 
	{
		$(fileId).html('');
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getBatchNames',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({'projectName' : $("#del_batch_projectList").val()}),
			success: function(response){
				//alert(response);
				$(response).each(function(){
					var optionDB = '<option>'+this+'</option>';
					$(fileId).append(optionDB);
				});
				$('#spinLoad').hide();
			},
			error: function(){bootbox.alert("Error retrieving filelist");$('#spinLoad').hide();}
		});
		
	}
	
	
	function deleteBatchName()
	{	
		if($('#del_batch_batchList').val() == "--No Batch Details Available--")
		{
			bootbox.alert("No Batch Names Available");
		}
		else
		{
			bootbox.confirm({
			    
			    message: "Do you want to remove the Selected Batch Name from the selected project?",
			    buttons: {
			        cancel: {
			            label: '<i class="fa fa-times"></i> Cancel'
			        },
			        confirm: {
			            label: '<i class="fa fa-check"></i> Confirm'
			        }
			    },
			    callback: function (result) {
			    	
			    	if(result)
			    	{
			    		$('#spinLoad').show();
			    		$.ajax({
			    			type: 'post',
			    			url: localUrl+'deleteBatchFromProject',
			    			contentType: "application/json; charset=utf-8",
			    			data: JSON.stringify({'projectName' : $('#del_batch_projectList').val(),'batchName' : $('#del_batch_batchList').val()}),
			    			success: function(response){
			    				console.log(response.message);
			    				if(response.includes("success"))
			    				{
			    					//alert('Halla bol IF');
			    					bootbox.alert("Batch Name removed from project successfully");
			    				}
			    				else
			    				{
			    					//alert('Halla bol ELSE');
			    					bootbox.alert("Failed to delete batch name");
			    				}
			    				getBatchNamesForDeleting("#del_batch_batchList");	
			    				$('#spinLoad').hide();
			    			},
			    			error: function(response){
			    				$('#spinLoad').hide();
			    			}
			    		});
			    	}
			    }
			});
		}
	}
	
	function individualResult(value)
	 {	 	
		$('#spinLoad').hide();
	 	$.ajax({
	 		type: 'post',
	 		url: localUrl+'getIndividualTestResult',
	 		contentType: "application/json; charset=utf-8",
	 		dataType: "json",
	 		data: JSON.stringify({'projectName' : $("#batproject option:selected").val(), 'batchName' : $("#batnamesforResults option:selected").val(), 'value' : value}),
	 		success: function(response){
	 			console.log(response);
	 			window.open('/jumbo/views/JUMBO_DTUI/pages/statistics.html?projectName='+$("#batproject option:selected").val()+'&testID='+response.testID,'_blank');
	 			$('#spinLoad').hide();
	 		},
	 		error: function(){bootbox.alert("Error");$('#spinLoad').hide();}
	 	});
	 }
	
	function generateQuery(){
		var colValue = '';
		var splitStr = ' --> ';
		if( $('#list2').children().length == 0){
		bootbox.alert("Column List is Empty !!!");
		return;
		}
		var dupCnt = 0;
		$( "#list2 option" ).each(function() {
			
			var optionCheck = $(this).text();
			col = optionCheck.split(splitStr);
			
			if(colValue.includes(col[0].substring(col[0].indexOf('.')+1,col[0].length))){
				dupCnt++;
			}
			if(colValue == '')
				colValue=col[0];
			else 
				colValue=colValue+", "+col[0];		
			
	});
		if(dupCnt>0){
		bootbox.alert("Duplicate Column Name!!!");
		return;
		}
		var removeCol1=$( "#Keys1 option:selected" ).text();
		var removeCol2=$( "#Keys2 option:selected" ).text();
		var removeFile1 = $( "#joinFile1 option:selected" ).text();
		var removeFile2 = $( "#joinFile2 option:selected" ).text();
		removeColon1 = removeCol1.split(splitStr);
		removeColon2 = removeCol2.split(splitStr);
		dispFile1 = removeFile1.split(splitStr);
		dispFile2 = removeFile2.split(splitStr);
		var joinValue = dispFile1[0] +" t1 JOIN "+ dispFile2[0] +" t2 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		if($("#file3").is(':visible')){
			var removeCol1=$( "#joinKey3 option:selected" ).text();
			var removeCol2=$( "#Keys3 option:selected" ).text();
			var removeFile3 = $( "#joinFile3 option:selected" ).text();
			dispFile3 = removeFile3.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);	
			joinValue = joinValue+" JOIN "+dispFile3[0]+" t3 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}
		if($("#file4").is(':visible')){
			var removeCol1=$( "#joinKey4 option:selected" ).text();
			var removeCol2=$( "#Keys4 option:selected" ).text();
			var removeFile4 = $( "#joinFile4 option:selected" ).text();
			dispFile4 = removeFile4.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);		
			joinValue = joinValue+" JOIN "+dispFile4[0]+" t4 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}	
		if($("#file5").is(':visible')){
			var removeCol1=$( "#joinKey5 option:selected" ).text();
			var removeCol2=$( "#Keys5 option:selected" ).text();
			var removeFile5 = $( "#joinFile5 option:selected" ).text();
			dispFile5 = removeFile5.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);
			
			joinValue = joinValue+" JOIN "+dispFile5[0]+" t5 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}
		if($("#file6").is(':visible')){
			var removeCol1=$( "#joinKey6 option:selected" ).text();
			var removeCol2=$( "#Keys6 option:selected" ).text();
			var removeFile6 = $( "#joinFile6 option:selected" ).text();
			dispFile6 = removeFile6.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);	
				
			joinValue = joinValue+" JOIN "+dispFile6[0]+" t6 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}	
		if($("#file7").is(':visible')){
			var removeCol1=$( "#joinKey7 option:selected" ).text();
			var removeCol2=$( "#Keys7 option:selected" ).text();
			var removeFile7 = $( "#joinFile7 option:selected" ).text();
			dispFile7 = removeFile7.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);	
				
			joinValue = joinValue+" JOIN "+dispFile7[0]+" t7 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}	
		if($("#file8").is(':visible')){
			var removeCol1=$( "#joinKey8 option:selected" ).text();
			var removeCol2=$( "#Keys8 option:selected" ).text();
			var removeFile8 = $( "#joinFile8 option:selected" ).text();
			dispFile8 = removeFile8.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);	
				
			joinValue = joinValue+" JOIN "+dispFile8[0]+" t8 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}	
		if($("#file9").is(':visible')){
			var removeCol1=$( "#joinKey9 option:selected" ).text();
			var removeCol2=$( "#Keys9 option:selected" ).text();
			var removeFile9 = $( "#joinFile9 option:selected" ).text();
			dispFile9 = removeFile9.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);
				
			joinValue = joinValue+" JOIN "+dispFile9[0]+" t9 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}	
		if($("#file10").is(':visible')){
			var removeCol1=$( "#joinKey10 option:selected" ).text();
			var removeCol2=$( "#Keys10 option:selected" ).text();
			var removeFile10 = $( "#joinFile10 option:selected" ).text();
			dispFile10 = removeFile10.split(splitStr);
			removeColon1 = removeCol1.split(splitStr);
			removeColon2 = removeCol2.split(splitStr);	
			
			joinValue = joinValue+" JOIN "+dispFile10[0]+" t10 ON ("+removeColon1[0]+"="+removeColon2[0]+")";
		}
		$("#generateQry").val("SELECT "+colValue+" FROM "+joinValue);
		//SELECT "+colValue+" FROM "+joinValue
	}
	
	function getTreeData(){
		$('#spinLoad').show();
		$("#misSource").hide();
		$("#dupSource").hide();
		$("#orpSource").hide();
		$("#misTarget").hide();
		$("#dupTarget").hide();
		$("#orpTarget").hide();
		$("#includeGraph").hide();
		$("#mismatchedRecords").hide();
		$.ajax({
			type: 'get',
			url: localUrl+'/get/reRunData',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
			$('#tree').treeview({
	          color: "#428bca",
	          levels: 1,
	          data: response
			  }).on('nodeSelected', function (event, data) {					 
			    if(typeof data.text !== "undefined" && typeof data.project !== "undefined" && typeof data.testName !== "undefined" && typeof data.date !== "undefined" ) {
			    	$('#spinLoad').show();
			    	$.ajax({
			    		type: 'post',
			    		url: localUrl+'getTestId',
			    		contentType: "application/json; charset=utf-8",
			    		dataType: "json",
			    		data: JSON.stringify({'projectName' : data.project,'testName' : data.testName,'histDate':data.date,'histTime' : data.text }),
			    		success: function(response){
					    	$("#spinLoad").show();
					    	$.ajax({
								type: 'post',
								url: localUrl+'getStatus22',
								contentType: "application/json; charset=utf-8",									
								data: JSON.stringify({'proName' : data.project,'testID' : response.testID}),									
								success: function(response){
									
									var abc = response.toString();
									if(abc.includes("Error :"))
									{
										$('#spinLoad').hide();
										bootbox.alert(response.toString());
									}
									else
									{
										displayStats(response, data.project ,response.testID,data.testName,data.date,data.text);
										$("#spinLoad").hide();
										$("#executeReRun").show();
									}	
									$("#spinLoad").hide();									
								},
								error: function(response){
									$("#spinLoad").hide();
									bootbox.alert("Error retrieving Values");										
								}
							});
			    		}
			    	});				    	
			      }	                    
              });
			$('#spinLoad').hide();
			},
			error: function(response){
				$("#spinLoad").hide();
				bootbox.alert(response);					
			}
		});		
	}
	
	function loadUsers() {
		$('#spinLoad').show();
		$.ajax({
			type: 'GET',
			url: localUrl + 'allUsers',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response,a,xhr) {
				if(xhr.status == 204)
					$('#allUserTable > tbody').empty();
				else
					displayAllUsers(response);
				$('#spinLoad').hide();
			},
			error: function(error) {
				console.log(error.responseText + error.Message + error.status);
				$('#spinLoad').hide();
			}
		});	
	}
	
	function displayAllUsers(allUserDetails) {
		console.log(allUserDetails)
		if (allUserDetails.length > 0) {
			$('#allUserTable > tbody').empty();
			$(allUserDetails).each(function () {	 
				var btnType = this["status"]=='Active'?'btn-success':'btn-danger';	 
				var rowData = "<tr>" +
				 "<td style='width: 20%; text-align: left'>" +this["username"] + "</td>" +
				 "<td style='width: 30%; text-align: left'>"+ this["projectname"] +" </td>" +
				"<td style='width: 20%; text-align: center'>" + this["userrole"] +" </td>" +
				"<td style='width: 10%; text-align: center'>  <button type='button' class='btn btn-xs custom "+ btnType +"'>"+ this["status"] + " </button></td>" +
				 "<td style='width: 30%; text-align: center'> <button id='btnUpdate' class='btn btn-primary btn-xs userUpdate'><i class='fa fa-pencil'></i> Update </button>  <button id='btnDelete' class='btn btn-delete btn-xs userDelete'><i class='fa fa-trash-o'></i> Delete </button> </td>" 
				 "</tr>";
				$('#allUserTable > tbody').append(rowData);
				if(this["userrole"] === "Admin"){					
					$("#btnUpdate").prop("disabled",true);
					$("#btnDelete").prop("disabled",true);
				}
			});		
			$(".userUpdate").bind("click", updateUser);
			$(".userDelete").bind("click", deleteUser); 				
		}
	}
	
	function getUserDetailsToAdd() {	
		var selectedProject='';
		user = {};
		user['username']=$("#userId").val();
		user['password']=$("#password").val();
		user['email']=$("#emailId").val();
		$( "#projectName option" ).each(function() {
			selectedProject = selectedProject+$(this).text()+",";	
		});
		user['userrole']=$("#userRole option:selected").text();
		if($("#userRole option:selected").text() === 'Admin')
			user['projectname']='All';
		else{
			selectedProject = selectedProject.substring(0,selectedProject.lastIndexOf(","));
		user['projectname']=selectedProject;
		}
		user['status']='Active';
		console.log(user);
		return user;	
	}

	
	function updateUser() {
	     var updateRow = $(this).parent().parent(); 
		 var updateUnameField = updateRow.children("td:nth-child(1)");
		 var userUpdateUname = updateUnameField[0].innerHTML;	 
		 //alert('userUpdateUname  :  '+userUpdateUname);
		 $("#projectNameUpdateList").html('');
			getProject("#projectNameUpdateList");
		 populateUpdateUserModal(userUpdateUname);
		 $('#updateUserModal').modal('show');
		 $('#updateConfirm').click(function(){
			 if($("#userIdUpdate").val() == "" 
				 || $("#passwordUpdate").val() == "" 
					 || $("#password2Update").val() == "" 
						 || $('#projectNameUpdate > option').length == 0 
						 || $("#userRoleUpdate option:selected" ).text() == 'Choose..'){
					bootbox.alert("Please fill all the fields to Update");
			 }else if(!isEmail($('#emailUpdate').val())){
				bootbox.alert("Invalid Email Id");
			}else if($('#passwordUpdate').val() !== $('#password2Update').val()){
				bootbox.alert("Password and Confirm Password should be same");
			}else{
				updateEmailCheck();
			}
		});

	}
	
	function updateEmailCheck() {		
		$('#spinLoad').show();
		$.ajax({
			type: 'POST',
			url: localUrl + '/users/emailIdCheck',
			data: JSON.stringify(getUserDetailsToUpdate()),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response) {
				console.log("Update"+response);
				if(response.message == 'Email Id Already Exists'){
					bootbox.alert("Email Id Already Exists");					
				}
				else{
					$('#updateConfModal').modal('show');
				}
				$('#spinLoad').hide();
			},
			error: function(error,errorMsg,b) {
				console.log(error.responseText + " " + errorMsg + " " + error.status);
				$('#spinLoad').hide();
			}
		});		
}
	
	function finalUpdate() {
		$('#spinLoad').show();
			$.ajax({
				type: 'POST',
				url: localUrl + 'users/update',
				data: JSON.stringify(getUserDetailsToUpdate()),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(response) {
					console.log("Update"+response);
					if(response.message == 'success'){
						bootbox.alert("User Updated successfully");
						 loadUsers();
					}else
						bootbox.alert("Failed");
					$('#spinLoad').hide();
				},
				error: function(error,errorMsg,b) {
					console.log(error.responseText + " " + errorMsg + " " + error.status);
					$('#spinLoad').hide();
				}
			});
			$('#updateUserModal').modal('hide');
			$('#updateConfModal').modal('hide');
	}
	
	function populateUpdateUserModal(userUpdateUname) {
		var splitPrjName = [];
		$("#projectNameUpdate").html('');		 
		//$('#spinLoad').show();
		$.ajax({
			type: 'GET',
			url: localUrl + 'user/' + userUpdateUname,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response) {
			
			      $("#userIdUpdate").val(response.username);
				  $("#passwordUpdate").val(response.password);
				  $("#password2Update").val(response.password);
				  $("#emailUpdate").val(response.email);
				   var prjName = response.projectname;
				 
				  var userRole = response.userrole;
				  if(userRole !== "Admin"){
					  //if(prjName.includes(","))
						  splitPrjName = prjName.split(",");
					 /* else
						  splitPrjName = prjName;*/
					 
					  for(var i=0; i < splitPrjName.length; i++){
						 $("#projectNameUpdate").append('<option>'+splitPrjName[i]+'</option>');
						  if($('#projectNameUpdateList option:contains('+ splitPrjName[i] +')')){
							  $("#projectNameUpdateList option:contains("+splitPrjName[i]+")").prop("selected", true);
							   $("#projectNameUpdateList option:selected").remove();
						  }					
					  }					 					 
				  }
				  else{
					  $( "#projectNameUpdateList option" ).each(function() {
							var optionDB = '<option>'+$(this).text()+'</option>';
							$("#projectNameUpdate").append(optionDB);	
						});
				  }
				  $("#userRoleUpdate option[value='" + userRole + "']").attr('selected','true');
				  console.log(response.status === 'Inactive',$("#userRoleUpdate option[value='" + response.userrole + "']"));
				  if(response.status === 'Inactive') {
						$('#ActiveUpdate').prop('checked','false');
						$('#InactiveUpdate').prop('checked','true');
					}
					else {					
						$('#InactiveUpdate').prop('checked','false');
						$('#ActiveUpdate').prop('checked','true');
					}
				 // $('#spinLoad').hide();
			},
			error: function(error,errorMsg,b) {
				console.log(error.responseText + " " + errorMsg + " " + error.status);
				//$('#spinLoad').hide();
			}
		});
	}
		

	function deleteUser() {
	var deleteRow = $(this).parent().parent();
	var tdUname = deleteRow.children("td:nth-child(1)");
	userDel = tdUname[0].innerHTML;
	console.log("User : " + userDel);
	$('#deleteConfModal').modal('show');
	$('#confirmDel').click(
		function() {
			$('#spinLoad').show();
		$.ajax({
			type : 'POST',
			url : localUrl + 'users/delete',
			data : JSON.stringify({
				'username' : userDel
			}),
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function(response) {
				loadUsers();
				getUserCount();
				$('#spinLoad').hide();
			},
			error : function(error, errorMsg, b) {
				console.log(error.responseText + " " + errorMsg + " "
						+ error.status);
				$('#spinLoad').hide();
			}
		});
			$('#deleteConfModal').modal('hide');
		});
	}
	
	function getUserDetailsToUpdate() {	
		var selectedProject = '';
		var user = {};
		user['username']=$("#userIdUpdate").val();
		user['password']=$("#passwordUpdate").val();
		user['email']=$("#emailUpdate").val();
		$( "#projectNameUpdate option" ).each(function() {
			selectedProject = selectedProject+$(this).text()+",";	
		});
		selectedProject=selectedProject.substring(0,selectedProject.lastIndexOf(","));
		user['userrole']=$("#userRoleUpdate option:selected").text();
		if($("#userRoleUpdate option:selected").text() == 'Admin')
			user['projectname']='All';
		else
			user['projectname']=selectedProject;
		
		user['status']=$("#switchStatusUpdate input[type='radio']:checked").attr('status');
		console.log(user);
		return user;
		
	}
	 
	function updateButtons()
	{
		$('#spinLoad').show();
		$.ajax({
			type: 'get',
			url: localUrl+'getProjectCount',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				console.log('totalProjectCountText : '+response.message);
				
				if(response.message=="0")
				{
					$("#delProjButton").prop('disabled', true);
					$("#delCSVBTN").prop('disabled', true);
					$("#delTestNameBtn").prop('disabled', true);
					$("#add_csv").prop('disabled', true);
					$("#addDBConnection").prop('disabled', true);
					$("#delBatchBtn").prop('disabled', true);
				}
				else
				{
					$("#delProjButton").prop('disabled', false);
					$("#delCSVBTN").prop('disabled', false);
					$("#delTestNameBtn").prop('disabled', false);
					$("#add_csv").prop('disabled', false);
					$("#addDBConnection").prop('disabled', false);	
					$("#delBatchBtn").prop('disabled', false);					
				}
				$('#spinLoad').hide();
			},
			error: function(){console.log('#totalProjectCountText --> Gala re Pilaa');$('#spinLoad').hide();}
		});

	}
	
	function scrExecute(emailAddress,srcTgtKeys,srcTgtFiles,prjName,tstName,srcTgtRules,srcTgtFilterApp,srcTgtMap,srcTgtRuleApp,srcTgtFilters,allVals,ChgDt){
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'scrvariable',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({"srcKeys":srcTgtKeys,"file1":srcTgtFiles ,"prjName":prjName, "tstName":tstName, "srcRules":srcTgtRules,"srcFilters":srcTgtFilterApp,"srcMapCols":srcTgtMap,"srcRuleApp":srcTgtRuleApp,"srcFilterApp":srcTgtFilters,"filterExecute":allVals.toString(),"ChgDt":ChgDt}),
			success: function(response){
				$('#spinLoad').hide();
				if(response.message.includes(prjName) && !response.message.includes("Exception"))
				{		
					testID=response.message;
					bootbox.alert(response.message, function(){backPage12();window.open('/jumbo/views/JUMBO_DTUI/pages/statistics.html?projectName='+prjName+'&testID='+testID);});
					if($('#emailIdCheck').is(':checked')){
						sendEmailTo(emailAddress,prjName,testID);
					}
				}
				else
				{
					bootbox.alert(response.message,function(){backPage12();});
				}
				getPrjDetails('-1');
			},
			error: function(){
				$('#spinLoad').hide();
				bootbox.alert("Unexpected Error. For more details please refer the logs.",function(){backPage12();});
				
			}
		});
	}
	
	
	function deleteConnName()
	{
		bootbox.confirm({
		    
		    message: "Do you want to delete the Selected Connection Name?",
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Confirm'
		        }
		    },
		    callback: function (result) {
		    	if(result)
		    	{
		    		$('#spinLoad').show();
		    		$.ajax({
		    			type: 'post',
		    			url: localUrl+'deleteConnName',
		    			contentType: "application/json; charset=utf-8",
		    			dataType: "json",
		    			data: JSON.stringify({'connectionName' : $('#del_ConnectionNameList').val()}),
		    			success: function(response){
		    				bootbox.alert(response.message);
		    				getDatabaseConnections();
		    				$('#spinLoad').hide();
		    			},
		    			error: function(){$('#spinLoad').hide();}
		    		});
		    	}
		    }
		});
		
		
	}
	
	
	function getsrcduplicates()
	{
		var abc = $('#Ttestname').text().split('/');
		var testID = abc[0];
		var prjName = $('#Tproname').text();
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getRecords',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'getsrcduplicates', 'page' : '1'}),
			success: function(response){
					$("#tabuluuuu tbody").empty();
					$("#tabuluuuu tbody").append(response.table);
					document.getElementById("clickEventTitle").innerHTML = "Duplicate Key(s) in Source";
					
					var ind = $('#dupsrcCount').text();
					var eind = '';
					if(ind%1000 > 0)
						eind = Math.trunc(ind/1000)+1;
					else
						eind = Math.trunc(ind/1000);
					
					$('#SRMLTB').val("1");
					$('#SRMRTB').val(eind);
					
					$('#spinLoad').hide();
					$('#targetDuplicateKeys').modal('show');
			},
			error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
		});
	}
	
	function gettgtduplicates()
	{
		var abc = $('#Ttestname').text().split('/');
		var testID = abc[0];
		var prjName = $('#Tproname').text();
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getRecords',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'gettgtduplicates', 'page' : '1'}),
			success: function(response){
					$("#tabuluuuu tbody").empty();
					$("#tabuluuuu tbody").append(response.table);
					document.getElementById("clickEventTitle").innerHTML = "Duplicate Key(s) in Target";
					
					var ind = $('#duptgtCount').text();
					var eind = '';
					if(ind%1000 > 0)
						eind = Math.trunc(ind/1000)+1;
					else
						eind = Math.trunc(ind/1000);
					
					$('#SRMLTB').val("1");
					$('#SRMRTB').val(eind);
					
					$('#spinLoad').hide();
					$('#targetDuplicateKeys').modal('show');
			},
			error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
		});
	}
	
	function getsrcorphan()
	{
		var abc = $('#Ttestname').text().split('/');
		var testID = abc[0];
		var prjName = $('#Tproname').text();
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getRecords',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'getsrcorphan', 'page' : '1'}),
			success: function(response){
					$("#tabuluuuu tbody").empty();
					$("#tabuluuuu tbody").append(response.table);
					document.getElementById("clickEventTitle").innerHTML = "Orphan Key(s) in Source";
					
					var ind = $('#orpsrcCount').text();
					var eind = '';
					if(ind%1000 > 0)
						eind = Math.trunc(ind/1000)+1;
					else
						eind = Math.trunc(ind/1000);
					
					$('#SRMLTB').val("1");
					$('#SRMRTB').val(eind);
					
					$('#spinLoad').hide();
					$('#targetDuplicateKeys').modal('show');
			},
			error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
		});
	}
	
	function gettgtorphan()
	{
		var abc = $('#Ttestname').text().split('/');
		var testID = abc[0];
		var prjName = $('#Tproname').text();
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getRecords',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'gettgtorphan', 'page' : '1'}),
			success: function(response){
					$("#tabuluuuu tbody").empty();
					$("#tabuluuuu tbody").append(response.table);
					document.getElementById("clickEventTitle").innerHTML = "Orphan Key(s) in Target";
					
					var ind = $('#orptgtCount').text();
					var eind = '';
					if(ind%1000 > 0)
						eind = Math.trunc(ind/1000)+1;
					else
						eind = Math.trunc(ind/1000);
					
					$('#SRMLTB').val("1");
					$('#SRMRTB').val(eind);
					
					$('#spinLoad').hide();
					$('#targetDuplicateKeys').modal('show');
			},
			error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
		});
	}
	
	function getMismatches()
	{
		var abc = $('#Ttestname').text().split('/');
		var testID = abc[0];
		var prjName = $('#Tproname').text();
		$('#spinLoad').show();
		$.ajax({
			type: 'post',
			url: localUrl+'getRecords',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'getMismatches', 'page' : '1'}),
			success: function(response){
					$("#tabulu1 tbody").empty();
					$("#tabulu1 tbody").append(response.srcTable);
					$("#tabulu2 tbody").empty();
					$("#tabulu2 tbody").append(response.tgtTable);
					
					var ind = $('#misMatsrcCount').text();
					var eind = '';
					if(ind%1000 > 0)
						eind = Math.trunc(ind/1000)+1;
					else
						eind = Math.trunc(ind/1000);
					
					$('#MRMLTB').val("1");
					$('#MRMRTB').val(eind);					
					
					$('#spinLoad').hide();
					$('#mismatchAggregate').modal('show');
			},
			error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
		});
	}
	
	function SRMLButton() {
		/*Previous Page*/
		var ind = $('#SRMLTB').val();
		if(ind === "1"){}
		else
		{
			var pgVal = --ind;
			
			var getValueFor = '';
			if($('#clickEventTitle').text() === "Duplicate Key(s) in Source")
				getValueFor = 'getsrcduplicates';
			else if($('#clickEventTitle').text() === "Duplicate Key(s) in Target")
				getValueFor = 'gettgtduplicates';
			else if($('#clickEventTitle').text() === "Orphan Key(s) in Source")
				getValueFor = 'getsrcorphan';
			else if($('#clickEventTitle').text() === "Orphan Key(s) in Target")
				getValueFor = 'gettgtorphan';
			
			var abc = $('#Ttestname').text().split('/');
			var testID = abc[0];
			var prjName = $('#Tproname').text();
			$('#spinLoad').show();
			$.ajax({
				type: 'post',
				url: localUrl+'getRecords',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : getValueFor, 'page' : pgVal}),
				success: function(response){
						$("#tabuluuuu tbody").empty();
						$("#tabuluuuu tbody").append(response.table);			
						$('#SRMLTB').val(pgVal);
						$('#spinLoad').hide();
				},
				error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
			});
		}
	}
	
	function SRMRButton() {
	    /*Next Page*/
		//alert("bajila");
		var ind = $('#SRMLTB').val();
		if(ind === $('#SRMRTB').val()){}
		else
		{
			var pgVal = ++ind;
			
			var getValueFor = '';
			if($('#clickEventTitle').text() === "Duplicate Key(s) in Source")
				getValueFor = 'getsrcduplicates';
			else if($('#clickEventTitle').text() === "Duplicate Key(s) in Target")
				getValueFor = 'gettgtduplicates';
			else if($('#clickEventTitle').text() === "Orphan Key(s) in Source")
				getValueFor = 'getsrcorphan';
			else if($('#clickEventTitle').text() === "Orphan Key(s) in Target")
				getValueFor = 'gettgtorphan';
			
			var abc = $('#Ttestname').text().split('/');
			var testID = abc[0];
			var prjName = $('#Tproname').text();
			$('#spinLoad').show();
			$.ajax({
				type: 'post',
				url: localUrl+'getRecords',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : getValueFor, 'page' : pgVal}),
				success: function(response){
						$("#tabuluuuu tbody").empty();
						$("#tabuluuuu tbody").append(response.table);			
						$('#SRMLTB').val(pgVal);
						$('#spinLoad').hide();
				},
				error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
			});
		}
	}

	function MRMLButton() {
		/*Previous Page*/
		var ind = $('#MRMLTB').val();
		if(ind === "1"){}
		else
		{
			var pgVal = --ind;
			
			var abc = $('#Ttestname').text().split('/');
			var testID = abc[0];
			var prjName = $('#Tproname').text();
			$('#spinLoad').show();
			$.ajax({
				type: 'post',
				url: localUrl+'getRecords',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'getMismatches', 'page' : pgVal}),
				success: function(response){
						$("#tabulu1 tbody").empty();
						$("#tabulu1 tbody").append(response.srcTable);
						$("#tabulu2 tbody").empty();
						$("#tabulu2 tbody").append(response.tgtTable);			
						$('#MRMLTB').val(pgVal);
						$('#spinLoad').hide();
				},
				error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
			});
		}
	}
	
	function MRMRButton() {
		/*Next Page*/
		var ind = $('#MRMLTB').val();
		if(ind === $('#MRMRTB').val()){}
		else
		{
			var pgVal = ++ind;

			var abc = $('#Ttestname').text().split('/');
			var testID = abc[0];
			var prjName = $('#Tproname').text();
			$('#spinLoad').show();
			$.ajax({
				type: 'post',
				url: localUrl+'getRecords',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({'projectName' : prjName,'testID' : testID, 'value' : 'getMismatches', 'page' : pgVal}),
				success: function(response){
						$("#tabulu1 tbody").empty();
						$("#tabulu1 tbody").append(response.srcTable);
						$("#tabulu2 tbody").empty();
						$("#tabulu2 tbody").append(response.tgtTable);		
						$('#MRMLTB').val(pgVal);
						$('#spinLoad').hide();
				},
				error: function(response){alert("Unexpected Error at getRecords()");$('#spinLoad').hide();}
			});
		}
	}
	
	 
	