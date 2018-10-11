function init()
{
	sessionStorage.setItem("ptnum", "0");
}


function addPoint()
{
	let table = document.getElementById("table");
	
	// update pts counter
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	ptnum++;
	sessionStorage.setItem("ptnum", ptnum);
	
	// remove last row (button)
	table.deleteRow(ptnum);
	
	// add a new row to the table for the new point
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "lato&nbsp;" + ptnum;
	if(ptnum > 1)
		cell2.innerHTML = "<center><input id='inang' type='text' style='width:80%'></center>";
	else
		cell2.innerHTML = "<center>---</center>";
	cell3.innerHTML = "<center><input id='inlat' type='text' style='width:80%'></center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create the new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='confirm()' value='OK' style='width:100%'>";
	
	table.appendChild(but_row);
}

function confirm()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	let table = document.getElementById("table");
	
	if(ptnum > 1)
	{
		var ang = document.getElementById("inang").value;
		ang = ang.replace(",", ".");
		sessionStorage.setItem("ang"+ptnum, ang);
	}
	let lat = document.getElementById("inlat").value;
	lat = lat.replace(",", ".");
	sessionStorage.setItem("lat"+ptnum, lat);
	
	// remove old rows
	table.deleteRow(ptnum+1);
	table.deleteRow(ptnum);
	
	// create new point row
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "lato&nbsp;" + ptnum;
	if(ptnum > 1)
	{
		cell2.innerHTML = "<center>" + ang + "</center>";
	}
	else
	{
		cell2.innerHTML = "<center>---</center>";
	}
	cell3.innerHTML = "<center>" + lat + "</center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='addPoint()' value='Aggiungi lato' style='width:100%'>";
	
	table.appendChild(but_row);
	
	updateArea();
}

function updateArea()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	
	let A = 0;
	
	let jump;
	let j;
	let z;
	
	let sign = 1;
	
	// per ogni fila
	for(jump=1; jump<=ptnum-1; jump++)
	{
		// per ogni elemento della fila
		for(j=1; j<=ptnum-jump; j++)
		{
			let ang_sum = 0;
			
			for(z=j+1; z<=j+jump; z++)
			{
				ang_sum += Number(sessionStorage.getItem("ang"+z));
			}
			
			console.log(ang_sum);
			
			// convert to radiant
			ang_sum *= Math.PI / 200;
			
			console.log(ang_sum);
			
			A += sessionStorage.getItem("lat"+j) * sessionStorage.getItem("lat"+(j+jump)) * (Math.sin(ang_sum)) * sign;
		}
		
		sign = -sign;
	}
	
	A /= 2;
	if(A < 0)
		A = -A;
	
	document.getElementById("area").innerHTML = "AREA: " + A;
}
