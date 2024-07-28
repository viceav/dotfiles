import { Box, Exit } from "./utils.js";
const net = await Service.import("network");

const Switch = Widget.Switch({
  hpack: "end",
  vpack: "center",
  active: net.wifi.bind("enabled"),
  on_activate: ({ active }) => net.wifi.enabled = active,
});

const First_Box = Widget.Box({
  homogeneous: true,
  className: "box",
  children: [Exit(), Switch],
});

export const Network_Box = Box([First_Box]);
