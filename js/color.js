function setWhiteLabeling() {
    
    document.querySelector('.main-color').onchange = event => {
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach(btn => btn.style.setProperty('--background-color', event.target.value));
    };
    
    document.querySelector('.sub-color').onchange = event => {
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach(btn => btn.style.setProperty('--hover-bg-color', event.target.value));
    };
    
    document.querySelector('.back-color').onchange = event => {
        const btns = document.querySelectorAll('.body');
        btns.forEach(btn => btn.style.setProperty('--background-color', event.target.value));
    };
}

setWhiteLabeling();