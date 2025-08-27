import app from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { createState, For } from "ags";
import AstalApps from "gi://AstalApps?version=0.1";
import { exec } from "ags/process";
import { monitorFile } from "ags/file";
import GLib from "gi://GLib?version=2.0";

const apps = new AstalApps.Apps();
const [children, setChildren] = createState(
  apps.list.sort((a, b) => a.name.localeCompare(b.name)),
);

function reload() {
  apps.reload();
  setChildren(apps.list.sort((a, b) => a.name.localeCompare(b.name)));
}

monitorFile(`${GLib.getenv("HOME")}/.local/share/applications`, () => reload());
monitorFile("/usr/share/applications", () => reload());

const openApp = (executable: String, window: Astal.Window) => {
  exec(`niri msg action spawn -- ${executable}`.replace(/%[uU/]/g, ""));
  window.hide();
};

export default function Apps(gdkmonitor: Gdk.Monitor) {
  let win: Astal.Window;
  let entry: Gtk.Entry;
  let box: Gtk.Box;
  const { TOP, LEFT } = Astal.WindowAnchor;

  function onKey(_source: Gtk.EventControllerKey, keyval: number) {
    if (keyval == Gdk.KEY_Escape) win.hide();
  }

  return (
    <window
      name="apps"
      class="bg-transparent"
      widthRequest={gdkmonitor.geometry.width / 4}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT}
      application={app}
      keymode={Astal.Keymode.ON_DEMAND}
      onMap={() => entry.grab_focus()}
      $={(self) => (win = self)}
    >
      <Gtk.EventControllerKey onKeyPressed={onKey} />
      <box orientation={Gtk.Orientation.VERTICAL} class="mt-2.5 ml-2.5">
        <entry
          class="rounded-t-2xl bg-surface-alt rounded-b-none text-xl p-2 border-l-2 border-t-2 border-r-2 border-solid border-muted"
          onNotifyText={(self) =>
            setChildren(
              apps
                .fuzzy_query(self.text)
                .sort((a, b) => a.name.localeCompare(b.name)),
            )
          }
          onUnmap={(self) => (self.text = "")}
          $={(self) => (entry = self)}
          onActivate={() => {
            const button = box.get_first_child();
            if (button) button.activate();
          }}
          onNotifyHasFocus={(self) => {
            const text = self.get_first_child()!;
            const button = box.get_first_child();
            if (button) {
              if (text.has_focus) {
                button.remove_css_class("bg-transparent");
                button.add_css_class("bg-purple");
              } else {
                button.remove_css_class("bg-purple");
                button.add_css_class("bg-transparent");
              }
            }
          }}
        ></entry>
        <box
          orientation={Gtk.Orientation.VERTICAL}
          $={(self) => (box = self)}
          class="bg-surface rounded-b-xl border-l-2 border-b-2 border-r-2 border-solid border-muted"
        >
          <For each={children}>
            {(app: AstalApps.Application, index) => (
              <button
                class={index.as((i) =>
                  i == 0
                    ? "bg-purple rounded-none text-lg app-btn transition-none"
                    : "bg-transparent rounded-none text-lg app-btn transition-none",
                )}
                onActivate={() => openApp(app.executable, win)}
              >
                <box spacing={5}>
                  <image
                    iconName={app.iconName}
                    iconSize={Gtk.IconSize.LARGE}
                  />
                  <label label={app.name} />
                </box>
              </button>
            )}
          </For>
        </box>
      </box>
    </window>
  );
}
