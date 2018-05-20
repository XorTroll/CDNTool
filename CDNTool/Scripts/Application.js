const fs = require("fs");
const dns = require("dns");
const http = require("http");
const child_process = require("child_process");
const elerem = require("electron").remote;

var cetkdata =
[
    "00", "01", "00", "04", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0",
    "D1", "5E", "A5", "E0", "D1", "5E", "A5", "E0", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "52", "6F", "6F", "74",
    "2D", "43", "41", "30", "30", "30", "30", "30", "30", "30", "33", "2D",
    "58", "53", "30", "30", "30", "30", "30", "30", "30", "63", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE",
    "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE",
    "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE",
    "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE",
    "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE", "FE", "ED", "FA", "CE",
    "01", "00", "00", "CC", "CC", "CC", "CC", "CC", "CC", "CC", "CC", "CC",
    "CC", "CC", "CC", "CC", "CC", "CC", "CC", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "AA", "AA", "AA", "AA",
    "AA", "AA", "AA", "AA", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "01", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "01", "00", "14", "00", "00", "00", "AC",
    "00", "00", "00", "14", "00", "01", "00", "14", "00", "00", "00", "00",
    "00", "00", "00", "28", "00", "00", "00", "01", "00", "00", "00", "84",
    "00", "00", "00", "84", "00", "03", "00", "00", "00", "00", "00", "00",
    "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF",
    "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF",
    "FF", "FF", "FF", "FF", "FF", "FF", "FF", "FF", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "01", "00", "04",
    "91", "9E", "BE", "46", "4A", "D0", "F5", "52", "CD", "1B", "72", "E7",
    "88", "49", "10", "CF", "55", "A9", "F0", "2E", "50", "78", "96", "41",
    "D8", "96", "68", "3D", "C0", "05", "BD", "0A", "EA", "87", "07", "9D",
    "8A", "C2", "84", "C6", "75", "06", "5F", "74", "C8", "BF", "37", "C8",
    "80", "44", "40", "95", "02", "A0", "22", "98", "0B", "B8", "AD", "48",
    "38", "3F", "6D", "28", "A7", "9D", "E3", "96", "26", "CC", "B2", "B2",
    "2A", "0F", "19", "E4", "10", "32", "F0", "94", "B3", "9F", "F0", "13",
    "31", "46", "DE", "C8", "F6", "C1", "A9", "D5", "5C", "D2", "8D", "9E",
    "1C", "47", "B3", "D1", "1F", "4F", "54", "26", "C2", "C7", "80", "13",
    "5A", "27", "75", "D3", "CA", "67", "9B", "C7", "E8", "34", "F0", "E0",
    "FB", "58", "E6", "88", "60", "A7", "13", "30", "FC", "95", "79", "17",
    "93", "C8", "FB", "A9", "35", "A7", "A6", "90", "8F", "22", "9D", "EE",
    "2A", "0C", "A6", "B9", "B2", "3B", "12", "D4", "95", "A6", "FE", "19",
    "D0", "D7", "26", "48", "21", "68", "78", "60", "5A", "66", "53", "8D",
    "BF", "37", "68", "99", "90", "5D", "34", "45", "FC", "5C", "72", "7A",
    "0E", "13", "E0", "E2", "C8", "97", "1C", "9C", "FA", "6C", "60", "67",
    "88", "75", "73", "2A", "4E", "75", "52", "3D", "2F", "56", "2F", "12",
    "AA", "BD", "15", "73", "BF", "06", "C9", "40", "54", "AE", "FA", "81",
    "A7", "14", "17", "AF", "9A", "4A", "06", "6D", "0F", "FC", "5A", "D6",
    "4B", "AB", "28", "B1", "FF", "60", "66", "1F", "44", "37", "D4", "9E",
    "1E", "0D", "94", "12", "EB", "4B", "CA", "CF", "4C", "FD", "6A", "34",
    "08", "84", "79", "82", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "52", "6F", "6F", "74", "2D", "43", "41", "30",
    "30", "30", "30", "30", "30", "30", "33", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "01",
    "58", "53", "30", "30", "30", "30", "30", "30", "30", "63", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "13", "7A", "08", "94", "AD", "50", "5B", "B6",
    "C6", "7E", "2E", "5B", "DD", "6A", "3B", "EC", "43", "D9", "10", "C7",
    "72", "E9", "CC", "29", "0D", "A5", "85", "88", "B7", "7D", "CC", "11",
    "68", "0B", "B3", "E2", "9F", "4E", "AB", "BB", "26", "E9", "8C", "26",
    "01", "98", "5C", "04", "1B", "B1", "43", "78", "E6", "89", "18", "1A",
    "AD", "77", "05", "68", "E9", "28", "A2", "B9", "81", "67", "EE", "3E",
    "10", "D0", "72", "BE", "EF", "1F", "A2", "2F", "A2", "AA", "3E", "13",
    "F1", "1E", "18", "36", "A9", "2A", "42", "81", "EF", "70", "AA", "F4",
    "E4", "62", "99", "82", "21", "C6", "FB", "B9", "BD", "D0", "17", "E6",
    "AC", "59", "04", "94", "E9", "CE", "A9", "85", "9C", "EB", "2D", "2A",
    "4C", "17", "66", "F2", "C3", "39", "12", "C5", "8F", "14", "A8", "03",
    "E3", "6F", "CC", "DC", "CC", "DC", "13", "FD", "7A", "E7", "7C", "7A",
    "78", "D9", "97", "E6", "AC", "C3", "55", "57", "E0", "D3", "E9", "EB",
    "64", "B4", "3C", "92", "F4", "C5", "0D", "67", "A6", "02", "DE", "B3",
    "91", "B0", "66", "61", "CD", "32", "88", "0B", "D6", "49", "12", "AF",
    "1C", "BC", "B7", "16", "2A", "06", "F0", "25", "65", "D3", "B0", "EC",
    "E4", "FC", "EC", "DD", "AE", "8A", "49", "34", "DB", "8E", "E6", "7F",
    "30", "17", "98", "62", "21", "15", "5D", "13", "1C", "6C", "3F", "09",
    "AB", "19", "45", "C2", "06", "AC", "70", "C9", "42", "B3", "6F", "49",
    "A1", "18", "3B", "CD", "78", "B6", "E4", "B4", "7C", "6C", "5C", "AC",
    "0F", "8D", "62", "F8", "97", "C6", "95", "3D", "D1", "2F", "28", "B7",
    "0C", "5B", "7D", "F7", "51", "81", "9A", "98", "34", "65", "26", "25",
    "00", "01", "00", "01", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "01", "00", "03",
    "70", "41", "38", "EF", "BB", "BD", "A1", "6A", "98", "7D", "D9", "01",
    "32", "6D", "1C", "94", "59", "48", "4C", "88", "A2", "86", "1B", "91",
    "A3", "12", "58", "7A", "E7", "0E", "F6", "23", "7E", "C5", "0E", "10",
    "32", "DC", "39", "DD", "E8", "9A", "96", "A8", "E8", "59", "D7", "6A",
    "98", "A6", "E7", "E3", "6A", "0C", "FE", "35", "2C", "A8", "93", "05",
    "82", "34", "FF", "83", "3F", "CB", "3B", "03", "81", "1E", "9F", "0D",
    "C0", "D9", "A5", "2F", "80", "45", "B4", "B2", "F9", "41", "1B", "67",
    "A5", "1C", "44", "B5", "EF", "8C", "E7", "7B", "D6", "D5", "6B", "A7",
    "57", "34", "A1", "85", "6D", "E6", "D4", "BE", "D6", "D3", "A2", "42",
    "C7", "C8", "79", "1B", "34", "22", "37", "5E", "5C", "77", "9A", "BF",
    "07", "2F", "76", "95", "EF", "A0", "F7", "5B", "CB", "83", "78", "9F",
    "C3", "0E", "3F", "E4", "CC", "83", "92", "20", "78", "40", "63", "89",
    "49", "C7", "F6", "88", "56", "5F", "64", "9B", "74", "D6", "3D", "8D",
    "58", "FF", "AD", "DA", "57", "1E", "95", "54", "42", "6B", "13", "18",
    "FC", "46", "89", "83", "D4", "C8", "A5", "62", "8B", "06", "B6", "FC",
    "5D", "50", "7C", "13", "E7", "A1", "8A", "C1", "51", "1E", "B6", "D6",
    "2E", "A5", "44", "8F", "83", "50", "14", "47", "A9", "AF", "B3", "EC",
    "C2", "90", "3C", "9D", "D5", "2F", "92", "2A", "C9", "AC", "DB", "EF",
    "58", "C6", "02", "18", "48", "D9", "6E", "20", "87", "32", "D3", "D1",
    "D9", "D9", "EA", "44", "0D", "91", "62", "1C", "7A", "99", "DB", "88",
    "43", "C5", "9C", "1F", "2E", "2C", "7D", "9B", "57", "7D", "51", "2C",
    "16", "6D", "6F", "7E", "1A", "AD", "4A", "77", "4A", "37", "44", "7E",
    "78", "FE", "20", "21", "E1", "4A", "95", "D1", "12", "A0", "68", "AD",
    "A0", "19", "F4", "63", "C7", "A5", "56", "85", "AA", "BB", "68", "88",
    "B9", "24", "64", "83", "D1", "8B", "9C", "80", "6F", "47", "49", "18",
    "33", "17", "82", "34", "4A", "4B", "85", "31", "33", "4B", "26", "30",
    "32", "63", "D9", "D2", "EB", "4F", "4B", "B9", "96", "02", "B3", "52",
    "F6", "AE", "40", "46", "C6", "9A", "5E", "7E", "8E", "4A", "18", "EF",
    "9B", "C0", "A2", "DE", "D6", "13", "10", "41", "70", "12", "FD", "82",
    "4C", "C1", "16", "CF", "B7", "C4", "C1", "F7", "EC", "71", "77", "A1",
    "74", "46", "CB", "DE", "96", "F3", "ED", "D8", "8F", "CD", "05", "2F",
    "0B", "88", "8A", "45", "FD", "AF", "2B", "63", "13", "54", "F4", "0D",
    "16", "E5", "FA", "9C", "2C", "4E", "DA", "98", "E7", "98", "D1", "5E",
    "60", "46", "DC", "53", "63", "F3", "09", "6B", "2C", "60", "7A", "9D",
    "8D", "D5", "5B", "15", "02", "A6", "AC", "7D", "3C", "C8", "D8", "C5",
    "75", "99", "8E", "7D", "79", "69", "10", "C8", "04", "C4", "95", "23",
    "50", "57", "E9", "1E", "CD", "26", "37", "C9", "C1", "84", "51", "51",
    "AC", "6B", "9A", "04", "90", "AE", "3E", "C6", "F4", "77", "40", "A0",
    "DB", "0B", "A3", "6D", "07", "59", "56", "CE", "E7", "35", "4E", "A3",
    "E9", "A4", "F2", "72", "0B", "26", "55", "0C", "7D", "39", "43", "24",
    "BC", "0C", "B7", "E9", "31", "7D", "8A", "86", "61", "F4", "21", "91",
    "FF", "10", "B0", "82", "56", "CE", "3F", "D2", "5B", "74", "5E", "51",
    "94", "90", "6B", "4D", "61", "CB", "4C", "2E", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "52", "6F", "6F", "74",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "01", "43", "41", "30", "30", "30", "30", "30", "30",
    "30", "33", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "7B", "E8", "EF", "6C",
    "B2", "79", "C9", "E2", "EE", "E1", "21", "C6", "EA", "F4", "4F", "F6",
    "39", "F8", "8F", "07", "8B", "4B", "77", "ED", "9F", "95", "60", "B0",
    "35", "82", "81", "B5", "0E", "55", "AB", "72", "11", "15", "A1", "77",
    "70", "3C", "7A", "30", "FE", "3A", "E9", "EF", "1C", "60", "BC", "1D",
    "97", "46", "76", "B2", "3A", "68", "CC", "04", "B1", "98", "52", "5B",
    "C9", "68", "F1", "1D", "E2", "DB", "50", "E4", "D9", "E7", "F0", "71",
    "E5", "62", "DA", "E2", "09", "22", "33", "E9", "D3", "63", "F6", "1D",
    "D7", "C1", "9F", "F3", "A4", "A9", "1E", "8F", "65", "53", "D4", "71",
    "DD", "7B", "84", "B9", "F1", "B8", "CE", "73", "35", "F0", "F5", "54",
    "05", "63", "A1", "EA", "B8", "39", "63", "E0", "9B", "E9", "01", "01",
    "1F", "99", "54", "63", "61", "28", "70", "20", "E9", "CC", "0D", "AB",
    "48", "7F", "14", "0D", "66", "26", "A1", "83", "6D", "27", "11", "1F",
    "20", "68", "DE", "47", "72", "14", "91", "51", "CF", "69", "C6", "1B",
    "A6", "0E", "F9", "D9", "49", "A0", "F7", "1F", "54", "99", "F2", "D3",
    "9A", "D2", "8C", "70", "05", "34", "82", "93", "C4", "31", "FF", "BD",
    "33", "F6", "BC", "A6", "0D", "C7", "19", "5E", "A2", "BC", "C5", "6D",
    "20", "0B", "AF", "6D", "06", "D0", "9C", "41", "DB", "8D", "E9", "C7",
    "20", "15", "4C", "A4", "83", "2B", "69", "C0", "8C", "69", "CD", "3B",
    "07", "3A", "00", "63", "60", "2F", "46", "2D", "33", "80", "61", "A5",
    "EA", "6C", "91", "5C", "D5", "62", "35", "79", "C3", "EB", "64", "CE",
    "44", "EF", "58", "6D", "14", "BA", "AA", "88", "34", "01", "9B", "3E",
    "EB", "EE", "D3", "79", "00", "01", "00", "01", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
    "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00",
];

