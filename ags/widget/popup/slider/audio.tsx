import { bind } from "astal";
import { App, Astal, Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp?version=0.1";
import { cancelTimeout, startTimeout } from "./utils/timeout";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;

enum audio_icons {
  muted = "",
  low = "",
  medium = "",
  high = "",
}

export default function Audio(window: Gtk.Widget) {
  return (
    <box
      name={"audio"}
      setup={(self) => {
        self.hook(wp, "notify::volume-icon", () => {
          const stack = self.parent as Astal.Stack;
          if (!App.get_window("QuickMenu")?.visible) {
            cancelTimeout();
            window.show();
            stack.set_shown("audio");
            startTimeout(window);
          } else {
            window.hide();
          }
        });
      }}
    >
      <label
        widthChars={2}
        label={bind(wp, "volumeIcon").as(() => {
          const vol = wp.volume;
          if (wp.mute) return audio_icons.muted;
          let state: audio_icons;
          if (vol > 0.8) state = audio_icons.high;
          else if (vol > 0.4) state = audio_icons.medium;
          else if (vol > 0) state = audio_icons.low;
          else state = audio_icons.muted;
          return state;
        })}
      ></label>
      <slider
        value={bind(wp, "volume")}
        onDragged={({ value }) => (wp.volume = value)}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      ></slider>
    </box>
  );
}
