
const createShuffledArray = (length: number): number[] => {
  const array = Array.from({ length }, (_, i) => i + 1);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


/**
 * Calculates the probability that all prisoners survive the game.
 * @param numberOfPrisoners The number of prisoners in the game.
 * @param numberOfDrawers The number of drawers in the game.
 * @returns The probability that all prisoners survive the game.
 */
const findSurvivalProbability = (numberOfPrisoners: number, numberOfDrawers: number): number => {
  const numberOfTrials = 1000;
  let numberOfSuccessfulTrials = 0;

  for (let trial = 0; trial < numberOfTrials; trial++) {
    const prisoners = Array.from({ length: numberOfPrisoners }, (_, i) => i + 1);
    const drawers = createShuffledArray(numberOfDrawers);

    const allSurvived = prisoners.every((prisoner) => {
      const openedDrawers = new Set<number>();
      let currentDrawerIndex = prisoner;

      while (!openedDrawers.has(prisoner) && openedDrawers.size < Math.floor(numberOfDrawers / 2)) {
        openedDrawers.add(drawers[currentDrawerIndex - 1]);
        currentDrawerIndex = drawers[currentDrawerIndex - 1];
      }

      return openedDrawers.has(prisoner);
    });

    if (allSurvived) {
      numberOfSuccessfulTrials++;
    }
  }

  return numberOfSuccessfulTrials / numberOfTrials;
};

const survivalProbability = findSurvivalProbability(100, 100);
console.log(`Survival Probability: ${survivalProbability}`);