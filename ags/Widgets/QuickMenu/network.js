import { Box, Exit } from "./utils.js";
const net = await Service.import("network");

const Switch = Widget.Switch({
  hpack: "end",
  vpack: "center",
  active: net.wifi.bind("enabled"),
  on_activate: ({ active }) => net.wifi.enabled = active,
});

const First_Box = Widget.Box({
  className: "box",
  children: [
    Exit(),
    Widget.Button({
      class_name: "reload",
      hpack: "end",
      hexpand: true,
      label: "󰑓",
    }),
    Switch,
  ],
});

const Wifi_Icon = () =>
  Widget.Label({
    css: "font-size: 25px;",
    label: "󰤨",
  });

const access_points = net.wifi.access_points.filter((val, i, array) => {
  if (
    val.ssid != "Unknown" &&
    array.findIndex((element) => element.ssid == val.ssid) === i
  ) {
    return val;
  }
});

const Last_Box = Widget.Box({
  vertical: true,
  class_name: "box",
  children: access_points.map((value) => {
    if (value.active) {
      return Widget.EventBox({
        child: Widget.Box({
          children: [
            Wifi_Icon(),
            Widget.Box({
              vertical: true,
              children: [
                Widget.Label({ label: value.ssid }),
                Widget.Label({ label: net.wifi.internet }),
              ],
            }),
          ],
        }),
      });
    } else {
      return Widget.EventBox({
        child: Widget.Box({
          children: [
            Wifi_Icon(),
            Widget.Label({ label: value.ssid }),
          ],
        }),
      });
    }
  }),
});

export const Network_Box = Box([First_Box, Last_Box]);
