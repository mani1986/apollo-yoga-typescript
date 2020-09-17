import boot from "../boot";
import axios from "axios";
import cheerio from "cheerio";
import MailUtil from "../lib/utils/MailUtil";
import moment from "moment";
import _ from 'lodash'

const INTERVAL_SEC = 20;
const INTERVAL = INTERVAL_SEC * 1000;

const INTERTOYS = "https://www.intertoys.nl/shop/nl/intertoys/ps5-825gb-000";
const GAMEMANIA =
  "https://www.gamemania.nl/Consoles/playstation-5/144093_playstation-5";
const BCC =
  "https://www.bcc.nl/computer/gaming/playstation-4-console/playstation-5-console-digital-edition/292649";
const MM =
  "https://www.mediamarkt.nl/nl/category/_playstation-5-consoles-766027.html";
const BOL =
  "https://www.bol.com/nl/p/sony-playstation-5-console/9300000004162282";
const COOLBLUE = "https://www.coolblue.nl/en/product/865866/playstation-5.html";
const NEDGAME = "https://www.nedgame.nl/playstation-5/playstation-5/1740432662";
const AMAZON =
  "https://www.amazon.nl/Sony-PlayStation%C2%AE5-Console/dp/B07SDFL84P";

let lastNotified: any = null;

const list = [
  {
    name: 'InterToys',
    elm: '.ps5SignupTxt',
    url: INTERTOYS,
    find: "Schrijf je in om op de hoogte te blijven over de PS5 pre-orders"
  },
  {
    name: 'Game Mania',
    elm: '.product__label--preOrder',
    url: GAMEMANIA,
    find: "Nog niet verschenen"
  },
  {
    name: 'BCC',
    elm: '.productoffer__deliverymsg',
    url: BCC,
    find: "Dit product is tijdelijk niet leverbaar"
  },
  {
    name: 'MediaMarkt',
    elm: '.lowstock-label',
    url: MM,
    find: "Online uitverkocht"
  },
  {
    name: 'Bol.com',
    elm: '.sub-title',
    url: BOL,
    find: "UITVERKOCHT"
  },
  {
    name: 'Bol.com',
    elm: '.sub-title',
    url: BOL,
    find: "UITVERKOCHT"
  },
  {
    name: 'CoolBlue',
    elm: '.text-color--unavailable',
    url: COOLBLUE,
    find: "Available soon"
  },
  {
    name: 'SixSense',
    elm: '.post-content p:nth-child(2)',
    url: 'https://www.psx-sense.nl/414715/playstation-5-pre-orders-vanaf-nu-officieel-live/',
    find: "Update 17-9-2020 – 11:10: MediaMarkt pre-orders zijn nu open, wees er snel bij1!"
  },
  // {
  //   name: 'NedGame',
  //   elm: '.storselecttext',
  //   url: NEDGAME,
  //   find: "Deze pre-order is helaas gesloten"
  // }
]

const doRequest = async (url: string, elmString: string, find: string) => {
  try {
    let isChanged = false;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const elm = $(elmString);

    if (elm.text().trim().indexOf(find) === -1) {
      console.log('not found', elm.text())
      return true;
    }

    return isChanged;
  } catch (e) {
    console.error(url, find, e.message);
  }
};

const checkWebsites = async () => {
  let updates = [];
  console.log("Checking ");

  for (var i in list) {
    let item:any = list[i]
    if (await doRequest(item.url, item.elm, item.find)) {
      updates.push(item);
    }
  }

  if (updates.length) {
    console.log("UPDATES!");
    console.log(updates);

    if (
      lastNotified === null ||
      Math.round(moment().diff(lastNotified) / 1000) > 60 * 5
    ) {
      console.log(
        "Sending Email!",
        Math.round(moment().diff(lastNotified))
      );
      await MailUtil.sendMailToEmail(
        "mani@tji.li",
        { updates: updates.map((u:any) => {
          return JSON.stringify(u, null, 2)
        }) },
        "update"
      );
      await MailUtil.text(_.map(updates, 'name').join(","));
      lastNotified = moment();
    }
  } else {
    console.log("No updates");
  }

  // process.exit(0);
};

const loop = () => {
  checkWebsites();
  setInterval(checkWebsites, INTERVAL);
};

boot.start().then(loop);
