 // ##################################### 
// CODI DEL Enfonsar Flota Vaixells
// ####################################### 
   
var H=0;
var V=0;
var PosActual=[H]+[V];
var h=1;
var v=1;
var PosDesitg=[h]+[v];
 
function build(){// Posar l'imatge i el panell amb els botons de començar 
	for (H=1; H<=9; H++){
		for (V=1; V<=9; V++) {
			
		var posicio = document.getElementById("posicions");
		var nouValor = document.createElement("input");
		nouValor.setAttribute("type", "button");
		nouValor.setAttribute("class", "botoA");
		nouValor.setAttribute("id", [H]+[V]);  // caselles amb ID =  [H][V]
		nouValor.setAttribute("value", [H]+[V]);
		nouValor.setAttribute("onclick", "actuar(this)");  // ull amb la sintaxi "comprobar(this)" !

		posicio.appendChild(nouValor);
	//console.log("ID de casella" + i + " val: " + nouValor.id); // control del array
		}
	posicio.appendChild(document.createElement("br"));}
} //end build()

 // (Possibles valors: idxI (Inicial) ; idxT (Tocat) ; idxE nfonsat ; idx Aigua )  

var PesActual=5; // PES del vaixell actual
var count=1; // contador de fitxa actual
var jocactiu=false;
var Modus="horitzontal"; //horitzontal o vertical
var statusfitxa=""; // !! aquesta variable potser me la puc carregar
var lliure=false;

// Entro a iniciar al principi i quan les fitxes ja estan situades, amb Jugar.. 
function iniciar(){ 
	console.log("he entrat a iniciar "); 
	console.log("Jocactiu: " + jocactiu);
   	if ( jocactiu == false) {  // vol dir que els vaixells ja estan posicionats i es pot iniciar el joc.
	PesActual=5;
	document.getElementById("fitxes").innerHTML=PesActual;
	count=1;
	colocar();
	// $(document).ready(function(){ $("#fitxes").innerHTML("5");
	}
 
	if (jocactiu == true){ // Finalment passar a mode invisible i deixar que algú jugui la partida.
	// document.getElementsByClass("botoI").className="botoA"; // ByClassByClassByClassByClass
	} // amagar tots els vaixells a nivell de color i treure els codis numerics ID
}// end iniciar  


function aleatoris(){
	var h_incorrecte=true;
		while (h_incorrecte){
		h = Math.round(Math.random()*10)+1;   // MAJUSCULES LA M !! .. multiplica el random x10 i arrodoneix (ROUND) el Random a l'enter superior 
		if (h<10) h_incorrecte=false;		// comprova si és mejor que 10 i en cas que sigui igual a 10 recalcula el numero
		} // end while
	var v_incorrecte=true;
		while (v_incorrecte){
		v = Math.round(Math.random()*10)+1;   // MAJUSCULES LA M !! .. multiplica el random x10 i arrodoneix (ROUND) el Random a l'enter superior 
		if (v<10) v_incorrecte=false;		// comprova si és mejor que 10 i en cas que sigui igual a 10 recalcula el numero
		} // end while
	PosDesitg=[h]+[v];
	document.getElementById(PosDesitg).className="botoD"; // marca en VERD la PosDesitg
}//end aleatoris

function algorismeocupat(){
	//console.log("he entrat a algorismeocupat"); 
	//statusfitxa=document.getElementById(PosDesitg).value;
	//console.log("statusfitxa " + statusfitxa);
	if (document.getElementById(PosDesitg).value == document.getElementById(PosDesitg).id) lliure=true;
	console.log("lliure? " + lliure);
	return(lliure);
}//end algorismeocupat

function algorismeespai(){
	//document.getElementById(PosDesitg).value = document.getElementById(PosDesitg).value.substr(2,3); //statusfitxa
	
	//ocupat
	// null si es fora del rang del tauler (00, 10, 20, 100)
}

function colocar(){
	if (PesActual >= 2) {
	 if (count <= PesActual) {
		console.log("PesActual? " + PesActual);
		switch(count){
		case 1: // Primera Fitxa
			aleatoris();
			algorismeocupat();
			//algorismeespai();
			//console.log("PosDesitg " + PosDesitg+PesActual+"I");
			console.log("case 1:  Element h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
			if (lliure == true) document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
			console.log("document.getElementById(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
			document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
			PosActual = PosDesitg; // Actualitzo la PosActual
			count++;
			break;
			
		case 2: // 2 Fitxa
			aleatoris();
			algorismeocupat();
			//algorismeespai();
			//console.log("PosDesitg " + PosDesitg+PesActual+"I");
			console.log("case 2:  Element h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
			if (lliure == true) document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
			console.log("document.getElementById(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
			document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
			PosActual = PosDesitg; // Actualitzo la PosActual
			count++;
			break;
			
		case 3: // 3 Fitxa
			aleatoris();
			algorismeocupat();
			//algorismeespai();
			//console.log("PosDesitg " + PosDesitg+PesActual+"I");
			console.log("case 3:  Element h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
			if (lliure == true) document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
			console.log("document.getElementById(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
			document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
			PosActual = PosDesitg; // Actualitzo la PosActual
			count++;
			break;
			
		case 4: // 4 Fitxa
			aleatoris();
			algorismeocupat();
			//algorismeespai();
			//console.log("PosDesitg " + PosDesitg+PesActual+"I");
			console.log("case 4:  Element h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
			if (lliure == true) document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
			console.log("document.getElementById(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
			document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
			PosActual = PosDesitg; // Actualitzo la PosActual
			count++;
			break;
			
		case 5: // 5 Fitxa
			aleatoris();
			algorismeocupat();
			//algorismeespai();
			//console.log("PosDesitg " + PosDesitg+PesActual+"I");
			console.log("case 5:  Element h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
			if (lliure == true) document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
			console.log("document.getElementById(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
			document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
			PosActual = PosDesitg; // Actualitzo la PosActual
			count++;
			break;
				
		default: 
			break;

		}//end switch count
				colocar();
		}//end if (count <= PesActual)
		
		console.log("count: " + count);
			PesActual--; 
			console.log("Seguent Vaixell de " + PesActual + " fitxes");
			document.getElementById("fitxes").innerHTML=PesActual;
			count=1;
			

	
			//count++;
			//colocar();

	}// end if (PesActual >= 2)
	colocar();
	
	// jocactiu=true; // Al final passar a mode joc real i amagar fitxes, etc...
}//end colocar


function actuar(fitxa){
    // console.log(fitxa.value);
 	if (PesActual >= 2) {
	if (count <= PesActual) {
		if (fitxa.value == fitxa.id){ // aqui comprobo si la posicio te un estat ocupat o lliure
		fitxa.value = (fitxa.id+PesActual+"I"); // o tb aixi:  fitxa.value = fitxa.value.concat("5","I");
		fitxa.className="botoI";
		//console.log("fitxa.value final: " + fitxa.value);
		console.log("count: " + count);
		count++;}
	}
	else {
		PesActual--; 
		alert("Seguent Vaixell de " + PesActual + " fitxes");
		document.getElementById("fitxes").innerHTML=PesActual;
		count=1;
	}
	}
    
	else {
		alert("ja has posat tots els vaixells");
		document.getElementById("jugar").innerHTML="Jugar"; // canvio el texte del boto de iniciar a jugar
		jocactiu=true; // activar boto jugar i desactivar iniciar
	}
}// end actuar
 
   
function reset(){
    build(); // això només afegeix més casselles a la pantalla
}

 