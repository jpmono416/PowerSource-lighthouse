const catalogueDummyData = [
  {
    id: 1,
    name: "Gemini",
    organisation: "Google",
    description:
      "As of release, Gemini is Google's most capable and flexible AI model, proficient in multimodal domains.",
    created_date: new Date("06/12/2023"),
    url: "https://deepmind.google/technologies/gemini/#introduction",
    modality: {
      text: true,
      image: true,
      text: true,
      video: true,
    },
    access: "closed",
    licence: "unknown",
    intended_uses:
      "general use large language model that can be used for language, reasoning, and code tasks.",
    prohibited_uses:
      "becoming part of a general-purpose service or product or use within specific downstream applications without prior assessment.",
    monitoring: "Google internal monitoring",
  },
  {
    id: 2,
    name: "GPT-4",
    organisation: "OpenAI",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam error repellendus sequi non dolorem fugiat, consequuntur assumenda eum rerum dolores, ullam quas autem, voluptates beatae possimus harum eos quasi distinctio.",
    created_date: new Date("14/03/2023"),
    url: "https://arxiv.org/abs/2303.08774",
    modality: {
      text: true,
      image: true,
    },
    access: "limited",
    licence: "unknown",
    intended_uses: "",
    prohibited_uses: "",
    monitoring: "",
  },
];

export default catalogueDummyData;
