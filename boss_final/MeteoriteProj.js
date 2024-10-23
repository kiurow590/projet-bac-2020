/**
 * Classe Laser
 * @param {*}  largeurCanvas largeur du canvas
 * @param {*}  sprites sprite type de projectile tiree
 */

function MeteoriteProjectile(largeurCanvas, sprites) {

    // appel de la classe qui genere les projectile
    AbstractProjectile.call(this, createVector(random(largeurCanvas), 9));

    // si le projectile est touche
    this.isAlive = true;
    // sprite du laser
    this.sprites = sprites.sprite2;

    /**
     * fonction update
     */
    this.update = function() {

        if (this.isAlive) {
            this.position.add(this.vel);
        } else {
            console.log("changement sens");
            this.heading = (-PI / 2);
            this.vel = p5.Vector.fromAngle(this.heading);
            this.vel.mult(4);
            this.position.add(this.vel);
        }

    }


    this.hittedColor = {
        "r": 232,
        "g": 246,
        "b": 2
    };

    /**
     * fonction d'animation explosion
     */
    this.displayExplosion = () => {

        this.isAlive = false;
        this.sprites = sprites.sprite3;

    }
}