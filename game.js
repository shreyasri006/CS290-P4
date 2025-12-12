// Game configuration - Made harder
const config = {
    canvasWidth: 1200,
    canvasHeight: 800,
    playerSpeed: 5,
    bulletSpeed: 10,
    zombieSpeed: 2.0, // Increased from 1.5
    zombieSpawnRate: 0.035, // Increased from 0.02
    reloadTime: 2000,
    waveZombieCount: 12, // Increased from 10
    waveIncrease: 7, // Increased from 5
    moneyPerKill: 5
};

// Weapon definitions (10 different guns)
const weapons = {
    pistol: {
        name: 'pistol',
        damage: 1,
        maxAmmo: 12,
        fireRate: 300,
        reloadTime: 1500,
        cost: 0,
        color: '#ffff00',
        bulletSpeed: 8,
        bulletSize: 4
    },
    smg: {
        name: 'smg',
        damage: 0.8,
        maxAmmo: 30,
        fireRate: 100,
        reloadTime: 2000,
        cost: 100,
        color: '#00ff00',
        bulletSpeed: 10,
        bulletSize: 3
    },
    assaultRifle: {
        name: 'assaultRifle',
        damage: 1.5,
        maxAmmo: 30,
        fireRate: 150,
        reloadTime: 2500,
        cost: 200,
        color: '#ff8800',
        bulletSpeed: 12,
        bulletSize: 5
    },
    shotgun: {
        name: 'shotgun',
        damage: 3,
        maxAmmo: 8,
        fireRate: 800,
        reloadTime: 3000,
        cost: 300,
        color: '#ff0000',
        bulletSpeed: 6,
        bulletSize: 6,
        spread: 5
    },
    sniper: {
        name: 'sniper',
        damage: 5,
        maxAmmo: 5,
        fireRate: 1000,
        reloadTime: 3500,
        cost: 500,
        color: '#8800ff',
        bulletSpeed: 20,
        bulletSize: 7
    },
    machineGun: {
        name: 'machineGun',
        damage: 1.2,
        maxAmmo: 100,
        fireRate: 50,
        reloadTime: 4000,
        cost: 600,
        color: '#00ffff',
        bulletSpeed: 11,
        bulletSize: 4
    },
    rocketLauncher: {
        name: 'rocketLauncher',
        damage: 8,
        maxAmmo: 4,
        fireRate: 1500,
        reloadTime: 5000,
        cost: 800,
        color: '#ff0088',
        bulletSpeed: 5,
        bulletSize: 10,
        explosive: true
    },
    laserGun: {
        name: 'laserGun',
        damage: 2,
        maxAmmo: 20,
        fireRate: 200,
        reloadTime: 2000,
        cost: 1000,
        color: '#00ff88',
        bulletSpeed: 15,
        bulletSize: 3
    },
    plasmaRifle: {
        name: 'plasmaRifle',
        damage: 3.5,
        maxAmmo: 25,
        fireRate: 120,
        reloadTime: 2500,
        cost: 1500,
        color: '#88ff00',
        bulletSpeed: 9,
        bulletSize: 6
    },
    railgun: {
        name: 'railgun',
        damage: 10,
        maxAmmo: 3,
        fireRate: 2000,
        reloadTime: 6000,
        cost: 2000,
        color: '#ffffff',
        bulletSpeed: 25,
        bulletSize: 8
    }
};

// Zombie types (15 different types) - Made realistic and green
const zombieTypes = [
    { name: 'walker', speed: 1.4, health: 1, radius: 22, color: '#4a7c59', reward: 5, type: 0 }, // Green zombie
    { name: 'runner', speed: 3.0, health: 1, radius: 20, color: '#5a9c6a', reward: 8, type: 1 }, // Lighter green
    { name: 'tank', speed: 1.0, health: 6, radius: 35, color: '#3a6c49', reward: 15, type: 2 }, // Darker green
    { name: 'spitter', speed: 1.2, health: 2, radius: 24, color: '#6aac7a', reward: 10, type: 3, canShoot: true, shootCooldown: 1800 }, // Green with shooting
    { name: 'exploder', speed: 1.8, health: 1, radius: 18, color: '#7abc8a', reward: 12, type: 4, explosive: true }, // Bright green
    { name: 'crawler', speed: 2.2, health: 1, radius: 15, color: '#4a8c5a', reward: 7, type: 5 }, // Medium green
    { name: 'screamer', speed: 1.2, health: 3, radius: 26, color: '#5a9c6a', reward: 10, type: 6, canSpawn: true }, // Green spawner
    { name: 'bloater', speed: 0.7, health: 10, radius: 40, color: '#2a5c39', reward: 20, type: 7 }, // Very dark green
    { name: 'hunter', speed: 3.5, health: 1, radius: 19, color: '#6aac7a', reward: 15, type: 8 }, // Fast green
    { name: 'boss', speed: 1.5, health: 18, radius: 45, color: '#1a4c29', reward: 50, type: 9, canShoot: true, shootCooldown: 1200 }, // Very dark green boss
    { name: 'molotovThrower', speed: 1.0, health: 2, radius: 23, color: '#5a8c6a', reward: 12, type: 10, canThrowMolotov: true, molotovCooldown: 3000 }, // Throws molotovs
    { name: 'charger', speed: 4.0, health: 2, radius: 21, color: '#6a9c7a', reward: 10, type: 11, canCharge: true, chargeCooldown: 5000 }, // Charges at player
    { name: 'leaper', speed: 2.5, health: 1, radius: 18, color: '#4a9c6a', reward: 9, type: 12, canLeap: true, leapCooldown: 4000 }, // Leaps at player
    { name: 'toxic', speed: 1.3, health: 3, radius: 25, color: '#3a8c59', reward: 15, type: 13, canPoison: true, poisonCooldown: 2500 }, // Leaves poison clouds
    { name: 'armored', speed: 1.1, health: 12, radius: 28, color: '#2a7c49', reward: 25, type: 14, armored: true } // Armored zombie with high health
];

