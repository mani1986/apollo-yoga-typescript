import boot from "../boot";
import axios from "axios";
import cheerio from "cheerio";
import mail from '../lib/mail'
import MailUtil from '../lib/utils/MailUtil'

const INTERTOYS = "https://www.intertoys.nl/shop/nl/intertoys/ps5-825gb-000";
const GAMEMANIA =
  "https://www.gamemania.nl/Consoles/playstation-5/144093_playstation-5";
const BCC = "https://www.bcc.nl/computer/gaming/playstation-4-console/playstation-5-console-digital-edition/292649"
const MM = "https://www.mediamarkt.nl/nl/product/_sony-playstation-5-disk-edition-1664768.html"
const BOL = "https://www.bol.com/nl/p/sony-playstation-5-console/9300000004162282"
const COOLBLUE = "https://www.coolblue.nl/en/product/865866/playstation-5.html"
const NEDGAME = "https://www.nedgame.nl/playstation-5/playstation-5/1740432662"
const AMAZON = "https://www.amazon.nl/Sony-PlayStation%C2%AE5-Console/dp/B07SDFL84P"

const doInterToys = async () => {
  let isChanged = false;
  const res = await axios.get(INTERTOYS);
  const $ = cheerio.load(res.data);
  const elm = $(".ps5SignupTxt");

  if (
    elm.text().trim() !==
    "Schrijf je in om op de hoogte te blijven over de PS5 pre-orders"
  ) {
    return true;
  }

  return isChanged;
};

const doGameMania = async () => {
  let isChanged = false;
  const res = await axios.get(GAMEMANIA);
  const $ = cheerio.load(res.data);
  const elm = $(".product__label--preOrder");

  if (elm.text().trim().indexOf("Nog niet verschenen") === -1) {
    return true;
  }

  return isChanged;
};

const doBCC = async () => {
  let isChanged = false;
  const res = await axios.get(BCC);
  const $ = cheerio.load(res.data);
  const elm = $(".productoffer__deliverymsg");

  if (elm.text().trim().indexOf("Dit product is tijdelijk niet leverbaar") === -1) {
    return true;
  }

  return isChanged;
};

const doMM = async () => {
  let isChanged = false;
  const res = await axios.get(MM);
  const $ = cheerio.load(res.data);
  const elm = $(".lowstock-label");

  if (elm.text().trim().indexOf("Online uitverkocht") === -1) {
    return true;
  }

  return isChanged;
};

const doBol = async () => {
  let isChanged = false;
  const res = await axios.get(BOL);
  const $ = cheerio.load(res.data);
  const elm = $(".sub-title");

  if (elm.text().trim().indexOf("UITVERKOCHT") === -1) {
    return true;
  }

  return isChanged;
};

const doCoolBlue = async () => {
  let isChanged = false;
  const res = await axios.get(COOLBLUE);
  const $ = cheerio.load(res.data);
  const elm = $(".text-color--unavailable");

  if (elm.text().trim().indexOf("Available soon") === -1) {
    return true;
  }

  return isChanged;
};

const doNedGame = async () => {
  let isChanged = false;
  const res = await axios.get(NEDGAME);
  const $ = cheerio.load(res.data);
  const elm = $(".storselecttext");

  if (elm.text().trim().indexOf("Deze pre-order is helaas gesloten") === -1) {
    return true;
  }

  return isChanged;
};

const doAmazon = async () => {
  let isChanged = false;
  const res = await axios.get(AMAZON);
  // const $ = cheerio.load(res.data);
  // const elm = $(".storselecttext");

  if (res.data.indexOf("Onze excuses") === -1) {
    return true;
  }

  return isChanged;
};



const checkWebsites = async () => {
  let updates = [];
  console.log("Checking ");

  if (await doInterToys()) {
    updates.push("Intertoys!");
  }

  if (await doGameMania()) {
    updates.push("Game Mania!");
  }

  if (await doBCC()) {
    updates.push("BCC!");
  }

  if (await doMM()) {
    updates.push(`<a href="${MM}">Media Markt!</a>`);
  }

  if (await doBol()) {
    updates.push("Bol.com!");
  }

  if (await doCoolBlue()) {
    updates.push("Cool Blue!");
  }

  if (await doNedGame()) {
    updates.push("Ned Game!");
  }

  // if (await doAmazon()) {
  //   updates.push("Amazon!");
  // }

  if (updates.length) {
    console.log("UPDATES!");
    console.log(updates);

    await MailUtil.sendMailToEmail('mani@tji.li', { updates: updates}, 'update')
  } else {
    console.log("No updates");
  }

  // process.exit(0);
};

const loop = () => {
  setInterval(checkWebsites, 3000);
}

boot.start().then(loop);
