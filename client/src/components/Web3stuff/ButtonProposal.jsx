import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonProposal( {workflowState, isVoter}) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [proposalList, setProposalList] = useState([]);
    const [text, setText] = useState("");

    const handleTextChange = e => {
        setText(e.target.value);
    }

    const addProposal = async() => {
        console.log("addProposal");

        // Add proposal (call smart contract)
        await contract.methods.addProposal(text).send({from : accounts[0]});
        // store value
        setProposalList(oldArray => [...oldArray,text] );
    }

    return (
        <div className="proposal">
            <div className="list"> List of all proposal:
            {proposalList.map((proposal, id) => {
                return (
                    <h4 key={id}> {id} : {proposal} </h4>
                );
            })}
            </div>
            { isVoter && workflowState === "1" && (
            <div className="addText">
                <button onClick={addProposal} className="input-txt"> Add a proposal </button>
                <input type="text" placeholder="proposalList" value={text} onChange={handleTextChange} />
            </div>
            )}
        </div>
    );
}

export default ButtonProposal;