import { bind } from "astal";
import AstalNetwork from "gi://AstalNetwork?version=0.1";

const network = AstalNetwork.get_default();

enum net_icons {
  connecting = "󱛇",
  connected = "",
  disconnected = "󰖪",
}
export default function Wifi() {
  return (
    <label
      label={bind(network, "state").as(() => {
        switch (network.wifi.internet) {
          case AstalNetwork.Internet.CONNECTING:
            return net_icons.connecting;
          case AstalNetwork.Internet.CONNECTED:
            return net_icons.connected;
          case AstalNetwork.Internet.DISCONNECTED:
            return net_icons.disconnected;
        }
      })}
      tooltipText={bind(network, "state").as(() => {
        const wifi = network.wifi;
        if (wifi.internet === AstalNetwork.Internet.CONNECTED) {
          return wifi.ssid;
        } else if (wifi.internet === AstalNetwork.Internet.CONNECTING) {
          return "Connecting...";
        }
        return "Disconnected";
      })}
    ></label>
  );
}
