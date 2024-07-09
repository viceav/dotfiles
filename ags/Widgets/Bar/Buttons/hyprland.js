const hypr = await Service.import("hyprland");

const dispatch = (ws) => hypr.messageAsync(`dispatch workspace ${ws}`);

export default Widget.Box({
  hexpand: false,
  hpack: "start",
  spacing: 5,
  children: Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
    Widget.Button({
      vpack: "center",
      attribute: i,
      on_clicked: () => dispatch(i),
    })
  ),
  setup: (self) =>
    self.hook(hypr, () =>
      self.children.forEach((btn) => {
        btn.visible = hypr.workspaces.some((ws) => ws.id === btn.attribute);
        if (hypr.active.workspace.id === btn.attribute) {
          btn.class_name = "active";
        } else {
          btn.class_name = "inactive";
        }
      })),
});
