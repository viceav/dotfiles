import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { Accessor, createBinding, createState, For, Setter } from "ags";
import AstalNiri from "gi://AstalNiri?version=0.1";
import AstalBattery from "gi://AstalBattery?version=0.1";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import { Brightness } from "../../service/brightness";

const niri = AstalNiri.get_default();
const battery = AstalBattery.get_default();
const wifi = AstalNetwork.get_default().wifi;
const speaker = AstalWp.get_default()!.defaultSpeaker;
const brightness = Brightness.get_default();

const [batteryInfo, setBatteryInfo]: [
  Accessor<[number, boolean]>,
  Setter<[number, boolean]>,
] = createState([battery.percentage, battery.charging]);

battery.connect("notify::percentage", (battery) =>
  setBatteryInfo([battery.percentage, battery.charging]),
);

battery.connect("notify::charging", (battery) =>
  setBatteryInfo([battery.percentage, battery.charging]),
);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date +'%a %d | %R'");
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="bar"
      class="bg-transparent"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox" class="bg-transparent mt-2.5">
        <box
          $type="start"
          spacing={5}
          class="ml-2.5 bg-surface rounded-xl p-1.5 border-2 border-solid border-muted"
        >
          <For each={createBinding(niri, "workspaces")}>
            {(ws: AstalNiri.Workspace) => (
              <button
                valign={Gtk.Align.CENTER}
                halign={Gtk.Align.CENTER}
                onClicked={() =>
                  execAsync(`niri msg action focus-workspace ${ws.id}`)
                }
                class={createBinding(ws, "isFocused").as((fs) =>
                  fs
                    ? "bg-purple min-h-3 min-w-4 rounded-xl p-0.5"
                    : "bg-primary min-h-3 min-w-3 rounded-xl p-0.5",
                )}
              />
            )}
          </For>
        </box>
        <box
          $type="center"
          class="ml-2.5 bg-surface rounded-xl p-1.5 border-2 border-solid border-muted"
        >
          <label label={time} class="text-sm font-bold" />
        </box>
        <box
          $type="end"
          spacing={7}
          class="mr-2.5 bg-surface rounded-xl p-1.5 border-2 border-solid border-muted"
        >
          <image iconName={createBinding(wifi, "iconName")} />
          <image
            tooltipText={createBinding(speaker, "volume").as((v) => {
              const volume = Math.ceil(v * 100);
              return volume.toString() + "%";
            })}
            iconName={createBinding(speaker, "volumeIcon")}
          />
          <image
            tooltipText={createBinding(brightness, "screen").as((v) => {
              const percentage = Math.ceil(v * 100);
              return percentage.toString() + "%";
            })}
            iconName={createBinding(brightness, "iconName")}
          />
          <image
            tooltipText={batteryInfo.as((v) => {
              const percentage = Math.ceil(v[0] * 100);
              return percentage.toString() + "%";
            })}
            iconName={createBinding(battery, "batteryIconName")}
            class={batteryInfo.as((v) => {
              if (v[1]) {
                return v[0] == 1 ? "" : "text-success";
              } else {
                return v[0] <= 0.2 ? "text-danger" : "";
              }
            })}
          />
        </box>
      </centerbox>
    </window>
  );
}
