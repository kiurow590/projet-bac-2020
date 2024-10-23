// #########################
// ###  Init variables   ###
// #########################

// questionnaire
var questions = undefined;
// CONSTANTE
const buttons = {
    button0: null,
    button1: null,
    button2: null,
    button3: null
}
isAlreadyPressed = false;
// var compteur
var compteur_questions = 0,
    bonne_reponse = 0,
    font = null;




// #############################
// ###  Parametrage + Init   ###
// #############################


/**
 * fonction preload
 */
function preload() {

    // on converti le fichier JSON en objet traitable par le document
    loadJSON("questionnaire/science/science_question.json", function(tempList) {

        questions = Object.values(tempList);

        if (Array.isArray(questions)) {
            console.log("Liste chargee");
        }
    });
    // musique de fond
    musique = loadSound("questionnaire/science/SmallRadio - LSF 7th Gear Remix.mp3");
    // police d'ecriture
    font = loadFont('questionnaire/science/PrStart.ttf');


}

/**
 * fonction setup
 */

function setup() {

    textFont(font);
    // canvas de jeu
    createCanvas(600, 600);
    //Volume de la musique
    musique.setVolume(0.2);
    // la musique est joué en boucle
    musique.loop();
    // appel la fonction de génération de question
    generationquestions();
}


// #############################
// ###    Gestion partie     ###
// #############################


/**
 * UTILITAIRE DE GENERATION ET D'AFFICHAGE DES questions
 */
function generationquestions() {
    // on efface ce qui est présent dans le canvas
    clear();
    // tirrage d'une variable aléatoire (pour une question aléatoire du fichier de question)
    let monRandom = int(random(0, Object.keys(questions).length));
    // on passe le compteur de question a un niveau au dessus
    compteur_questions = compteur_questions + 1;
    // regle la police d'ecriture
    textSize(18);
    // ecriture en blanc
    fill(255, 255, 255);
    // contour de lettre
    stroke(26, 26, 26);
    // epaisseur du contour
    strokeWeight(2);
    // on affiche la question et autre information
    text("Questions : " + compteur_questions + " \nThématique : " + questions[monRandom].thème + "\n" + questions[monRandom].intitulé, 25, 30);
    // on affiche le résultat
    resultat(monRandom);
}


/**fonction affichant l'avancer au niveau du nombre de question
 * @param {*} indiceQuestion indice de la question
 */
function resultat(indiceQuestion) {
    textSize(20);
    // ecriture en blanc
    fill(255, 255, 255);
    // contour de lettre
    stroke(26, 26, 26);
    // epaisseur du contour
    strokeWeight(2);
    text("Résultat : " + bonne_reponse + " / " + 10, 25, 500);

    // fonction gerant les boutons de reponses.
    gestionBouton(indiceQuestion);
}


/**
 * QESTION DES BOUTON CREER PUIS CLIQUER
 * @param {number} indiceQuestion indice du tableau de questions
 */
function gestionBouton(indiceQuestion) {
    // enplacement du premier bouton
    var emplecementBouton = {
        x: 25,
        y: 270
    }

    console.log('Question choisie ' + indiceQuestion);
    // pour chaque choix de reponse possible
    for (let i = 0; i < questions[indiceQuestion].choix.length; i++) {

        // je stocke l'indice Question
        let ix = indiceQuestion;

        // je creer un bouton avec la proposition en question
        let button = createButton(questions[indiceQuestion].choix[i]);

        // place le bouton
        button.position(emplecementBouton.x, emplecementBouton.y);

        // incremente la hauteur pour les prochain bouton
        emplecementBouton.y = emplecementBouton.y + 70;

        // action quand le bouton est presse
        button.mousePressed(function() {

            console.log("handler ! " + ix + '-----' + i);

            // appel la varible responsable de la vérificatiuon de la reponse
            mouseHandler(ix, i);
        });

        // creation d'une cle stoquant la valeur du bouton ????????????????????????????????????????????????
        let key = 'button' + i;
        console.log("key " + key);
        buttons[key] = button;
    }

}

/**
 * GESTION DE LA REPONSE SI ELLE EST BONNE OU PAS
 * @param {*} indiceQuestion 
 * @param {*} indiceReponseClickee 
 */

function mouseHandler(indiceQuestion, indiceReponseClickee) {

    if (!isAlreadyPressed) {

        if (questions !== undefined && questions !== null) {

            console.log("Reponse " + indiceReponseClickee + " --- Question " + JSON.stringify(questions[indiceQuestion]));
            console.log("Choix possibles : " + questions[indiceQuestion].choix);
            console.log("Reponse donnee : " + questions[indiceQuestion].reponse);

            if (indiceReponseClickee !== questions[indiceQuestion].reponse) {

                textSize(20);
                // ecriture en vert
                fill(237, 0, 0);
                // contour de lettre
                stroke(26, 26, 26);
                // epaisseur du contour
                strokeWeight(2);
                text("Mauvaise réponse ! \nréponse = " + questions[indiceQuestion].choix[questions[indiceQuestion].reponse], 20, 530);

            } else {

                textSize(25);
                // ecriture en vert
                fill(0, 255, 0);
                // contour de lettre
                stroke(26, 26, 26);
                // epaisseur du contour
                strokeWeight(2);
                text("Bonne réponse, \nTu gagnes un point.", 20, 530);

                bonne_reponse = bonne_reponse + 1;
            }
        }
        questions.splice(indiceQuestion, 1);
        isAlreadyPressed = true;

        setTimeout(() => {
            buttonRemove()
        }, 4000);
    }
}


/**
 * fonction qui reset les bouton de choix du jeu
 */
function buttonRemove() {

    // recup liste de clé
    let buttonKeys = Object.keys(buttons);
    for (var i = 0; i < buttonKeys.length; i++) {

        if (buttons[buttonKeys[i]] !== null) {

            print('test : ' + buttonKeys[i]);
            buttons[buttonKeys[i]].remove();
            buttons[buttonKeys[i]] = null;


        }
    }


    // si le nb de question attendu est correct
    if (compteur_questions === 10) {

        // appel la fonction de victoire
        victoire();
    } else {
        // genere une nouvelle question
        isAlreadyPressed = false;
        generationquestions();
    }
}



/**
 * affichage resultat finaux de la parti
 */
function victoire() {

    clear();
    textSize(20);
    // ecriture en blanc
    fill(255, 255, 255);
    // contour de lettre
    stroke(26, 26, 26);
    // epaisseur du contour
    strokeWeight(2);
    var fautes = compteur_questions - bonne_reponse;
    storeItem('fautes2', fautes);
    text("Le questionsnaire est \nterminé, tu peux continuer\nla partie !\nTon resultat est de :\n" + bonne_reponse + " / " + compteur_questions +
        ' : ' + fautes + " faute(s) !\nReviens à l'onglet précédent\npour continuer !", 10, 30);
}