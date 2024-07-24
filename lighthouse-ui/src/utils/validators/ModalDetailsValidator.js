export default class ModalDetailsValidator {
  static #validators = {
    name: ModalDetailsValidator.validateName,
    description: ModalDetailsValidator.validateDescription,
    modality: ModalDetailsValidator.validateModality,
    organization: ModalDetailsValidator.validateOrganisation,
    created_date: ModalDetailsValidator.validateCreatedAt,
    access: ModalDetailsValidator.validateAccess,
    license: ModalDetailsValidator.validateLicence,
    perceived_business_value:
      ModalDetailsValidator.validatePerceivedBusinessValue,
    business_readiness: ModalDetailsValidator.validateBusinessReadiness,
  };

  static get validators() {
    return this.#validators;
  }

  static isValidated(submission) {
    for (const key in submission) {
      const validator = ModalDetailsValidator.validators[key];
      if (!validator || !validator(submission[key])[0]) {
        return false;
      }
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
    if (description.length > 5000)
      return [false, "Description must be no more than 5,000 characters"];
    return [true];
  }

  static validateModality(modality) {
    if (modality.length > 64)
      return [false, "Modality must be no more than 64 characters"];
    return [true];
  }

  static validateOrganisation(organisation) {
    if (organisation.length < 3)
      return [false, "Organisation must be at least 3 characters"];
    if (organisation.length > 300)
      return [false, "Organisation must be no more than 300 characters"];
    return [true];
  }

  static validateCreatedAt(createdAt) {
    if (!createdAt) return [false, "Created at is required"];
    return [true];
  }

  static validateAccess(access) {
    if (access.length > 32)
      return [false, "Access must be no more than 32 characters"];
    return [true];
  }

  static validateLicence(licence) {
    if (licence.length > 64)
      return [false, "Licence must be no more than 64 characters"];
    return [true];
  }

  static validatePerceivedBusinessValue(perceivedBusinessValue) {
    if (!perceivedBusinessValue) return [true];
    if (parseInt(perceivedBusinessValue) < 0)
      return [false, "Perceived business value must not be less than 0"];
    if (parseInt(perceivedBusinessValue) > 100)
      return [
        false,
        "Perceived business value must be not be greater than 100",
      ];
    return [true];
  }

  static validateBusinessReadiness(businessReadiness) {
    if (!businessReadiness) return [true];
    if (parseInt(businessReadiness) < 0)
      return [false, "Business readiness must not be less than 0"];
    if (parseInt(businessReadiness) > 100)
      return [false, "Business readiness must be not be greater than 100"];
    return [true];
  }
}
