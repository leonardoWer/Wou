import "s/styles/main.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from "s/providers/ThemeProvider.jsx";
import App from './App.jsx'

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
          <App />
      </ThemeProvider>
  </StrictMode>,
)
