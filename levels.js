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
        primeCounts: { 2: 14, 3: 10, 5: 5 }, // Limited uses - plan wisely!
        optimalMoves: 9,
        hint: "Start with prime 2 to reduce even numbers. Watch your remaining uses!"
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
        primeCounts: { 2: 11, 3: 9, 5: 6 },
        optimalMoves: 10,
        hint: "Look for numbers with multiple factors - don't waste moves!"
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
        primeCounts: { 2: 24, 3: 12, 5: 6, 7: 5 },
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
        primeCounts: { 2: 22, 3: 6, 5: 4 },
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
        primeCounts: { 2: 16, 3: 11, 5: 6, 7: 5, 11: 4 },
        optimalMoves: 18,
        hint: "Prime 11 appears rarely - find where it's needed"
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
        primeCounts: { 2: 22, 3: 15, 5: 7 },
        optimalMoves: 15,
        hint: "Large numbers have many factors - be systematic"
    },

    // Level 7 - Prime Diversity (4x4)
    {
        id: 7,
        size: 4,
        grid: [
            [14, 21, 22, 26],
            [33, 35, 77, 39],
            [70, 42, 55, 66],
            [91, 65, 78, 143]
        ],
        primes: [2, 3, 5, 7, 11, 13],
        primeCounts: { 2: 10, 3: 7, 5: 5, 7: 6, 11: 5, 13: 5 },
        optimalMoves: 22,
        hint: "Each large prime may only be needed once - look for combinations"
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
        primeCounts: { 2: 18, 3: 10, 5: 6, 7: 4 },
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
        primeCounts: { 2: 32, 3: 15, 5: 8, 7: 6, 11: 4, 13: 4, 17: 3, 19: 3 },
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
        primeCounts: { 2: 35, 3: 15, 5: 8, 7: 4, 11: 4, 13: 4, 19: 4 },
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
            [110, 108, 130, 120, 126],
            [132, 154, 144, 150, 156]
        ],
        primes: [2, 3, 5, 7, 11, 13],
        primeCounts: { 2: 52, 3: 35, 5: 12, 7: 8, 11: 6, 13: 6 },
        optimalMoves: 33,
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
        primeCounts: { 2: 26, 3: 13, 5: 7 },
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
        primeCounts: { 2: 14, 3: 8, 5: 6, 7: 5, 11: 4, 13: 12, 17: 4, 19: 4 },
        optimalMoves: 24,
        hint: "Prime 13 is the key - it appears in many numbers"
    },

    // Level 14 - Fibonacci Factors (3x3)
    {
        id: 14,
        size: 3,
        grid: [
            [8, 21, 34],
            [55, 87, 144],
            [221, 377, 595]
        ],
        primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
        primeCounts: { 2: 8, 3: 5, 5: 4, 7: 4, 11: 3, 13: 3, 17: 4, 19: 3, 23: 3, 29: 3 },
        optimalMoves: 15,
        hint: "These numbers have unique prime factorizations"
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
        primeCounts: { 2: 72, 3: 28, 5: 52, 7: 8, 11: 6, 13: 6, 17: 4, 19: 4, 23: 4 },
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
