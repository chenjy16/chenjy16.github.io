document.addEventListener('DOMContentLoaded', () => {
    // 使用已经初始化的 i18n 实例，而不是创建新实例
    // const i18n = new I18n();
    // i18n.init();
    
    // 平滑滚动效果
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时显示/隐藏返回顶部按钮
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.display = 'none';
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };
    
    createBackToTopButton();
    
    // 添加动画效果
    const addAnimations = () => {
        const elements = document.querySelectorAll('.project-detail, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    };
    
    // 页面加载完成后添加动画
    setTimeout(addAnimations, 500);
    
    // 初始化 Buy Me a Coffee 按钮
    const initBuyMeCoffeeButtons = () => {
        // 如果原生的 BMC 按钮已加载，则使用它们的样式
        if (typeof(window.BmcButton) !== 'undefined') {
            document.querySelectorAll('.bmc-btn').forEach(btn => {
                new window.BmcButton().init({
                    element: btn,
                    name: btn.getAttribute('data-name'),
                    slug: btn.getAttribute('data-slug'),
                    color: btn.getAttribute('data-color'),
                    emoji: btn.getAttribute('data-emoji'),
                    font: btn.getAttribute('data-font'),
                    text: btn.getAttribute('data-text'),
                    outline_color: btn.getAttribute('data-outline-color'),
                    font_color: btn.getAttribute('data-font-color'),
                    coffee_color: btn.getAttribute('data-coffee-color')
                });
            });
        }
    };
    
    // 页面加载完成后初始化 Buy Me a Coffee 按钮
    setTimeout(initBuyMeCoffeeButtons, 1000);
});


// 添加滚动动画
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .tech-item');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// 初始化时检查一次
document.addEventListener('DOMContentLoaded', () => {
    // 初始化国际化
    initializeI18n();
    
    // 初始化动画
    handleScrollAnimations();
    
    // 滚动时检查
    window.addEventListener('scroll', handleScrollAnimations);
    
    // 语言切换按钮事件监听
    document.getElementById('zh-btn').addEventListener('click', () => {
        changeLanguage('zh');
    });
    
    document.getElementById('en-btn').addEventListener('click', () => {
        changeLanguage('en');
    });
    
    // 其他初始化代码...
});