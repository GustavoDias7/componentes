// createSlides for testing purpose
function createSlides({quantSlides}) {
  const container = document.querySelector('.crs-carousel');
  for (let i=0; i<quantSlides; i++) {
    container.innerHTML += `
    <div>
      <div class="card-content">
        <h1>Hello Title ${i+1}</h1>
        <p>Hello para</p>
        <p>Hello para</p>
        <p>Hello para</p>
        <button>Hello button</button>
      </div>
    </div>
    `
  }
}
// createSlides is for testing purpose
createSlides({
  quantSlides: 5,
})