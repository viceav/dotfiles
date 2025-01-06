import { Variable } from "astal";
import GLib from "gi://GLib?version=2.0";

export default function Time({ format = "%a %d | %R" }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );
  return <label label={time()}></label>;
}
