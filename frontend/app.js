let btn = document.querySelector("#askBtn");
let inp = document.querySelector("#userInput");
let div = document.querySelector(".response");
console.log(inp.value)

// async function getdata(inputdata) {
//   let data = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer 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", // <-- put actual full key here
//       "HTTP-Referer": "http://127.0.0.1:5500",
//       "X-Title": "my-ai-test"
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3-70b-instruct", 
//       messages: [
//         { role: "user", content: inputdata }
//       ]
//     })
//   });

//   if (!data.ok) {
//     const errText = await data.text();
//     div.textContent = `Error ${data.status}: ${errText}`;
//     return;
//   }

//   const res = await data.json();
//   div.textContent = res.choices[0].message.content;
// }

// btn.addEventListener("click", () => {
//   const userQuestion = inp.value.trim();
//   if (userQuestion === "") {
//     div.textContent = "Please type your question.";
//     return;
//   }

//   div.textContent = "Thinking... 🤖";
//   getdata(userQuestion);
// });


async function getdatabhai(input) {
    let res = await fetch("http://localhost:3000/", {
      method: "POST",   
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })  // ✅ Send data to backend
    });
  
    const data = await res.text()
    console.log(data.output);
    console.log(typeof data.output);
    div.textContent=data;
    btn.disabled=false;
    
  }
  

  btn.addEventListener('click',()=>
{ 
    let input=inp.value;
    getdatabhai(input);
    inp.value=""
    div.textContent="genearting the response"
    btn.textContent="processing"
    btn.disabled=true
  
})

  