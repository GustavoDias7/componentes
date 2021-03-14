function carousel(carouselSlideId, leftButtonId, rightButtonId) {
    let carouselInner = document.getElementById(carouselSlideId);
    let leftBtn = document.getElementById(leftButtonId);
    let rightBtn = document.getElementById(rightButtonId);
    let widthOffset = carouselInner.clientWidth;
    let counterOffset = 0;
    let counterClicks = 0;
    let screenWidth = window.document.documentElement.clientWidth;
    let limitOfRightClicks = screenWidth > 499 ? 2 : 5;

    rightBtn.addEventListener('click', () => {
        if (counterClicks >= limitOfRightClicks) return;
        counterOffset += widthOffset;
        carouselInner.style.transform = `translateX(-${counterOffset}px)`;
        counterClicks++;
    });
    
    leftBtn.addEventListener('click', () => {
        if (counterClicks === 0) return;
        counterOffset -= widthOffset;
        carouselInner.style.transform = `translateX(-${counterOffset}px)`;
        counterClicks--;
    });

    window.addEventListener('resize', () => {
        widthOffset = carouselInner.clientWidth;
        counterOffset = 0;
        counterClicks = 0;
        screenWidth = window.document.documentElement.clientWidth;
        limitOfRightClicks = screenWidth > 499 ? 2 : 5;
        carouselInner.style.transform = `translateX(0px)`;
    });
}

carousel('carousel-inner', 'left-btn', 'right-btn');