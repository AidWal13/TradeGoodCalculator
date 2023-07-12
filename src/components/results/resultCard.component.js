export default function ResultCard({ anythingLeftToGet,  whatsStillNeeded }) {
  const canMakeMessage = <h2>You have everything you need</h2>
  if (!anythingLeftToGet) {
    return canMakeMessage;
  }

  

  const ingredientsLeft = Object.keys(whatsStillNeeded).filter(ingredient => {
    return whatsStillNeeded[ingredient] > 0;
  });

  const elements = ingredientsLeft.map(ingredient => {
    let ingredientCap = capitalize(ingredient);

    //let tgLink = `https://aidwal13.github.io/No-Mans-Sky-Trade-Good-Calculator/assets/images/ingredients/${ingredient.replace(/\s/g, "")}.webp`;
    let tgLink = `/ingredients/${ingredient.replace(/\s/g, "")}.webp`;
    
    return (
      <div key={ingredient} className="my-4 d-flex align-items-center">
        <img className="resultImg img-fluid " alt={ingredient} src={tgLink} />
        <div>
          <h3>Not enough {ingredientCap}.</h3>
          <p>
            You need {whatsStillNeeded[ingredient]} more.<br />
            <a href={`https://nomanssky.fandom.com/wiki/${ingredientCap}#Source`} target="_blank" rel="noreferrer">Sources of {ingredientCap}.</a>
          </p>
        </div>
      </div>
    )
  })

  return elements;
} 

function capitalize(input) {
  return input.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}