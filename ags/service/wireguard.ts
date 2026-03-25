import { getter, iface, Service } from "ags/dbus";
import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";

@iface("org.freedesktop.NetworkManager")
export class NetworkManager extends Service {
  @getter("ao") get ActiveConnections(): Array<string> {
    return [""];
  }
  @getter("o") get PrimaryConnection(): string {
    return "";
  }
  @getter("s") get PrimaryConnectionType(): string {
    return "";
  }
}

@iface("org.freedesktop.NetworkManager.Connection.Active")
export class ActiveConnection extends Service {
  @getter("s") get Type(): string {
    return "";
  }
  @getter("s") get Id(): string {
    return "";
  }
}

@register({ GTypeName: "Wireguard" })
export class Wireguard extends GObject.Object {
  static #instance: Wireguard;
  static get_default() {
    if (!this.#instance) this.#instance = new Wireguard();
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
          if (conn.Type == "wireguard") {
            this.#activeConnection = conn;
            this.notify("active-connection");
            return;
          }
        })
        .catch((_) => {});
    }
    this.#activeConnection = this.#emptyConnection;
    this.notify("active-connection");
  }

  @ogetter(ActiveConnection)
  get activeConnection() {
    return this.#activeConnection;
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
