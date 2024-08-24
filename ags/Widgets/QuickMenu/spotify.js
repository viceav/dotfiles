const mpris = await Service.import("mpris");

const get_player = () => mpris.getPlayer("org.mpris.MediaPlayer2.spotify");

const spotify_info = (spotify) => {
  let track = spotify?.track_title;
  let artist = spotify?.track_artists[0];
  let cover = spotify?.cover_path;

  typeof track == "undefined" ? track = "" : "";
  typeof artist == "undefined" ? artist = "" : "";

  //May be better to show all the text with an scrollable widget
  const fn = (str) => {
    str.length > 25
      ? str = str.substring(0, 24).trimEnd() +
        "..."
      : "";
    return str;
  };

  track = fn(track);
  artist = fn(artist);
  //May be better to show all the text with an scrollable widget

  return { track, artist, cover };
};

const label = (vpack, classname) =>
  Widget.Label({
    vpack: vpack,
    justification: "left",
    hpack: "start",
    className: classname,
  });

const label_container = Widget.Box({
  vpack: "center",
  hpack: "center",
  vertical: true,
  children: [
    label("end", "title"),
    label("start", "artist"),
  ],
});

const cover_container = Widget.Box({
  className: "img",
});

export default Widget.Box({
  class_name: "box",
  spacing: 10,
  children: [cover_container, label_container],
});

mpris.connect("changed", () => {
  const spotify = get_player();

  const { track, artist, cover } = spotify_info(spotify);
  label_container.children[0].label = track;
  label_container.children[1].label = artist;
  cover_container.css = `background-image: url('${cover}');`;
});
