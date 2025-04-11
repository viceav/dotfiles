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
      label={bind(network, "state").as((state) => {
        switch (state) {
          case AstalNetwork.State.CONNECTING:
            return net_icons.connecting;
          case AstalNetwork.State.CONNECTED_GLOBAL:
            return net_icons.connected;
          case AstalNetwork.State.DISCONNECTED:
            return net_icons.disconnected;
          default:
            return net_icons.connecting;
        }
      })}
      tooltipText={bind(network, "state").as((state) => {
        if (state === AstalNetwork.State.CONNECTED_GLOBAL) {
          return network.wifi.ssid;
        } else if (state === AstalNetwork.State.CONNECTING) {
          return "Connecting...";
        } else if (state === AstalNetwork.State.DISCONNECTED) {
          return "Disconnected";
        } else {
          return "...";
        }
      })}
    ></label>
  );
}
