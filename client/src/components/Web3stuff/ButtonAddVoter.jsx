import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonAddVoter(props) {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputAddress, setInputAddress] = useState("");
  const [listAddress, setListAddress] = useState([]);

  const handleAddressChange = e => {
    if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(e.target.value)) {
        setInputAddress(e.target.value);
        console.log("isAdmoin = ",props.isAdmin);
    }
  };

  // TODO validate checksum address 
//   const addVoter = async () => {
//     console.log("add a voter");
//     const transac = await contract.methods.addVoter(inputAddress).send({from: accounts[0]});
//     //setListAddress( arr => [...arr, inputAddress]);
//     //console.log("listAddress : ", listAddress);
//   };

  const addVoter = async () => {

    const transac = await contract.methods.addVoter(inputAddress).send({from: accounts[0]});
        
    console.log("added voter");
        
    let addresses = await contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
        });
    
    setListAddress(
        addresses.map((add) => {
            return add.returnValues.voterAddress;
            })
        );
    console.log("List all voter address ",listAddress);
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

        <input type="text" placeholder="addressList" value={inputAddress} onChange={handleAddressChange} />

            <div className="addVoter">
            
                <button onClick={addVoter} className="input-btn"> Add a Voter </button>

            </div>

        </div>
  );
}

export default ButtonAddVoter;