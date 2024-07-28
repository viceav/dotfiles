import Bar from "./Widgets/Bar/bar.js";
import QuickMenu from "./Widgets/QuickMenu/quickmenu.js";
import Pwoff from "./Widgets/Pwoff/pwoff.js";

App.config({
  windows: [Bar, QuickMenu, Pwoff],
  style: "./style.css",
});

QuickMenu.connect(
  "notify::visible",
  (self) => {
    const eventbox = Bar.child.children[2];
    eventbox.toggleClassName("eventbox_active", self.visible);
  },
);
