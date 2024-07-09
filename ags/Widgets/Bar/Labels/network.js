const net = await Service.import("network");

const net_icons = { "connected": " ", "disconnected": "󰖪 " };

export default Widget.Label({
  justification: "center",
  class_name: "utils",
  setup: (self) =>
    self.hook(net, () => self.label = `${net_icons[net.wifi.internet]}`),
});
