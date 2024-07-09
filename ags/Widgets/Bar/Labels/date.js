const get_date = () => Utils.execAsync('date +"%a %d | %R"');

export default Widget.Label({
  hexpand: false,
  hpack: "center",
  setup: (self) => {
    Utils.interval(1000, () => {
      get_date().then((str) => self.label = str).catch(() =>
        self.label = "Error"
      );
    });
  },
});
