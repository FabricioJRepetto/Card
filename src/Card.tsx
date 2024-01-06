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

interface iCoords {
    maxHypot: number;
    anchorX: number;
    anchorY: number;
    width: number;
    height: number;
    // debug
    minCenterX: number;
    minCenterY: number;
    maxCenterX: number;
    maxCenterY: number;
}

const logPos = (
    X: number,
    Y: number,
    lastZone: number | null,
    centerX: boolean,
    centerY: boolean,
    minCenterX: number,
    minCenterY: number,
    maxCenterX: number,
    maxCenterY: number
): number | null => {
    let pos = null;
    if (centerY && centerX) {
        if (lastZone !== 0) {
            pos = 0;
            console.clear();
            console.log(`
                · · ·
                · + ·
                · · ·`);
        }
    } else if (Y <= minCenterY && X <= minCenterX) {
        if (lastZone !== 1) {
            pos = 1;
            console.clear();
            console.log(`
                + · ·
                · · ·
                · · ·`);
        }
    } else if (Y <= minCenterY && centerX) {
        if (lastZone !== 2) {
            pos = 2;
            console.clear();
            console.log(`
                · + ·
                · · ·
                · · ·`);
        }
    } else if (Y <= minCenterY && X >= maxCenterX) {
        if (lastZone !== 3) {
            pos = 3;
            console.clear();
            console.log(`
                · · +
                · · ·
                · · ·`);
        }
    } else if (centerY && X <= minCenterX) {
        if (lastZone !== 4) {
            pos = 4;
            console.clear();
            console.log(`
                · · ·
                + · ·
                · · ·`);
        }
    } else if (centerY && X >= maxCenterX) {
        if (lastZone !== 5) {
            pos = 5;
            console.clear();
            console.log(`
                · · ·
                · · +
                · · ·`);
        }
    } else if (Y >= maxCenterY && X <= minCenterX) {
        if (lastZone !== 6) {
            pos = 6;
            console.clear();
            console.log(`
                · · ·
                · · ·
                + · ·`);
        }
    } else if (Y >= maxCenterY && centerX) {
        if (lastZone !== 7) {
            pos = 7;
            console.clear();
            console.log(`
                · · ·
                · · ·
                · + ·`);
        }
    } else if (Y >= maxCenterY && X >= maxCenterX) {
        if (lastZone !== 8) {
            pos = 8;
            console.clear();
            console.log(`
                · · ·
                · · ·
                · · +`);
        }
    }
    return pos;
};

const Card: FunctionComponent<Props> = ({ data }) => {
    const { name, number, image, type } = data;
    const CARD = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<boolean>(false);
    const [coords, setCoords] = useState<iCoords | null>(null);
    const sensivity: number = 10; // máximos deg para el rotate
    // Debug
    const debug: boolean = false;
    const POINTER = useRef<HTMLDivElement>(null);
    const [lastZone, setLastZone] = useState<number | null>(null);

    const listener = (ev: MouseEvent) => {
        if (active && coords && CARD.current) {
            const { clientY: Y, clientX: X } = ev;
            const { anchorX, anchorY, maxHypot, width, height, minCenterX, maxCenterX, minCenterY, maxCenterY } =
                coords;

            // calcula la distancia del cursor al centro de la carta (hipotenusa)
            // y la traduce a grados, siendo el centro 0º y la distancia máxima el máximo de grados (definido por la variable sensivity)
            const hyp = Math.round((Math.hypot(Y - anchorY, X - anchorX) * sensivity) / maxHypot);
            const xAxis = ((X - anchorX) * width) / 1000000;
            const yAxis = ((Y - anchorY) * height) / 1000000;

            CARD.current.style.rotate = `${xAxis - 1} ${yAxis - 1} 0 ${hyp}deg`;

            if (debug) {
                const centerX = X > minCenterX && X < maxCenterX;
                const centerY = Y > minCenterY && Y < maxCenterY;

                const pos = logPos(X, Y, lastZone, centerX, centerY, minCenterX, minCenterY, maxCenterX, maxCenterY);
                pos !== null && pos !== lastZone && setLastZone(pos);
            }
        }
    };

    const handleActive = () => {
        setActive(true);
        if (POINTER.current && CARD.current) {
            const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = CARD.current;
            const anchorX = offsetLeft + offsetWidth / 2;
            const anchorY = offsetTop + offsetHeight / 2;

            POINTER.current.style.left = anchorX + "px";
            POINTER.current.style.top = anchorY + "px";

            const tX = 50,
                tY = 75;

            setCoords({
                maxHypot: Math.round(Math.hypot(offsetHeight / 2, offsetWidth / 2)),
                anchorX,
                anchorY,
                width: offsetWidth,
                height: offsetHeight,
                // Debug
                minCenterX: Math.round(anchorX - tX),
                maxCenterX: Math.round(anchorX + tX),
                minCenterY: Math.round(anchorY - tY),
                maxCenterY: Math.round(anchorY + tY),
            });
        }
        // CARD.current?.addEventListener("mousemove", listener);
    };

    const handleInactive = () => {
        setActive(false);
        CARD.current && (CARD.current.style.rotate = `0 0 0 0deg`);
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
