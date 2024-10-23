/**
 * Classe tir ennemi
 * @param {*} positionX position du boss au moment du tir
 * @param {*} sprites sprite du type tir ennemi
 */

function EnnemiTir(positionX, sprites) {

    // appel de la classe qui genere les projectile
    AbstractProjectile.call(this, createVector(positionX, 90));

    this.sprites = sprites;

    this.hittedColor = {
        "r": 0,
        "g": 255,
        "b": 0
    };

}