import { bind, GLib } from "astal";
import { Astal } from "astal/gtk3";
import AstalWp from "gi://AstalWp?version=0.1";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;

export default function Audio() {
  const { TOP, LEFT } = Astal.WindowAnchor;
  <window anchor={TOP | LEFT}>
    <box
      visible={false}
      setup={(self) => {
        const volume = bind(wp, "volume");
        let timer: GLib.Source;
        self.hook(volume, () => {
          self.visible = true;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            self.visible = false;
          }, 3000);
        });
      }}
    >
      <slider
        onDragged={({ value }) => (wp.volume = value)}
        value={bind(wp, "volume")}
        vertical={true}
        inverted={true}
      ></slider>
    </box>
  </window>;
}
