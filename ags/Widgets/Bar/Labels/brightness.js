import brightness from "./../../../service/brightness.js";

const brightness_icons = ["󰃚", "󰃛", "󰃜", "󰃝", "󰃞", "󰃟", "󰃠"];

export default Widget.Label({
  justification: "center",
  className: "utils",
  setup: (self) =>
    self.hook(brightness, () => {
      const value = brightness.screen_value;
      const times = 0.125;

      if (value > times * 7) self.label = brightness_icons[6];
      else if (value > times * 6) self.label = brightness_icons[5];
      else if (value > times * 5) self.label = brightness_icons[4];
      else if (value > times * 4) self.label = brightness_icons[3];
      else if (value > times * 3) self.label = brightness_icons[2];
      else if (value > times * 2) self.label = brightness_icons[1];
      else self.label = brightness_icons[0];
    }, "screen-changed"),
});
