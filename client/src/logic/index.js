import scores from "../scores.json";

let alphabet = {};
scores.forEach(score => alphabet[score.letter.toLowerCase()] = score.value);

export const scrabbleScore = word => {
  let total = 0
  for (let i = 0; i < word.length; i++) {
    total += alphabet[word.charAt(i)] || 0;
  }
  return total;
}