// Game state
let gameState = {
    started: false,
    paused: false,
    gameOver: false,
    shopOpen: false,
    score: 0,
    money: 0,
    wave: 1,
    zombiesKilled: 0,
    zombiesToKill: config.waveZombieCount
};

// Player object
const player = {
    x: config.canvasWidth / 2,
    y: config.canvasHeight / 2,
    radius: 20,
    health: 50, // Reduced health - easier to die
    maxHealth: 50,
    ammo: 12,
    reloading: false,
    color: '#4a9eff',
    currentWeapon: 'pistol',
    lastShot: 0,
    grenades: 0
};

// Game objects
let bullets = [];
let zombieBullets = [];
let zombies = [];
let particles = [];
let explosions = [];
let grenades = [];
let molotovs = []; // Molotovs thrown by zombies
let poisonClouds = []; // Poison clouds left by toxic zombies

// Accessibility settings
let accessibility = {
    colorBlindMode: false,
    highContrast: false,
    audioCues: true
};

// Initialize canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;

// Language toggle handlers
document.getElementById('lang-en').addEventListener('click', () => {
    setLanguage('en');
    document.getElementById('lang-en').classList.add('active');
    document.getElementById('lang-zh').classList.remove('active');
    updateUI(); // Force UI update
    if (gameState.shopOpen) {
        updateShopUI();
    }
});

document.getElementById('lang-zh').addEventListener('click', () => {
    setLanguage('zh');
    document.getElementById('lang-zh').classList.add('active');
    document.getElementById('lang-en').classList.remove('active');
    updateUI(); // Force UI update
    if (gameState.shopOpen) {
        updateShopUI();
    }
});

// Accessibility toggle functions
function toggleColorBlind() {
    accessibility.colorBlindMode = !accessibility.colorBlindMode;
    document.getElementById('colorblind-toggle').classList.toggle('active', accessibility.colorBlindMode);
    document.body.classList.toggle('colorblind-friendly', accessibility.colorBlindMode);
    announceToScreenReader(accessibility.colorBlindMode ? t('colorBlind') + ' ' + t('enabled') : t('colorBlind') + ' ' + t('disabled'));
}

function toggleHighContrast() {
    accessibility.highContrast = !accessibility.highContrast;
    document.getElementById('high-contrast-toggle').classList.toggle('active', accessibility.highContrast);
    document.body.classList.toggle('high-contrast', accessibility.highContrast);
    announceToScreenReader(accessibility.highContrast ? t('highContrast') + ' ' + t('enabled') : t('highContrast') + ' ' + t('disabled'));
}

function toggleAudioCues() {
    accessibility.audioCues = !accessibility.audioCues;
    document.getElementById('audio-cues-toggle').classList.toggle('active', accessibility.audioCues);
    announceToScreenReader(accessibility.audioCues ? t('audioCues') + ' ' + t('enabled') : t('audioCues') + ' ' + t('disabled'));
}

// Accessibility toggle handlers (button clicks)
document.getElementById('colorblind-toggle').addEventListener('click', toggleColorBlind);
document.getElementById('high-contrast-toggle').addEventListener('click', toggleHighContrast);
document.getElementById('audio-cues-toggle').addEventListener('click', toggleAudioCues);

// Shop handlers
document.getElementById('shop-btn').addEventListener('click', () => {
    toggleShop();
});

document.getElementById('close-shop-btn').addEventListener('click', () => {
    toggleShop();
});

// Shop tab handlers
document.querySelectorAll('.shop-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.shop-section').forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`shop-items-${tab.dataset.tab}`).classList.add('active');
    });
});

function toggleShop() {
    gameState.shopOpen = !gameState.shopOpen;
    gameState.paused = gameState.shopOpen;
    document.getElementById('shop-screen').classList.toggle('hidden', !gameState.shopOpen);
    updateShopUI();
}

function togglePause() {
    gameState.paused = !gameState.paused;
    const pauseOverlay = document.getElementById('pause-overlay');
    const pauseTitle = document.getElementById('pause-title');
    const pauseInstructions = document.getElementById('pause-instructions');
    
    if (pauseOverlay) {
        pauseOverlay.classList.toggle('hidden', !gameState.paused);
    }
    
    if (pauseTitle) {
        pauseTitle.textContent = t('paused');
    }
    
    if (pauseInstructions) {
        pauseInstructions.textContent = t('pressPToResume');
    }
}

