import styled from "styled-components";

export const TagContainer = styled.div`
  
  background-color: ${props => props.theme["yellow-light"]};
  border-radius: 8px;
  padding: 4px 8px;
  
  h5 {
    text-transform: uppercase;
    font-size: 10px;
    color: ${props => props.theme["yellow-dark"]}
  }
`;