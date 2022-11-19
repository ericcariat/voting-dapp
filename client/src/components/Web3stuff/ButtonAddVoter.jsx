import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonAddVoter() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputAddress, setInputAddress] = useState("");

  const handleAddressChange = e => {
    //if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(e.target.value)) {
        setInputAddress(e.target.value);
    }
  //};

  // TODO validate checksum address 
  const addVoter = async () => {
    console.log("addVoter");
    await contract.methods.addVoter(inputAddress).send({from: accounts[0]});
    console.log("added voter");
  };

 // useEffect(() => {
 //   if(contract){
 //       theState();
 //   }
 // });

//async function theState(){
//  const data =  await contract.methods.workflowStatus().call({from: accounts[0]});
//    console.log(data);
//    readState(workflowStatus[data]);
//}
  return (
    <div className="btns">

      <input
        type="text"
        placeholder="address"
        value={inputAddress}
        onChange={handleAddressChange}
      />

      <div className="addVoter">
      <button onClick={addVoter} className="input-btn">
        Add a Voter
      </button>
      </div>
    </div>
  );
}

export default ButtonAddVoter;