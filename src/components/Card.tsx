import { FC } from "react";
import "../styles/Card.css";

interface Props {
  title: string;
  text: string;
  image: string;
}

const Card: FC<Props> = ({ title, text, image }) => {
  return (
    <div className="card-container">
      <div className="card-container__header">template func</div>
      <div className="card-container__content">
        <img className="card-container__image" alt={title} src={image} />
        <div className="card-container__text">
          <div className="card-container__text__header">{title}</div>
          <div className="card-container__text__message">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