var CurID = "";
var CurPCode = "";
var CurName = "";
var CurSize = "";
var CurKey = "";

function WinMinimize()
{
    var wnd = elerem.BrowserWindow.getFocusedWindow();
    wnd.minimize();
}

function WinResize()
{
    var wnd = elerem.BrowserWindow.getFocusedWindow();
    if(wnd.isMaximized()) wnd.unmaximize();
    else wnd.maximize();
}

function WinClose()
{
    var wnd = elerem.BrowserWindow.getFocusedWindow();
    wnd.close();
}

function AboutInfo()
{
    alert("CDNTool program - version: beta 2 (v0.2)\nCopyright (C) 2018: made by XorTroll.\n\nThis program allows you to download eShop titles as CIA archives.\nThis program DOES NOT access eShop's title database.\nIt accesses another one, which is displayed in the prompt.\n\nData accessed from the database is not always correct, because\nit is open-source and anybody can submit data there.\n\nThis program uses external tools and libraries.\n\nList of used tools:\n - Electron and Node.js\n - ctrtool and make_cdn_cia tools\n - MDL HTML libraries\n - Based on CIAngel 3DS application\n\nDeveloped using JavaScript and Node.js, GUI with Electron.\nCheck GitHub for any new releases.");
}

function CheckInternetConnection(CallBack)
{
    dns.resolve("www.google.com", function(error)
    {
        if(error)
        {
            Log("Checking internet connection...");
            alert("System is not connected to internet, or it seems like that.\nCDNTool cannot work without connection.");
            window.close();
        }
        else CallBack();
    });
}

