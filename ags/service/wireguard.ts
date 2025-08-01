import { getter, iface, methodAsync, Service } from "ags/dbus";
import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";

@iface("org.freedesktop.NetworkManager")
export class NetworkManager extends Service {
  @getter("ao") get AllDevices(): Array<string> { return [""] }
  @getter("o") get PrimaryConnection(): string { return "" }
  @getter("s") get PrimaryConnectionType(): string { return "" }
}

@iface("org.freedesktop.NetworkManager.Device")
class Device extends Service {
  @getter("s") get IpInterface(): string { return "" }
}

@iface("org.freedesktop.DBus.Introspectable")
class Introspectable extends Service {
  @methodAsync([], ["s"])
  async Introspect(): Promise<string> { return "" }
}

@register({ GTypeName: "Wireguard" })
export class Wireguard extends GObject.Object {
  static #instance: Wireguard;
  static get_default() {
    if (!this.#instance) this.#instance = new Wireguard();
    return this.#instance;
  }

  #nproxy: NetworkManager = new NetworkManager()
  #device: Device = new Device()
  #updateDevice() {
    for (const objpath of this.#nproxy.AllDevices) {
      new Introspectable().proxy({
        bus: Gio.DBus.system,
        name: "org.freedesktop.NetworkManager",
        objectPath: objpath
      }).then(i =>
        i.Introspect().then(xml => {
          for (const line of xml) {
            if (line.includes("org.freedesktop.NetworkManager.Device.WireGuard")) {
              new Device().proxy({
                bus: Gio.DBus.system,
                name: "org.freedesktop.NetworkManager",
                objectPath: objpath
              }).then(device => {
                this.#device = device
                this.notify("device")
              })
              return
            }
          }
        })
      )
    }
  }

  @ogetter(Device)
  get device() {
    return this.#device
  }

  constructor() {
    super();
    new NetworkManager().proxy({
      bus: Gio.DBus.system,
      name: "org.freedesktop.NetworkManager",
      objectPath: "/org/freedesktop/NetworkManager"
    }).then(value => {
      this.#nproxy = value;
      this.#updateDevice();
      this.#nproxy.connect("notify::all-devices", () => this.#updateDevice())
    })
  }
}
