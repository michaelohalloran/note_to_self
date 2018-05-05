import React from 'react';
import {mount} from 'enzyme';
import Note from './Note';

describe('Note', ()=> {
    //this mounts Note component
    let note = mount(<Note note={'test note'}/>); 

    it('renders the note text', ()=>{
        console.log(note.debug());
        expect(note.find('p').text()).toEqual('abc');
    });

})