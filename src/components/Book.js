import React, { useEffect, useState } from 'react';
import {Col, Card, Modal,Button, Pagination,Row} from 'antd';
import 'antd/dist/antd.css';
import '../styles/App.css';

const Books = ( props ) => {
    const [ catalogBooks, setcatalogBooks ] = useState( props.catalogBooks );
    const [page, setPage] = useState(props.page);
    const [booksInformation, setbooksInformation] = useState([]);
    const [openModal, setopenModal] = useState(false);
    const [id, setId] = useState( null );

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://stark-spire-22280.herokuapp.com/api/books?page=${page}`
            );
            const json = await response.json();
            //console.log("books", json);
            setcatalogBooks(json.data);
            return json;
        };
        fetchBooks();
    }, [page]);

    useEffect(() => {
        const getbooksInformation = async () => {
            if(id){
                const response = await fetch(
                    `https://stark-spire-22280.herokuapp.com/api/books/${id}`
                );
                const booksInformationJson = await response.json();
                //console.log("json", booksInformationJson);
                setbooksInformation(booksInformationJson);
                setopenModal(true);
            }
        };
        getbooksInformation();
    }, [id]);

    const handelSeeModalUp = () => {
        setopenModal(false);
    };

    const handelSeeModalDown = () => {
        setopenModal(false);
    };
    const handlePage = (pages) => {
        setPage(pages);
    }

    
    return(
        <>
            {
                catalogBooks
                    ?
                    catalogBooks.map((book) =>(
                        <Card key = {book.id} 
                                style = { {width: 700, display: 'block' ,/*background:"rgb(0, 1, 78)"*/  }}>

                            <div style={{display: 'flex' ,background:"white"}}>

                                <Row  gutter={15} justify="center">
                                <Col className = "gutter-row">
                                    <div className="border-details">
                                        <img
                                            alt={book.title}
                                            src={book.cover_page}
                                           style={{ width: 200, height: 150  }}/>
                                    </div>
                                </Col>
                                </Row>

                                <Col className = "gutter-row" span={16}>
                                    <div>
                                        <h2 style={{fontWeight: 'light'}}>{book.title}</h2>
                                        <h3>{book.author} </h3>
                                        <h3> {book.year_edition}</h3>
                                        <h3>${book.price}</h3>
                                        <Button className='botonSee' onClick={() => setId(book.id)}>Ver mas...</Button>
                                    </div>
                                </Col>
                            </div>
                        </Card>
                    ))
                    :''
            }
            <Modal visible={openModal} onOk={handelSeeModalUp} onCancel={handelSeeModalDown}  style={{
                                    width: 500, color:"red"
                                }}>
                <div style={{display: 'flex ',color:"blue"}}>
                    <Col className = "gutter-row" span={10}>
                        <div>
                            <p style={{fontWeight: 'light' }}>{booksInformation.title}</p>
                            <p><strong>Autor:</strong> {booksInformation.author}</p>
                            <p><strong>Edition:</strong> {booksInformation.year_edition}</p>
                            <p><strong>Price:</strong> ${booksInformation.price}</p>
                            <p><strong>Editorial:</strong> ${booksInformation.editorial}</p>
                            <p><strong>Pages:</strong> {booksInformation.pages}</p>

                            <p style={{fontWeight: 'bold',color:"blue"}}>Sinopsis:</p>
                            <p>{booksInformation.synopsis}</p>
                            <p><strong>Unvaliable:</strong>
                                {
                                    booksInformation.available === true ?
                                        <p type="primary" > Yes</p> : <p type="danger">No</p>
                                }
                            </p>
                        </div>
                    </Col>
                    <Row>
                    <Col className = "gutter-col">
                        <div>
                            <img alt={booksInformation.title} src={booksInformation.cover_page}
                                style={{
                                    width: 250,
                                    height: 150,
                                    margin: 1
                                }}
                            />
                        </div>
                    </Col>
                    </Row>                 
                   
                </div>
            </Modal>
            <Row>
                <Pagination style={{ textAlign: 'center'}}
                            defaultCurrent={1}
                            total={50}
                            onChange={handlePage}
                />
            </Row>
        </>
    )


}
export default Books;