export default function QuadrantLabels() {
  const labelConfigs = [
    {
      title: "Label 1",
      yAlign: "top",
      xAlign: "left",
    },
    {
      title: "Label 2",
      yAlign: "top",
      xAlign: "right",
    },
    {
      title: "Label 3",
      yAlign: "bottom",
      xAlign: "left",
    },
    {
      title: "Label 4",
      yAlign: "bottom",
      xAlign: "right",
    },
  ];

  return labelConfigs.map(({ title, yAlign, xAlign }) => {
    return (
      <div
        key={title}
        className="absolute flex justify-center"
        style={{
          top: yAlign === "top" ? 0 : undefined,
          left: xAlign === "left" ? 0 : "50%",
          right: xAlign === "right" ? 0 : "50%",
          bottom: yAlign === "bottom" ? 0 : undefined,
        }}
      >
        <div className="bg-secondary-700 text-secondary-50 px-4 py-1">
          {title}
        </div>
      </div>
    );
  });
}
