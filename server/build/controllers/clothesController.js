"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const clothes = JSON.parse(fs_1.default.readFileSync(path_1.default.join('./src/data', 'clothes.json')).toString());
const getAllClothes = (req, res, next) => {
    let clothings = clothes;
    const { gender, type, color, size, sortByPrice } = req.query;
    if (gender) {
        clothings = clothings.filter(clothes => clothes.category[0].toLowerCase() === gender.toLowerCase());
    }
    if (type) {
        clothings = clothings.filter(clothes => clothes.category[1].toLowerCase() === type.toLowerCase());
    }
    if (color) {
        clothings = clothings.filter(clothes => {
            const colors = clothes.category.slice(2);
            for (const c of colors) {
                if (c.toLowerCase() === color.toLowerCase())
                    return true;
            }
            return false;
        });
    }
    if (size) {
        clothings = clothings.filter(clothes => {
            for (const s of clothes.sizes) {
                if (s.toLowerCase() === size.toLowerCase())
                    return true;
            }
            return false;
        });
    }
    if (sortByPrice) {
        if (+sortByPrice === 0) {
            clothings = clothings.sort((a, b) => {
                const actualPriceA = a.price - a.price * (a.salePercent / 100);
                const actualPriceB = b.price - b.price * (b.salePercent / 100);
                return actualPriceA - actualPriceB;
            });
        }
        else if (+sortByPrice === 1) {
            clothings = clothings.sort((a, b) => {
                const actualPriceA = a.price - a.price * (a.salePercent / 100);
                const actualPriceB = b.price - b.price * (b.salePercent / 100);
                return actualPriceB - actualPriceA;
            });
        }
    }
    res.status(200).json({
        status: 'success',
        results: clothings.length,
        data: {
            clothings
        }
    });
};
exports.default = { getAllClothes };
