// @ts-check

/**
 * Parses height/width values for Pane sizes.
 * Supports:
 *  * string pixel values, eg. "20px"
 *  * percentage values, eg. "20%"
 *  * numbers, eg. 20
 *
 *
 * @param {number|string} value the value to be parsed
 * @param {number=} reference this value is scaled by the given percentage in value.
 *                            Only required when value is a percentage.
 *
 * @example
 *  parseDimension("20%", 100) // 20
 *  parseDimension("20px") // 20
 *  parseDimension(20) // 20
 */
export const parseDimension = (value, reference) => {
  if (typeof value === "number") return value;
  if (value.endsWith("%")) {
    return (+value.substring(0, value.length - 1) / 100.0) * reference;
  }
  if (value.endsWith("px")) {
    return +value.substring(0, value.length - 2);
  }

  throw new Error("Unrecognized value format: " + value);
};

/**
 * Returns the css cursor type for the resize cursor
 * @param {string} type either "h" or "w"
 */
export const getResizeCursorClassName = type => (type === "h" ? "ew-resize" : "ns-resize");