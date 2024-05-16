import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/app/App.jsx'

const container = document.getElementById('reactApp');
const root = createRoot(container);
root.render(<App/>);