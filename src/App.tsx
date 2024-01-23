import "./App.css";
import Card from "./Card";
import cereludge from "./assets/imgs/Ceruledge.png";
import armarouge from "./assets/imgs/Armarouge.png";
import charizard from "./assets/imgs/MegaCharizardY.png";
import rayquaza from "./assets/imgs/Rayquaza.png";
import groudon from "./assets/imgs/Groudon.png";

function App() {
    const ceru = {
        name: "Ceruledge",
        jp: "ソウブレイズ",
        number: "#937",
        image: cereludge,
        type: "Fuego/Fantasma",
    };
    const arma = {
        name: "Armarouge",
        jp: "グレンアルマ",
        number: "#936",
        image: armarouge,
        type: "Fuego/Psíquico",
    };
    const rayq = {
        name: "Rayquaza",
        jp: "レックウザ",
        number: "#384",
        image: rayquaza,
        type: "Dragon/Volador",
    };
    const grou = {
        name: "Groudon",
        jp: "グラードン",
        number: "#383",
        image: groudon,
        type: "Tierra",
    };
    const chari = {
        name: "Charizard",
        jp: "リザードン",
        number: "#006",
        image: charizard,
        type: "Fuego/Dragon",
    };
    return (
        <>
            <section className="cardsContainer">
                <Card data={ceru} />
                <Card data={arma} />
                <Card data={chari} />
                <Card data={rayq} />
                <Card data={grou} />
            </section>
        </>
    );
}

export default App;
