import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import ButtonAddVoter from "./ButtonAddVoter";
import ButtonAddSequence from "./ButtonAddSequence";
import ButtonProposal from "./ButtonProposal";


function Web3stuff() {
  const { state: { contract, accounts } } = useEth();
  const [balance, setBalance] = useState();
  const [owner, setOwner] = useState("");
  const [isAdmin, setAdmin] = useState("false");
  const [isVoter, setVoter] = useState("false");
  const [listAddress, setlistAddress] = useState([]);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  
  const getOwner = async () => {
    
    const ownervar = await contract.methods.owner().call({from:accounts[0]});
    console.log("owner : " + ownervar + " accounts[0] : " + accounts[0] );
    console.log("isOwner : " + (ownervar.toLowerCase() === accounts[0].toLowerCase()));
    setAdmin((ownervar.toLowerCase() === accounts[0].toLowerCase()));
    setOwner(ownervar);
  };

  useEffect(() => {
    console.log("contract.methods", contract);

    if (contract?.methods) {
      getOwner();
    }
  }, [contract]);

  return (
    <div className="web3stuff">
        <Address accounts={accounts}/>
        {(owner && owner.length > 0) && (
                <div className="ownerAddressClass">
                    The owner address is: <br /> {owner} <br />
                </div>
        )}
        <div className="section1">
          {isAdmin==true ? <div className="adminDiv">Owner is connected : YES</div> : <div className="adminDiv">Owner is connected : NO</div>  } 
        </div>

        { // Only for the owner ;-)
         isAdmin && (
          <div className="section2">
            <ButtonAddVoter />
              
              <div className="section3">
              <ButtonAddSequence />
            
            </div>
         </div>
        )}

        { // Only for voters
         isVoter && (
        <div className="section4">
          <ButtonProposal />
        </div> )}
        
    </div>
  );
}

export default Web3stuff;