function updateShopUI() {
    const moneyTextShop = document.getElementById('money-text-shop');
    const moneyLabelShop = document.getElementById('money-label-shop');
    const shopTitle = document.getElementById('shop-title');
    const closeShopBtn = document.getElementById('close-shop-btn');
    
    if (moneyTextShop) moneyTextShop.textContent = '$' + gameState.money;
    if (moneyLabelShop) moneyLabelShop.textContent = t('money');
    if (shopTitle) shopTitle.textContent = t('shop');
    if (closeShopBtn) closeShopBtn.textContent = t('closeShop');
    
    // Update shop tabs
    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === 'guns') {
            tab.textContent = t('guns');
        } else if (tab.dataset.tab === 'supplies') {
            tab.textContent = t('supplies');
        }
    });
    
    // Update guns list
    const gunsList = document.getElementById('guns-list');
    gunsList.innerHTML = '';
    
    Object.values(weapons).forEach(weapon => {
        const owned = player.currentWeapon === weapon.name;
        const canAfford = gameState.money >= weapon.cost || owned;
        const item = document.createElement('div');
        item.className = `shop-item ${owned ? 'owned' : ''} ${!canAfford ? 'disabled' : ''}`;
        item.innerHTML = `
            <h3>${t(weapon.name)} ${owned ? `(${t('currentWeapon')})` : ''}</h3>
            <p>${t('damage')} ${weapon.damage} | ${t('ammo')} ${weapon.maxAmmo} | ${t('fireRate')} ${weapon.fireRate}ms</p>
            <button class="buy-btn" data-weapon="${weapon.name}" ${owned || !canAfford ? 'disabled' : ''}>
                ${owned ? t('owned') : `${t('buy')} $${weapon.cost}`}
            </button>
        `;
        if (!owned && canAfford) {
            item.querySelector('.buy-btn').addEventListener('click', () => buyWeapon(weapon.name));
        }
        gunsList.appendChild(item);
    });
    
    // Update supplies list
    const suppliesList = document.getElementById('supplies-list');
    suppliesList.innerHTML = '';
    
    // Health pack
    const healthItem = document.createElement('div');
    healthItem.className = 'shop-item';
    healthItem.innerHTML = `
        <h3>${t('healthPack')}</h3>
        <p>${currentLanguage === 'zh' ? '恢复50生命值' : 'Restore 50 HP'}</p>
        <button class="buy-btn" data-item="health">${t('buy')} $50</button>
    `;
    healthItem.querySelector('.buy-btn').addEventListener('click', () => buyItem('health'));
    suppliesList.appendChild(healthItem);
    
    // Grenades
    const grenadeItem = document.createElement('div');
    grenadeItem.className = 'shop-item';
    grenadeItem.innerHTML = `
        <h3>${t('grenade')}</h3>
        <p>${currentLanguage === 'zh' ? '范围伤害爆炸' : 'Area damage explosion'}</p>
        <button class="buy-btn" data-item="grenade">${t('buy')} $30</button>
    `;
    grenadeItem.querySelector('.buy-btn').addEventListener('click', () => buyItem('grenade'));
    suppliesList.appendChild(grenadeItem);
}

function buyWeapon(weaponName) {
    const weapon = weapons[weaponName];
    if (gameState.money >= weapon.cost) {
        gameState.money -= weapon.cost;
        player.currentWeapon = weaponName;
        player.ammo = weapon.maxAmmo;
        player.reloading = false;
        updateShopUI();
        updateUI();
        playAudioCue('reload');
    }
}

function buyItem(item) {
    if (item === 'health') {
        if (gameState.money >= 50) {
            gameState.money -= 50;
            player.health = Math.min(player.maxHealth, player.health + 50);
            updateShopUI();
            updateUI();
        }
    } else if (item === 'grenade') {
        if (gameState.money >= 30) {
            gameState.money -= 30;
            player.grenades++;
            updateShopUI();
            updateUI();
        }
    }
}

// Screen reader announcements
function announceToScreenReader(message) {
    const sr = document.getElementById('screen-reader-announcements');
    sr.textContent = message;
    setTimeout(() => {
        sr.textContent = '';
    }, 1000);
}

// Audio cue system
function playAudioCue(type) {
    if (!accessibility.audioCues) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'shoot':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
        case 'hit':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.15;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'reload':
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'wave':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'lowHealth':
            oscillator.frequency.value = 200;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
        case 'explosion':
            oscillator.frequency.value = 100;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
    }
}

// Input handling
const keys = {};
let mouseX = 0;
let mouseY = 0;
let mouseDown = false;

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    if (e.key.toLowerCase() === 'r' && !player.reloading && player.ammo < weapons[player.currentWeapon].maxAmmo && !gameState.shopOpen) {
        reload();
    }
    
    if (e.key.toLowerCase() === 'o' && gameState.started && !gameState.gameOver) {
        toggleShop();
    }
    
    if (e.key.toLowerCase() === 'g' && player.grenades > 0 && !gameState.shopOpen && !gameState.gameOver) {
        throwGrenade();
    }
    
    // Pause/Unpause with P key
    if (e.key.toLowerCase() === 'p' && gameState.started && !gameState.gameOver && !gameState.shopOpen) {
        togglePause();
    }
    
    // Accessibility keyboard shortcuts (work even when paused)
    if (e.key === '8') {
        toggleColorBlind();
    }
    if (e.key === '9') {
        toggleHighContrast();
    }
    if (e.key === '0') {
        toggleAudioCues();
    }
    
    // Secret cheat: \ key gives 10K dollars
    if (e.key === '\\' && gameState.started) {
        gameState.money += 10000;
        updateUI();
        if (gameState.shopOpen) {
            updateShopUI();
        }
        playAudioCue('wave'); // Play sound to indicate cheat activated
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', (e) => {
    if (!gameState.started || gameState.gameOver || gameState.shopOpen) return;
    mouseDown = true;
    shoot();
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
});

