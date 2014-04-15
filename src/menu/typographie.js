var convert = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "?", ",", ".", "!", ":", "-", "'"] ; //On prépare le tableau de pont entre chiffre et lettre
function Typo(config){
	for(var key in config)		//On stock la config du xml
		this[key] = (isNaN(config[key])) ? config[key] : parseInt(config[key]);

	var that = this;
	this.lettres.image.onload = function(){
		that.lettres.frameWidth = this.width / that.lettres.nbFrame;		//On calcule la taille d'une lettre
	}
	this.chiffres.image.onload = function(){
		that.chiffres.frameWidth = this.width / that.chiffres.nbFrame;	//La taille d'un chiffre
	}
}
Typo.prototype.draw = function(context, texte, x, y, width, police, underline, center){
	texte += "";
	texte.toLowerCase();			//On convertie le tout en minuscule
	var texteLength = texte.length;	//On stock la longeur du texte

	if (x == "center"){					//Si le texte doit être centré
		x = (canvas.width - texte.length * police)/2; //Le moins 30 vient corriger le vide avec le début de la lettre
	}

	if (underline == "true"){		//Si c'est éléments est selectionné
		var multiplicateur = Math.abs(Math.cos(Date.now()/200))/20 + 1;	//On vient modifier sa police en fonction du timeqtamp pour le faire grossir, rétrécirt
		x -= (police * texte.length * multiplicateur - police * texte.length )/2;	//On replace correctement l'elements en fonction de sa nouvelle taille
		police *= multiplicateur;														//On applique la nouvelle taille de police
	}

	for (var i = 0, colonne = 0, ligne = 0 ; i < texteLength; i++) {	//Pour toutes les lettres/chiffres a afficher
		if (colonne * police >= width ){ 									//si on dépasse la largeur max autorisé 
			ligne++; 															//on descend d'une ligne
			colonne = 0;														//on revient au debut de la box 
		}
		if (isNaN(parseInt(texte[i])))										//Si c'est une lettre
			context.drawImage(this.lettres.image, lettre(texte[i]) * this.lettres.frameWidth-1, 0, 
											this.lettres.frameWidth, this.lettres.image.height, 
											x - -colonne * police, y - -ligne * police, police, police);
		else																//un chiffre
			context.drawImage(this.chiffres.image, texte[i] * this.chiffres.frameWidth - 2, 0, 
											this.chiffres.frameWidth, this.chiffres.image.height, 
											x - -colonne * police, y - -ligne * police, police, police);
		colonne++;														//On vient deplacer la position en x de la prochaine lettre

	};
}

function lettre(cible){
	cible = cible.toLowerCase();
	for (var i = convert.length - 1; i >= 0 ; i--){ //on fais toute les lettres de l'alhpabet jusqu'a trouver la bonne
		if (convert[i] == cible) //si la lettre correspond a la position dans l'alpabet
			return i; // on renvoie l'ndex de la lettre
	}
}