import { useContext } from "react";
import { userHoldsContext } from "../../data/userHoldsContext";
import { selectedContext } from "../../data/selectedContext";
import ResultCard from "./resultCard.component";

import * as tradegoodsObject from "../../data/tradegoods";

export default function Results() {
  const { selected } = useContext(selectedContext);
  const { userHolds } = useContext(userHoldsContext);
  
  const resultsMessage = calculate();

  return (
    <>
    <h4>Results</h4>
    <h5>Making {selected.quantity} {selected.item.id}</h5>
    {resultsMessage}
    </>
  )

  function calculate() {

    const whatsStillNeeded = {};
    //Actually evaluate the numbers, when it comes to what is needed vs what the user has. 
    selected.ingredients.forEach((ingredient) => {
      whatsStillNeeded[ingredient] = selected.quantityOf[ingredient] - userHolds.ingredients[ingredient];
      //Whats Still needed to make the trade good is equal to what is needed minus what the user has
    })

    console.log(userHolds)

    let theList = Object.keys(userHolds.tradegoods)

    theList.forEach(tg => {
      if (userHolds.tradegoods[tg] === "") {
        return
      } else {
        let quantity = parseInt(userHolds.tradegoods[tg]);
        subtractTgIngredients(tg, whatsStillNeeded, quantity);
      }
    })


    let anythingLeftToGet;
    selected.ingredients.forEach((ingredient) => {
      //If any of the ingredients is above 0, that means that the user still needs that much more.
      //So if anything is greater than 0, the user cannot make the tradegood.
      //Therefore, set anythingLeftToGet? as true, because there is stuff they still need to get.
      if (whatsStillNeeded[ingredient] > 0) {
        anythingLeftToGet = true;
      }
    })

  
    if (!anythingLeftToGet) { //if there is nothing left to get
      return <ResultCard anythingLeftToGet={false} whatsStillNeeded={whatsStillNeeded} />
    } else {
      return <ResultCard anythingLeftToGet={true} whatsStillNeeded={whatsStillNeeded} />;
    }
  }



  function subtractTgIngredients(tradegood, whatsStillNeeded, quantity) {
    tradegood = tradegoodsObject[tradegood];
    console.log(tradegood)

    //If the tradegood input is not made of other goods
    if (tradegood.baseLevel) {

      //Loop thru all ingredients
      tradegood.ingredients.forEach((ingredient) => {
        console.log("tradegood[ingredient]" + tradegood[ingredient]);
        console.log("whatsStillNeeded[ingredient]" + whatsStillNeeded[ingredient])
        whatsStillNeeded[ingredient] -= tradegood[ingredient] * quantity;
      });

      
    //OTHERWISE, if the tradegood input IS made of other goods
    } else {
      console.log("Subtracting: Below is not base level")
      console.log(tradegood);
      //for each of those goods
      tradegood.ingredients.forEach((ingredient) => {
        //Format the string so that it can be properly accessed, assigned and re-input into the function recursively
        ingredient = ingredient.replace(/\s/g, "");
        ingredient = tradegoodsObject[ingredient];
        subtractTgIngredients(ingredient, whatsStillNeeded);
      });
    }
  }
}