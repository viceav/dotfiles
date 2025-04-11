import AstalNiri from "gi://AstalNiri?version=0.1";

const niri = AstalNiri.get_default();

export default function Hyprland() {
  return (
    <box
      setup={(self) =>
        self.hook(niri, "workspace-activated", () => {
          self.children = niri
            .get_workspaces()
            .map((ws) => (
              <button
                vexpand={false}
                hexpand={false}
                name={ws.name}
                className={ws.id === niri.focused_workspace_id ? "active" : ""}
              ></button>
            ));
        })
      }
    ></box>
  );
  // return (
  //   <box>
  //     {bind(niri, "workspaces").as((wss) =>
  //       wss
  //         .sort((a, b) => a.id - b.id)
  //         .map((ws) => (
  //           <button
  //             name={ws.name}
  //             setup={(self) =>
  //               self.hook(niri, "event", () =>
  //                 self.toggleClassName(
  //                   "active",
  //                   ws.id === niri.focusedWorkspace.id,
  //                 ),
  //               )
  //             }
  //           ></button>
  //         )),
  //     )}
  //   </box>
  // );
}
