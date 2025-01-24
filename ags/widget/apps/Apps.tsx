import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import AstalApps from "gi://AstalApps?version=0.1";

const apps = new AstalApps.Apps();

const children = apps.get_list().map((app) => (
  <button
    name={app.name}
    onClick={() => {
      app.launch();
      hideApps();
      Entry.delete_text(0, -1);
    }}
    onKeyPressEvent={(_, event) => {
      const keyval = event.get_keyval()[1];
      if (keyval === Gdk.KEY_Return) {
        app.launch();
        hideApps();
        Entry.delete_text(0, -1);
      }
    }}
  >
    <box>
      <icon icon={app.iconName}></icon>
      <label label={app.name}></label>
    </box>
  </button>
));

function hideApps() {
  App.get_window("Apps")?.hide();
}

const Entry = (
  <entry
    placeholderText={"Search"}
    onChanged={(self) => {
      const matchedApps = apps.fuzzy_query(self.text);
      children.forEach((btn) => {
        if (!matchedApps.find((app) => app.name == btn.name)) {
          btn.hide();
        } else {
          btn.show();
        }
      });
    }}
    onKeyPressEvent={(self, event) => {
      const box = self.parent.get_children()[1] as Gtk.Box;
      const firstEntry = box
        .get_children()
        .find((btn) => btn.visible) as Gtk.Button;
      if (event.get_keyval()[1] === Gdk.KEY_Return) {
        firstEntry.event(event);
      }
    }}
  ></entry>
) as Gtk.Entry;

export default function Apps() {
  const { LEFT, TOP } = Astal.WindowAnchor;

  return (
    <window
      className={"Apps"}
      anchor={LEFT | TOP}
      name={"Apps"}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={App}
      visible={false}
    >
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={500}
        setup={(self) => {
          self.hook(self, "map", () => (self.revealChild = true));
          self.hook(self, "unmap", () => (self.revealChild = false));
        }}
      >
        <box
          vertical={true}
          setup={(self) =>
            self.hook(self, "map", (self) => {
              self.canFocus = true;
              self.grab_focus();
              self.canFocus = false;
            })
          }
          onKeyPressEvent={(self, event) => {
            const keyval = event.get_keyval()[1];
            const entry = self.child as Gtk.Entry;

            if (keyval === Gdk.KEY_Escape) {
              hideApps();
              entry.delete_text(0, -1);
            }
            if (
              (keyval >= Gdk.KEY_a && keyval <= Gdk.KEY_z) ||
              (keyval >= Gdk.KEY_A && keyval <= Gdk.KEY_Z) ||
              keyval === Gdk.KEY_BackSpace
            ) {
              if (keyval === Gdk.KEY_BackSpace) {
                const curPos = entry.get_position();
                entry.delete_text(curPos - 1, curPos);
              } else {
                entry.text += Gdk.keyval_name(keyval);
              }
              entry.grab_focus_without_selecting();
              entry.set_position(-1);
            }
          }}
        >
          {Entry}
          <box
            children={children}
            vertical={true}
            className={"Container"}
            setup={(self) =>
              self.hook(self, "map", () => {
                self.widthRequest = self.get_allocated_width() + 20;
                self.heightRequest = self.get_allocated_height();
              })
            }
          ></box>
        </box>
      </revealer>
    </window>
  );
}
