const Exit = Widget.Button({
  className: "exit",
  vpack: "center",
  hpack: "start",
  label: "<",
});

const Switch = Widget.Switch({
  vpack: "center",
  hpack: "end",
});

export const Base_Box = Widget.Box({
  homogeneous: true,
  children: [Exit, Switch],
});

export const Box = () =>
  Widget.Box({
    widthRequest: 300,
    vertical: true,
    className: "container",
  });
