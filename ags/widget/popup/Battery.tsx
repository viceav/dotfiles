import { createBinding, createRoot, onCleanup } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import AstalBattery from "gi://AstalBattery?version=0.1";

const battery = AstalBattery.get_default();

export default function BatteryPopup(gdkmonitor: Gdk.Monitor) {
  battery.connect("notify::percentage", () => {
    if (
      (battery.percentage == 0.15 && !battery.charging) ||
      (battery.percentage == 0.1 && !battery.charging)
    ) {
      createRoot((dispose) => {
        const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor;
        <window
          visible
          class="bg-transparent"
          anchor={TOP | LEFT | BOTTOM | RIGHT}
          layer={Astal.Layer.OVERLAY}
          gdkmonitor={gdkmonitor}
          $={(self) => {
            const id = battery.connect("notify::charging", () => {
              if (battery.charging) dispose();
            });
            onCleanup(() => {
              battery.disconnect(id);
              self.destroy();
            });
          }}
        >
          <box
            class={
              "bg-surface rounded-xl border-2 border-solid border-muted p-5"
            }
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            orientation={Gtk.Orientation.VERTICAL}
          >
            <label
              class={"text-5xl"}
              halign={Gtk.Align.START}
              label={createBinding(battery, "percentage").as(
                (p) => `Batería baja: ${Math.floor(p * 100)}%`,
              )}
            />
            <label
              class={"text-lg"}
              halign={Gtk.Align.START}
              label={"Conectar a la Corriente Eléctrica"}
            />
            <button
              class={"bg-surface-alt"}
              halign={Gtk.Align.END}
              label={"Salir"}
              onClicked={() => dispose()}
            />
          </box>
        </window>;
      });
    }
  });
}
