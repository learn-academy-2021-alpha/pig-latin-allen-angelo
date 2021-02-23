import React, { Component } from 'react'
import './App.css'
import AudioPlayer from './components/AudioPlayer'


class App extends Component {
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are some test words hard coded to make the process of testing your code a bit faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear.",
      // "translatedFontColor" - red when not translated, green when translated
      translatedFontColor: "red"
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {

    // Check if the phrase was empty
    if (this.state.phrase === '') {
      this.setState({
        phraseTranslated: 'Please enter a valid word or phrase!!!',
        translatedFontColor: "black"
      })
      return;
    }

    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      // let vowelsArray = currentWord.split("").filter(vowel => {
      //   let lowerCaseVowel = vowel.toLowerCase()
      //   return lowerCaseVowel === "a" || lowerCaseVowel === "e" || lowerCaseVowel === "i" || lowerCaseVowel === "o" || lowerCaseVowel === "u"
      // })
      // console.log("vowelsArray:", vowelsArray)

      // your code here!

      // Remember: console.log is your friend :)

      // Create an array of vowels that we'll check against
      let vowels = ['a', 'e', 'i', 'o', 'u']

      let vowelIndex = 0
      // Split the word into an array
      let wordArray = currentWord.split("")
      //craete a function that recognizes puncuation
      let puncuation = ["!", ",", ".", "?"]
      console.log(puncuation);
      // Case 1 - Word starts with a vowel, add way at the end
      if ( vowels.includes(wordArray[0].toLowerCase()) ) {
        // Return a string of the current word plus 'way'
        if ( currentWord === currentWord.toUpperCase() ) {
          return currentWord + 'WAY'
        } else {
          return currentWord + 'way'
        }
      // Case 2 - Sometimes 'y'
      } else if (!currentWord.toLowerCase().includes("a") && !currentWord.toLowerCase().includes("e") && !currentWord.toLowerCase().includes("i") && !currentWord.toLowerCase().includes("o") && !currentWord.toLowerCase().includes("u")) {

        for(let i = 0; i < wordArray.length; i++) {
          if("y".includes(wordArray[i].toLowerCase())) {
            vowelIndex = i
            // vowelIndex = currentWord.indexOf(char)
            break
          }
        }
        //return final string
        if ( currentWord === currentWord.toUpperCase() ) {
          return currentWord.slice(vowelIndex) + currentWord.slice(0, vowelIndex) + "AY"
        } else {
          return currentWord.slice(vowelIndex) + currentWord.slice(0, vowelIndex) + "ay"
        }
      } else {
        //return a new string with the begininng consonents at the end + 'ay'
        for(let i = 0; i < wordArray.length; i++) {
          if(vowels.includes(wordArray[i].toLowerCase())) {
            if (wordArray[i-1].toLowerCase() === "q" && wordArray[i].toLowerCase() === "u") {
              continue
            }
            vowelIndex = i
            break
          }
        }
        //return final string
        if ( currentWord === currentWord.toUpperCase() ) {
          return currentWord.slice(vowelIndex) + currentWord.slice(0, vowelIndex) + "AY"
        } else {
          return currentWord.slice(vowelIndex) + currentWord.slice(0, vowelIndex) + "ay"
        }
      }




      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      // return currentWord
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({
      phraseTranslated: translatedWords,
      translatedFontColor: "green"
    })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "This is where your translated sentence will appear.",
      translatedFontColor: "red"
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({ phrase: e.target.value })
  }

  render() {
    return (
      <>
        <h1>Pig Latin Translator</h1>
        <h3 id="musicText">Play Me!</h3>
        <AudioPlayer />
        <br />
        <img
          src="https:www.holidogtimes.com/wp-content/uploads/2017/12/micro-pig-myth-cover.png"
          alt="pig with butcher cut names in pig latin"
          id="butcherPig"
        />
        <div id="box">
          <h4>Enter phrase to be translated!:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            id="inputPhrase"
            onChange={ this.handleInput }
            value={ this.state.phrase }
            placeholder="Enter word or phrase here"
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={ this.setUpPreventDefault }>Submit</button>
          <button onClick={ this.restartGame }>Clear</button>
        </div>
        <p id="key">Red: untranslated</p>
        <p id="key2">Green: translated</p>
        <div id="box2">
        <p id="output" style={{color: this.state.translatedFontColor}}>
          { this.state.phraseTranslated }
        </p>
        </div>
        <footer>Coded by ~Allen & Angelo</footer>
      </>
    )
  }
}

export default App
