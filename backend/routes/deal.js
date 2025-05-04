const express = require('express');
const router = require('express').Router();
const Deal = require('../controllers/Deal.js');

router.get('/deal', async(req, res) => {
    
    try {
        const playerCount = parseInt(req.query.playerCount);
        const numberOfDecks = parseInt(req.query.numberOfDecks);
        const numberOfCardsDelt = parseInt(req.query.numberOfCardsDelt);

        //Validate the parsed values, throw out error if invalid number
        if (isNaN(playerCount) || isNaN(numberOfDecks) || isNaN(numberOfCardsDelt)) {
            return res.status(400).json({
                status: 400,
                error: true,
                errorMessage: "Bad Request - Invalid playerCount, numberOfDecks, or numberOfCardsDelt",
                data:{
                    Hands: {},
                    Winner : {},
                    IsTieBreak: false,
                }
            });
        }
        
        const game = new Deal(numberOfDecks,playerCount,numberOfCardsDelt); //New Instance of the game
        const result = game.startGame();

        res.status(200).json({
            status: 200,
            error: false,
            errorMessage : "",
            data:{
                Hands: result.hands,
                Winners : result.winners,
                IsTieBreak: result.isTieBreak
            }
        });
        
    }
    catch(err){
        console.log('ERROR In Route /deal:',err);
        res.status(500).json({
            status: 500,
            error: true,
            errorMessage : err.toString(),
            data:{
                Hands: {},
                Winner : {},
                IsTieBreak: false,
            },
        });
    }
 
});


module.exports = router;