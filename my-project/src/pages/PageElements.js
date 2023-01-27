import styled from 'styled-components';

export const TextBox = styled.input`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "black"};
background: papayawhip;
border: none;
border - radius: 3px;
`;
