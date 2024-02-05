import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import "../styles/Account.css";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="account-container">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <li className="disconnect" onClick={() => disconnect()}>
        Disconnect
      </li>
    </div>
  );
};

export default Account;
