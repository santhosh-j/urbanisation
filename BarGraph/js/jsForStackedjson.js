var csv2JsonLong = function(inFile,outFile){
	var readline = require('readline');
	var headerLine ;
	var hlen ;
	var tmp =[];
	for(var i=1960 ;i<=2015;i++){
		tt = new Object();
		tt.Rural = +0;
		tt.Urban = +0;
		tt.Year = i;
		tmp.push(tt);
	}
	var count =0;
	const rl = readline.createInterface({
    input: fs.createReadStream(inFile),
    terminal: false
}).on('line', function(line) {
	count++;
	if(count =="1") {
		headerLine = line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
		hlen = headerLine.length-1;
	}else{
	var AsianCount = ['AZERBAIJAN', 'JAPAN', 'QATAR', 'ARMENIA', 'JORDAN', 'SAUDI ARABIA', 'BAHRAIN', 'KAZAKHSTAN', 'SINGAPORE', 'BANGLADESH', 'KUWAIT', 'SOUTH KOREA', 'BHUTAN', 'KYRGYZSTAN', 'SRI LANKA', 'BRUNEI', 'LAOS', 'SYRIA', 'BURMA', 'LEBANON', 'TAIWAN', 'CAMBODIA', 'MALAYSIA', 'TAJIKISTAN', 'CHINA', 'MALDIVES', 'THAILAND', 'EAST TIMOR', 'MONGOLIA', 'TURKEY', 'INDIA', 'NEPAL', 'TURKMENISTAN', 'INDONESIA', 'NORTH KOREA', 'UNITED ARAB EMIRATES', 'IRAN', 'OMAN', 'UZBEKISTAN', 'IRAQ', 'PAKISTAN', 'VIETNAM', 'ISRAEL', 'PHILIPPINES', 'YEMEN'];
	var val = line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
	if(AsianCount.indexOf(val[0].toUpperCase())!=-1){
		if(val[2] == "Rural population (% of total population)") {
				tmp[+val[4]-1960].Rural += +val[5];
			}else if(val[2] == "Urban population (% of total)"){
				tmp[+val[4]-1960].Urban += +val[5];
			}
	}
}
}).on('close', function() {
		fs.writeFileSync(outFile, JSON.stringify(tmp));
		console.log("done");
    process.exit(0);
});
}

const fs = require('fs');
var inFile = "./../../dataFiles/csv/Indicators.csv";
var outFile = "./../../dataFiles/json/stacked.json";
csv2JsonLong(inFile,outFile);