canvas.addEventListener('click', (e) => {
    if (!gameState.started) {
        startGame();
        return;
    }
});

// Start screen click handler
document.getElementById('start-screen').addEventListener('click', () => {
    if (!gameState.started) {
        startGame();
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    resetGame();
    startGame();
});

function startGame() {
    gameState.started = true;
    gameState.gameOver = false;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    announceToScreenReader(t('gameTitle') + '. ' + t('clickToStart'));
    gameLoop();
}

function resetGame() {
    gameState = {
        started: false,
        paused: false,
        gameOver: false,
        shopOpen: false,
        score: 0,
        money: 0,
        wave: 1,
        zombiesKilled: 0,
        zombiesToKill: config.waveZombieCount
    };
    
    player.x = config.canvasWidth / 2;
    player.y = config.canvasHeight / 2;
    player.health = player.maxHealth;
    player.currentWeapon = 'pistol';
    player.ammo = weapons[player.currentWeapon].maxAmmo;
    player.reloading = false;
    player.grenades = 0;
    
    bullets = [];
    zombieBullets = [];
    zombies = [];
    particles = [];
    explosions = [];
    grenades = [];
    molotovs = [];
    poisonClouds = [];
    
    updateUI();
}

function shoot() {
    if (gameState.shopOpen || gameState.gameOver) return;
    
    const weapon = weapons[player.currentWeapon];
    const now = Date.now();
    
    if (player.ammo <= 0 || player.reloading || (now - player.lastShot) < weapon.fireRate) return;
    
    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    
    if (weapon.spread) {
        // Shotgun spread
        for (let i = 0; i < 5; i++) {
            const spreadAngle = angle + (Math.random() - 0.5) * weapon.spread * Math.PI / 180;
            bullets.push({
                x: player.x,
                y: player.y,
                vx: Math.cos(spreadAngle) * weapon.bulletSpeed,
                vy: Math.sin(spreadAngle) * weapon.bulletSpeed,
                radius: weapon.bulletSize,
                damage: weapon.damage,
                explosive: weapon.explosive || false,
                color: weapon.color
            });
        }
    } else {
        bullets.push({
            x: player.x,
            y: player.y,
            vx: Math.cos(angle) * weapon.bulletSpeed,
            vy: Math.sin(angle) * weapon.bulletSpeed,
            radius: weapon.bulletSize,
            damage: weapon.damage,
            explosive: weapon.explosive || false,
            color: weapon.color
        });
    }
    
    player.ammo--;
    player.lastShot = now;
    playAudioCue('shoot');
    updateUI();
}

function throwGrenade() {
    if (player.grenades <= 0) return;
    
    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    grenades.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
        radius: 8,
        fuse: 60,
        exploded: false
    });
    
    player.grenades--;
    updateUI();
}

function reload() {
    const weapon = weapons[player.currentWeapon];
    if (player.reloading || player.ammo >= weapon.maxAmmo) return;
    
    player.reloading = true;
    announceToScreenReader(t('reloading'));
    playAudioCue('reload');
    
    setTimeout(() => {
        player.ammo = weapon.maxAmmo;
        player.reloading = false;
        updateUI();
    }, weapon.reloadTime);
}

function spawnZombie() {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(side) {
        case 0: x = Math.random() * config.canvasWidth; y = -30; break;
        case 1: x = config.canvasWidth + 30; y = Math.random() * config.canvasHeight; break;
        case 2: x = Math.random() * config.canvasWidth; y = config.canvasHeight + 30; break;
        case 3: x = -30; y = Math.random() * config.canvasHeight; break;
    }
    
    // Spawn different zombie types based on wave
    let zombieTypeIndex = 0;
    const waveMod = Math.min(gameState.wave, 10);
    
    if (waveMod >= 9 && Math.random() < 0.1) {
        zombieTypeIndex = 9; // Boss
    } else if (waveMod >= 7 && Math.random() < 0.15) {
        zombieTypeIndex = Math.floor(Math.random() * 9) + 1;
    } else if (waveMod >= 5 && Math.random() < 0.3) {
        zombieTypeIndex = Math.floor(Math.random() * 7) + 1;
    } else if (waveMod >= 3 && Math.random() < 0.5) {
        zombieTypeIndex = Math.floor(Math.random() * 5) + 1;
    } else {
        zombieTypeIndex = Math.floor(Math.random() * 3);
    }
    
    const zombieType = zombieTypes[zombieTypeIndex];
    const speedMultiplier = 1 + (gameState.wave - 1) * 0.1;
    
    zombies.push({
        x: x,
        y: y,
        radius: zombieType.radius,
        speed: zombieType.speed * speedMultiplier,
        health: zombieType.health + Math.floor((gameState.wave - 1) / 2),
        maxHealth: zombieType.health + Math.floor((gameState.wave - 1) / 2),
        type: zombieType.type,
        color: zombieType.color,
        reward: zombieType.reward,
        canShoot: zombieType.canShoot || false,
        shootCooldown: zombieType.shootCooldown || 0,
        lastShot: 0,
        explosive: zombieType.explosive || false,
        canSpawn: zombieType.canSpawn || false,
        spawnCooldown: 3000,
        canThrowMolotov: zombieType.canThrowMolotov || false,
        molotovCooldown: zombieType.molotovCooldown || 0,
        lastMolotov: 0,
        canCharge: zombieType.canCharge || false,
        chargeCooldown: zombieType.chargeCooldown || 0,
        lastCharge: 0,
        charging: false,
        chargeSpeed: 0,
        canLeap: zombieType.canLeap || false,
        leapCooldown: zombieType.leapCooldown || 0,
        lastLeap: 0,
        leaping: false,
        leapVx: 0,
        leapVy: 0,
        canPoison: zombieType.canPoison || false,
        poisonCooldown: zombieType.poisonCooldown || 0,
        lastPoison: 0,
        armored: zombieType.armored || false
    });
}

