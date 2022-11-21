import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonProposal( {workflowState, isVoter}) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [proposalList, setProposalList] = useState([]);
    const [text, setText] = useState("");
    const [textVote, setTextVote] = useState("");

    const handleTextChange = e => {
        setText(e.target.value);
    }

    const handleTextVoteChange = e => {
        // check only one digit 
        if (/^[0-9]$/.test(e.target.value)) {
            setTextVote(e.target.value);
        }
    }

    const addVote = async() => {
        console.log("addVote");

        if (textVote === "") {
            alert("Please enter a propasal number !");
            return;
          }

        // Add vote (call smart contract)
        await contract.methods.setVote(textVote).send({from : accounts[0]}).catch(revert => {
            alert("Huston, we have a problem !");
        });

        // clear input 
        setTextVote('');
    }

    const addProposal = async() => {
        console.log("addProposal");

        // Add proposal (call smart contract)
        await contract.methods.addProposal(text).send({from : accounts[0]});
        // store value
        setProposalList(oldArray => [...oldArray,text] );
        // clear input 
        setText('');
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
            { isVoter && workflowState === "3" && (
            <div className="addVoteText">
                <button onClick={addVote} className="input-vote-txt"> Vote for propsal number  </button>
                <input type="text" placeholder="proposalVote" value={textVote} onChange={handleTextVoteChange} />
            </div>
            )}
        </div>
    );
}

export default ButtonProposal;