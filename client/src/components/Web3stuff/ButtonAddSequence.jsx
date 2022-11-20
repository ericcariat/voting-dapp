import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ButtonAddSequence({ workflowState, setworkflowState, isAdmin, isVoter }) {
    const { state: { contract, accounts, web3 } } = useEth();
  

    const getWorkFlowState = async() => {
        const stateWflow = await contract.methods.workflowStatus().call({from : accounts[0]});
        setworkflowState(stateWflow);
    }
    
    const startProposalsRegistering = async() => {
        console.log("startProposalsRegistering");
        await contract.methods.startProposalsRegistering().send({from : accounts[0]});
        getWorkFlowState();
    }

    const endProposalsRegistering = async() => {
        console.log("endProposalRegistering");
        await contract.methods.endProposalsRegistering().send({from : accounts[0]});
        getWorkFlowState();
    }

    const startVotingSession = async() => {
        console.log("startVotingSession");
        await contract.methods.startVotingSession().send({from : accounts[0]});
        getWorkFlowState();
    }

    const endVotingSession = async() => {
        console.log("endVotingSession");
        await contract.methods.endVotingSession().send({from : accounts[0]});
        getWorkFlowState();
    }

    const tallyVotes = async() => {
        console.log("tallyVotes");
        await contract.methods.tallyVotes().send({from : accounts[0]});
        getWorkFlowState();
    }

    return (
        <div className="btns_sequence">
                <div className="actual_sequence">
                   Current state : {workflowState}
                </div>
                    {isAdmin && (<h3>Please select the next state</h3>)}
                    {isAdmin && workflowState === "0" && (<button onClick={startProposalsRegistering}>Start proposals</button>)}
                    {isAdmin && workflowState === "1" && (<button onClick={endProposalsRegistering}>End proposal</button>)}
                    {isAdmin && workflowState === "2" && (<button onClick={startVotingSession}>Start voting</button>)}
                    {isAdmin && workflowState === "3" && (<button onClick={endVotingSession}>End voting</button>)}
                    {isAdmin && workflowState === "4" && (<button onClick={tallyVotes}>Tally votes</button>)}
        </div>
        );
}

export default ButtonAddSequence;