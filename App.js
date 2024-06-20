import { useWindowDimensions } from "react-native";

import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const DisplayContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding-left: 30px;
  padding-right: 30px;
`;

const DisplayText = styled.Text`
  color: white;
  font-size: 60px;
`;

const ButtonsContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 30px;
`;

const ButtonContainer = styled.View`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  border-width: 1px;
  padding: 10px;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.backgroundColor};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${(p) => p.color};
  font-size: 25px;
`;

const Button = ({
  width,
  height = null,
  text,
  backgroundColor = "#333333",
  textColor = "#FFFFFF",
}) => {
  const h = height ?? width;
  const w = width;

  return (
    <ButtonContainer width={w} height={h}>
      <StyledButton backgroundColor={backgroundColor}>
        <StyledText color={textColor}>{text}</StyledText>
      </StyledButton>
    </ButtonContainer>
  );
};

export default function App() {
  const { width } = useWindowDimensions();
  const buttonContainerWidth = width / 4 - 5;

  return (
    <Container>
      <DisplayContainer>
        <DisplayText>0</DisplayText>
      </DisplayContainer>

      <ButtonsContainer>
        <ButtonsRow>
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text="AC"
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text="+/-"
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text="%"
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="/"
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button width={`${buttonContainerWidth}px`} text="7" />
          <Button width={`${buttonContainerWidth}px`} text="8" />
          <Button width={`${buttonContainerWidth}px`} text="9" />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="x"
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button width={`${buttonContainerWidth}px`} text="4" />
          <Button width={`${buttonContainerWidth}px`} text="5" />
          <Button width={`${buttonContainerWidth}px`} text="6" />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="-"
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button width={`${buttonContainerWidth}px`} text="1" />
          <Button width={`${buttonContainerWidth}px`} text="2" />
          <Button width={`${buttonContainerWidth}px`} text="3" />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="+"
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button
            width={`${width / 2 - 10}px`}
            height={`${buttonContainerWidth}px`}
            text="0"
          />
          <Button width={`${buttonContainerWidth}px`} text="," />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="="
          />
        </ButtonsRow>
      </ButtonsContainer>
    </Container>
  );
}
