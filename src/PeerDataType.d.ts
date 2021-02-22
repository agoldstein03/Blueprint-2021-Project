export type PeerDataType = {
    type: "label",
    label: string
} | {
    type: "audio",
    audio: Int8Array
} | {
    type: "bpm",
    bpm: number
} | {
    type: "note",
    note: number
}