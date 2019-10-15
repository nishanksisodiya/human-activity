let gyro = document.getElementById('gyro');
let accelero = document.getElementById('accl');

setInterval(function()
{
	let gyroData = [];
	$.ajax({
		type:"post",
		url:"myurl.html",
		datatype:"html",
		success:function(data)
		{

		}
	});
}, 3000);
if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope({ frequency: 50 });
	gyro.addEventListener('reading', function(e) {
		gyro.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
	});
	gyro.start();
}
else gyro.innerHTML = 'Gyroscope not supported';

if ( 'Accelerometer' in window ) {
	let accel = new Accelerometer({ frequency: 50 });
	accel.addEventListener('reading', function(e) {
		accelero.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
	});
	accel.start();
}
else accelero.innerHTML = 'Accelerometer not supported';