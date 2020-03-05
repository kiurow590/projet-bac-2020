// #########################
// ###  Init variables   ###
// #########################

// var questionnaire
var question;
// preparation buton
let button, button1, button2, button3;
// var compteur
var compteur_question = 0,
    bonne_reponse = 0;



// #############################
// ###  Parametrage + Init   ###
// #############################


/**
 * fonction preload
 */
function preload() {
    question = loadJSON("question.json");
}

/**
 * fonction setup
 */

function setup() {
    // canvas de jeu
    createCanvas(1500, 1500);
    // appel la fonction pour creer le plateau de jeu
    generationQuestion();
}



// #############################
// ###    Gestion partie     ###
// #############################


/**
 * UTILITAIRE DE GENERATION ET D'AFFICHAGE DES QUESTION
 */
function generationQuestion() {
    clear();
    var auPif = int(random(0, Object.keys(question).length))
    console.log(question);
    textSize(32);
    fill(0, 0, 0)
    text(question[auPif].nom + ": \n" + question[auPif].thème + "\n" + question[auPif].intitulé, 10, 30);
    compteur_question = compteur_question + 1;

    resultat(auPif);
}

function resultat(random) {
    textSize(32);
    fill(0, 0, 0)
    text("Résultat : " + bonne_reponse + " / " + compteur_question, 400, 700);

    gestionBouton(random);
}


/**
 * QESTION DES BOUTON CREER PUIS CLIQUER
 * @param {number} indice indice du tableau de question
 */
function gestionBouton(indice) {



    /*
        var x = 400;
        var y = 250;

        for (var i = 0; i < question[indice].choix.length; i++) {

            button = createButton(question[indice].choix[i]);
            button.position(x, y);
            y = y + 100;
            button.mousePressed(function() {

                if (question[indice].choix[0] !== question[indice].reponse) {

                    alert("BAD ANSWER !!!!!!!!!!!!!!");
                } else {
                    alert("PERDECT GUYS!, YOU WON A POINT");
                    bonne_reponse = bonne_reponse + 1;
                }


                question.splice(indice, 1);
                buttonRemove();

            });
        }*/

    // --------------------------------------------------------------------------------


    button = createButton(question[indice].choix[0]);
    button.position(400, 250);
    button.mousePressed(function() {

        if (question[indice].choix[0] !== question[indice].reponse) {

            alert("BAD ANSWER !!!!!!!!!!!!!!");
        } else {
            alert("PERDECT GUYS!, YOU WON A POINT");
            bonne_reponse = bonne_reponse + 1;
        }


        question.splice(indice, 1);
        //Object.keys(question).splice(indice, 1);
        buttonRemove();

    });


    // --------------------------------------------------------------------------------


    button1 = createButton(question[indice].choix[1]);
    button1.position(400, 350);
    button1.mousePressed(function() {

        if (question[indice].choix[1] !== question[indice].reponse) {

            alert("BAD ANSWER !!!!!!!!!!!!!!");
        } else {
            alert("PERDECT GUYS!, YOU WON A POINT");
            bonne_reponse = bonne_reponse + 1;
        }

        question.splice(indice, 1);
        //Object.keys(question).splice(indice, 1);

        buttonRemove();

    });

    // --------------------------------------------------------------------------------


    button2 = createButton(question[indice].choix[2]);
    button2.position(400, 450);
    button2.mousePressed(function() {

        if (question[indice].choix[2] !== question[indice].reponse) {

            alert("BAD ANSWER !!!!!!!!!!!!!!");
        } else {
            alert("PERFECT GUYS!, YOU WON A POINT");
            bonne_reponse = bonne_reponse + 1;
        }

        question.splice(indice, 1);
        //Object.keys(question).splice(indice, 1);

        buttonRemove();

    });

    // --------------------------------------------------------------------------------

    button3 = createButton(question[indice].choix[3]);
    button3.position(400, 550);
    button3.mousePressed(function() {

        if (question[indice].choix[3] !== question[indice].reponse) {

            alert("BAD ANSWER !!!!!!!!!!!!!!");
        } else {
            alert("PERDECT GUYS!, YOU WON A POINT");
            bonne_reponse = bonne_reponse + 1;
        }

        question.splice(indice, 1);
        //Object.keys(question).splice(indice, 1);
        buttonRemove();

    });


}


/**
 * fonction qui reset les bouton de choix du jeu
 */
function buttonRemove() {

    button.remove();
    button1.remove();
    button2.remove();
    button3.remove();

    if (compteur_question === 3) {
        victoire();
    } else {
        generationQuestion();
    }



}



/**
 * affichage resultat finaux de la parti
 */
function victoire() {

    clear();
    text("Le questionnaire est terminé, tu peux continuer la partie !!!!\n Ton resultat est de : " + bonne_reponse + " / " + compteur_question, 10, 30);
}