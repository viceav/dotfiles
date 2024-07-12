import Workspaces from "./Buttons/hyprland.js";
import Brightness from "./Labels/brightness.js";
import Audio from "./Labels/audio.js";
import Battery from "./Labels/battery.js";
import Network from "./Labels/network.js";
import Date from "./Labels/date.js";

const Info = Widget.EventBox({
  className: "eventbox",
  hpack: "end",
  focusOnClick: false,
  child: Widget.Box({
    children: [Network, Audio, Brightness, Battery],
    hpack: "end",
    hexpand: false,
  }),
  on_primary_click: () => Utils.execAsync('ags -t "Quick-Menu"'),
});

const Main_Box = Widget.Box({
  homogeneous: true,
  children: [Workspaces, Date, Info],
  className: "bar",
});

export default Widget.Window({
  css: "background: transparent;",
  exclusivity: "exclusive",
  name: "Main-Bar",
  anchor: ["top", "right", "left"],
  layer: "top",
  child: Main_Box,
});
