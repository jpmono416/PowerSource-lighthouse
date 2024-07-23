export default class FilterValidator {
  #from;
  #to;

  constructor(defaultValues) {
    this.#from = defaultValues?.from;
    this.#to = defaultValues?.to;
  }

  setFrom(value) {
    this.#from = value;
  }
  setTo(value) {
    this.#to = value;
  }

  isValid() {
    return this.validateFrom();
  }

  validateFrom() {
    let err;
    const from = new Date(this.#from).getTime();
    const to = new Date(this.#to).getTime();
    if (from > to) err = "From must not be later than to";
    return [!err, err];
  }
}
