import { useId } from "react";

export default function TradegoodInputCard({ tg }) {

  const inputId = useId();
  const tgNoSpaces = tg.name.replace( /\s/g, "" )
  
  return (
    <div className="d-flex align-items-center my-3">
      <img
        alt="tradegood"
        className="ingrImg"
        src={`/ingredients/${tgNoSpaces}.webp`}
      />
      <label htmlFor={inputId}>
        <h3>{capitalizeFirstLetter(tg.id)}</h3>
        <br />
        <input name={`tg.${tg.name}`} id={inputId} type="number" min="0" placeholder="0"/>
      </label>
    </div>
  );

  function capitalizeFirstLetter(string) {
    return string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  }
}