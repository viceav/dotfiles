const audio = await Service.import("audio");

const audio_icons = {
  "muted": "",
  "off": "",
  "low": "",
  "medium": "",
  "high": "",
};

export default Widget.Label({
  justification: "center",
  class_name: "utils",
  setup: (self) =>
    self.hook(audio.speaker, () => {
      const value = audio.speaker.volume;
      let state = "state";
      if (value > 0.7) state = "high";
      else if (value > 0.4) state = "medium";
      else state = "low";
      if (audio.speaker.stream?.isMuted) state = "muted";
      self.label = `${audio_icons[state]}`;
    }),
});
