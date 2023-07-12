import { userHoldsContext } from "../../data/userHoldsContext";
import { selectedContext } from "../../data/selectedContext";
import { useContext } from "react";

import InputCard from "./inputCard.component";
import ChangeTgQty from "./changeTgQty.component";
import TradegoodInputCard from "./tradegoodInputCard.component";
import TgCardDiv from "./tgCardDiv.component";

export default function InputBoard({ setPage }) {
  //Retrieve contexts
  const { selected, setSelected } = useContext(selectedContext);
  const { userHolds, setUserHolds } = useContext(userHoldsContext);

  //Get the list of ingredients needed
  let ingredients = selected.ingredients;
  let tgs = selected.tradegoodsNeeded;
  
  let tgCards;
  if (tgs.length) {
    tgCards = tgs.map((tg) => {
      return <TradegoodInputCard tg={tg} key={tg.id} />;
    });
  } 

  console.log(tgCards)

  //Create the ingredient input cards
  let ingredientCards = ingredients.map((ingredient) => {
    return <InputCard ingredient={ingredient} key={ingredient} />;
  });

  return (
    <div>

      <div className="my-3">
        <h2 className="text-center">Resources for</h2>
        <ChangeTgQty selected={selected} setSelected={setSelected} />
        <h2 className="text-center"><span className="tradeGoodNameInputDiv"> {selected.item.id}</span></h2>
      </div>

      <h3>Enter what you have and press submit</h3>

      <form onSubmit={submitHeldIngredients}>

        {tgCards ? <TgCardDiv cards={tgCards}/> : null}

        <div className="d-flex flex-wrap">
          {ingredientCards}
        </div>

        <br />

        <input type="submit" id="ingredientSubmit"/>
      
      </form>
    </div>
  );

  //On submit, fill out the userHolds object with what the user has
  function submitHeldIngredients(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const rawForm = new FormData(e.target);
    const formData = Object.fromEntries(rawForm.entries());
    let keys = Object.keys(formData);

    //Update userHolds with the form data
    let userHoldsNew = {...userHolds};

    keys.forEach((key) => {
      console.log(key);
      if (key.startsWith("tg.")) {
        userHoldsNew.tradegoods[key.slice(3)] = formData[key];
      } else {
        userHoldsNew.ingredients[key] = formData[key];
      }
    })

    console.log("userHoldsNew")
    console.log(userHoldsNew)

    setUserHolds(userHoldsNew);

    //Go to the results page
    setPage("results");
  }
}