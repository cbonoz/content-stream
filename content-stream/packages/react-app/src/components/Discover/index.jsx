import React from "react";
import PropTypes from "prop-types";
import { EXAMPLE_CARDS } from "./util";
import StreamCard from "../StreamCard";

const DEFAULT_LOCK = "0xcB604f078E85e161A77429BBDBe69F505497e7cB";

window.unlockProtocolConfig = {
  network: 4, // Network ID (1 is for mainnet, 4 for rinkeby... etc)
  locks: {
    [DEFAULT_LOCK]: {
      // 0xabc is the address of a lock.
      name: "My Twitch Stream 5/27",
      network: 4, // you can customize the network for each lock
    },
    "0xghi": {
      // if no name is used, the default from the contract is used
    }, // you can add as many locks as you want.
  },
  icon: "https://i.ibb.co/FbQVYRw/contenticon.png", // Hosted App icon.
  callToAction: {
    default: "This Stream. Pay with cryptocurrency to access it!",
    expired: "This is what is shown when the user had a key which is now expired",
    pending:
      "This is the message shown when the user sent a transaction to purchase a key which has not be confirmed yet",
    confirmed: "This is the message shown when the user has a confirmed key",
    noWallet: "This is the message shown when the user does not have a crypto wallet which is required...",
  },
  referrer: "0xreferrer", // Address of the referrer who will earn UDT governance tokens if the transaction is elligible.
};

function Discover(props) {
  return (
    <div className="content">
      {EXAMPLE_CARDS.map((x, i) => {
        return <StreamCard key={i} data={x} />;
      })}
    </div>
  );
}

export default Discover;
