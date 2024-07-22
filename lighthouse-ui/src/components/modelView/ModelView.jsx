import { useParams } from "react-router";
import { Link } from "react-router-dom";

import catalogueDummyData from "../../dummyData/catalogueData";

export default function ModelView() {
  const modelId = useParams().modelId;
  const model = catalogueDummyData.find(
    (model) => model.id.toString() === modelId
  );

  return (
    <div className="mt-6">
      <Link to={-1} className="text-primary-700">
        {"< Back to list"}
      </Link>
      <div className="flex flex-col items-center ">
        <h2 className="text-3xl text-secondary-700 font-light">{model.name}</h2>
        <h3 className="text-lg text-secondary-600 font-light">
          {`Created by ${model.organization}`}
        </h3>
      </div>
    </div>
  );
}
