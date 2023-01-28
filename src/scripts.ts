// Image amount
let cardAmout = 5;

class ImagesGallery {
    i: number;
    sIndex: number = 1;
    timer: any;

    constructor(i: number) {
        this.i = i;

        // Generate all cards
        for (let i = 1; i <= cardAmout - 2; i++) {
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

        // timed gallery event
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.nextSlide(1), 10000);
    }
}

class AddRoundButtons extends ImagesGallery {
    i: number;

    constructor(i: number) {
        super(cardAmout);
        // Generate all circle buttons
        for (let i = 1; i <= cardAmout - 2; i++) {
            this.circleButton(i);
        }
        // Add circle button events
        for (let i = 1; i <= cardAmout - 2; i++) {
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

class Thumbnails extends ImagesGallery {
    i: number;
    constructor(i: number) {
        super(cardAmout);

        // Generate all thumbnail images
        for (let i = 1; i <= cardAmout; i++) {
            this.makeThumbnails(i);
        }
        // Generate thumbnail events
        for (let i = 1; i <= cardAmout; i++) {
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

class FullScreen extends ImagesGallery {
    i: number;
    constructor(i: number) {
        super(cardAmout);

        // Create fullscreen events
        for (let i = 1; i <= cardAmout; i++) {
            this.fullScreen(i);
        }

        // add pointer over slides
        for (let i = 1; i <= cardAmout; i++) {
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
}

// images and two arrows
const cleanGallery = new ImagesGallery(cardAmout);
// add circle buttons
// const addRbuttons = new AddRoundButtons(cardAmout);

// // add thumbnails
// cleanGallery.makeCard(4);
// cleanGallery.makeCard(5);
// addRbuttons.circleButton(4);
// addRbuttons.circleButton(5);
// addRbuttons.circleButtonEvent(`.circle4`, 4);
// addRbuttons.circleButtonEvent(`.circle5`, 5);

// const addThumbs = new Thumbnails(cardAmout);

// add fullscreen and timer
// const addFullsScreen = new FullScreen(cardAmout);
