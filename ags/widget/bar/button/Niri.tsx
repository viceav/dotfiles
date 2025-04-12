import { bind } from "astal";
import AstalNiri from "gi://AstalNiri?version=0.1";

const niri = AstalNiri.get_default();

export default function Hyprland() {
  return (
    <box>
      {bind(niri, "workspaces").as((wss) =>
        wss
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              name={ws.name}
              className={bind(ws, "isFocused").as((isFocused) =>
                isFocused ? "active" : "",
              )}
            ></button>
          )),
      )}
    </box>
  );
}
