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
  const [created_date, setCreated_date] = useState(
    defaultValues?.created_date || ""
  );
  const [access, setAccess] = useState(defaultValues?.access || "");
  const [license, setLicense] = useState(defaultValues?.license || "");
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
    created_date,
    access,
    license,
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
    created_date,
    setCreated_date,
    access,
    setAccess,
    license,
    setLicense,
    perceived_business_value,
    setPerceived_business_value,
    business_readiness,
    setBusiness_readiness,
    submission,
  };
}
