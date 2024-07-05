const battery = await Service.import("battery");

const battery_icons = {
  "10": { "false": "󰁺", "true": "󰢜 " },
  "20": { "false": "󰁻", "true": "󰂆 " },
  "30": { "false": "󰁼", "true": "󰂇 " },
  "40": { "false": "󰁽", "true": "󰂈 " },
  "50": { "false": "󰁾", "true": "󰢝 " },
  "60": { "false": "󰁿", "true": "󰂉 " },
  "70": { "false": "󰂀", "true": "󰢞 " },
  "80": { "false": "󰂁", "true": "󰂊 " },
  "90": { "false": "󰂂", "true": "󰂋 " },
  "100": { "false": "󰁹", "true": "󰂅 " },
};

export default Widget.Label({
  justification: "center",
  class_name: "utils",
  setup: (self) =>
    self.hook(battery, () => {
      const percent = battery.percent;
      let indicator = "0";
      const state = battery.charging;
      if (percent === 100) indicator = "100";
      else if (percent >= 90) indicator = "90";
      else if (percent >= 80) indicator = "80";
      else if (percent >= 70) indicator = "70";
      else if (percent >= 60) indicator = "60";
      else if (percent >= 50) indicator = "50";
      else if (percent >= 40) indicator = "40";
      else if (percent >= 30) indicator = "30";
      else if (percent >= 20) indicator = "20";
      else indicator = "10";
      self.label = `${battery_icons[indicator][`${state}`]}`;
    }),
});
