import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIh7n9YXVEFGzztEV8pZnkcrvk-zdnsQI",
  authDomain: "scmrealtimechat.firebaseapp.com",
  databaseURL: "https://scmrealtimechat-default-rtdb.firebaseio.com",
  projectId: "scmrealtimechat",
  storageBucket: "scmrealtimechat.firebasestorage.app",
  messagingSenderId: "152877947380",
  appId: "1:152877947380:web:78a337d061b5781f5f01a1",
  measurementId: "G-T4YBCJG9LE"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);