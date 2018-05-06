import React from 'react';
import {mount} from 'enzyme';
import App from './App';

describe('APP', ()=> {
    let app = mount(<App/>);
    it('should render the App title', ()=> {
        // console.log(app.debug())
        expect(app.find('h2').text()).toEqual('Note to Self');
    });

    it('renders the clear button', ()=> {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('when rendering the form', ()=> {
        it('creates a Form component', ()=> {
            expect(app.find('Form').exists()).toBe(true);
        });

        it('creates a FormControl component', ()=> {
            expect(app.find('FormControl').exists()).toBe(true);
        });

        it('creates a Submit Button', ()=> {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        });
    }); //end of inner describe

    describe('when creating a note', ()=> {
        let testNote = 'test note';

        beforeEach(()=> {
            //find FormControl, simulate change, provide object
            //with our testNote as value
            app.find('FormControl').simulate('change', {
                target: {value: testNote}
            });
        });

        it('updates the text', ()=> {
            expect(app.state().text).toEqual(testNote);
        });

        describe('and submitting a new note', ()=> {
            beforeEach(()=> {
                app.find('.btn').at(0).simulate('click', {
                });
            });

            //simulate click of the clearBtn, which clears all notes
            afterEach(()=> {
                app.find('.btn').at(1).simulate('click');
            });

            it('adds new note to state', ()=> {
                //check first note in this.state.notes array, should = testNote
                // console.log(app.state()); 
                expect(app.state().notes[0].text).toEqual(testNote);
            });

            describe('and remounting a component', ()=> {
                let app2; 

                beforeEach(()=> {
                    app2 = mount(<App />);
                });

                it('reads the stored cookies', ()=> {
                    expect(app2.state().notes).toEqual([{text: testNote}]);
                });
            });

            describe('and clicking clear button', ()=> {
                beforeEach(()=> {
                    //simulate click of Clear button
                    app.find('.btn').at(1).simulate('click');
                });

                it('clears notes in state', ()=> {
                    // expect(app.state().notes).toHaveLength(0);
                    expect(app.state().notes).toEqual([]);
                });
            });

        }); //end of inner-inner describe
    });//end of inner describe
});//end of outer describe

