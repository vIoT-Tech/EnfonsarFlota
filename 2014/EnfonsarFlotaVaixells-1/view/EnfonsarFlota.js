// ##################################### 
// CODI DEL Enfonsar Flota Vaixells
// ####################################### 

var h=0;
var v=0;
var PosActual="";
var PosDesitg="";
var PesActual=5; // PES del vaixell actual
var count=1; // contador de fitxa actual
var jocactiu=false;
var lliure=false;
//var Modus="horitzontal"; //horitzontal o vertical
//var statusfitxa=""; // !! aquesta variable potser me la puc carregar
 
function build(){ // Posar l'imatge i el panell amb els botons de començar 
      console.log("soc a build");
	for (h=1; h<=9; h++){
		for (v=1; v<=9; v++) {
		var posicio = document.getElementById("posicions");
		var nouValor = document.createElement("input");
		nouValor.setAttribute("type", "button");
		nouValor.setAttribute("class", "botoA");
		nouValor.setAttribute("id", [h]+[v]);  // caselles amb ID =  [H][V]
		nouValor.setAttribute("value", [h]+[v]+"00"); // null
		nouValor.setAttribute("onclick", "actuar(this)");  // ull amb la sintaxi "comprobar(this)" !
		posicio.appendChild(nouValor);
		}
	 posicio.appendChild(document.createElement("br"));}
} //end build()

// (Possibles valors: idxI (Inicial) ; idxT (Tocat) ; idxE nfonsat ; idx Aigua )  
function iniciar(){
	console.log("---> he entrat a iniciar "); 
	console.log("Jocactiu: " + jocactiu);
   	if ( jocactiu == false) {  // vol dir que els vaixells ja estan posicionats i es pot iniciar el joc.
	PesActual=5;
	document.getElementById("fitxes").innerHTML=PesActual;
	// $(document).ready(function(){ $("#fitxes").innerHTML("5");
	count=1;
	colocar();}
 
	if (jocactiu == true){ // Finalment passar a mode invisible i deixar que algú jugui la partida.
	// document.getElementsByClass("botoI").className="botoA"; // !!!! ByClassByClassByClassByClass
	} // amagar tots els vaixells a nivell de color i treure els codis numerics ID
}// end iniciar  

function aleatoris(){
	var h_incorrecte=true;
		while (h_incorrecte){
		// 	var num = parseInt((Math.random()*9)+1); 
		h = Math.round(Math.random()*9);   // MAJUSCULES LA M !! .. multiplica el random x10 i arrodoneix (ROUND) el Random a l'enter superior 
		//if (h<10) h_incorrecte=false;		// comprova si és mejor que 10 i en cas que sigui igual a 10 recalcula el numero
		if ((h>1)&&(h<9)) h_incorrecte=false;		// comprova si és mejor que 10 i en cas que sigui igual a 10 recalcula el numero
		} // end while
	var v_incorrecte=true;
		while (v_incorrecte){
		  // 	var num = parseInt((Math.random()*9)+1);
		v = Math.round(Math.random()*9);   
		//if (v<10) v_incorrecte=false;	
		if ((v>1)&&(v<9)) v_incorrecte=false;	
		} // end while
	PosDesitg=[h]+[v];
	console.log("Aleatori PosDesitg " + PosDesitg);
	//document.getElementById(PosDesitg).className="botoD"; // marca en VERD la PosDesitg i els deixa en verd si ja estaven ocupats i no els ha pogut colocar de nou
}//end aleatoris

function ocupat(){
	if (document.getElementById(PosDesitg).value.substring(2,3) == 0) lliure=true;
	else lliure=false;
	//console.log("Substring(2,3) : " + document.getElementById(PosDesitg).value.substring(2,3));	
}//end ocupat

function colissio(){
	var impossible=0;
	//var hc=h;
	//var vc=v;
	var i=h; // var i=(h-1);
	var k=v; // var k=(v-1);
	
	console.log("h: " + h);
	console.log("v: " + v);
	console.log("i: " + i);
	console.log("k: " + k);
	//console.log("limit vert: " + (vert));
	for (i; i<(h+2); i++){
	  for (k; k<(v+2); k++){
			//console.log("colissio valor de horit: " + h);
			//console.log("colissio valor de vert: " + v);
			console.log("colissio valor de ik: " + [i]+[k]);
// 			console.log("([i]+[k]).substring(2,3):  " + document.getElementById([i]+[k]).value.substring(2,3));
			
			if ((document.getElementById([i]+[k]).value.substring(2,3) != 0) 
			 && (document.getElementById([i]+[k]).value.substring(2,3) != PesActual)) 
			    impossible++; 
			    // (0 || PesActual || null)  //statusfitxa // null si es fora del rang del tauler (00, 10, 20, 100)
		}
	}
	  if (impossible==0) lliure=true;
	  else (lliure=false);
	  console.log("Colissio: ---> Impossibles: " + impossible);
 }//end colissio

