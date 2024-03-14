const audio = await Service.import('audio');
const battery = await Service.import('battery');
const hyprland = await Service.import('hyprland');
const network = await Service.import('network');
const mpris = await Service.import('mpris');

const volumeIndicator = Widget.Box({
  class_name: 'audio',
  vertical: false,
  children: [
  Widget.Label({
    class_name: 'label',
    setup: self => self
      .bind('label', audio.speaker, 'volume', volume => (volume*100).toFixed(0).toString().concat('%')),
  })]
})

const wifiIndicator = Widget.Box({
  class_name: 'network',
  vertical: false,
  children: [
    Widget.Label({
      class_name: 'label',
      label: network.wifi.bind('ssid'),
    })]
})

const format_icons = {"1": "", "2": "", "3": "", "4": "", "5": "", }

const workspaces = Widget.Box({
  class_name: 'workspaces',
  vertical: false,
  children: Array.from({length: 5}, (_,i) => i+1).map(i => Widget.Button({
    attribute: i,
    label: format_icons[`${i}`],
    on_clicked: () => hyprland.message(`dispatch workspace ${i}`),
  })),
  setup: self => self
    .hook(hyprland, () => self.children.forEach(btn => {
      btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
      btn.toggleClassName('active', btn.attribute === hyprland.active.workspace.id)
    }))
});

const start_widget = Widget.Box({
  class_name: 'start_widget',
  hpack: 'start',
  vertical: false,
  children: [workspaces],
})

const end_widget = Widget.Box({
  class_name: 'end_widget',
  hpack: 'end',
  vertical: false,
  children: [wifiIndicator, volumeIndicator],
})

const main_widget = Widget.CenterBox({
  vertical: false, 
  startWidget: start_widget,
  // centerWidget: start_widget,
  endWidget: end_widget,
});

const bar = Widget.Window({
  class_name: 'bar',
  child: main_widget,
  name: 'bar',
  anchor: ['left','top','right'],
  exclusivity: 'exclusive',
});

App.config({
  windows: [bar],
  style: './style.css'
})
