// Generate single card
const makeCard = (i: number) => {
    let cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="slides my-fade">
        <img
            src="./assets/images/img${i}.jpg"
            class="img-fluid"
            id="car${i}"
            alt="Car image ${i}"
        />
    </div>
`;
    document.getElementsByClassName('cars-frame')[0].appendChild(cardDiv);
};

// make Circle buttons
const circleButton = (i: number) => {
    let cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="center-dots">
        <span class="circle circle${i}"></span>
    </div>
`;
    document.getElementsByClassName('center-dots')[0].appendChild(cardDiv);
};

// make Thumbnails
const makeThumbnails = (i: number) => {
    let thumbDiv = document.createElement('row');
    thumbDiv.innerHTML = `
    <div class="column">
        <img
            class="thumbnail${i} demo cursor"
            src="./assets/images/img${i}_s.jpg"
            alt="Car thumbnail ${i}"
        />
    </div>
`;
    document.getElementsByClassName('row')[0].appendChild(thumbDiv);
};

// Generate all cards
let cardAmout = 5;
for (let i = 1; i <= cardAmout; i++) {
    makeCard(i);
}
// Generate all circle buttons
for (let i = 1; i <= cardAmout; i++) {
    circleButton(i);
}

// Generate all circle buttons
for (let i = 1; i <= cardAmout; i++) {
    makeThumbnails(i);
}

// Circle button event function
const circleButtonEvent = (className: string, n: number) => {
    const cn = document.querySelector(className);
    cn.addEventListener('click', () => {
        currentSlide(n);
    });
};

// Thumbnail images event function
const ThumbnailsImagesEvent = (className: string, n: number) => {
    const cn = document.querySelector(className);
    cn.addEventListener('click', () => {
        currentSlide(n);
    });
};

// Arrow button even function
const arrowButton = (className: string, n: number) => {
    const cn = document.querySelector(className);
    cn.addEventListener('click', () => {
        nextSlide(n);
    });
};

// Add arrow button events
arrowButton('.prev', -1);
arrowButton('.next', 1);

// Add circle button events
let circleButtonAmount = 5;
for (let i = 1; i <= circleButtonAmount; i++) {
    circleButtonEvent(`.circle${i}`, i);
}

// Generate thumbnail events
let thumbnailsAmount = 5;
for (let i = 1; i <= circleButtonAmount; i++) {
    circleButtonEvent(`.circle${i}`, i);
    circleButtonEvent(`.thumbnail${i}`, i);
}

// Button logic
let sIndex: number = 1;

const nextSlide = (n: number) => {
    slidesLogic((sIndex += n));
};

const currentSlide = (n: number) => {
    slidesLogic((sIndex = n));
};

var timer: any;
function slidesLogic(n: number) {
    let i;
    let slides: any = document.getElementsByClassName('slides');
    let circles: any = document.getElementsByClassName('circle');
    if (n > slides.length) {
        sIndex = 1;
    }
    if (n < 1) {
        sIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < circles.length; i++) {
        circles[i].className = circles[i].className.replace('active', '');
    }
    slides[sIndex - 1].style.display = 'block';
    circles[sIndex - 1].className += ' active';

    // timed gallery event
    clearTimeout(timer);
    timer = setTimeout(() => nextSlide(1), 10000);
}

// State on page load
slidesLogic(1);

const fullScreen = (i: number) => {
    let modal = document.getElementById('full-screen');
    let img: any = document.getElementById(`car${i}`);
    let modalImg: any = document.getElementById('f-image');
    img.onclick = function () {
        modal.style.display = 'block';
        modalImg.src = this.src;
    };
    let span: any = document.getElementsByClassName('close')[0];
    span.onclick = function () {
        modal.style.display = 'none';
    };
};

// Create fullscreen events
for (let i = 1; i <= cardAmout; i++) {
    fullScreen(i);
}
