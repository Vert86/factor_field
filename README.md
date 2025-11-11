# Factor Field - The Prime Grid Puzzle

A minimalist, mathematically elegant puzzle game based on prime factorization and divisibility.

![Game Type](https://img.shields.io/badge/Type-Puzzle%20Game-blue)
![Math](https://img.shields.io/badge/Theme-Mathematics-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## 🎮 Game Concept

Factor Field is a unique puzzle game where you reduce a grid of numbers to 1 by strategically selecting prime numbers. Each prime you select divides all numbers on the grid that are divisible by it, creating a cascading effect that requires careful planning and mathematical thinking.

## ✨ Features

### Core Gameplay
- **Minimalist Design**: Clean black and white interface with smooth animations
- **Mathematical Elegance**: Pure prime factorization mechanics
- **Addictive Loop**: Simple mechanic with complex, satisfying consequences
- **15 Challenging Levels**: Progressive difficulty from tutorial to master levels

### Production-Ready Features
- 🎯 **Optimal Move Tracking**: Compare your performance against optimal solutions
- 💾 **Best Score Persistence**: Automatic save/load using localStorage
- 🔊 **Dynamic Sound Effects**: Web Audio API for satisfying feedback
- ⌨️ **Keyboard Controls**: Full keyboard support for faster gameplay
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 💡 **Hint System**: Get help when you're stuck
- 🏆 **Achievement System**: Track your best scores per level
- ✨ **Smooth Animations**: Polished visual feedback for all actions

## 🎯 How to Play

1. **Objective**: Reduce all tiles on the grid to the number 1

2. **Mechanics**:
   - Select a prime number from the palette below the grid
   - All tiles divisible by that prime are instantly divided by it
   - Continue until all tiles show 1

3. **Strategy**:
   - Plan your move sequence carefully
   - Consider the prime factorization of each number
   - Aim for the optimal number of moves
   - Use larger primes sparingly - they may only be needed once

4. **Controls**:
   - **Mouse/Touch**: Click prime buttons to apply division
   - **Keyboard**: Press number keys (2, 3, 5, 7, etc.) for quick selection
   - **R**: Reset current level
   - **H**: Show hint
   - **N**: Next level (after completing)

## 🧮 Mathematical Foundation

The game is based on the **Fundamental Theorem of Arithmetic**:
> Every integer greater than 1 can be represented uniquely as a product of prime numbers.

### Example Gameplay

Starting Grid:
```
8   10   9
6   4    12
15  6    25
```

**Move 1**: Select Prime **2**
```
4   5    9     (8÷2=4, 10÷2=5, 6÷2=3, 4÷2=2, 12÷2=6, 6÷2=3)
3   2    6
15  3    25
```

**Move 2**: Select Prime **3**
```
4   5    3     (9÷3=3, 3÷3=1, 6÷3=2, 3÷3=1)
1   2    2
5   1    25
```

Continue until all tiles = 1!

## 🏗️ Technical Architecture

### File Structure
```
factor_field/
├── index.html          # Main HTML structure
├── styles.css          # Minimalist styling with animations
├── game.js             # Core game logic and mechanics
├── levels.js           # Level definitions (15 levels)
└── README.md           # Documentation
```

### Technologies Used
- **Pure Vanilla JavaScript**: No dependencies, lightweight and fast
- **CSS3 Animations**: Smooth, hardware-accelerated transitions
- **Web Audio API**: Dynamic sound generation
- **localStorage API**: Persistent score tracking
- **Responsive CSS Grid**: Perfect layout on any screen size

### Key Classes and Methods

#### `FactorFieldGame`
Main game controller class that manages:
- `loadLevel(levelId)`: Initialize a specific level
- `selectPrime(prime)`: Apply prime division to grid
- `applyPrimeDivision(prime)`: Core division mechanic
- `checkWin()`: Detect victory condition
- `handleWin()`: Victory celebration and scoring
- `showHint()`: Provide strategic hints

## 🎨 Design Philosophy

### Minimalism
- Black and white color scheme with gold accents
- Clean typography and generous spacing
- No clutter, only essential UI elements

### Mathematical Elegance
- Pure mathematical mechanics with no arbitrary rules
- Educational value through gameplay
- Satisfying "aha!" moments when patterns emerge

### Addictive Core Loop
1. **Easy to Learn**: Simple click/tap mechanic
2. **Hard to Master**: Complex strategic planning required
3. **Instant Feedback**: Immediate visual and audio response
4. **Clear Goals**: Always know what you're working toward
5. **Achievement**: Perfect solutions provide deep satisfaction

## 📊 Level Progression

| Level | Size | Difficulty | Key Challenge |
|-------|------|------------|---------------|
| 1-3   | 3×3  | Tutorial   | Learn basic mechanics |
| 4-6   | 3×3-4×4 | Easy    | Powers and large numbers |
| 7-9   | 4×4-5×5 | Medium  | Multiple primes, larger grids |
| 10-12 | 4×4-5×5 | Hard    | High powers, complex patterns |
| 13-15 | 4×4-5×5 | Expert  | Ultimate challenge |

## 🚀 Getting Started

### Installation

Simply open `index.html` in a modern web browser. No build process or dependencies required!

```bash
# Clone or download the repository
git clone <repository-url>

# Open in browser
open index.html
# or
python -m http.server 8000  # then visit localhost:8000
```

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- Modern web browser with ES6+ support
- JavaScript enabled
- ~100KB total file size

## 🎓 Educational Value

Factor Field is perfect for:
- **Learning Prime Factorization**: Intuitive understanding of how numbers decompose
- **Mental Math Practice**: Quick divisibility calculations
- **Strategic Thinking**: Planning optimal move sequences
- **Pattern Recognition**: Identifying mathematical relationships

Suitable for ages 10+ and adults who enjoy mathematical puzzles.

## 🔧 Customization

### Adding New Levels

Edit `levels.js` and add to the `LEVELS` array:

```javascript
{
    id: 16,
    size: 4,
    grid: [
        [4, 6, 8, 10],
        [9, 12, 15, 18],
        [20, 22, 24, 26],
        [28, 30, 32, 34]
    ],
    primes: [2, 3, 5, 7, 11, 13, 17],
    optimalMoves: 20,
    hint: "Your strategic hint here"
}
```

### Styling Modifications

All visual styling is in `styles.css`. Key variables to customize:
- Colors: Search for `#FFD700` (gold), `#4CAF50` (green), etc.
- Animations: Modify `@keyframes` blocks
- Grid spacing: Adjust `.game-board { gap: 8px; }`
- Tile size: Change `aspect-ratio` in `.tile`

## 🐛 Known Issues & Future Enhancements

### Future Features
- [ ] Dark/light theme toggle
- [ ] Undo last move
- [ ] Level editor for custom puzzles
- [ ] Daily challenge mode
- [ ] Multiplayer race mode
- [ ] More advanced statistics tracking
- [ ] Sound on/off toggle in UI
- [ ] Accessibility improvements (screen reader support)

## 📜 License

This game is provided as-is for educational and entertainment purposes.

## 🙏 Credits

Game concept based on the mathematical puzzle described in the Factor Field game design document.

Built with ❤️ and prime numbers.

---

**Enjoy playing Factor Field and may all your factorizations be optimal!** 🎯
