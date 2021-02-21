<script lang="ts">
  import Peer, { DataConnection, PeerConnectOption } from "peerjs";
  import type { PeerDataType } from "./PeerDataType";
  import { onMount } from "svelte";

  export let id: string;

  let peer: Peer | undefined;
  let conn: DataConnection | undefined;

  onMount(() => {
    peer = new Peer();
    peer.on("open", (localId) => {
      peer.id = peer.id;
      conn = peer.connect(id, { reliable: true });
      conn.on("error", console.error);
      conn.on("open", () => {
        console.log("OPEN");
      });
      console.log({ conn });
    });
    peer.on("error", console.error);
    console.log({ peer });

    peer.on("connection", (conn) => {
      console.log({ conn });
      conn.on("open", () => {});
      conn.on("data", (data: PeerDataType) => {});
    });
  });

  function send(data: PeerDataType) {
    conn.send(data);
  }

  function sendAudio(audio: ArrayBuffer) {
    send({
      type: "audio",
      audio,
    });
  }

  function sendLabel(label: string) {
    send({
      type: "label",
      label,
    });
  }

  console.log(sendLabel);

  var timeElapsed = 0;
  var timerID = -1;
  var recording = false;

  function check() {
    if (recording == true) {
      stop();
    } else {
      console.log("entered");
      start();
    }
  }

  function tick() {
    timeElapsed++;
    var min = timeElapsed / 60;
    var sec = timeElapsed % 60;
    min = Math.floor(min);
    min = pad(min);
    sec = pad(sec);
    document.getElementById("minutes").innerHTML = min;
    document.getElementById("seconds").innerHTML = sec;
  }

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  function start() {
    recording = true;
    if (timerID == -1) {
      timerID = setInterval(tick, 1000);
    }
  }

  function stop() {
    console.log("stopped");
    if (timerID != -1) {
      clearInterval(timerID);
      timerID = -1;
    }
  }

  function reset() {
    timeElapsed = -1;
    tick();
  }
</script>

<template lang="pug">
  p Student
  p {peer?.id}
  body
    div.background
      div(data-role='controls')
        button(on:click!="{check}") Record
        h1.time
          span#minutes 00
          span :
          span#seconds 00
  body
</template>

<style>
  .time {
    color: white;
  }

  [data-role="controls"] > button {
    margin: 50px auto;
    outline: none;
    display: block;
    border: none;
    background-color: #d9afd9;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#184cdf),
      to(#bc03fc)
    );
    background-image: -o-linear-gradient(
      bottom,
      #184cdf 0%,
      #7514fe 50%,
      #bc03fc 100%
    );
    background-image: linear-gradient(
      0deg,
      #184cdf 0%,
      #7514fe 50%,
      #bc03fc 100%
    );
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-indent: -1000em;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3) inset,
      0px 0px 0px 30px #fff, 0px 0px 0px 35px #333;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3) inset, 0px 0px 0px 30px #fff,
      0px 0px 0px 35px #333;
  }
  [data-role="controls"] > button:hover {
    background-color: #ee7bee;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#1311bc),
      to(#6f00bc)
    );
    background-image: -o-linear-gradient(
      bottom,
      #1311bc 0%,
      #4101bc 50%,
      #6f00bc 100%
    );
    background-image: linear-gradient(
      0deg,
      #1311bc 0%,
      #4101bc 50%,
      #6f00bc 100%
    );
  }

  .background {
    background: #262626;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  html,
  body {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1280px) {
  }

  @media only screen and (min-width: 325px) and (max-width: 768px) {
  }
</style>
