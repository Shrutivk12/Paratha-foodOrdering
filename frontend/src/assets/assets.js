import logo from './logo.png'; //ff5349
import paratha from './paratha.png';
import header_img from './header_img.png';
import plain from './plain.png';
import aloo from './aloo.png';
import paneer from './paneer.png';
import gobi from './gobi.png';
import qrcode from './QRCode.png';
import upload_area from './upload_area.png';

export const assets = {
    logo,
    paratha,
    header_img,
    plain,
    aloo,
    paneer,
    gobi,
    qrcode,
    upload_area,
}

export const food_list = [
  {
    _id: "1",
    name: "Plain Paratha",
    image: plain,
    price: 25,
    description: "Crispy and flaky flatbread made with whole wheat flour, cooked with ghee for the perfect golden finish."
  },
  {
    _id: "2",
    name: "Aloo Paratha",
    image: aloo,
    price: 40,
    description: "Stuffed with a spicy mashed potato filling and topped with butter - a true comfort food classic."
  },
  {
    _id: "3",
    name: "Paneer Paratha",
    image: paneer,
    price: 50,
    description: "Filled with flavorful paneer stuffing and fresh herbs, cooked to golden perfection."
  },
  {
    _id: "4",
    name: "Gobi Paratha",
    image: gobi,
    price: 45,
    description: "Loaded with spiced cauliflower stuffing, served hot and perfect with curd or pickle."
  }
];
