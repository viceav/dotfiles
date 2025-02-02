import { bind } from "astal";
import { App, Astal, Gtk } from "astal/gtk3";
import Brightness from "../../../service/brightness";
import { cancelTimeout, startTimeout } from "./utils/timeout";

const brightness = Brightness.get_default();

enum brightness_icons {
  "󰃚",
  "󰃛",
  "󰃜",
  "󰃝",
  "󰃞",
  "󰃟",
  "󰃠",
}

export default function Screen(window: Gtk.Widget) {
  return (
    <box
      name={"brightness"}
      setup={(self) => {
        self.hook(brightness, "notify::screen", () => {
          const stack = self.parent as Astal.Stack;
          if (!App.get_window("QuickMenu")?.visible) {
            cancelTimeout();
            window.show();
            stack.set_shown("brightness");
            startTimeout(window);
          } else {
            window.hide();
          }
        });
      }}
    >
      <label
        widthChars={2}
        label={bind(brightness, "screen").as((br) => {
          const times: number = 0.125;
          let label: string;
          if (br > times * 7) label = brightness_icons[6];
          else if (br > times * 6) label = brightness_icons[5];
          else if (br > times * 5) label = brightness_icons[4];
          else if (br > times * 4) label = brightness_icons[3];
          else if (br > times * 3) label = brightness_icons[2];
          else if (br > times * 2) label = brightness_icons[1];
          else label = brightness_icons[0];
          return label;
        })}
      ></label>
      <slider
        value={bind(brightness, "screen")}
        onDragged={({ value }) => (brightness.screen = value)}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      ></slider>
    </box>
  );
}
