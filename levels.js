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
        primeCounts: { 2: 13, 3: 8, 5: 4 }, // Exact: 12,7,3 - Only 1 extra each!
        optimalMoves: 9,
        hint: "You have very limited uses - plan every move carefully!"
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
        primeCounts: { 2: 11, 3: 8, 5: 6 }, // Exact: 10,7,5 - Tight limits!
        optimalMoves: 10,
        hint: "Minimal margin for error - find the right sequence!"
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
        primeCounts: { 2: 23, 3: 13, 5: 6, 7: 4 }, // Exact: 22,12,5,3
        optimalMoves: 20,
        hint: "Prime 7 appears only 3 times - use it wisely or fail!"
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
        primeCounts: { 2: 24, 3: 6, 5: 2 }, // Exact: 23,5,1 - Very strict!
        optimalMoves: 12,
        hint: "32=2⁵, 16=2⁴ - you need EXACTLY the right amount of 2s!"
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
        primeCounts: { 2: 15, 3: 14, 5: 8, 7: 5, 11: 3 }, // Exact: 14,13,7,4,2
        optimalMoves: 18,
        hint: "Only 2 uses of prime 11 - don't waste them!"
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
        primeCounts: { 2: 22, 3: 15, 5: 6 }, // Exact: 21,14,5
        optimalMoves: 15,
        hint: "Large numbers but tight limits - one wrong move and you're done!"
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
        primeCounts: { 2: 8, 3: 7, 5: 5, 7: 8, 11: 7, 13: 7 }, // Exact: 7,6,4,7,6,6
        optimalMoves: 22,
        hint: "Every prime counts - one mistake and you fail!"
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
        primeCounts: { 2: 17, 3: 9, 5: 5, 7: 3 }, // Exact: 16,8,4,2
        optimalMoves: 16,
        hint: "Squares = double the prime uses. Plan precisely!"
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
        primeCounts: { 2: 35, 3: 17, 5: 8, 7: 5, 11: 3, 13: 2, 17: 2, 19: 2 }, // Exact: 34,16,7,4,2,1,1,1
        optimalMoves: 28,
        hint: "5x5 grid, minimal buffer - think before every move!"
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
        primeCounts: { 2: 31, 3: 15, 5: 10, 7: 3, 11: 3, 13: 3, 19: 3 }, // Exact: 30,14,9,2,2,2,2
        optimalMoves: 35,
        hint: "128=2⁷, 256=2⁸, 625=5⁴ - extreme precision required!"
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
        primeCounts: { 2: 49, 3: 33, 5: 9, 7: 5, 11: 5, 13: 4 }, // Exact: 48,32,8,4,4,3
        optimalMoves: 33,
        hint: "The Gauntlet - 25 numbers, razor-thin margins!"
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
        primeCounts: { 2: 23, 3: 13, 5: 8 }, // Exact: 22,12,7
        optimalMoves: 22,
        hint: "Pure powers - count EXACTLY or lose!"
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
        primeCounts: { 2: 16, 3: 7, 5: 4, 7: 3, 11: 2, 13: 18, 17: 2, 19: 1 }, // Exact: 15,6,3,2,1,17,1,0 + special
        optimalMoves: 24,
        hint: "Prime 13 appears 17 times - but only 1 buffer total!"
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
        primeCounts: { 2: 9, 3: 5, 5: 3, 7: 3, 11: 2, 13: 3, 17: 4, 19: 1, 23: 1, 29: 3 }, // Exact: 8,4,2,2,1,2,3,0,0,2 + tight
        optimalMoves: 15,
        hint: "Fibonacci = unique primes. ONE wrong selection = failure!"
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
        primeCounts: { 2: 49, 3: 11, 5: 57, 7: 4, 11: 3, 13: 3, 17: 2, 19: 2, 23: 2 }, // Exact: 48,10,56,3,2,2,1,1,1
        optimalMoves: 42,
        hint: "The Ultimate Challenge - master level with zero room for error!"
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
