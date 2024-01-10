const word = /\w/;

const { body } = document;

async function delay() {
  const amount = Math.round(Math.random() * 60 + 40);
  return new Promise((resolve) => setTimeout(resolve, amount));
}

let pause = false;
body.addEventListener("click", () => {
  pause = true;
});

async function paused() {
  if (pause) {
    return new Promise((resolve) => {
      const unpause = () => {
        pause = false;
        body.removeEventListener("click", unpause);
        resolve();
      };
      
      body.addEventListener("click", unpause);
    });
  } else {
    return Promise.resolve();
  }
}

async function type(string) {
  let length = 0;
  let result = "";
  for (let char of string) {
    word.test(char) ? length++ : length = 0;
    length < 4 && await delay();
    await paused();
    result += char;
    body.textContent = result + "\u25AE";
    scrollTo(0, body.scrollHeight);
  }
  return Promise.resolve();
}

body.parentElement.style.height = "100%";

const style = {
  background: "#000000",
  boxSizing: "border-box",
  color: "#00ff00",
  fontFamily: "monospace",
  fontSize: "16px",
  margin: 0,
  minHeight: "100%",
  overflow: "hidden",
  padding: "8px",
  whiteSpace: "pre-wrap"
};

for (let [key, value] of Object.entries(style)) {
  body.style[key] = value;
}

const content = (document.currentScript.innerHTML + "\n\n").repeat(0xff);

type(content);