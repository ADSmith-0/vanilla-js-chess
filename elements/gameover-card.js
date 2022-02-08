class GameoverCard extends HTMLElement{
    constructor(){
        super();

        const message = "White wins!";
        this.innerHTML = `
            <section id="gameover-card">
                <button id="goc-close">✖</button>
                <h1 id="goc-message">${message}</h1>
                <button id="goc-rematch" class="button">Rematch</button>
            </section>
        `;
    }
}
window.customElements.define('gameover-card', GameoverCard);