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
        primeCounts: { 2: 12, 3: 7, 5: 3 }, // EXACT - zero buffer!
        optimalMoves: 9,
        hint: "Every click must be perfect - no room for error!"
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
        primeCounts: { 2: 10, 3: 7, 5: 5 }, // EXACT - one wrong move = fail
        optimalMoves: 10,
        hint: "Calculate the exact sequence or fail!"
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
        primeCounts: { 2: 22, 3: 12, 5: 5, 7: 3 }, // EXACT amounts only
        optimalMoves: 20,
        hint: "Find the ONE perfect sequence!"
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
        primeCounts: { 2: 23, 3: 5, 5: 1 }, // EXACT - waste prime 5 once = lose
        optimalMoves: 12,
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
        primeCounts: { 2: 14, 3: 13, 5: 7, 7: 4, 11: 2 }, // EXACT - no extras
        optimalMoves: 18,
        hint: "Two uses of 11 - both must be perfect!"
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
        primeCounts: { 2: 21, 3: 14, 5: 5 }, // EXACT needs
        optimalMoves: 15,
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
        primeCounts: { 2: 7, 3: 6, 5: 4, 7: 7, 11: 6, 13: 6 }, // EXACT - no buffer
        optimalMoves: 22,
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
        primeCounts: { 2: 16, 3: 8, 5: 4, 7: 2 }, // EXACT needs
        optimalMoves: 16,
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
        primeCounts: { 2: 34, 3: 16, 5: 7, 7: 4, 11: 2, 13: 1, 17: 1, 19: 1 }, // EXACT
        optimalMoves: 28,
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
        primeCounts: { 2: 30, 3: 14, 5: 9, 7: 2, 11: 2, 13: 2, 19: 2 }, // EXACT
        optimalMoves: 35,
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
        primeCounts: { 2: 48, 3: 32, 5: 8, 7: 4, 11: 4, 13: 3 }, // EXACT
        optimalMoves: 33,
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
        primeCounts: { 2: 22, 3: 12, 5: 7 }, // EXACT
        optimalMoves: 22,
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
        primeCounts: { 2: 15, 3: 6, 5: 3, 7: 2, 11: 1, 13: 17, 17: 1, 19: 0 }, // EXACT (19 not needed!)
        optimalMoves: 24,
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
        primeCounts: { 2: 8, 3: 4, 5: 2, 7: 2, 11: 1, 13: 2, 17: 3, 19: 0, 23: 0, 29: 2 }, // EXACT
        optimalMoves: 15,
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
        primeCounts: { 2: 48, 3: 10, 5: 56, 7: 3, 11: 2, 13: 2, 17: 1, 19: 1, 23: 1 }, // EXACT
        optimalMoves: 42,
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
