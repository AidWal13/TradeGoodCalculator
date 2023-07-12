export default function NotFound({setPage}) {
  return (
    <div>
      <h3>Page Not Found</h3>
      <h6>How did you get here?</h6>
      <button onClick={() => setPage("select")}></button>
    </div>
  )
}