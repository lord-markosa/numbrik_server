import fs from "fs";

export const readFile = (dataFilePath) =>
    new Promise((resolve, reject) => {
        fs.readFile(dataFilePath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                const dataJson = JSON.parse(data);
                resolve(dataJson);
            }
        });
    });

export const writeFile = (dataFilePath, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
