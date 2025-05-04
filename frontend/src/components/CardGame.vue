<template>
    <div class="card-game">
      <div>
        <label class="pr-3 playerCounterLabel" for="playerCount">
          Number of players (1-6) :
        </label>
        <input
          id="playerCount"
          type="number"
          v-model.number="playerCount"
          min="1" 
          max="6" 
          @input="validateInput()"
        />
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button class="btn btn-primary" v-show="error.length==0" @click="dealCards">Deal Cards</button>
      <div v-if="Hands.length > 0">
        <h2 class="winner" v-if = "Winners.length === 1"> The Winner  is Player :  {{ Winners[0].playerIndex+1 }}</h2>
        <h2 v-else-if = "Winners.length > 1 && isTieBreak "> The Tie was an unbreakable tie break, the  winners are players {{ Winners.map(h => h.playerIndex).join(', ') }} </h2>
        <div class="hands-container">
        <div v-for="(item, index) in Hands" :key="item.id"
        class="hand"
        :style="{
            border: item.total === Winners[0]?.total
              ? '6px dotted blue'
              : '1px solid #fff',
            padding: '8px',
            margin: '8px auto',
            display: 'block',
            width: 'fit-content'
          }"
        >
          <h2>Player {{ index + 1 }}  Score : {{ item.total }}</h2>
          <handRenderer :playerHand="item.playerHand" />
        </div>
      </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import handRenderer from './HandRenderer.vue'
export default {
  data()
  {
    return { 
       Hands: [],
       Winners:{},
       isTieBreak: false,
       playerCount: 6,
       validatedPlayerCount: null,
       error: ''
       };
  },
  methods:
  {
    validateInput() {
      // Check if input is a valid integer between 1 and 6
      if (!Number.isInteger(this.playerCount)) {
        this.error = 'Please enter a whole number between 1 and 6';
      }
      else if (this.playerCount < 1) {
        this.playerCount = 1;
      } 
      else if (this.playerCount > 6) {
        this.playerCount = 6;
      }else {
        this.error = '';
      }
    },
    async dealCards()
    {
      try
      {
        const response = await axios.get(`http://localhost:3000/deal/${this.playerCount}`);
        
        if(!response.data.error){
          this.Hands = response.data.Hands;
          this.Winners = response.data.Winners;
          this.isTieBreak = response.data.IsTieBreak;
        }
        else{
          this.error = response.data.errorMessage;
        }
        
        console.log('response.data.', response.data);
      }
      catch (error)
      {
        console.error('Error dealing cards:', error);
        this.error = error;
      }
    }
  }
  ,components:
  {
    handRenderer
  }
};
</script>

<style scoped>
.card-game {
  text-align: center;
  margin-top: 20px;
}
.error-message {
  color: red;
  margin: 20px 20px 40px 20px;
}
.player-input {
  margin: 20px 0;
}


button {
   padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px 20px 20px 20px;


}
.winner{
  color:blue;
}
.playerCounterLabel{
  padding-right: 20px;
}
.hands-container {
  text-align: center;
  width: 100%;
}

</style>
