/* eslint-disable jsx-a11y/accessible-emoji */
import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Address } from "../components";
import { makeColumn } from "../util";

const highlight = {
  marginLeft: 4,
  marginRight: 8,
  /* backgroundColor: "#f9f9f9", */ padding: 4,
  borderRadius: 4,
  fontWeight: "bolder",
};

const NUM_RESULTS = 20;

// https://thegraph.com/explorer/subgraph/livepeer/livepeer
/*
  day(first: 10) {
    id
      date
        totalActiveStake
          volumeUSD
      }
      */
const EXAMPLE_GRAPHQL = `
{

  transcoders(orderBy: totalVolumeUSD, orderDirection: desc, where: {active: true}, first: ${NUM_RESULTS}) {
    id
    status
    active
    totalStake
    totalVolumeUSD
    serviceURI
  }
}`;
const COLS = ["id", "active", "status", "totalStake", "totalVolumeUSD", "serviceURI"].map(makeColumn);

function Subgraph(props) {
  function graphQLFetcher(graphQLParams) {
    return fetch(props.subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  console.log("data", data);

  const transcoderData = data ? data.transcoders : [];

  return (
    <>
      <div className="content">
        <p>This page shows a live list of transcoders on the ContentStream / LivePeer network.</p>
        <p>
          Stats powered by{" "}
          <a href="https://thegraph.com/explorer/subgraph/livepeer/livepeer" target="_blank">
            The Graph
          </a>{" "}
          and connected to the LivePeer network.
        </p>
        {data ? (
          <div>
            <Table dataSource={transcoderData} columns={COLS} rowKey="id" />
          </div>
        ) : (
          <Typography>{loading ? "Loading..." : deployWarning}</Typography>
        )}

        {/* <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={EXAMPLE_GRAPHQL} />
        </div> */}
      </div>

      <div style={{ padding: 64 }}>...</div>
    </>
  );
}

export default Subgraph;
