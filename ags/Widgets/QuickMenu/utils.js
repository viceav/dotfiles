import { Stack_Widget } from "./quickmenu.js";

export const Fill_Box = () =>
  Widget.Box({
    css: "background: inherit;",
    hexpand: true,
    vexpand: true,
  });

export const Exit = () =>
  Widget.Button({
    className: "exit",
    vpack: "center",
    hpack: "start",
    label: "",
    class_name: "back-button",
    on_clicked: () =>
      Stack_Widget.set_visible_child(Stack_Widget.children.main),
  });

const Menu_Button = () =>
  Widget.Button({
    className: "Menu_Button",
  });

export const Menu_Network = Menu_Button();
Menu_Network.set_label("");
Menu_Network.on_clicked = () =>
  Stack_Widget.set_visible_child(Stack_Widget.children.network);

export const Menu_Bluetooth = Menu_Button();
Menu_Bluetooth.set_label("");

export const Box = (children) =>
  Widget.Box({
    widthRequest: 300,
    vertical: true,
    className: "container",
    children: children,
  });
