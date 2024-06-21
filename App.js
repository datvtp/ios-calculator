import { useState } from "react";
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
  font-size: 70px;
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

const StyledTouchableOpacity = styled.TouchableOpacity`
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
  onPress = () => {},
}) => {
  const h = height ?? width;
  const w = width;

  const onDoPress = () => {
    onPress(text);
  };

  return (
    <ButtonContainer width={w} height={h}>
      <StyledTouchableOpacity
        backgroundColor={backgroundColor}
        onPress={onDoPress}
      >
        <StyledText color={textColor}>{text}</StyledText>
      </StyledTouchableOpacity>
    </ButtonContainer>
  );
};

export default function App() {
  const { width } = useWindowDimensions();
  const buttonContainerWidth = width / 4 - 5;

  const [firstValue, setFirstValue] = useState("");
  const [operator, setOperator] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [clearLabel, setClearLabel] = useState("AC");

  const onKeyPress = (key) => {
    switch (key) {
      case "AC":
        setFirstValue("");
        setOperator("");
        setSecondValue("");
        break;
      case "C":
        if (secondValue) {
          setSecondValue("");
        } else {
          setFirstValue("");
        }

        setClearLabel("AC");
        break;
      case "+/-":
        if (firstValue || secondValue) {
          if (firstValue && !secondValue) {
            setFirstValue(parseFloat(firstValue * -1).toString());
          } else {
            setSecondValue(parseFloat(secondValue * -1).toString());
          }
        }
        break;
      case "%":
        calculate(firstValue, key, secondValue);
        break;
      case "/":
      case "x":
      case "-":
      case "+":
        if (secondValue) {
          calculate(firstValue, operator, secondValue);
        } else {
          setOperator(key);
        }
        break;
      case "=":
        calculate(firstValue, operator, secondValue);
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case ",":
        setClearLabel("C");
        if (!operator) {
          setFirstValue((e) => `${e}${key}`);
        } else {
          setSecondValue((e) => `${e}${key}`);
        }
        break;
    }
  };

  const displayText = (() => {
    if (secondValue) return secondValue;
    if (!firstValue) return "0";

    return firstValue;
  })();

  const calculate = (a = "", o = "", b = "") => {
    let result = 0;

    a = a.replace(",", ".");
    b = b.replace(",", ".");

    switch (o) {
      case "%":
        result = parseFloat(a) / 100;
        break;
      case "/":
        result = parseFloat(a) / parseFloat(b);
        break;
      case "x":
        result = parseFloat(a) * parseFloat(b);
        break;
      case "-":
        result = parseFloat(a) - parseFloat(b);
        break;
      case "+":
        result = parseFloat(a) + parseFloat(b);
        break;
    }

    if (result % 1 !== 0) {
      const digitsValue = result.toString().split(".")[1];
      if (digitsValue.length > 6) {
        result = result.toFixed(6);
      }
    }

    result = result.toString().replace(".", ",");

    setFirstValue(result);
    setOperator("");
    setSecondValue("");
  };

  return (
    <Container>
      <DisplayContainer>
        <DisplayText>{displayText}</DisplayText>
      </DisplayContainer>

      <ButtonsContainer>
        <ButtonsRow>
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text={clearLabel}
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text="+/-"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#A5A5A5"
            textColor="#000"
            text="%"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="/"
            onPress={onKeyPress}
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button
            width={`${buttonContainerWidth}px`}
            text="7"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="8"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="9"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="x"
            onPress={onKeyPress}
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button
            width={`${buttonContainerWidth}px`}
            text="4"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="5"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="6"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="-"
            onPress={onKeyPress}
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button
            width={`${buttonContainerWidth}px`}
            text="1"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="2"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text="3"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="+"
            onPress={onKeyPress}
          />
        </ButtonsRow>
        <ButtonsRow>
          <Button
            width={`${width / 2 - 10}px`}
            height={`${buttonContainerWidth}px`}
            text="0"
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            text=","
            onPress={onKeyPress}
          />
          <Button
            width={`${buttonContainerWidth}px`}
            backgroundColor="#FF9F0A"
            text="="
            onPress={onKeyPress}
          />
        </ButtonsRow>
      </ButtonsContainer>
    </Container>
  );
}
