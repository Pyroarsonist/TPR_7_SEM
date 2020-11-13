import {formatMatrix, parseData} from './tools';
import _ from 'lodash';
import {MatrixOperations, Discordance, Credibility, Concordance} from './electre-1/';

const {plot, stack} = require('nodeplotlib');


const cArr = [];
for (let i = 0.5; i < 1; i+=0.0001) {
  cArr.push(i)
}
const samples=[]

cArr.forEach(c => {
    const {matrix, wArr, d} = parseData();

    let i;
    let j;
    const _credibility = Credibility.getCredibilityMatrixEI(matrix, wArr, c, d);

// keep a copy of credibility square matrix
    const credibility = JSON.parse(JSON.stringify(_credibility))
    let credibilityVector = MatrixOperations.getColumnSum(_credibility);
    const vector = Array(credibilityVector.length).fill(0);

// First pass
    for (i = 0; i < credibilityVector.length; i += 1) {
        if (credibilityVector[i] === 0) {
            vector[i] = i + 1;
        }
    }
    let setKD = 0;
    if (MatrixOperations.getElementCountZero(credibilityVector) !== 0) {
        setKD = 1;
    }
    for (i = 0; i < vector.length; i += 1) {
        if (vector[i] === 0) {
            for (j = 0; j < _credibility[0].length; j += 1) {
                _credibility[i][j] = 0;
            }
        }
    }

// Second pass
    credibilityVector = MatrixOperations.getColumnSum(_credibility);
    for (i = 0; i < credibilityVector.length; i += 1) {
        if (credibilityVector[i] === 0) {
            vector[i] = i + 1;
        }
    }

// Kernel set partition
    const elementCountZero = MatrixOperations.getElementCountZero(vector);
    const kernel = [];

    if (elementCountZero === 0 && setKD === 1) {
        for (i = 0; i < vector.length; i += 1) {
            if (vector[i] > 0) {
                kernel.push(i);
            }
        }
    } else if (elementCountZero !== 0) {
        for (i = 0; i < vector.length; i += 1) {
            if (vector[i] > 0) {
                kernel.push(i);
            }
        }
    }

    const data = {
        concordance: Concordance.getConcordanceMatrixEI(matrix, wArr),
        discordance: Discordance.getDiscordanceMatrixEI(matrix),
        credibility,
        kernel,
    };

//     require('fs').writeFileSync(
//         './output.txt',
//         `матриця індексів узгодження C\n${formatMatrix(data.concordance)}\nматриця індексів неузгодження D
// ${formatMatrix(data.discordance)}\nЗначення порогів для індексів узгодження та неузгодження c, d
// ${c} ${d}\nВідношення для порогових значень c, d:
// ${formatMatrix(data.credibility, false)}\nЯдро відношення:
// ${data.kernel.map(i => i + 1).join(' ')}`
//     );
  samples.push({
    x: c,
    y: data.kernel.length
  })
})


const data = [{x:samples.map(s=>s.x),y:samples.map(s=>s.y), type: 'line'}]

// const data = constants.map((l, i) => [({x: intervalLabels[i], y: intervals[i], type: 'line'}), {
//     x: arrs[i],
//     y: distributionsArrs[i],
//     type: 'histogram'
// }]);
// data.forEach((d, i) => {
//     stack(d)
//
//     const degreeOfFreedom = d[0].x.length - 1
//
//
//     console.info(`${i + 1} arr, a: ${constants[i].a}, c: ${constants[i].c}`)
//     console.info(`Average: ${tools.average(arrs[i])}`)
//     console.info(`Dispersion: ${tools.dispersion(arrs[i])}`)
//     const chi = tools.chi(arrs[i], defaultArrs[i])
//     console.info(`Chi squared test: ${chi}`)
//     console.info(`Degree of freedom: ${degreeOfFreedom}`)
//     const criteriaChi = ss.chiSquaredDistributionTable[degreeOfFreedom]["0.05"]
//     console.info(`Criteria chi: ${criteriaChi}`)
//     console.info(`Chi test passed: ${chi < criteriaChi}`)
//     console.info('\n')
//
// })
stack(data)
plot();