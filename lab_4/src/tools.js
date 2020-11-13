import fs from 'fs';

export const parseData = () => {
  const text = fs.readFileSync('./input.txt').toString();
  const arrOfArrs = text
    .split('\n')
    .map((line) =>
      line
        .split(' ')
        .filter((x) => x)
        .map((x) => +x)
    )
    .filter((arr) => arr.length);

  const [[c, d], wArr, ...matrix] = arrOfArrs.reverse();

  return { matrix: matrix.reverse(), wArr, c, d };
};

const formatNumber = (x) => x.toFixed(3);
export const formatMatrix = (matrix, format = true) =>
  matrix.map((line) => line.map((x) => (format ? formatNumber(x) : x)).join(' ')).join('\n');