function CheckRequired(Path)
{
    if(!fs.existsSync(Path))
    {
        alert("Required file does not exist: " + Path);
        window.close();
    }
}

function FormatSize(Size, Decimals)
{
    var data = Size + " bytes";
    if(Size / 1024 < 1000) data = (Size / 1024).toFixed(Decimals) + " KB";
    else if((Size / 1024) / 1024 < 1000) data = ((Size / 1024) / 1024).toFixed(Decimals) + " MB";
    else if(((Size / 1024) / 1024) / 1024 < 1000) data = (((Size / 1024) / 1024) / 1024).toFixed(Decimals) + " GB";
    return data;
}

function Log(Text)
{
    var logtxt = document.getElementById("Text_Log");
    logtxt.innerHTML = Text;
}

function AccessTitles()
{
    CheckInternetConnection(function()
    {
        var tbody = document.getElementById("b_Table");
        tbody.innerHTML = "";
        var card = document.getElementById("Card_TitleInfo");
        card.style.visibility = "hidden";

        Log("Downloading title data...");

        var path = process.env.APPDATA + "\\CDNTool\\.titledata";
        var curd = 0;

        if (fs.existsSync(path)) fs.unlink(path);
        var file = fs.createWriteStream(path);
        http.get("http://3ds.titlekeys.gq/json_enc", function (res)
        {
            res.pipe(file);
            res.on("data", function (chunk)
            {
                curd += chunk.length;
                Log("[Title data] Download progress: " + FormatSize(curd, 2));
            });
            res.on("end", function ()
            {
                Log("Ready to search!");
            });
        });
    });
}

