import { createBinding, createConnection } from "ags";
import { Astal, Gdk } from "ags/gtk4";
import AstalWp from "gi://AstalWp?version=0.1";
import { Brightness } from "../../service/brightness";
import { timeout } from "ags/time";
import AstalIO from "gi://AstalIO?version=0.1";

let time: AstalIO.Time;

function startTimeout(window: Astal.Window) {
  time = timeout(2500, () => window.hide());
}

function cancelTimeout() {
  if (time) time.cancel();
}

const speaker = AstalWp.get_default()!.defaultSpeaker;
const brightness = Brightness.get_default();

export default function Sliders(gdkmonitor: Gdk.Monitor) {
  const { TOP } = Astal.WindowAnchor;
  let init = true;
  let win: Astal.Window;

  return (
    <window
      anchor={TOP}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      class="bg-transparent"
      $={(self) => (win = self)}
    >
      <stack
        widthRequest={200}
        class="mt-3 bg-surface rounded-xl pt-1.5 pb-1.5 pl-2.5 pr-1.5 border-2 border-solid border-muted"
        visibleChildName={createConnection(
          "audio",
          [
            speaker,
            // For some reason, the volume-icon signal works when the volume changes,
            // not necessarily when the icon changes.
            // Additionally, it gets triggered on startup ?????????
            "notify::volume-icon",
            () => {
              // Workaround so on startup the window doesn't show
              if (!init) {
                cancelTimeout();
                win.show();
                startTimeout(win);
              } else init = false;
              return "audio";
            },
          ],
          [
            brightness,
            "notify::screen",
            () => {
              cancelTimeout();
              win.show();
              startTimeout(win);
              return "brightness";
            },
          ],
        )}
      >
        <box $type="named" name="audio">
          <image iconName={createBinding(speaker, "volumeIcon")} />
          <slider
            hexpand={true}
            min={0}
            max={1}
            value={createBinding(speaker, "volume")}
            onChangeValue={(_source, _, value) => {
              speaker.volume = value;
              return;
            }}
          />
        </box>
        <box $type="named" name="brightness">
          <image iconName={createBinding(brightness, "iconName")} />
          <slider
            hexpand={true}
            min={0}
            max={1}
            value={createBinding(brightness, "screen")}
            onChangeValue={(_source, _, value) => {
              brightness.screen = value;
              return;
            }}
          />
        </box>
      </stack>
    </window>
  );
}
