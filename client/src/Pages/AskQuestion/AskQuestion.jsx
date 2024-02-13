import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

import RichTextEditor from "./TextEditor";
const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  {/* Code with file */}
  const [QuestionCode, setQuestionCode] = useState("");
  const [file, setfile] = useState("");
  const [showCodeEditor, setshowCodeEditor] = useState("Show Text Editor");


  //
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  //

  const handleSubmit = (e) => {
  e.preventDefault();
  if (User) {
    if (questionTitle && questionBody && questionTags && QuestionCode && file) {
      const formData = new FormData();
      formData.append("questionTitle", questionTitle);
      formData.append("questionBody", questionBody);
      formData.append("questionTags", JSON.stringify(questionTags));
      formData.append("QuestionCode", QuestionCode);
      formData.append("userPosted", User.result.name);
      formData.append("file", file);
      
      dispatch(askQuestion(formData, navigate));
    } else {
      alert("All Fields are Mandatory");
    }
  } else {
    alert("Login to ask a question");
  }
};


  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  //const on onAddCode
  const onAddCode = (e)=>{
    e.preventDefault();
    let textEditor = document.querySelector(".textEditor");
    if(textEditor.classList.contains("hidden")){
      setshowCodeEditor("Hide Text Editor")
    alert("Pls Scroll Down to add Code")}
    else{
      setshowCodeEditor("Show Text Editor")
    }
    textEditor.classList.toggle("hidden")
  }
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <h1>Ask a public Question</h1>
        <Link to={"/"}><button className="review-btn">Back to Home</button></Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>

                {/* Code with file */}
                <div className="codewithfile">
            <label>
              <div>
              <h4>Code</h4>
              <p>Write Code in text Editor it will be automatically add with the Question..</p>
              <button style={{marginRight:"20px"}} className="nav-links" onClick={onAddCode}>{showCodeEditor}</button>
              </div>
              </label>
            <div>
            <h4>Add Image/Video for Reference</h4>
                <input type="file" onChange={(e)=>setfile(e.target.files[0])}/>
                </div>
                </div>
                {/* Code with file */}
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
            <div className="textEditor hidden" style={{height:"100vh"}}>
              <RichTextEditor setcodevalue={setQuestionCode}/>
              </div>
      </div>

    </div>
  );
};

export default AskQuestion;
