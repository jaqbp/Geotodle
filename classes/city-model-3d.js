export default class CityModel3d {
  /**
   * Klasa reprezentująca model miasta 3d.
   * @param {string} name
   * @param {string} description
   * @param {string} path
   */

  constructor(name, description, path) {
    /** @private */
    this.name = name;
    /** @private */
    this.description = description;
    /** @private */
    this.path = path;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPath() {
    return this.path;
  }
}
