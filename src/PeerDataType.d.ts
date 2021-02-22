export type PeerDataType = {
    type: "label",
    label: string
} | {
    type: "audio",
    audio: ArrayBuffer
} | {
    type: "bpm",
    bpm: number
}