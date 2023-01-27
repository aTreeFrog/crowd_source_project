import React from 'react';
import { useState } from 'react';
import { TextBox, TextArea } from './PageElements'

const CreateProjectPage = () => {
    const [greetings, setGreetings] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    //height: '100vh'
                }}>
                Project Name
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    //height: '100vh'
                }}
            >

                <TextBox style={{
                    height: '12px',
                    width: '300px',
                }} type="text" value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    //height: '100vh'
                }}>
                Project Description
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    //height: '100vh'
                }}
            >

                <TextArea style={{
                    height: '200px',
                    width: '300px',
                }} type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
        </div>
    );
};

export default CreateProjectPage;
