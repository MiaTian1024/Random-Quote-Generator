const quoteText = document.querySelector(".quote"),
      authorName = document.querySelector(".name"),
      quoteBtn = document.querySelector("button"),
      speechBtn = document.querySelector(".speech"),
      copyBtn = document.querySelector(".copy"),
      twitterBtn = document.querySelector(".twitter");

const API_URL = "http://api.quotable.io/random";
const synth = speechSynthesis;

const getQuote = async () =>{
    quoteBtn.classList.add("loading")
    quoteBtn.innerText = "Loading Quote..."

    const response = await fetch(API_URL)
    const data = await response.json()

    quoteText.innerText = data.content
    authorName.innerText = data.author
    quoteBtn.classList.remove("loading")
    quoteBtn.innerText = "New Quote"
}

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`)
        synth.speak(utterance)
        setInterval(()=>{
            !synth.speaking 
            ? speechBtn.classList.remove("active") 
            : speechBtn.classList.add("active")
        }, 10)
    }
})

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText)
})

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`
    window.open(tweetUrl, "_blank")
})

quoteBtn.addEventListener("click", getQuote)