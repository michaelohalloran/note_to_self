import React, {Component} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import Note from './Note';
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';

const cookie_key = 'NOTES';

class App extends Component {
    // formRef = React.createRef();

    constructor() {
        super();
        this.updateText = this.updateText.bind(this);
        this.clear = this.clear.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            text: '',
            notes: []
        }
    }

    // updateText = event => {
    //     event.preventDefault();
    //     console.log('fired');
    //     const input = this.formRef.current.value;
    //     this.setState({
    //         text: input
    //     });
    //     event.currentTarget.reset();
    // }
    
    updateText = event => {
        event.preventDefault();
        console.log('fired');
        const input = event.target.value;
        this.setState({
            text: input
        });
        // event.target.value = '';
    }

    componentDidMount() {
        this.setState({ notes: read_cookie(cookie_key)});
    }
    submit() {
        //destructuring, makes notes and text vars from same-named properties
        // //in this.state object
        const {notes, text} = this.state;
        // console.log(notes);
        // console.log(notes.isArray());
        notes.push({text});
        this.setState({notes});
        bake_cookie(cookie_key, this.state.notes);
    }

    clear() {
        //delete cookies
        delete_cookie(cookie_key);
        //set the notes array state to empty
        this.setState({notes: []});
    }
    render() {
        const notes = this.state.notes.map((note, index)=> {
            return <Note key={index} note={note}/>
        });
        return(
            <div>
                <h2>Note to Self</h2>
                <Form inline>
                {/* <Form onSubmit={this.updateText}> */}
                    {/* <FormControl ref={this.formRef}/> */}
                    <FormControl onChange={this.updateText}/>
                    {' '}
                    <Button onClick={(this.submit)}>Submit</Button>
                </Form>
                {notes}
                <hr/>
                <Button onClick={this.clear}>Clear Notes</Button>
            </div>
        );
    }
}

// setTimeout(()=> {
//     console.log(this.state);
// }, 1000);

export default App;

// export const color = 'red';