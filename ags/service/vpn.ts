import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";
import { ActiveConnection,NetworkManager } from "./wireguard";

@register({ GTypeName: "Vpn" })
export class Vpn extends GObject.Object {
  static #instance: Vpn;
  static get_default() {
    if (!this.#instance) this.#instance = new Vpn();
    return this.#instance;
  }

  #nproxy: NetworkManager = new NetworkManager()
  #vpnconnection: ActiveConnection = new ActiveConnection();
  #updateActiveConnection() {
    if (this.#nproxy.PrimaryConnectionType == "vpn") {
      new ActiveConnection().proxy({
        bus: Gio.DBus.system,
        name: "org.freedesktop.NetworkManager",
        objectPath: this.#nproxy.PrimaryConnection
      }).then(connection => {
        this.#vpnconnection = connection;
        this.notify("id");
      })
    } else {
      this.#vpnconnection = new ActiveConnection();
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
      this.#updateActiveConnection();
      this.#nproxy.connect("notify::primary-connection-type", () => this.#updateActiveConnection())
    })
  }
}
