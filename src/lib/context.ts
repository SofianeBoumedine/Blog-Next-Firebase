import firebase from "firebase/compat";
import { createContext } from "react";
import { auth } from "./firebase";
import { User as FirebaseUser } from "firebase/auth";
import {User} from '@firebase/auth-types';


export interface user {
    uid:             string;
    email:           string;
    emailVerified:   boolean;
    displayName:     string;
    isAnonymous:     boolean;
    photoURL:        string;
    providerData:    ProviderDatum[];
    stsTokenManager: StsTokenManager;
    createdAt:       string;
    lastLoginAt:     string;
    apiKey:          string;
    appName:         string;
}

export interface ProviderDatum {
    providerId:  string;
    uid:         string;
    displayName: string;
    email:       string;
    phoneNumber: null;
    photoURL:    string;
}

export interface StsTokenManager {
    refreshToken:   string;
    accessToken:    string;
    expirationTime: number;
}

export const UserContext = createContext({ 
    //user: firebase.auth.Auth, username: null||undefined 
    user:null, username: null
})