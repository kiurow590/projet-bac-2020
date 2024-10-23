/**
 * Classe Projectile
 * @param {*} vecteurPosition position de depart du projectile
 * @param {*} sprite sprite projectile
 */

function AbstractProjectile(vecteurPosition, sprites) {

    this.timeout = null;
    // objet gerant la couleur du projectile
    this.hittedColor = {
        "r": 255,
        "g": 0,
        "b": 0
    };

    // Sprites
    if (sprites !== undefined && sprites !== null) {
        this.sprites = sprites;
    } else {
        this.sprites = null;
    }

    // position de demarrage du projectile
    this.position = vecteurPosition;
    // angle de déplacement du projectile
    this.heading = (PI / 2);
    // velocite du projectile
    this.vel = p5.Vector.fromAngle(this.heading);
    // multiplicateur de velocite (parametre de vitesse)
    this.vel.mult(4);
    // idbox et taille du projectile
    this.r = 25;
    // boolean:

    // si le projectile est detruit
    this.isFullyDestroyed = false;


    // actualisation du déplacement du projectile
    this.update = function() {

        this.position.add(this.vel);

    }



    this.render = function() {

        // enregistre le projectile dans l'etat ou il est de base
        push();

        if (this.sprites !== null) {
            image(this.sprites, this.position.x - (this.r * 2), this.position.y - (this.r * 2), this.r * 4, this.r * 4);
        }

        if (this.isAlive) {
            //stroke(255, 255, 255);
        } else {
            stroke(this.hittedColor.r, this.hittedColor.g, this.hittedColor.b);
        }
        noFill();
        strokeWeight(2);
        translate(this.position.x, this.position.y);
        //ellipse(0, 0, this.r * 2);
        pop();
    }






    // si le projectile sors de l'ecran
    this.offscreen = function() {

        if (this.position.y >= 1100 || this.position.y <= 7) {
            return true;
        }
        return false;
    }

    // 
    this.displayExplosion = () => {

        this.isAlive = false;

        this.timeout = setTimeout(() => {
            this.isFullyDestroyed = true;
            clearTimeout(this.timeout);
        }, 100);

    }

}