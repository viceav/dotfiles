import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Battery from "./label/Battery";
import Brightness from "./label/Brightness";
import Wifi from "./label/Wifi";
import Audio from "./label/Audio";
import Time from "./label/Time";
import Niri from "./button/Niri";

function Info() {
  return (
    <eventbox
      onClick={() => {
        const menu = App.get_window("QuickMenu")!;
        menu.visible ? menu.hide() : menu.show();
      }}
      halign={Gtk.Align.END}
      hexpand={false}
    >
      <box spacing={8}>
        <Wifi />
        <Audio />
        <Brightness />
        <Battery />
      </box>
    </eventbox>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox homogeneous={true}>
        <Niri />
        <Time />
        <Info />
      </centerbox>
    </window>
  );
}
