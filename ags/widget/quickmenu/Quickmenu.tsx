import { bind } from "astal";
import { App, Astal, Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "../../service/brightness";
import AstalMpris from "gi://AstalMpris?version=0.1";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import AstalBluetooth from "gi://AstalBluetooth?version=0.1";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;
const brightness = Brightness.get_default();
const spotify = AstalMpris.Player.new("spotify");
const network = AstalNetwork.get_default();
const bluetooth = AstalBluetooth.get_default();
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
      layer={Astal.Layer.OVERLAY}
      application={App}
    >
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        transitionDuration={500}
        setup={(self) => {
          self.hook(self, "map", () => {
            self.revealChild = true;
            const slider = App.get_window("Slider");
            if (slider) slider.hide();
          });
          self.hook(self, "unmap", () => (self.revealChild = false));
        }}
      >
        <box vertical={true}>
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
          <box homogeneous={true} spacing={5}>
            <button
              canFocus={false}
              label={""}
              className={bind(network, "state").as(() =>
                network.wifi.enabled ? "wifi-on" : "wifi-off",
              )}
              onClick={(self) => {
                const enabled = network.wifi.enabled;
                network.wifi.set_enabled(!enabled);
                self.className = enabled ? "wifi-off" : "wifi-starting";
              }}
            ></button>
            <button
              canFocus={false}
              label={"󰂯"}
              className={bind(bluetooth, "is_powered").as((powered) =>
                powered ? "bluetooth-on" : "bluetooth-off",
              )}
              onClick={() => {
                bluetooth.toggle();
              }}
            ></button>
          </box>
          <box spacing={10} className={"spotify"}>
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
                maxWidthChars={23}
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
