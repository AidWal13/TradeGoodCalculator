import { selectedContext } from "../data/selectedContext";
import { useContext } from "react";

export default function DebugCard() {
  const { selected } = useContext(selectedContext);
  //console.log(selected);

  let jsxListOfIngr = selected.ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })

  let tgStrArray = []

  selected.tradegoodsNeeded.forEach((tgObj) => {
    tgStrArray.push(tgObj.id)
  })

  let jsxListOfGoods = tgStrArray.map((tg) => {
    return <li key={tg}>{tg}</li>
  })


  return (
    <div id="DebugCard" className="p-2">
      Selected.quantity: {selected.quantity}
      <br />
      Selected.ingredients: 
        <ul>
          {jsxListOfIngr}
        </ul>
      Selected.tradegoodsNeeded:
        <ul>
          {jsxListOfGoods}
        </ul>
    </div>
  )
}