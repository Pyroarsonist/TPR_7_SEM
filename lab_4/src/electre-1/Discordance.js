import { MatrixOperations } from './index';

/**
 * Discordance class
 *
 * @class
 * @memberof module:electre/utils/discordance
 */
class Discordance {
  /**
   * getDiscordanceMatrixEI
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getDiscordanceMatrixEI(array ) {
    const arrayDM = [];
    const arrayDMTemp = Array(array[0].length).fill(0);
    const delta = MatrixOperations.getDelta(array);

    let i;
    let j;
    for (i = 0; i < array.length; i += 1) {
      const row = [];
      for (j = 0; j < array.length; j += 1) {
        if (i === j) {
          row.push(1);
          continue;
        }

        let k;
        for (k = 0; k < array[0].length; k += 1) {
          arrayDMTemp[k] = array[j][k] - array[i][k];
        }

        const maxNum = Math.max(...arrayDMTemp);

        if (maxNum >= 0) {
          row.push(maxNum / delta);
        } else {
          row.push(0);
        }
      }
      arrayDM.push(row);
    }
    return arrayDM;
  }
}

export default Discordance;
