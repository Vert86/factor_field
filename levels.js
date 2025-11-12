/**
 * Factor Field - Level Definitions
 * Each level contains a grid of non-prime numbers and available primes to use
 */

const LEVELS = [
    // Level 1 - Tutorial (3x3)
    {
        id: 1,
        size: 3,
        grid: [
            [4, 6, 8],
            [9, 10, 12],
            [15, 18, 20]
        ],
        primes: [2, 3, 5],
        optimalMoves: 9,
        hint: "Start with prime 2 to reduce even numbers"
    },

    // Level 2 - Simple (3x3)
    {
        id: 2,
        size: 3,
        grid: [
            [6, 10, 15],
            [8, 12, 20],
            [9, 18, 25]
        ],
        primes: [2, 3, 5],
        optimalMoves: 10,
        hint: "Look for numbers with multiple factors"
    },

    // Level 3 - Balanced (4x4)
    {
        id: 3,
        size: 4,
        grid: [
            [4, 6, 8, 10],
            [9, 12, 14, 15],
            [16, 18, 20, 21],
            [28, 24, 25, 27]
        ],
        primes: [2, 3, 5, 7],
        optimalMoves: 20,
        hint: "Use prime 7 wisely - it appears in 14, 21, and 28"
    },

    // Level 4 - Powers of 2 (3x3)
    {
        id: 4,
        size: 3,
        grid: [
            [8, 16, 32],
            [4, 12, 20],
            [6, 18, 24]
        ],
        primes: [2, 3, 5],
        optimalMoves: 12,
        hint: "Powers of 2 need multiple applications of prime 2"
    },

    // Level 5 - Mixed Challenge (4x4)
    {
        id: 5,
        size: 4,
        grid: [
            [6, 10, 14, 15],
            [12, 18, 21, 22],
            [20, 25, 27, 28],
            [30, 33, 35, 36]
        ],
        primes: [2, 3, 5, 7, 11],
        optimalMoves: 18,
        hint: "Primes 11 appears rarely - find where it's needed"
    },

    // Level 6 - Large Numbers (3x3)
    {
        id: 6,
        size: 3,
        grid: [
            [36, 48, 54],
            [60, 72, 80],
            [90, 100, 108]
        ],
        primes: [2, 3, 5],
        optimalMoves: 15,
        hint: "Large numbers have many factors - be systematic"
    },

    // Level 7 - Prime Diversity (4x4)
    {
        id: 7,
        size: 4,
        grid: [
            [14, 21, 22, 26],
            [33, 35, 38, 39],
            [46, 51, 55, 57],
            [62, 65, 69, 74]
        ],
        primes: [2, 3, 5, 7, 11, 13],
        optimalMoves: 20,
        hint: "Each large prime may only be needed once"
    },

    // Level 8 - Squares (3x3)
    {
        id: 8,
        size: 3,
        grid: [
            [4, 9, 16],
            [25, 36, 49],
            [64, 81, 100]
        ],
        primes: [2, 3, 5, 7],
        optimalMoves: 16,
        hint: "Perfect squares need their prime factors applied twice"
    },

    // Level 9 - Big Grid (5x5)
    {
        id: 9,
        size: 5,
        grid: [
            [4, 6, 8, 9, 10],
            [12, 14, 15, 16, 18],
            [20, 21, 22, 24, 25],
            [26, 27, 28, 30, 32],
            [33, 34, 35, 36, 38]
        ],
        primes: [2, 3, 5, 7, 11, 13, 17, 19],
        optimalMoves: 28,
        hint: "Stay organized - tackle one prime at a time"
    },

    // Level 10 - Expert (4x4)
    {
        id: 10,
        size: 4,
        grid: [
            [128, 81, 125, 49],
            [64, 27, 32, 121],
            [16, 243, 25, 169],
            [256, 9, 625, 361]
        ],
        primes: [2, 3, 5, 7, 11, 13, 19],
        optimalMoves: 35,
        hint: "High powers require patience and planning"
    },

    // Level 11 - The Gauntlet (5x5)
    {
        id: 11,
        size: 5,
        grid: [
            [12, 18, 24, 30, 36],
            [42, 48, 54, 60, 66],
            [72, 78, 84, 90, 96],
            [102, 108, 114, 120, 126],
            [132, 138, 144, 150, 156]
        ],
        primes: [2, 3, 5, 7, 11, 13],
        optimalMoves: 32,
        hint: "All numbers are highly composite - find the pattern"
    },

    // Level 12 - Prime Power (3x3)
    {
        id: 12,
        size: 3,
        grid: [
            [32, 243, 128],
            [81, 625, 27],
            [16, 125, 64]
        ],
        primes: [2, 3, 5],
        optimalMoves: 22,
        hint: "Pure prime powers - count how many times each prime is needed"
    },

    // Level 13 - Lucky 13 (4x4)
    {
        id: 13,
        size: 4,
        grid: [
            [26, 39, 52, 65],
            [78, 91, 104, 117],
            [130, 143, 156, 169],
            [182, 195, 208, 221]
        ],
        primes: [2, 3, 5, 7, 11, 13, 17, 19],
        optimalMoves: 24,
        hint: "Prime 13 is the key - it appears in many numbers"
    },

    // Level 14 - Fibonacci Factors (3x3)
    {
        id: 14,
        size: 3,
        grid: [
            [8, 21, 34],
            [55, 89, 144],
            [233, 377, 610]
        ],
        primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
        optimalMoves: 18,
        hint: "Fibonacci numbers have unique factorizations"
    },

    // Level 15 - Master (5x5)
    {
        id: 15,
        size: 5,
        grid: [
            [100, 150, 200, 250, 300],
            [350, 400, 450, 500, 550],
            [600, 650, 700, 750, 800],
            [850, 900, 950, 1000, 1050],
            [1100, 1150, 1200, 1250, 1300]
        ],
        primes: [2, 3, 5, 7, 11, 13, 17, 19, 23],
        optimalMoves: 42,
        hint: "Large numbers, many factors - this is the ultimate test"
    }
];

// Helper function to get level by ID
function getLevel(levelId) {
    return LEVELS.find(level => level.id === levelId) || LEVELS[0];
}

// Helper function to get total number of levels
function getTotalLevels() {
    return LEVELS.length;
}

// Helper function to check if there's a next level
function hasNextLevel(currentLevelId) {
    return currentLevelId < LEVELS.length;
}
