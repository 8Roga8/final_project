/* funcion para el slider de habilidades duras */
function skills() { 
    const skillH = document.querySelector('.slider_skills_h');
    const list = document.querySelectorAll('.slider_skills_h img');
    const images = Array.from(list).map(element => element.getAttribute('src'));
    let count = 0;
    let html = `<img src="${images[count]}" alt="hard skills">`;
    skillH.innerHTML = html;
    const prev = document.querySelector('.btn_prev');
    const next = document.querySelector('.btn_next');
    prev.addEventListener('click', () => {
        clearInterval(interval)
        if (count > 0) {
            count--;
        } else {
            count = images.length-1;
        }
        html = `<img src="${images[count]}" alt="hard skills">`;
        skillH.innerHTML = html;
    });
    next.addEventListener('click', () => {
        clearInterval(interval)
        if (count < images.length-1) {
            count++;
        } else {
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skills">`;
        skillH.innerHTML = html;
    });
    const interval = setInterval(() => {
        if (count < images.length-1) {
            count++;
        } else {
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skills">`;
        skillH.innerHTML = html;
    }, 2000);
}
/*funcion del modo dark */
function mode() {
    const body = document.querySelector('body');
    const btn = document.querySelector('.icon_mode');
    const icon = document.querySelector('.icon_mode ion-icon');
    const iframe = document.querySelector('.header iframe');
    const link = iframe.contentDocument.querySelector('link');
    btn.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (icon.name === "sunny") {
            icon.name = "moon";            
        } else {
            icon.name = "sunny";            
        }
        if (link.getAttribute('href') === "./dark.css") {
            link.href =  "./bright.css"
        } else {
            link.href = "./dark.css"
        }
    });   
}
/* funcion para el sonido */
function sound(){
    const btn = document.querySelector('.icon_volume');
    const icon = document.querySelector('.icon_volume ion-icon');
    const mp3 = document.querySelector('.icon_volume audio');
    btn.addEventListener('click', () => {
        if (icon.name === "volume-mute") {
            icon.name = "volume-high";
        } else {
            icon.name = "volume-mute";                         
        }
        if (mp3.paused) {
            mp3.play();
        } else {
            mp3.pause();            
        }
    });
}
async function getApi() {
    const url = 'https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects';
    try {
        const data = await fetch(url);
        const res = await data.json();
        localStorage.setItem('save', JSON.stringify(res));
        return res;
    } catch (error) {
        console.log(error);
    }
}
function printproyects(projects) {
    const list2 = document.querySelectorAll('.splide__slide');
    const path = location.href.split('/').at(-1).at(0);
    projects.forEach((projects, i) => {
        const {descripcion, image, tecnologias, titulo,
        description, technologies, title} = projects;
            let hmtl = ``;
            if (path === 'e') {
                html = `
                    <div>
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <p>${technologies}</p>
                    </div>
                    <figure>
                        <img src="${image}" alt="slider item">
                    </figure>
            `;                
            } else {
                html = `
                    <div>
                        <h3>${titulo}</h3>
                        <p>${descripcion}</p>
                        <p>${tecnologias}</p>
                    </div>
                    <figure>
                        <img src="${image}" alt="slider item">
                    </figure>
            `;                
            }
        list2[i].innerHTML = html;
    });
}
function slider() {
    const splide = new Splide( '.splide',{
        type   : 'loop',
        autoplay: true,
        interval: 5000,
        breakpoints: {
            850: {
            direction: 'ttb',
            height: '65vh',
            },    
    } 
    });
    splide.mount();
}
function social() {
    const nav = document.querySelector('.header_nav');
    const footer = document.querySelector('.footer');
    footer.classList.toggle('active');
    setTimeout(() => {
        footer.classList.toggle('active');
    }, 2000);
    nav.addEventListener('click', () => {
        setTimeout(() => {
            footer.classList.toggle('active');
        }, 2000);
    });
}

async function main () {
    const saveProjects = JSON.parse(localStorage.getItem('save'));
    console.log(saveProjects);
    const projects = JSON.parse(localStorage.getItem('save')) || await getApi();
    printproyects(projects);
    skills();
    mode();
    sound();
    slider();
    social();
}
main();