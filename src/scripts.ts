// Image amount
let cardAmount = 5;

class ImagesGallery {
    i: number;
    sIndex: number = 1;
    timer: any;

    constructor(i: number) {
        this.i = i;

        // Generate all cards
        for (let i = 1; i <= cardAmount - 2; i++) {
            this.makeCard(i);
        }

        // Add arrow button events
        this.arrowButton('.prev', -1);
        this.arrowButton('.next', 1);

        // State on page load
        this.slidesLogic(1);
    }

    // Generate single card
    makeCard = (i: number) => {
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

    // Arrow button even function
    arrowButton = (className: string, n: number) => {
        const cn = document.querySelector(className);
        cn.addEventListener('click', () => {
            this.nextSlide(n);
        });
    };

    // Button logic

    nextSlide = (n: number) => {
        this.slidesLogic((this.sIndex += n));
    };

    currentSlide = (n: number) => {
        this.slidesLogic((this.sIndex = n));
    };

    slidesLogic(n: number) {
        let i;
        let slides: any = document.getElementsByClassName('slides');
        let circles: any = document.getElementsByClassName('circle');
        if (n > slides.length) {
            this.sIndex = 1;
        }
        if (n < 1) {
            this.sIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (i = 0; i < circles.length; i++) {
            circles[i].className = circles[i].className.replace('active', '');
        }
        slides[this.sIndex - 1].style.display = 'block';
    }
}

class AddRoundButtons extends ImagesGallery {
    i: number;

    constructor(i: number) {
        super(cardAmount);
        // Generate all circle buttons
        for (let i = 1; i <= cardAmount - 2; i++) {
            this.circleButton(i);
        }
        // Add circle button events
        for (let i = 1; i <= cardAmount - 2; i++) {
            this.circleButtonEvent(`.circle${i}`, i);
        }
    }

    // make Circle buttons
    circleButton = (i: number) => {
        let cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="center-dots">
                <span class="circle circle${i}"></span>
            </div>
        `;
        document.getElementsByClassName('center-dots')[0].appendChild(cardDiv);
    };

    // Circle button event function
    circleButtonEvent = (className: string, n: number) => {
        const cn = document.querySelector(className);
        cn.addEventListener('click', () => {
            this.currentSlide(n);
        });
    };
}

class Thumbnails extends AddRoundButtons {
    i: number;
    constructor(i: number) {
        super(cardAmount);

        // add two cards
        for (i = 4; i <= 5; i++) {
            this.makeCard(i);
            this.circleButton(i);
            this.circleButtonEvent(`.circle${i}`, i);
        }

        // Generate all thumbnail images
        for (let i = 1; i <= cardAmount; i++) {
            this.makeThumbnails(i);
        }
        // Generate thumbnail events
        for (let i = 1; i <= cardAmount; i++) {
            this.ThumbnailsImagesEvent(`.thumbnail${i}`, i);
        }
    }
    // make Thumbnails
    makeThumbnails = (i: number) => {
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

    // Thumbnail images event function
    ThumbnailsImagesEvent = (className: string, n: number) => {
        const cn = document.querySelector(className);
        cn.addEventListener('click', () => {
            this.currentSlide(n);
        });
    };
}

class FullScreen extends Thumbnails {
    i: number;
    constructor(i: number) {
        super(cardAmount);

        // Create fullscreen events
        for (let i = 1; i <= cardAmount; i++) {
            this.fullScreen(i);
        }

        // add pointer over slides
        for (let i = 1; i <= cardAmount; i++) {
            document.getElementById(`car${i}`).style.cursor = 'pointer';
        }
    }
    fullScreen = (i: number) => {
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
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    };

    // Extend Parrent class method
    slidesLogic(n: number) {
        super.slidesLogic(n);

        // timed gallery event
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.nextSlide(1), 10000);
    }
}

// ++++++++++++++++++++++++++++++++++++++++++
//                 OBJECTS
// ++++++++++++++++++++++++++++++++++++++++++

// 3 slides with arrows
// const cleanGallery = new ImagesGallery(cardAmount);

// 3 slides with round buttons
// const addRoundButtons = new AddRoundButtons(cardAmount);

// 5 slides with round buttons and thumbnails
// const addThumbs = new Thumbnails(cardAmount);

// everything with fullscreen and timed image change
const addFullsScreen = new FullScreen(cardAmount);
