import { Component } from "react";
import { GlobalStyle } from './GlobalStyle';
import { nanoid } from 'nanoid'
import { Box } from "components/Box";
import Filter from "./Filter";
import ContactsList from "./ContactsList";
import ContactForm from "./ContactForm";

export class App extends Component {

  state = {
    contacts: [

    ],
    filter: ''
  }

  

  // handleChange = evnt => {
  //       console.log(evnt.currentTarget.value);
  //       const { name, value } = evnt.currentTarget
  //       this.setState({
  //         [name] : value
  //       })
  //   }
  
  handleChangeFilter = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  contactsFormSubmitHandler = data => {
    
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const isInName = newContact.name.toLowerCase();
    this.state.contacts.find(contact => contact.name.toLowerCase() === isInName)
      ? alert(data.name + ' is already in contacts')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
      }));
  }

  getVisibleNameFilter = () => {
    const { filter,contacts } = this.state
    const normalFilter = filter.toLowerCase().trim();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    )
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    console.log('App DidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevState) {

    if (this.state.contacts !== prevState.contacts) {
      console.log('update contacts');
      localStorage.setItem('contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }
  componentWillUnmount() {
    // console.log('App WillUnmount');
  }

  render() {
    const { filter } = this.state;

    const filterName = this.getVisibleNameFilter();
    return (
      
      <Box
        margin="0 auto"
        padding="0 40px"
      >
        <Box as="h1" marginBottom="15px">Phonebook</Box>
        <ContactForm onSubmit={this.contactsFormSubmitHandler} />
        
        <Box padding="20px 0">
          <Box as="h2" marginBottom="15px" >Contacts</Box>
          <Filter value={filter} onChange={this.handleChangeFilter} />
          <Box as="ul" display="flex" flexDirection="column"
            padding="10px 0"
          >
            <ContactsList contacts={filterName} onDelContact={this.deleteContact} />
          </Box>
        </Box>
        <GlobalStyle />
      </Box>
    );
  }
}
