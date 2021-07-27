function dropdownBTN() {
    const dropdownBTN = document.querySelector('.dropdown-btn');
    dropdownBTN.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('dropdown-btn-open');
    });
}
dropdownBTN();