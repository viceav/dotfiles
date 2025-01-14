import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Audio from "./widget/popup/audio"
import Battery from "./widget/popup/battery"

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar)
    //App.get_monitors().map(Audio)
    App.get_monitors().map(Battery)
  },
})
