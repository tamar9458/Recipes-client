import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"
import axios from 'axios';
//import 'semantic-ui-css/semantic.min.css'
//import { FormField, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddCategory } from '../service/category';
export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const schema = yup.object({
        Categorys: yup.array().of(yup.object(
            {
                Name: yup.string().required(),
            }))
    }).required();
    const { register, control, reset, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    })

    const { fields: Categorys, append: appendCategorys } = useFieldArray({
        control, name: "Categorys"
    });
    const onSubmit = (data) => {
        console.log("data.Categorys[0].Name", data?.Categorys[0]?.Name);
        for (let index = 0; index < data?.Categorys.length; index++) {
            dispatch(AddCategory(data?.Categorys[index]))
        }
        reset()

    }


    return <>

        <form onSubmit={handleSubmit(onSubmit)}>

            {/* {Categorys?.map((item, i) => (
                <div key={i}>
                    <input type="text" placeholder="Category name:" {...register(`Categorys.${i}.Name`)} />
                    <p>{errors.Name?.message}</p>
                </div>
            ))} */}
            <div>
                {Categorys?.map((item, i) => (
                    <div key={i}>
                        <TextField type="text" placeholder="Category name:"  {...register(`Categorys.${i}.Name`)} />
                    </div>
                ))}
            </div>
            <Button variant="outlined" onClick={() => appendCategorys({ Name: "" })}>
                Add Category
            </Button>
            {/* <button onClick={() => appendCategorys({ Name: "" })}>Add Category</button> */}

            <Button variant="contained" color="primary" type="submit">Submit</Button>

            {/* <input type="submit" value={"add"} /> */}

        </form>
    </>
}