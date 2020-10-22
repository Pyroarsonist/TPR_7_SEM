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

// console.info(sigmas.map(list => list.map(x => (`(${x.join(',')})`)).join(' ')).join('\n'));

const relations = [3, 8, 1, 12, 11, 9, 5, 4, 7, 2, 6, 10].map((x) => x - 1);
// const relations = [3, 1, 4, 5, 2].map(x => x - 1)

const p = [];
for (let i = 0; i < sigmas.length; i++) {
  p[i] = [];
  for (let j = 0; j < sigmas.length; j++) {
    const sigmasForValue = sigmas[i][j];
    const lexValue = relations.reduce((prevVal, relation) => {
      if (prevVal !== 0) return prevVal;
      return sigmasForValue[relation];
    }, 0);
    p[i].push(+(lexValue === 1));
  }
}

console.info(p.map((list) => list.join(' ')).join('\n'));

// console.log(r)
