/**
 * Classe vaisseau
 * @param {*} canvas Taille canvas
 * @param {*} sprite sprite vaisseau
 * @param {*} vieMax vie max vaisseau
 */

function Vaisseau(canvas, sprite, vieMax) {

    // CONSTANTE
    const PV_TOUCHE_PAR_METORITE = 20;
    const PV_GAGNEE = 1;
    const MAXVIE = vieMax;
    this.VIE_MAX = vieMax;
    // vie vaisseau
    this.vie = vieMax;
    // coordonnee gerant l'apparition du vaisseau
    this.position = createVector(canvas.longueur / 2, canvas.hauteur * 0.9);
    // direction de la tete du vaisseau
    this.heading = -(PI / 2);
    // je choisi l'angle du triangle symbolisant mon vaisseau (ça gère la taille)
    this.angle = 15;
    // je dessine le vaisseau
    this.render = function() {

        // enregistre le vaisseau dans l'etat ou il est de base
        push();
        // sprite
        image(sprite.sprite1, this.position.x - 40, this.position.y - 40, 75, 75);
        // je place la vaisseau dans la parti inferieur de mon ecran
        translate(this.position.x, this.position.y);
        //on rend le triangle transparent
        noFill();
        stroke(255);
        // je trace mon triangle
        //triangle(-this.angle, this.angle, this.angle, this.angle, 0, -this.angle);
        // reprend les paramètre de base
        pop();
    }


    // GESTION COLLISION
    this.hits = function(projectile) {

        var d = dist(this.position.x, this.position.y, projectile.position.x, projectile.position.y);
        if (d < projectile.r) {
            console.log('HIT!!!!')
            return true;
        } else {
            return false
        }

    }

    // GESTION PV
    this.retirerPv = function() {

        this.vie = this.vie - PV_TOUCHE_PAR_METORITE;

    }


    // GESTION PV
    this.ajouterPv = function() {

        if (this.vie < MAXVIE) {
            this.vie = this.vie + PV_GAGNEE;
        }

    }


    // commande du vaisseau
    this.traj = function() {

        if (keyIsDown(RIGHT_ARROW) && this.position.x < (canvas.longueur)) {
            this.position.x = this.position.x + 6;

        } else if (keyIsDown(LEFT_ARROW) && this.position.x > 0) {

            this.position.x = this.position.x - 6;
        } else if (keyIsDown(UP_ARROW) && this.position.y > (canvas.hauteur / 2)) {
            this.position.y = this.position.y - 6;

        } else if (keyIsDown(DOWN_ARROW) && this.position.y < (canvas.hauteur)) {
            this.position.y = this.position.y + 6;

        }
    }
}