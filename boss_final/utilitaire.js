//#########################
//###### UTILITAIRE #######
//#########################

/**
 * Fonction interne pour annoncer la condition de caractère ("nbBateau" est un chiffre et rien d'autre !!)
 * @param {string} demande La phrase a demander
 * @returns {string} le mot saisi
 */
function demanderChiffre(demande) {

    var reponse = '';
    var isGoodAnswer = false;

    do {
        reponse = prompt(demande);

        if (reponse === null || !hasNumber(reponse.trim()) || reponse >= 30 || reponse.trim() === '0') {
            alert("N'essaie pas de ma mentir et donne moi quelquechose de valide !");
        } else {
            isGoodAnswer = true;
        }

    } while (!isGoodAnswer);

    return reponse;
}

/**
 * Verifie si on met des nombres dans le mot.
 * @param {string} myString mot a teste
 * @returns true si on a un chiffre dedans, false sinon 
 */
function hasNumber(myString) {
    return /\d/.test(myString);
}



/**
 * gestionnaire de touche
 */
function keyPressed() {

    if (keyCode == 32) {
        tirLasers.push(new Laser(vaisseau.position, spriteTir));
    }

}

//##################################
//###### AFFICHAGE DYNAMIQUE #######
//##################################


/**
 * affichage des pts de vie en continu
 */
function affichageResultat() {

    //  debut 800px (0%) === fin 1300px (100%) | differnce 500px 
    // calcule de la position Xmax pour l'affichage de la barre de PV
    var niveau_sam = (vaisseau.vie * 500) / 100;
    var niveau_boss = (boss.vie * 500) / 100;


    // parametre ecriture PV
    stroke(2);
    textSize(20);
    fill(255, 255, 255);
    text('Point de vie : ', 900, 250);
    //-------------------------------------
    strokeWeight(1);
    stroke(255, 255, 255);
    text('Sam : ', 1000, 320);
    text('Sam : ', 1000, 600);

    // chaine de dialogue dynamique
    if (vaisseau.vie >= vaisseau.VIE_MAX * (70 / 100)) {
        stroke(22, 255, 95);
        text("Aller vas y !! tu peux \nle battre", 800, 650);
    } else if (vaisseau.vie < vaisseau.VIE_MAX * (70 / 100) && vaisseau.vie >= vaisseau.VIE_MAX * (40 / 100)) {
        stroke(254, 214, 2);
        text("Ne lache pas ! tu peux \nreussir !!!", 800, 650);
    } else if (vaisseau.vie < vaisseau.VIE_MAX * (40 / 100) && vaisseau.vie >= vaisseau.VIE_MAX * (0 / 100)) {
        stroke(255, 0, 0);
        text("C'était pas ma \nGuerre !!!!!!", 800, 650);
    }

    line(800, 360, 800 + niveau_sam, 360);

    //-------------------------------------
    stroke(255, 255, 255);
    text("Monstre : ", 1000, 400);
    text("Monstre :", 1000, 500);

    // chaine de dialogue dynamique
    if (boss.vie >= boss.VIEMAX * (70 / 100)) {
        stroke(22, 255, 95);
        text("Il est t'en d'en\nfinir !", 800, 550);
    } else if (boss.vie < boss.VIEMAX * (70 / 100) && boss.vie >= boss.VIEMAX * (40 / 100)) {
        stroke(254, 214, 2);
        text("Argh Je ne peux pas \nperdre ! ", 800, 550);
    } else if (boss.vie < boss.VIEMAX * (40 / 100) && boss.vie >= boss.VIEMAX * (0 / 100)) {
        stroke(255, 0, 0);
        text("Argh NOOOON JE \nREFUSE!!!!!! ", 800, 550);
    }
    line(800, 430, 800 + niveau_boss, 430);
}