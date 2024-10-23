//#########################
//##### INITIALISATION ####
//#########################


// déclaration des variables
var vaisseau;
var boss;
var sonTir = null;
var tirLasers = [];
var projectilesEnnemi = [];
var VIEMAXSAM = 0;
var VIEMAXBOSS = 0;
var meteoriteGen = null;
// CONSTANTE
var TAILLE_CANVAS = {
    longueur: 700,
    hauteur: 1100
};
// video

var credit = {

    win: null,
    loose: null

}

// images
var spritesBoss = {
    sprite1: null,
    sprite2: null,
    sprite3: null,
    sprite4: null,
};
var spriteProjectile = {
    sprite1: null,
    sprite2: null,
};
var spriteVaisseau = {
    sprite1: null,
    sprite2: null,
};
var spriteTir = {
    sprite1: null,
};
var imgFond = null;
// var boolean
var finJeu = false;
var samWin = false;
let gifIsAlreadyScreen = false;


/**
 * prechargement des elements
 */
function preload() {

    // Sprites du boss
    spritesBoss.sprite1 = loadImage("boss_final/data/sprite_Kultom-1.png");
    spritesBoss.sprite2 = loadImage("boss_final/data/sprite_Kultom-2.png");
    spritesBoss.sprite3 = loadImage("boss_final/data/sprite_Kultom-3.png");
    spritesBoss.sprite4 = loadImage("boss_final/data/sprite_Kultom-4.png");
    // sprite projectile
    spriteProjectile.sprite1 = loadImage("boss_final/data/sprite_Projectile-1.png");
    spriteProjectile.sprite2 = loadImage("boss_final/data/sprite_Projectile-2.png");
    spriteProjectile.sprite3 = loadImage("boss_final/data/sprite_Projectile-3.png");
    // sprite vaisseau
    spriteVaisseau.sprite1 = loadImage("boss_final/data/vaisseau_1.png");
    spriteVaisseau.sprite2 = loadImage("boss_final/data/vaisseau_2.png");
    //sprite tir
    spriteTir.sprite1 = loadImage("boss_final/data/imgTir.png");
    // fond
    imgFond = loadImage("boss_final/data/fondBoss.png");
    // son
    levelMusic = loadSound("boss_final/Kubbi-Ember-04Cascade.mp3");
    sonTir = loadSound("boss_final/data/tir2.mp3");
    // police d'ecriture
    pixelFont = loadFont("boss_final/PrStart.ttf");
    // GIF
    gif_loose = createImg("boss_final/data/kiurow.png");
    // video
    credit.win = createVideo("boss_final/data/crédit fin win.mp4");
    credit.loose = createVideo("boss_final/data/crédit fin loose.mp4");
}


/**
 * fonction Setup
 */
function setup() {



    // on recupère le nombre totale de fautes fait avec les questionnaires
    var fautes = demanderChiffre("Merci d'indiquer le numéro chance donner précédement ;)");
    VIEMAXSAM = 100 - (fautes * 2);
    VIEMAXBOSS = 100 + (fautes * 2);
    textFont(pixelFont);
    // alert avant démarrage
    alert("Attention, le boss final va démarrer \nPréparez-vous à un combat ou la vie de la planete en dépend !\nPOUR DEMMARRER APPUYER SUR 'OK'")

    // démarrage de la misique
    levelMusic.loop();
    levelMusic.setVolume(0.25);
    sonTir.setVolume(0.25);
    // creation canvas
    createCanvas(TAILLE_CANVAS.longueur * 2, TAILLE_CANVAS.hauteur);

    // preparation vaisseau
    vaisseau = new Vaisseau(TAILLE_CANVAS, spriteVaisseau, VIEMAXSAM);

    // preparation météorite
    meteoriteGen = new EnnemiGenerator(TAILLE_CANVAS.longueur, projectilesEnnemi, spriteProjectile);

    // preparation boss
    boss = new Ennemi(TAILLE_CANVAS.longueur, spritesBoss, spriteProjectile.sprite1, projectilesEnnemi, sonTir, VIEMAXBOSS);

    gif_loose.hide();
    // rezise video
    credit.loose.hide();
    credit.win.hide();
}


//#########################
//##### DEMMARRAGE JEU ####
//#########################

/**
 * fonction draw
 */
