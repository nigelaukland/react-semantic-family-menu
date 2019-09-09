import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './containers/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        App goes here
      </Layout>
    </BrowserRouter>
  );
}

export default App;
