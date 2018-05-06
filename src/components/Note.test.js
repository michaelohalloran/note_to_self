import React from 'react';
import {mount} from 'enzyme';
import Note from './Note';

const props = {note: {text: 'test note'}};

describe('Note', ()=> {
    //this mounts Note component
    //also passes in our props note object w/ text property using the spread operator
    let note = mount(<Note {...props}/>); 

    it('renders the note text', ()=>{
        // console.log(note.debug());
        expect(note.find('p').text()).toEqual(props.note.text);
    });

})