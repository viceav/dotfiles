import { bind } from "astal";
import AstalWp from "gi://AstalWp?version=0.1";

const wp = AstalWp.get_default()?.audio.defaultSpeaker!;

enum audio_icons {
  muted = "",
  low = "",
  medium = "",
  high = "",
}
export default function Audio() {
  return (
    <label
      label={bind(wp, "volumeIcon").as(() => {
        const vol = wp.volume;
        if (wp.mute) return audio_icons.muted;
        let state: audio_icons;
        if (vol > 0.8) state = audio_icons.high;
        else if (vol > 0.4) state = audio_icons.medium;
        else if (vol > 0) state = audio_icons.low;
        else state = audio_icons.muted;
        return state;
      })}
    ></label>
  );
}
