import { FunctionComponent, useRef, useState, MouseEvent } from "react";

interface Data {
    name: string;
    number: string;
    image: string;
    type: string;
}

interface Props {
    data: Data;
}

const Card: FunctionComponent<Props> = ({ data }) => {
    const { name, number, image, type } = data;
    const CARD = useRef<HTMLDivElement>(null);
    const POINTER = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<boolean>(false);

    const listener = (ev: MouseEvent) => {
        if (active && CARD.current) {
            const { clientY: Y, clientX: X } = ev;
            const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = CARD.current;
            const anchorX = offsetLeft + offsetWidth / 2;
            const anchorY = offsetTop + offsetHeight / 2;

            const margin = 75;
            const centerY = Y <= anchorY + margin && Y >= anchorY - margin;
            const centerX = X <= anchorX + margin && X >= anchorX - margin;

            // POINTER.current.style.top = ev.clientY + "px";
            // POINTER.current.style.left = ev.clientX + "px";

            console.clear();
            if (centerY && centerX) {
                console.log(`
                · · ·
                · + ·
                · · ·`);
            } else if (Y < anchorY && X < anchorX) {
                console.log(`
                + · ·
                · · ·
                · · ·`);
            } else if (Y < anchorY && centerX) {
                console.log(`
                · + ·
                · · ·
                · · ·`);
            } else if (Y < anchorY && X > anchorX) {
                console.log(`
                · · +
                · · ·
                · · ·`);
            } else if (centerY && X < anchorX) {
                console.log(`
                · · ·
                + · ·
                · · ·`);
            } else if (centerY && X > anchorX) {
                console.log(`
                · · ·
                · · +
                · · ·`);
            } else if (Y > anchorY && X < anchorX) {
                console.log(`
                · · ·
                · · ·
                + · ·`);
            } else if (Y > anchorY && centerX) {
                console.log(`
                · · ·
                · · ·
                · + ·`);
            } else if (Y > anchorY && X > anchorX) {
                console.log(`
                · · ·
                · · ·
                · · +`);
            }
        }
    };

    const handleActive = () => {
        setActive(true);
        // CARD.current?.addEventListener("mousemove", listener);
    };

    const handleInactive = () => {
        setActive(false);
        // CARD.current?.removeEventListener("mousemove", () => {});
    };

    return (
        <>
            <div ref={POINTER} className={`pointer ${active ? "pointer-visible" : ""}`}></div>
            <div
                ref={CARD}
                className={`card ${active ? "active" : ""}`}
                onMouseEnter={handleActive}
                onMouseLeave={handleInactive}
                onMouseMove={listener}
            >
                <p className="name">{name}</p>
                <p className="number">{number}</p>
                <img src={image} />
                <p className="type">{type}</p>
            </div>
        </>
    );
};

export default Card;
