import { AstalIO, timeout } from "astal";
import { Gtk } from "astal/gtk3";

let time: AstalIO.Time;

export function startTimeout(window: Gtk.Widget) {
  time = timeout(2500, () => window.hide());
}

export function cancelTimeout() {
  if (time) time.cancel();
}
