import { timeout } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Audio from "./audio";
import Screen from "./brightness";

export default function Slider(gdkmonitor: Gdk.Monitor) {
  const { TOP } = Astal.WindowAnchor;
  return (
    <window
      visible={false}
      anchor={TOP}
      className={"Slider"}
      name={"Slider"}
      application={App}
      layer={Astal.Layer.OVERLAY}
      gdkmonitor={gdkmonitor}
    >
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        transitionDuration={500}
        setup={(self) => {
          self.hook(self, "map", () => (self.revealChild = true));
          self.hook(self, "unmap", () => (self.revealChild = false));
        }}
      >
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
          <stack
            transitionType={Gtk.StackTransitionType.SLIDE_DOWN}
            transitionDuration={300}
            setup={(self) => {
              timeout(500, () => {
                const window = self.parent.parent.parent as Gtk.Widget;
                self.set_children([Audio(window), Screen(window)]);
              });
            }}
          ></stack>
        </box>
      </revealer>
    </window>
  );
}
