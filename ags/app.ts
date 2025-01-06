import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Audio from "./widget/popup/audio"

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar)
    //App.get_monitors().map(Audio)
  },
})
