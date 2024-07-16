import { useParams } from "react-router";
import catalogueDummyData from "../../dummyData/catalogueData";

export default function ModelView() {
  const modelId = useParams().modelId;
  const model = catalogueDummyData.find(
    (model) => model.id.toString() === modelId
  );
  console.log(modelId);

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-3xl text-secondary-700 font-light">{model.name}</h2>
      <h3 className="text-lg text-secondary-600 font-light">
        {`Created by ${model.organisation}`}
      </h3>
    </div>
  );
}
