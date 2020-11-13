/**
 * MatrixOperations class
 *
 * @class
 * @memberof module:electre/utils/operations
 */
class MatrixOperations {
  /**
   * getColumnSum
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getColumnSum(array) {
    const arrayC = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let i;
      for (i = 0; i < array.length; i += 1) {
        arrayC[j] += array[i][j];
      }
    }
    return arrayC;
  }

  /**
   * getElementCountZero
   * @param {number[]} array
   * @returns {number}
   */

  static getElementCountZero(array) {
    let elementCount = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (array[i] === 0) {
        elementCount += 1;
      }
    }
    return elementCount;
  }

  /**
   * getNormalizedPerformanceMatrix
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getPerformanceMatrix(array) {
    const arrayNPM = [];
    const a = this.getColumnSum(array);
    let i;
    let j;
    for (i = 0; i < array.length; i += 1) {
      const row = [];
      for (j = 0; j < array[0].length; j += 1) {
        row.push(array[i][j] / a[j]);
      }
      arrayNPM.push(row);
    }
    return arrayNPM;
  }

  /**
   * getDelta
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getDelta(array) {
    const max = Math.max(...array.flat());
    const min = Math.min(...array.flat());
    return max - min;
  }

  /**
   * getMinValueInColumn
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMinValueInColumn(array) {
    const arrayMin = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let min = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] <= min) {
          min = array[i][j];
          arrayMin[j] = array[i][j];
        }
      }
    }
    return arrayMin;
  }

  /**
   * getMaxValueInColumn
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMaxValueInColumn(array) {
    const arrayMax = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let max = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] >= max) {
          max = array[i][j];
          arrayMax[j] = array[i][j];
        }
      }
    }
    return arrayMax;
  }

  /**
   * getNormalizedWeigths
   * @param {number[]} array
   * @returns {number[]}
   */

  static getNormalizedWeigths(array) {
    const arrayNW = Array(array.length).fill(0);
    const sum = this.getWeightsSum(array);
    let i;
    for (i = 0; i < array.length; i += 1) {
      arrayNW[i] = array[i] / sum;
    }
    return arrayNW;
  }

  /**
   * getWeightsSum
   * @param {number[]} array
   * @returns {number}
   */

  static getWeightsSum(array) {
    let sum = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      sum += array[i];
    }
    return sum;
  }
}

export default MatrixOperations;
