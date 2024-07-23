import { useState } from "react";

export default function useModalFormState(defaultValues) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const [modality, setModality] = useState(defaultValues?.modality || "");
  const [organization, setOrganization] = useState(
    defaultValues?.organization || ""
  );
  const [createdAt, setCreatedAt] = useState(defaultValues?.createdAt || "");
  const [access, setAccess] = useState(defaultValues?.access || "");
  const [licence, setLicence] = useState(defaultValues?.licence || "");
  const [perceived_business_value, setPerceived_business_value] = useState(
    defaultValues?.perceived_business_value || ""
  );
  const [business_readiness, setBusiness_readiness] = useState(
    defaultValues?.business_readiness || ""
  );

  const submission = {
    name,
    description,
    modality,
    organization,
    createdAt,
    access,
    licence,
    perceived_business_value,
    business_readiness,
  };

  return {
    name,
    setName,
    description,
    setDescription,
    modality,
    setModality,
    organization,
    setOrganization,
    createdAt,
    setCreatedAt,
    access,
    setAccess,
    licence,
    setLicence,
    perceived_business_value,
    setPerceived_business_value,
    business_readiness,
    setBusiness_readiness,
    submission,
  };
}
