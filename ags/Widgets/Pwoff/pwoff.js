import { Power_Button } from "./../QuickMenu/quickmenu.js";
import { Fill_Box } from "./../QuickMenu/utils.js";

const Cancel = Widget.Button({
  className: "pwoff_button",
  label: "Cancelar",
});

const Apagar = Widget.Button({
  className: "pwoff_button",
  label: "Apagar",
  on_clicked: () => Utils.execAsync("/usr/bin/env fish -c pwoff"),
});

const Mensaje = Widget.Label({
  className: "pwoff_message",
  vpack: "center",
  justification: "left",
  useMarkup: true,
  label: "<span size='x-large'>Apagado automático en 10</span>",
});

const Box = Widget.Box({
  vpack: "center",
  hpack: "center",
  vertical: true,
  className: "pwoff_box",
  homogeneous: true,
  children: [
    Mensaje,
    Widget.Box({
      css: "padding: 0px;",
      vpack: "end",
      homogeneous: true,
      children: [Cancel, Apagar],
    }),
  ],
});

const Center_Box = Widget.Box({
  children: [Fill_Box(), Box, Fill_Box()],
});

Power_Button.connect("button-press-event", () => {
  let i = 9;
  const source = setInterval(
    () => {
      Mensaje.label = `<span size='x-large'>Apagado automático en ${i}</span>`;
      i--;
      if (i < 0) {
        source.destroy();
        Utils.execAsync("/usr/bin/env fish -c pwoff");
      }
    },
    1000,
  );
  Cancel.on_clicked = () => {
    source.destroy();
    Utils.execAsync('ags -t "pwoff"');
    setTimeout(
      () =>
        Mensaje.label = "<span size='x-large'>Apagado automático en 10</span>",
      1000,
    );
  };
});

export default Widget.Window({
  css: "background: transparent;",
  child: Widget.Box({
    vertical: true,
    children: [Fill_Box(), Center_Box, Fill_Box()],
  }),
  anchor: ["top", "left", "right", "bottom"],
  name: "pwoff",
  exclusivity: "normal",
  visible: false,
});
