// line 1 needs to done
// comma needs to be removed--done
//write file--done
var csv2JsonLong = function(inFile,outFile,col){
	var readline = require('readline');
	var headerLine ;//= col.split(",");
	var hlen ;
	var jsonData = [];
	var count =0;
	const rl = readline.createInterface({
    input: fs.createReadStream(inFile),
    terminal: false
}).on('line', function(line) {
	count++;
	if(count =="1") {
		headerLine = line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
		console.log(headerLine);
		hlen = headerLine.length-1;
	}
	var tmp ={};
	var val = line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
	if((val[2] == "Rural population (% of total population)"  || val[2] == "Urban population (% of total)" )&& val[1] == "IND") {
			for(var j =0;j<=hlen ;j++){
				if(col.indexOf(j)!=-1)
				tmp[headerLine[j]] = val[j];
			}
			jsonData.push(tmp);
}
}).on('close', function() {
		console.log(jsonData);
		fs.writeFileSync('./test1.json', JSON.stringify(jsonData) , 'utf-8');
		console.log("done");
    process.exit(0);
});
}

const fs = require('fs');
var inFile = "Book1.csv";
//var inFile = "Indicators.csv";
var outFile = "test1.json";
var col = [2,4,5]//"CountryName,CountryCode,IndicatorName,IndicatorCode,Year,Value";
csv2JsonLong(inFile,outFile,col);
