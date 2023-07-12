import * as tradegoodsObject from "../../data/tradegoods";

export default function ChangeTgQty({selected, setSelected}) {

  return (
    <div className="row px-0 mt-2">
        <div className="col minus" onClick={() => decreaseQty(selected.item, selected)}>
          <span className="material-symbols-outlined">remove</span>
        </div>
        <div className="col-auto amtTradeGood px-4">
          <span className="my-auto">{selected.quantity}</span>
        </div>
        <div className="col plus" onClick={() => increaseQty(selected.item, selected)}>
          <span className="material-symbols-outlined my-auto">add</span>
        </div>
      </div>
  )



  function increaseQty(relevantTG, selectedObj) {
    if (relevantTG.baseLevel === true) {

      let newSelected = {...selectedObj}
      newSelected.quantity++;

      //Loop thru all ingredients
      relevantTG.ingredients.forEach((ingredient) => {
        newSelected.quantityOf[ingredient] += relevantTG[ingredient]
      });

      setSelected(newSelected);
      console.log(newSelected)
    //OTHERWISE, if the tradegood input IS made of other goods
    } else {
      console.log("relevant TG below is not baseLevel");
      
      //for each of those goods
      relevantTG.ingredients.forEach((ingredient) => {
        //Format the string so that it can be properly accessed, assigned and re-input into the function recursively
        ingredient = ingredient.replace(/\s/g, "");
        ingredient = tradegoodsObject[ingredient];
        increaseQty(ingredient, selectedObj);
      });
    }
  }



  function decreaseQty(relevantTG, selectedObj) {
    if (selectedObj.quantity === 1) {
      console.log("can't go below quantity one");
    } else {
      if (relevantTG.baseLevel === true) {

        let newSelected = {...selectedObj}
        newSelected.quantity--;

        console.log("decreasing")
        //Loop thru all ingredients
        relevantTG.ingredients.forEach((ingredient) => {
          newSelected.quantityOf[ingredient] -= relevantTG[ingredient]
        });

        setSelected(newSelected);

      //OTHERWISE, if the tradegood input IS made of other goods
      } else {
        console.log("relevant TG below is not baseLevel");
        
        //for each of those goods
        relevantTG.ingredients.forEach((ingredient) => {
          //Format the string so that it can be properly accessed, assigned and re-input into the function recursively
          ingredient = ingredient.replace(/\s/g, "");
          ingredient = tradegoodsObject[ingredient];
          decreaseQty(ingredient, selectedObj);
        });
      }
    }
  }
}