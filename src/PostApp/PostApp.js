import { Component } from 'react'
import Form from './Form/Form'
import Output from './Output/Output'

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

class PostApp extends Component {

    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getAllPosts();
    }

    submitPostRequest(data) {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((posts) => {
                this.getAllPosts();
                console.log('%cPost Successfully Submitted', 'color:yellow;font-weight:bold');
                
            })
            .catch(e => console.log(e));
    }

    getAllPosts() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(posts => {
                this.setState(() => {
                    return {
                        'posts': posts
                    };
                });
                console.log('%cAll Posts Fetched', 'color:green;font-weight:bold');

            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="PostApp">
                <Form submitPostRequest={this.submitPostRequest} parent={this} />
                <Output posts={this.state.posts} />
            </div>
        )
    }
}

export default PostApp;