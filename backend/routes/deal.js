const express = require('express');
const router = require('express').Router();
const Deal = require('../controllers/Deal.js');

router.get('/deal/:playerCount', async(req, res) => {
    
    try {

        const playerCount = parseInt(req.params.playerCount);
        const numberOfDecks = 2; // Future extension, can be taken in from the front end as a parameter
        const numberOfCardsDelt = 5; // Future extension,  can be taken in from the front end as a parameter
        
        const game = new Deal(numberOfDecks,playerCount,numberOfCardsDelt); //New Instance of the game
        const result = game.startGame();

        res.json({
            Hands: result.hands,
            Winners : result.winners,
            IsTieBreak: result.isTieBreak,
            errors: false,
            errorMessage:''
        });
        
    }
    catch(err){
        console.log('ERROR In Route /deal:',err);
        res.json({
            Hands: {},
            Winner : {},
            IsTieBreak: false,
            error: true,
            errorMessage : err.toString()
        });
    }
 
});


module.exports = router;