function TitleData()
{
    var rawt = fs.readFileSync(process.env.APPDATA + "\\CDNTool\\.titledata", "utf8");
    var jsp = JSON.parse(rawt);
    return jsp;
}

function TitleDownload()
{
    CheckInternetConnection(function()
    {
        var ctrtool = process.cwd() + "\\ctrtool.exe";
        var cdncia = process.cwd() + "\\make_cdn_cia.exe";
        CheckRequired(ctrtool);
        CheckRequired(cdncia);
        var path = elerem.dialog.showSaveDialog({ title: "Saving title: \"" + CurName + "\"", filters: [{ name: "CTR Importable Archive - CIA archive", extensions: ["cia"] }]});
        var tpath = process.env.APPDATA + "\\CDNTool\\" + CurPCode + "_" + CurID;
        if (path)
        {
            Log("Starting title download...");
            var dlbut = document.getElementById("Card_but_Download");
            dlbut.disabled = true;
            var rbut = document.getElementById("mnu_btn_Reload");
            rbut.style.pointerEvents = "none";
            rbut.style.opacity = "0.6";
            fs.mkdir(tpath);

            var tmd = tpath + "\\tmd";
            var tmd_curd = 0;

            if (fs.existsSync(tmd)) fs.unlink(tmd);
            var tmdf = fs.createWriteStream(tmd);
            http.get("http://nus.cdn.c.shop.nintendowifi.net/ccs/download/" + CurID + "/tmd", function(res)
            {
                res.pipe(tmdf);
                res.on("data", function (chunk)
                {
                    tmd_curd += chunk.length;
                    Log("[TMD] Download progress: " + FormatSize(tmd_curd, 2));
                });
                res.on("end", function ()
                {
                    Log("TMD was successfully downloaded.");
                    child_process.exec("\"" + ctrtool + "\" -t tmd -i \"" + tmd + "\"", function(error, stdout, stderr)
                    {
                        if (!error)
                        {
                            var data = stdout.toString().replace(/Content id:             /g, "@");
                            var cnts = [];
                            var lines = data.split("\n");
                            for (var i = 0; i < lines.length; i++)
                            {
                                var line = lines[i];
                                if (line[0] === "@") {
                                    var cnt = "";
                                    for (var j = 1; j < 9; j++)
                                    {
                                        cnt += line[j];
                                    }
                                    cnts.push(cnt);
                                }
                            }
                            var td_ContentLoop = function (Path, Contents, Index = 0)
                            {
                                var cnt = Contents[Index];
                                var cntp = Path + "\\" + cnt;
                                var cntsize = 0;
                                if (fs.existsSync(cntp)) fs.unlink(cntp);
                                var cntf = fs.createWriteStream(cntp);
                                http.get("http://nus.cdn.c.shop.nintendowifi.net/ccs/download/" + CurID + "/" + cnt, function(res)
                                {
                                    res.pipe(cntf);
                                    res.on("data", function (chunk)
                                    {
                                        cntsize += chunk.length;
                                        Log("[Content " + cnt + "] Download progress: " + FormatSize(cntsize, 2));
                                    });
                                    res.on("end", function () {
                                        if (Index < Contents.length - 1) td_ContentLoop(Path, Contents, Index + 1);
                                        else
                                        {
                                            Log("Building final ROM...");
                                            var version = "";
                                            var data = fs.readFileSync(tpath + "\\tmd").toString("hex");
                                            for (var i = 0; i < 4; i++)
                                            {
                                                version += data[((0x140 + 0x9C) * 2) + i];
                                            }
                                            var tikd = cetkdata;
                                            var nid = CurID.match(/.{1,2}/g);
                                            var nkey = CurKey.match(/.{1,2}/g);
                                            var nvers = version.match(/.{1,2}/g);

                                            for (var i = 0; i < 8; i++)
                                            {
                                                tikd[0x140 + 0x9C + i] = nid[i];
                                            }
                                            for (var i = 0; i < 16; i++)
                                            {
                                                tikd[0x140 + 0x7F + i] = nkey[i];
                                            }
                                            for (var i = 0; i < 2; i++)
                                            {
                                                tikd[0x140 + 0xA6 + i] = nvers[i];
                                            }

                                            Log("Generating ticket file...");

                                            var hextxt = tikd.join("");
                                            var binbuf = Buffer.from(hextxt, "hex");
                                            fs.writeFile(tpath + "\\cetk", binbuf, "binary");
                                            Log("Building final ROM...");

                                            child_process.exec("\"" + cdncia + "\" \"" + tpath + "\" \"" + path + "\"", function(error, stdout, stderr)
                                            {
                                                if (!error)
                                                {
                                                    var dlbut = document.getElementById("Card_but_Download");
                                                    dlbut.disabled = false;
                                                    var rbut = document.getElementById("mnu_btn_Reload");
                                                    rbut.style.pointerEvents = "all";
                                                    rbut.style.opacity = "1";
                                                    fs.rmdir(tpath);
                                                    Log("Done: \"" + path + "\"");
                                                }
                                                else
                                                {
                                                    Log("An error happened building final ROM. Download stopped.");
                                                    var dlbut = document.getElementById("Card_but_Download");
                                                    dlbut.disabled = false;
                                                    var rbut = document.getElementById("mnu_btn_Reload");
                                                    rbut.style.pointerEvents = "all";
                                                    rbut.style.opacity = "1";
                                                }
                                            });
                                        }
                                    });
                                });
                            };
                            td_ContentLoop(tpath, cnts);
                        }
                        else {
                            Log("Error parsing TMD file. Download stopped."); // not reading TMD ok? strange...
                            var dlbut = document.getElementById("Card_but_Download");
                            dlbut.disabled = false;
                            var rbut = document.getElementById("mnu_btn_Reload");
                            rbut.style.pointerEvents = "all";
                            rbut.style.opacity = "1";
                        }
                    });
                });
            });
        }
    });
}

