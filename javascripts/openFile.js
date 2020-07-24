let fs = require('fs');

var openFile = function openFile(path,response, nameofstreamer){
    fs.readFile(path, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}
module.exports = openFile;