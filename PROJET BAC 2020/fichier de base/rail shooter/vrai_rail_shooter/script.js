/*---- INITIALISATIONS ------*/

/*création des deux tableaux pour contenir 
les coordonnées des balles*/
var listeX = [];
var listeY = [];
// Coordonnées x et y du centre de la cible
var cibleX = 500;
var cibleY = 300;
// nombre de balles percées
var score = 0;
// image du fond d'écran, de la balle et de la cible
var imgb, imgc, imgf;

var explosion;

function preload() {
    imgb = loadImage("data/boule.png");
    imgc = loadImage("data/cible.png");
    imgf = loadImage("data/galaxie.jpg");
    explosion = loadSound("data/explode.mp3");

}

/*---- TRAITEMENT ------*/
function setup() {
    createCanvas(800, 630);
}

function draw() {
    // on a 1 chance sur 30 d'ajouter une balle
    if (int(random(0, 30)) == 0) {
        ajouterBalles(); // fonction à créer
    }
    bougerBalles(); // fonction à créer
    bougerCible(); // fonction à créer
    collisionBalles(); // fonction à créer
    affichage(); // fonction à créer	
}

function ajouterBalles() {

    append(listeX, int(random(50, 600)));
    append(listeY, -30);


}

function bougerBalles() {
    for (var i = 0; i < listeY.length; i++) {
        listeY[i] = listeY[i] + 2;
    }
}



function collisionBalles() {
    for (var i = 0; i < listeY.length; i++) {
        if (dist(listeY[i], listeX[i], cibleY, cibleX) < 15) {
            explosion.play();
            listeX.splice(i, 1);
            listeY.splice(i, 1);
            score++;
        }
    }
}

function affichage() {
    imageMode(CENTER);
    image(imgf, 400, 630 / 2);
    for (var i = 0; i < listeY.length; i++) {
        image(imgb, listeX[i], listeY[i]);
    }
    image(imgc, cibleX, cibleY);
    fill(255, 0, 0);
    textSize(20);
    text("SCORE : " + score, 300, 30);
    //text("SCORE : "+score, windowWidth/2, windowHeight/20);
}

function bougerCible() { // fonction à créer
    if (keyIsDown(UP_ARROW) && cibleY > 25) {
        cibleY = cibleY - 3;
    } else if (keyIsDown(DOWN_ARROW) && cibleY < 630 - 25) {
        cibleY = cibleY + 3;
    } else if (keyIsDown(LEFT_ARROW) && cibleX > 25) {
        cibleX = cibleX - 3;
    } else if (keyIsDown(RIGHT_ARROW) && cibleX < 800 - 25) {
        cibleX = cibleX + 3;
    }

}