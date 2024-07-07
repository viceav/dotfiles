import Battery from "./battery.js";
import Workspaces from "./hyprland.js";
import Network from "./network.js";
import Audio from "./audio.js";
const mpris = await Service.import("mpris");

const spotify_info = () => {
  const spotify = mpris.getPlayer("org.mpris.MediaPlayer2.spotify");
  const track_name = spotify?.track_title;
  const track_artist = spotify?.track_artists[0];
  const cover_path = spotify?.cover_path;

  return { track_name, track_artist, cover_path };
};

const Track_Name_Label = Widget.Label({
  className: "track name",
  justification: "left",
});

const Track_Name_Artist = Widget.Label({
  className: "track artist",
  justification: "left",
});

const Main_Box = Widget.Box({
  vertical: true,
  setup: (self) => {
    const track_name_label = Track_Name_Label;
    const track_name_artist = Track_Name_Artist;
    self.children = [track_name_label, track_name_artist];
    self.hook(mpris, (self) => {
      const spotify = spotify_info();
      track_name_label.label = spotify.track_name;
      track_name_artist.label = spotify.track_artist;
    });
  },
});

// Declaring the Window Menu
const Window_Menu = Widget.Window({
  name: "Window-Menu",
  anchor: ["top", "right"],
  child: Widget.Box({
    css: "padding: 5px;",
    child: Widget.Revealer({
      revealChild: false,
      transition: "slide_down",
      transition_duration: 1000,
      child: Main_Box,
    }),
  }),
});

const Utils = Widget.EventBox({
  hpack: "end",
  child: Widget.Box({
    children: [Network, Audio, Battery],
  }),
  on_hover: () => Window_Menu.child.child.set_reveal_child(true),
});

const Bar_Container = Widget.CenterBox({
  className: "container",
  startWidget: Workspaces,
  endWidget: Utils,
});

export default Widget.Window({
  exclusivity: "exclusive",
  child: Bar_Container,
  name: "Main-Bar",
  anchor: ["top", "left", "right"],
});
