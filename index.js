// var HID = require('node-hid');
// var devices = HID.devices();
// console.log(devices);

var BarcodeReaders = require('node-hid-stream').KeyboardLines;
var barcodeReaders = new BarcodeReaders({vendorId : 5050, productId : 24 });
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '192.168.0.100',
	user : 'root',
	password : '',
	database : 'barcode'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) throw err;
  console.log('Koneksi Database Berhasil');
  //alert();
 wpi.digitalWrite(pin,0);
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
	var post = {id : data};
	insertData(post);
	console.log('===============================');
	panggilData();
});

function insertData(x) {
	connection.query('INSERT INTO data_barcode SET ?' , x , function(err, result) { 
		if(err){
			console.log('Error : Data sudah ada');
			alert();
		} else {
			console.log('Success : Data berhasil diinput');
		}
	});
}

function panggilData() {
	connection.query('SELECT * FROM data_barcode', function(err,rows){
	  if(err) throw err;
	  console.log('Data ID Barcode (JSON Type):');
	  console.log('===============================');
	  console.log(rows);
	});
};

//connection.end();

var wpi = require('wiring-pi');
wpi.setup('wpi');
var pin = 21;
var value = 1;
wpi.pinMode(pin , wpi.OUTPUT);

function alert() {
	//wpi.pinMode(pin , wpi.OUTPUT);
	wpi.digitalWrite(pin,value);
	//value = +! value;
	wpi.delay(1000);
	wpi.digitalWrite(pin,0);
};

//setInterval(alert , 500);
