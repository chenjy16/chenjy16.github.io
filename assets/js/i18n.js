// 国际化支持
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('language') || 'zh';
        
        // 基本翻译作为回退
        this.fallbackTranslations = {
            // 在 fallbackTranslations 的 zh 对象中添加
            zh: {
                pageTitle: 'chenjy的个人主页',
                nav: { projects: '项目展示', experience: '工作经历' },
                projects: { 
                    title: '项目展示',
                    features: '功能特点',
                    rideflow: { 
                        title: 'RideFlow',
                        description: '一款智能出行应用，提供实时路况、智能导航和行程规划功能。',
                        viewLink: '查看应用',
                        features: [
                            " 实时骑行数据监测",
                            "智能语音播报",
                            "骑行记录与分析",
                            "定时播报",
                            "AI大模型支持"
                        ]
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: '边缘计算工具箱，提供设备AI LLM 下载 部署 运行功能。',
                        viewLink: '查看应用',
                        features: [
                            "本地AI模型部署与执行",
                            "离线大语言模型(LLM)使用",
                            "设备资源监控与优化",
                            "边缘计算任务调度",
                            "多设备协同计算"
                        ]
                    },
                    starGithub: '支持项目',
                    donate: '捐赠支持'
                },
                footer: {
                    copyright: '© 2025 chenjy. 保留所有权利。'
                }
            },
            // 在 fallbackTranslations 的 en 对象中添加
            en: {
                pageTitle: "Jianyu Chen's Personal Website",
                nav: { projects: 'Projects', experience: 'Experience' },
                projects: { 
                    title: 'Projects',
                    features: 'Features',
                    rideflow: { 
                        title: 'RideFlow',
                        description: 'Whether you are commuting daily, enjoying a weekend ride, or training professionally, RideFlow is your perfect cycling companion.',
                        viewLink: 'View App',
                        features: [
                            "Real-time Cycling Data Monitoring",
                            "Smart Voice Announcements",
                            "Ride Recording & Analysis",
                            "Scheduled Announcements",
                            "AI-powered Features "
                        ]
                    },
                    edgebox: {
                        title: 'EdgeBox',
                        description: 'Edge computing toolbox offering AI LLM download, deployment, and execution capabilities.',
                        viewLink: 'View App',
                        features: [
                            "Local AI model deployment and execution",
                            "Offline Large Language Model (LLM) usage",
                            "Device resource monitoring and optimization",
                            "Edge computing task scheduling",
                            "Multi-device collaborative computing"
                        ]
                    },
                    starGithub: 'GitHubSupport Project',
                    donate: 'Buy me a coffee'
                },
                experience: {
                    title: 'Work Experience',
                    jobs: {
                        1: {
                            period: '2022/11 - 2023/09',
                            title: 'Technical Architecture Lead',
                            company: 'Huabao New Energy',
                            description: 'Responsible for the company\'s overall system infrastructure design, promoting the organization of the technical committee and managing daily operations. Led the construction of Huabao\'s digital cloud-native platform, promoting the development of portable energy storage products and mobile home energy storage new categories.'
                        },
                        2: {
                            period: '2020/09 - 2022/08',
                            title: 'Technical Manager',
                            company: 'Castlery',
                            description: 'Responsible for the company\'s entire supply chain system architecture design and global deployment plan, promoting the intelligence of the supply chain system. Formulate R&D processes, continuous integration and continuous deployment solution design.'
                        },
                        3: {
                            period: '2018/11 - 2020/07',
                            title: 'Senior Architect',
                            company: 'Shenzhen Ping An Information Technology Co., Ltd.',
                            description: 'Responsible for the overall architecture design, technology selection and development process formulation of the C-end project of Ping An Smart Pension Platform.'
                        },
                        4: {
                            period: '2014/08 - 2018/06',
                            title: 'Development Team Leader',
                            company: 'Midea E-commerce',
                            description: 'Responsible for the technical development and team management of the e-commerce platform.'
                        },
                        5: {
                            period: '2011/06 - 2014/08',
                            title: 'Senior Development Engineer',
                            company: 'Suning Beijing R&D Center',
                            description: 'Responsible for the development of core functional modules of the flash auction project and project progress management, and the development of Dal components and other infrastructure.'
                        }
                    }
                },
                footer: {
                    copyright: '© 2025 chenjy. All rights reserved.'
                }
            }
        };
        
        // 直接使用内置的基本翻译
        this.translations.zh = this.fallbackTranslations.zh;
        this.translations.en = this.fallbackTranslations.en;
    }

    async init() {
        try {
            // 显示加载状态
            console.log('正在初始化语言...');
            
            // 尝试从服务器加载更完整的翻译
            try {
                const zhResponse = await fetch('assets/js/i18n/zh.json');
                if (zhResponse.ok) {
                    const zhData = await zhResponse.json();
                    this.translations.zh = {...this.translations.zh, ...zhData};
                    console.log('成功加载中文翻译');
                }
            } catch (e) {
                console.warn('使用内置中文翻译', e);
            }
            
            try {
                const enResponse = await fetch('assets/js/i18n/en.json');
                if (enResponse.ok) {
                    const enData = await enResponse.json();
                    this.translations.en = {...this.translations.en, ...enData};
                    console.log('成功加载英文翻译');
                }
            } catch (e) {
                console.warn('使用内置英文翻译', e);
            }
            
            // 初始化页面语言
            this.setLanguage(this.currentLang);
            
            // 设置语言切换按钮事件
            this.setupLanguageSwitcher();
            
            console.log('语言初始化完成');
        } catch (error) {
            console.error('初始化语言失败:', error);
            this.showErrorMessage('无法加载语言文件，请刷新页面重试。详细错误: ' + error.message);
        }
    }
    
    // 将这些方法移到类内部
    setupLanguageSwitcher() {
        const zhBtn = document.getElementById('zh-btn');
        const enBtn = document.getElementById('en-btn');
        
        if (zhBtn && enBtn) {
            zhBtn.addEventListener('click', () => {
                this.setLanguage('zh');
                zhBtn.classList.add('active');
                enBtn.classList.remove('active');
            });
            
            enBtn.addEventListener('click', () => {
                this.setLanguage('en');
                enBtn.classList.add('active');
                zhBtn.classList.remove('active');
            });
            
            // 根据当前语言设置按钮状态
            if (this.currentLang === 'zh') {
                zhBtn.classList.add('active');
                enBtn.classList.remove('active');
            } else {
                enBtn.classList.add('active');
                zhBtn.classList.remove('active');
            }
        } else {
            console.error('语言切换按钮未找到');
        }
    }

    setLanguage(lang) {
        if (lang !== 'zh' && lang !== 'en') {
            console.error('不支持的语言:', lang);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 获取所有带有 data-i18n 属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key, lang);
            
            if (translation) {
                // 对于标题元素，设置其文本内容
                if (el.tagName === 'TITLE') {
                    el.textContent = translation;
                } 
                // 对于输入元素，设置其 placeholder
                else if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', translation);
                } 
                // 对于其他元素，设置其内部 HTML
                else {
                    el.textContent = translation;
                }
            }
        });
        
        console.log(`语言已切换为: ${lang}`);
    }

    getTranslation(key, lang) {
        // 尝试从加载的翻译中获取
        if (this.translations[lang]) {
            const value = this.getNestedTranslation(this.translations[lang], key);
            if (value !== undefined) return value;
        }
        
        // 回退到内置翻译
        if (this.fallbackTranslations[lang]) {
            const value = this.getNestedTranslation(this.fallbackTranslations[lang], key);
            if (value !== undefined) return value;
        }
        
        // 如果找不到翻译，返回键名
        console.warn(`未找到翻译: ${key} (${lang})`);
        return key;
    }

    getNestedTranslation(obj, path) {
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current === undefined || current === null) return undefined;
            
            // 处理数组索引，例如 "projects.rideflow.features.0"
            if (/^\d+$/.test(key) && Array.isArray(current)) {
                current = current[parseInt(key, 10)];
            } else {
                current = current[key];
            }
        }
        
        return current;
    }
    
    // 添加错误消息显示方法
    showErrorMessage(message) {
        console.error(message);
        // 可以在页面上显示错误消息
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        // 3秒后自动移除错误消息
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// 初始化I18n实例
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，初始化I18n');
    window.i18n = new I18n();
    window.i18n.init().catch(err => {
        console.error('I18n初始化失败:', err);
    });
});
