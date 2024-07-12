import Audio from "./audio.js";
import Brightness from "./brightness.js";
import test from "./spotify.js";

const Utils = Widget.Box({
  vertical: true,
  children: [Audio, Brightness],
});

export default Widget.Window({
  visible: false,
  child: test,
  name: "Quick-Menu",
  anchor: ["top", "right"],
  exclusivity: "normal",
});
