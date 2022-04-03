

let EXCEL_JSON;

/**
	* 엑셀파일 입력 받아서 json 형으로 만들기
	* @param xlsxFiles
	*/
function xlsxToJson(xlsxFiles){
		$.each(xlsxFiles, function (index, file) {
				let reader = new FileReader(); //FileReader를 생성한다.

				//성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
				reader.onload = function (e) {

						let data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.

						//바이너리 형태로 엑셀파일을 읽는다.
						let workbook = XLSX.read(data, {type: 'binary'});

						//엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
						workbook.SheetNames.forEach(function (item, index, array) {
								EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
								console.log(EXCEL_JSON);
						});//end. forEach

				}; //end onload
				//파일객체를 읽는다. 완료되면 원시 이진 데이터가 문자열로 포함됨.
				reader.readAsBinaryString(file);
		});
}


/**
	* 데이터 받아서 엑셀파일로 만들기
	* @param JSONData
	* @param ReportTitle
	* @param ShowLabel
	* @constructor
	*/
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

		let CSV = '';
		//Set Report title in first row or line

		// CSV += ReportTitle + '\r\n\n';

		//This condition will generate the Label/Header
		if (ShowLabel) {
				let row = "";

				//This loop will extract the label from 1st index of on array
				for (let index in arrData[0]) {
						//Now convert each value to string and comma-seprated
						row += index + ',';
				}

				row = row.slice(0, -1);

				//append Label row with line break
				CSV += row + '\r\n';
		}

		//1st loop is to extract each row
		for (let i = 0; i < arrData.length; i++) {
				let row = "";

				//2nd loop will extract each column and convert it in string comma-seprated
				for (let index in arrData[i]) {
						row += '"' + arrData[i][index] + '",';
				}

				row.slice(0, row.length - 1);

				//add a line break after each row
				CSV += row + '\r\n';
		}

		if (CSV == '') {
				alert("Invalid data");
				return;
		}

		//Generate a file name
		let fileName = "Report_Trans_History_";
		//this will remove the blank-spaces from the title and replace it with an underscore
		fileName += ReportTitle.replace(/ /g, "_");

		//Initialize file format you want csv or xls
		// let uri = 'data:text/csv;charset=utf-8,' + escape(CSV); // 기본
		let uri = 'data:text/csv;charset=UTF-8,\uFEFF' + encodeURI(CSV);  // 한글깨짐 방지

		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension

		//this trick will generate a temp <a /> tag
		let link = document.createElement("a");
		link.href = uri;

		//set the visibility hidden so it will not effect on your web-layout
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";

		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
}