import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import AstalApps from "gi://AstalApps?version=0.1";
import AstalHyprland from "gi://AstalHyprland?version=0.1";

const apps = new AstalApps.Apps();
const hypr = AstalHyprland.get_default();

const children = apps
  .get_list()
  .sort((a, b) => (a.name < b.name ? -1 : 1))
  .map((app) => (
    <button
      name={app.name}
      onClick={() => {
        hypr.message(`dispatch exec ${app.executable}`.replace(/%[uU/]/g, ""));
        hideApps();
        Entry.delete_text(0, -1);
      }}
      onKeyPressEvent={(_, event) => {
        const keyval = event.get_keyval()[1];
        if (keyval === Gdk.KEY_Return) {
          hypr.message(
            `dispatch exec ${app.executable}`.replace(/%[uU/]/g, ""),
          );
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
  )) as Gtk.Button[];

function hideApps() {
  App.get_window("Apps")?.hide();
}

const Entry = (
  <entry
    placeholderText={"Search"}
    onChanged={(self) => {
      const matchedApps = apps.fuzzy_query(self.text);
      children
        .find((btn) => btn.visible)
        ?.toggleClassName("firstButton", false);
      children.forEach((btn) => {
        if (!matchedApps.find((app) => app.name == btn.name)) {
          btn.hide();
        } else {
          btn.show();
        }
      });
      children.find((btn) => btn.visible)?.toggleClassName("firstButton", true);
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
    setup={(self) =>
      self.hook(self, "focus-out-event", () => {
        const box = self.parent.get_children()[1] as Gtk.Box;
        const firstEntry = box
          .get_children()
          .find((btn) => btn.visible) as Gtk.Button;
        firstEntry?.toggleClassName("firstButton", false);
      })
    }
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
                if (event.get_state()[1] == Gdk.ModifierType.CONTROL_MASK)
                  entry.delete_text(0, curPos);
                else entry.delete_text(curPos - 1, curPos);
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
                self.widthRequest = self.get_allocated_width();
                self.heightRequest = self.get_allocated_height();
              })
            }
          ></box>
        </box>
      </revealer>
    </window>
  );
}
