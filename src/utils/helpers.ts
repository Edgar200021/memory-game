export const getRandomNumber = (min: number, max: number): number => {
  return Math.round(min + Math.random() * (max - min))
}
