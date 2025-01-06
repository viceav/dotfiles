import { bind } from "astal";
import AstalBattery from "gi://AstalBattery?version=0.1";

const battery = AstalBattery.get_default();

const battery_icons: { [key: string]: { [key1: string]: string } } = {
  "10": { discharging: "󰁺", charging: "󰢜" },
  "20": { discharging: "󰁻", charging: "󰂆" },
  "30": { discharging: "󰁼", charging: "󰂇" },
  "40": { discharging: "󰁽", charging: "󰂈" },
  "50": { discharging: "󰁾", charging: "󰢝" },
  "60": { discharging: "󰁿", charging: "󰂉" },
  "70": { discharging: "󰂀", charging: "󰢞" },
  "80": { discharging: "󰂁", charging: "󰂊" },
  "90": { discharging: "󰂂", charging: "󰂋" },
  "100": { discharging: "󰁹", charging: "󰂅" },
};

export default function () {
  return (
    <label
      label={bind(battery, "percentage").as((p) => {
        let indicator: string;
        const state: string = battery.charging ? "charging" : "discharging";
        let value: number = Math.floor(p * 100);
        if (value === 100) indicator = "100";
        else if (value >= 90) indicator = "90";
        else if (value >= 80) indicator = "80";
        else if (value >= 70) indicator = "70";
        else if (value >= 60) indicator = "60";
        else if (value >= 50) indicator = "50";
        else if (value >= 40) indicator = "40";
        else if (value >= 30) indicator = "30";
        else if (value >= 20) indicator = "20";
        else {
          indicator = "10";
        }
        return `${battery_icons[indicator][state]}`;
      })}
      tooltipText={bind(battery, "percentage").as(
        (p) => Math.floor(p * 100) + "%",
      )}
      css={bind(battery, "percentage").as(() => {
        switch (battery.state) {
          case AstalBattery.State.CHARGING:
            return "color: green";
          case AstalBattery.State.DISCHARGING:
            if (battery.percentage <= 0.1) return " color: red ";
            else if (battery.percentage <= 0.2) return " color: yellow ";
            else {
              return " color: white ";
            }
        }
      })}
    ></label>
  );
}