function updatePlayer() {
    if (gameState.paused || gameState.gameOver) return;
    
    if (keys['w'] || keys['arrowup']) player.y -= config.playerSpeed;
    if (keys['s'] || keys['arrowdown']) player.y += config.playerSpeed;
    if (keys['a'] || keys['arrowleft']) player.x -= config.playerSpeed;
    if (keys['d'] || keys['arrowright']) player.x += config.playerSpeed;
    
    // Auto-shoot if mouse is held down
    if (mouseDown) {
        shoot();
    }
    
    // Keep player in bounds
    player.x = Math.max(player.radius, Math.min(config.canvasWidth - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(config.canvasHeight - player.radius, player.y));
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        
        if (bullet.x < 0 || bullet.x > config.canvasWidth || bullet.y < 0 || bullet.y > config.canvasHeight) {
            if (bullet.explosive) {
                createExplosion(bullet.x, bullet.y, 80, 6);
            }
            bullets.splice(i, 1);
            continue;
        }
        
        // Check collision with zombies
        for (let j = zombies.length - 1; j >= 0; j--) {
            const zombie = zombies[j];
            const dx = bullet.x - zombie.x;
            const dy = bullet.y - zombie.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < bullet.radius + zombie.radius) {
                bullets.splice(i, 1);
                // Armored zombies take reduced damage
                const actualDamage = zombie.armored ? bullet.damage * 0.5 : bullet.damage;
                zombie.health -= actualDamage;
                
                // Create hit particles
                for (let k = 0; k < 5; k++) {
                    particles.push({
                        x: zombie.x,
                        y: zombie.y,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        life: 30,
                        color: bullet.color
                    });
                }
                
                if (bullet.explosive) {
                    createExplosion(bullet.x, bullet.y, 80, 6);
                }
                
                if (zombie.health <= 0) {
                    if (zombie.explosive) {
                        createExplosion(zombie.x, zombie.y, 100, 8);
                    }
                    zombies.splice(j, 1);
                    gameState.score += 10;
                    gameState.money += zombie.reward;
                    gameState.zombiesKilled++;
                    playAudioCue('hit');
                    announceToScreenReader(t('zombieKilled'));
                    
                    if (gameState.zombiesKilled >= gameState.zombiesToKill) {
                        nextWave();
                    }
                } else if (zombie.armored) {
                    // Create spark effect for armored zombies
                    for (let k = 0; k < 3; k++) {
                        particles.push({
                            x: zombie.x,
                            y: zombie.y,
                            vx: (Math.random() - 0.5) * 3,
                            vy: (Math.random() - 0.5) * 3,
                            life: 20,
                            color: '#ffff00'
                        });
                    }
                }
                break;
            }
        }
    }
}

function updateZombieBullets() {
    for (let i = zombieBullets.length - 1; i >= 0; i--) {
        const bullet = zombieBullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        
        if (bullet.x < 0 || bullet.x > config.canvasWidth || bullet.y < 0 || bullet.y > config.canvasHeight) {
            zombieBullets.splice(i, 1);
            continue;
        }
        
        const dx = bullet.x - player.x;
        const dy = bullet.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < bullet.radius + player.radius) {
            zombieBullets.splice(i, 1);
            player.health -= 5;
            if (player.health <= 0) {
                player.health = 0;
                endGame();
            }
        }
    }
}

