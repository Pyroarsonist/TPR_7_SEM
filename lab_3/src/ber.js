import { parseMatrix } from './tools';
import _ from 'lodash';

const matrix = parseMatrix();

const deltas = [];

for (let i = 0; i < matrix.length; i++) {
  deltas[i] = [];
  for (let j = 0; j < matrix.length; j++) {
    deltas[i].push(
      [...matrix[i]].map((value, index) => {
        return value - matrix[j][index];
      })
    );
  }
}

// console.info(deltas.map(list => list.map(x => (`(${x.join(',')})`)).join(' ')).join('\n'))

const sigmas = deltas.map((dArr) => dArr.map((list) => list.map((x) => Math.sign(x))));

// console.info(sigmas.map((list) => list.map((x) => `(${x.join(',')})`).join(' ')).join('\n'));
// console.log();

const relations = [
  [1, 4, 8, 9],
  [3, 11],
  [2, 5, 6, 7, 10, 12],
].map((arr) => arr.map((x) => x - 1));
// const relations = [[3, 4], [1], [2]].map((arr) => arr.map((x) => x - 1));

const pArr = [];
const iArr = [];
const nArr = [];
for (let relationIndex = 0; relationIndex < relations.length; relationIndex++) {
  pArr[relationIndex] = [];
  iArr[relationIndex] = [];
  nArr[relationIndex] = [];

  for (let i = 0; i < sigmas.length; i++) {
    pArr[relationIndex][i] = [];
    iArr[relationIndex][i] = [];
    nArr[relationIndex][i] = [];
    for (let j = 0; j < sigmas.length; j++) {
      const sigmasForValue = sigmas[i][j];

      const selectedSigmas = relations[relationIndex].reduce((acc, relation) => [...acc, sigmasForValue[relation]], []);

      const pBerBool = selectedSigmas.every((x) => x >= 0) && selectedSigmas.some((x) => x === 1);
      const iBerBool = selectedSigmas.every((x) => x === 0);
      const nBerBool = selectedSigmas.some((x) => x === 1) && selectedSigmas.some((x) => x === -1);

      let pBerValue;

      if (relationIndex === 0) {
        pBerValue = +pBerBool;
      } else {
        pBerValue = +(
          (pBerBool && !(pArr[relationIndex - 1][j][i] === 1)) ||
          (iBerBool && pArr[relationIndex - 1][i][j] === 1)
        );
      }

      let iBerValue;

      if (relationIndex === 0) {
        iBerValue = +iBerBool;
      } else {
        iBerValue = +(iBerBool && iArr[relationIndex - 1][i][j] === 1);
      }

      let nBerValue;

      if (relationIndex === 0) {
        nBerValue = +nBerBool;
      }

      pArr[relationIndex][i].push(pBerValue);

      iArr[relationIndex][i].push(iBerValue);

      if (relationIndex === 0) nArr[relationIndex][i].push(nBerValue);
    }
  }

  for (let i = 0; i < sigmas.length; i++) {
    if (relationIndex !== 0)
      for (let j = 0; j < sigmas.length; j++) {
        let nBerValue;

        nBerValue = +!(
          pArr[relationIndex][i][j] === 1 ||
          pArr[relationIndex][j][i] === 1 ||
          iArr[relationIndex][i][j] === 1
        );

        nArr[relationIndex][i].push(nBerValue);
      }
  }
}

console.info(pArr[pArr.length - 1].map((list) => list.join(' ')).join('\n'));
console.log();
// console.info(iArr[1].map((list) => list.join(' ')).join('\n'));
// console.log();
// console.info(nArr[1].map((list) => list.join(' ')).join('\n'));

// console.log(r)
