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
			width: '30%',
		},
		{ text: 'X', value: 'x', width: '10%'},
		{ text: 'Y', value: 'y', width: '10%'},
		{ text: 'Z', value: 'z', width: '10%'},
		],
		sensor: [gyroData, accelData],
		activity: 'Idle'
	},
	methods: {
		updateData: async function ()
		{
			this.sensor = [gyroData, accelData];
			await this.$nextTick();
		}
	},
	vuetify: new Vuetify({
		theme: { dark: true },
	}),
});

if ( 'Gyroscope' in window ) {
	let gyro = new Gyroscope();
	gyro.addEventListener('reading', function(e) {
		gyroData = {name:'Gyroscope', x: e.target.x, y: e.target.y, z: e.target.z};
		app.updateData();
	});
	gyro.start();
}
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer();
	accl.addEventListener('reading', function(e) {
		accelData =  {name:'Accelerometer', x: e.target.x, y: e.target.y, z: e.target.z};
		app.updateData();
	});
	accl.start();
}