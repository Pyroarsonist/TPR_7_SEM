import { parseMatrix } from './tools';
import _ from 'lodash';

const matrix = parseMatrix();

const psi = matrix.map((line) => line.sort((a, b) => b - a));

const deltas = [];

for (let i = 0; i < psi.length; i++) {
  deltas[i] = [];
  for (let j = 0; j < psi.length; j++) {
    deltas[i].push(
      [...psi[i]].map((value, index) => {
        return value - psi[j][index];
      })
    );
  }
}

// console.info(deltas.map(list => list.map(x => (`(${x.join(',')})`)).join(' ')).join('\n'))

const sigmas = deltas.map((dArr) => dArr.map((list) => list.map((x) => Math.sign(x))));

// console.info(sigmas.map((list) => list.map((x) => `(${x.join(',')})`).join(' ')).join('\n'));
// console.log();

const r = sigmas.map((list) => list.map((l) => +l.every((x) => x >= 0)));

console.info(r.map((list) => list.join(' ')).join('\n'));

// console.log(r)
