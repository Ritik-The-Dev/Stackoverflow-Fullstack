import React, { useEffect } from 'react';
import './TextEditor.css';
const RichTextEditor = ({setcodevalue}) => {

  const handleInput = (e) => {
    // Update the state with the new content
    setcodevalue(e.target.innerHTML);
  };
  
 const handleClick = (command) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    document.execCommand(command, false, null);
    if (selection.isCollapsed) {
      range.selectNodeContents(startContainer);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
 };
const commands = {
  B: 'bold',
  I: 'italic',
  U: 'underline',
  $: 'strikethrough',
  Undo: 'undo',
  Redo: 'redo',
  Left: 'justifyLeft',
  Center: 'justifyCenter',
  Right: 'justifyRight',
  OrderedList: 'insertOrderedList',
  UnorderedList: 'insertUnorderedList',
};

const renderToolbar = () => {
  return (
    <div className="toolbar">
      {Object.keys(commands).map((command) => (
        <button
          style={{ marginRight: "10px", marginBottom: "10px"}}
          key={command}
          className="option-button"
          id={commands[command]}
          onClick={() => handleClick(commands[command])}>
          {command}
        </button>
      ))}
    </div>
  );
};


  useEffect(() => {
    const advancedOptionButton = document.querySelectorAll('.adv-option-button');
    const fontName = document.getElementById('fontName');
    const fontSizeRef = document.getElementById('fontSize');
    const alignButtons = document.querySelectorAll('.align');
    const spacingButtons = document.querySelectorAll('.spacing');
    const formatButtons = document.querySelectorAll('.format');
    const scriptButtons = document.querySelectorAll('.script');

    // List of fontlist
    const fontList = [
      'Arial',
      'Verdana',
      'Times New Roman',
      'Garamond',
      'Georgia',
      'Courier New',
      'cursive',
    ];


    const initializer = () => {

      highlighter(alignButtons, true);
      highlighter(spacingButtons, true);
      highlighter(formatButtons, false);
      highlighter(scriptButtons, true);


      fontList.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
      });


      for (let i = 1; i <= 7; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
      }
      fontSizeRef.value = 3;
    };


    const modifyText = (command, defaultUi, value) => {
      document.execCommand(command, defaultUi, value);
    };


    advancedOptionButton.forEach((button) => {
      button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
      });
    });
    const highlighter = (className, needsRemoval) => {
      className.forEach((button) => {
        button.addEventListener('click', () => {
          if (needsRemoval) {
            let alreadyActive = false;
            if (button.classList.contains('active')) {
              alreadyActive = true;
            }
            highlighterRemover(className);
            if (!alreadyActive) {
              button.classList.add('active');
            }
          } else {
            button.classList.toggle('active');
          }
        });
      });
    };
    const highlighterRemover = (className) => {
      className.forEach((button) => {
        button.classList.remove('active');
      });
    };

    window.onload = initializer();
  }, []);

  return (
    <div className="container">
        <div className="main" style={{border:"2px solid"}}>
      <div className="options">
         {renderToolbar()}
<select id="formatBlock" className="adv-option-button" style={{ marginRight: "20px" }}>
<option value="p">Paragraph</option>
  <option value="H1">H1</option>
  <option value="H2">H2</option>
  <option value="H3">H3</option>
  <option value="H4">H4</option>
  <option value="H5">H5</option>
  <option value="H6">H6</option>
</select>

        <select id="fontName" className="adv-option-button" style={{marginRight:"20px"}}></select>
        <select id="fontSize" className="adv-option-button" style={{marginRight:"20px"}}></select>
        <div className="input-wrapper">
          <input type="color" id="foreColor" className="adv-option-button" />
          <label htmlFor="foreColor">Font Color</label>
        </div>
      </div>
      <div
      className='editor'
      style={{height:"22rem", width:"96%", border:"none",overflowY:"auto"}}
        id="text-input"
        contentEditable
        dangerouslySetInnerHTML={{ __html: '' }}
        onInput={handleInput}
      />
      </div>
    </div>
  );
};

export default RichTextEditor;
