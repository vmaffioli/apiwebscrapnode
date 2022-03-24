const express = require('express');
const router = express.Router();
var ig = require('instagram-scraping');

//get instagram posts by tag and user
router.get(`/api/igscrap/searchbytag/`, (req, res) => {
    if (
        req.query.tag !== undefined ||
        req.query.user !== undefined
    ) {
        ig.scrapeTag(req.query.tag).then((result) => {
            let medias = result.medias
            let posts = [];

            medias.forEach(media => {
                if (media.node.owner.id === req.query.user)
                    posts.push(media);
            });
            res.status(200).send(
                posts
            );
        });
    } else {
        res.status(400).send(
            "bad request syntax"
        );
    }
});

//get instagram posts by tag
router.get(`/api/igscrap/searchbytag/test/`, (req, res) => {
    if (req.query.tag !== undefined) {
        ig.scrapeTag(req.query.tag).then((result) => {
            let medias = result.medias
            res.status(200).send(
                medias
            );
        });
    } else {
        res.status(400).send(
            "bad request syntax"
        );
    }
});


router.get(`/`, search);
    

function search(req, res, next){
    if (req.query.tag !== undefined) {
        ig.scrapeTag(req.query.tag).then((result) => {
            let medias = result.medias
            res.status(200).send(
                medias
            );
        });
    } else {
        res.status(400).send(
            "bad request syntax"
        );
    }
}

module.exports = router;