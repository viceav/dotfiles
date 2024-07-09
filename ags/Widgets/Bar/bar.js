import Workspaces from "./Buttons/hyprland.js";
import Audio from "./Labels/audio.js";
import Battery from "./Labels/battery.js";
import Network from "./Labels/network.js";
import Date from "./Labels/date.js";

const Utils = Widget.Box({
  children: [Network, Audio, Battery],
  hpack: "end",
  hexpand: false,
});

const Main_Box = Widget.Box({
  homogeneous: true,
  children: [Workspaces, Date, Utils],
  className: "container",
});

export default Widget.Window({
  exclusivity: "exclusive",
  name: "Main-Bar",
  anchor: ["top", "right", "left"],
  layer: "top",
  child: Main_Box,
});
