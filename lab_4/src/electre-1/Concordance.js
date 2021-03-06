import { MatrixOperations } from './index';

/**
 * Concordance class
 *
 * @class
 * @memberof module:electre/utils/concordance
 */
class Concordance {
  /**
   * getConcordanceMatrixEI
   * @param {number[][]} array
   * @param {number[]} weights
   * @returns {number[][]}
   */

  static getConcordanceMatrixEI(array, weights) {
    const arrayCM = [];
    const arrayNW = MatrixOperations.getNormalizedWeigths(weights);

    let i;
    for (i = 0; i < array.length; i += 1) {
      let j;
      const row = [];
      for (j = 0; j < array.length; j += 1) {
        if (i === j) {
          row.push(0);
        } else {
          let k;
          let sum = 0;
          for (k = 0; k < array[0].length; k += 1) {
            if (array[i][k] >= array[j][k]) {
              sum += arrayNW[k];
            }
          }
          row.push(sum);
        }
      }
      arrayCM.push(row);
    }
    return arrayCM;
  }
}

export default Concordance;
