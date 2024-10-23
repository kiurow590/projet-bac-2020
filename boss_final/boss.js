/**
 * Classe Ennemi
 * @param {*} canvasWidth longueur du canvas
 * @param {*} sprites sprite du boss
 * @param {*} spriteProjectile sprite du projectile
 * @param {*} listeProjectilesEnnemi liste projectiles ennemie
 * @param {*} sonTir son du tir
 */
function Ennemi(canvasWidth, sprites, spriteProjectile, listeProjectilesEnnemi, sonTir, VIEMAXBOSS) {

    /// ------------------------------------------------------------------------------------------
    /// ----------------------------         INIT         ----------------------------------------
    /// ------------------------------------------------------------------------------------------


    // CONSTANTES
    const VERS_LA_GAUCHE = PI;
    const VERS_LA_DROITE = 0;
    const PV_TOUCHE_PAR_METORITE = 20;
    const PV_TOUCHE_PAR_LASER = 1;
    const PV_GAGNEE = 20;
    const VITESSE_TIR_SEUILS = {
        full: [100, 1000],
        mid: [70, 700],
        low: [40, 300]
    }

    // interval de tir
    let intervalObj = null;
    // direction de déplacement initial
    let directionInitiale = null;

    // sprite de démarrage
    this.currentSprite = sprites.sprite1;
    // index de demarrage de sprite
    var indexSprite = 1;
    // vie dde l'ennemie
    this.vie = VIEMAXBOSS;
    this.VIEMAX = VIEMAXBOSS;


    // position de demarrage du boss
    this.position = createVector(250, 20);
    // angle de déplacement du boss
    var sens = int(random(0, 11));
    // le random sens est il paire ?
    if (sens % 2 === 0) {
        directionInitiale = VERS_LA_GAUCHE;

    } else {
        directionInitiale = VERS_LA_DROITE;

    }

    // idbox et taille du projectile
    this.r = 30;

    /// ------------------------------------------------------------------------------------------
    /// -------------------------          ACTIONS       -----------------------------------------
    /// ------------------------------------------------------------------------------------------

    /**
     * Deplace le boss danqs une direction.
     * @param {*} sens le sens deu deplacement
     */
    this.deplacerVers = function(sens) {

        // sens de déplacement
        this.heading = sens;
        // velociter du tire dans la direction de "l'angle"
        this.vel = p5.Vector.fromAngle(this.heading);
        // vitesse de boss
        this.vel.mult(2);
    }

    /**
     * fonction de Tir
     */
    this.tirer = function() {
        listeProjectilesEnnemi.push(new EnnemiTir(this.position.x, spriteProjectile));
        sonTir.play();
    }

    /**
     * Modification des Sprites du boss dynamique.
     */
    this.changerSprite = function() {

        if (indexSprite === Object.keys(sprites).length) {
            indexSprite = 1;
        } else {
            indexSprite += 1;
        }

        this.currentSprite = sprites["sprite" + indexSprite];
    }

    /*
     * fonction de gestion de point
     */
    this.retirerPv = function(trucQuiTouche) {

        if (trucQuiTouche instanceof MeteoriteProjectile) {
            console.log("boss touche par meteorite");
            this.vie = this.vie - PV_TOUCHE_PAR_METORITE;
            this.adapterVitesseTirs();

        } else if (trucQuiTouche instanceof Laser) {
            console.log("boss touche par laser");
            this.vie = this.vie - PV_TOUCHE_PAR_LASER;
            this.adapterVitesseTirs();
        }

    }

    /*
     * fonction de gestion de point
     */
    this.ajouterPv = function() {

        if (this.vie < 100) {
            this.vie = this.vie + PV_GAGNEE;
            this.adapterVitesseTirs();
        }

    }

    /*
     * fonction adaptation de la vitesse de tir suivant la vie de l'ennemi
     */
    this.adapterVitesseTirs = function() {

        let vitesseCourante = VITESSE_TIR_SEUILS.full[1];

        // Suis-jet au dessous du seuil defaut ?
        if (this.vie >= this.VIEMAX * (70 / 100)) {
            vitesseCourante = VITESSE_TIR_SEUILS.full[1];
            print("petite vitesse");
        } else if (this.vie < this.VIEMAX * (70 / 100) && this.vie >= this.VIEMAX * (40 / 100)) {
            print("moyenne vitesse");
            vitesseCourante = VITESSE_TIR_SEUILS.mid[1];
        } else if (this.vie < this.VIEMAX * (40 / 100) && this.vie >= this.VIEMAX * (0 / 100)) {
            print("grande vitesse");
            vitesseCourante = VITESSE_TIR_SEUILS.low[1];
        }
        // si je touche a la vitesse
        if (intervalObj !== null) {
            clearInterval(intervalObj);
        }

        intervalObj = setInterval(() => {
            this.tirer();
        }, vitesseCourante);
    }



    /// ------------------------------------------------------------------------------------------
    /// -------------------------       RENDUS     -----------------------------------------
    /// ------------------------------------------------------------------------------------------


    //déplacement du tire (actualise sa position en fonction de la position)
    this.update = function() {
        this.position.add(this.vel);
    }



    // fonction d'affichage a l'ecran du tire
    this.render = function() {
        push();
        image(this.currentSprite, this.position.x - this.r, this.position.y - this.r, this.r * 3, this.r * 3);
        stroke(255);
        strokeWeight(4);
        noFill();
        translate(this.position.x, this.position.y);
        pop();
    }

    // fonction de collision
    this.hits = function(projectile) {

        var d = dist(this.position.x, this.position.y, projectile.position.x, projectile.position.y);
        if (d < projectile.r) {
            console.log("Ennemie touché");
            return true;
        } else {
            return false
        }

    }



    // si le projectile sors de l'ecran
    this.offscreen = function() {

        if (this.heading === VERS_LA_GAUCHE &&
            this.position.x <= (0 + 20)) {


            this.deplacerVers(VERS_LA_DROITE);

        } else if (this.heading === VERS_LA_DROITE &&
            this.position.x >= (canvasWidth - (this.r + 10))) {


            this.deplacerVers(VERS_LA_GAUCHE);
        }
        return true;
    }



    /// ------------------------------------------------------------------------------------------
    /// ---------------      TRAITEMENTS DE FIN DE CONSTRUCTION       ----------------------------
    /// ------------------------------------------------------------------------------------------

    // lancement du deplacement
    this.deplacerVers(directionInitiale);

    // adapter la vitesse de tir
    this.adapterVitesseTirs();

    // Modification de la sprite du boss
    setInterval(() => {
        this.changerSprite();
    }, 250);
}