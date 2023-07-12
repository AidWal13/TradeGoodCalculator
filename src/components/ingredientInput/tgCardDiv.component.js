export default function TgCardDiv({cards}) {
  return (
    <div>
      <h6>Do you already have any of these tradegoods?</h6>
      <div className="d-flex flex-wrap">
        {cards}
      </div>
      <hr />
    </div>
  )
}