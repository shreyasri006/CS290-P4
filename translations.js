// Translation system for multilingual support
const translations = {
    en: {
        health: "Health:",
        score: "Score:",
        ammo: "Ammo:",
        wave: "Wave:",
        instructions: "Move: WASD | Shoot: Mouse Click | Reload: R | Shop: O | Grenade: G | Pause: P | Color Blind: 8 | High Contrast: 9 | Audio Cues: 0",
        paused: "PAUSED",
        pressPToResume: "Press P to Resume",
        gameOver: "Game Over",
        finalScore: "Final Score:",
        wavesSurvived: "Waves Survived:",
        restart: "Restart",
        gameTitle: "Zombie Shooter",
        clickToStart: "Click to Start",
        accessibilityTitle: "Accessibility Features",
        accessibilityFeatures: [
            "Color Blind Mode: Different shapes for enemies",
            "High Contrast Mode: Enhanced visibility",
            "Audio Cues: Sound feedback for game events",
            "Screen Reader Support: ARIA labels throughout"
        ],
        colorBlind: "Color Blind",
        highContrast: "High Contrast",
        audioCues: "Audio Cues",
        zombieKilled: "Zombie killed",
        lowHealth: "Low health warning",
        reloading: "Reloading",
        waveComplete: "Wave complete",
        newWave: "New wave starting",
        enabled: "enabled",
        disabled: "disabled",
        money: "Money:",
        shop: "Shop",
        closeShop: "Close Shop (O)",
        guns: "Guns",
        supplies: "Supplies",
        buy: "Buy",
        owned: "Owned",
        currentWeapon: "Current",
        healthPack: "Health Pack",
        grenade: "Grenade",
        damage: "Damage:",
        ammo: "Ammo:",
        fireRate: "Fire Rate:",
        pistol: "Pistol",
        smg: "SMG",
        assaultRifle: "Assault Rifle",
        shotgun: "Shotgun",
        sniper: "Sniper",
        machineGun: "Machine Gun",
        rocketLauncher: "Rocket Launcher",
        laserGun: "Laser Gun",
        plasmaRifle: "Plasma Rifle",
        railgun: "Railgun"
    },
    zh: {
        health: "生命值:",
        score: "得分:",
        ammo: "弹药:",
        wave: "波次:",
        instructions: "移动: WASD | 射击: 鼠标点击 | 装弹: R | 商店: O | 手榴弹: G | 暂停: P | 色盲模式: 8 | 高对比度: 9 | 音频提示: 0",
        paused: "已暂停",
        pressPToResume: "按 P 继续",
        gameOver: "游戏结束",
        finalScore: "最终得分:",
        wavesSurvived: "存活波次:",
        restart: "重新开始",
        gameTitle: "僵尸射击游戏",
        clickToStart: "点击开始",
        accessibilityTitle: "无障碍功能",
        accessibilityFeatures: [
            "色盲模式: 敌人使用不同形状",
            "高对比度模式: 增强可见性",
            "音频提示: 游戏事件声音反馈",
            "屏幕阅读器支持: 全程ARIA标签"
        ],
        colorBlind: "色盲模式",
        highContrast: "高对比度",
        audioCues: "音频提示",
        zombieKilled: "僵尸被击杀",
        lowHealth: "生命值低警告",
        reloading: "正在装弹",
        waveComplete: "波次完成",
        newWave: "新波次开始",
        enabled: "已启用",
        disabled: "已禁用",
        money: "金钱:",
        shop: "商店",
        closeShop: "关闭商店 (O)",
        guns: "武器",
        supplies: "补给",
        buy: "购买",
        owned: "已拥有",
        currentWeapon: "当前",
        healthPack: "医疗包",
        grenade: "手榴弹",
        damage: "伤害:",
        ammo: "弹药:",
        fireRate: "射速:",
        pistol: "手枪",
        smg: "冲锋枪",
        assaultRifle: "突击步枪",
        shotgun: "霰弹枪",
        sniper: "狙击枪",
        machineGun: "机枪",
        rocketLauncher: "火箭筒",
        laserGun: "激光枪",
        plasmaRifle: "等离子步枪",
        railgun: "电磁炮"
    }
};

let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    updateUI();
}

function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

// Rename to avoid conflict with game.js updateUI
function updateUITranslations() {
    // Update all UI elements with translations (check if elements exist first)
    const elements = {
        'health-label': t('health'),
        'score-label': t('score'),
        'ammo-label': t('ammo'),
        'wave-label': t('wave'),
        'instructions-text': t('instructions'),
        'game-over-title': t('gameOver'),
        'final-score-text': t('finalScore'),
        'wave-reached-text': t('wavesSurvived'),
        'restart-btn': t('restart'),
        'game-title': t('gameTitle'),
        'start-instructions': t('clickToStart'),
        'accessibility-title': t('accessibilityTitle'),
        'colorblind-toggle': t('colorBlind'),
        'high-contrast-toggle': t('highContrast'),
        'audio-cues-toggle': t('audioCues'),
        'money-label': t('money'),
        'shop-title': t('shop'),
        'close-shop-btn': t('closeShop'),
        'shop-btn': currentLanguage === 'zh' ? '商店 (O)' : 'Shop (O)' // Update shop button text
    };
    
    // Update pause overlay if it exists
    const pauseTitle = document.getElementById('pause-title');
    const pauseInstructions = document.getElementById('pause-instructions');
    if (pauseTitle) pauseTitle.textContent = t('paused');
    if (pauseInstructions) pauseInstructions.textContent = t('pressPToResume');
    
    Object.keys(elements).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = elements[id];
        }
    });
    
    const list = document.getElementById('accessibility-list');
    if (list) {
        list.innerHTML = '';
        t('accessibilityFeatures').forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            list.appendChild(li);
        });
    }
    
    // Update ARIA labels
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    if (langEn) {
        langEn.setAttribute('aria-label', currentLanguage === 'en' ? 'English (current)' : 'Switch to English');
    }
    if (langZh) {
        langZh.setAttribute('aria-label', currentLanguage === 'zh' ? '中文（当前）' : '切换到中文');
    }
}

// Keep updateUI for backward compatibility
function updateUI() {
    updateUITranslations();
}

