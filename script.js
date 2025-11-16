// DOM元素
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// 打字机效果
const typingTexts = [
    '前端开发者',
    '音乐爱好者',
    '创意探索者',
    '全栈工程师',
    '数字艺术家'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) return;

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

// 导航栏切换
function toggleNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// 关闭导航菜单
function closeNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// 平滑滚动到锚点
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeNav();
    }
}

// 导航栏滚动效果
function handleScroll() {
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // 更新活动导航链接
    updateActiveNavLink();
}

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// 数字动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };

        // 使用Intersection Observer来触发动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
    });
}

// 技能标签动画
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';

        setTimeout(() => {
            tag.style.transition = 'all 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 项目卡片悬停效果
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 联系链接点击效果
function setupContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link');

    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载动画
function pageLoadAnimation() {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 主题切换功能（可选）
function setupThemeToggle() {
    // 可以在这里添加深色/浅色主题切换功能
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches) {
        document.body.classList.add('dark-theme');
    }
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化后的滚动处理
const optimizedHandleScroll = debounce(handleScroll, 10);

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    // 启动打字机效果
    typeWriter();

    // 页面加载动画
    pageLoadAnimation();

    // 设置事件监听器
    navToggle.addEventListener('click', toggleNav);

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    window.addEventListener('scroll', optimizedHandleScroll);

    // 初始化各种功能
    animateNumbers();
    animateSkillTags();
    setupProjectCards();
    setupContactLinks();
    setupThemeToggle();

    // 初始化导航栏状态
    handleScroll();
});

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeNav();
    }
}, 250));

// 键盘导航支持
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeNav();
    }

    if (e.key === 'Tab') {
        // 确保焦点在可见元素上
        const focusableElements = document.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// 添加页面可见性API支持
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        console.log('Page hidden - pausing animations');
    } else {
        // 页面显示时恢复动画
        console.log('Page visible - resuming animations');
    }
});

// 错误处理
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
});

// 导出函数供其他脚本使用
window.SiteUtils = {
    smoothScroll,
    closeNav,
    debounce
};