/* This file holds any helper functions needed in more than one location. */

module.exports = {
  removeEndingZeroes: (version) => {
    // If the third digit in the version number is 0, remove it from the string. Otherwise, leave it alone.
    if (version.split(".")[2] == 0) return version.slice(0, version.length - 2);
    return version;
  }
}