function SearchTitles()
{
    CheckInternetConnection(function()
    {
        Log("Searching titles...");
        if (!fs.existsSync(process.env.APPDATA + "\\CDNTool\\.titledata"))
        {
            alert("Title data seems not to be downloaded.\nClick on \"Reload\" option on the menu to download it.");
            return;
        }
        var txt = document.getElementById("tbx_Input").value;
        var tdt = TitleData();
        var srch = [];
        for (var i = 0; i < tdt.length; i++)
        {
            var one = tdt[i].name.toLowerCase();
            var cur = txt.toLowerCase();
            if (one.indexOf(cur) >= 0)
            {
                srch.push(i);
                continue;
            }
        }
        Log("Found " + srch.length.toString() + " titles.");
        var tbody = document.getElementById("b_Table");
        tbody.onblur = function()
        {
            var card = document.getElementById("Card_TitleInfo");
            card.style.visibility = "hidden";
        };

        while (tbody.firstChild)
        {
            tbody.removeChild(tbody.firstChild);
        }

        for (var j = 0; j < srch.length; j++)
        {
            var i = srch[j];
            var ct = tdt[i];
            var row = document.createElement("tr");
            row.id = "tit_" + i;

            var nam = document.createElement("td");
            nam.className = "mdl-data-table__cell--non-numeric";
            nam.id = "name_tit_" + i;
            nam.textContent = ct.name;

            var tid = document.createElement("td");
            tid.className = "mdl-data-table__cell--non-numeric";
            tid.id = "tid_tit_" + i;
            tid.textContent = ct.titleID;

            var pc = document.createElement("td");
            pc.className = "mdl-data-table__cell--non-numeric";
            pc.id = "pcode_tit_" + i;
            pc.textContent = ct.serial;

            var sze = document.createElement("td");
            sze.className = "mdl-data-table__cell--non-numeric";
            sze.id = "size_tit_" + i;
            sze.textContent = FormatSize(ct.size, 2);

            var enc = document.createElement("td");
            enc.className = "mdl-data-table__cell--non-numeric";
            enc.id = "enc_tit_" + i;
            enc.textContent = ct.encTitleKey;

            row.onclick = function()
            {
                CurPCode = document.getElementById("pcode_" + this.id).innerHTML;
                CurName = document.getElementById("name_" + this.id).innerHTML;
                CurID = document.getElementById("tid_" + this.id).innerHTML;
                CurSize = document.getElementById("size_" + this.id).innerHTML;
                CurKey = document.getElementById("enc_" + this.id).innerHTML;
                var label = document.getElementById("Card_Text_Info");
                label.style.color = "white";
                label.style.fontSize = "12px";
                var card = document.getElementById("Card_TitleInfo");
                card.style.visibility = "visible";
                var text = "<b>" + document.getElementById("name_" + this.id).innerHTML + "</b><br>";
                text += "<br>Product code: " + document.getElementById("pcode_" + this.id).innerHTML;
                text += "<br>ID: " + document.getElementById("tid_" + this.id).innerHTML;
                text += "<br>Title key: " + document.getElementById("enc_" + this.id).innerHTML;
                var pcode = ReadProductCode(document.getElementById("pcode_" + this.id).innerHTML);
                text += "<br><br>Platform: " + pcode.Platform;
                text += "<br>Region: " + pcode.Region;
                text += "<br>Category: " + pcode.Category;
                text += "<br>Type: " + pcode.Type;
                text += "<br><br>Full size: " + document.getElementById("size_" + this.id).innerHTML;
                label.innerHTML = text;
            };
            row.appendChild(nam);
            row.appendChild(pc);
            row.appendChild(tid);
            row.appendChild(sze);
            row.appendChild(enc);
            tbody.appendChild(row);
        }
    });
}

