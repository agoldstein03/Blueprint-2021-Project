<script lang="ts">
  import Peer from "peerjs";
  import type { PeerDataType } from "./PeerDataType";

  export let id: string;

  const peer = new Peer();
  peer.on("open", (id) => {
    peer.id = peer.id;
  });
  peer.on("error", console.error);
  console.log({ peer });

  const conn = peer.connect(id, { reliable: true });
  conn.on("error", console.error);
  console.log({ conn });

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

  peer.on("connection", (conn) => {
    console.log({ conn });
    conn.on("open", () => {});
    conn.on("data", (data: PeerDataType) => {});
  });
</script>

<template lang="pug">
  p Student
  p {peer.id}
</template>

<style lang="scss">
</style>
