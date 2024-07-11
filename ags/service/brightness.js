class Brightness extends Service {
  static {
    Service.register(
      this,
      {
        "screen-changed": ["float"],
      },
      {
        "screen-value": ["float", "rw"],
      },
    );
  }

  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");

  #value = 0;
  #max = Number(Utils.exec("brightnessctl max"));

  get screen_value() {
    return this.#value;
  }

  set screen_value(percent) {
    if (percent < 0) {
      percent = 0;
    }

    if (percent > 1) {
      percent = 1;
    }

    Utils.execAsync(`brightnessctl set ${percent * 100}% -q`);
  }

  constructor() {
    super();

    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());

    this.#onChange();
  }

  #onChange() {
    this.#value = Number(Utils.exec("brightnessctl get")) / this.#max;

    this.emit("screen-changed", this.#value);
    this.notify("screen-value");
  }
}

export default new Brightness();
