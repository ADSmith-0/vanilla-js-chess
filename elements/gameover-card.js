class GameoverCard extends HTMLElement{
    constructor(){
        super();

        this.innerHTML = `
            <section id="gameover-card">
                <button id="goc-close">✖</button>
                <h1 id="goc-message"></h1>
                <button id="goc-rematch" class="button">Rematch</button>
            </section>
        `;

        document.getElementById("goc-close").addEventListener("click", this.hide.bind(this));
        document.getElementById("goc-rematch").addEventListener("click", () => {});
        this.hide();
        this.#setMessage.bind(this);
    }

    #setMessage(){
        const ending = this.getAttribute("ending") || "ds";
        const message = this.#messageFromEnding(ending);

        this.querySelector("h1#goc-message").innerHTML = message;
    }

    #messageFromEnding(ending){
        switch(ending){
            case "wc":
                return "White wins <br> by checkmate!";
            case "bc":
                return "Black wins <br> by checkmate!";
            case "wr":
                return "White wins <br> by resignation!";
            case "br":
                return "Black wins <br> by resignation!";
            case "ds":
                return "Draw <br> by stalemate";
            case "dr":
                return "Draw <br> by repetition";
        }
    }

    show(){
        this.#setMessage();
        this.style.display = "block";
    }

    hide(){
        this.style.display = "none";
    }
}
window.customElements.define('gameover-card', GameoverCard);