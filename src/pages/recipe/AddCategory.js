import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"
import { TextField, Button } from '@mui/material';
import { addCategory } from '../../service/category';

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
        for (let index = 0; index < data?.Categorys.length; index++) {
            dispatch(addCategory(data?.Categorys[index]))
        }
        reset()
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {Categorys?.map((item, i) => (
                    <div key={i}>
                        <TextField type="text" placeholder="Category name:" margin="dense" color="secondary"{...register(`Categorys.${i}.Name`)} />
                    </div>
                ))}
            </div>
            <Button variant="outlined" color="secondary" onClick={() => appendCategorys({ Name: "" })}>Add Category</Button>
            <Button variant="contained" color="secondary" type="submit">Submit</Button>
        </form>
    </>
}