function updateZombies() {
    const now = Date.now();
    
    for (const zombie of zombies) {
        const dx = player.x - zombie.x;
        const dy = player.y - zombie.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normal movement (skip if charging or leaping - handled below)
        if (!zombie.charging && !zombie.leaping) {
            zombie.x += (dx / distance) * zombie.speed;
            zombie.y += (dy / distance) * zombie.speed;
        }
        
        // Shooting zombies
        if (zombie.canShoot && distance < 400 && (now - zombie.lastShot) > zombie.shootCooldown) {
            const angle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
            zombieBullets.push({
                x: zombie.x,
                y: zombie.y,
                vx: Math.cos(angle) * 4,
                vy: Math.sin(angle) * 4,
                radius: 6,
                color: '#ff00ff'
            });
            zombie.lastShot = now;
        }
        
        // Spawning zombies (screamer)
        if (zombie.canSpawn && (now - zombie.spawnCooldown) > 3000) {
            if (zombies.length < 20) {
                spawnZombie();
            }
            zombie.spawnCooldown = now;
        }
        
        // Molotov thrower
        if (zombie.canThrowMolotov && distance < 500 && (now - zombie.lastMolotov) > zombie.molotovCooldown) {
            const angle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
            molotovs.push({
                x: zombie.x,
                y: zombie.y,
                vx: Math.cos(angle) * 5,
                vy: Math.sin(angle) * 5,
                radius: 8,
                life: 60,
                exploded: false
            });
            zombie.lastMolotov = now;
        }
        
        // Charger - charges at player
        if (zombie.canCharge && distance < 300 && (now - zombie.lastCharge) > zombie.chargeCooldown && !zombie.charging) {
            zombie.charging = true;
            zombie.chargeSpeed = zombie.speed * 3;
            zombie.lastCharge = now;
        }
        if (zombie.charging) {
            const chargeSpeed = zombie.chargeSpeed;
            zombie.x += (dx / distance) * chargeSpeed;
            zombie.y += (dy / distance) * chargeSpeed;
            if (distance < 50 || (now - zombie.lastCharge) > 2000) {
                zombie.charging = false;
            }
        }
        
        // Leaper - leaps at player
        if (zombie.canLeap && distance < 200 && (now - zombie.lastLeap) > zombie.leapCooldown && !zombie.leaping) {
            const angle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
            zombie.leaping = true;
            zombie.leapVx = Math.cos(angle) * 12;
            zombie.leapVy = Math.sin(angle) * 12;
            zombie.lastLeap = now;
        }
        if (zombie.leaping) {
            zombie.x += zombie.leapVx;
            zombie.y += zombie.leapVy;
            zombie.leapVx *= 0.95;
            zombie.leapVy *= 0.95;
            if (Math.abs(zombie.leapVx) < 0.5 && Math.abs(zombie.leapVy) < 0.5) {
                zombie.leaping = false;
            }
        }
        
        // Toxic - leaves poison clouds
        if (zombie.canPoison && (now - zombie.lastPoison) > zombie.poisonCooldown) {
            poisonClouds.push({
                x: zombie.x,
                y: zombie.y,
                radius: 40,
                life: 300,
                damage: 0.5
            });
            zombie.lastPoison = now;
        }
        
        // Check collision with player
        if (distance < player.radius + zombie.radius) {
            player.health -= 2.5; // Increased damage from 1.5 to 2.5 - harder
            if (player.health <= 0) {
                player.health = 0;
                endGame();
            } else if (player.health < 15 && Math.random() < 0.15) {
                playAudioCue('lowHealth');
                announceToScreenReader(t('lowHealth'));
            }
        }
    }
    
    // Spawn new zombies - Made harder
    if (zombies.length < gameState.wave * 4 && Math.random() < config.zombieSpawnRate * (1 + gameState.wave * 0.15)) {
        spawnZombie();
    }
}

function updateGrenades() {
    for (let i = grenades.length - 1; i >= 0; i--) {
        const grenade = grenades[i];
        grenade.x += grenade.vx;
        grenade.y += grenade.vy;
        grenade.vx *= 0.98;
        grenade.vy *= 0.98;
        grenade.fuse--;
        
        if (grenade.fuse <= 0 && !grenade.exploded) {
            grenade.exploded = true;
            createExplosion(grenade.x, grenade.y, 120, 10);
            playAudioCue('explosion');
        }
        
        if (grenade.fuse < -10) {
            grenades.splice(i, 1);
        }
    }
}

function updateMolotovs() {
    for (let i = molotovs.length - 1; i >= 0; i--) {
        const molotov = molotovs[i];
        molotov.x += molotov.vx;
        molotov.y += molotov.vy;
        molotov.vy += 0.3; // Gravity
        molotov.life--;
        
        // Check collision with ground or player
        if (molotov.y > config.canvasHeight - 20 || molotov.life <= 0 || !molotov.exploded) {
            const dx = molotov.x - player.x;
            const dy = molotov.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50) {
                // Create fire explosion
                createExplosion(molotov.x, molotov.y, 100, 8);
                playAudioCue('explosion');
                molotov.exploded = true;
            } else if (molotov.y > config.canvasHeight - 20 || molotov.life <= 0) {
                // Create fire explosion on ground
                createExplosion(molotov.x, molotov.y, 100, 8);
                playAudioCue('explosion');
                molotov.exploded = true;
            }
        }
        
        if (molotov.exploded && molotov.life < -30) {
            molotovs.splice(i, 1);
        }
    }
}

function updatePoisonClouds() {
    for (let i = poisonClouds.length - 1; i >= 0; i--) {
        const cloud = poisonClouds[i];
        cloud.life--;
        
        // Damage player if in cloud
        const dx = player.x - cloud.x;
        const dy = player.y - cloud.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < cloud.radius) {
            player.health -= cloud.damage;
            if (player.health <= 0) {
                player.health = 0;
                endGame();
            }
        }
        
        if (cloud.life <= 0) {
            poisonClouds.splice(i, 1);
        }
    }
}

function createExplosion(x, y, radius, damage) {
    explosions.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: radius,
        life: 20,
        damage: damage
    });
    
    // Damage zombies in radius
    for (let i = zombies.length - 1; i >= 0; i--) {
        const zombie = zombies[i];
        const dx = zombie.x - x;
        const dy = zombie.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius) {
            zombie.health -= damage;
            
            if (zombie.health <= 0) {
                zombies.splice(i, 1);
                gameState.score += 10;
                gameState.money += zombie.reward;
                gameState.zombiesKilled++;
                
                if (gameState.zombiesKilled >= gameState.zombiesToKill) {
                    nextWave();
                }
            }
        }
    }
    
    // Damage player if in radius
    const dx = player.x - x;
    const dy = player.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < radius) {
        player.health -= damage * 0.5;
        if (player.health <= 0) {
            player.health = 0;
            endGame();
        }
    }
}

