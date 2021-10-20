import React, { Component } from "react";
import {Card, Carousel, Table} from "react-bootstrap";
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount = async () => {
        await axios({
            method: "GET",
            url : "https://backend.vasishtbs95.workers.dev/posts",
        }).then(res => this.setState({posts : res.data.posts}))
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    {
                        this.state.posts.length === 0 ? <p>Nothing to see right now. Please come back later</p>
                            :
                            this.state.posts.map(item => {
                                return (
                                    <Table striped bordered hover>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div key={item.uuid}>
                                                    <Card style={{ width: '50rem' }}>
                                                        <Card.Title>
                                                            <Table striped bordered hover size="sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th>@<em>{item.username}</em></th>
                                                                    </tr>
                                                                </thead>
                                                            </Table>
                                                        </Card.Title>

                                                        <Card.Body>
                                                            <Table striped bordered hover size="sm">
                                                                <thead>
                                                                    <tr>
                                                                        <td><Card.Text><strong>{item.title}</strong></Card.Text></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><Card.Text><em>{item.caption}</em></Card.Text></td>
                                                                    </tr>
                                                                </thead>
                                                            </Table>

                                                            {
                                                                item.content === undefined ?
                                                                    <div/>
                                                                    :
                                                                    item.content.length === 1 ?
                                                                        <div>
                                                                            {
                                                                                item.content[0].content_type.startsWith("image/") ?
                                                                                    <Card>
                                                                                        <Card>
                                                                                            <Card.Img variant="top" src={item.content[0].base64} />
                                                                                        </Card>
                                                                                    </Card>
                                                                                    :
                                                                                    <embed src={item.content[0].base64} type={item.content[0].content_type} width="100%" height="800px" />
                                                                            }
                                                                        </div>
                                                                        :
                                                                        <Carousel slide={false} >
                                                                            {
                                                                                item.content.map(part => {
                                                                                    if(part.content_type.startsWith("image/")) {
                                                                                        return ( <Carousel.Item key={part.file_uuid}>
                                                                                                <Card>
                                                                                                    <Card.Img variant="top" src={part.base64} />
                                                                                                </Card>
                                                                                            </Carousel.Item>
                                                                                        )
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        return (
                                                                                            <div>
                                                                                                <embed src={part.base64} type={part.content_type} width="100%" height="800px" />
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                            }
                                                                        </Carousel>
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                                <br/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                )
                            })
                    }
                </div>
            </div>
        )
    }
}

export default Home;
