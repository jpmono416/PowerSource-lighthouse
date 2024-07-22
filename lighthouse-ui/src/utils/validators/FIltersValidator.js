export default class FiltersValidator {
  #from;
  #to;

  setFrom(value) {
    this.#from = value;
  }
  setTo(value) {
    this.#to = value;
  }

  validateFrom() {
    let err;
    const from = new Date(this.#from).getTime();
    const to = new Date(this.#to).getTime();
    if (from > to) err = "From must not be later than to";
    return [!err, err];
  }
}
