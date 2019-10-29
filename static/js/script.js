var gyroData, accelData;

if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope();
	gyro.addEventListener('reading', function(e) {
		gyroData = {x: e.target.x, y: e.target.y, z: e.target.z};
		console.log(gyroData);
	});
	gyro.start();
}
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer();
	accl.addEventListener('reading', function(e) {
		accelData =  {x: e.target.x, y: e.target.y, z: e.target.z};
		console.log(accelData);
	});
	accl.start();
}

var app = new Vue({
	el: '#app',
	data: {
		gyro: gyroData,
		accel: accelData,
	},
	vuetify: new Vuetify({
		theme: { dark: true },
	}),
});