import { useState } from "react";

import TradeGoodSelectorBoard from "./tradeGoodSelection/tradeGoodSelectorBoard.component";
import InputBoard from "./ingredientInput/inputBoard.component";
import Results from "./results/results.component";
import NotFound from "./notFound.component";
import DebugCard from "./DebugCard.component";

import { tradegoodsArray } from "../data/tradegoodsArray";
import { selectedContext } from "../data/selectedContext";
import { userHoldsContext } from "../data/userHoldsContext"
import Header from "./header.component";

export default function Interface() {

  //Initial State Values
  const initalPage = "select";
  const initialSelected = {
    item: null,
    quantity: 1,
    tradegoodsNeeded: [],
    ingredients: [],
    quantityOf: {}
  };

  //Set initial state values
  const [page, setPage] = useState(initalPage);
  const [selected, setSelected] = useState(initialSelected);
  const [userHolds, setUserHolds] = useState({ tradegoods: {}, ingredients: {} });


  //Set the output to the appropriate page configuration 
  let output;
  if (page === "select") {

    output = (
        <TradeGoodSelectorBoard
          tradegoodArray={tradegoodsArray}
          setPage={setPage}
        />

    );
    
  } else if (page === "input") {

    output = (
      <userHoldsContext.Provider value={{userHolds, setUserHolds}}>
          <InputBoard setPage={setPage} />
      </userHoldsContext.Provider>
    );

  } else if (page === "results") {

    output = (
      <userHoldsContext.Provider value={{userHolds, setUserHolds}}>
        <Results setPage={setPage} />
      </userHoldsContext.Provider>
    );

  } else {

    output = <NotFound setPage={setPage} />

  };

  //Return the page within the selectedContext provider because everything needs access to that
  return (
    <selectedContext.Provider value={{selected, setSelected}}>
      <Header />
      {/*<DebugCard />*/}
      {output}
    </selectedContext.Provider>
  )
  
}
