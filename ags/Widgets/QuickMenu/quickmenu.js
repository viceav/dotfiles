import Audio from "./audio.js";
import Brightness from "./brightness.js";

const Utils = Widget.Box({
  vertical: true,
  children: [Audio, Brightness],
});

export default Widget.Window({
  child: Utils,
  name: "Quick-Menu",
  anchor: ["top", "right"],
  exclusivity: "normal",
});
