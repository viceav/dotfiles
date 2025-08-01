import { getter, iface, Service } from "ags/dbus";
import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";
import { NetworkManager } from "./wireguard";

@iface("org.freedesktop.NetworkManager.Connection.Active")
class VpnConnection extends Service {
  @getter("s") get Id(): string { return "" }
}

@register({ GTypeName: "Vpn" })
export class Vpn extends GObject.Object {
  static #instance: Vpn;
  static get_default() {
    if (!this.#instance) this.#instance = new Vpn();
    return this.#instance;
  }

  #nproxy: NetworkManager = new NetworkManager()
  #vpnconnection: VpnConnection = new VpnConnection();
  #updateVpnConnection() {
    if (this.#nproxy.PrimaryConnectionType == "vpn") {
      new VpnConnection().proxy({
        bus: Gio.DBus.system,
        name: "org.freedesktop.NetworkManager",
        objectPath: this.#nproxy.PrimaryConnection
      }).then(connection => {
        this.#vpnconnection = connection;
        this.notify("id");
      })
    } else {
      this.#vpnconnection = new VpnConnection();
      this.notify("id");
    }
  }

  @ogetter(String)
  get id() {
    return this.#vpnconnection.Id
  }

  constructor() {
    super();
    new NetworkManager().proxy({
      bus: Gio.DBus.system,
      name: "org.freedesktop.NetworkManager",
      objectPath: "/org/freedesktop/NetworkManager"
    }).then(value => {
      this.#nproxy = value;
      this.#updateVpnConnection();
      this.#nproxy.connect("notify::primary-connection-type", () => this.#updateVpnConnection())
    })
  }
}
