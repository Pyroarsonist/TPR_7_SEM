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

// console.info(sigmas.map(list => list.map(x => (`(${x.join(',')})`)).join(' ')).join('\n'))

const summas = sigmas.map((list) => list.map((l) => _.sum(l)));

// console.info(summas.map(list => list.join(' ')).join('\n'))

const p = summas.map((list) => list.map((l) => +(l > 0)));

console.info(p.map((list) => list.join(' ')).join('\n'));

// console.log(r)
