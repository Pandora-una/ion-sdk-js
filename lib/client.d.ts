/// <reference path="../decs.d.ts" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Peer, ProtooOptions } from 'protoo-client';
import * as log from 'loglevel';
import { LocalStream, RemoteStream } from './stream';
import { TrackInfo } from './proto';
interface Config {
    url: string;
    uid?: string;
    options?: ProtooOptions;
    rtc?: RTCConfiguration;
    loglevel?: log.LogLevelDesc;
}
export default class Client extends EventEmitter {
    dispatch: Peer;
    uid: string;
    rid: string | undefined;
    localStreams: LocalStream[];
    streams: {
        [name: string]: RemoteStream;
    };
    knownStreams: Map<string, Map<string, TrackInfo[]>>;
    constructor(config: Config);
    broadcast(info: any): Promise<import("protoo-client").Response>;
    join(rid: string, info?: {
        name: string;
    }): Promise<void>;
    publish(stream: LocalStream): Promise<void>;
    unpublish(stream: LocalStream): Promise<void>;
    subscribe(mid: string): Promise<RemoteStream>;
    leave(): Promise<void>;
    close(): void;
    private onRequest;
    private onNotification;
}
export {};
