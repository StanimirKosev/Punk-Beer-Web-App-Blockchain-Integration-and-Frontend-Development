import { useConnect } from "wagmi";
import "../styles/WalletOptions.css";
import { useNavigate } from "react-router-dom";

const WalletOptions = () => {
  const navigate = useNavigate();
  const { connectors, connect, failureReason } = useConnect({
    mutation: { onSuccess: () => navigate("/") },
  });

  return (
    <div className="wallet-options">
      <div className="failure-reason">{failureReason?.message}</div>
      <div className="connectors-wrapper">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            className="wallet-option-button"
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletOptions;
