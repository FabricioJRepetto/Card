import { FunctionComponent, useState } from "react";

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
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className="card" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <p className="name">{name}</p>
            <p className="number">{number}</p>
            <img src={image} />
            <p className="type">{type}</p>
        </div>
    );
};

export default Card;
