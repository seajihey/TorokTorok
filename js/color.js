function setTheme(name) {
    document.querySelector(`.${name}`).onclick = () => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', `var(--${name}-color-10)`);
        root.style.setProperty('--primary-hover-color', `var(--${name}-color)`);
        root.style.setProperty('--primary-border-color', `var(--${name}-color)`);
    };
}

function setWhiteLabeling() {
    document.querySelector('.whiteLabel-revert').onclick = () => {
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach(btn => {
            btn.style.setProperty('--background-color', 'var(--primary-color)');
            btn.style.setProperty('--hover-bg-color', 'var(--primary-hover-color)');
            btn.style.setProperty('--color', 'var(--text-on-dark-color)');
        });
    };

    document.querySelector('.whiteLabel-color').onchange = event => {
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach(btn => btn.style.setProperty('--background-color', event.target.value));
    };
    
    document.querySelector('.whiteLabel-hover').onchange = event => {
        const btns = document.querySelectorAll('.btn-primary');
        btns.forEach(btn => btn.style.setProperty('--hover-bg-color', event.target.value));
    };
    
    document.querySelector('.whiteLabel-text').onchange = event => {
        const btns = document.querySelectorAll('.body');
        btns.forEach(btn => btn.style.setProperty('--color', event.target.value));
    };
}

setTheme('green');
setTheme('red');
setTheme('blue');
setWhiteLabeling();