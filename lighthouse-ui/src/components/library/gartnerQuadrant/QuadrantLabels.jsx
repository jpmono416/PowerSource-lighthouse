export default function QuadrantLabels() {
  const labelConfigs = [
    {
      title: "Innovators",
      yAlign: "top",
      xAlign: "left",
    },
    {
      title: "Market Leaders",
      yAlign: "top",
      xAlign: "right",
    },
    {
      title: "Emerging Players",
      yAlign: "bottom",
      xAlign: "left",
    },
    {
      title: "Contenders",
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
        <div className="text-xs sm:text-base bg-secondary-700 text-secondary-50 px-4 py-1 text-nowrap truncate">
          {title}
        </div>
      </div>
    );
  });
}
