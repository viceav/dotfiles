import { bind } from "astal";
import Brightness from "../../../service/brightness";

const brightness = Brightness.get_default();

enum brightness_icons {
  "󰃚",
  "󰃛",
  "󰃜",
  "󰃝",
  "󰃞",
  "󰃟",
  "󰃠",
}
export default function () {
  return (
    <label
      label={bind(brightness, "screen").as((br) => {
        const times: number = 0.125;
        let label: string;
        if (br > times * 7) label = brightness_icons[6];
        else if (br > times * 6) label = brightness_icons[5];
        else if (br > times * 5) label = brightness_icons[4];
        else if (br > times * 4) label = brightness_icons[3];
        else if (br > times * 3) label = brightness_icons[2];
        else if (br > times * 2) label = brightness_icons[1];
        else label = brightness_icons[0];
        return label;
      })}
    ></label>
  );
}
