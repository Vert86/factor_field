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
        primeCounts: { 2: 3, 3: 2, 5: 1 },
        optimalMoves: 6,
        hint: "You have exactly 6 moves - every click must be perfect!"
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
        primeCounts: { 2: 3, 3: 2, 5: 2 },
        optimalMoves: 7,
        hint: "Only 7 moves allowed - calculate first, click second!"
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
        primeCounts: { 2: 4, 3: 3, 5: 2, 7: 1 },
        optimalMoves: 10,
        hint: "10 moves max - find the ONE perfect sequence!"
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
        primeCounts: { 2: 5, 3: 2, 5: 1 },
        optimalMoves: 8,
        hint: "Prime 5 appears ONCE - use it correctly!"
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
        primeCounts: { 2: 2, 3: 3, 5: 2, 7: 1, 11: 1 },
        optimalMoves: 9,
        hint: "Prime 11 appears ONCE - use it correctly!"
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
        primeCounts: { 2: 4, 3: 3, 5: 2 },
        optimalMoves: 9,
        hint: "Random clicking guarantees failure!"
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
        primeCounts: { 2: 1, 3: 1, 5: 1, 7: 1, 11: 1, 13: 1 },
        optimalMoves: 6,
        hint: "Perfect execution required!"
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
        primeCounts: { 2: 6, 3: 4, 5: 2, 7: 2 },
        optimalMoves: 14,
        hint: "Squares are unforgiving!"
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
        primeCounts: { 2: 5, 3: 3, 5: 2, 7: 1, 11: 1, 13: 1, 17: 1, 19: 1 },
        optimalMoves: 15,
        hint: "25 tiles, zero mistakes allowed!"
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
        primeCounts: { 2: 8, 3: 5, 5: 4, 7: 2, 11: 2, 13: 2, 19: 2 },
        optimalMoves: 25,
        hint: "Ultra-high powers = zero tolerance!"
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
        primeCounts: { 2: 5, 3: 3, 5: 2, 7: 1, 11: 1, 13: 1 },
        optimalMoves: 13,
        hint: "The Gauntlet - pure perfection required!"
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
        primeCounts: { 2: 7, 3: 5, 5: 4 },
        optimalMoves: 16,
        hint: "Pure powers demand perfection!"
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
        primeCounts: { 2: 4, 3: 2, 5: 1, 7: 1, 11: 1, 13: 2, 17: 1, 19: 0 },
        optimalMoves: 12,
        hint: "Prime 19 is a trap - never use it!"
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
        primeCounts: { 2: 4, 3: 2, 5: 1, 7: 1, 11: 1, 13: 1, 17: 1, 19: 0, 23: 0, 29: 1 },
        optimalMoves: 12,
        hint: "Some primes are traps - figure out which!"
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
        primeCounts: { 2: 5, 3: 2, 5: 4, 7: 1, 11: 1, 13: 1, 17: 1, 19: 1, 23: 1 },
        optimalMoves: 17,
        hint: "The ultimate test - absolute perfection!"
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
