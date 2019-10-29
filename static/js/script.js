var gyroData = {name:'Gyroscope', x: 0, y: 0, z: 0}, accelData = {name:'Accelerometer', x: 0, y: 0, z: 0};

var app = new Vue({
	el: '#app',
	data: {
		headers: [
		{
			text: 'Sensor',
			align: 'left',
			sortable: false,
			value: 'name',
		},
		{ text: 'X', value: 'x'},
		{ text: 'Y', value: 'y' },
		{ text: 'Z', value: 'z' },
		],
		sensor: [gyroData, accelData],
	},
	vuetify: new Vuetify({
		theme: { dark: true },
	}),
});

if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope();
	gyro.addEventListener('reading', function(e) {
		gyroData = {name:'Gyroscope', x: e.target.x, y: e.target.y, z: e.target.z};
		console.log(gyroData);
	});
	gyro.start();
}
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer();
	accl.addEventListener('reading', function(e) {
		accelData =  {name:'Accelerometer', x: e.target.x, y: e.target.y, z: e.target.z};
		console.log(accelData);
	});
	accl.start();
}