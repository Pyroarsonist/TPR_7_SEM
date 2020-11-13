import { Discordance } from './index';
import Concordance from './Concordance';

/**
 * Credibility class
 *
 * @class
 * @memberof module:electre/utils/credibility
 */
class Credibility {
  /**
   * getCredibilityMatrixEI
   * @param {number[][]} array
   * @param {number[]} weights
   * @param {number} c strong preference
   * @param {number} d weak preference
   * @returns {number[][]}
   */

  static getCredibilityMatrixEI(array, weights, c, d) {
    const arrayCredM = [];
    const arrayCM = Concordance.getConcordanceMatrixEI(array, weights);
    const arrayDM = Discordance.getDiscordanceMatrixEI(array);


    for (let i = 0; i < array.length; i += 1) {
      const row = [];
      for (let j = 0; j < array.length; j += 1) {
        row.push(+(arrayCM[i][j] >= c && arrayDM[i][j] <= d))
      }
      arrayCredM.push(row);
    }
    return arrayCredM;
  }
}

export default Credibility;
