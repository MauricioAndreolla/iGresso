const News = require("../model/News");
const Images = require("../model/Image");
const upload = require('../utils/multerConfig');
const sequelize = require('../database');
const fs = require('fs');
const path = require('path');

module.exports = {
    async index(request, response) {
        return response.render('news/index', { title: "Noticias" });
    },

    async create(request, response) {
        return response.render('News/Create', { title: "Cadastro de noticias" });
    },


    async addNews(request, response) {
        upload.single("newsImage");
        let { newsTitle, newsText, newsType } = request.body;

        try {
            await News.create({
                    titulo: newsTitle,
                    texto: newsText,
                    tipo: newsType,
                })
                .then((result) => {

                    const rootPath = path.resolve(__dirname.replace('controller', ''), 'public', 'images', 'news');
                    const newsPath = path.join(rootPath, String(result.id));

                    if (!fs.existsSync(newsPath)) {
                        fs.mkdirSync(newsPath, (err) => {
                            if (err) {
                                return console.log("Error at create directory " + err);
                            }
                        });
                    }
                    fs.readdir(rootPath, { withFileTypes: true }, (err, directories) => {
                        if (err) {
                            return console.log("Error reading directory " + err);
                        }

                        const fileResult = directories.filter(directories => directories.isFile());
                        const source = path.join(rootPath, fileResult[0].name);
                        const dest = path.join(newsPath, fileResult[0].name);
                        const pathImage = path.join(String(result.id), fileResult[0].name);

                        fs.rename(source, dest, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });


                });


        } catch (e) {
            return response.json({ text: e.message, status: false });
        }

        return response.json({ text: "Sucesso.", status: true });

    },

}

// select id from "News" order by id DESC limit 1