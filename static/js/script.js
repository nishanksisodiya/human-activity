var gyroData = 'Gyroscope Not Supported', accelData = 'Accelerometer Not Supported';

if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope();
	gyro.addEventListener('reading', function(e) {
		gyroData = e.target;
	});
	gyro.start();
}
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer();
	accl.addEventListener('reading', function(e) {
		accelData =  e.target;
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