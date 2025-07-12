import GObject, { register, getter, setter } from "ags/gobject";
import { monitorFile, readFileAsync } from "ags/file";
import { exec, execAsync } from "ags/process";

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);

const icon: (value: number) => string = (value: number) => {
  if (value == 0) return "display-brightness-off-symbolic";
  if (value <= 0.33) return "display-brightness-low-symbolic"
  if (value <= 0.66) return "display-brightness-medium-symbolic"
  return "display-brightness-high-symbolic"
};

@register({ GTypeName: "Brightness" })
export class Brightness extends GObject.Object {
  static #instance: Brightness;
  static get_default() {
    if (!this.#instance) this.#instance = new Brightness();
    return this.#instance;
  }

  #screenMax = get("max");
  #screen = get("get") / (get("max") || 1);
  #iconName = icon(this.#screen);

  @getter(String)
  get iconName() {
    return this.#iconName;
  }

  @getter(Number)
  get screen() {
    return this.#screen;
  }

  @setter(Number)
  set screen(percent) {
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    // We just use brightnessctl as we are monitoring the file to
    // update and notify fields
    execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`)
  }

  constructor() {
    super();

    const screenPath = `/sys/class/backlight/${screen}/brightness`;

    monitorFile(screenPath, async (f) => {
      const v = await readFileAsync(f);
      const value = Number(v) / this.#screenMax;
      if (value != this.#screen) {
        const newIcon = icon(value);
        if (this.#iconName != newIcon) {
          this.#iconName = newIcon;
          this.notify("icon-name");
        }
        this.#screen = value;
        this.notify("screen");
      }
    });
  }
}
