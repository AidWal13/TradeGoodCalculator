import { selectedContext } from "../../data/selectedContext";
import { useContext, useId, useEffect } from "react";

export default function InputCard({ ingredient }) {

  const { selected } = useContext(selectedContext);
  const ingredientInputId = useId();
  const ingredientAmount = selected.quantityOf[ingredient];

  const ingredientNoSpaces = ingredient.replace( /\s/g, "" )
  
  return (
    <div className="d-flex align-items-center my-3">
      <img
        alt="tradegoodName"
        className="ingrImg"
        src={`/ingredients/${ingredientNoSpaces}.webp`}
      />
      <label htmlFor={ingredientInputId}>
        <h3>{capitalizeFirstLetter(ingredient)}</h3>
        <br />
        <input name={ingredient} id={ingredientInputId} type="number" min="0" placeholder={ingredientAmount} />
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