document.addEventListener('DOMContentLoaded', function () {
    alert("Hello");
    let stickyTop = 0,
        scrollTarget = false;

    let timeline = document.querySelector('.timeline__nav'),
        items = timeline.querySelectorAll('li'),
        milestones = document.querySelectorAll('.timeline__section .milestone'),
        offsetTop = parseInt(getComputedStyle(timeline).top);

    const TIMELINE_VALUES = {
        start: 120,
        step: 30
    };

    window.addEventListener('resize', function () {
        timeline.classList.remove('fixed');
        stickyTop = timeline.getBoundingClientRect().top + window.pageYOffset - offsetTop;
        window.dispatchEvent(new Event('scroll'));
    });
    window.dispatchEvent(new Event('resize'));

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > stickyTop) {
            timeline.classList.add('fixed');
        } else {
            timeline.classList.remove('fixed');
        }
    });
    window.dispatchEvent(new Event('scroll'));

    items.forEach(function (item, index) {
        item.querySelector('span').addEventListener('click', function () {
            let li = this.parentElement,
                milestone = milestones[index];

            if (!li.classList.contains('active') && milestone) {
                scrollTarget = index;

                let scrollTargetTop = milestone.getBoundingClientRect().top + window.pageYOffset - 80;

                window.scrollTo({
                    top: scrollTargetTop,
                    behavior: 'smooth'
                });

                setTimeout(function () {
                    scrollTarget = false;
                }, 400);
            }
        });
    });

    window.addEventListener('scroll', function () {
        let viewLine = window.pageYOffset + window.innerHeight / 3,
            active = -1;

        if (scrollTarget === false) {
            milestones.forEach(function (milestone, index) {
                if (milestone.getBoundingClientRect().top - viewLine > 0) {
                    return false;
                }
                active = index;
            });
        } else {
            active = scrollTarget;
        }

        timeline.style.top = -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + 'px';

        items.forEach(function (item) {
            item.classList.remove('active');
        });

        if (active !== -1) {
            items[active].classList.add('active');
        } else {
            items[0].classList.add('active');
        }
    });
    window.dispatchEvent(new Event('scroll'));

    

    //For READ MORE

    document.querySelectorAll('.read-more').forEach(function (readMoreLink) {
        readMoreLink.addEventListener('click', function (event) {
            event.preventDefault();
            let milestoneText = this.parentNode;
            let shortText = milestoneText.querySelector('.short-text');
            let fullText = milestoneText.querySelector('.full-text');

            // Toggle the visibility of short and full texts
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                this.textContent = 'Read Less';
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                this.textContent = 'Read More';
            }
        });
    });

});


