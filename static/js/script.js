var gyroData = {name:'Gyroscope', x: 0, y: 0, z: 0}, accelData = {name:'Accelerometer', x: 0, y: 0, z: 0};
var accelArray = [];
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


const about = { template: `
<v-container>
	<h2>Whats is Human Activity Recognizer?</h2>
	<p>Human activity recognition is the problem of classifying sequences of accelerometer data recorded by specialized harnesses or smart phones into known well-defined movements.
	<br><br>
It is a challenging problem given the large number of observations produced each second, the temporal nature of the observations, and the lack of a clear way to relate accelerometer data to known movements.</p>
</v-container>
` };

const team = { template: `
<v-container class="fill-height" fluid>
	<v-row class="mb-4" no-gutters>
		<v-col v-for="member in $parent.$parent.$parent.members">
			<v-card class="transparent" elevation=0 align="center" justify="center">
				<v-img
					:src="member.img"
					:lazy-src="member.img"
					aspect-ratio="1"
					height="300"
					max-height="300"
					width="300"
					max-width="300"
					class="img-circle"
				></v-img>
				<v-card-title class="justify-center pb-0">{{member.name}}</v-card-title>
				<v-card-actions class="justify-center pt-0">
					<v-btn icon :href="member.github">
						<v-icon>mdi-github-circle</v-icon>
					</v-btn>

					<v-btn icon :href="member.linkedin">
						<v-icon>mdi-linkedin</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</v-container>`
};

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
		sensor: [accelData],
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
		members: [
			{
				name: 'Mohit Mourya',
				img: './static/img/mohit.jpg',
				github: 'https://github.com/mohitmourya',
				linkedin: 'https://www.linkedin.com/in/mohit-mourya/',
			},
			{
				name: 'Lalit Meena',
				img: './static/img/lalit.jpg',
				github: 'https://github.com/scleaverzer0ne',
				linkedin: 'https://www.linkedin.com/in/lalitmeena/',
			},
			{
				name: 'Nishank Singh Sisodiya',
				img: './static/img/nishank.jpg',
				github: 'https://github.com/nishanksisodiya',
				linkedin: 'https://www.linkedin.com/in/nishanksisodiya/',
			},
		],
	},
	model: 1,
	methods: {
		updateData: async function ()
		{
			this.sensor = [accelData];
			await this.$nextTick();
		},
		updateActivity: async function (act) 
		{
			this.activity = act;
			await this.$nextTick();
		}
	},
	vuetify: new Vuetify({
		theme: { dark: true },
	}),
});
// if ( 'Gyroscope' in window ) {
// 	let gyro = new Gyroscope();
// 	gyro.addEventListener('reading', function(e) {
// 		gyroData = {name:'Gyroscope', x: e.target.x, y: e.target.y, z: e.target.z};
// 		app.updateData();
// 	});
// 	gyro.start();
// }
if ( 'Accelerometer' in window ) {
	let accl = new Accelerometer({ frequency: 50 });
	accl.addEventListener('reading', function(e) {
		accelData =  {name:'Accelerometer', x: e.target.x, y: e.target.y, z: e.target.z};
		accelArray.push([e.target.x, e.target.y, e.target.z]);
		if(accelArray.length == 200)
		{
			$.ajax({
				url: "/predictaction",
				type: "POST",
				data:  accelArray,
				contentType: false,
				cache: false,
				processData:false,
				success: function(data)
				{
					app.updateActivity(data);
					accelArray = [];
				}
			});
		}
		app.updateData();
	});
	accl.start();
}
