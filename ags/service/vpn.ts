import { getter, iface, Service } from "ags/dbus";
import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";

@iface("org.freedesktop.NetworkManager")
class NetworkManager extends Service {
  @getter("ao") get ActiveConnections(): Array<string> {
    return [""];
  }
}

@iface("org.freedesktop.NetworkManager.Connection.Active")
class ActiveConnection extends Service {
  @getter("s") get Type(): string {
    return "";
  }
  @getter("s") get Id(): string {
    return "";
  }
  @getter("u") get State(): number {
    return 0;
  }
}

@register({ GTypeName: "Vpn" })
export class Vpn extends GObject.Object {
  static #instance: Vpn;
  static get_default() {
    if (!this.#instance) this.#instance = new Vpn();
    return this.#instance;
  }

  #nproxy: NetworkManager = new NetworkManager();
  #emptyConnection: ActiveConnection = new ActiveConnection();
  #activeConnection: ActiveConnection = this.#emptyConnection;
  #updateConnection() {
    for (const objpath of this.#nproxy.ActiveConnections) {
      new ActiveConnection()
        .proxy({
          bus: Gio.DBus.system,
          name: "org.freedesktop.NetworkManager",
          objectPath: objpath,
        })
        .then((conn) => {
          if (conn.Type == "wireguard" || conn.Type == "vpn") {
            if (conn.State == 1 || conn.State == 2) {
              this.#activeConnection = conn;
              this.#notifyProperties();
              return;
            }
          }
        })
        .catch((_) => {});
    }
    this.#activeConnection = this.#emptyConnection;
    this.#notifyProperties();
  }
  #notifyProperties() {
    this.notify("id");
    this.notify("icon-name");
  }

  @ogetter(String)
  get id() {
    return this.#activeConnection.Id;
  }

  @ogetter(String)
  get iconName() {
    if (this.#activeConnection.Type == "wireguard") {
      return "protonvpn-logo";
    } else if (this.#activeConnection.Type == "vpn") {
      return "openvpn";
    }
    return "";
  }

  constructor() {
    super();
    new NetworkManager()
      .proxy({
        bus: Gio.DBus.system,
        name: "org.freedesktop.NetworkManager",
        objectPath: "/org/freedesktop/NetworkManager",
      })
      .then((value) => {
        this.#nproxy = value;
        this.#updateConnection();
        this.#nproxy.connect("notify::active-connections", () =>
          this.#updateConnection(),
        );
      });
  }
}
