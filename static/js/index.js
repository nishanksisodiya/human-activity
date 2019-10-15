 let status = document.getElementById('status');
 if ( 'Gyroscope' in window ) {
 	let sensor = new Gyroscope();
 	sensor.addEventListener('reading', function(e) 
 	{
 		document.getElementById('x').innerHTML = "x: " + e.target.x;
 		document.getElementById('y').innerHTML = "y: " + e.target.y;
 		document.getElementById('z').innerHTML = "z: " + e.target.z;
 	});
 	sensor.start();
 }
 else document.getElementById('error').innerHTML = 'Gyroscope not supported';