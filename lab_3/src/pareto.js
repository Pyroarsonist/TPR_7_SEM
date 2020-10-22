import { parseMatrix } from './tools';

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

// console.info(sigmas.map(list => list.map(x => (`(${x.join(',')})`)).join(' ')).join('\n'))

const r = sigmas.map((list) => list.map((l) => +l.every((x) => x >= 0)));

console.info(r.map((list) => list.join(' ')).join('\n'));

// console.log(r)
