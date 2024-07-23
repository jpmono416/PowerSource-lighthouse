import validator from "validator";

export default class ModalDetailsValidator {
  static #validators = {
    name: ModalDetailsValidator.validateName,
    description: ModalDetailsValidator.validateDescription,
  };

  static get validators() {
    return this.#validators;
  }

  static isValidated(submission) {
    for (const key in submission) {
      const validator = ModalDetailsValidator.validators[key];
      if (!validator || !validator(submission[key], submission.password)[0])
        return false;
    }
    return true;
  }

  static validateName(name) {
    if (name.length < 3) return [false, "Name must be at least 3 characters"];
    if (name.length > 24)
      return [false, "Name must be no more than 24 characters"];
    return [true];
  }

  static validateDescription(description) {
    if (description.length < 16)
      return [false, "Description must be at least 16 characters"];
    if (description.length > 300)
      return [false, "Description must be no more than 300 characters"];
    return [true];
  }

  static validateModality(modality) {
    if (modality.length < 3)
      return [false, "Modality must be at least 3 characters"];
    if (modality.length > 64)
      return [false, "Modality must be no more than 64 characters"];
    return [true];
  }

  static validateOrganisation(organisation) {
    if (organisation.length < 3)
      return [false, "Organisation must be at least 3 characters"];
    if (organisation.length > 64)
      return [false, "Organisation must be no more than 64 characters"];
    return [true];
  }
}
