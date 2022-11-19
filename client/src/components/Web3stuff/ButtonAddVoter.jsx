import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonAddVoter(props) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [inputAddress, setInputAddress] = useState("");
    const [listAddress, setListAddress] = useState([]);

    const handleAddressChange = e => {
        // allow only hex digit for the address
        if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(e.target.value)) {
            setInputAddress(e.target.value);
        }
    };

    const addVoter = async () => {
        // use addVoter from the smart contract 
        const transac = await contract.methods.addVoter(inputAddress).send({from: accounts[0]});
        console.log("added voter");

        // retreive all past events, and build the list of address
        let addresses = await contract.getPastEvents("VoterRegistered", {
            fromBlock: 0,
            toBlock: "latest",
            });

        // add the return value "voterAddress" to listAddress    
        setListAddress(
            addresses.map((add) => {
                return add.returnValues.voterAddress;
                })
            );

        // debug ;-)    
        console.log("List all voter address ",listAddress);
    };

    return (
        <div className="btns">

        <input type="text" placeholder="addressList" value={inputAddress} onChange={handleAddressChange} />

            <div className="addVoter">
                <button onClick={addVoter} className="input-btn"> Add a Voter </button>
            </div>

            <div className="list"> List of all voters address:
            {listAddress.map((address, id) => {
                return (
                    <h4 key={id}> {id} : {address} </h4>
                );
            })}
            </div>
        </div>
        );
}

export default ButtonAddVoter;