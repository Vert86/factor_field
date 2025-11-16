/**
 * Factor Field - Core Game Logic
 * A mathematical puzzle game based on prime factorization
 */

class FactorFieldGame {
    constructor() {
        this.currentLevel = 1;
        this.moves = 0;
        this.grid = [];
        this.primes = [];
        this.primeCounts = {};
        this.primeUsesRemaining = {};
        this.size = 0;
        this.optimalMoves = 0;
        this.bestScores = this.loadBestScores();
        this.soundEnabled = true;
        this.levelFailed = false;

        // Power-up system
        this.powerUps = this.loadPowerUps();
        this.activePowerUp = null;
        this.lastMove = null; // For rewind functionality
        this.lastMoveData = null;

        this.init();
    }

    init() {
        this.loadLevel(this.currentLevel);
        this.setupEventListeners();
        this.updateDisplay();
        this.renderPowerUps();
    }

    loadLevel(levelId) {
        const level = getLevel(levelId);

        this.currentLevel = levelId;
        this.size = level.size;
        this.primes = level.primes;
        this.primeCounts = level.primeCounts || {};
        this.optimalMoves = level.optimalMoves;
        this.moves = 0;
        this.levelFailed = false;

        // Initialize remaining uses for each prime
        this.primeUsesRemaining = {};
        this.primes.forEach(prime => {
            this.primeUsesRemaining[prime] = this.primeCounts[prime] || Infinity;
        });

        // Deep copy the grid
        this.grid = level.grid.map(row => [...row]);

        this.renderBoard();
        this.renderPrimeButtons();
        this.updateDisplay();
    }

