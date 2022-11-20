import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import ButtonAddVoter from "./ButtonAddVoter";
import ButtonAddSequence from "./ButtonAddSequence";
import ButtonProposal from "./ButtonProposal";


function Web3stuff() {
  const { state: { contract, accounts } } = useEth();
  const [balance, setBalance] = useState();
  const [ownerAddress, setOwnerAddress] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [isVoter, setVoter] = useState(false);
  const [listAddress, setlistAddress] = useState([]);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [workflowState, setworkflowState] = useState("0");

  /** Check if we are the owner and set isAdmin var and store owner address
   */
  const getOwner = async () => { 
    const ownervar = await contract.methods.owner().call({from:accounts[0]});
    console.log("owner : " + ownervar + " accounts[0] : " + accounts[0] );
    console.log("isOwner : " + (ownervar.toLowerCase() === accounts[0].toLowerCase()));
    setAdmin((ownervar.toLowerCase() === accounts[0].toLowerCase()));
    if ( setAdmin ) { 
      setOwnerAddress(ownervar);
    }
  };

  function getVoter() {
    /* check if this account is one of the voters */
    let isFound = false;
    listAddress.map((address, id) => {
      if ((address.toLowerCase() === accounts[0].toLowerCase())) {
        isFound = true;
      }
    })

    setVoter(isFound);
    console.log("listAddress: ", listAddress );
    console.log("isVoter: ", isFound );
  };

  useEffect(() => {
    console.log("contract.methods", contract);

    if (contract?.methods) {
      getOwner();
      getVoter();
    }
  }, [contract]);

  return (
    <div className="web3stuff">
        <Address accounts={accounts} />
        <div className="section1">
          {isAdmin==true ? <div className="adminDiv">Owner : YES</div> : <div className="adminDiv">Owner : NO</div>  } 
          {isAdmin==true && (<div className="ownerAddressClass"> The owner address is: <br /> {ownerAddress} <br /> </div>)}
          {isVoter==true ? <div className="voterDiv">Voter : YES</div> : <div className="adminDiv">Voter : NO</div>  } 
        </div>

          <div className="section2"> 
              <ButtonAddVoter workflowState={workflowState} isAdmin={isAdmin} listAddress={listAddress} setlistAddress={setlistAddress} />
              <div className="section3">
                  <ButtonAddSequence workflowState={workflowState} setworkflowState={setworkflowState} isAdmin={isAdmin} isVoter={isVoter}  />
              </div>
              <div className="section4">
                  <ButtonProposal workflowState={workflowState} isVoter={isVoter} />
              </div>
         </div>
         <div className="listVoter"> List of all voters address in Index:
            {listAddress.map((address, id) => {
                return (
                    <h4 key={id}> {id} : {address} </h4>
                );
            })}
            </div>
    </div>
  );
}

export default Web3stuff;
