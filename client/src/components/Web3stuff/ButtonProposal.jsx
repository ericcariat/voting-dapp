import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonProposal(props) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [proposalList, setProposalList] = useState("0");
    const [text, setText] = useState("");

    const handleTextChange = e => {
        setText(e.target.value);
    };

    const addProposal = async() => {
        console.log("addProposal");
        await contract.methods.addProposal(text).send({from : accounts[0]});
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
            <div className="addText">
                <button onClick={addProposal} className="input-txt"> Add a proposal </button>
                <input type="text" placeholder="proposalList" value={text} onChange={handleTextChange} />
            </div>
        </div>
    );
}

export default ButtonProposal;