    renderBoard() {
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.dataset.row = row;
                tile.dataset.col = col;
                tile.textContent = this.grid[row][col];

                if (this.grid[row][col] === 1) {
                    tile.classList.add('complete');
                }

                board.appendChild(tile);
            }
        }
    }

    renderPrimeButtons() {
        const container = document.getElementById('prime-buttons');
        container.innerHTML = '';

        this.primes.forEach(prime => {
            const wrapper = document.createElement('div');
            wrapper.className = 'prime-btn-wrapper';

            const button = document.createElement('button');
            button.className = 'prime-btn';
            button.dataset.prime = prime;

            const moveLimitReached = this.moves >= this.optimalMoves;

            // Show only prime number (NO use count, NO visual feedback on remaining uses)
            button.textContent = prime;

            // Only disable when move limit reached, NOT when prime uses run out
            if (moveLimitReached) {
                button.classList.add('disabled');
                button.disabled = true;
            } else {
                button.addEventListener('click', () => this.selectPrime(prime));
            }

            wrapper.appendChild(button);
            container.appendChild(wrapper);
        });
    }

    selectPrime(prime) {
        // Check if move limit reached
        if (this.moves >= this.optimalMoves) {
            return;
        }

        // CRITICAL: Check if prime has uses remaining - if not, INSTANT FAIL
        if (this.primeUsesRemaining[prime] === 0) {
            // Clicking a used-up prime = immediate loss
            this.moves++;
            this.updateDisplay();
            this.handleLoss();
            return;
        }

        // Save state for rewind power-up
        this.lastMoveData = {
            grid: this.grid.map(row => [...row]),
            primeUsesRemaining: {...this.primeUsesRemaining},
            moves: this.moves
        };

        // Animate button
        const button = document.querySelector(`[data-prime="${prime}"]`);
        button.classList.add('selected');
        setTimeout(() => button.classList.remove('selected'), 600);

        // Decrement uses
        if (this.primeUsesRemaining[prime] !== Infinity) {
            this.primeUsesRemaining[prime]--;
        }

        // Apply division
        this.applyPrimeDivision(prime);
        this.moves++;

        // Re-render prime buttons (but they won't show disabled state)
        setTimeout(() => this.renderPrimeButtons(), 300);

        // Update display
        this.updateDisplay();

        // Check win/loss conditions
        setTimeout(() => {
            this.checkWin();
            if (!this.levelFailed) {
                this.checkLoss();
            }
        }, 600);

        // Play sound
        this.playSound('divide');
    }

    applyPrimeDivision(prime) {
        const tiles = document.querySelectorAll('.tile');

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const value = this.grid[row][col];

                // Check if divisible by prime
                if (value % prime === 0) {
                    this.grid[row][col] = value / prime;

                    // Animate tile
                    const index = row * this.size + col;
                    const tile = tiles[index];

                    tile.classList.add('dividing');

                    setTimeout(() => {
                        tile.textContent = this.grid[row][col];
                        tile.classList.remove('dividing');

                        if (this.grid[row][col] === 1) {
                            tile.classList.add('complete');
                        }
                    }, 250);
                }
            }
        }
    }

    checkWin() {
        // Check if all tiles are 1
        const allOnes = this.grid.every(row => row.every(val => val === 1));

        if (allOnes) {
            this.handleWin();
        }
    }

    checkLoss() {
        // Check if level is still completable
        const allOnes = this.grid.every(row => row.every(val => val === 1));
        if (allOnes) return; // Already won

        // Check if move limit reached
        if (this.moves >= this.optimalMoves) {
            const hasNonOnes = this.grid.some(row => row.some(val => val !== 1));
            if (hasNonOnes) {
                this.handleLoss();
                return;
            }
        }

        // Get all available primes (with uses remaining)
        const availablePrimes = this.primes.filter(p => this.primeUsesRemaining[p] > 0);

        if (availablePrimes.length === 0) {
            // No primes left, check if we can still win
            const hasNonOnes = this.grid.some(row => row.some(val => val !== 1));
            if (hasNonOnes) {
                this.handleLoss();
                return;
            }
        }

        // Check if any remaining tile can be divided by available primes
        let canMakeProgress = false;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const value = this.grid[row][col];
                if (value !== 1) {
                    // Check if this tile can be divided by any available prime
                    for (const prime of availablePrimes) {
                        if (value % prime === 0) {
                            canMakeProgress = true;
                            break;
                        }
                    }
                }
                if (canMakeProgress) break;
            }
            if (canMakeProgress) break;
        }

        if (!canMakeProgress) {
            this.handleLoss();
        }
    }

    handleWin() {
        // Update best score
        const currentBest = this.bestScores[this.currentLevel];
        if (!currentBest || this.moves < currentBest) {
            this.bestScores[this.currentLevel] = this.moves;
            this.saveBestScores();
        }

        // Award power-up for completing level
        const reward = this.getLevelReward(this.currentLevel);
        this.addPowerUp(reward, 1);

        // Show victory animation
        const board = document.getElementById('game-board');
        board.classList.add('victory-celebration');
        setTimeout(() => board.classList.remove('victory-celebration'), 800);

        // Play win sound
        this.playSound('win');

        // Show reward modal first, then win modal
        setTimeout(() => this.showRewardModal(reward), 800);
    }

    showWinModal() {
        const modal = document.getElementById('win-modal');
        const finalMoves = document.getElementById('final-moves');
        const optimalMessage = document.getElementById('optimal-message');

        finalMoves.textContent = this.moves;

        // If they won, they used exactly optimal moves (due to move limit)
        optimalMessage.textContent = '🏆 Perfect! Optimal solution!';
        optimalMessage.style.color = '#FFD700';

        modal.classList.remove('hidden');

        // Hide next level button if no more levels
        const nextBtn = document.getElementById('next-level-btn');
        if (!hasNextLevel(this.currentLevel)) {
            nextBtn.style.display = 'none';
            optimalMessage.textContent = '🎉 Congratulations! You completed all levels!';
        } else {
            nextBtn.style.display = 'inline-block';
        }
    }

    hideWinModal() {
        const modal = document.getElementById('win-modal');
        modal.classList.add('hidden');
    }

    handleLoss() {
        this.levelFailed = true;

        // Show failure animation
        const board = document.getElementById('game-board');
        board.classList.add('failure-shake');
        setTimeout(() => board.classList.remove('failure-shake'), 800);

        // Play failure sound
        this.playSound('fail');

        // Show modal after animation
        setTimeout(() => this.showLossModal(), 800);
    }

    showLossModal() {
        const modal = document.getElementById('loss-modal');
        const movesUsed = document.getElementById('loss-moves');

        movesUsed.textContent = this.moves;

        modal.classList.remove('hidden');
    }

    hideLossModal() {
        const modal = document.getElementById('loss-modal');
        modal.classList.add('hidden');
    }

    nextLevel() {
        if (hasNextLevel(this.currentLevel)) {
            this.currentLevel++;
            this.loadLevel(this.currentLevel);
            this.hideWinModal();
        }
    }

    resetLevel() {
        this.loadLevel(this.currentLevel);
    }

    showHint() {
        const level = getLevel(this.currentLevel);

        // Find a tile that's not 1 and show which prime divides it
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const value = this.grid[row][col];
                if (value !== 1) {
                    // Find a prime that divides this value
                    const divisiblePrime = this.primes.find(p => value % p === 0);

                    if (divisiblePrime) {
                        // Highlight the tile
                        const tiles = document.querySelectorAll('.tile');
                        const index = row * this.size + col;
                        const tile = tiles[index];

                        tile.classList.add('hint');
                        setTimeout(() => tile.classList.remove('hint'), 2000);

                        // Show hint message
                        alert(`Hint: ${level.hint}\n\nTry using prime ${divisiblePrime} - it divides ${value}`);
                        return;
                    }
                }
            }
        }
    }

    updateDisplay() {
        document.getElementById('level-display').textContent = this.currentLevel;
        document.getElementById('moves-display').textContent = `${this.moves} / ${this.optimalMoves}`;

        const bestScore = this.bestScores[this.currentLevel];
        document.getElementById('best-display').textContent = bestScore || '-';
    }

    loadBestScores() {
        const stored = localStorage.getItem('factorFieldBestScores');
        return stored ? JSON.parse(stored) : {};
    }

    saveBestScores() {
        localStorage.setItem('factorFieldBestScores', JSON.stringify(this.bestScores));
    }

    // Power-Up System
    loadPowerUps() {
        const stored = localStorage.getItem('factorFieldPowerUps');
        return stored ? JSON.parse(stored) : {
            primePeek: 0,
            rewind: 0,
            calculator: 0
        };
    }

    savePowerUps() {
        localStorage.setItem('factorFieldPowerUps', JSON.stringify(this.powerUps));
    }

    addPowerUp(type, count = 1) {
        this.powerUps[type] += count;
        this.savePowerUps();
        this.renderPowerUps();
    }

    usePowerUp(type) {
        if (this.powerUps[type] <= 0) return false;

        this.powerUps[type]--;
        this.savePowerUps();
        this.renderPowerUps();
        return true;
    }

    renderPowerUps() {
        const container = document.getElementById('powerups-container');
        container.innerHTML = '';

        const powerUpTypes = [
            {
                id: 'primePeek',
                name: 'Prime Peek',
                icon: '🔮',
                description: 'Reveals count for one prime (10sec)'
            },
            {
                id: 'rewind',
                name: 'Rewind',
                icon: '⏪',
                description: 'Undo your last move'
            },
            {
                id: 'calculator',
                name: 'Calculator',
                icon: '🧮',
                description: 'Shows factorization of one tile'
            }
        ];

        powerUpTypes.forEach(powerUp => {
            const item = document.createElement('div');
            item.className = 'powerup-item';
            if (this.powerUps[powerUp.id] === 0) {
                item.classList.add('powerup-disabled');
            }

            item.innerHTML = `
                <div class="powerup-icon">${powerUp.icon}</div>
                <div class="powerup-name">${powerUp.name}</div>
                ${this.powerUps[powerUp.id] > 0 ? `<div class="powerup-count">${this.powerUps[powerUp.id]}</div>` : ''}
            `;

            if (this.powerUps[powerUp.id] > 0) {
                item.title = powerUp.description;
                item.addEventListener('click', () => this.activatePowerUp(powerUp.id));
            }

            container.appendChild(item);
        });
    }

    activatePowerUp(type) {
        if (this.levelFailed) return;

        switch(type) {
            case 'primePeek':
                if (this.usePowerUp('primePeek')) {
                    this.activatePrimePeek();
                }
                break;
            case 'rewind':
                if (this.usePowerUp('rewind')) {
                    this.activateRewind();
                }
                break;
            case 'calculator':
                if (this.usePowerUp('calculator')) {
                    this.activateCalculator();
                }
                break;
        }
    }

    activatePrimePeek() {
        alert('Click a prime button to reveal its usage count!');
        this.activePowerUp = 'primePeek';

        // Temporarily show counts on prime buttons
        const buttons = document.querySelectorAll('.prime-btn');
        buttons.forEach(btn => {
            const prime = parseInt(btn.dataset.prime);
            const remaining = this.primeUsesRemaining[prime];
            btn.setAttribute('data-original-text', btn.textContent);
            btn.textContent = `${prime} (×${remaining})`;
            btn.classList.add('powerup-active');
        });

        // Remove after 10 seconds
        setTimeout(() => {
            buttons.forEach(btn => {
                const originalText = btn.getAttribute('data-original-text');
                if (originalText) {
                    btn.textContent = originalText;
                    btn.removeAttribute('data-original-text');
                    btn.classList.remove('powerup-active');
                }
            });
            this.activePowerUp = null;
        }, 10000);
    }

    activateRewind() {
        if (!this.lastMoveData) {
            alert('No moves to undo!');
            this.powerUps.rewind++; // Give it back
            this.savePowerUps();
            this.renderPowerUps();
            return;
        }

        // Restore previous state
        this.grid = this.lastMoveData.grid.map(row => [...row]);
        this.primeUsesRemaining = {...this.lastMoveData.primeUsesRemaining};
        this.moves = this.lastMoveData.moves;
        this.lastMoveData = null;

        // Re-render
        this.renderBoard();
        this.renderPrimeButtons();
        this.updateDisplay();

        // Play sound
        this.playSound('divide');
    }

    activateCalculator() {
        alert('Click a tile to see its prime factorization!');
        this.activePowerUp = 'calculator';

        // Add click listener to tiles
        const tiles = document.querySelectorAll('.tile');
        const clickHandler = (e) => {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            const value = this.grid[row][col];

            if (value === 1) {
                alert('This tile is already 1!');
            } else {
                const factorization = this.getPrimeFactorization(value);
                alert(`${value} = ${factorization}`);
            }

            // Remove listeners
            tiles.forEach(t => t.removeEventListener('click', clickHandler));
            this.activePowerUp = null;
        };

        tiles.forEach(tile => tile.addEventListener('click', clickHandler));
    }

    getPrimeFactorization(n) {
        const factors = [];
        for (let prime of this.primes) {
            while (n % prime === 0) {
                factors.push(prime);
                n /= prime;
            }
        }
        return factors.length > 0 ? factors.join(' × ') : n.toString();
    }

    showRewardModal(powerUpType) {
        const powerUpData = {
            primePeek: { icon: '🔮', name: 'Prime Peek', description: 'Reveals the usage count for one prime number of your choice!' },
            rewind: { icon: '⏪', name: 'Rewind', description: 'Undo your last move and try a different approach!' },
            calculator: { icon: '🧮', name: 'Calculator', description: 'Shows the prime factorization of any tile!' }
        };

        const data = powerUpData[powerUpType];
        document.getElementById('reward-icon').textContent = data.icon;
        document.getElementById('reward-text').textContent = data.name;
        document.getElementById('reward-description').textContent = data.description;

        const modal = document.getElementById('reward-modal');
        modal.classList.remove('hidden');

        // Play win sound
        this.playSound('win');
    }

    hideRewardModal() {
        const modal = document.getElementById('reward-modal');
        modal.classList.add('hidden');
    }

    getLevelReward(levelId) {
        // Different levels give different rewards
        const rewards = [
            'primePeek', 'rewind', 'calculator', 'primePeek', 'rewind',
            'calculator', 'primePeek', 'rewind', 'calculator', 'primePeek',
            'rewind', 'calculator', 'primePeek', 'rewind', 'calculator'
        ];
        return rewards[(levelId - 1) % rewards.length];
    }

    playSound(type) {
        if (!this.soundEnabled) return;

        // Create simple audio feedback using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (type === 'divide') {
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } else if (type === 'win') {
                // Victory sound - ascending notes
                const notes = [523.25, 659.25, 783.99]; // C, E, G
                notes.forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();

                    osc.connect(gain);
                    gain.connect(audioContext.destination);

                    osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
                    gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);

                    osc.start(audioContext.currentTime + i * 0.15);
                    osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
                });
            } else if (type === 'fail') {
                // Failure sound - descending notes
                const notes = [400, 300, 200]; // Descending
                notes.forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();

                    osc.connect(gain);
                    gain.connect(audioContext.destination);

                    osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
                    gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2);

                    osc.start(audioContext.currentTime + i * 0.1);
                    osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
                });
            }
        } catch (e) {
            // Audio not supported, fail silently
        }
    }

    setupEventListeners() {
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetLevel();
        });

        // Hint button
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        // Next level button
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        // Replay button
        document.getElementById('replay-btn').addEventListener('click', () => {
            this.resetLevel();
            this.hideWinModal();
        });

        // Loss modal - Retry button
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.resetLevel();
            this.hideLossModal();
        });

        // Reward modal - Claim button
        document.getElementById('claim-reward-btn').addEventListener('click', () => {
            this.hideRewardModal();
            this.showWinModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Number keys for prime selection
            const key = parseInt(e.key);
            if (!isNaN(key) && this.primes.includes(key)) {
                this.selectPrime(key);
            }

            // R for reset
            if (e.key.toLowerCase() === 'r') {
                this.resetLevel();
            }

            // H for hint
            if (e.key.toLowerCase() === 'h') {
                this.showHint();
            }

            // N for next level (when modal is open)
            if (e.key.toLowerCase() === 'n' && !document.getElementById('win-modal').classList.contains('hidden')) {
                this.nextLevel();
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new FactorFieldGame();
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('tile') || e.target.classList.contains('prime-btn')) {
        e.preventDefault();
    }
});

// Tutorial step-through navigation
document.addEventListener('DOMContentLoaded', () => {
    const exampleBoard = document.getElementById('example-board');
    const steps = exampleBoard ? exampleBoard.querySelectorAll('.example-step') : [];
    const stepCounter = document.getElementById('step-counter');
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');

    if (steps.length === 0) return;

    let currentStep = 0;
    const totalSteps = steps.length;

    function updateTutorial() {
        // Hide all steps
        steps.forEach((step, index) => {
            step.style.display = index === currentStep ? 'block' : 'none';
        });

        // Update counter
        if (stepCounter) {
            stepCounter.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
        }

        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentStep === 0;
            prevBtn.style.opacity = currentStep === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = currentStep === totalSteps - 1;
            nextBtn.style.opacity = currentStep === totalSteps - 1 ? '0.5' : '1';
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateTutorial();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                updateTutorial();
            }
        });
    }

    // Initialize
    updateTutorial();
});
