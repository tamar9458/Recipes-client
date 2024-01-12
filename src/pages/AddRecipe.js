import Test_fieldArray from '../Test_fieldArray'
import { useFieldArray, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import * as yup from "yup"
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from "react-redux";
import { FormField, Form } from 'semantic-ui-react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default () => {

    const schema = yup
        .object({
            Name: yup.string().required(),
            CategoryId: yup.number().required(),
            Img: yup.string().required(),
            UserId: yup.number().required(),
            Duration: yup.number().required(),
            Difficulty: yup.number().required(),
            Description: yup.string().required(),
            Instructions: yup.array(yup.string())//.of(yup.object({ Inst: yup.string().required(), })),
            , Ingrident: yup.array().of(yup.object({
                Name: yup.string().required(),
                Count: yup.number().required(),
                Type: yup.string().required(),
            }))
        })
        .required()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resipes = useSelector(state => state.recipes);
    const UserId = useSelector(state => state.user.user?.Id)
    const { state } = useLocation()
    const selectRecipe = state;
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/category').then((c) => { setCategories(c.data) }).catch(error => console.error(error));
    }, [])

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name, UserId: UserId, CategoryId: state?.CategoryId,
            Img: state?.Img, Duration: state?.Duration, Difficulty: state?.Difficulty,
            Description: state?.Description, Ingrident: state?.Ingrident,
            Instructions: state?.Instructions
        }
        //defaultValues:selectRecipe
    })
    const { fields: Instructions, append: appendInstructions } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngridents } = useFieldArray({
        control, name: "Ingrident"
    });
    const onSubmit = (data) => {
        {
            console.log("submit:", data);
            if (selectRecipe == null) {
                axios.post('http://localhost:8080/api/recipe', data).then((response) => {
                    dispatch({ type: "ADD_RECIPE", data: data })
                })
                    .catch((error) => {
                        console.error(error)
                    })
            }
            else {
                axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id }).then((response) => {
                    console.log("edit", response);
                    dispatch({ type: "EDIT_RECIPE", data: response.data })

                }).catch((error) => { console.error(error) })

            }
        }
    }
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField style={{ width: '20%' }} label="Recipe Name " {...register("Name")} error={!!errors.Name} helperText={errors.Name?.message} />
                <br />
                <TextField style={{ width: '20%' }} label="Description" {...register("Description")} error={!!errors.Description} helperText={errors.Description?.message} />
                <br />
                <FormControl style={{ width: '20%' }}>
                    <InputLabel>CategoryId</InputLabel>
                    <Select {...register("CategoryId")} error={!!errors.CategoryId} displayEmpty>
                        {Categories.map((x) => (
                            <MenuItem key={x.Id} value={x.Id}>
                                {x.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <TextField style={{ width: '20%' }} label="Img URL" {...register("Img")} error={!!errors.Img} helperText={errors.Img?.message} />
                <br />
                <TextField style={{ width: '20%' }} label="Duration" type="input" {...register("Duration")} error={!!errors.Duration} helperText={errors.Duration?.message} />
                <br />
                <FormControl style={{ width: '20%' }}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select {...register("Difficulty")} error={!!errors.Difficulty} displayEmpty helperText={errors.Difficulty?.message}>
                        <MenuItem value={1}>קל</MenuItem>
                        <MenuItem value={2}>בינוני</MenuItem>
                        <MenuItem value={3}>קשה</MenuItem>
                        <MenuItem value={4}>קשה מאד</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <div>
                    {Ingrident?.map((item, i) => (
                        <div key={i}>
                            <TextField type="text" placeholder="product name:"  {...register(`Ingrident.${i}.Name`)} />
                            <TextField placeholder="count:" {...register(`Ingrident.${i}.Count`)} />
                            <TextField type="text" placeholder="type:" {...register(`Ingrident.${i}.Type`)} />
                        </div>
                    ))}
                </div>

                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendIngridents({ Name: "", Count: 0, Type: "" })}>
                    Add ingrident
                </Button>
                <div>
                    <label>Instructions:</label>
                    {Instructions?.map((item, index) => (
                        <div key={index}>
                            <TextField type="text" placeholder="enter Instruction:" {...register(`Instructions.${index}`)} />

                        </div>
                    ))}
                </div>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendInstructions(" ")}>
                    add Instruction
                </Button>
                <br />
                <Button variant="contained" color="primary" type="submit">Submit</Button>

            </form>
        </>
    );
}