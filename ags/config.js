import Bar from "./Widgets/Bar/bar.js";
import QuickMenu from "./Widgets/QuickMenu/quickmenu.js";

App.config({
  windows: [Bar, QuickMenu],
  style: "./style.css",
});

QuickMenu.connect(
  "notify::visible",
  (self) => {
    const eventbox = Bar.child.children[2];
    eventbox.toggleClassName("eventbox_active", self.visible);
  },
);
