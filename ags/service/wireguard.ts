import { getter, iface, Service } from "ags/dbus";
import Gio from "gi://Gio?version=2.0";

@iface("org.freedesktop.NetworkManager")
class NetworkManager extends Service {
  @getter("ao") get AllDevices(): Array<string> { return [""] }
}

@iface("org.freedesktop.NetworkManager.Device")
class Device extends Service {
  @getter("s") get Driver(): string { return "" }
  @getter("o") get ActiveConnection(): string { return "" }
}

async function getWireguard(): Promise<Device | undefined> {
  const nproxy = await new NetworkManager().proxy({
    bus: Gio.DBus.system,
    name: "org.freedesktop.NetworkManager",
    objectPath: "/org/freedesktop/NetworkManager"
  })

  for (const objpath of nproxy.AllDevices) {
    const device = await new Device().proxy({
      bus: Gio.DBus.system,
      name: "org.freedesktop.NetworkManager",
      objectPath: objpath
    })

    if (device.Driver == "wireguard") return device;
  }
}

export const Wireguard: Device | undefined = await getWireguard()
