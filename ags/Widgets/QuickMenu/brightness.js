import brightness from "./../../service/brightness.js";

const Label = Widget.Label({
  label: "󰃠 ",
});

const Brightness = Widget.Slider({
  digits: 2,
  drawValue: false,
  widthRequest: 150,
  min: 0,
  max: 1,
  value: brightness.bind("screen_value"),
  onChange: ({ value }) => brightness.screen_value = value,
});

export default Widget.Box({
  children: [Label, Brightness],
});
