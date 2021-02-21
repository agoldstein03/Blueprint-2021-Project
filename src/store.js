import { readable, writable } from 'svelte/store';
export const 
    count = writable(5),
    unused = writable("Not being used"),
    audioContext = readable(new AudioContext());
