let status = document.getElementById('gyro');
if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope();
	gyro.addEventListener('reading', function(e) {
		status.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
	});
	gyro.start();
}
else status.innerHTML = 'Gyroscope not supported';

let accelero = document.getElementById('accl');
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer();
	accl.addEventListener('reading', function(e) {
		accelero.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
	});
	accl.start();
}
else accelero.innerHTML = 'Accelerometer not supported';