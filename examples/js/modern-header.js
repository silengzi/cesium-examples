/**
 * 现代化 Header 交互效果
 * 提供滚动效果、动画和交互增强
 */

class ModernHeader {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.navbar = document.querySelector('.main-header .navbar');
        this.navItems = document.querySelectorAll('.navbar-nav > li > a');
        this.dropdowns = document.querySelectorAll('.dropdown');
        
        this.init();
    }

    init() {
        this.addScrollEffect();
        this.addHoverEffects();
        this.addClickEffects();
        this.addLoadingStates();
        this.addKeyboardNavigation();
        this.addMobileOptimizations();
    }

    /**
     * 添加滚动效果
     */
    addScrollEffect() {
        let lastScrollTop = 0;
        let ticking = false;

        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 添加滚动时的样式
            if (scrollTop > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // 智能隐藏/显示 header（可选）
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 向下滚动，隐藏 header
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动，显示 header
                this.header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /**
     * 添加悬停效果
     */
    addHoverEffects() {
        this.navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.addRippleEffect(e.target, e);
            });

            item.addEventListener('mouseleave', (e) => {
                this.removeRippleEffect(e.target);
            });
        });

        // 下拉菜单悬停效果
        this.dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                dropdown.addEventListener('mouseenter', () => {
                    this.animateDropdown(menu, 'in');
                });

                dropdown.addEventListener('mouseleave', () => {
                    this.animateDropdown(menu, 'out');
                });
            }
        });
    }

    /**
     * 添加点击效果
     */
    addClickEffects() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 添加点击波纹效果
                this.createRipple(e.target, e);
                
                // 添加加载状态
                this.addLoadingState(e.target);
                
                // 移除其他活跃状态
                this.navItems.forEach(nav => nav.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    /**
     * 添加加载状态
     */
    addLoadingStates() {
        // 为所有链接添加加载状态
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href && !link.href.startsWith('#')) {
                    this.addLoadingState(link);
                }
            });
        });
    }

    /**
     * 添加键盘导航支持
     */
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // 为键盘导航添加焦点样式
                this.addFocusStyles();
            }
        });

        // 为导航项添加键盘支持
        this.navItems.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    }

    /**
     * 移动端优化
     */
    addMobileOptimizations() {
        // 检测移动设备
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            this.optimizeForMobile();
        }

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            const nowMobile = window.innerWidth <= 768;
            if (nowMobile !== isMobile) {
                if (nowMobile) {
                    this.optimizeForMobile();
                } else {
                    this.optimizeForDesktop();
                }
            }
        });
    }

    /**
     * 波纹效果
     */
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * 添加波纹效果
     */
    addRippleEffect(element, event) {
        if (!element.querySelector('.ripple-effect')) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 0;
            `;
            element.appendChild(ripple);
        }

        const rippleEffect = element.querySelector('.ripple-effect');
        rippleEffect.style.opacity = '1';
    }

    /**
     * 移除波纹效果
     */
    removeRippleEffect(element) {
        const rippleEffect = element.querySelector('.ripple-effect');
        if (rippleEffect) {
            rippleEffect.style.opacity = '0';
            setTimeout(() => {
                if (rippleEffect.parentNode) {
                    rippleEffect.remove();
                }
            }, 300);
        }
    }

    /**
     * 下拉菜单动画
     */
    animateDropdown(menu, direction) {
        if (direction === 'in') {
            menu.style.display = 'block';
            menu.style.transform = 'translateY(-10px) scale(0.95)';
            menu.style.opacity = '0';
            
            requestAnimationFrame(() => {
                menu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                menu.style.transform = 'translateY(0) scale(1)';
                menu.style.opacity = '1';
            });
        } else {
            menu.style.transition = 'all 0.2s ease-in';
            menu.style.transform = 'translateY(-10px) scale(0.95)';
            menu.style.opacity = '0';
            
            setTimeout(() => {
                menu.style.display = 'none';
            }, 200);
        }
    }

    /**
     * 添加加载状态
     */
    addLoadingState(element) {
        element.classList.add('loading');
        
        // 模拟加载完成
        setTimeout(() => {
            element.classList.remove('loading');
        }, 1500);
    }

    /**
     * 添加焦点样式
     */
    addFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .navbar-nav > li > a:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 移动端优化
     */
    optimizeForMobile() {
        // 简化动画效果
        this.header.style.transition = 'transform 0.2s ease';
        
        // 调整触摸目标大小
        this.navItems.forEach(item => {
            item.style.minHeight = '44px';
            item.style.minWidth = '44px';
        });
    }

    /**
     * 桌面端优化
     */
    optimizeForDesktop() {
        // 恢复完整动画效果
        this.header.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 恢复原始尺寸
        this.navItems.forEach(item => {
            item.style.minHeight = '';
            item.style.minWidth = '';
        });
    }
}

// 添加必要的 CSS 动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .navbar-nav > li > a {
        position: relative;
        overflow: hidden;
    }
    
    .navbar-nav > li > a.loading {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// 初始化现代化 Header
document.addEventListener('DOMContentLoaded', () => {
    new ModernHeader();
});

// 导出类以供其他脚本使用
window.ModernHeader = ModernHeader;
