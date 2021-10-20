import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


class NewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            caption: '',
            username: '',
            content: []
        }
    }

    handleChange = (e) => {
        let id = e.target.id;
        if(id === 'title') {
            this.setState({title : e.target.value})
        }
        else if(id === 'caption') {
            this.setState({caption : e.target.value})
        }
        else if(id === 'username') {
            this.setState({username : e.target.value})
        }
    }

    addAttachment = (e) => {
        let files = e.target.files
        let arr = []

        for(let i = 0; i < files.length; ++i) {
            let reader = new FileReader()

            reader.readAsDataURL(files[i])

            reader.onload = () => {
                let attachment = {
                    content_type: files[i]["type"],
                    file_name: files[i]["name"],
                    base64: reader.result
                }

                arr.push(attachment)
            }
        }

        this.setState({content : arr})
    }

    submitPost = (e) => {

        if(this.state.title.length > 0 && this.state.username.length > 0)
        {
            axios({
                method: 'POST',
                url: 'https://backend.vasishtbs95.workers.dev/posts',
                data: JSON.stringify(this.state)
            })
                .then(r => this.setState({posts : null}))
        }
    }

    render() {
        if(this.state.posts === null) {
            return <Redirect to="" />
        }
        else
        {
            return (
                <div className={"container"}>
                    <p>New Post</p>
                    <form>
                        <div>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input className="form-control form-control-sm" onChange={this.handleChange} id="title" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="caption" className="form-label">Caption/Text</label>
                            <input className="form-control form-control-lg" onChange={this.handleChange} id="caption" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input className="form-control form-control-lg" onChange={this.handleChange} id="username" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="formFileLg" className="form-label">Upload Files</label>
                            <input className="form-control form-control-lg" onChange={this.addAttachment} id="formFileLg" type="file" multiple/>
                        </div>
                    </form>

                    <div>
                        <button className={"btn btn-primary"} onClick={this.submitPost}>Submit Post</button>
                    </div>
                </div>
            )
        }
    }
}

export default NewPost;
