import React from 'react';
import { useState } from 'react';
import { TextBox, TextArea, ImageUploader, MyTagContainer, MyTags, TagInputs, TagButton, SubmitBtn } from './PageElements'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { TermsContainer, CheckboxContainer } from './PageElements';

const CreateProjectPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputTag, setInputTag] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false)
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const onKeyDown = (e) => {
        const { key } = e;
        let trimmedInput = inputTag.trim();

        if (!trimmedInput.startsWith("#")) {
            console.log("Hi im here");
            trimmedInput = '#' + trimmedInput;
        }

        if (key === "Enter" && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInputTag('');
        }

        if (key === "Backspace" && !inputTag.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();

            setTags(tagsCopy);
            setInputTag(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }


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
            <div style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}>
                Logo
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}>
                {selectedImage && (
                    <div>
                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <br />
                <br />
                <ImageUploader
                    type="file"
                    name="myImage"
                    id="load-image-icon"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <label htmlFor="load-image-icon">
                    <IconButton color="primary" aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}>
                Categories
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}>
                <MyTagContainer
                    style={{
                        minheight: '30px',
                        width: '500px',
                    }}>
                    {tags.map((tag, index) => (
                        <MyTags>
                            {tag}
                            <TagButton onClick={() => deleteTag(index)}>x</TagButton>
                        </MyTags>))}
                    <TagInputs
                        value={inputTag}
                        placeholder="#EnterTagsHere"
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onChange={(e) => setInputTag(e.target.value)} />

                </MyTagContainer>
            </div>
            <br />
            <br />
            <TermsContainer>
                <label htmlFor="terms-and-conditions">
                    <CheckboxContainer>
                        <input
                            type="checkbox"
                            id="terms-and-conditions"
                            checked={isTermsChecked}
                            onChange={() => setIsTermsChecked(!isTermsChecked)}
                        />
                        I agree to the terms and conditions in this insane project they we are all working on here today.
                    </CheckboxContainer>
                </label>
            </TermsContainer>
            <br />
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Center',
                //height: '100vh'
            }}>
                <SubmitBtn disabled={!isTermsChecked}><span>Submit Project</span></SubmitBtn>
            </div>
        </div >
    );
};

export default CreateProjectPage;
