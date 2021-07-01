function carousel(carouselSlide) {
    let carouselInner = document.querySelector(carouselSlide);
    let widthOffset = carouselInner.clientWidth;
    let counterOffset = 0;
    let counterClicks = 0;

    let breakpoints = {
        small: 450,
        big: 900,
    }

    function setLimitOfRightClicks(breakpoint) {
        const isMobile = window.matchMedia(`(max-width: ${breakpoint.small}px)`).matches;
        const isDesk = window.matchMedia(`(min-width: ${breakpoint.big}px)`).matches;

        let limitOfRightClicks;
        if (isMobile) {
            limitOfRightClicks = 5;
        } 
        else if (isDesk) {
            limitOfRightClicks = 2;
        }
        
        return limitOfRightClicks;
    }
    let limitOfRightClicks = setLimitOfRightClicks(breakpoints);
    
    function createBtns(rightBtnName, leftBtnName, containerToInject) {
        // create button element
        const genreicBtn = document.createElement('button');
        genreicBtn.setAttribute('class', 'carousel-btn');

        // create right button
        const rightBtn = genreicBtn.cloneNode(true);
        rightBtn.classList.add(rightBtnName);
        rightBtn.setAttribute('id', rightBtnName);
        rightBtn.innerHTML = '&#62';
        
        // create left button
        const leftBtn = genreicBtn.cloneNode(true);
        leftBtn.classList.add(leftBtnName);
        leftBtn.setAttribute('id', leftBtnName);
        leftBtn.innerHTML = '&#60';

        // create a general container
        const carouselBtnContainer = document.createElement('div');
        carouselBtnContainer.setAttribute('class', 'btn-container');
        carouselBtnContainer.appendChild(rightBtn);
        carouselBtnContainer.appendChild(leftBtn);
        
        // inject buttons on document
        const containerInject = document.querySelector(`.${containerToInject}`);
        containerInject.appendChild(carouselBtnContainer);

        addEventButtons(rightBtn, leftBtn);
    }
    createBtns('right-btn', 'left-btn', 'carousel');

    function addEventButtons(rightBtn, leftBtn) {
        rightBtn.addEventListener('click', () => {
            if (counterClicks >= limitOfRightClicks) {
                counterOffset = 0;
                counterClicks = 0;
                carouselInner.style.transform = `translateX(-${counterOffset}px)`;
            } else {
                counterOffset += widthOffset;
                carouselInner.style.transform = `translateX(-${counterOffset}px)`;
                counterClicks++;
            }
        });
        
        leftBtn.addEventListener('click', () => {
            if (counterClicks === 0) return;
            counterOffset -= widthOffset;
            carouselInner.style.transform = `translateX(-${counterOffset}px)`;
            counterClicks--;
        });
    }
    
    window.addEventListener('resize', () => {
        widthOffset = carouselInner.clientWidth;
        counterOffset = 0;
        counterClicks = 0;
        limitOfRightClicks = setLimitOfRightClicks(breakpoints);
        carouselInner.style.transform = `translateX(0px)`;
    });
}

carousel('#carousel-inner', '#left-btn', '#right-btn');