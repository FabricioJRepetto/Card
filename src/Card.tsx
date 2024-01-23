import { FunctionComponent, useRef, useState, MouseEvent } from "react";

interface Data {
    name: string;
    jp: string;
    number: string;
    image: string;
    type: string;
}

interface Props {
    data: Data;
}

interface iCoords {
    maxHypot?: number;
    anchorX?: number;
    anchorY?: number;
    width: number;
    height: number;
    left: number;
    top: number;
}

const Card: FunctionComponent<Props> = ({ data }) => {
    const { name, jp, number, image, type } = data;
    const CARD = useRef<HTMLDivElement>(null);
    const TTO = useRef<number | null>(null);
    const GLARE = useRef<HTMLDivElement>(null);
    const CHROMASHINE = useRef<HTMLDivElement>(null);
    const CHROMA = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState<boolean>(false);
    const [coords, setCoords] = useState<iCoords | null>(null);
    const glare: boolean = false;
    const max: number = 15; // máximos deg para el rotate
    const perspective: number = 1000;
    const scale: number = 1.05;
    const speed: number = 500;
    const glareOpacity: number = 0.2;
    const chromaOpacity: number = 0.2;

    const setTransition = () => {
        TTO.current && clearTimeout(TTO.current);
        CARD.current && (CARD.current.style.transition = `${speed}ms cubic-bezier(.03,.98,.52,.99)`);
        glare && GLARE.current && (GLARE.current.style.transition = `opacity ${speed}ms cubic-bezier(.03,.98,.52,.99)`);

        TTO.current = setTimeout(() => {
            CARD.current && (CARD.current.style.transition = "");
            glare && GLARE.current && (GLARE.current.style.transition = "");
        }, speed);
    };

    const listener = (ev: MouseEvent) => {
        if (active && coords && CARD.current) {
            const { clientY, clientX } = ev;
            const { width, height, left, top } = coords;

            // Convierte la coord a un decimal entre 0 y 1
            // 0 inicio de la card, 1 final
            const X = (clientX - left) / width;
            const Y = (clientY - top) / height;
            // const angle = Math.atan2(clientX - (left + width / 2), -(clientY - (top + height / 2))) * (180 / Math.PI);

            // Calcula angulo en base a la coord
            // X * max = "porcentaje" del angulo - ej: 0.75 * 15 = 11.25
            // 10 * 2 = 22.5
            // 15 - 20 = -7.5deg
            // Con el cursor al 75% de la card (horizontalmente)
            // el angulo de inclinación es -7.5 (se eleva el lado derecho)
            const tiltX = (max - X * max * 2).toFixed(2);
            const tiltY = (Y * max * 2 - max).toFixed(2);

            const style = `perspective(${perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${scale}, ${scale}, ${scale})`;

            CARD.current.style.transform = style;
            if (GLARE.current && CHROMA.current && CHROMASHINE.current) {
                const gX = Number(tiltX) * 12;
                const gY = Number(tiltY) * 10;

                // Opacidad relativo al angulo Y
                GLARE.current.style.opacity = `${(Y * 100 * glareOpacity) / 100}`;
                CHROMA.current.style.opacity = `${(Y * 100 * chromaOpacity) / 100}`;
                CHROMASHINE.current.style.opacity = `${(Y * 100 * chromaOpacity) / 100}`;

                // Movimiento del reflejo
                // GLARE.current.style.transform = `translate(${tiltX}%, ${tiltY}%)`;
                GLARE.current.style.backgroundPositionX = `${gX + 50}%`;
                GLARE.current.style.backgroundPositionY = `${gY}%`;
                CHROMA.current.style.backgroundPositionX = `${gX}%`;
                CHROMA.current.style.backgroundPositionY = `${gY}%`;
                CHROMASHINE.current.style.backgroundPositionX = `${gX}%`;
                CHROMASHINE.current.style.backgroundPositionY = `${gY}%`;
            }
        }
    };

    const handleActive = () => {
        setActive(true);
        if (CARD.current) {
            const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = CARD.current;
            setCoords({
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop,
            });
            setTransition();
        }
    };

    const handleInactive = () => {
        setActive(false);
        if (CARD.current && GLARE.current && CHROMA.current && CHROMASHINE.current) {
            setTransition();
            CARD.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
            GLARE.current.style.opacity = `0`;
            CHROMASHINE.current.style.opacity = `0`;
            CHROMA.current.style.opacity = `0`;
        }
    };

    return (
        <>
            <div
                ref={CARD}
                className={`card ${active ? "active" : ""}`}
                onMouseEnter={handleActive}
                onMouseLeave={handleInactive}
                onMouseMove={listener}
            >
                <div ref={GLARE} className={`glare`}></div>

                <div ref={CHROMASHINE} className={`chroma`}></div>
                <div
                    ref={CHROMA}
                    className={`chroma-mask`}
                    style={{ maskImage: `url(${image})`, WebkitMaskImage: `url(${image})` }}
                ></div>
                <img src={image} />

                <p className="type">{type}</p>
                <p className="name">{name}</p>
                <p className="namejp">{jp}</p>
                <p className="number">{number}</p>
            </div>
        </>
    );
};

export default Card;
