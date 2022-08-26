import { Box } from "components/Box";
import React, { Component } from "react";
import { Formik, Form, Field } from 'formik';
// import { nanoid } from 'nanoid';

const initialValue = {
            name: 'name',
            number: '00-000'
    }
class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    handleChange = evnt => {
        console.log(evnt.currentTarget.value);
        const { name, value } = evnt.currentTarget
        this.setState({
            [name] : value
        })
    }

    handleSubmitForm = (value, actions) => {
        // e.preventDefault();
        this.props.onSubmit(this.state);
        console.log(value);
        console.log(actions);

        // this.reset()
    }

    reset = () => {
        this.setState({
            name: '',
            number: '',
        })
    }
    render() {
        const { name, number } = this.state;

        return (
            <Formik initialValue={initialValue}  >
                <Form onSubmit={this.handleSubmitForm} >
                    <Box as="label" marginRight="8px" htmlFor="name">
                        Name
                        <Field
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={this.handleChange}
                        />
                    </Box>
                    <Box as="label" marginRight="8px" htmlFor="numer">
                        Number
                        <Field
                            type="tel"
                            name="number"
                            value={number}
                            onChange={this.handleChange}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            />
                    </Box>
                    {/* <input type="password" name="password" /> */}
                    <button type="submit">Add contact</button>
                </Form>
            </Formik>
            
        )
    }
}
// <form onSubmit={this.handleSubmitForm}>
                //     <Box as="label" marginRight="8px">
                //         Name
                //         <input
                //         type="text"
                //         name="name"
                //         value={name}
                //         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                //         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                //         required
                //         onChange={this.handleChange}
                //         />
                //     </Box>
                //     <Box as="label" marginRight="8px">
                //         Number
                //         <input
                //             type="tel"
                //             name="number"
                //             value={number}
                //             onChange={this.handleChange}
                //             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                //             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                //             required
                //             />
                //     </Box>
                //     {/* <input type="password" name="password" /> */}
                //     <button type="submit">Add contact</button>
                // </form>
export default ContactForm;