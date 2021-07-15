function dropdownBTN() {
    const dropdownBTN = document.querySelector('.dropdown-btn');
    dropdownBTN.addEventListener('click', openDropdownBTN);
    dropdownBTN.addEventListener('focus', openDropdownBTN);
    function openDropdownBTN(event) {
        const eventType = event.type;
        if (eventType === 'click') {
            event.currentTarget.classList.toggle('dropdown-btn-open');
        }
    }
}
dropdownBTN();