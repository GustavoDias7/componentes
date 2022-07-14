carousel('.carousel', {
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
});

function carousel(selectorName, settings) {
    const carousel = document.querySelector(selectorName);
    
    // prevent scroll be greater than show
    if (settings.slidesToScroll > settings.slidesToShow) {
        settings.slidesToScroll = settings.slidesToShow;
    }

    // set width and height of .carousel-item
    const carouselItemList = carousel.querySelectorAll('.carousel-item');
    const widthContainer = carousel.clientWidth;
    const widthItems = widthContainer / settings.slidesToShow;
    carouselItemList.forEach((item) => {
        item.style.width = `${widthItems}px`;
    })

    // set width of carousel-inner
    const quantiItems = carouselItemList.length
    const carouselItemsWidth = widthItems * quantiItems;
    const carouselItems = carousel.querySelector('.carousel-items');
    carouselItems.style.width = `${carouselItemsWidth}px`;
    
    createBtns(settings.arrows, 'right-btn', 'left-btn', 'carousel');
    function createBtns(hasArrows, rightBtnName, leftBtnName, containerToInject) {
        if(!hasArrows) return;
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
        function addEventButtons(rightBtn, leftBtn) {
            const limiteClicks = Math.ceil((quantiItems - settings.slidesToShow) / settings.slidesToScroll);
            let counterClicks = 0;
            const offset = -widthItems * settings.slidesToScroll;
            let currentOffset = 0;
            const lastOffset = (quantiItems - ((limiteClicks * settings.slidesToScroll) + settings.slidesToShow)) * widthItems;
            
            rightBtn.addEventListener('click', () => {
                if (counterClicks === limiteClicks) return;
                currentOffset+=offset;
                const translateX = counterClicks === limiteClicks - 1 ? currentOffset - lastOffset : currentOffset;
                carouselItems.style.transform = `translateX(${translateX}px)`;
                counterClicks++;
            });
            leftBtn.addEventListener('click', () => {
                if (counterClicks === 0) return;
                currentOffset-=offset;
                carouselItems.style.transform = `translateX(${currentOffset}px)`;
                counterClicks--;
            });
        }
    }
}