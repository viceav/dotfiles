import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "../../service/brightness";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;
const brightness = Brightness.get_default();
const sliderWidth = 150;

export default function QuickMenu(gdkMonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible={false}
      name={"QuickMenu"}
      className={"QuickMenu"}
      gdkmonitor={gdkMonitor}
      anchor={TOP | RIGHT}
      application={App}
    >
      <box spacing={20}>
        <box
          widthRequest={50}
          heightRequest={50}
          className={"grogu"}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
        ></box>
        <box vertical={true} valign={Gtk.Align.CENTER} homogeneous={true}>
          <box>
            <label label={""}></label>
            <slider
              valign={Gtk.Align.CENTER}
              halign={Gtk.Align.START}
              onDragged={({ value }) => (wp.volume = value)}
              value={bind(wp, "volume")}
              widthRequest={sliderWidth}
            ></slider>
          </box>
          <box>
            <label label={"󰃠"}></label>
            <slider
              valign={Gtk.Align.CENTER}
              halign={Gtk.Align.START}
              onDragged={({ value }) => (brightness.screen = value)}
              value={bind(brightness, "screen")}
              widthRequest={sliderWidth}
            ></slider>
          </box>
        </box>
      </box>
    </window>
  );
}
