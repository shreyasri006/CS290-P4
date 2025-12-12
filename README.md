# CS290-P4: Zombie Shooter Game

A 2D top-down zombie shooter game built with HTML5 Canvas and JavaScript, featuring multilingual support (English/Chinese) and comprehensive accessibility features.

## Features

### Gameplay
- **15 Different Zombie Types**: Including walkers, runners, tanks, spitters, exploders, crawlers, screamers, bloaters, hunters, bosses, molotov throwers, chargers, leapers, toxic zombies, and armored zombies
- **10 Weapon Classes**: Pistol, SMG, Assault Rifle, Shotgun, Sniper, Machine Gun, Rocket Launcher, Laser Gun, Plasma Rifle, and Railgun
- **Shop System**: Purchase weapons, health packs, and grenades with money earned from kills
- **Wave-Based Progression**: Increasing difficulty with each wave
- **Grenades**: Area damage explosives
- **3D Realistic Gun Rendering**: Detailed weapon graphics
- **Dystopian Theme**: Dark, immersive atmosphere

### Multilingual Support
- **English/Chinese Toggle**: Switch languages with a single click
- **Complete Translation**: All UI elements, instructions, and game text translated
- **Dynamic Language Switching**: Changes apply immediately throughout the game

### Accessibility Features
- **Color Blind Mode** (Key: 8): Different shapes for enemies instead of color-only identification
- **High Contrast Mode** (Key: 9): Enhanced visibility with increased contrast
- **Audio Cues** (Key: 0): Sound feedback for game events (shooting, hits, reloading, low health, etc.)
- **Screen Reader Support**: ARIA labels and live announcements throughout

### Controls
- **Movement**: WASD or Arrow Keys
- **Shoot**: Mouse Click (hold for auto-fire)
- **Reload**: R
- **Shop**: O
- **Grenade**: G
- **Pause**: P
- **Color Blind Mode**: 8
- **High Contrast**: 9
- **Audio Cues**: 0
- **Secret Cheat**: \ (gives $10,000)

## How to Play

1. Open `index.html` in a web browser
2. Click "Click to Start" or click anywhere on the start screen
3. Use WASD to move, mouse to aim and shoot
4. Survive waves of zombies and earn money
5. Press O to open the shop and purchase upgrades
6. Press P to pause and demonstrate accessibility features

## Technical Details

- **Pure JavaScript**: No frameworks or dependencies
- **HTML5 Canvas**: For game rendering
- **Web Audio API**: For audio cues
- **Responsive Design**: Works on different screen sizes

## Files

- `index.html` - Main HTML structure
- `game.js` - Core game logic and mechanics
- `style.css` - Styling and UI
- `translations.js` - Multilingual translation system

## Accessibility Compliance

This game follows accessibility best practices:
- WCAG 2.1 AA compliant color contrast options
- Screen reader compatible with ARIA labels
- Keyboard navigation support
- Visual alternatives for color-dependent information
- Audio feedback for important game events

