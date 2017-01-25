const fs = require('fs');
const rl = require('readline');
function converter(countryArray){
var rd = rl.createInterface({
    input: fs.createReadStream('../csv/Indicators.csv'),
    output: process.stdout,
    terminal: false
});


arr = [];
arr1 = [];
arr2 = [];
arr3 = [];
var rural=0;
rural_arr=[0,0,0,0,0];
urban_arr=[0,0,0,0,0];
country=['India', 'China', 'Pakistan', 'Sri Lanka', 'Bangladesh'];
rd.on('line', function(data) {
    let linearr=data.split(",");
    if(linearr[1]=="IND" && linearr[3]=="SP.RUR.TOTL.ZS")
      rural=linearr[5];
    if(linearr[1]=="IND" && linearr[3]=="SP.URB.TOTL.IN.ZS")
        arr1.push({'year':linearr[4],'Rural population (% of total)':rural,'Urban population (% of total)':linearr[5]});
    if(linearr[1]=="IND" && linearr[3]=="SP.URB.GROW")
        arr2.push({'year':linearr[4],'Urban population growth (annual %)':linearr[5]});

    if(linearr[1]==="IND" && linearr[3]=="SP.RUR.TOTL")
       rural_arr[0]=rural_arr[0] + parseInt(linearr[5]);
    if(linearr[1]==="IND" && linearr[3]=="SP.URB.TOTL")
        urban_arr[0]= urban_arr[0] + parseInt(linearr[5]);

    if(linearr[1]=="CHN" && linearr[3]=="SP.RUR.TOTL")
        rural_arr[1]=rural_arr[1] + parseInt(linearr[5]);
    if(linearr[1]=="CHN" && linearr[3]=="SP.URB.TOTL")
        urban_arr[1]= urban_arr[1] + parseInt(linearr[5]);

    if(linearr[1]=="PAK" && linearr[3]=="SP.RUR.TOTL")
        rural_arr[2]=rural_arr[2] + parseInt(linearr[5]);
    if(linearr[1]=="PAK" && linearr[3]=="SP.URB.TOTL")
        urban_arr[2]= urban_arr[2] + parseInt(linearr[5]);

    if(linearr[1]=="LKA" && linearr[3]=="SP.RUR.TOTL")
        rural_arr[3]= rural_arr[3] + parseInt(linearr[5]);
    if(linearr[1]=="LKA" && linearr[3]=="SP.URB.TOTL")
        urban_arr[3]= urban_arr[3] + parseInt(linearr[5]);

    if(linearr[1]=="BGD" && linearr[3]=="SP.RUR.TOTL")
        rural_arr[4]= rural_arr[4] + parseInt(linearr[5]);
    if(linearr[1]=="BGD" && linearr[3]=="SP.URB.TOTL")
        urban_arr[4]= urban_arr[4] + parseInt(linearr[5]);

});

rd.on('close', function() {
  for(let i=0;i<country.length;i++){
    //  let tot= parseInt(urban_arr[i]) + parseInt(rural_arr[i]);
      arr3.push({'Country':country[i],'Urban':urban_arr[i],'Rural':rural_arr[i]});
  }
  console.log(arr3);
  console.log(arr3.length);
  for (var i = 0; i < arr3.length; i++) {
      for (var j = 0; j < arr3.length-1; j++) {
        // let tot = arr3[j].Urban + arr3[j].Rural;
        // let tot1 = parseInt(arr3[j+1].Urban) + parseInt(arr3[j+1].Rural);
          if(arr3[j].Total_Population < arr3[j+1].Total_Population){

             let temp=arr3[j];
             arr3[j]=arr3[j+1];
             arr3[j+1]=temp;
          }
      }
  }
  fs.writeFile('../json/population1.json', JSON.stringify(arr1));
  fs.writeFile('../json/population2.json', JSON.stringify(arr2));
  fs.writeFile('../json/population3.json', JSON.stringify(arr3));
    console.log('Done');
});
return "Converted successfully";
}
