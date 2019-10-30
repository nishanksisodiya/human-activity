var gyroData = {name:'Gyroscope', x: 0, y: 0, z: 0}, accelData = {name:'Accelerometer', x: 0, y: 0, z: 0};

const recognition = { template: `
<v-container class="fill-height" fluid>
	<v-row align="center" justify="center">
		<v-data-table
		:headers="$parent.$parent.$parent.headers"
		:items="$parent.$parent.$parent.sensor"
		:hide-default-footer="true"></v-data-table>
	</v-row>
	<v-row align="center" justify="center">
		<v-alert text
		color="success"
		class="subtitle-2">{{$parent.$parent.$parent.activity}}</v-alert>
	</v-row>
</v-container>
`};
const about = { template: `<v-container class="fill-height" fluid>
<div>About Project</div>
</v-container>` };
const team = { template: `<v-container class="fill-height" fluid>
<div>About Team</div>
</v-container>` };

const routes = [
{ path: '/', component: recognition },
{ path: '/about', component: about },
{ path: '/team', component: team },
];
const router = new VueRouter({
	routes: routes,
});

var app = new Vue({
	el: '#app',
	router,
	data: {
		headers: [
		{
			text: 'Sensor',
			align: 'left',
			sortable: false,
			value: 'name',
			width: '30%',
		},
		{ text: 'X', value: 'x', width: '15%'},
		{ text: 'Y', value: 'y', width: '15%'},
		{ text: 'Z', value: 'z', width: '15%'},
		],
		sensor: [gyroData, accelData],
		activity: 'Idle',
		items: [
		{
			action: 'mdi-run-fast',
			title: 'Activity Recognition',
			path: '/',
		},
		{
			action: 'mdi-code-greater-than',
			title: 'About Project',
			path: '/about',
		},
		{
			action: 'mdi-account-multiple',
			title: 'About Team',
			path: '/team',
		}
		],
	},
	model: 1,
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