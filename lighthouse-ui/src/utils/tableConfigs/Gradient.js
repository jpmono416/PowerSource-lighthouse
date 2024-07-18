export default class Gradient {
  #startRed;
  #startGreen;
  #startBlue;
  #endRed;
  #endGreen;
  #endBlue;

  constructor(start, end) {
    [this.#startRed, this.#startGreen, this.#startBlue] = this.#parseRGB(start);
    [this.#endRed, this.#endGreen, this.#endBlue] = this.#parseRGB(end);
  }

  getColourAt(percent) {
    const r =
      this.#startRed + (this.#endRed - this.#startRed) * (percent / 100);
    const g =
      this.#startGreen + (this.#endGreen - this.#startGreen) * (percent / 100);
    const b =
      this.#startBlue + (this.#endBlue - this.#startBlue) * (percent / 100);
    return `rgb(${r},${g},${b})`;
  }

  #parseRGB(rgbString) {
    return rgbString.match(/\d+/g)?.map((n) => parseInt(n));
  }
}

// const getBgColour = (fillPercentage) => {
//   if (fillPercentage > 100) return "rgb(242, 204, 143)";

//   const emptyRed = 202;
//   const emptyGreen = 110;
//   const emptyBlue = 86;

//   const redDiff = 129 - emptyRed;
//   const greenDiff = 178 - emptyGreen;
//   const blueDiff = 154 - emptyBlue;

//   const multiplier = Math.min(fillPercentage, 100) / 100;

//   const red = emptyRed + redDiff * multiplier;
//   const green = emptyGreen + greenDiff * multiplier;
//   const blue = emptyBlue + blueDiff * multiplier;
//   return `rgba(${red},${green},${blue},0.9)`;
// };
