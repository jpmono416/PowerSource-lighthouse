import HomeLink from "./HomeLink";

export default function Home() {
  return (
    <div className="bg-primary-700 bg-opacity-10 flex flex-col items-center pt-12 h-full px-2">
      <div className="flex flex-col items-center w-full max-w-2xl gap-8">
        <HomeLink
          imgSrc="/images/llm.webp"
          label="CATALOGUE"
          description="Explore our catalogue of LLMs"
          to="/models/catalogue"
        />
        <HomeLink
          imgSrc="/images/graphing.webp"
          label="COMPARE"
          description="Compare popular LLMs"
          to="/models/compare"
        />
      </div>
    </div>
  );
}
