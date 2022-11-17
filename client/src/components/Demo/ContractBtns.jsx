import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setValueStr }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputValueStr, setInputValueStr] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  const handleInputChangeStr = e => {
      setInputValueStr(e.target.value);
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const fctreadStr = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    setValueStr(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  const fctwriteStr = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValueStr === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValueStr = inputValueStr;
    await contract.methods.setGreet(newValueStr).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <button onClick={fctreadStr}>
        readStr()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <div onClick={fctwriteStr} className="input-btn">
         fctwriteStr(<input
          type="text"
          placeholder="string"
          value={inputValueStr}
          onChange={handleInputChangeStr}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
