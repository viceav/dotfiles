import Audio from "./audio.js";
import Brightness from "./brightness.js";
import Spotify from "./spotify.js";
import { Network_Box } from "./network.js";
import { Box } from "./utils.js";

const Power_Button = Widget.Button({
  hpack: "end",
  label: "",
  className: "pwoff",
  on_clicked: () => {
    Utils.execAsync("/usr/bin/fish -c pwoff");
  },
});

const First_Box = Widget.Box({
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
          css: "margin: 10px 0px;",
          vpack: "center",
          vertical: true,
          children: [Audio, Brightness],
        }),
      ],
    }),
  ],
});

const Main_Box = Box();
Main_Box.children = [First_Box, Spotify];

const Stack_Widget = Widget.Stack({
  children: { "main": Main_Box },
  //children: { "main": Network_Box },
  transition: "crossfade",
  transitionDuration: 1000,
});

export default Widget.Window({
  css: "background: transparent;",
  child: Stack_Widget,
  name: "Quick-Menu",
  anchor: ["top", "right"],
  exclusivity: "normal",
});
