import React from "react";
import PropTypes from 'prop-types';
import { Box } from "components/Box"
const ContactsList = ({ contacts, onDelContact }) => {
    return (
        <>
            {contacts.map( ({ number,name,id }) => (
                <Box
                    as="li"
                    display='inline-flex'
                    key={id}
                    marginBottom="5px"
                    padding="3px"
                >
                    <p>{`${name}: ${number}`}</p>
                    <button
                        onClick={() => {
                            onDelContact(id);
                        }}
                    >delete</button>
                </Box>
            ))}
        </>
    )
}
ContactsList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelContact: PropTypes.func.isRequired
}
export default ContactsList;