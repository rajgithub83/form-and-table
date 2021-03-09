import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import ContactData from './containers/Form/ContactData/ContactData';
import Form from './containers/Form/Form';
import Table from './containers/Table/Table';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Form />
          <ContactData />
          
        </Layout>
      </div>
    );
  }
}

export default App;
/*
<Table />*/