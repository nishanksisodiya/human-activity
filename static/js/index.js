let gyro = document.getElementById('gyro');
let accelero = document.getElementById('accl');

setInterval(function()
{
	let gyroData = [];
	let accelData = [];

	if ( 'Gyroscope' in window ) {
		let gyro = new Gyroscope({ frequency: 50 });
		gyro.addEventListener('reading', function(e) {
			gyro.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
			gyroData.push([e.target.x,e.target.y,e.target.z]);
		});
		gyro.start();
	}
	else gyro.innerHTML = 'Gyroscope not supported';

	if ( 'Accelerometer' in window ) {
		let accel = new Accelerometer({ frequency: 50 });
		accel.addEventListener('reading', function(e) {
			accelero.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
			accelData.push([e.target.x,e.target.y,e.target.z]);
		});
		accel.start();
	}
	else accelero.innerHTML = 'Accelerometer not supported';
	var dict = {}
	dict["gyro"] = gyroData;
	dict["accel"] = accelData;

	$.ajax({
		type:"post",
		url:"/uploadData",
		datatype:"json",
		data: dict,
		success:function(data)
		{

		}
	});
}, 3000);