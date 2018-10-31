export default class Dragger {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.container = this.element.querySelector('.dragger-container');
        this.prevButton = this.element.querySelector('.dragger-prev');
        this.nextButton = this.element.querySelector('.dragger-next');
        this.offset = 0;

        this.init();
    }

    init() {
        this.calculateMaxOffset();

        this.element.classList.add('start-pos');

        let lastPos = 0;

        this.container.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                e.preventDefault();

                this.move(e.movementX);
            }
        });

        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.move(e.touches[0].clientX - lastPos);
            lastPos = e.touches[0].clientX;
        });

        this.container.addEventListener('transitionend', () => {
            this.container.style.transition = '';
        });

        this.prevButton.addEventListener('click', () => {
            this.move(100, true);
        });

        this.nextButton.addEventListener('click', () => {
            this.move(-100, true);
        });
    }

    calculateMaxOffset() {
        let elementRect = this.element.getBoundingClientRect();
        let containerRect = this.container.getBoundingClientRect();

        this.maxOffset = containerRect.width - elementRect.width;
    }

    move(offset, transition = false) {
        this.calculateMaxOffset();

        this.offset += offset;

        if (this.offset >= 0) {
            this.offset = 0;
            this.element.classList.add('start-pos');
        } else if (this.offset <= -this.maxOffset) {
            this.offset = -this.maxOffset;
            this.element.classList.add('end-pos');
        } else {
            this.element.classList.remove('start-pos');
            this.element.classList.remove('end-pos');
        }

        if (transition) {
            this.container.style.transition = '0.5s ease-in-out';
        }

        this.container.style.transform = `translateX(${this.offset}px)`;
    }
}
