import React, { useState } from 'react';
import Container from '@material-ui/core/container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }        
    },
    button :{
        margin: theme.spacing(1)
    }
}))

const AddForm = () => {
    const classes = useStyles();
    const [InputFields, setInputField] = useState([
        { Id: "", Name: "", Email: "" }
    ]);

    const handleChange = (index,event)=>{
        const values = [...InputFields];
        values[index][event.target.name] = event.target.value;
        
        setInputField(values)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('InputFields',InputFields)

    }

    const handleAddFields = ()=>{
        setInputField([...InputFields,{Id:"",Name:'',Email:''}])
    }

    const handleRemoveFields = (index)=>{
        const values = [...InputFields];
        values.splice(index,1);
        setInputField(values);
    }
    return (
        <>
            <Container>
                <h2>Add New Member</h2>
                <form className={classes.root} onSubmit={handleSubmit}>
                    {InputFields.map((inputField, index) => (
                        <div key={index}>
                            <TextField
                                name="Id"
                                label="User Id"
                                variant="filled"
                                onChange={event => handleChange(index,event)}
                                value={InputFields.Id}
                            />
                            <TextField
                                name="Name"
                                label="Enter Your Name"
                                variant="filled"
                                onChange={event => handleChange(index,event)}
                                value={InputFields.Name}
                            />
                            <TextField
                                name="Email"
                                label="Enter Your Email"
                                variant="filled"
                                onChange={event => handleChange(index,event)}
                                value={InputFields.Email}
                            />
                            <IconButton
                                onClick = {(index)=>handleRemoveFields()}
                                >
                                <RemoveIcon />
                            </IconButton>
                            <IconButton
                                onClick={()=>handleAddFields()}
                                >
                                <AddIcon />
                            </IconButton>
                        </div>
                    ))}
                    <Button 
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        endIcon={<Icon>send</Icon>}>
                        Send
                    </Button>
                </form>
            </Container>
        </>
    )
}
export default AddForm;