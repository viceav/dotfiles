const { speaker } = await Service.import("audio");

const Label = Widget.Label({
  label: " ",
});

const Audio = Widget.Slider({
  hpack: "start",
  vpack: "center",
  digits: 2,
  drawValue: false,
  widthRequest: 150,
  min: 0,
  max: 1,
  value: speaker.bind("volume"),
  onChange: ({ value }) => speaker.volume = value,
});

export default Widget.Box({
  children: [Label, Audio],
});
