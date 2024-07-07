const hypr = await Service.import("hyprland");

export default Widget.Box({
  hpack: "start",
  children: Array.from({ length: 5 }, (_, i) => i + 1).map((i) =>
    Widget.Label({
      setup: (self) =>
        self.hook(hypr.active.workspace, () => {
          if (
            i === hypr.active.workspace.id ||
            (hypr.active.workspace.id >= 5 && i == 5)
          ) {
            self.class_name = "Workspace active";
            self.label = "";
          } else {
            self.class_name = "Workspace inactive";
            self.label = "󰺠 ";
          }
        }),
    })
  ),
});
