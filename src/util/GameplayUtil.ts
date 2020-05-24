export interface IGameConfig {
  numberOfColors: number,
  numberOfSlots: number
}

export enum HintValues {
  CorrectAll = "✅",
  CorrectValueOnly = "🔸",
  Wrong = "❌"
}

export type HintSet = Array<HintValues>;
export type GuessSet = Array<number>;

export function CalculateHintsForGuess(solution : GuessSet, userGuess : GuessSet) : HintSet {
  if (solution.length !== userGuess.length) {
    throw new Error("Solution and Guess must have same length");
  }

  // count the number of times each value occurs in the solution
  const occurancesInSolution : { [key: number]: number } = {};
  solution.forEach(solutionValue => {
    if (occurancesInSolution.hasOwnProperty(solutionValue) == false) {
      occurancesInSolution[solutionValue] = 0;
    }
    occurancesInSolution[solutionValue] += 1;
  });

  const newHints : Array<HintValues> = [];
  // find all perfect matches first
  for (let pegIndex = 0; pegIndex < solution.length; pegIndex++) {
    if (userGuess[pegIndex] === solution[pegIndex]) {
      newHints.push(HintValues.CorrectAll);
      occurancesInSolution[userGuess[pegIndex]] -= 1;
    }
  }

  // then find any correct values in incorrect positions
  for (let pegIndex = 0; pegIndex < solution.length; pegIndex++) {
    const valueIsInSolutionButInWrongPlace = userGuess[pegIndex] !== solution[pegIndex] && occurancesInSolution[userGuess[pegIndex]] > 0;
    if (valueIsInSolutionButInWrongPlace) {
      newHints.push(HintValues.CorrectValueOnly);
      occurancesInSolution[userGuess[pegIndex]] -= 1;
    }
  }

  // then fill the rest with incorrect values
  const wrongsToAdd = solution.length - newHints.length;
  for (let slotIndex = 0; slotIndex < wrongsToAdd; slotIndex++) {
    newHints.push(HintValues.Wrong);
  }

  return newHints;
}

export function GenerateRandomSolution(slots : number, colors : number) : GuessSet {
  const newSolution : Array<number> = [];
  for (let slotIndex = 0; slotIndex < slots; slotIndex++) {
    newSolution.push(Math.floor(Math.random() * colors));
  }
  return newSolution;
}
