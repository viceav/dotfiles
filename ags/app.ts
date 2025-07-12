import app from "ags/gtk4/app"
import style from "./style.css"
import Bar from "./widget/bar/Bar"
import Apps from "./widget/apps/Apps"
import Sliders from "./widget/popup/Sliders"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)
    app.get_monitors().map(Apps)
    app.get_monitors().map(Sliders)
  },
})