function draw() {

    // Est-ce que le jeu est terminé ?
    if (!finJeu) {

        //NON !!! le jeu n'est pas fini !! 

        // fond noir
        background(26);
        // Img zone de jeu
        image(imgFond, 0, 0, TAILLE_CANVAS.longueur + 20, TAILLE_CANVAS.hauteur);


        // affichage des résultat sur la 2nd parti du Canvas de jeu
        affichageResultat();

        // si le générateur de météorite est en marche et si il n'est pas en marche
        if (meteoriteGen !== null && !meteoriteGen.isLaunched) {
            // on l'allume
            meteoriteGen.launch();
        }


        // pour chaque projectile
        for (var y = 0; y < projectilesEnnemi.length; y++) {

            // est-il detruit ?
            if (projectilesEnnemi[y].isFullyDestroyed) {
                // oui ? je le supprime
                projectilesEnnemi.splice(y, 1);

            } else {
                // non? je l'affiche et le mets en mvt
                projectilesEnnemi[y].render();
                projectilesEnnemi[y].update();



                // le vaisseaus est il touchee par un projectile ?
                if (vaisseau.hits(projectilesEnnemi[y])) {

                    // oui ? alors je supprime le projectile de la liste
                    projectilesEnnemi.splice(y, 1);
                    // on actualise les points suivant les conditions
                    vaisseau.retirerPv();
                    boss.ajouterPv();
                }

                // le boss est il touchee par une projectile ennemie ?
                if (projectilesEnnemi[y] instanceof MeteoriteProjectile &&
                    !projectilesEnnemi[y].isAlive && boss.hits(projectilesEnnemi[y])) {

                    // oui? on actualise les PV et on supprime le projectile
                    boss.retirerPv(projectilesEnnemi[y]);
                    projectilesEnnemi.splice(y, 1);

                }


                // le projectile est-il hors de l'ecran ?
                else if (projectilesEnnemi[y].offscreen()) {

                    // oui? supprime le projectile et on actualise les PV
                    projectilesEnnemi.splice(y, 1);
                    vaisseau.ajouterPv();

                }
            }
        }



        // pour chaque tir
        for (var i = 0; i < tirLasers.length; i++) {
            // faire son rendu
            tirLasers[i].render();
            tirLasers[i].update();




            // le tir est-il hors de l'ecran ?
            if (tirLasers[i].offscreen()) {

                // Oui? supprime le tir
                tirLasers.splice(i, 1);

            } else if (tirLasers[i] && tirLasers[i].hitsBoss(boss)) {

                // Oui ? actualisation des PV
                boss.retirerPv(tirLasers[i]);
                // le supprimer
                tirLasers.splice(i, 1);

            } else {
                // non ? pour chaque projectile
                for (var y = 0; y < projectilesEnnemi.length; y++) {
                    // le tir a t'il touche un projectile ?
                    if (tirLasers[i] && tirLasers[i].hits(projectilesEnnemi[y], boss.position)) {


                        // afficher l'explosion
                        projectilesEnnemi[y].displayExplosion();

                        // le supprimer
                        tirLasers.splice(i, 1);

                    }
                }
            }
        }

        // on fait le rendu du boss, on l'anime et on vérifie s'il sors pas de l'ecran.
        boss.render();
        boss.update();
        boss.offscreen();

        // rendu vaisseau et mise en mouvement
        vaisseau.render();
        vaisseau.traj();


        // si le boss n'as plus de vie
        if (boss.vie <= 0) {
            // sam gagne
            samWin = true;
            boss = null;
            finJeu = true;
            meteoriteGen.stop();

            // si le sam n'as plus de vie
        } else if (vaisseau.vie <= 0) {
            // sam perd
            samWin = false;
            boss = null;
            finJeu = true;
            meteoriteGen.stop();
        }


    } else {

        // oui !!! le jeu est fini !! 
        victoire();

    }
}



//#########################
//###### FIN PARTIE #######
//#########################

/**
 * fonction de victoire
 */
function victoire() {

    // parametre pour l'affichage du texte
    stroke(2);
    textSize(32);
    fill(255, 255, 255);
    // attenuation de la musique
    levelMusic.fade(0, 2);
    sonTir.setVolume(0);
    // suppression du boss
    delete boss;


    // Sam a t'il gagnee?
    if (samWin) {

        // Oui ? ecran de fin
        gifIsAlreadyScreen = true;
        background(26);
        // on attend 3s l'ecran plus generique de fin se joue et redirection vers le menu 
        setTimeout(() => {
            clear();
            credit.win.show();
            credit.win.size(1400, 1000);
            credit.win.play();
            setTimeout(() => {
                document.location.href = 'menu.html';
            }, 102000);
        }, 3000);


    } else {

        /* // Non ? ecran de fin*/

        if (!gifIsAlreadyScreen) {

            gifIsAlreadyScreen = true;
            background(26);
            gif_loose.show();
            gif_loose.size(500, 500);
            gif_loose.position(450, 250);
            text("tu as perdu, t'es une sous-merde !\nJe veux bien t'offrir \nune autre vie... \nTu veux ?", 100, 650);
            let button1 = createButton('CONTINUER...');
            let button2 = createButton("J'ABANDONNE...");
            button1.position(200, 1100);
            button1.mousePressed(() => {
                clear();
                button1.remove();
                button2.remove();
                text("Parfait! Prépare toi et gaspille\npas ta vie ce coup ci !\nBONNE CHANCE !!!", 50, 650);
                setTimeout(() => {
                    document.location.href = 'bossFinal.html';
                }, 5000);
            });

            button1.style("font-family", pixelFont);
            button2.position(800, 1100);
            button2.mousePressed(() => {
                clear();
                button1.remove();
                button2.remove();
                text("OK, j'accepte ton choix ! \nbonne continuation En\ntout cas grace a toi, \nla planète est perdu ! GG", 100, 650);
                setTimeout(() => {
                    clear();
                    gif_loose.remove();
                    credit.loose.show();
                    credit.loose.play();
                    setTimeout(() => {
                        document.location.href = 'menu.html';
                    }, 101000);
                }, 5000);
            });

        }
    }
}