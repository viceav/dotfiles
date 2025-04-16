import { bind, execAsync } from "astal";
import AstalNiri from "gi://AstalNiri?version=0.1";

const niri = AstalNiri.get_default();

export default function Hyprland() {
  return (
    <box spacing={5}>
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
                onClick={() =>
                  execAsync(`niri msg action focus-workspace ${ws.id}`)
                }
              ></button>
            )),
        )}
      </box>
      <label
        maxWidthChars={50}
        truncate={true}
        className={"WindowTitle"}
        label={bind(niri, "focusedWindow").as((win) => (win ? win.title : ""))}
      ></label>
    </box>
  );
}
