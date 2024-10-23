/**
 * Classe Laser
 * @param {*} spos position de l'vaisseau lors du tire
 * @param {*} sprite sprite laser
 */

function Laser(spos, sprite) {
    // position du tire "missile" du tire
    this.posTir = createVector(spos.x, spos.y);
    // angle de tir
    this.heading = -(PI / 2);
    // velociter du tire dans la direction de "l'angle"
    this.vel = p5.Vector.fromAngle(this.heading);
    // vitesse de tire
    this.vel.mult(7);


    //déplacement du tire (actualise sa position en fonction de la position)
    this.update = function() {
        this.posTir.add(this.vel);
    }


    // fonction d'affichage a l'ecran du tire
    this.render = function() {
        push();
        // sprite
        image(sprite.sprite1, this.posTir.x - 40, this.posTir.y - 40, 75, 75);
        stroke(255);
        strokeWeight(4);
        point(this.posTir.x, this.posTir.y);
        pop();
    }

    // fonction qui gere la collision d'un tir avec un projectile
    this.hits = function(projectile) {

        var d = dist(this.posTir.x, this.posTir.y, projectile.position.x, projectile.position.y);
        if (d < projectile.r) {
            return true;
        } else {
            return false
        }

    }

    // fonction qui gere la collision d'un tir avec le boss
    this.hitsBoss = function(bossCarac) {

        var d = dist(this.posTir.x, this.posTir.y, bossCarac.position.x, bossCarac.position.y);
        if (d < bossCarac.r) {
            return true;
        } else {
            return false
        }

    }



    // fonction qui gère la position limite des tires (renvoie un booleen)
    this.offscreen = function() {

        if (this.posTir.y > height || this.posTir.y < 0) {
            return true;
        }
        return false;
    }

}