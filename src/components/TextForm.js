// import React, { useState } from "react";

// export default function TextForm(props) {
//   const handleUpClick = () => {
//     // console.log("upper case clicked"+text);
//     let newtext = text.toUpperCase();
//     setText(newtext);
//     props.showAlert("convert to uppercase")
//   };
//   const handleLowClick = () => {
//     // console.log("upper case clicked"+text);
//     let newtext = text.toLowerCase();
//     setText(newtext);
//     props.showAlert("convert to lowercase")
//   };
//   const handleBoldClick = () => {
// ;
//     let newtext = "";
//     setText(newtext);
//   };
//   const handleOn = (event) => {
//     // console.log("on Change");
//     setText(event.target.value);
//   };

//   const [text, setText] = useState("enter text here");
//   return (
//     <>
//       <div>
//         <div className="form-floating"  style={{color:props.mode ==='dark'?'white':'black'}}>
//           <h1 >{props.heading}</h1>
//           <textarea
//             className="form-control"
//             placeholder="Leave a comment here"
//             id="mybox"
//             value={text}
//             onChange={handleOn}
//             style={{backgroundColor:props.mode ==='dark'?'grey':'white',color:props.mode ==='dark'?'white':'black'}}
//             rows="8"
//           ></textarea>
//         </div>
//         <button className="btn btn-primary my-3 my-1 " onClick={handleUpClick}>
//           Convert tu UpperCase
//         </button>
//         <button className="btn btn-primary mx-2 my-1" onClick={handleLowClick}>
//           Convert tu LowerCase
//         </button>
//         <button className="btn btn-primary mx-2 my-1" onClick={handleBoldClick}>
//           Clear
//           </button>
//       </div>
//       <div className="container my-3" style={{color:props.mode ==='dark'?'white':'black'}}>
//         <h1>your text summary</h1>
//         <p>
//           {text.split(" ").filter((a1)=>{return a1.length!=0}).length}words and {text.length} characters
//         </p>
//         <p>{0.008 * text.split(" ").length}Minutes to read</p>
//         <h2>Preview</h2>
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }
