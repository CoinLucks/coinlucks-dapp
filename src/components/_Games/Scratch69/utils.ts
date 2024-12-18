import { ScratchPrize } from "@/types/bet";

export const calculateMultiplier = (prize: ScratchPrize) => {
  return prizeMultiplier(prize)
};

export const prizeMultiplier = (prize: ScratchPrize) => {
  switch (prize) {

    case ScratchPrize.Grand:
      return 10000;
    case ScratchPrize.First:
      return 100;
    case ScratchPrize.Second:
      return 50;
    case ScratchPrize.Third:
      return 20;
    case ScratchPrize.Fourth:
      return 5;
    case ScratchPrize.Fifth:
      return 2;
    case ScratchPrize.Sixth:
      return 1;
    default:
      return 0;
  }
};

export const calculatePrize = (numbers: number[]): ScratchPrize => {
  // Validate input
  validateNumbers(numbers);

  // 1. Check for 69s - Grand, First, and Second prizes
  const count69 = numbers.filter(num => num === 69).length;
  if (count69 > 0) {
    if (count69 === 3) return ScratchPrize.Grand;     // Grand Prize: Three 69s
    if (count69 === 2) return ScratchPrize.First;     // First Prize: Two 69s
    if (hasTowSame(numbers)) return ScratchPrize.Second;  // Second Prize: One 69 and a matching pair
  }

  // 2. Check numbers starting with 6 - Third and Fourth prizes
  const countStartWith6 = numbers.filter(num => num >= 60 && num < 69 || num == 6).length;
  if (countStartWith6 >= 2) {
    return countStartWith6 === 3 ? ScratchPrize.Third : ScratchPrize.Fifth;
  }

  // 3. Check numbers ending with 9 - Fifth and Sixth prizes
  const endWith9 = numbers.filter(num => num % 10 === 9).length;
  if (endWith9 == 2) return ScratchPrize.Fourth; // Fourth Prize: Two numbers start with 6
  if (endWith9 == 1) return ScratchPrize.Sixth; // Sixth Prize: One number ends with 9

  // No prize awarded
  return ScratchPrize.None;
};


/**
  * Validates the input numbers array
  * @param numbers Array of numbers to validate
  * @throws Error if validation fails
  */
function validateNumbers(numbers: number[]): void {
  // Check array length
  if (numbers.length !== 3) {
    throw new Error('Invalid numbers length: Must provide exactly 3 numbers');
  }

  // Check number range
  for (const num of numbers) {
    if (num < 1 || num > 69) {
      throw new Error(`Number out of range: ${num}. Must be between 1 and 69`);
    }
  }
}

function hasTowSame(numbers: number[]): boolean {
  let otherNumber;
  let count = 0;

  for (const num of numbers) {
    if (num != 69) {
      if (count == 0) {
        otherNumber = num;
        count = 1;
      } else if (num == otherNumber) {
        count++;
      }
    }

  }

  return count == 2;
}