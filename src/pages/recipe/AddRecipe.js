import { useFieldArray, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllCategories } from "../../service/category"
import { addRecipe, editRecipe } from "../../service/recipes"

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
            Instructions: yup.array(yup.string()),
            Ingrident: yup.array().of(yup.object({
                Name: yup.string().required(),
                Count: yup.number().required(),
                Type: yup.string().required(),
            }))
        })
        .required()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { UserId, Categories } = useSelector(state => ({
        UserId: state.user.user?.Id,
        Categories: state.category.categories
    }))
    const { state } = useLocation()
    const selectRecipe = state;

    useEffect(() => {
        dispatch(getAllCategories());
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
    })
    const { fields: Instructions, append: appendInstructions } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngridents } = useFieldArray({
        control, name: "Ingrident"
    });
    const onSubmit = (data) => {
        {
            if (selectRecipe === null)
                dispatch(addRecipe(data, UserId))
            else
                dispatch(editRecipe(data, selectRecipe))
            navigate('/recipe')
        }
    }
    return (
        <>
            <div className="add">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField style={{ width: '80%' }} label="Recipe Name "
                        margin="dense" {...register("Name")}
                        error={!!errors.Name} helperText={errors.Name?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="Description"
                        margin="dense"{...register("Description")}
                        error={!!errors.Description} helperText={errors.Description?.message} />
                    <br />
                    <FormControl style={{ width: '80%' }} margin="dense" color="secondary">
                        <InputLabel>Category</InputLabel>
                        <Select {...register("CategoryId")} error={!!errors.CategoryId} displayEmpty>
                            {Categories.map((x) => (
                                <MenuItem key={x.Id} value={x.Id}>
                                    {x.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <TextField style={{ width: '80%' }} label="Img URL"
                        margin="dense"{...register("Img")}
                        error={!!errors.Img} helperText={errors.Img?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="Duration"
                        margin="dense" type="input" {...register("Duration")}
                        error={!!errors.Duration} helperText={errors.Duration?.message} />
                    <br />
                    <FormControl style={{ width: '80%' }} margin="dense" color="secondary">
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
                            <div key={i} className="ingrident">
                                <TextField className="ingridItem" type="text" placeholder="product name:" margin="dense" color="secondary"{...register(`Ingrident.${i}.Name`)} />
                                <TextField className="ingridItem" placeholder="count:" margin="dense" color="secondary"{...register(`Ingrident.${i}.Count`)} />
                                <TextField className="ingridItem" type="text" placeholder="type:" margin="dense" color="secondary"{...register(`Ingrident.${i}.Type`)} />
                            </div>
                        ))}
                    </div>

                    <Button variant="outlined" startIcon={<AddIcon />} color="secondary" onClick={() => appendIngridents({ Name: "", Count: 0, Type: "" })}>
                        Add ingrident
                    </Button>
                    <div>
                        <br />
                        {Instructions?.map((item, index) => (
                            <div key={index}>
                                <TextField type="text" placeholder="enter Instruction:" margin="dense" color="secondary"{...register(`Instructions.${index}`)} />

                            </div>
                        ))}
                    </div>
                    <Button variant="outlined" startIcon={<AddIcon />} color="secondary" onClick={() => appendInstructions(" ")}>
                        add Instruction
                    </Button>
                    <br />
                    <Button variant="contained" color="secondary" type="submit" className="submitt">Submit</Button>

                </form>
            </div>
        </>
    );
}