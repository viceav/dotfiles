import { getter, iface, Service } from "ags/dbus";
import GObject, { register, getter as ogetter } from "ags/gobject";
import Gio from "gi://Gio?version=2.0";

@iface("org.freedesktop.NetworkManager")
class NetworkManager extends Service {
  @getter("ao") get AllDevices(): Array<string> { return [""] }
}

@iface("org.freedesktop.NetworkManager.Device")
class Device extends Service {
  @getter("s") get IpInterface(): string { return "" }
}

@iface("org.freedesktop.NetworkManager.Device.Wireguard")
class WDevice extends Service { }

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
      new WDevice().proxy({
        bus: Gio.DBus.system,
        name: "org.freedesktop.NetworkManager",
        objectPath: objpath
      }).catch(() => { })
        .then(() => {
          new Device().proxy({
            bus: Gio.DBus.system,
            name: "org.freedesktop.NetworkManager",
            objectPath: objpath
          }).then(device => {
            this.#device = device
            this.notify("device")
          }
          )
        })
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