var quatrepos=0;
function segonafitxa(){
	//console.log("he entrat a segonafitxa"); 
	quatrepos++;
		switch (quatrepos){
			case 1: console.log("--> segonafitxa CASE 1 "); //  
				hd=PosActual.substring(0,1)-1;
				vd=PosActual.substring(1,2);
				break;
			case 2: console.log("--> segonafitxa CASE 2 "); //  
				hd=PosActual.substring(0,1);
				vd=PosActual.substring(1,2)+1;
				break;
			case 3: console.log("--> segonafitxa CASE 3 "); //  
				hd=PosActual.substring(0,1)+1;
				vd=PosActual.substring(1,2);
				break;
			case 4: console.log("--> segonafitxa CASE 4 "); //  
				hd=PosActual.substring(0,1);
				vd=PosActual.substring(1,2)-1;
				break;
			default:
				console.log("--> segonafitxa DEFAULT "); //  
				hd=PosActual.substring(0,1);
				vd=PosActual.substring(1,2);
				quatrepos=0;
				count=1;
				colocar(); // he d'esborrar les restes que deixo marcades abans de tornar a colocar la primera fitxa !!!!
				break;}
		if ((hd>1) && (hd<9) && (vd>1) && (vd<9)){
			h=hd;
			v=vd;
			PosDesitg=[h]+[v];
			console.log("PosDesitg 2a fITXA:  " + PosDesitg);}
		else segonafitxa();
}//end segonafitxa

function colocar(){
	while (PesActual >= 2) {	
	 if (count <= PesActual) {
		//console.log("---> PesActual? " + PesActual);
		switch(count){
		case 1: // Primera Fitxa
			aleatoris();
			ocupat();
			if (lliure == true){
				colissio();
				console.log("---> PesActual " + PesActual + " Case 1"); // 
					if (lliure == true){ 
					document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
					console.log("Id(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
					document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
					PosActual = PosDesitg; // Actualitzo la PosActual
					console.log("--> PosActual " + PosActual); // 
					count++;} // Nomes si la puc colocar count++ ja que sinó incremento sense haver-la colocat
			}break;
			
		case 2: // 2 Fitxa
			//aleatoris();
			segonafitxa();
			ocupat();
			if (lliure == true){
				colissio();
				console.log("---> PesActual " + PesActual + " Case 2: h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
					if (lliure == true){ 
						document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
						console.log("Id(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
						document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
						PosActual = PosDesitg; // Actualitzo la PosActual
						console.log("--> PosActual " + PosActual); // 
						quatrepos=0;
						count++;} // Nomes si la puc colocar count++ ja que sinó incremento sense haver-la colocat
					// else quatrepos++;
			}break;
			
		case 3: // 3 Fitxa
			aleatoris();
			//segonafitxa();
			ocupat();
			if (lliure == true){
				colissio();
				console.log("---> PesActual " + PesActual + " Case 3: h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
					if (lliure == true){ 
					document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
					console.log("Id(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
					document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
					PosActual = PosDesitg; // Actualitzo la PosActual
					console.log("--> PosActual " + PosActual); // 
					count++;} // Nomes si la puc colocar count++ ja que sinó incremento sense haver-la colocat
			}break;
			
		case 4: // 4 Fitxa
			aleatoris();
			//segonafitxa();
			ocupat();
			if (lliure == true){
				colissio();
				console.log("---> PesActual " + PesActual + " Case 4: h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
					if (lliure == true){ 
					document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
					console.log("Id(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
					document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
					PosActual = PosDesitg; // Actualitzo la PosActual
					console.log("--> PosActual " + PosActual); // 
					count++;} // Nomes si la puc colocar count++ ja que sinó incremento sense haver-la colocat
			}break;
			
		case 5: // 5 Fitxa
			aleatoris();
			//segonafitxa();
			ocupat();
			if (lliure == true){
				colissio();
				console.log("---> PesActual " + PesActual + " Case 5: h/v: " + document.getElementById(PosDesitg).id); // PosDesitg
					if (lliure == true){ 
					document.getElementById(PosDesitg).value = (PosDesitg+PesActual+"I"); // o tb ....value.concat("5","I");
					console.log("Id(PosDesitg).value:  " + document.getElementById(PosDesitg).value);
					document.getElementById(PosDesitg).className="botoI"; // Canvio el color a INICIALITZAT gris
					PosActual = PosDesitg; // Actualitzo la PosActual
					console.log("##> PosActual " + PosActual); // 
					count++;} // Nomes si la puc colocar count++ ja que sinó incremento sense haver-la colocat
			}break;
				
		default: break;

		}//end switch count
		}//end if (count <= PesActual)
		else {	
			console.log("count: " + count);
			PesActual--; 
			console.log("######> Seguent Vaixell de   " + PesActual + " fitxes <######");
			document.getElementById("fitxes").innerHTML=PesActual;
			count=1;}
	}// end while (PesActual >= 2)
		// +++++++ jocactiu=true; // Al final passar a mode joc real i amagar fitxes, etc...
}//end colocar


function actuar(fitxa){
    // console.log(fitxa.value);
 	if (PesActual >= 2) {
	if (count <= PesActual) {
		if (fitxa.value == null){ // aqui comprobo si la posicio te un estat ocupat o lliure
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