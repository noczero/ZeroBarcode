// var HID = require('node-hid');
// var devices = HID.devices();
// console.log(devices);

var BarcodeReaders = require('node-hid-stream').KeyboardLines;
var barcodeReaders = new BarcodeReaders({vendorId : 5050, productId : 24 });
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'noczero',
	database : 'barcode'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) throw err;
  console.log('Koneksi Database Berhasil');
});

connection.ping(function (err) {
  if (err) throw err;
  console.log('Server responded to ping');
  console.log('===============================');
})

barcodeReaders.on("data" , function(data) {
	console.log('===============================');
	console.log(data);
	console.log('Insert ke Database : ');
	var post = {ID : data};
	insertData(post);
	console.log('===============================');
	panggilData();
});

function insertData(x) {
	connection.query('INSERT INTO onlyOne SET ?' , x , function(err, result) { 
		if(err){
			console.log('Error : Data sudah ada');
		} else {
			console.log('Success : Data berhasil diinput');
		}
	});
}

function panggilData() {
	connection.query('SELECT * FROM onlyOne', function(err,rows){
	  if(err) throw err;
	  console.log('Data ID Barcode (JSON Type):');
	  console.log('===============================');
	  console.log(rows);
	});
};

//connection.end();