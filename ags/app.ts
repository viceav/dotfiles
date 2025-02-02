import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Battery from "./widget/popup/battery"
import QuickMenu from "./widget/quickmenu/Quickmenu"
import Apps from "./widget/apps/Apps"
import Slider from "./widget/popup/slider/Slider"

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar)
    App.get_monitors().map(Slider)
    App.get_monitors().map(Battery)
    App.get_monitors().map(QuickMenu)
    App.get_monitors().map(Apps)
  },
})
