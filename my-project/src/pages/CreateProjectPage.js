import React from 'react';
import { useState } from 'react';
import { TextBox } from './PageElements'

const CreateProjectPage = () => {
    const [greetings, setGreetings] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}
        >
            <TextBox defaultValue="Type Project Name" type="text" value={greetings}
                onChange={(e) => setGreetings(e.target.value)} />
        </div>
    );
};

export default CreateProjectPage;
