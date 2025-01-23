import { bind } from "astal";
import { App, Astal, Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "../../service/brightness";
import AstalMpris from "gi://AstalMpris?version=0.1";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;
const brightness = Brightness.get_default();
const spotify = AstalMpris.Player.new("spotify");
const sliderWidth = 150;

export default function QuickMenu() {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      keymode={Astal.Keymode.ON_DEMAND}
      visible={false}
      name={"QuickMenu"}
      className={"QuickMenu"}
      anchor={TOP | RIGHT}
      application={App}
    >
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        transitionDuration={500}
        setup={(self) => {
          self.hook(self, "map", () => (self.revealChild = true));
          self.hook(self, "unmap", () => (self.revealChild = false));
        }}
      >
        <box vertical={true} spacing={5}>
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
          <box spacing={10}>
            <box
              className={"cover"}
              css={bind(spotify, "coverArt").as((coverArt) => {
                if (coverArt) {
                  return `background-image: url("${coverArt}")`;
                } else {
                  return "";
                }
              })}
            ></box>
            <box vertical={true} valign={Gtk.Align.CENTER}>
              <label
                maxWidthChars={25}
                truncate={true}
                justify={Gtk.Justification.LEFT}
                halign={Gtk.Align.START}
                valign={Gtk.Align.END}
                label={bind(spotify, "title").as((title) =>
                  title ? title : "",
                )}
                css={'font-family: "Sans"; font-size: 14px;'}
              ></label>
              <label
                maxWidthChars={25}
                truncate={true}
                justify={Gtk.Justification.LEFT}
                halign={Gtk.Align.START}
                valign={Gtk.Align.START}
                label={bind(spotify, "artist").as((artist) =>
                  artist ? artist : "",
                )}
                css={'font-family: "Sans"; font-size: 12px; color: #a3a3a3; '}
              ></label>
            </box>
          </box>
        </box>
      </revealer>
    </window>
  );
}
