import Audio from "./audio.js";
import Brightness from "./brightness.js";
import Spotify from "./spotify.js";
import { Network_Box } from "./network.js";
import { Box, Menu_Bluetooth, Menu_Network } from "./utils.js";

export const Power_Button = Widget.Button({
  hpack: "end",
  label: "",
  className: "pwoff",
  on_clicked: () => {
    Utils.execAsync('ags -t "pwoff"');
  },
});

const First_Box = Widget.Box({
  class_name: "box",
  spacing: 20,
  children: [
    Widget.Box({
      vpack: "center",
      className: "profile",
      widthRequest: 50,
      heightRequest: 50,
    }),
    Widget.Box({
      vertical: true,
      children: [
        Power_Button,
        Widget.Box({
          vpack: "center",
          vertical: true,
          children: [Audio, Brightness],
        }),
      ],
    }),
  ],
});

const Main_Box = Box([
  First_Box,
  Widget.Box({
    class_name: "box",
    homogeneous: true,
    children: [Menu_Network, Menu_Bluetooth],
  }),
  Spotify,
]);

export const Stack_Widget = Widget.Stack({
  children: { "main": Main_Box, "network": Network_Box },
  transition: "over_left_right",
  transitionDuration: 100,
});

export default Widget.Window({
  css: "background: transparent;",
  visible: false,
  child: Stack_Widget,
  name: "Quick-Menu",
  anchor: ["top", "right"],
  exclusivity: "normal",
  keymode: "on-demand",
  setup: (self) =>
    self.connect("notify::visible", () => {
      if (!self.visible) {
        self.child.set_visible_child(self.child.children.main);
      }
    }),
});
