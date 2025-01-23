import { Variable } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import AstalApps from "gi://AstalApps?version=0.1";

const apps = new AstalApps.Apps();

const children = Variable(
  apps.get_list().map((app) => <button label={app.name}></button>),
);

export default function Apps() {
  const { LEFT, TOP } = Astal.WindowAnchor;

  return (
    <window anchor={LEFT | TOP} name={"Apps"} keymode={Astal.Keymode.ON_DEMAND}>
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={500}
        setup={(self) => {
          self.hook(self, "map", () => (self.revealChild = true));
          self.hook(self, "unmap", () => (self.revealChild = false));
        }}
      >
        <box vertical={true}>
          <entry
            onChanged={(self) => {
              children.set(
                apps
                  .fuzzy_query(self.text)
                  .map((app) => <button label={app.name}></button>),
              );
            }}
          ></entry>
          <box children={children()} vertical={true}></box>
        </box>
      </revealer>
    </window>
  );
}
