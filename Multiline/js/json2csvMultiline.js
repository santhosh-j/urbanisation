var csv2JsonLong = function(a, b, c) {
    var d = require("readline");
    var e;
    var f;
    var g = [];
    var h = 0;
    const i = d.createInterface({
        input: fs.createReadStream(a),
        terminal: false
    }).on("line", function(a) {
        h++;
        if ("1" == h) {
            e = a.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
            f = e.length - 1;
        }
        var b = {};
        var d = a.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
        if (("Rural population (% of total population)" == d[2] || "Urban population (% of total)" == d[2]) && "IND" == d[1]) {
            for (var i = 0; i <= f; i++) if (c.indexOf(i) != -1) b[e[i]] = d[i];
            g.push(b);
        }
    }).on("close", function() {
        fs.writeFileSync(outFile, JSON.stringify(g), "utf-8");
        console.log("done");
        process.exit(0);
    });
};

const fs = require("fs");

var inFile = "./../../dataFiles/csv/Indicators.csv";

var outFile = "./../../dataFiles/json/multiline.json";

var col = [ 2, 4, 5 ];

csv2JsonLong(inFile, outFile, col);
