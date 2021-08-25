{/* <div class="crs-container">
  <div class="crs-inner">
    <div class="crs-items">
      <div class="crs-item"></div>
      <div class="crs-item"></div>
      <div class="crs-item"></div>
    </div>
  </div>
  <div class="crs-arrows">
    <button class="crs-arrow prev"></button>
    <button class="crs-arrow right"></button>
  </div>
  <div class="crs-dots">
    <button class="crs-dot"></button>
    <button class="crs-dot"></button>
    <button class="crs-dot"></button>
  </div>
</div> */}

class Carousel {
  constructor(selector, settings) {
      this.selector = selector;
      this.settings = settings;
      this.$crsContainer = null;
      this.$crsOverflow = null;
      this.$crsInner = null;
      this.$crsItemContainer = null;
      this.$crsItemList = null;
      this.$crsArrowContainer = null;
      this.$crsDot = null;
      this.$crsDotContainer = null;
      this.$crsDot = null;
      this.widthCrsItem = '';
      this.createStructure(this.selector);
      this.handleWidthSlides(this.settings);
  }
  createStructure(mainContainer) {
    this.$crsContainer = document.querySelector(mainContainer);
    const initialContent = this.$crsContainer.innerHTML;
    this.$crsContainer.innerHTML = '';

    const crsOverflowSelector = 'crs-overflow';
    const crsOverflow = document.createElement('div');
    crsOverflow.setAttribute('class', crsOverflowSelector);

    const crsInnerSelector = 'crs-inner';
    const crsInner = document.createElement('div');
    crsInner.setAttribute('class', crsInnerSelector);
    
    const crsItemContainerSelector = 'crs-item-container';
    const crsItemContainer = document.createElement('div');
    crsItemContainer.setAttribute('class', crsItemContainerSelector);
    
    crsItemContainer.innerHTML = initialContent;
    crsInner.appendChild(crsItemContainer);
    crsOverflow.appendChild(crsInner);
    this.$crsContainer.appendChild(crsOverflow);

    this.$crsOverflow = document.querySelector(`.${crsOverflowSelector}`)
    this.$crsInner = document.querySelector(`.${crsInnerSelector}`);
    this.$crsItemContainer = document.querySelector(`.${crsItemContainerSelector}`);
    
    const crsItemListSelector = 'crs-item';
    for(let item of this.$crsItemContainer.children) {
      item.classList.add(crsItemListSelector)
    }
    this.$crsItemList = this.$crsItemContainer.querySelectorAll(`.${crsItemListSelector}`);

    // create arrows and dots
    this.createArrows();
    this.createDots();
  }
  createArrows() {
    const crsArrowContainer = document.createElement('div');
    crsArrowContainer.classList.add('crs-arrow-container');

    const crsArrow = document.createElement('button');
    crsArrow.classList.add('crs-arrow');

    const crsPrevArrow = crsArrow.cloneNode(true);
    crsPrevArrow.classList.add('prev');
    const crsNextArrow = crsArrow.cloneNode(true);
    crsNextArrow.classList.add('next');

    crsArrowContainer.appendChild(crsPrevArrow);
    crsArrowContainer.appendChild(crsNextArrow);

    this.$crsContainer.appendChild(crsArrowContainer);

    this.$crsArrowContainer = document.querySelector('crs-arrows-container');
    this.$crsArrow = document.querySelectorAll('crs-arrow');
  }
  createDots() {
    const crsDotContainer = document.createElement('div');
    const crsDotContainerSelector = 'crs-dot-container';
    crsDotContainer.classList.add(crsDotContainerSelector);

    const crsDot = document.createElement('button');
    const crsDotSelector = 'crs-dot';
    crsDot.classList.add(crsDotSelector);

    for (let i=0; i<this.$crsItemList.length; i++) {
      crsDotContainer.appendChild(crsDot.cloneNode(true));
    }

    this.$crsContainer.appendChild(crsDotContainer);

    this.$crsDotContainer = document.querySelector(crsDotContainerSelector);
    this.$crsDot = document.querySelectorAll(crsDotSelector);
  }
  handleWidthSlides({ slidesToShow }) {
    // set width of each element
    const totalWidth = this.$crsContainer.clientWidth;
    this.widthCrsItem = totalWidth / slidesToShow;
    this.$crsItemList.forEach(item => {
      item.style.width = `${this.widthCrsItem}px`
    })
  }
}

new Carousel('.crs-carousel', {
  slidesToShow: 3,
});