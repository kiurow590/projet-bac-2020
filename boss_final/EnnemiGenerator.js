/**
 * Classe Laser
 * @param {*}  largeurCanvas largeur du canvas
 * @param {*}  listeProjectilesEnnemi liste projectiles ennemie
 * @param {*}  sprites sprite du type de tir ennemi
 */

function EnnemiGenerator(largeurCanvas, listeProjectilesEnnemi, sprites) {

    let interval = null;

    this.isLaunched = false;

    /**
     * Lance l'apparition des meteorites.
     */
    this.launch = () => {

        interval = setInterval(() => {
            listeProjectilesEnnemi.push(
                new MeteoriteProjectile(largeurCanvas, sprites));
        }, 600);

        this.isLaunched = true;
    }

    /**
     * Arrete l'apparition des meteorites.
     */
    this.stop = () => {
        clearInterval(interval);
        this.isLaunched = false;
    }



}