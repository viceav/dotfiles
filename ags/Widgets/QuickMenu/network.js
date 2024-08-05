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

const filter_access = (array) =>
  array.filter((val, i, array) => {
    if (
      val.ssid != "Unknown" &&
      array.findIndex((element) => element.ssid == val.ssid) === i
    ) {
      return val;
    }
  });

const Access_Points = () =>
  filter_access(net.wifi.access_points).map((value) => {
    return Widget.EventBox({
      child: Widget.Box({
        children: [
          Wifi_Icon(),
          Widget.Box({
            vertical: true,
            children: [
              Widget.Label({
                hpack: "start",
                justification: "left",
                label: value.ssid,
              }),
              Widget.Label({
                hpack: "start",
                justification: "left",
                setup: (self) =>
                  self.hook(net, () => {
                    if (value.ssid == net.wifi.ssid) {
                      self.label = net.wifi.internet;
                    } else {
                      self.label = "";
                    }
                  }),
              }),
            ],
          }),
          //Widget.Entry({
          //  visibility: false,
          //  placeholderText: "Password",
          //}),
        ],
      }),
    });
  });

const Last_Box = Widget.Box({
  vertical: true,
  class_name: "box",
  children: Access_Points(),
});

const Reload_Button = First_Box.children[1];
Reload_Button.on_clicked = () => {
  net.wifi.scan();
  Last_Box.children.forEach((box) => box.destroy());
  Last_Box.children = Access_Points();
};

export const Network_Box = Box(
  [
    First_Box,
    Widget.Scrollable({
      child: Last_Box,
      propagateNaturalHeight: true,
      propagateNaturalWidth: true,
    }),
  ],
);

Switch.connect("notify::active", () => {
  if (!Switch.active) {
    Network_Box.remove(Last_Box);
  } else {
    Network_Box.add(Last_Box);
  }
});
