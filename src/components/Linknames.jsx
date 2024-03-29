import { AiOutlineLayout } from "react-icons/ai"
import { IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5"
import { PiHouse } from "react-icons/pi"
import { BsClipboardPulse } from "react-icons/bs"

const mainlinks = [
  {
    id: 1,
    url: "/home",
    text: "Home",
    rfcname: "Home",
    icon: PiHouse,
  },
  {
    id: 22,
    url: "/dashboard",
    text: "Dashboard",
    rfcname: "DashboardPage",
    icon: BsClipboardPulse,
  },
  {
    id: 2,
    url: "/templates",
    text: "Templates",
    rfcname: "Templates",
    icon: AiOutlineLayout,
  },
  {
    id: 3,
    url: "/contact",
    text: "Contact Us",
    rfcname: "ContactUs",
    icon: IoChatbubblesOutline,
  },
  {
    id: 4,
    url: "/settings",
    text: "Settings",
    rfcname: "Settings",
    icon: IoSettingsOutline,
  },
]

export default mainlinks
