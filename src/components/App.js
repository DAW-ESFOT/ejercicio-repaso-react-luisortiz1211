import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Book from "./Book";
import {Layout, Pagination, Row} from 'antd';

const {Header, Footer, Content} = Layout;

function App() {
  const [catalogBooks, setcatalogBooks] =  useState([]);
    const [ page,setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
          `https://stark-spire-22280.herokuapp.com/api/books`
      );
      const json = await response.json();
      console.log("books", json);
      setcatalogBooks(json.data);
      return json;
    };
    fetchBooks();
  }, []);

  return (
          <Layout className="app-book">
            <Header><h1 style={{color:"white"}}>Book-Hi</h1>
            
            </Header>

            <Content>
              <Row gutter={15} justify="center">
                <Book catalogBooks={catalogBooks} />
              </Row>          
              </Content>

              <Footer>
                <Pagination
                size="default"
                responsive={true}
                page={page}/>
              </Footer>     
            
    
      </Layout>);
}

export default App;