function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.radius += explosion.maxRadius / explosion.life;
        explosion.life--;
        
        if (explosion.life <= 0) {
            explosions.splice(i, 1);
        }
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function nextWave() {
    gameState.wave++;
    gameState.zombiesKilled = 0;
    gameState.zombiesToKill = config.waveZombieCount + (gameState.wave - 1) * config.waveIncrease;
    zombies = [];
    gameState.money += 50; // Bonus money per wave
    playAudioCue('wave');
    announceToScreenReader(t('waveComplete') + '. ' + t('newWave') + ' ' + gameState.wave);
    updateUI();
}

function endGame() {
    gameState.gameOver = true;
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-wave').textContent = gameState.wave;
    document.getElementById('game-over-screen').classList.remove('hidden');
    announceToScreenReader(t('gameOver') + '. ' + t('finalScore') + ' ' + gameState.score);
}

function updateUI() {
    // Update labels from translations first (this ensures labels are translated)
    if (typeof updateUITranslations === 'function') {
        updateUITranslations();
    }
    
    // Update numeric values
    const healthTextEl = document.getElementById('health-text');
    const scoreTextEl = document.getElementById('score-text');
    const ammoTextEl = document.getElementById('ammo-text');
    const waveTextEl = document.getElementById('wave-text');
    const moneyTextEl = document.getElementById('money-text');
    
    if (healthTextEl) healthTextEl.textContent = Math.ceil(player.health);
    if (scoreTextEl) scoreTextEl.textContent = gameState.score;
    if (ammoTextEl) ammoTextEl.textContent = player.ammo;
    if (waveTextEl) waveTextEl.textContent = gameState.wave;
    if (moneyTextEl) moneyTextEl.textContent = '$' + gameState.money;
    
    const healthPercent = (player.health / player.maxHealth) * 100;
    const healthFillEl = document.getElementById('health-fill');
    if (healthFillEl) {
        healthFillEl.style.width = healthPercent + '%';
        
        if (healthPercent > 60) {
            healthFillEl.style.background = 'linear-gradient(90deg, #44ff44, #88ff88)';
        } else if (healthPercent > 30) {
            healthFillEl.style.background = 'linear-gradient(90deg, #ffaa44, #ffcc88)';
        } else {
            healthFillEl.style.background = 'linear-gradient(90deg, #ff4444, #ff8888)';
        }
    }
}

function drawDystopianBackground() {
    // Solid black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
}

