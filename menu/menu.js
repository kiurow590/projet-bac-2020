var imgmenu1; //frame 1 de l'image du menu
var imgmenu2; //frame 2 de l'image du menu
var imgmenu3; //frame 3 de l'image du menu
var imgmenu4; //frame 4 de l'image du menu
var imglogo; //logo du jeu
var buttonJ; // bouton jouer
var buttonC; // bouton crédits
var buttonQ; // bouton quitter
var sonbutton; //effet sonore bouton touché
var sonbutton2; //effet sonore bouton appuyé
var t = 1; //variable temps qui permet l'animation de fond
var play = true; // variable son (déjà joué ?)
var mouseX; //coord.X
var mouseY; //coord.Y
var audio = null; // musique HTML
var vidIntro = null; // Intro du jeu



function preload() {
    imgmenu1 = loadImage("menu/data11/menuprincipal1.png"); //chargement des images/sons/police d'écriture
    imgmenu2 = loadImage("menu/data11/menuprincipal2.png");
    imgmenu3 = loadImage("menu/data11/menuprincipal3.png");
    imgmenu4 = loadImage("menu/data11/menuprincipal4.png");
    imglogo = loadImage("menu/data11/kultom.png");
    sonbutton = loadSound("menu/audios/sonbuttons.mp3");
    sonbutton2 = loadSound("menu/audios/sonbuttons2.mp3");
    font = loadFont("menu/data11/PrStart.ttf");
    vidIntro = createVideo("menu/data11/Intro.mp4");
    vidCredit = createVideo("menu/data11/crédit fin.mp4");
}


function setup() {

    //creation de la balise <audio> dans le html puis mise en boucle
    audio = createAudio('menu/audios/sadrobot.mp3');
    audio.autoplay(true);
    audio.loop(true);
    vidIntro.size(0, 0);
    vidCredit.size(0, 0);
    textFont(font); //on applique la police d'écriture

    createCanvas(600, 600); //Création du Canvas

    sonbutton.setVolume(1.5); //ajustement du volume des effets sonores
    sonbutton2.setVolume(1.5);

    buttonJ = createButton('Jouer'); //création des boutons
    buttonJ.position(25, 575); //leur posistion
    buttonJ.size(100, 40); //leur taille
    buttonJ.mousePressed(Jouer); //on appelle la fonction liée au bouton

    buttonC = createButton('Crédits'); //pareil pour les deux autres boutons
    buttonC.position(475, 650);
    buttonC.size(100, 40);
    buttonC.mousePressed(Crédits);

    buttonQ = createButton('Quitter');
    buttonQ.position(25, 650);
    buttonQ.size(100, 40);
    buttonQ.mousePressed(Quitter);

}

function Jouer() { // fonction jouer
    sonbutton2.play(); //on play l'effet sonore
    audio.stop(true);
    noCanvas();
    image(vidIntro);
    vidIntro.size(800, 500);
    vidIntro.position(-50, 200);
    vidIntro.play();
    // on efface les boutons
    buttonJ.remove();
    buttonC.remove();
    buttonQ.remove();
    // rediriger vers le début du jeu
    setTimeout(() => {
        document.location.href = "niveauTransitoire.html"; //on appelle le programme extérieur pour lancer le jeu
    }, 70000);
}

function Crédits() { // fonction crédits
    sonbutton2.play(); //on play l'effet sonore
    audio.stop(true);
    noCanvas();
    image(vidCredit);
    vidCredit.size(800, 500);
    vidCredit.position(-50, 200);
    vidCredit.play();
    // on efface les boutons
    buttonJ.remove();
    buttonC.remove();
    buttonQ.remove();
    // rediriger vers le début du jeu
    setTimeout(() => {
        document.location.href = "menu.html"; //on appelle le programme extérieur pour lancer le jeu
    }, 60000);
}

function Quitter() { // fonction quitter
    sonbutton2.play(); //on play l'effet sonore
    remove(); //on ferme le Canvas
}


function draw() {


    //mise en pratique de l'animation de fond
    if (t == 1) { //1ère frame
        image(imgmenu1, 0, 0);
        image(imglogo, 5, 5);
        t = t + 1
    } else if (t == 30) { //2nde frame
        image(imgmenu2, 0, 0);
        image(imglogo, 5, 5);
        t = t + 1
    } else if (t == 60) { //3ème frame
        image(imgmenu3, 0, 0);
        image(imglogo, 5, 5);
        t = t + 1
    } else if (t == 90) { //4ème frame
        image(imgmenu4, 0, 0);
        image(imglogo, 5, 5);
        t = t + 1
    } else if (t !== 1 && t !== 30 && t !== 60 && t !== 90 && t <= 120) { //condition d'animation, où le temps entre les frames est appliqué
        t = t + 1;
    } else if (t > 120) { //fin de la boucle, retour au départ
        t = 1;
    }





}

function mouseMoved() { //fonction pour l'effet sonore où la souris est touché
    if (mouseX >= 478 && mouseX <= 577 && mouseY >= 520 && mouseY <= 560 || //si la souris est dans les coordonnées des boutons
        mouseX >= 25 && mouseX <= 127 && mouseY >= 446 && mouseY <= 483 ||
        mouseX >= 25 && mouseX <= 127 && mouseY >= 520 && mouseY <= 560) {
        if (play == true) { //et si le son n'est pas déjà joué
            sonbutton.play(); //alors on le joue
            play = false; //et on l'interdit de recommencer en boucle
        }
    } else { //sinon
        play = true //l'effet sonore peut être joué
    }
}