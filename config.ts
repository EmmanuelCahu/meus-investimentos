import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBS2q52cu5YHiD8o77FL9hKhUso96HZMXw",
  authDomain: "investcahu.firebaseapp.com",
  projectId: "investcahu",
  storageBucket: "investcahu.firebasestorage.app",
  messagingSenderId: "346068595798",
  appId: "1:346068595798:web:cf1bb568944b1a522b77f7",
  measurementId: "G-HCEQ2YCW55"
};

export const app = initializeApp(firebaseConfig);