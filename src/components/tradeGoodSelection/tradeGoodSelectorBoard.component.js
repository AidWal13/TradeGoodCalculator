import TradeGoodSelector from "./tradeGoodSelector.component";

export default function TradeGoodSelectorBoard({ tradegoodArray, setPage }) {
  let baseTgArray = tradegoodArray.filter((tg) => {
    if (tg.baseLevel === true) {
      return true;
    } else {
      return false;
    }
  });

  let baseTgSelectors = baseTgArray.map((tg) => {
    return <TradeGoodSelector tradegood={tg} setPage={setPage} key={tg.id} />;
  });

  let higherLvlTgArray = tradegoodArray.filter((tg) => {
    if (tg.baseLevel === false) {
      return true;
    } else {
      return false;
    }
  });

  let higherLvlTgSelectors = higherLvlTgArray.map((tg) => {
    return <TradeGoodSelector tradegood={tg} setPage={setPage} key={tg.id} />;
  });

  return (
    <div id="tradeGoodSelectorBoard">
      <h3>Base</h3>
      <div className="d-flex flex-wrap row">
        {baseTgSelectors}
      </div>
      <h3>Higher Level</h3>
      <div className="d-flex flex-wrap">
        {higherLvlTgSelectors}
      </div>
    </div>
  );
}
