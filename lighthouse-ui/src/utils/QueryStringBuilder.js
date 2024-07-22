export default class QueryStringBuilder {
  #queries = {};

  getQueryString() {
    const queryElements = [];
    for (const key in this.#queries) {
      if (!this.#queries[key]) return;
      queryElements.push(`${key}=${this.#queries[key]}`);
    }
    if (!queryElements.length) return "";
    return `?${queryElements.join("&")}`;
  }

  setFilter(field, value) {
    if (!value) return delete this.#queries[field];
    this.#queries[field] = value.trim();
  }
}
