<template>
  <header>
    <h1>Multiplayer Card Game</h1>
  </header>
  <img class="poker-image" alt="Vue logo" src="./assets/pokerTable.jpg">
  
  <h1 class="welcome">Welcome to this simple multiplayer card game</h1>
  <p>The Following are the rules and conditions/terms of the game</p>
  <div class="rules-container">
    <div class="rules">
      <ol>
        <li>Two 52-Card decks are used.(Each Clicking on Deal Cards refreshes the 52 card deck)</li>
        <li>Players are dealt 5 cards from two 52 card decks, and the winner is the one with the highest score.</li>
        <li>The maximum number of players is 6.</li>
        <li>The minimum number of players is 1.</li>
        <li>The default number of players 6 if no input is entered.</li>
        <li><b>When Ready Click on Deal Cards Button</b></li>
     </ol>
    </div>
  </div>
  
  <CardGame/>
</template>

<script>
import CardGame from './components/CardGame.vue'

export default {
  name: 'App',
  components: {
    CardGame
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  text-align: center;
  color: #212529;
}
body{
  margin-top: 0;
}
.rules-container {
  display: inline-block;
  margin: 0 auto;
  text-align: left;
  max-width: 600px;
}
ol {
    list-style-type: decimal;
  }
.rules{
  text-align: left;
}
header{
  background-color: #563d7c;
  color:white;
  min-height: 4rem;
  margin-bottom: 20px;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .05), inset 0 -1px 0 rgba(0, 0, 0, .1);
  h1{
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
   
    line-height: inherit;
    white-space: nowrap;
  }
}
.welcome{
  margin-top: 1rem;
  margin-bottom: .5rem;
  font-weight: 300;
}
.poker-image{
  width: 520px;
  height: auto;
}
</style>
