import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import ButtonAddVoter from "./ButtonAddVoter";

function Web3stuff() {
  const { state: { contract, accounts } } = useEth();
  const [balance, setBalance] = useState();
  const [owner, setOwner] = useState("");
  const [isAdmin, setAdmin] = useState("false");
  const [listAddress, setlistAddress] = useState([]);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState([]);
  const [inputAddress, setInputAddress] = useState("");


  useEffect(() => {
    console.log("contract.methods", contract);

    if (contract?.methods) {
      getOwner();
      //getAddressList();
      //setupLoop();
    }
  }, [contract]);

  useEffect(() => {
    console.log("useEffect2", contract);

    if (contract) {
    (async function () {
 
        let oldEvents= await contract.getPastEvents("VoterRegistered", {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues.voterAddress);
        });
        setOldEvents(oldies);
      }
    )();
    }
  }, []);

  useEffect(() => {
    console.log("Ici c'est bon !", oldEvents);
  }, [oldEvents]);

  const handleAddressChange = e => {
    if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(e.target.value)) {
        setInputAddress(e.target.value);
        console.log("isAdmoin = ",isAdmin);
    }
  };
  const getOwner = async () => {
     
     const ownervar = await contract.methods.owner().call({from:accounts[0]});
     console.log("owner : " + ownervar + " accounts[0] : " + accounts[0] );
     console.log("isOwner : " + (ownervar.toLowerCase() === accounts[0].toLowerCase()));
     setAdmin((ownervar.toLowerCase() === accounts[0].toLowerCase()));
     setOwner(ownervar);
   };
   
   const addVoter = async () => {
    console.log("add a voter");
    const transac = await contract.methods.addVoter(inputAddress).send({from: accounts[0]});
    //setListAddress( arr => [...arr, inputAddress]);
    //console.log("listAddress : ", listAddress);
  };

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

        <div className="section2">
        <input
            type="text"
            placeholder="address"
            value={inputAddress}
            onChange={handleAddressChange}
        />

        <button onClick={addVoter} className="input-btn">
            Add a VoterIdx
        </button>
        </div>
        
    </div>
  );
}

export default Web3stuff;