function drawPlayer() {
    ctx.save();
    
    // Draw player body (circular)
    const gradient = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.radius);
    gradient.addColorStop(0, '#6bb0ff');
    gradient.addColorStop(1, '#4a9eff');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw player outline
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw 3D realistic gun
    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    const gunLength = 35;
    const gunX = player.x + Math.cos(angle) * (player.radius + 5);
    const gunY = player.y + Math.sin(angle) * (player.radius + 5);
    const gunEndX = gunX + Math.cos(angle) * gunLength;
    const gunEndY = gunY + Math.sin(angle) * gunLength;
    
    // Gun barrel (3D effect with gradient)
    ctx.save();
    ctx.translate(gunX, gunY);
    ctx.rotate(angle);
    
    // Main gun body - dark gray/black with 3D shading
    const gunGradient = ctx.createLinearGradient(0, -4, 0, 4);
    gunGradient.addColorStop(0, '#2a2a2a');
    gunGradient.addColorStop(0.5, '#1a1a1a');
    gunGradient.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = gunGradient;
    ctx.fillRect(0, -4, gunLength, 8);
    
    // Gun barrel highlight (3D effect)
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, -3, gunLength, 2);
    
    // Gun grip/handle
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-8, 2, 12, 6);
    
    // Gun trigger guard
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-5, 4, 4, 0, Math.PI);
    ctx.stroke();
    
    // Muzzle flash effect (if shooting)
    const now = Date.now();
    if (now - player.lastShot < 50) {
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(gunLength, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.arc(gunLength, 0, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
    
    ctx.restore();
}

function drawBullets() {
    for (const bullet of bullets) {
        ctx.save();
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawZombieBullets() {
    for (const bullet of zombieBullets) {
        ctx.save();
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawZombies() {
    for (const zombie of zombies) {
        ctx.save();
        
        if (accessibility.colorBlindMode) {
            ctx.fillStyle = zombie.color;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            
            const shapes = [
                () => { ctx.beginPath(); ctx.arc(zombie.x, zombie.y, zombie.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); },
                () => { ctx.fillRect(zombie.x - zombie.radius, zombie.y - zombie.radius, zombie.radius * 2, zombie.radius * 2); ctx.strokeRect(zombie.x - zombie.radius, zombie.y - zombie.radius, zombie.radius * 2, zombie.radius * 2); },
                () => { ctx.beginPath(); ctx.moveTo(zombie.x, zombie.y - zombie.radius); ctx.lineTo(zombie.x - zombie.radius, zombie.y + zombie.radius); ctx.lineTo(zombie.x + zombie.radius, zombie.y + zombie.radius); ctx.closePath(); ctx.fill(); ctx.stroke(); },
                () => { ctx.beginPath(); ctx.arc(zombie.x, zombie.y, zombie.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.fillRect(zombie.x - 5, zombie.y - 5, 10, 10); },
                () => { ctx.beginPath(); ctx.moveTo(zombie.x, zombie.y - zombie.radius); ctx.lineTo(zombie.x - zombie.radius * 0.7, zombie.y); ctx.lineTo(zombie.x, zombie.y + zombie.radius); ctx.lineTo(zombie.x + zombie.radius * 0.7, zombie.y); ctx.closePath(); ctx.fill(); ctx.stroke(); }
            ];
            
            if (shapes[zombie.type % shapes.length]) {
                shapes[zombie.type % shapes.length]();
            }
        } else {
            // Realistic green zombie with 3D effect
            const zombieGradient = ctx.createRadialGradient(
                zombie.x - zombie.radius * 0.3, 
                zombie.y - zombie.radius * 0.3, 
                0,
                zombie.x, 
                zombie.y, 
                zombie.radius
            );
            zombieGradient.addColorStop(0, zombie.color);
            zombieGradient.addColorStop(0.7, zombie.color);
            zombieGradient.addColorStop(1, '#2a5c39'); // Darker green shadow
            
            // Main body
            ctx.fillStyle = zombieGradient;
            ctx.beginPath();
            ctx.arc(zombie.x, zombie.y, zombie.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add texture/details for realism
            ctx.fillStyle = 'rgba(42, 92, 57, 0.5)'; // Dark green shadow
            ctx.beginPath();
            ctx.arc(zombie.x - zombie.radius * 0.3, zombie.y - zombie.radius * 0.3, zombie.radius * 0.6, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes (glowing red/orange)
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.arc(zombie.x - zombie.radius * 0.4, zombie.y - zombie.radius * 0.3, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(zombie.x + zombie.radius * 0.4, zombie.y - zombie.radius * 0.3, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Eye glow
            ctx.fillStyle = 'rgba(255, 68, 68, 0.5)';
            ctx.beginPath();
            ctx.arc(zombie.x - zombie.radius * 0.4, zombie.y - zombie.radius * 0.3, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(zombie.x + zombie.radius * 0.4, zombie.y - zombie.radius * 0.3, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Mouth (dark opening)
            ctx.fillStyle = '#1a3a29';
            ctx.beginPath();
            ctx.arc(zombie.x, zombie.y + zombie.radius * 0.2, zombie.radius * 0.3, 0, Math.PI);
            ctx.fill();
            
            // Outline for definition
            ctx.strokeStyle = '#1a4c29';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Health bar for damaged zombies
            if (zombie.health < zombie.maxHealth) {
                const barWidth = zombie.radius * 2;
                const barHeight = 4;
                ctx.fillStyle = '#000';
                ctx.fillRect(zombie.x - barWidth / 2, zombie.y - zombie.radius - 12, barWidth, barHeight);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(zombie.x - barWidth / 2, zombie.y - zombie.radius - 12, barWidth * (zombie.health / zombie.maxHealth), barHeight);
            }
            
            // Special indicators
            if (zombie.canShoot) {
                ctx.strokeStyle = '#ff00ff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(zombie.x, zombie.y, zombie.radius + 5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }
}

function drawGrenades() {
    for (const grenade of grenades) {
        ctx.save();
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(grenade.x, grenade.y, grenade.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawMolotovs() {
    for (const molotov of molotovs) {
        if (!molotov.exploded) {
            ctx.save();
            // Draw molotov bottle
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(molotov.x - 4, molotov.y - 8, 8, 12);
            // Draw flame
            ctx.fillStyle = '#ff4400';
            ctx.beginPath();
            ctx.arc(molotov.x, molotov.y - 10, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffaa00';
            ctx.beginPath();
            ctx.arc(molotov.x, molotov.y - 10, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

function drawPoisonClouds() {
    for (const cloud of poisonClouds) {
        ctx.save();
        const alpha = cloud.life / 300;
        ctx.globalAlpha = alpha * 0.6;
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 200, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 150, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawExplosions() {
    for (const explosion of explosions) {
        ctx.save();
        const alpha = explosion.life / 20;
        ctx.globalAlpha = alpha;
        const gradient = ctx.createRadialGradient(explosion.x, explosion.y, 0, explosion.x, explosion.y, explosion.radius);
        gradient.addColorStop(0, 'rgba(255, 200, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawParticles() {
    for (const particle of particles) {
        ctx.save();
        ctx.globalAlpha = particle.life / 30;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function draw() {
    drawDystopianBackground();
    
    if (accessibility.highContrast) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let x = 0; x < config.canvasWidth; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, config.canvasHeight);
            ctx.stroke();
        }
        for (let y = 0; y < config.canvasHeight; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(config.canvasWidth, y);
            ctx.stroke();
        }
    }
    
    drawParticles();
    drawPoisonClouds();
    drawGrenades();
    drawMolotovs();
    drawZombies();
    drawZombieBullets();
    drawBullets();
    drawExplosions();
    drawPlayer();
    
    if (player.reloading) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(t('reloading'), config.canvasWidth / 2, config.canvasHeight / 2);
    }
    
    // Draw current weapon name
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(t(weapons[player.currentWeapon].name), 10, config.canvasHeight - 10);
    
    // Draw grenade count
    if (player.grenades > 0) {
        ctx.fillText(`${t('grenade')}: ${player.grenades}`, 10, config.canvasHeight - 30);
    }
}

function gameLoop() {
    if (!gameState.started || gameState.gameOver) return;
    
    if (!gameState.paused) {
        updatePlayer();
        updateBullets();
        updateZombieBullets();
        updateZombies();
        updateGrenades();
        updateMolotovs();
        updatePoisonClouds();
        updateExplosions();
        updateParticles();
        updateUI();
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize
updateUI();
updateShopUI();
