export type PeerDataType = {
    type: "label",
    label: string
} | {
    type: "audio",
    audio: ArrayBuffer
}