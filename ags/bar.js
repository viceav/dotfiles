import Battery from "./battery.js";
import Workspaces from "./hyprland.js";
import Network from "./network.js";
import Audio from "./audio.js";

const Utils = Widget.EventBox({
  hpack: "end",
  child: Widget.Box({
    children: [Network, Audio, Battery],
    className: "container",
  }),
});

const Bar_Container = Widget.CenterBox({
  startWidget: Workspaces,
  endWidget: Utils,
});

export default Widget.Window({
  exclusivity: "exclusive",
  child: Bar_Container,
  name: "main-bar",
  anchor: ["top", "left", "right"],
});
