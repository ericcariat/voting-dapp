import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import Balance from "./Balance";
import Button from "./Button";
import ButtonAddVoter from "./ButtonAddVoter";

function Web3stuff() {
  const { state: { contract, accounts } } = useEth();
  const [balance, setBalance] = useState();
  const [owner, setOwner] = useState("");
  const [isAdmin, setAdmin] = useState("false");
  const refreshBalance = async () => {

  }

  useEffect(() => {
    if (contract?.methods) {
        refreshBalance();
        getOwner();
    }
  }, [contract]);

  const getOwner = async () => {
     const ownervar = await contract.methods.owner().call({from:accounts[0]});
     console.log("owner : " + ownervar + " accounts[0] : " + accounts[0] );
     console.log("isOwner : " + (ownervar.toLowerCase() === accounts[0].toLowerCase()));
     setAdmin((ownervar.toLowerCase() === accounts[0].toLowerCase()));
     setOwner(ownervar);
   };
   
  return (
    <div className="web3stuff">
        <Address accounts={accounts}/>
        {balance==0 ? <div className="bal">Vous n'avez aucun token pour le moment.</div> : <Balance balance={balance}  />} 
        <Button refreshBalance={refreshBalance}/>
        <ButtonAddVoter />
        {(owner && owner.length > 0) && (
                <div className="paddingBelow">
                    The owner address is: {owner}
                </div>
            )}
    <div className="section">
      {isAdmin==true ? <div className="adminDiv">YES</div> : <div className="adminDiv">NO</div>  } 
    </div>
    </div>
  );
}

export default Web3stuff;
