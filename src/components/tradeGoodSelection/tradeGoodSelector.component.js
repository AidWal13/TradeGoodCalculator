import { useContext } from "react";
import { selectedContext } from "../../data/selectedContext";

import * as tradegoodsObject from "../../data/tradegoods";

export default function TradeGoodSelector({ tradegood, setPage }) {
  const { selected, setSelected } = useContext(selectedContext);
  
  let tgLink = `/ingredients/${tradegood.name}.webp`;
  //Account for semi and superconductors
  let tradegoodDisplayName = handleConductors(tradegood);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 p-0">

      <div
        id={`${tradegood.name}TgCard`}
        className="m-3 d-flex justify-content-between flex-row-reverse tgCard"
        onClick={ () => { chooseObject(tradegood, selected, setPage) }}
      >
        <h4 className="col-8 col-lg-7 align-self-end text-end selectorName">{tradegoodDisplayName}</h4>
        <div className="col-3 col-lg-4 align-self-start tgImgDiv">
          <img className="tgImage img-fluid" alt={tradegood.id} src={tgLink} />
        </div>
      </div>
      
    </div>
  );

  
  //FUNCTIONS
  function chooseObject(tradegood, selected, setPage) {

    let newSelected = fillOutIngredients(tradegood, selected);

    setSelected(newSelected);

    setPage("input");
    
  }

  function fillOutIngredients(tradegood, selected, initial=true) {

    let newSelected = {...selected};

    //Assign the item property
    newSelected.item = tradegood;

    //The function has a default intitial value of true, meaning its the initial call of the function
    //This will not fire for the initial call
    //If the TG you want to make isnt base level, later, the recursive call will have initial set to false.
    //If it ISNT the initial call, add the current item to the tgNeeded array
    if (!initial) {
      newSelected.tradegoodsNeeded.push(tradegood);
    }
    
    //If the tradegood input is not made of other goods
    if (tradegood.baseLevel) {

      //Loop thru all ingredients
      tradegood.ingredients.forEach((ingredient) => {
        //If the ingredients list doesnt already include the current ingredient, add it to the array
        if (!newSelected.ingredients.includes(ingredient)) {
          newSelected.ingredients.push(ingredient);
        }

        //If the quantity of the ingredient doesnt exist/is null/is falsey
        if (!newSelected.quantityOf[ingredient]) {
          //Assign the quanitity of value to the amount of that ingredient needed at the moment
          newSelected.quantityOf[ingredient] = tradegood[ingredient];
        } else {
          //Otherwise, add it because theres already a number there
          newSelected.quantityOf[ingredient] += tradegood[ingredient];
        }      
      });

      
    //OTHERWISE, if the tradegood input IS made of other goods
    } else {
      console.log(tradegood.name + " is not baselevel and so re-inputting")

      //for each of those goods
      tradegood.ingredients.forEach((ingredient) => {
        //Format the string so that it can be properly accessed, assigned and re-input into the function recursively
        ingredient = ingredient.replace(/\s/g, "");
        ingredient = tradegoodsObject[ingredient];
        fillOutIngredients(ingredient, newSelected, false);
      });
    }


    //By this point, new selected.quantity of should be filled out.  
    //The item should be filled out.  
    //Quantity doesnt matter
    //have to re assign the ingredients array;
    let returnval = {...newSelected, ingredients: [...newSelected.ingredients]};
    return returnval;

  }

  function handleConductors(tgInput) {
    let displayName;

    if (tgInput.name === "superconductor") {
      displayName = (
        <>
        Super<span className="nullSpace"> </span>conductor
        </>
      )
    } else if (tgInput.name === "semiconductor") {
      displayName = (
        <>
        Semi<span className="nullSpace"> </span>conductor
        </>
      )
    } else {
      displayName = tgInput.id;
    }

    return displayName;
  }
}
