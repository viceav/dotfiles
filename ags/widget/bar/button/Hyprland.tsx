import { bind } from "astal";
import AstalHyprland from "gi://AstalHyprland?version=0.1";

const hyprland = AstalHyprland.get_default();

export default function Hyprland() {
  return (
    <box>
      {bind(hyprland, "workspaces").as((wss) =>
        wss
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              onClicked={() => ws.focus()}
              name={ws.id.toString()}
              setup={(self) =>
                self.hook(hyprland, "event", () =>
                  self.toggleClassName(
                    "active",
                    ws.id === hyprland.focusedWorkspace.id,
                  ),
                )
              }
            ></button>
          )),
      )}
    </box>
  );
}
