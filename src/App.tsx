import "./App.css";
import Card from "./Card";
import cereludge from "./assets/imgs/Ceruledge.png";

function App() {
    const ceru = {
        name: "Ceruledge",
        number: "#937",
        image: cereludge,
        type: "Fuego/Fantasma",
    };
    return (
        <>
            <h1>Cards</h1>
            <section>
                <Card data={ceru} />
            </section>
        </>
    );
}

export default App;
