document.addEventListener('DOMContentLoaded', () => {

    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    const mentorsData = {
        ada: {
            name: 'Ада Лавлейс',
            subtitle: 'Первый программист в истории',
            text: `
                <p>Потрясающая женщина, первый в мире программист! Напоминание, что всё в этой жизни подвластно.</p>
                <p>Она написала первую в мире программу для аналитической машины Чарльза Бэббиджа — задолго до появления компьютеров.</p>
                <p>Её ум, настойчивость и страсть к математике вдохновляют меня не бояться сложного и идти своим путём.</p>
            `,
            quote: '«Ты не можешь не знать то, что уже понял»'
        },
        scarlett: {
            name: 'Скарлетт О\'Хара',
            subtitle: 'Книжная героиня. Гордость и дерзость',
            text: `
                <p>Моя любимица среди книжных героинь. Ну не люблю я правильных и кротких.</p>
                <p>Девчонка, страшно избалованная, не желающая и палец об палец ударить, в итоге, невзирая на возмущение народа, купила лесопилку при живом, но глупом муже и сама стала ею управлять!</p>
                <p>Я так восхищаюсь ею, знаю теперь, что мнение общества — не преграда. Хотя всё не так чисто, всем настоятельно рекомендую прочитать «Унесённые ветром».</p>
            `,
            quote: '«Я подумаю об этом завтра»'
        },
        rosa: {
            name: 'Роза Люксембург',
            subtitle: 'Борец за права и интеллектуалка',
            text: `
                <p>Всякий раз, когда слышу о ней, то улыбаюсь. Мало того, что они с Кларой Цеткин боролись за женские права, так она ещё была безумно умна!</p>
                <p>Роза была политиком, философом и революционеркой. Она никогда не боялась говорить то, что думает, и отстаивать свои идеалы до конца.</p>
                <p>Её смелость и интеллект — пример того, как одна женщина может менять мир.</p>
            `,
            quote: '«Свобода — это всегда свобода инакомыслящего»'
        }
    };

    function openMentor(mentorKey) {
        const data = mentorsData[mentorKey];
        if (!data) return;

        modalBody.innerHTML = `
            <h2>${data.name}</h2>
            <p class="modal__subtitle">${data.subtitle}</p>
            ${data.text}
            <p class="modal__quote">${data.quote}</p>
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.mentor-card').forEach(card => {
        card.addEventListener('click', () => {
            const mentor = card.dataset.mentor;
            openMentor(mentor);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    function animateProgress() {
        const section = document.getElementById('progress');
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;


        if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {

            let current = 0;
            const target = 67;
            const duration = 2000; // 2 секунды
            const stepTime = 16;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                progressBar.style.width = current + '%';
                progressPercent.textContent = Math.round(current) + '%';
            }, stepTime);
        }
    }


    let progressAnimated = false;

    window.addEventListener('scroll', () => {
        if (!progressAnimated) {
            const section = document.getElementById('progress');
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
                progressAnimated = true;
                animateProgress();
            }
        }
    });


    setTimeout(() => {
        const section = document.getElementById('progress');
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
            progressAnimated = true;
            animateProgress();
        }
    }, 500);


    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });


    console.log('%cАлия · Портфолио', 'font-size: 24px; font-weight: 700; color: #7A1F2D;');
    console.log('%c«Я всю жизнь хотела вносить в массы что-то своё»', 'font-size: 16px; color: #C9A96E; font-style: italic;');

    console.log('%cСделано with love и характером', 'font-size: 14px; color: #3A3A3A;');
});