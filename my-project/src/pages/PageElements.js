import styled from 'styled-components';

export const TextBox = styled.input`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: none;
border - radius: 3px;
`;

export const TextArea = styled.textarea`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: #E5F4FC;
border: none;
border - radius: 3px;


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