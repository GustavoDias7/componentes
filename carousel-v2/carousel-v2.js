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
      this.$crsInner = null;
      this.$crsItems = null;
      this.$crsItemList = null;
      this.$crsArrowContainer = null;
      this.$crsDot = null;
      this.$crsDotContainer = null;
      this.$crsDot = null;
      this.createStructure(selector);
  }
  createStructure(mainContainer) {
    this.$crsContainer = document.querySelector(mainContainer);
    const initialContent = this.$crsContainer.innerHTML;
    this.$crsContainer.innerHTML = '';

    const crsInnerSelector = 'crs-inner';
    const crsInner = document.createElement('div');
    crsInner.setAttribute('class', crsInnerSelector);
    
    const crsItemsSelector = 'crs-items';
    const crsItems = document.createElement('div');
    crsItems.setAttribute('class', crsItemsSelector);
    
    crsItems.innerHTML = initialContent;
    crsInner.appendChild(crsItems);
    this.$crsContainer.appendChild(crsInner);
    this.$crsInner = document.querySelector(`.${crsInnerSelector}`);
    this.$crsItems = document.querySelector(`.${crsItemsSelector}`);
    
    const crsItemListSelector = 'crs-item';
    for(let item of this.$crsItems.children) {
      item.classList.add(crsItemListSelector)
    }
    this.$crsItemList = this.$crsItems.querySelectorAll(`.${crsItemListSelector}`);

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
}

new Carousel('.crs-carousel', {});