function ReadProductCode(Code)
{
    var ret = {};
    var category = "";
    var platform = "";
    var type = "";
    var id = "";
    var region = "";
    if(Code.length < 10)
    {
        ret["Category"] = "Unknown";
        ret["ID"] = "Unknown";
        ret["Region"] = "Unknown";
        ret["Type"] = "Unknown";
        ret["Platform"] = "Unknown";
    }
    else
    {
        if(Code[3] != "-")
        {
            ret["Category"] = "Unknown";
            ret["ID"] = "Unknown";
            ret["Region"] = "Unknown";
            ret["Type"] = "Unknown";
            ret["Platform"] = "Unknown";
        }
        else
        {
            if(Code[5] != "-")
            {
                ret["Category"] = "Unknown";
                ret["ID"] = "Unknown";
                ret["Region"] = "Unknown";
                ret["Type"] = "Unknown";
                ret["Platform"] = "Unknown";
            }
            else
            {
                var cat = Code[4];
                var cktr = Code[0] + Code[1] + Code[2];
                var typ = Code[6];
                var rgn = Code[9];
                id = Code[7] + Code[8];
                switch(cat)
                {
                    case "P":
                        category = "Cartridge / Downloaded";
                        break;
                    case "N":
                        category = "Digital only / eShop special demo";
                        break;
                    case "M":
                        category = "DLC";
                        break;
                    case "T":
                        category = "eShop demo";
                        break;
                    case "U":
                        category = "Update / Patch";
                        break;
                    default:
                        category = "Unknown";
                        break;
                }
                switch(cktr)
                {
                    case "CTR":
                        platform = "All platforms";
                        break;
                    case "KTR":
                        platform = "New 3DS only";
                        break;
                    case "TWL":
                        platform = "DSiWare (all platforms)";
                        break;
                    default:
                        platform = "Unknown";
                        break;
                }
                switch(typ)
                {
                    case "A":
                    case "B":
                        type = "Original title";
                        break;
                    case "C":
                        type = "New 3DS original title";
                        break;
                    case "E":
                        type = "Card 2 original title";
                        break;
                    case "H":
                        type = "Built-in title";
                        break;
                    case "J":
                        type = "eShop normal title";
                        break;
                    case "P":
                        type = "eShop 3D Classics title";
                        break;
                    case "S":
                        type = "eShop GBA VC title";
                        break;
                    case "T":
                        type = "eShop NES VC title";
                        break;
                    default:
                        type = "Unknown";
                        break;
                }
                switch(rgn)
                {
                    case "A":
                        region = "Region free";
                        break;
                    case "P":
                        region = "Europe / Australia";
                        break;
                    case "E":
                        region = "USA";
                        break;
                    case "J":
                        region = "Japan";
                        break;
                    case "K":
                        region = "Korea";
                        break;
                    case "C":
                        region = "China / Taiwan";
                        break;
                    case "Y":
                        region = "Multiple regions";
                        break;
                    case "W":
                        region = "Hong Kong / Taiwan";
                        break;
                    default:
                        region = "Unknown";
                        break;
                }
            }
        }
    }
    ret["Category"] = category;
    ret["ID"] = id;
    ret["Region"] = region;
    ret["Type"] = type;
    ret["Platform"] = platform;
    return ret;
}

module.exports.Log = Log;
module.exports.AccessTitles = AccessTitles;
module.exports.TitleData = TitleData;
module.exports.TitleDownload = TitleDownload;
module.exports.SearchTitles = SearchTitles;
module.exports.ReadProductCode = ReadProductCode;
module.exports.CheckRequired = CheckRequired;
module.exports.FormatSize = FormatSize;