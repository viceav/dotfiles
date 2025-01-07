import { bind } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import AstalBattery from "gi://AstalBattery?version=0.1";

const battery = AstalBattery.get_default();
const { LEFT, TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;

const win = (
  <window
    anchor={LEFT | TOP | RIGHT | BOTTOM}
    className={"Battery"}
    keymode={Astal.Keymode.ON_DEMAND}
    layer={Astal.Layer.OVERLAY}
    exclusivity={Astal.Exclusivity.IGNORE}
    visible={false}
  >
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      setup={(self) => {
        const percentage = bind(battery, "percentage").as((p) =>
          Math.floor(p * 100),
        );
        const state = bind(battery, "state");
        let pop: boolean | null = null;
        self.hook(percentage, () => {
          if (
            percentage.get() <= 15 &&
            state.get() === AstalBattery.State.DISCHARGING &&
            pop === null
          ) {
            win.visible = true;
            pop = true;
            self.hook(state, () => {
              switch (state.get()) {
                case AstalBattery.State.CHARGING:
                  win.visible = false;
                  break;

                default:
                  break;
              }
            });
          } else {
            win.visible = false;
          }
        });
      }}
      vertical={true}
    >
      <label
        label={bind(battery, "percentage").as(
          (p) => `Batería Baja (${Math.floor(p * 100)}%)`,
        )}
        halign={Gtk.Align.START}
        className={"main"}
      ></label>
      <label
        label={"Conectar a la Corriente Eléctrica"}
        halign={Gtk.Align.START}
      ></label>
      <button
        onClicked={() => (win.visible = false)}
        label={"Exit"}
        halign={Gtk.Align.END}
      ></button>
    </box>
  </window>
);

export default () => win;
