import styled from 'styled-components';

export const TextBox = styled.input`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: 1px solid #E5F4FC;
border-radius: 5px;
`;

export const TextArea = styled.textarea`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: 1px solid #E5F4FC;
border-radius: 5px;
`;

export const ImageUploader = styled.input`
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextRow = styled.div`
  text-align: left;

`;

export const TextBoxRow = styled.div`
  align-self: left;

`;

export const MyTagContainer = styled.div`
display: flex;
align-items: center;
overflow: auto;
justify-content: center;
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: 1px solid #E5F4FC;
border-radius: 5px;
`;

export const MyTermsInput = styled.input`
overflow: auto;
border: none;
border-radius: 5px;
padding: 5px;
padding-left: 5px;
color: ${props => props.inputColor || "black"};
background: none;
`;

export const TermsContainer = styled.div`
display:inline-block;
background-color: #FAF7F7;
`;

export const CheckboxContainer = styled.div`
display:inline-block;
max-width:400px;
word-wrap: break-word;
white-space: pre-wrap;
margin-Left: 45px;
`;

export const MyTags = styled.div`
display: flex;
align-items: center;
margin: 7px 0;
margin-right: 10px;
padding: 0 10px;
padding-right: 5px;
border: 1px solid orange;
border-radius: 5px;
background-color: orange;
white-space: nowrap;
color: white;
`;

export const TagInputs = styled.input`
width: 100%;
min-width: 50%;
overflow: auto;
border: none;
border-radius: 5px;
padding: 14px;
padding-left: 14px;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: none;
`;

export const TagButton = styled.button`
display: flex;
padding: 6px;
border: none;
background-color: unset;
cursor: pointer;
color: white;
`;

export const SubmitBtn = styled.button`
border-radius: 4px;
background: #36A3CF;  //#808080 was original
padding: 10px 22px;
color: white; //#000000 was original
font-weight: bold;
outline: none;
border: none;
vertical-align: middle;
height: 35px;
margin-top: 10px;
align-items: center;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: orange;
	color: #808080;
}
:disabled {
    opacity: 0.4;
  }
`;