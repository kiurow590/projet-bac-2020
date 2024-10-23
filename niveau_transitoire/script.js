var carte = null;
var carte2 = null;
var debut = false;
var samhaut = null,
    sambas = null,
    samdroite = null,
    samgauche = null;
flechehaut = null;
flechedroite = null;
flechebas = null;
var mvt = 0;
var x = 70; /*coordonnées de départ*/
var y = 410; /*coordonnées départ*/
var niveau = "";
var t = 1;
var sonFond = null;

function preload() {
    carte = loadImage("niveau_transitoire/Data/OpenWorld_1.png");
    carte2 = loadImage("niveau_transitoire/Data/OpenWorld_2.png");
    samhaut = loadImage("niveau_transitoire/Data/sprite_SAM_haut.png");
    samgauche = loadImage("niveau_transitoire/Data/sprite_SAM_gauche.png");
    sambas = loadImage("niveau_transitoire/Data/sprite_SAM_bas.png");
    samdroite = loadImage("niveau_transitoire/Data/sprite_SAM_droite.png");
    flechehaut = loadImage("niveau_transitoire/Data/Haut.png");
    flechedroite = loadImage("niveau_transitoire/Data/Droite.png");
    flechebas = loadImage("niveau_transitoire/Data/Bas.png");
    sonFond = loadSound('niveau_transitoire/Data/Five Finger Death Punch - Bad Company 8-Bit.mp3');
}

function setup() {
    createCanvas(600, 600);
    debut = true;
    sonFond.loop();
    storeItem('niveau', 'début');
    niveau = getItem('niveau');

}

function draw() {

    if (t == 1) { //1ère frame
        image(carte, 0, 0, 600, 600);
        t = t + 1
    } else if (t == 30) { //2nde frame
        image(carte2, 0, 0, 600, 600);
        t = t + 1
    } else if (t == 60) { //2nde frame
        image(carte, 0, 0, 600, 600);
        t = 1
    } else if (t !== 1 && t !== 30) { //condition d'animation, où le temps entre les frames est appliqué
        t = t + 1;
    }



    if (niveau == "début") {
        image(samhaut, x, y, 75, 75);
        image(flechehaut, 70, 350, 75, 75);
    }
    if (niveau == "niveau 1") {
        image(samhaut, 70, 120, 75, 75);
        image(flechedroite, 135, 120, 75, 75);
    } else {
        if (niveau == "niveau 2") {
            image(sambas, 240, 305, 75, 75);
            image(flechebas, 240, 365, 75, 75);
        } else {
            if (niveau == "boss") {
                image(samdroite, 405, 400, 75, 75);
                image(flechehaut, 415, 325, 75, 75);
            } else {
                if (niveau == "fini") {
                    image(samhaut, x, y, 75, 75);
                }
            }
        }
    }

    if (mvt == 1) {
        image(samhaut, x, y, 75, 75);
        debut = false;
    }
    if (mvt == 2) {
        image(samhaut, x, y, 75, 75);
        debut = false;
    }
    if (mvt == 3) {
        image(samdroite, x, y, 75, 75);
        debut = false;
    }
    if (mvt == 4) {
        image(sambas, x, y, 75, 75);
        debut = false;
    }

    niveau = getItem('niveau');
    print(niveau);

}

function keyPressed() {
    if (niveau == "début") {
        if (keyCode == UP_ARROW) {
            mvt = 1
            x = 70;
            y = 120;
            storeItem('niveau', 'niveau 1');
            setTimeout(() => {
                document.location.href = 'questionnaire_musique.html';
            }, 2000);

        }
    }
    if (niveau == "niveau 1") {
        if (keyCode == RIGHT_ARROW) {
            mvt = 4
            x = 240;
            y = 305;
            storeItem('niveau', 'niveau 2');
            setTimeout(() => {
                document.location.href = 'questionnaire_science_fiction.html';
            }, 2000);
        }
    }

    if (niveau == "niveau 2") {
        if (keyCode == DOWN_ARROW) {
            mvt = 3;
            x = 415;
            y = 400;
            storeItem('niveau', 'boss');
            setTimeout(() => {
                document.location.href = 'questionnaire_science.html';
            }, 2000);

        }
    }
    if (niveau == "boss") {
        if (keyCode == UP_ARROW) {
            mvt = 1
            x = 425;
            y = 140;
            storeItem('niveau', 'fini');
            var fautes = {
                un: getItem('fautes1'),
                deux: getItem('fautes2'),
                trois: getItem('fautes3')
            };
            var totalFaute = (fautes.un + fautes.deux + fautes.trois);
            alert("ATTENTION pour acceder au boss final,\nMerci d'ouvrir le 'boss.html' avec Microsoft edge\nEt d'indiquer le chiffre ci dessous :\n              " + totalFaute);
        }
    }
}

function mousePressed() {
    print(mouseX, mouseY);
}