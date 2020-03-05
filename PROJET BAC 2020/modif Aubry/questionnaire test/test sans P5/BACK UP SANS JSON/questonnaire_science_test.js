var question = [{
        nom: "Question 1",
        thème: "Science",
        intitulé: "Qui a démontré que la Terre était ronde ?",
        choix: ["Aristote", "Démocrite", "Gutemberg", "Galilée"],
        reponse: "Galilée",
        niveau: 1
    },

    {
        nom: "Question 2",
        thème: "Science",
        intitulé: "Pourquoi Nicolas Tesla est-il connu ?",
        choix: ["il a découvert la realitivité", "il c'est pris une pomme sur la tete", "il a inventé le courent AC", "il a démontré que la terre était le centre du monde"],
        reponse: "il a inventé le courent AC",
        niveau: 2
    },

    {
        nom: "Question 3",
        thème: "Science",
        intitulé: "De quoi a été victime Galilée durant sa vie et pour ses travaux ?",
        choix: ["Persecution de l'église", "prix nobel", "disparition", "rien"],
        reponse: "Persecution de l'église",
        niveau: 3
    },

    {
        nom: "Question 4",
        thème: "Science",
        intitulé: "qu'a creer Alan Turring ?",
        choix: ["l'ancètre de la macine a écrire", "le premier cerveau biomécanique", "la vie", "le premier ordinateur capable d'executer des millions de calcul a la seconde"],
        reponse: "le premier ordinateur capable d'executer des millions de calcul a la seconde",
        niveau: 2
    }


];
// preparation buton
let button, button1, button2, button3;
// var compteur
var compteur_question = 0,
    bonne_reponse = 0;


/**
 * fonction preload
 */
function preload() {
    //question = loadJSON("question.json");
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


/**
 * UTILITAIRE DE GENERATION ET D'AFFICHAGE DES QUESTION
 */
function generationQuestion() {
    clear();
    var auPif = int(random(0, question.length))
    console.log("le numero chance est : " + auPif)
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